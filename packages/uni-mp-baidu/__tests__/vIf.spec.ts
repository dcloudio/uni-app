import { assert } from './testUtils'

describe(`mp-baidu: transform v-if`, () => {
  test(`basic`, () => {
    assert(
      `<view v-if="ok"/><view v-else-if="ok1"/><view v-else/>`,
      `<view s-if="{{a}}"/><view s-elif="{{b}}"/><view s-else/>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? {} : _ctx.ok1 ? {} : {}, { b: _ctx.ok1 })
}`
    )
  })
})
