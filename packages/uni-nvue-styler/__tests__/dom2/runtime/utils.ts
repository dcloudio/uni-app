import type { Declaration } from 'postcss'
import { expand } from '../../../src/dom2/esm'

const processDeclaration = expand({ type: 'uvue' }).Declaration as (
  decl: Declaration
) => void

function createDeclaration(prop: string, value: unknown) {
  const newValue = value + ''
  if (newValue.includes('!important')) {
    return {
      prop,
      value: newValue.replace(/\s*!important/, ''),
      important: true,
    }
  }
  return {
    prop,
    value: newValue,
    important: false,
  }
}

function normalizeStyle(name: string, value: unknown) {
  const decl = Object.assign(
    {},
    {
      replaceWith(newProps: Declaration[]) {
        props = newProps
      },
    },
    createDeclaration(name, value)
  ) as Declaration

  let props = [decl]
  processDeclaration(decl)
  return props
}

function setStyle(expandRes: any[]) {
  const resArr = expandRes.map((item) => {
    return [item.prop as string, item.value as string]
  }) as Array<[string, string]>
  // to Map
  const resMap = new Map(resArr)
  return resMap
}

/**
 * 解析 style，返回 Map
 * eg: width, null => map [['width', '']]
 */
export function parseStyleDecl(
  prop: string,
  value: any | null
): Map<string, any> {
  const val = normalizeStyle(prop, value)
  const res = setStyle(val)
  return res
}
