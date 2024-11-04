import { assert } from './testUtils'

describe('compiler: transform id', () => {
  test('static id', () => {
    assert(
      `<view id="view"/>`,
      `<view id="view" change:e-s="{{uF.sS}}" e-s="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _si('view'), b: _us('view') }
}`,
      {
        isX: true,
      }
    )
  })
  test('dynamic id', () => {
    assert(
      `<view :id="viewId"/>`,
      `<view id="{{a}}" change:e-s="{{uF.sS}}" e-s="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _si(_ctx.viewId), b: _us(_ctx.viewId) }
}`,
      {
        isX: true,
      }
    )
  })
})
