import { assert } from './testUtils'

describe('mp-toutiao: transform swiper', () => {
  //   test(`attribute disable-touch`, () => {
  //     assert(
  //       `<swiper disable-touch/>`,
  //       `<swiper touchable="{{false}}"/>`,
  //       `(_ctx, _cache) => {
  //   return {}
  // }`
  //     )
  //     assert(
  //       `<swiper disable-touch="false"/>`,
  //       `<swiper touchable="{{false}}"/>`,
  //       `(_ctx, _cache) => {
  //   return {}
  // }`
  //     )
  //   })
  test(`v-bind disable-touch`, () => {
    assert(
      `<swiper :disable-touch="true"/>`,
      `<swiper touchable="{{false}}"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<swiper :disable-touch="false"/>`,
      `<swiper touchable="{{true}}"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<swiper :disable-touch="disableTouch"/>`,
      `<swiper touchable="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: !_ctx.disableTouch }
}`
    )
  })
})
