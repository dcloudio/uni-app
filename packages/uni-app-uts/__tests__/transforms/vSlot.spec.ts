import { assert } from '../testUtils'

describe('compiler: slot', () => {
  test('component with slot', () => {
    assert(
      `<view><slot data="data"></slot></view>`,
      `@Suppress("UNUSED_PARAMETER") function PagesIndexIndexRender(_ctx: PagesIndexIndex): VNode | null {
  return createElementVNode("view", null, [
    renderSlot(_ctx.$slots, "default", new Map<string,any | null>([["data", "data"]]))
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
    createVNode(_component_Foo, new Map<string,any | null>([["onClick", _ctx.test]]), new Map<string,any | null>([
      ["default", ((): any[] => [
        createElementVNode("text", null, "test")
      ])],
      ["_", 1 /* STABLE */]
    ]), 8 /* PROPS */, ["onClick"])
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

  test('scoped slots', () => {
    assert(
      `<view><Foo><template v-slot="props"><text>msg: {{props.msg}}</text></template></Foo></view>`,
      `@Suppress("UNUSED_PARAMETER") function PagesIndexIndexRender(_ctx: PagesIndexIndex): VNode | null {
const _component_Foo = resolveComponent("Foo")

  return createElementVNode("view", null, [
    createVNode(_component_Foo, null, new Map<string,any | null>([
      ["default", ((props: Map<string, any | null>): any[] => [
        createElementVNode("text", null, "msg: " + toDisplayString(props.msg), 1 /* TEXT */)
      ])],
      ["_", 1 /* STABLE */]
    ]))
  ])
}`,
      {
        targetLanguage: 'kotlin',
        mode: 'function',
      }
    )
  })

  test('scoped slots shorthand', () => {
    assert(
      `<view><Foo><template #default="props"><text>msg: {{props.msg}}</text></template></Foo></view>`,
      `@Suppress("UNUSED_PARAMETER") function PagesIndexIndexRender(_ctx: PagesIndexIndex): VNode | null {
const _component_Foo = resolveComponent("Foo")

  return createElementVNode("view", null, [
    createVNode(_component_Foo, null, new Map<string,any | null>([
      ["default", ((props: Map<string, any | null>): any[] => [
        createElementVNode("text", null, "msg: " + toDisplayString(props.msg), 1 /* TEXT */)
      ])],
      ["_", 1 /* STABLE */]
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
