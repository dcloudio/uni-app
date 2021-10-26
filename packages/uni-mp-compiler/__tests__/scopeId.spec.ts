import { assert } from './testUtils'

describe('compiler: transform scopeId', () => {
  const options = {
    scopeId: 'data-v-5584ec96',
  }
  test(`without static class`, () => {
    assert(
      `<view/>`,
      `<view class="data-v-5584ec96"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
    assert(
      `<view :class="foo"/>`,
      `<view class="{{['data-v-5584ec96', a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.foo) }
}`,
      options
    )
  })
  test(`with static class`, () => {
    assert(
      `<view class="foo"/>`,
      `<view class="foo data-v-5584ec96"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
    assert(
      `<view class="bar" :class="foo"/>`,
      `<view class="{{['bar', 'data-v-5584ec96', a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.foo) }
}`,
      options
    )
    assert(
      `<view :class="foo" class="bar"/>`,
      `<view class="{{[a, 'bar', 'data-v-5584ec96']}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.foo) }
}`,
      options
    )
  })
})
