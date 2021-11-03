import { assert } from './testUtils'

describe('mp-weixin: transform component', () => {
  test('lazy element', () => {
    assert(
      `<editor/>`,
      `<editor/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<editor @ready="ready"/>`,
      `<block wx:if="{{r0}}"><editor bindready="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.ready) }
}`
    )
  })
  test(`match-media`, () => {
    assert(
      `<match-media/>`,
      `<match-media/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
})
