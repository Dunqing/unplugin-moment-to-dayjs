import { createUnplugin } from 'unplugin'
import alias from '@rollup/plugin-alias'
import MagicString from 'magic-string'
import { presets } from './config/presets'
import type { Options } from './types'
import { generateCode } from './helpers/generateCode'
import makeEntry from './helpers/markEntry'

const ENTRY_FLAG = 'MOMENT_TO_DAYJS_ENTRY'

export default createUnplugin<Options>((options) => {
  const { preset = 'antd' } = options || {}

  const plugins = options?.plugins ?? presets[preset].plugins
  const replaceMoment = options?.replaceMoment ?? presets[preset].replaceMoment

  let entryId: string

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
              src: ENTRY_FLAG,
            },
            injectTo: 'body-prepend',
          }]
        },
      },
    },
    rollup: {
      async resolveId(source, importer, options) {
        if (options.isEntry)
          entryId = source

        return null
      },
      options: (options) => {
        if (replaceMoment) {
          options.plugins = [
            alias({
              entries: {
                moment: 'dayjs',
              },
            }),
            ...(options.plugins || []),
          ]
        }
        return options
      },
    },
    webpack(compiler) {
      const { resolve } = compiler.options

      compiler.options.entry = makeEntry(compiler.options.entry, ENTRY_FLAG) as any
      if (replaceMoment) {
        resolve.alias = {
          ...resolve.alias,
          moment: 'dayjs',
        }
      }
    },
    transformInclude(id) {
      return id.includes(ENTRY_FLAG)
    },
    resolveId(source) {
      if (source.includes(ENTRY_FLAG))
        return ENTRY_FLAG
    },
    load(id) {
      if (id.endsWith(ENTRY_FLAG))
        return generateCode(plugins)
    },
    transform(code, id) {
      if (id === entryId) {
        const ms = new MagicString(code)
        ms.append(generateCode(plugins))
        return {
          code: ms.toString(),
          map: ms.generateMap(),
        }
      }
    },
  }
})
