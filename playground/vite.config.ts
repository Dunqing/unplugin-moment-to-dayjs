import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unplugin from 'unplugin-moment-to-dayjs/vite'

export default defineConfig({
  plugins: [
    react(),
    Unplugin(),
  ],
})
