import type { PluginFunc } from 'dayjs'
import type dayjs from 'dayjs'

const localeMap = {
  en_GB: 'en-gb',
  en_US: 'en',
  zh_CN: 'zh-cn',
  zh_TW: 'zh-tw',
}

const parseLocale = function parseLocale(locale: string) {
  return Reflect.get(localeMap, locale) ?? locale.split('_')[0]
}

const locale: PluginFunc = (o, dayjsClass, d) => {
  const generateLocale = (locale: any) => (function(this: dayjs.Dayjs, preset: string | ILocale, object?: Partial<ILocale>, isLocal: any) {
    if (typeof preset === 'string') {
      preset = parseLocale(preset)
    }
    else if (typeof preset === 'object' && 'name' in preset) {
      preset = {
        ...preset,
        name: parseLocale(preset.name),
      }
    }
    return locale.call(this, preset, object, isLocal)
  }) as any

  dayjsClass.prototype.locale = generateLocale(dayjsClass.prototype.locale)
  d.locale = generateLocale(d.locale)
}

export default locale
