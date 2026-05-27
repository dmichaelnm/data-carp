<template>
  <div class="q-col-gutter-y-sm">
    <div class="row" v-if="message">
      <div :class="messageCol ?? 'col'">{{ message }}</div>
    </div>
    <div class="row" v-if="modelValue.length === 0 && messageEmptyTable">
      <div class="col empty-table">{{ messageEmptyTable }}</div>
    </div>
    <div class="row" v-if="modelValue.length > 0">
      <div class="col">
        <q-table
          :rows="_modelValue"
          :columns="_columns"
          :pagination-label="(f, e, t) => f + ' - ' + e + ' / ' + t"
          :pagination="{ rowsPerPage: rowsPerPage ?? 0 }"
          :rows-per-page-options="[]"
          flat
          dense
          wrap-cells
        >
          <template
            v-if="enableSelection && !readOnly"
            v-slot:body-cell-select="props"
          >
            <q-td :props="props">
              <q-radio
                v-model="selectedRowIndex"
                :val="props.rowIndex"
                size="xs"
              />
            </q-td>
          </template>
          <template
            v-for="col in columns"
            :key="col.name"
            v-slot:[getSlotName(col)]="props"
          >
            <slot :name="getSlotName(col)" :props="props">
              <q-td
                :props="props"
                :class="`vertical-${col.verticalAlign ?? 'vertical-middle'}`"
              >
                <!-- Text -->
                <div v-if="getType(col, props.row) !== ETableColumnType.Avatar">
                  {{ props.value }}
                </div>
                <!-- Image URL -->
                <account-profile-picture
                  v-if="getType(col, props.row) === ETableColumnType.Avatar"
                  :photo-url="props.value"
                  :size="col.width ?? 32"
                />
                <!-- Text -->
                <q-popup-edit
                  v-if="
                    !readOnly &&
                    getType(col, props.row) === ETableColumnType.Input
                  "
                  v-model="props.row[col.name]"
                  v-slot="scope"
                  anchor="center middle"
                  :ref="refPopupEditor(col, props.rowIndex)"
                  @show="selectInputField(props.rowIndex, col)"
                >
                  <app-input
                    v-model="scope.value"
                    :label="col.label"
                    :ref="refAppInput(col, props.rowIndex)"
                    hide-bottom-space
                    borderless
                    @focusout="
                      updateValue(
                        props.rowIndex,
                        props.row,
                        col,
                        scope.value,
                        true
                      )
                    "
                    @keyup.enter="hidePopupEditor(props.rowIndex, col)"
                    @blur="hidePopupEditor(props.rowIndex, col)"
                  />
                </q-popup-edit>
                <!-- Selection -->
                <q-popup-edit
                  v-if="
                    !readOnly &&
                    getType(col, props.row) === ETableColumnType.Select
                  "
                  v-model="props.row[col.name]"
                  v-slot="scope"
                  anchor="center middle"
                  :ref="refPopupEditor(col, props.rowIndex)"
                  @show="showSelectOptions(props.rowIndex, col)"
                >
                  <app-select
                    v-model="scope.value"
                    :options="col.options ?? []"
                    :label="col.label"
                    :ref="refAppSelect(col, props.rowIndex)"
                    translate
                    borderless
                    @update:model-value="
                      updateValue(
                        props.rowIndex,
                        props.row,
                        col,
                        scope.value,
                        true
                      )
                    "
                  />
                </q-popup-edit>
              </q-td>
            </slot>
          </template>
        </q-table>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <app-button
          button-style="icon"
          icon="add"
          :tooltip="$t('button.add')"
          :class="rowAddHandler ? '' : 'invisible'"
          @click="onAddRow"
        />
        <app-button
          button-style="icon"
          icon="remove"
          :tooltip="$t('button.remove')"
          :class="showRemoveButton ? '' : 'invisible'"
          :disabled="selectedRowIndex < 0"
          @click="onRemoveRow"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.empty-table {
  font-style: italic;
  color: $text-color-hint-light;
}
.body--dark .empty-table {
  color: $text-color-hint-dark;
}
</style>

<script setup lang="ts">
import { ComponentPublicInstance, computed, reactive, ref } from 'vue';
import { QPopupEdit } from 'quasar';
import { ETableColumnType, TTableColumn } from 'src/script/ui/types';
import AppButton from 'components/application/controls/AppButton.vue';
import AccountProfilePicture from 'components/application/account/AccountProfilePicture.vue';
import AppSelect from 'components/application/controls/AppSelect.vue';
import AppInput from 'components/application/controls/AppInput.vue';

type TAppSelect = InstanceType<typeof AppSelect>;
type TAppInput = InstanceType<typeof AppInput>;

const appSelectRefs = reactive(<Record<string, TAppSelect>>{});
const appInputRefs = reactive(<Record<string, TAppInput>>{});
const popupEditorRefs = reactive(<Record<string, QPopupEdit>>{});

const selectedRowIndex = ref(-1);

const props = defineProps<{
  columns: TTableColumn[];
  modelValue: Record<string, unknown>[];
  message?: string;
  messageCol?: string;
  messageEmptyTable?: string;
  rowAddHandler?: (callback: (commit: boolean) => void) => void;
  rowRemoveHandler?: (callback: (commit: boolean) => void) => void;
  rowsPerPage?: number;
  showRemoveButton?: boolean;
  enableSelection?: boolean;
  readOnly?: boolean;
  validationHandler?: (
    rowIndex: number,
    column: TTableColumn,
    oldValue: unknown,
    newValue: unknown
  ) => unknown;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, unknown>[]): void;
}>();

const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: Record<string, unknown>[]) => emit('update:modelValue', value),
});

const _columns = computed(() => {
  const cols: TTableColumn[] = [];
  if (props.enableSelection) {
    cols.push({
      name: 'select',
      label: '',
      field: '',
      type: ETableColumnType.Text,
      style: 'width: 32px; text-align: center;',
    });
  }
  for (const column of props.columns) {
    if (column.width) {
      column.style = `width: ${column.width}px; ${column.style ?? ''}`;
    }
    cols.push(column);
  }
  if (props.columns[props.columns.length - 1].width) {
    cols.push({
      name: 'empty-last-column',
      label: '',
      field: '',
      type: ETableColumnType.Text,
    });
  }
  return cols;
});

function getSlotName(column: TTableColumn): `body-cell-${string}` {
  return `body-cell-${column.name}`;
}

function getType(
  column: TTableColumn,
  row: Record<string, unknown>
): ETableColumnType {
  let type: ETableColumnType;
  if (typeof column.type === 'function') {
    type = column.type(row);
  } else {
    type = column.type;
  }
  return type;
}

function onAddRow(): void {
  if (props.rowAddHandler) {
    props.rowAddHandler((commit) => {
      if (commit) {
        selectedRowIndex.value = _modelValue.value.length - 1;
      }
    });
  }
}

function onRemoveRow(): void {
  let remove = true;
  if (props.rowRemoveHandler) {
    props.rowRemoveHandler((commit) => (remove = commit));
  }
  if (remove) {
    _modelValue.value.splice(selectedRowIndex.value, 1);
    selectedRowIndex.value--;
  }
}

function refPopupEditor(
  column: TTableColumn,
  rowIndex: number
): (el: QPopupEdit) => unknown {
  return (el: QPopupEdit) => {
    popupEditorRefs[`pe_${column.name}_${rowIndex}`] = el;
  };
}

function refAppInput(column: TTableColumn, rowIndex: number) {
  return (el: Element | ComponentPublicInstance | null) => {
    const key = `ai_${column.name}_${rowIndex}`;
    if (el) {
      appInputRefs[`ai_${column.name}_${rowIndex}`] = el as TAppInput;
    } else {
      delete appInputRefs[key];
    }
  };
}

function refAppSelect(column: TTableColumn, rowIndex: number) {
  return (el: Element | ComponentPublicInstance | null) => {
    const key = `as_${column.name}_${rowIndex}`;
    if (el) {
      appSelectRefs[`as_${column.name}_${rowIndex}`] = el as TAppSelect;
    } else {
      delete appSelectRefs[key];
    }
  };
}

function selectInputField(rowIndex: number, column: TTableColumn): void {
  const reference = appInputRefs[`ai_${column.name}_${rowIndex}`];
  if (reference) {
    reference.select();
  }
}

function showSelectOptions(rowIndex: number, column: TTableColumn): void {
  const reference = appSelectRefs[`as_${column.name}_${rowIndex}`];
  if (reference) {
    reference.showPopup();
  }
}

function updateValue(
  rowIndex: number,
  row: Record<string, unknown>,
  column: TTableColumn,
  value: unknown,
  hidePopup: boolean
): void {
  const oldValue = row[column.name];
  row[column.name] = props.validationHandler
    ? props.validationHandler(rowIndex, column, oldValue, value)
    : value;
  if (hidePopup) {
    hidePopupEditor(rowIndex, column);
  }
}

function hidePopupEditor(rowIndex: number, column: TTableColumn): void {
  const reference = popupEditorRefs[`pe_${column.name}_${rowIndex}`];
  if (reference) {
    reference.hide();
  }
}
</script>
