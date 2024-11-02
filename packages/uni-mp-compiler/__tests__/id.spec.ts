import { assert } from './testUtils'

describe('compiler: transform id', () => {
  test('static id', () => {
    assert(
      `<view id="view"/>`,
      `<view id="view"/>`,
      `(_ctx, _cache) => {
  return { a: _si('view') }
}`,
      {
        isX: true,
      }
    )
  })
  test('dynamic id', () => {
    assert(
      `<view :id="viewId"/>`,
      `<view id="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _si(_ctx.viewId) }
}`,
      {
        isX: true,
      }
    )
  })
})
