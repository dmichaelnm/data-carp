import { useQuasar } from 'quasar';

export type TRunTask = (task: () => Promise<void>) => void;

export function useRunTask(): TRunTask {
  const quasar = useQuasar();
  return async (task: () => Promise<void>) => {
    try {
      quasar.loading.show();
      await task();
    } catch (e) {
      console.error(e);
    } finally {
      quasar.loading.hide();
    }
  };
}
