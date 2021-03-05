import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()],
  base:'./',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@api": path.resolve(__dirname, "src/api"),
      "@com": path.resolve(__dirname, "src/components")
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/scss/theme.scss";@import "src/scss/major-mixin.scss";`,      
      }
    }
  }
})
