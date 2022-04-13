import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import react from '@vitejs/plugin-react'
import Unplugin from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    react(),
    Unplugin(),
  ],
})