import { assert } from '../testUtils'

describe('compiler: transform tap to click', () => {
  test('transform tap to click', () => {
    assert(
      `<text @click="click">hello</text>`,
      `createElementVNode("text", utsMapOf({ onClick: _ctx.click }), "hello", 8 /* PROPS */, ["onClick"])`
    )
    assert(
      `<text @tap="click">hello</text>`,
      `createElementVNode("text", utsMapOf({ onClick: _ctx.click }), "hello", 8 /* PROPS */, ["onClick"])`
    )
    assert(
      `<view @tap="click">hello</view>`,
      `createElementVNode("view", utsMapOf({ onClick: _ctx.click }), [
  createElementVNode("text", null, "hello")
], 8 /* PROPS */, ["onClick"])`
    )
    assert(
      `<button @tap="click">hello</button>`,
      `createVNode(_component_button, utsMapOf({ onClick: _ctx.click }), utsMapOf({
  default: withCtx((): any[] => ["hello"]),
  _: 1 /* STABLE */
}), 8 /* PROPS */, ["onClick"])`
    )
  })
})
