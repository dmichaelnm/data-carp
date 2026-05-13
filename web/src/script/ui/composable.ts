import { useQuasar } from 'quasar';
import { useMessageDialog } from 'src/script/ui/messageDialog';
import { useI18n } from 'vue-i18n';

const Colors: Record<string, string> = {
  'frame-background-light': '#FFFFFF',
  'frame-background-dark': '#202020',
};

export function useColor(): (name: string) => string {
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
