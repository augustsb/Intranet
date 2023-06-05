import type { StorybookConfig } from '@storybook/react-vite';
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config, { configType }) {
    if (configType === 'PRODUCTION') {
      config.base = '';
      config.build.sourcemap = false;
      config.build.chunkSizeWarningLimit = 3500;
      config.publicDir = false;
      config.optimizeDeps = {
        include: ['storybook-dark-mode'],
      };
    }
    config.plugins = config.plugins.filter((plugin) => {
      /*
        For Storybook, remove vite-plugin-htmlx that is configured
        in vite.config.mjs. We don't need runtimeConfig, auth HOCs, or
        silent_renew for stories, so skipping this plugin to fall back to
        default behaviours. Disabling logic inspired by:
        https://github.com/storybookjs/builder-vite/issues/286#issue-1176508222
       */
      return !(
        // @ts-ignore
        (Array.isArray(plugin) && plugin[0].name === 'vite-plugin-htmlx')
      );
    });
    return config;
  },
};
export default config;
