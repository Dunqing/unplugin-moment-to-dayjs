import path from 'path'
import { createUnplugin } from 'unplugin'
import alias from '@rollup/plugin-alias'
import { presets } from './config/presets'
import type { Options } from './types'

const ENTRY_FILE_NAME = 'MOMENT_TO_DAYJS_ENTRY'

export default createUnplugin<Options>((options) => {
  const { preset = 'antd' } = options || {}

  const plugins = options?.plugins ?? presets[preset].plugins
  const replaceMoment = options?.replaceMoment ?? presets[preset].replaceMoment

  return {
    name: 'unplugin-moment-to-dayjs',
    enforce: 'pre',
    vite: {
      config: () => {
        return replaceMoment
          ? {
            resolve: {
              alias: {
                moment: 'dayjs',
              },
            },
          }
          : {}
      },
      transformIndexHtml: {
        enforce: 'pre',
        transform() {
          return [{
            tag: 'script',
            attrs: {
              type: 'module',
              src: `${ENTRY_FILE_NAME}`,
            },
            injectTo: 'body-prepend',
          }]
        },
      },
    },
    rollup: {
      options: (options: any) => {
        options.plugins = [
          alias({
            entries: {
              moment: 'dayjs',
            },
          }),
          ...options.plugins,
        ]
        return options
      },
    },
    webpack(compiler) {
      const { resolve } = (compiler as any).options
      resolve.alias = {
        ...resolve.alias,
        moment: 'dayjs',
      }
    },
    transformInclude(id) {
      return id.includes(ENTRY_FILE_NAME)
    },
    resolveId(id) {
      if (id.includes(ENTRY_FILE_NAME))
        return ENTRY_FILE_NAME
    },
    load(id) {
      if (id.includes(ENTRY_FILE_NAME)) {
        return ['import dayjs from "dayjs"']
          .concat(
            plugins?.map((plugin) => {
              return `import ${plugin} from "dayjs/esm/plugin/${plugin}";`
            }))
          .concat(
            plugins?.map(plugin => `dayjs.extend(${plugin});`))
          .concat(
            [
              `import localePlugin from "${path.posix.resolve(__dirname, './plugins/locale.ts')}";`,
              'dayjs.extend(localePlugin);',
            ],
          ).join('\n')
      }
    },
  }
})
