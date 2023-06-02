import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ILanguage, languageList } from './language-list';

const detectionOptions = {
  // order and from where user language should be detected
  order: [
    'localStorage',
    'sessionStorage',
    'navigator',
    'htmlTag',
    'path',
    'subdomain',
    'querystring',
    'cookie',
  ],
  // keys or params to lookup language from
  lookupLocalStorage: 'locales',
};

const languageResources = (langs: ILanguage[]) => {
  const obj: { [key: string]: { translation: object } } = {};
  langs.forEach((lng) => {
    obj[lng.value] = {
      translation: lng.translation,
    };
  });
  return obj;
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      detection: detectionOptions,
      resources: languageResources(languageList),
      fallbackLng: 'en',
      supportedLngs: languageList.map((lang) => lang.value),
      debug: true,
      react: {
        useSuspense: true,
      },
    },
    (err) => {
      if (err) {
        console.error('Error loading translation files', err);
      }
    },
  );

export default i18n;
