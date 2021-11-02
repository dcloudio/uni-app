import { assert } from './testUtils'

describe(`mp-baidu: transform v-for`, () => {
  test(`with key`, () => {
    assert(
      `<view v-for="item in items" :key="item.id"/>`,
      `<view s-for="item in a trackBy item.a"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: item.id }; }) }
}`
    )
  })
  test(`without key`, () => {
    assert(
      `<view v-for="item in items"/>`,
      `<view s-for="item in a"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return {}; }) }
}`
    )
  })
})
