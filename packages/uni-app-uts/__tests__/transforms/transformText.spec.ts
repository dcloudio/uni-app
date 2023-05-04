import { assert } from '../testUtils'

describe('compiler: transform text', () => {
  test('transform text', () => {
    assert(
      `<view>hello</view>`,
      `createElementVNode("view", null, [
  createElementVNode("text", null, "hello")
])`
    )
    assert(
      `<view><text>hello</text></view>`,
      `createElementVNode("view", null, [
  createElementVNode("text", null, "hello")
])`
    )
    assert(
      `<view>hello{{a}}<view>aaa{{a}}</view>{{b}}</view>`,
      `createElementVNode("view", null, [
  createElementVNode("text", null, "hello"),
  createElementVNode("text", null, toDisplayString(_ctx.a), 1 /* TEXT */),
  createElementVNode("view", null, [
    createElementVNode("text", null, "aaa"),
    createElementVNode("text", null, toDisplayString(_ctx.a), 1 /* TEXT */)
  ]),
  createElementVNode("text", null, toDisplayString(_ctx.b), 1 /* TEXT */)
])`
    )
  })
})
