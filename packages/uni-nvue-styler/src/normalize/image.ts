import { Normalize } from '../utils'

export const normalizeGradient: Normalize = (v) => {
  v = (v || '').toString()
  if (/^linear-gradient(.+)$/s.test(v)) {
    return { value: v }
  }

  return {
    // 枚举里会做reason提示
    value: null,
  }
}

export const normalizeUrl: Normalize = (v) => {
  v = (v || '').toString()
  if (/^url(.+)$/s.test(v)) {
    return { value: v }
  }

  return {
    value: null,
  }
}
