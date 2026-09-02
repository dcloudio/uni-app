import { type Declaration, createDecl, splitValues } from '../utils'

function isSingleCssVarValue(value: string): boolean {
  const trimmedValue = value.trim()
  if (splitValues(trimmedValue).length !== 1 || !/^var\(/i.test(trimmedValue)) {
    return false
  }

  let depth = 0
  for (let i = 0; i < trimmedValue.length; i++) {
    const char = trimmedValue[i]
    if (char === '(') {
      depth++
    } else if (char === ')') {
      if (depth === 0) {
        return false
      }
      depth--
      if (depth === 0 && trimmedValue.slice(i + 1).trim()) {
        return false
      }
    }
  }

  return depth === 0
}

export function tryExpandSingleValueVarShorthand(
  decl: Declaration,
  props: string[],
  value: string,
  dom2: boolean
): Declaration[] | null {
  // 只在 dom2 运行时兜底展开，避免影响其它平台现有行为。
  if (!dom2) {
    return null
  }
  // 当整个简写值只有一个 var() 时，无法静态判断它属于哪个子属性，
  // 这里直接复制到每个长属性，交给运行时再解析。
  if (!isSingleCssVarValue(value)) {
    return null
  }

  return expandShorthand(decl, props, value)
}

export function expandShorthand(
  decl: Declaration,
  props: string[],
  value: string
): Declaration[] {
  const { important, raws, source } = decl
  return props.map((prop) => createDecl(prop, value, important, raws, source))
}
