import { assert } from './testUtils'

describe(`mp-xhs: transform v-if`, () => {
  test(`basic`, () => {
    assert(
      `<view v-if="ok"/><view v-else-if="ok1"/><view v-else/>`,
      `<view xhs:if="{{a}}"/><view xhs:elif="{{b}}"/><view xhs:else/>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? {} : _ctx.ok1 ? {} : {}, { b: _ctx.ok1 })
}`
    )
  })
})
