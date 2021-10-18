import { assert } from './testUtils'

describe('compiler: transform v-show', () => {
  test('basic', () => {
    assert(
      `<view v-show="show"/>`,
      `<view hidden="{{!a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.show }
}`
    )
  })
})
