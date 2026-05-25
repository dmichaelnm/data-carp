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
          <template v-if="enableSelection" v-slot:body-cell-select="props">
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
                <div v-if="getType(col, props.row) === ETableColumnType.Text">
                  {{ props.value }}
                </div>
                <!-- Image URL -->
                <account-profile-picture
                  v-if="getType(col, props.row) === ETableColumnType.Avatar"
                  :photo-url="props.value"
                  :size="col.width ?? 32"
                />
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
import { computed, ref } from 'vue';
import { ETableColumnType, TTableColumn } from 'src/script/ui/types';
import AppButton from 'components/application/controls/AppButton.vue';
import AccountProfilePicture from 'components/application/account/AccountProfilePicture.vue';

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
</script>
