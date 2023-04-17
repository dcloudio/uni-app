import { assert } from './testUtils'

describe('compiler:codegen', () => {
  test('default', () => {
    assert(`<view/>`, `createElementVNode("view")`)
    assert(
      `<view style="width:100px;height:100px;"/>`,
      `createElementVNode("view", new Map<string,any>([["style", "width:100px;height:100px;"]]))`
    )
  })
  test(`function:kotlin`, () => {
    assert(
      `<view/>`,
      `@Suppress("UNUSED_PARAMETER") function PagesIndexIndexRender(ctx: PagesIndexIndex): VNode | null {\n  return createElementVNode("view")\n}`,
      {
        targetLanguage: 'kotlin',
        mode: 'function',
      }
    )
  })
})
