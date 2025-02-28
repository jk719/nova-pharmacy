import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  define: {
    '__ROUTER_FUTURE_FLAGS__': JSON.stringify({
      v7_startTransition: true,
      v7_relativeSplatPath: true
    })
  }
})
