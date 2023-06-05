// @ts-ignore
import React from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import '@oliasoft-open-source/react-ui-library/dist/global.css';
import './storybook.less';

export const decorators = [
  (Story) => {
    document.documentElement.setAttribute(
      'data-theme',
      useDarkMode() ? 'dark' : 'default',
    );
    return <Story />;
  },
];
