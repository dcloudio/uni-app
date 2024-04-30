import type { Normalize } from '../utils'

export const normalizeString: Normalize = (v) => {
  v = (v || '').toString().replace(/["']/g, '')
  return {
    value: v,
  }
}
