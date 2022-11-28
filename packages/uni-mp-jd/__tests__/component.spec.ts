import { assert } from './testUtils'

describe('mp-jd: transform component', () => {
  test('lazy element', () => {
    assert(
      `<switch/>`,
      `<switch/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<switch @change="change"/>`,
      `<block jd:if="{{r0}}"><switch bindchange="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.change) }
}`
    )
  })
})
