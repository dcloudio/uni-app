import { assert } from '../testUtils'

describe('compiler: component', () => {
  test('template component', () => {
    assert(
      `<view><Foo /></view>`,
      `@Suppress("UNUSED_PARAMETER") function PagesIndexIndexRender(_ctx: PagesIndexIndex): VNode | null {
const _component_Foo = resolveComponent("Foo")

  return createElementVNode("view", null, [
    createVNode(_component_Foo)
  ])
}`,
      {
        targetLanguage: 'kotlin',
        mode: 'function',
      }
    )
  })
})
