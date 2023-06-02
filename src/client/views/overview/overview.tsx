import { useTranslation } from 'react-i18next';

import { Page, Card, Heading } from '@oliasoft-open-source/react-ui-library';
import translations from 'client/internationalisation/translation-map.json';

export const Overview = () => {
  const { t } = useTranslation();

  return (
    <Page scroll={false}>
      <Card
        heading={
          <Heading>{t(translations.intranetApplication)} Overview Page</Heading>
        }
      >
        Hello World, Intranet Application
      </Card>
    </Page>
  );
};
