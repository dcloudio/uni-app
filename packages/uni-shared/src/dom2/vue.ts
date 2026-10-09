import {
  isArray,
  isString,
  normalizeClass,
  parseStringStyle,
} from '@vue/shared'
import type { NormalizedStyle } from '@vue/shared'

// class 沿用 Vue 标准解析；dom2 的 style 需要对象，供 sharedData 逐项转换原生样式，
// 因此字符串不能像 Vue normalizeStyle 一样原样返回。Map 转换保留已发布的兼容行为。
// 普通对象（包括 UTSJSONObject）直接返回，旧值快照由 setSharedDataStyle 按需保存。
export function normalizeVaporStyle(
  value: unknown
): NormalizedStyle | undefined {
  if (typeof value === 'string') {
    return parseStringStyle(value)
  }
  if (value === null || typeof value !== 'object') {
    return
  }
  if (isArray(value)) {
    const res: NormalizedStyle = {}
    for (let i = 0; i < value.length; i++) {
      const item = value[i]
      const normalized = isString(item)
        ? parseStringStyle(item)
        : normalizeVaporStyle(item)
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key]
        }
      }
    }
    return res
  } else if (value instanceof Map) {
    const res: NormalizedStyle = {}
    value.forEach((value, key) => {
      res[key] = value
    })
    return res
  }
  return value as NormalizedStyle
}

export function normalizeVaporProps(props: Record<string, any> | null) {
  if (!props) return null
  const { class: klass, style } = props
  if (klass && !isString(klass)) {
    props.class = normalizeClass(klass)
  }
  if (style) {
    props.style = normalizeVaporStyle(style)
  }
  return props
}
