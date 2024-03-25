import { transformTapToClick } from '@dcloudio/uni-cli-shared'
import { assert } from '../testUtils'

describe('compiler: transform tap to click', () => {
  test('transform tap to click', () => {
    const options = { nodeTransforms: [transformTapToClick as any] }
    assert(
      `<text @click="click">hello</text>`,
      `createElementVNode("text", utsMapOf({ onClick: _ctx.click }), "hello", 8 /* PROPS */, ["onClick"])`,
      options
    )
    assert(
      `<text @tap="click">hello</text>`,
      `createElementVNode("text", utsMapOf({ onClick: _ctx.click }), "hello", 8 /* PROPS */, ["onClick"])`,
      options
    )
    assert(
      `<view @tap="click">hello</view>`,
      `createElementVNode("view", utsMapOf({ onClick: _ctx.click }), "hello", 8 /* PROPS */, ["onClick"])`,
      options
    )
    assert(
      `<button @tap="click">hello</button>`,
      `createVNode(_component_button, utsMapOf({ onClick: _ctx.click }), utsMapOf({
  default: withSlotCtx((): any[] => ["hello"]),
  _: 1 /* STABLE */
}), 8 /* PROPS */, ["onClick"])`,
      options
    )
  })
})
