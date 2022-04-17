import type { Configuration } from 'webpack'
import momentToDayjs from 'unplugin-moment-to-dayjs/webpack'

export default {
  mode: 'development',
  entry: './src/index.js',
  output: {
    clean: true,
    library: {
      type: 'module',
    },
    filename: 'main.js',
  },
  experiments: {
    outputModule: true,
  },
  externals: ['dayjs'],
  plugins: [
    momentToDayjs(),
  ],
} as Configuration
