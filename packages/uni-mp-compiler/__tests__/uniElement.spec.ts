import { assert } from './testUtils'

describe('compiler: transform UniElement', () => {
  test('static id', () => {
    assert(
      `<view id="view"/>`,
      `<view id="view" style="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _sei('view', 'view'), b: _s(_us('view')) }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" id="view"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="view" style="{{c}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei('view', 'view'), c: _s(_us('view')) }
}`,
      {
        isX: true,
      }
    )
  })
  test('dynamic id', () => {
    assert(
      `<view :id="viewId"/>`,
      `<view id="{{a}}" style="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _sei(_ctx.viewId, 'view'), b: _s(_us(_ctx.viewId)) }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{b}}" style="{{c}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei(_ctx.viewId, 'view'), c: _s(_us(_ctx.viewId)) }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId+'_'+item"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{item.a}}" style="{{item.b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return { a: _sei(_ctx.viewId + '_' + item, 'view'), b: _s(_us(_ctx.viewId + '_' + item)) }; }) }
}`,
      {
        isX: true,
      }
    )
  })
  test('static ref', () => {
    assert(
      `<view ref="view"/>`,
      `<view ref="view" id="2a9ec0b0-r0" style="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _sei('2a9ec0b0-r0', 'view', 'view'), b: _s(_us('2a9ec0b0-r0')) }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" ref="view"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" ref="view" id="{{item.a}}" style="{{item.b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return { a: _sei('2a9ec0b0-r0-' + k0, 'view', 'view', { "f": 1 }), b: _s(_us('2a9ec0b0-r0-' + k0)) }; }) }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" ref="v0"><view v-for="item in 10" ref="v1"/></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" ref="v0" id="{{item.b}}" style="{{item.c}}"><view wx:for="{{item.a}}" wx:for-item="item" ref="v1" id="{{item.a}}" style="{{item.b}}"/></view>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return { a: _f(10, (item, k1, i1) => { return { a: _sei('2a9ec0b0-r0-' + k1 + '-' + k0, 'view', 'v1', { "f": 1 }), b: _s(_us('2a9ec0b0-r0-' + k1 + '-' + k0)) }; }), b: _sei('2a9ec0b0-r1-' + k0, 'view', 'v0', { "f": 1 }), c: _s(_us('2a9ec0b0-r1-' + k0)) }; }) }
}`,
      {
        isX: true,
      }
    )
  })
})
