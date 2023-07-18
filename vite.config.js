import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // fixme is not working¿
    environment: 'jsdom',
    setupFiles: './tests/setup.js'
  }
})
