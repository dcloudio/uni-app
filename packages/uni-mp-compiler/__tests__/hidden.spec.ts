import { assert } from './testUtils'

describe('compiler: transform hidden', () => {
  test('v-bind:hidden basic', () => {
    assert(
      `<view :hidden="true"/>`,
      `<view hidden="{{true}}"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<view :hidden="false"/>`,
      `<view hidden="{{false}}"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<view hidden />`,
      `<view hidden/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<view :hidden="foo"/>`,
      `<view hidden="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.foo }
}`
    )
    assert(
      `<view :hidden="foo | bar"/>`,
      `<view hidden="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.foo | _ctx.bar }
}`
    )
  })
})
