import { assert } from './testUtils'

describe('compiler: transform v-slot', () => {
  test('default slot', () => {
    assert(
      `<custom><template v-slot/></custom>`,
      `<custom class="v-r" v-s="{{['default']}}" v-i="2a9ec0b0-0"><view /></custom>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<custom>test</custom>`,
      `<custom class="v-r" v-s="{{['default']}}" v-i="2a9ec0b0-0">test</custom>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('named slots', () => {
    assert(
      `<custom><template v-slot:header/><template v-slot:default/><template v-slot:footer/></custom>`,
      `<custom class="v-r" v-s="{{['header','default','footer']}}" v-i="2a9ec0b0-0"><view slot="header"/><view slot="default"/><view slot="footer"/></custom>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })

  test('scoped slots', () => {
    assert(
      `<custom><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom class="v-r" v-s="{{['default']}}" v-i="2a9ec0b0-0"><view slot="default"><block wx:for="{{a}}" wx:for-item="slotProps" wx:key="b"><view>{{slotProps.a}}</view></block></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _w((slotProps, s0, i0) => { return { a: _t(slotProps.item), b: s0 }; }, { name: 'default', vueId: '2a9ec0b0-0' }) }
}`
    )
  })

  test('scoped slots + scoped slots', () => {
    assert(
      `<custom><template v-slot:default="slotProps"><custom1><template v-slot:default="slotProps1">{{ slotProps.item }}{{ slotProps1.item }}</template></custom1></template></custom>`,
      `<custom class="v-r" v-s="{{['default']}}" v-i="2a9ec0b0-0"><view slot="default"><block wx:for="{{a}}" wx:for-item="slotProps" wx:key="d"><custom1 class="v-r" v-s="{{['default']}}" v-i="{{slotProps.c}}"><view slot="default"><block wx:for="{{slotProps.a}}" wx:for-item="slotProps1" wx:key="b">{{slotProps.b}}{{slotProps1.a}}</block></view></custom1></block></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _w((slotProps, s0, i0) => { return { a: _w((slotProps1, s1, i1) => { return { a: _t(slotProps1.item), b: s1 }; }, { name: 'default', vueId: '2a9ec0b0-1' + '-' + i0 + ',' + '2a9ec0b0-0' }), b: _t(slotProps.item), c: '2a9ec0b0-1' + '-' + i0 + ',' + '2a9ec0b0-0', d: s0 }; }, { name: 'default', vueId: '2a9ec0b0-0' }) }
}`
    )
  })

  test('v-if + scoped slots', () => {
    assert(
      `<custom><template v-if="ok" v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom class="v-r" v-s="{{['default']}}" v-i="2a9ec0b0-0"><view wx:if="{{a}}" slot="default"><block wx:for="{{b}}" wx:for-item="slotProps" wx:key="b"><view>{{slotProps.a}}</view></block></view></custom>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? { b: _w((slotProps, s0, i0) => { return { a: _t(slotProps.item), b: s0 }; }, { name: 'default', vueId: '2a9ec0b0-0' }) } : {})
}`
    )
  })

  test('v-for + scoped slots', () => {
    assert(
      `<custom v-for="item in items"><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom wx:for="{{a}}" wx:for-item="item" class="v-r-i-f" v-s="{{['default']}}" v-i="{{item.b}}"><view slot="default"><block wx:for="{{item.a}}" wx:for-item="slotProps" wx:key="b"><view>{{slotProps.a}}</view></block></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _w((slotProps, s1, i1) => { return { a: _t(slotProps.item), b: s1 }; }, { name: 'default', vueId: '2a9ec0b0-0' + '-' + i0 }), b: '2a9ec0b0-0' + '-' + i0 }; }) }
}`
    )
  })

  test('v-for + v-for + scoped slots', () => {
    assert(
      `<view v-for="item in items"><custom v-for="item1 in item.list" :item="item1"><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom></view>`,
      `<view wx:for="{{a}}" wx:for-item="item"><custom wx:for="{{item.a}}" wx:for-item="item1" class="v-r-i-f" v-s="{{['default']}}" item="{{item1.b}}" v-i="{{item1.c}}"><view slot="default"><block wx:for="{{item1.a}}" wx:for-item="slotProps" wx:key="b"><view>{{slotProps.a}}</view></block></view></custom></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _f(item.list, (item1, k1, i1) => { return { a: _w((slotProps, s2, i2) => { return { a: _t(slotProps.item), b: s2 }; }, { name: 'default', vueId: '2a9ec0b0-0' + '-' + i0 + '-' + i1 }), b: item1, c: '2a9ec0b0-0' + '-' + i0 + '-' + i1 }; }) }; }) }
}`
    )
  })
})
