import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    proxy: {
      '/user': {
        target: 'http://localhost:5000', // Your Express server
        changeOrigin: true,
        secure: false,
      },
        // Proxy for /api routes (like /api/users)
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
