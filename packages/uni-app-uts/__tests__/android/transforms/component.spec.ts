import { assert } from '../testUtils'

describe('compiler: component', () => {
  test('template component', () => {
    assert(
      `<view><Foo /></view>`,
      `
function PagesIndexIndexRender(): VNode | null {
const _ctx = this
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
