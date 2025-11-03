import { assert } from './testUtils'

describe('compiler: transform v-text', () => {
  test('basic', () => {
    assert(
      `<view>{{text}}</view>`,
      `<view>{{a}}</view>`,
      `(_ctx, _cache) => {
  return { a: _t(_ctx.text) }
}`
    )
    assert(
      `<view v-text="text"></view>`,
      `<view>{{a}}</view>`,
      `(_ctx, _cache) => {
  return { a: _t(_ctx.text) }
}`
    )
    assert(
      `<view v-text="'text'"></view>`,
      `<view>{{a}}</view>`,
      `(_ctx, _cache) => {
  return { a: _t('text') }
}`
    )
  })
  test('self closing', () => {
    assert(
      `<view v-text="text"/>`,
      `<view>{{a}}</view>`,
      `(_ctx, _cache) => {
  return { a: _t(_ctx.text) }
}`
    )
  })
  test('with children nodes', () => {
    assert(
      `<view v-text="text">hello</view>`,
      `<view>{{a}}</view>`,
      `(_ctx, _cache) => {
  return { a: _t(_ctx.text) }
}`
    )
  })
})
