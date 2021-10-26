import { assert } from './testUtils'

describe('compiler: transform ref', () => {
  test('without ref', () => {
    assert(
      `<custom/>`,
      `<custom v-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<custom/><custom/><custom1/>`,
      `<custom v-i="2a9ec0b0-0"/><custom v-i="2a9ec0b0-1"/><custom1 v-i="2a9ec0b0-2"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('static ref', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom class="v-r" data-ref="custom" v-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<custom v-for="item in items" ref="custom"/>`,
      `<custom wx:for="{{a}}" wx:for-item="item" class="v-r-i-f" data-ref="custom" v-i="{{item.a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-0' + '-' + i0 }; }) }
}`
    )
  })
  test('dynamic ref', () => {
    assert(
      `<custom :ref="custom"/>`,
      `<custom class="v-r" data-ref="{{a}}" v-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.custom }
}`
    )
    assert(
      `<custom v-for="item in items" :ref="custom"/>`,
      `<custom wx:for="{{a}}" wx:for-item="item" class="v-r-i-f" data-ref="{{b}}" v-i="{{item.a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-0' + '-' + i0 }; }), b: _ctx.custom }
}`
    )
  })
})
