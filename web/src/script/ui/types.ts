export type TButtonType = 'button' | 'submit' | 'reset';
export type TButtonStyle = 'push' | 'link' | 'icon';

export type TDialogButton = {
  value: string;
  label: string;
  color?: string | undefined;
  buttonStyle?: TButtonStyle | undefined;
  type?: TButtonType | undefined;
};

export type TSelectOption = {
  value: string;
  label: string;
  icon?: string;
  separator?: 'above' | 'below' | 'both';
  translate?: boolean;
};
