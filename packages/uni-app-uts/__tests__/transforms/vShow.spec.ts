import { assert } from '../testUtils'

describe('compiler:v-show', () => {
  test('template v-show', () => {
    assert(
      `<view v-show="a"></view>`,
      `withDirectives(createElementVNode("view", null, null, 512 /* NEED_PATCH */), [
  [_vShow, _ctx.a]
])`
    )
  })
})
