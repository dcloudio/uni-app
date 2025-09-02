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
      `<custom><template #default/></custom>`,
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
    assert(
      `<custom><div>test</div></custom>`,
      `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0"><view>test</view></custom>`,
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
      `<unicloud-db u-s="{{['d']}}" u-i="2a9ec0b0-0"><view wx:for="{{a}}" wx:for-item="v0" wx:key="c" slot="{{v0.d}}"><view wx:if="{{v0.a}}">{{v0.b}}</view><view wx:else></view></view></unicloud-db>`,
      `(_ctx, _cache) => {
  return { a: _w(({ data, loading, error, options }, s0, i0) => { return _e({ a: error }, error ? { b: _t(error.message) } : {}, { c: i0, d: s0 }); }, { name: 'd', path: 'a', vueId: '2a9ec0b0-0' }) }
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
    assert(
      `<uni-list-item class="item"><template v-slot:body v-if="ok"><view class="item"></view></template></uni-list-item>`,
      `<uni-list-item u-s="{{['body']}}" class="item" u-i="2a9ec0b0-0"><view wx:if="{{a}}" class="item" slot="body"></view></uni-list-item>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? {} : {})
}`
    )
  })

  test('scoped slots', () => {
    assert(
      `<custom><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0"><view wx:for="{{a}}" wx:for-item="slotProps" wx:key="b" slot="{{slotProps.c}}"><view>{{slotProps.a}}</view></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _w((slotProps, s0, i0) => { return { a: _t(slotProps.item), b: i0, c: s0 }; }, { name: 'd', path: 'a', vueId: '2a9ec0b0-0' }) }
}`
    )

    assert(
      `<custom><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom u-s="{{['d']}}" style="{{'--status-bar-height:' + b}}" u-i="2a9ec0b0-0"><view wx:for="{{a}}" wx:for-item="slotProps" wx:key="b" slot="{{slotProps.c}}" style="overflow: visible"><view>{{slotProps.a}}</view></view></custom>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _w((slotProps, s0, i0) => { return { a: _t(slotProps.item), b: i0, c: s0 }; }, { name: 'd', path: 'a', vueId: '2a9ec0b0-0' }), b: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
      }
    )
  })

  test('scoped slots + scoped slots', () => {
    assert(
      `<custom><template v-slot:default="slotProps"><custom1><template v-slot:default="slotProps1">{{ slotProps.item }}{{ slotProps1.item }}</template></custom1></template></custom>`,
      `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0"><view wx:for="{{a}}" wx:for-item="slotProps" wx:key="d" slot="{{slotProps.e}}"><custom1 u-s="{{['d']}}" u-i="{{slotProps.c}}"><view wx:for="{{slotProps.a}}" wx:for-item="slotProps1" wx:key="b" slot="{{slotProps1.c}}">{{slotProps.b}}{{slotProps1.a}}</view></custom1></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _w((slotProps, s0, i0) => { return { a: _w((slotProps1, s1, i1) => { return { a: _t(slotProps1.item), b: i1, c: s1 }; }, { name: 'd', path: 'a[' + i0 + '].' + 'a', vueId: '2a9ec0b0-1' + '-' + i0 + ',' + '2a9ec0b0-0' }), b: _t(slotProps.item), c: '2a9ec0b0-1' + '-' + i0 + ',' + '2a9ec0b0-0', d: i0, e: s0 }; }, { name: 'd', path: 'a', vueId: '2a9ec0b0-0' }) }
}`
    )
  })

  test('v-if + scoped slots', () => {
    assert(
      `<custom><template v-if="ok" v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0"><block wx:if="{{a}}"><view wx:for="{{b}}" wx:for-item="slotProps" wx:key="b" slot="{{slotProps.c}}"><view>{{slotProps.a}}</view></view></block></custom>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? { b: _w((slotProps, s0, i0) => { return { a: _t(slotProps.item), b: i0, c: s0 }; }, { name: 'd', path: 'b', vueId: '2a9ec0b0-0' }) } : {})
}`
    )
  })

  test('v-for + scoped slots', () => {
    assert(
      `<custom v-for="item in items"><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom wx:for="{{a}}" wx:for-item="item" u-s="{{['d']}}" u-i="{{item.b}}"><view wx:for="{{item.a}}" wx:for-item="slotProps" wx:key="b" slot="{{slotProps.c}}"><view>{{slotProps.a}}</view></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _w((slotProps, s1, i1) => { return { a: _t(slotProps.item), b: i1, c: s1 }; }, { name: 'd', path: 'a[' + i0 + '].' + 'a', vueId: '2a9ec0b0-0' + '-' + i0 }), b: '2a9ec0b0-0' + '-' + i0 }; }) }
}`
    )
  })

  test('v-for + v-for + scoped slots', () => {
    assert(
      `<view v-for="item in items"><custom v-for="item1 in item.list" :item="item1"><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom></view>`,
      `<view wx:for="{{a}}" wx:for-item="item"><custom wx:for="{{item.a}}" wx:for-item="item1" u-s="{{['d']}}" u-i="{{item1.b}}" u-p="{{item1.c||''}}"><view wx:for="{{item1.a}}" wx:for-item="slotProps" wx:key="b" slot="{{slotProps.c}}"><view>{{slotProps.a}}</view></view></custom></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _f(item.list, (item1, k1, i1) => { return { a: _w((slotProps, s2, i2) => { return { a: _t(slotProps.item), b: i2, c: s2 }; }, { name: 'd', path: 'a[' + i0 + '].' + ('a[' + i1 + '].') + 'a', vueId: '2a9ec0b0-0' + '-' + i0 + '-' + i1 }), b: '2a9ec0b0-0' + '-' + i0 + '-' + i1, c: _p({ item: item1 }) }; }) }; }) }
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

describe('should remove template when it has no any child nodes or all of its child nodes are comment nodes', () => {
  assert(
    `<custom><template #header /></custom>`,
    `<custom u-i="2a9ec0b0-0"></custom>`,
    `(_ctx, _cache) => {
  return {}
}`
  )

  assert(
    `<custom><template #header><!-- comment --></template></custom>`,
    `<custom u-i="2a9ec0b0-0"></custom>`,
    `(_ctx, _cache) => {
  return {}
}`
  )

  assert(
    `<custom><template v-slot:header="{}" /></custom>`,
    `<custom u-i="2a9ec0b0-0"></custom>`,
    `(_ctx, _cache) => {
  return {}
}`
  )

  assert(
    `<custom><template /></custom><custom><template #header /></custom>`,
    `<custom u-i="2a9ec0b0-0"></custom><custom u-i="2a9ec0b0-1"></custom>`,
    `(_ctx, _cache) => {
  return {}
}`
  )

  assert(
    `<custom><template>hello</template></custom><custom><template #header /></custom>`,
    `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0"><block u-s="{{['d']}}">hello</block></custom><custom u-i="2a9ec0b0-1"></custom>`,
    `(_ctx, _cache) => {
  return {}
}`
  )

  assert(
    `<custom><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template><template #header /></custom>`,
    `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0"><view wx:for="{{a}}" wx:for-item="slotProps" wx:key="b" slot="{{slotProps.c}}"><view>{{slotProps.a}}</view></view></custom>`,
    `(_ctx, _cache) => {
  return { a: _w((slotProps, s0, i0) => { return { a: _t(slotProps.item), b: i0, c: s0 }; }, { name: 'd', path: 'a', vueId: '2a9ec0b0-0' }) }
}`
  )
})
