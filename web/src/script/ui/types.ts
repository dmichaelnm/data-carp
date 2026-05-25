import { QTableColumn } from 'quasar';

export type TColorName =
  | 'primary'
  | 'frame-background'
  | 'button-icon-color'
  | 'button-icon-disabled-color'
  | 'text-color';
export type TButtonType = 'button' | 'submit' | 'reset';
export type TButtonStyle = 'push' | 'link' | 'icon';
export type TSeparatorPosition = 'above' | 'below' | 'both';

export type TDialogButton = {
  value: string;
  label: string;
  color?: TColorName | string | undefined;
  buttonStyle?: TButtonStyle | undefined;
  type?: TButtonType | undefined;
};

export type TSelectOption = {
  value: string;
  label: string;
  icon?: string;
  separator?: TSeparatorPosition;
  translate?: boolean;
};

export enum ETableColumnType {
  Avatar = 'avatar',
  Text = 'text',
}

export type TTableColumn = QTableColumn & {
  type: ((row: Record<string, unknown>) => ETableColumnType) | ETableColumnType;
  verticalAlign?: 'top' | 'middle' | 'bottom';
  width?: number;
};
