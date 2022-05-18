import { assert } from './testUtils'

describe('compiler: transform wxs', () => {
  test('basic', () => {
    assert(
      `<view :data-threshold="threshold" :change:prop="swipe.showWatch" :prop="is_show" @touchstart="swipe.touchstart">{{swipe.message}}</view>`,
      `<view data-threshold="{{a}}" change:prop="{{swipe.showWatch}}" prop="{{b}}" bindtouchstart="{{swipe.touchstart}}">{{swipe.message}}</view>`,
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
  test('v-if', () => {
    assert(
      `<view v-if="test.aa()">123</view>`,
      `<view wx:if="{{test.aa()}}">123</view>`,
      `(_ctx, _cache) => {
  return {}
}`,
      {
        filters: ['test'],
      }
    )
    assert(
      `<view v-if="test.aa()">{{msg}}</view>`,
      `<view wx:if="{{test.aa()}}">{{a}}</view>`,
      `(_ctx, _cache) => {
  return { ...{ a: _t(_ctx.msg) } }
}`,
      {
        filters: ['test'],
      }
    )
  })
  test('v-if + v-else', () => {
    assert(
      `<view v-if="test.aa()">{{foo}}</view><view v-else>{{bar}}</view>`,
      `<view wx:if="{{test.aa()}}">{{a}}</view><view wx:else>{{b}}</view>`,
      `(_ctx, _cache) => {
  return { ...{ a: _t(_ctx.foo) }, ...{ b: _t(_ctx.bar) } }
}`,
      {
        filters: ['test'],
      }
    )
  })
  test('v-if + v-else-if + v-else', () => {
    assert(
      `<view v-if="test.aa()">{{foo}}</view><view v-else-if="test.bb()">{{foo}}</view><view v-else>{{bar}}</view>`,
      `<view wx:if="{{test.aa()}}">{{a}}</view><view wx:elif="{{test.bb()}}">{{b}}</view><view wx:else>{{c}}</view>`,
      `(_ctx, _cache) => {
  return { ...{ a: _t(_ctx.foo) }, ...{ ...{ b: _t(_ctx.foo) }, ...{ c: _t(_ctx.bar) } } }
}`,
      {
        filters: ['test'],
      }
    )
  })
})
