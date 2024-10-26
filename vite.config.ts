import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import FullReload from 'vite-plugin-full-reload';
import RubyPlugin from 'vite-plugin-ruby';
import tsconfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from 'vite-plugin-environment'
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    RubyPlugin(),
    FullReload(['config/routes.rb', 'app/views/**/*'], { delay: 200 }),
    tsconfigPaths(),
    EnvironmentPlugin('all'),
  ],

   define: {
    'process.env.PRODUCT_HUNT_API': JSON.stringify(process.env.PRODUCT_HUNT_API),
    'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
    },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app/frontend/src'),
      components: resolve(__dirname, 'app/frontend/components'),
      pages: resolve(__dirname, 'app/frontend/pages'),
      layouts: resolve(__dirname, 'app/frontend/layouts'),
      images: resolve(__dirname, 'app/frontend/images'),
      types: resolve(__dirname, 'app/frontend/types'),
    },
  },
});