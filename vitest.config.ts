import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react'

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    //setupFiles: ["vitestSetup.ts"],
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
  },
  plugins: [react()]
})