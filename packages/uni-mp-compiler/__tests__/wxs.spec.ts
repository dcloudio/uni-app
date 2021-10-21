import { assert } from './testUtils'

describe('compiler: transform wxs', () => {
  test('basic', () => {
    assert(
      `<view :data-threshold="threshold" :change:prop="swipe.showWatch" :prop="is_show" @touchstart="swipe.touchstart"/>`,
      `<view data-threshold="{{a}}" change:prop="{{swipe.showWatch}}" prop="{{b}}" bindtouchstart="{{swipe.touchstart}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.threshold, b: _ctx.is_show }
}`,
      {
        filters: ['swipe'],
        cacheHandlers: true,
      }
    )
  })
  test('cacheHandlers', () => {
    assert(
      `<view :data-threshold="threshold" :change:prop="swipe.showWatch" :prop="is_show" @touchstart="swipe.touchstart"/>`,
      `<view data-threshold="{{a}}" change:prop="{{swipe.showWatch}}" prop="{{b}}" bindtouchstart="{{swipe.touchstart}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.threshold, b: _ctx.is_show }
}`,
      {
        filters: ['swipe'],
        cacheHandlers: true,
      }
    )
  })
})
