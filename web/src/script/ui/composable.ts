import { useQuasar } from 'quasar';
import { useMessageDialog } from 'src/script/ui/messageDialog';
import { useI18n } from 'vue-i18n';
import { TColorName } from 'src/script/ui/types';

const Colors: Record<string, string> = {
  'primary-light': '#1976D2',
  'primary-dark': '#1976D2',
  'frame-background-light': '#FFFFFF',
  'frame-background-dark': '#202020',
  'button-icon-color-light': '#707070',
  'button-icon-color-dark': '#909090',
  'text-color-light': '#404040',
  'text-color-dark': '#C0C0C0',
};

export function useColor(): (name: TColorName) => string {
  const quasar = useQuasar();
  return (name: string) => {
    const suffix = quasar.dark.isActive ? 'dark' : 'light';
    return Colors[`${name}-${suffix}`];
  };
}

export type TRunTask = (
  task: () => Promise<void>,
  onError?: (error: unknown) => boolean
) => void;

export function useRunTask(): TRunTask {
  const quasar = useQuasar();
  const i18n = useI18n();
  const messageDialog = useMessageDialog();
  return async (
    task: () => Promise<void>,
    onError?: (error: unknown) => boolean
  ) => {
    try {
      quasar.loading.show();
      await task();
    } catch (e) {
      if (onError && onError(e)) {
        return;
      }
      console.error(e);
      messageDialog(
        'error',
        i18n.t('dialog.unexpected.title'),
        i18n.t('dialog.unexpected.message'),
        undefined,
        String(e)
      );
    } finally {
      quasar.loading.hide();
    }
  };
}
