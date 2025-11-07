import type { Declaration } from 'postcss'
import { expand, toSharedDataStyle } from '../../src/dom2/esm'

describe('toSharedDataStyle', () => {
  test('basic', () => {
    const style = new Map<string, unknown>()
    style.set('width', '100px')
    style.set('height', '100px')
    style.set('display', 'flex')
    style.set('justify-content', 'center')
    style.set('flex-grow', '2')
    style.set('color', 'red')
    style.set('--color', 'red')
    style.set('--font-size', '16px')
    const result = toSharedDataStyle(style)
    expect(result).toMatchSnapshot()
  })
  test('border: 1px solid red', () => {
    const result = toSharedDataStyle(parseStyleDecl('border', '1px solid red'))
    expect(result).toMatchSnapshot()
  })
})

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
function parseStyleDecl(prop: string, value: any | null): Map<string, any> {
  const val = normalizeStyle(prop, value)
  const res = setStyle(val)
  return res
}
