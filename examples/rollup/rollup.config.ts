import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import Unplugin from 'unplugin-moment-to-dayjs/rollup'

export default defineConfig({
  input: 'src/index.js',
  output: {
    file: 'dist/main.js',
    format: 'es',
  },
  external: ['dayjs'],
  plugins: [
    Unplugin({
    }),
    nodeResolve(),
  ],
})
