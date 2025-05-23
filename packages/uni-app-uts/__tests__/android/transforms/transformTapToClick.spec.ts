import { transformTapToClick } from '@dcloudio/uni-cli-shared'
import { assert } from '../testUtils'

describe('compiler: transform tap to click', () => {
  test('transform tap to click', () => {
    const options = { nodeTransforms: [transformTapToClick as any] }
    assert(
      `<text @click="click">hello</text>`,
      `_cE("text", _uM({ onClick: _ctx.click }), "hello", 8 /* PROPS */, ["onClick"])`,
      options
    )
    assert(
      `<text @tap="click">hello</text>`,
      `_cE("text", _uM({ onClick: _ctx.click }), "hello", 8 /* PROPS */, ["onClick"])`,
      options
    )
    assert(
      `<view @tap="click">hello</view>`,
      `_cE("view", _uM({ onClick: _ctx.click }), "hello", 8 /* PROPS */, ["onClick"])`,
      options
    )
    assert(
      `<button @tap="click">hello</button>`,
      `_cE("button", _uM({ onClick: _ctx.click }), "hello", 8 /* PROPS */, ["onClick"])`,
      options
    )
  })
})
