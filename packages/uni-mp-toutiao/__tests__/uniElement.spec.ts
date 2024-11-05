import { assert } from './testUtils'

describe('compiler: transform UniElement', () => {
  test('static id', () => {
    assert(
      `<view id="view"/>`,
      `<view id="view" change:eS="{{uV.sS}}" eS="{{$eS[a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _sei('view', 'view') }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" id="view"/>`,
      `<view tt:for="{{a}}" tt:for-item="item" id="view" change:eS="{{uV.sS}}" eS="{{$eS[b]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei('view', 'view') }
}`,
      {
        isX: true,
      }
    )
  })
  test('dynamic id', () => {
    assert(
      `<view :id="viewId"/>`,
      `<view id="{{a}}" change:eS="{{uV.sS}}" eS="{{$eS[a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _sei(_ctx.viewId, 'view') }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId"/>`,
      `<view tt:for="{{a}}" tt:for-item="item" id="{{b}}" change:eS="{{uV.sS}}" eS="{{$eS[b]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei(_ctx.viewId, 'view') }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId+'_'+item"/>`,
      `<view tt:for="{{a}}" tt:for-item="item" id="{{item.a}}" change:eS="{{uV.sS}}" eS="{{$eS[item.a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return { a: _sei(_ctx.viewId + '_' + item, 'view') }; }) }
}`,
      {
        isX: true,
      }
    )
  })
  test('static ref', () => {
    assert(
      `<view ref="view"/>`,
      `<view ref="view" id="2a9ec0b0-r0" change:eS="{{uV.sS}}" eS="{{$eS[a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _sei('2a9ec0b0-r0', 'view', 'view') }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" ref="view"/>`,
      `<view tt:for="{{a}}" tt:for-item="item" ref="view" id="{{item.a}}" change:eS="{{uV.sS}}" eS="{{$eS[item.a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return { a: _sei('2a9ec0b0-r0-' + k0, 'view', 'view', { "f": 1 }) }; }) }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" ref="v0"><view v-for="item in 10" ref="v1"/></view>`,
      `<view tt:for="{{a}}" tt:for-item="item" ref="v0" id="{{item.b}}" change:eS="{{uV.sS}}" eS="{{$eS[item.b]}}"><view tt:for="{{item.a}}" tt:for-item="item" ref="v1" id="{{item.a}}" change:eS="{{uV.sS}}" eS="{{$eS[item.a]}}"/></view>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return { a: _f(10, (item, k1, i1) => { return { a: _sei('2a9ec0b0-r0-' + k1 + '-' + k0, 'view', 'v1', { "f": 1 }) }; }), b: _sei('2a9ec0b0-r1-' + k0, 'view', 'v0', { "f": 1 }) }; }) }
}`,
      {
        isX: true,
      }
    )
  })
})
