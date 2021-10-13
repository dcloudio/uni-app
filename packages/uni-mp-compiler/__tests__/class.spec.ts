import { assert } from './testUtils'

describe('compiler: transform class', () => {
  test(`static class`, () => {
    assert(
      `<view class="foo"/>`,
      `<view class="foo"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<view class="foo bar"/>`,
      `<view class="foo bar"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<view class="foo  bar"/>`,
      `<view class="foo bar"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('v-bind:class basic', () => {
    assert(
      `<view :class="foo"/>`,
      `<view class="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.foo }
}`
    )
    assert(
      `<view :class="foo | bar"/>`,
      `<view class="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.foo | _ctx.bar }
}`
    )
  })
  test('v-bind:class object syntax', () => {
    assert(
      `<view :class="{ red: isRed }"/>`,
      `<view class="{{[a && 'red']}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.isRed }
}`
    )
    assert(
      `<view :class="{ a: 1, b: 0, c: true, d: false, e: null, f: undefined, g: ok, h: handle(ok), i: ok>1 }"/>`,
      `<view class="{{['a', 'c', a && 'g', b && 'h', c && 'i']}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.ok, b: _ctx.handle(_ctx.ok), c: _ctx.ok > 1 }
}`
    )
  })
  test('v-bind:class array syntax', () => {})
})
