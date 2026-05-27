import { flagDE, flagUS } from 'quasar-extras-svg-icons/country-flag-icons';
import { TSelectOption } from 'src/script/ui/types';
import { EProjectMemberRole } from 'src/script/backend/api/IProjectMember';

export const languageOptions: TSelectOption[] = [
  { value: 'en-US', label: 'language.enUS', icon: flagUS },
  { value: 'de-DE', label: 'language.deDE', icon: flagDE },
];

export function getDefaultLanguage(): string {
  const language = navigator.language;
  let option = languageOptions.find((l) => l.value === language);
  if (!option) {
    option = languageOptions.find(
      (l) => l.value.substring(0, 2) === language.substring(0, 2)
    );
  }
  if (!option) {
    return 'en-US';
  }
  return option.value;
}

export const projectRoleOptions: TSelectOption[] = [
  { value: EProjectMemberRole.Maintainer, label: 'project.role.maintainer' },
  { value: EProjectMemberRole.Developer, label: 'project.role.developer' },
  { value: EProjectMemberRole.Visitor, label: 'project.role.visitor' },
];
