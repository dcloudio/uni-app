import { assert } from './testUtils'

describe('compiler: transform v-slot', () => {
  test('default slot', () => {
    assert(
      `<custom><template v-slot/></custom>`,
      `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0"><view/></custom>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<custom>test</custom>`,
      `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0">test</custom>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('named slots', () => {
    assert(
      `<custom><template v-slot:header/><template v-slot:default/><template v-slot:footer/></custom>`,
      `<custom u-s="{{['header','d','footer']}}" u-i="2a9ec0b0-0"><view slot="header"/><view slot="d"/><view slot="footer"/></custom>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<unicloud-db v-slot:default="{data, loading, error, options}" collection=""><view v-if="error">{{error.message}}</view><view v-else></view></unicloud-db>`,
      `<unicloud-db u-s="{{['d']}}" slot="d" collection="" u-i="2a9ec0b0-0"><view wx:for="{{a}}" wx:for-item="v0" wx:key="c" slot="{{v0.d}}"><view wx:if="{{v0.a}}">{{v0.b}}</view><view wx:else></view></view></unicloud-db>`,
      `(_ctx, _cache) => {
  return { a: _w(({ data, loading, error, options }, s0, i0) => { return _e({ a: error }, error ? { b: _t(error.message) } : {}, { c: s0, d: i0 }); }, { name: 'd', vueId: '2a9ec0b0-0' }) }
}`
    )
  })

  test(`names slots with single child`, () => {
    assert(
      `<uni-list-item class="item"><template v-slot:body><view class="item"></view></template></uni-list-item>`,
      `<uni-list-item u-s="{{['body']}}" class="item" u-i="2a9ec0b0-0"><view class="item" slot="body"></view></uni-list-item>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })

  test('scoped slots', () => {
    assert(
      `<custom><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0"><view wx:for="{{a}}" wx:for-item="slotProps" wx:key="b" slot="{{slotProps.c}}"><view>{{slotProps.a}}</view></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _w((slotProps, s0, i0) => { return { a: _t(slotProps.item), b: s0, c: i0 }; }, { name: 'd', vueId: '2a9ec0b0-0' }) }
}`
    )
  })

  test('scoped slots + scoped slots', () => {
    assert(
      `<custom><template v-slot:default="slotProps"><custom1><template v-slot:default="slotProps1">{{ slotProps.item }}{{ slotProps1.item }}</template></custom1></template></custom>`,
      `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0"><view wx:for="{{a}}" wx:for-item="slotProps" wx:key="d" slot="{{slotProps.e}}"><custom1 u-s="{{['d']}}" u-i="{{slotProps.c}}"><view wx:for="{{slotProps.a}}" wx:for-item="slotProps1" wx:key="b" slot="{{slotProps1.c}}">{{slotProps.b}}{{slotProps1.a}}</view></custom1></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _w((slotProps, s0, i0) => { return { a: _w((slotProps1, s1, i1) => { return { a: _t(slotProps1.item), b: s1, c: i1 }; }, { name: 'd', vueId: '2a9ec0b0-1' + '-' + i0 + ',' + '2a9ec0b0-0' }), b: _t(slotProps.item), c: '2a9ec0b0-1' + '-' + i0 + ',' + '2a9ec0b0-0', d: s0, e: i0 }; }, { name: 'd', vueId: '2a9ec0b0-0' }) }
}`
    )
  })

  test('v-if + scoped slots', () => {
    assert(
      `<custom><template v-if="ok" v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0"><block wx:if="{{a}}"><view wx:for="{{b}}" wx:for-item="slotProps" wx:key="b" slot="{{slotProps.c}}"><view>{{slotProps.a}}</view></view></block></custom>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? { b: _w((slotProps, s0, i0) => { return { a: _t(slotProps.item), b: s0, c: i0 }; }, { name: 'd', vueId: '2a9ec0b0-0' }) } : {})
}`
    )
  })

  test('v-for + scoped slots', () => {
    assert(
      `<custom v-for="item in items"><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom wx:for="{{a}}" wx:for-item="item" u-s="{{['d']}}" u-i="{{item.b}}"><view wx:for="{{item.a}}" wx:for-item="slotProps" wx:key="b" slot="{{slotProps.c}}"><view>{{slotProps.a}}</view></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _w((slotProps, s1, i1) => { return { a: _t(slotProps.item), b: s1, c: i1 }; }, { name: 'd', vueId: '2a9ec0b0-0' + '-' + i0 }), b: '2a9ec0b0-0' + '-' + i0 }; }) }
}`
    )
  })

  test('v-for + v-for + scoped slots', () => {
    assert(
      `<view v-for="item in items"><custom v-for="item1 in item.list" :item="item1"><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom></view>`,
      `<view wx:for="{{a}}" wx:for-item="item"><custom wx:for="{{item.a}}" wx:for-item="item1" u-s="{{['d']}}" item="{{item1.b}}" u-i="{{item1.c}}"><view wx:for="{{item1.a}}" wx:for-item="slotProps" wx:key="b" slot="{{slotProps.c}}"><view>{{slotProps.a}}</view></view></custom></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _f(item.list, (item1, k1, i1) => { return { a: _w((slotProps, s2, i2) => { return { a: _t(slotProps.item), b: s2, c: i2 }; }, { name: 'd', vueId: '2a9ec0b0-0' + '-' + i0 + '-' + i1 }), b: item1, c: '2a9ec0b0-0' + '-' + i0 + '-' + i1 }; }) }; }) }
}`
    )
  })
  test(`dynamic slot names`, () => {
    assert(
      `<named><template v-slot:[slotName]>{{ slotName }}</template></named>`,
      `<named u-s="{{c}}" u-i="2a9ec0b0-0"><view slot="{{b}}">{{a}}</view></named>`,
      `(_ctx, _cache) => {
  return { a: _t(_ctx.slotName), b: _d(_ctx.slotName), c: _d([_ctx.slotName]) }
}`
    )
  })
  test('old syntax', () => {
    assert(
      `<template slot="left"/>`,
      `<view slot="left"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
})
