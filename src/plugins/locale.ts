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

const locale: PluginFunc = (o, dayjsClass) => {
  const originalLocale = dayjsClass.prototype.locale
  dayjsClass.prototype.locale = (function(this: dayjs.Dayjs, preset: string | ILocale, object?: Partial<ILocale>) {
    if (typeof preset === 'string') {
      preset = parseLocale(preset)
    }
    else if (typeof preset === 'object' && 'name' in preset) {
      preset = {
        ...preset,
        name: parseLocale(preset.name),
      }
    }
    return originalLocale.call(this, preset, object)
  }) as typeof originalLocale
}

export default locale
