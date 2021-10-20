import { assert } from './testUtils'

describe('compiler: transform ref', () => {
  test('vue-ref', () => {
    assert(
      `<custom/>`,
      `<custom class="vue-ref"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<custom/><custom/>`,
      `<custom class="vue-ref"/><custom class="vue-ref"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('vue-ref-in-for', () => {
    assert(
      `<custom v-for="item in items"/>`,
      `<custom wx:for="{{a}}" wx:for-item="item" class="vue-ref-in-for"/>`,
      `(_ctx, _cache) => {
  return { a: _vFor(_ctx.items, item => { return {}; }) }
}`
    )
  })
  test('static ref', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom class="vue-ref" data-ref="custom"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('dynamic ref', () => {
    assert(
      `<custom :ref="custom"/>`,
      `<custom class="vue-ref" data-ref="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.custom }
}`
    )
  })
})
