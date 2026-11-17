import type { Normalize } from '../utils'
import { decodeFontFamily } from '../utils/fontFamily'

export const normalizeFontFamily: Normalize = (v, options) => {
  if (options.dom2) {
    return { value: decodeFontFamily(String(v)) }
  }
  v = (v || '').toString().replace(/["']/g, '')
  return {
    value: v,
  }
}
