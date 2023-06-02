import { defineConfig } from 'vite';
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import NodeModulesPolyfillPlugin from '@esbuild-plugins/node-modules-polyfill';
import react from '@vitejs/plugin-react';
import html from 'vite-plugin-htmlx';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 9010,
    proxy: {
      '/runtimeConfigStatic.js': 'http://localhost:9011'
    }
  },
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 6000,
    outDir: 'client-dist',
  },
  plugins: [
    tsconfigPaths(),
    react(),
    html({
      minify: false,
      page: [
        {
          entry: '/src/client/views/root.tsx',
          filename: 'index.html',
          template: '/index.html',
        },
        {
          entry:
            '/node_modules/@oliasoft/authentication/pkce/silent-renew/silent_renew.js',
          filename: 'silent_renew.html',
          template:
            'node_modules/@oliasoft/authentication/pkce/silent-renew/silent_renew.html',
        },
      ],
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeModulesPolyfillPlugin.default(),
        NodeGlobalsPolyfillPlugin.default(),
      ],
    },
  },
});
