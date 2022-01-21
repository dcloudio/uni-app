import { assert } from './testUtils'

describe('compiler: transform scoped slots', () => {
  test('basic', () => {
    assert(
      `<view><slot :item="item" :index="index"/></view>`,
      `<view><slot name="d"/></view>`,
      `(_ctx, _cache) => {
  return { a: _r("d", { item: _ctx.item, index: _ctx.index }) }
}`
    )
  })
  test('named slots', () => {
    assert(
      `<view><slot name="header" :item="item" :index="index"/></view>`,
      `<view><slot name="header"/></view>`,
      `(_ctx, _cache) => {
  return { a: _r("header", { item: _ctx.item, index: _ctx.index }) }
}`
    )
  })
  test('named slots + v-if', () => {
    assert(
      `<view><slot v-if="ok" name="header" :item="item" :index="index"/></view>`,
      `<view><slot wx:if="{{a}}" name="header"/></view>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? { b: _r("header", { item: _ctx.item, index: _ctx.index }) } : {})
}`
    )
  })
})
