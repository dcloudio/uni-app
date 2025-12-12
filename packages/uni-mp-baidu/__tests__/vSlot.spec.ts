import { assert } from './testUtils'

describe('compiler: transform v-slot', () => {
  test('default slot', () => {
    assert(
      `<custom><template v-slot/></custom>`,
      `<custom u-i="2a9ec0b0-0"></custom>`,
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
      `<custom u-i="2a9ec0b0-0"></custom>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<unicloud-db v-slot:default="{data, loading, error, options}"><view v-if="error">{{error.message}}</view><view v-else></view></unicloud-db>`,
      `<unicloud-db u-s="{{['d']}}" u-i="2a9ec0b0-0"><view><block s-for="v0 in a trackBy v0.a"><view s-if="{{v0.b}}">{{v0.c}}</view><view s-else></view></block></view></unicloud-db>`,
      `(_ctx, _cache) => {
  return { a: _w(({ data, loading, error, options }, s0, i0) => { return _e({ a: i0, b: error }, error ? { c: _t(error.message) } : {}); }, { name: 'd', path: 'a', vueId: '2a9ec0b0-0' }) }
}`
    )
  })

  test('scoped slots', () => {
    assert(
      `<custom><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0"><view><block s-for="slotProps in a trackBy slotProps.a"><view>{{slotProps.b}}</view></block></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _w((slotProps, s0, i0) => { return { a: i0, b: _t(slotProps.item) }; }, { name: 'd', path: 'a', vueId: '2a9ec0b0-0' }) }
}`
    )
  })

  test('scoped slots + scoped slots', () => {
    assert(
      `<custom><template v-slot:default="slotProps"><custom1><template v-slot:default="slotProps1">{{ slotProps.item }}{{ slotProps1.item }}</template></custom1></template></custom>`,
      `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0"><view><block s-for="slotProps in a trackBy slotProps.a"><custom1 u-s="{{['d']}}" u-i="{{slotProps.d}}"><view><block s-for="slotProps1 in slotProps.b trackBy slotProps1.a">{{slotProps.c}}{{slotProps1.b}}</block></view></custom1></block></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _w((slotProps, s0, i0) => { return { a: i0, b: _w((slotProps1, s1, i1) => { return { a: i1, b: _t(slotProps1.item) }; }, { name: 'd', path: 'a[' + i0 + '].' + 'b', vueId: '2a9ec0b0-1' + '-' + i0 + ',' + '2a9ec0b0-0' }), c: _t(slotProps.item), d: '2a9ec0b0-1' + '-' + i0 + ',' + '2a9ec0b0-0' }; }, { name: 'd', path: 'a', vueId: '2a9ec0b0-0' }) }
}`
    )
  })

  test('v-if + scoped slots', () => {
    assert(
      `<custom><template v-if="ok" v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom u-s="{{c}}" u-i="2a9ec0b0-0"><view s-if="{{a}}"><block s-for="slotProps in b trackBy slotProps.a"><view>{{slotProps.b}}</view></block></view></custom>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? { b: _w((slotProps, s0, i0) => { return { a: i0, b: _t(slotProps.item) }; }, { name: 'd', path: 'b', vueId: '2a9ec0b0-0' }) } : {}, { c: [_ctx.ok ? 'd' : ''] })
}`
    )
  })

  test('v-for + scoped slots', () => {
    assert(
      `<custom v-for="item in items"><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom s-for="item in a" u-s="{{['d']}}" u-i="{{item.b}}"><view><block s-for="slotProps in item.a trackBy slotProps.a"><view>{{slotProps.b}}</view></block></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _w((slotProps, s1, i1) => { return { a: i1, b: _t(slotProps.item) }; }, { name: 'd', path: 'a[' + i0 + '].' + 'a', vueId: '2a9ec0b0-0' + '-' + i0 }), b: '2a9ec0b0-0' + '-' + i0 }; }) }
}`
    )
  })

  test('v-for + v-for + scoped slots', () => {
    assert(
      `<view v-for="item in items"><custom v-for="item1 in item.list" :item="item1"><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom></view>`,
      `<view s-for="item in a"><custom s-for="item1 in item.a" u-s="{{['d']}}" u-i="{{item1.b}}" u-p="{{item1.c}}"><view><block s-for="slotProps in item1.a trackBy slotProps.a"><view>{{slotProps.b}}</view></block></view></custom></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _f(item.list, (item1, k1, i1) => { return { a: _w((slotProps, s2, i2) => { return { a: i2, b: _t(slotProps.item) }; }, { name: 'd', path: 'a[' + i0 + '].' + ('a[' + i1 + '].') + 'a', vueId: '2a9ec0b0-0' + '-' + i0 + '-' + i1 }), b: '2a9ec0b0-0' + '-' + i0 + '-' + i1, c: _p({ item: item1 }) }; }) }; }) }
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
