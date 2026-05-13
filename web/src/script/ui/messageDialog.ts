import { ref } from 'vue';
import { TDialogButton } from 'src/script/ui/types';

export type TMessageDialogType =
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
  | 'question';

export type TMessageDialogOptions = {
  type: TMessageDialogType;
  title: string;
  message: string;
  details?: string | undefined;
  buttons?: TDialogButton[] | undefined;
  onClose?: (buttonValue: string) => void;
  visible: boolean;
};

export const messageDialogOptions = ref<TMessageDialogOptions>({
  type: 'info',
  title: '',
  message: '',
  details: undefined,
  buttons: undefined,
  onClose: undefined,
  visible: false,
});

export function useMessageDialog(): (
  type: TMessageDialogType,
  title: string,
  message: string,
  onClose?: (buttonValue: string) => void,
  details?: string | undefined,
  buttons?: TDialogButton[] | undefined
) => void {
  return (
    type: TMessageDialogType,
    title: string,
    message: string,
    onClose?: (buttonValue: string) => void,
    details?: string | undefined,
    buttons?: TDialogButton[] | undefined
  ) => {
    messageDialogOptions.value.type = type;
    messageDialogOptions.value.title = title;
    messageDialogOptions.value.message = message;
    messageDialogOptions.value.details = details;
    messageDialogOptions.value.buttons = buttons;
    messageDialogOptions.value.onClose = onClose;
    messageDialogOptions.value.visible = true;
  };
}
