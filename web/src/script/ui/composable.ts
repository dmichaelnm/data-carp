import { useQuasar } from 'quasar';

export type TRunTask = (
  task: () => Promise<void>,
  onError?: (error: unknown) => boolean
) => void;

export function useRunTask(): TRunTask {
  const quasar = useQuasar();
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
    } finally {
      quasar.loading.hide();
    }
  };
}
