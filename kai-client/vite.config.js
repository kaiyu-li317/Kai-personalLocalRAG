import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [ NaiveUiResolver() ]
    })
  ],
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  resolve: {
    alias: [
      {
        find: '@',
        replacement: pathResolve('src') + '/',
      },
    ],
    dedupe: ['vue'],
  },
  css: {
    preprocessorOptions: {
      less: {
        math: 'always', // Only use math calculation within brackets
        globalVars: {
          // Global variables
          mainColor: 'red',
        },
      },
    },
  },
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    host: host || false,
    port: 11420,
    strictPort: true,
    proxy: {
      // Proxy configuration (object format)
      '/api': {
        target: 'http://127.0.0.1:6088',                      // Backend API URL
        changeOrigin: true,                             // Enable cross-origin
        rewrite: (path) => path.replace(/^\/api/, ''),  // Path rewrite
      },
      '/static': {
        target: 'http://127.0.0.1:6088',                      // Backend API URL
        changeOrigin: true,                             // Enable cross-origin
        rewrite: (path) => path.replace(/^\/api/, ''),  // Path rewrite
      },
      '/ws': {
        target: 'ws://127.0.0.1:6088',                      // WebSocket URL
        changeOrigin: true,                             // Enable cross-origin
        ws: true
      }
    },
    hmr: host
      ? {
          protocol: 'ws',
          host: host,
          port: 11430,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
