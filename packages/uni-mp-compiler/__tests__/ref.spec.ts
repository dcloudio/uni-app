import { assert } from './testUtils'

describe('compiler: transform ref', () => {
  test('v-r', () => {
    assert(
      `<custom/>`,
      `<custom class="v-r" v-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<custom/><custom/><custom1/>`,
      `<custom class="v-r" v-i="2a9ec0b0-0"/><custom class="v-r" v-i="2a9ec0b0-1"/><custom1 class="v-r" v-i="2a9ec0b0-2"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('v-r-i-f', () => {
    assert(
      `<custom v-for="item in items"/>`,
      `<custom wx:for="{{a}}" wx:for-item="item" class="v-r-i-f" v-i="{{item.a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _vFor(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-0' + '-' + i0 }; }) }
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
  })
  test('dynamic ref', () => {
    assert(
      `<custom :ref="custom"/>`,
      `<custom class="v-r" data-ref="{{a}}" v-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.custom }
}`
    )
  })
})
