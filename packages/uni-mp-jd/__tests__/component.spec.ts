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
      `<switch bindchange="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.change) }
}`
    )
  })
})
