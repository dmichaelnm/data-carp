import { TSelectOption } from 'src/script/ui/types';
import { flagDE, flagUS } from 'quasar-extras-svg-icons/country-flag-icons';

export const languageOptions: TSelectOption[] = [
  { value: 'en-US', label: 'language.enUS', icon: flagUS },
  { value: 'de-DE', label: 'language.deDE', icon: flagDE },
];
