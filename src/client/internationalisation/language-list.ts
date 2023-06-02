import { ISO_CODES } from 'client/internationalisation/constants';
import translationEN from './langs/en/translation.json';
import translationPT from './langs/pt/translation.json';

const iso = Object.values(ISO_CODES);
export type TIsoCodes = (typeof iso)[number];
export interface ILanguage {
  label: string;
  value: 'en' | 'pt';
  translation: object;
  isoCode: TIsoCodes;
}

export const languageList: ILanguage[] = [
  {
    label: 'English',
    value: 'en',
    translation: translationEN,
    isoCode: ISO_CODES.en,
  },
  {
    label: 'Português',
    value: 'pt',
    translation: translationPT,
    isoCode: ISO_CODES.pt,
  },
];
