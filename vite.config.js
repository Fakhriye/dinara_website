import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    assetsInlineLimit: 0, // <--- Эта строчка запрещает Vite ломать картинки
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        features: resolve(import.meta.dirname, 'features.html'),
        about: resolve(import.meta.dirname, 'about.html'),
      },
    },
  },
})