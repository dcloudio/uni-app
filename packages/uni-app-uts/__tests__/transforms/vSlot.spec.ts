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
      `<view><Foo @click="test">test</Foo></view>`,
      `@Suppress("UNUSED_PARAMETER") function PagesIndexIndexRender(_ctx: PagesIndexIndex): VNode | null {
const _component_Foo = resolveComponent("Foo")

  return createElementVNode("view", null, [
    createVNode(_component_Foo, new Map<string,any | null>([["onClick", _ctx.test]]), [
      createElementVNode("text", null, "test")
    ], 8 /* PROPS */, ["onClick"])
  ])
}`,
      {
        targetLanguage: 'kotlin',
        mode: 'function',
      }
    )
  })

  test('slot in text', () => {
    assert(
      `<view><text><slot/></text></view>`,
      `@Suppress("UNUSED_PARAMETER") function PagesIndexIndexRender(_ctx: PagesIndexIndex): VNode | null {
  return createElementVNode("view", null, [
    createElementVNode("text", null, [
      renderSlot(_ctx.$slots, "default")
    ])
  ])
}`,
      {
        targetLanguage: 'kotlin',
        mode: 'function',
      }
    )
  })
})
