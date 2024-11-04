import { assert } from './testUtils'

describe('compiler: transform id', () => {
  test('static id', () => {
    assert(
      `<view id="view"/>`,
      `<view id="view" change:eS="{{uV.sS}}" eS="{{$eS[a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _si('view', 'view') }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" id="view"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="view" change:eS="{{uV.sS}}" eS="{{$eS[b]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return {}; }), b: _si('view', 'view') }
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
  return { a: _si(_ctx.viewId, 'view') }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{b}}" change:eS="{{uV.sS}}" eS="{{$eS[b]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return {}; }), b: _si(_ctx.viewId, 'view') }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId+'_'+item"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{item.a}}" change:eS="{{uV.sS}}" eS="{{$eS[item.a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return { a: _si(_ctx.viewId + '_' + item, 'view') }; }) }
}`,
      {
        isX: true,
      }
    )
  })
})
