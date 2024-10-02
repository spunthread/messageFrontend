import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { outDir: '..' },
  // needed for github pages just put the repo name here
  base: 'messageFrontend', 
})
