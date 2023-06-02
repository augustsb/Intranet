import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      //for some reason the main alias from tsconfig and vite config is not working, so repeating them
      src: path.resolve(__dirname, './src'),
      client: path.resolve(__dirname, './src/client'),
      common: path.resolve(__dirname, './src/common'),
      server: path.resolve(__dirname, './src/server'),
    },
  },
});
