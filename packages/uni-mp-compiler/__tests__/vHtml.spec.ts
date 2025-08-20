import { assert } from './testUtils'

describe('compiler: transform v-html', () => {
  test('basic', () => {
    assert(
      `<view v-html="html"></view>`,
      `<view><rich-text nodes="{{a}}"/></view>`,
      `(_ctx, _cache) => {
  return { a: _ctx.html }
}`
    )
    assert(
      `<view v-html="'<div/>'"></view>`,
      `<view><rich-text nodes="{{'<div/>'}}"/></view>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('self closing', () => {
    assert(
      `<view v-html="html"/>`,
      `<view><rich-text nodes="{{a}}"/></view>`,
      `(_ctx, _cache) => {
  return { a: _ctx.html }
}`
    )
  })
  test('with children nodes', () => {
    assert(
      `<view v-html="html">hello</view>`,
      `<view><rich-text nodes="{{a}}"/></view>`,
      `(_ctx, _cache) => {
  return { a: _ctx.html }
}`
    )
  })
})
