import { Card, Heading } from '@oliasoft-open-source/react-ui-library';
import { useTranslation } from 'react-i18next';
import translations from 'client/internationalisation/translation-map.json';

export const OverviewCard = () => {
  const { t } = useTranslation();
  return (
    <Card
      heading={
        <Heading>{t(translations.intranetApplication)} Overview Page</Heading>
      }
    >
      Hello World, Example Application
    </Card>
  );
};
