import { assert } from './testUtils'

describe('compiler: transform ref', () => {
  test('vue-ref', () => {
    assert(
      `<custom/>`,
      `<custom class="vue-ref" vue-id="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<custom/><custom/><custom1/>`,
      `<custom class="vue-ref" vue-id="2a9ec0b0-0"/><custom class="vue-ref" vue-id="2a9ec0b0-1"/><custom1 class="vue-ref" vue-id="2a9ec0b0-2"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('vue-ref-in-for', () => {
    assert(
      `<custom v-for="item in items"/>`,
      `<custom wx:for="{{a}}" wx:for-item="item" class="vue-ref-in-for" vue-id="{{item.a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _vFor(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-0' + '-' + i0 }; }) }
}`
    )
  })
  test('static ref', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom class="vue-ref" data-ref="custom" vue-id="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('dynamic ref', () => {
    assert(
      `<custom :ref="custom"/>`,
      `<custom class="vue-ref" data-ref="{{a}}" vue-id="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.custom }
}`
    )
  })
})
