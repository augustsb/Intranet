import TranslationParser, { COMMAND_MAP } from '@oliasoft/translations';
import { englishTranslation } from './initial-locale';
import { ISO_CODES } from './constants';

(async () => {
  const allowedCommands = [COMMAND_MAP.XLSX, COMMAND_MAP.JSONS_TRANSLATED];
  const basePath = './src/client/internationalisation';
  const localePath = `${basePath}/locale.xlsx`;
  const translationMapPath = `${basePath}/translation-map.json`;
  const langFolder = `${basePath}/langs/`;
  const translationParser = new TranslationParser(
    Object.values(ISO_CODES),
    englishTranslation,
    localePath,
    translationMapPath,
    langFolder,
  );

  const [command]: any = process.argv.slice(2);
  console.log(COMMAND_MAP, command);
  if (command && !allowedCommands.includes(command)) {
    return console.error(
      'No command or not allowed command please use only update-xlsx or generate-jsons',
    );
  }

  switch (command) {
    case COMMAND_MAP.XLSX:
      return translationParser.generateXlsx();
    case COMMAND_MAP.JSONS_TRANSLATED: {
      await translationParser.generateLocaleTranslatedJsons();
      break;
    }
    default: {
      console.error('No command was provided');
    }
  }
  console.log('Finished generate command');
})();
