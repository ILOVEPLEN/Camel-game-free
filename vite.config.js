import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/Camel-game-free/',
  resolve: {
    extensions: ['.mjs', '.jsx', '.tsx', '.ts', '.js', '.json'],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Project Ball',
        short_name: 'Project Ball',
        description: 'Your personal basketball training app',
        theme_color: '#0EA5E9',
        background_color: '#F0F7FF',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
});
