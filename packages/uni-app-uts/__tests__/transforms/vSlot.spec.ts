import { assert } from '../testUtils'

describe('compiler: slot', () => {
  test('component with slot', () => {
    assert(
      `<view><slot></slot></view>`,
      `@Suppress("UNUSED_PARAMETER") function PagesIndexIndexRender(_ctx: PagesIndexIndex): VNode | null {
  return createElementVNode("view", null, [
    renderSlot(_ctx.$slots, "default")
  ])
}`,
      {
        targetLanguage: 'kotlin',
        mode: 'function',
      }
    )
  })

  test('template component with slot', () => {
    assert(
      `<view><Foo>test</Foo></view>`,
      `@Suppress("UNUSED_PARAMETER") function PagesIndexIndexRender(_ctx: PagesIndexIndex): VNode | null {
const _component_Foo = resolveComponent("Foo")

  return createElementVNode("view", null, [
    createVNode(_component_Foo, null, new Map<string,any>([
      [
        createElementVNode("text", null, "test")
      ],
    ]))
  ])
}`,
      {
        targetLanguage: 'kotlin',
        mode: 'function',
      }
    )
  })
})
