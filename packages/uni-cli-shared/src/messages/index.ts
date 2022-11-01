import { osLocale } from 'os-locale-s-fix'
import en from './en'
import zh_CN from './zh_CN'
function format(lang: string) {
  const array = lang.split(/[.,]/)[0].split(/[_-]/)
  array[0] = array[0].toLowerCase()
  if (array[0] === 'zh') {
    array[1] = (array[1] || 'CN').toUpperCase()
  }
  array.length = Math.min(array.length, 2)
  return array.join('_')
}
const locale = format(
  process.env.UNI_HBUILDERX_LANGID ||
    osLocale.sync({ spawn: true, cache: false }) ||
    'en'
)

export const M = locale === 'zh_CN' ? zh_CN : en
