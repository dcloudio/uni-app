import { assert } from './testUtils'

describe(`mp-xhs: transform v-for`, () => {
  test(`with key`, () => {
    assert(
      `<view v-for="item in items" :key="item.id"/>`,
      `<view xhs:for="{{a}}" xhs:for-item="item" xhs:key="a"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: item.id }; }) }
}`
    )
  })
  test(`without key`, () => {
    assert(
      `<view v-for="item in items"/>`,
      `<view xhs:for="{{a}}" xhs:for-item="item"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return {}; }) }
}`
    )
  })
})
