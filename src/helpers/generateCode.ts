const dayjs = 'DAYJS_IMPORT_NAME'
export const generateCode = (plugins: string[] = []) => {
  return ['', `import ${dayjs} from "dayjs"`]
    .concat(
      plugins?.map((plugin) => {
        return `import ${plugin} from "dayjs/plugin/${plugin}";`
      }))
    .concat(
      plugins?.map(plugin => `${dayjs}.extend(${plugin});`))
    .concat(
      [
        'import localePlugin from "unplugin-moment-to-dayjs/plugins/locale";',
        `${dayjs}.extend(localePlugin);`,
      ],
    ).join('\n')
}
