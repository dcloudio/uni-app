import { assert } from './testUtils'

describe('compiler: transform scoped slots', () => {
  test('basic', () => {
    assert(
      `<view><slot data="123"/></view>`,
      `<view><slot name="d"/><slot/></view>`,
      `(_ctx, _cache) => {
  return { a: _r("d", { data: "123" }) }
}`
    )
    assert(
      `<view><slot :item="item" :index="index"/></view>`,
      `<view><slot name="d"/><slot/></view>`,
      `(_ctx, _cache) => {
  return { a: _r("d", { item: _ctx.item, index: _ctx.index }) }
}`
    )
  })
  test('named slots', () => {
    assert(
      `<view><slot name="header" :item="item" :index="index"/></view>`,
      `<view><slot name="header"/></view>`,
      `(_ctx, _cache) => {
  return { a: _r("header", { item: _ctx.item, index: _ctx.index }) }
}`
    )
  })
  test('named slots + v-if', () => {
    assert(
      `<view><slot v-if="ok" name="header" :item="item" :index="index"/></view>`,
      `<view><slot wx:if="{{a}}" name="header"/></view>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? { b: _r("header", { item: _ctx.item, index: _ctx.index }) } : {})
}`
    )
  })
  test('v-for + v-for + scoped slots', () => {
    assert(
      `<view v-for="(item, index) in 4" :key="index"><view v-for="(item, index) in 4"><slot :text="1"></slot></view></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="b"><view wx:for="{{item.a}}" wx:for-item="item"><slot name="{{item.a}}"></slot><slot></slot></view></view>`,
      `(_ctx, _cache) => {
  return { a: _f(4, (item, index, i0) => { return { a: _f(4, (item, index, i1) => { return { a: "d-" + i0 + '-' + i1, b: _r("d", { text: 1 }, i0 + '-' + i1) }; }), b: index }; }) }
}`
    )
  })
  test('v-for + v-for + v-for + scoped slots', () => {
    assert(
      `<view v-for="(item, index) in 4" :key="index"><view v-for="(item, index) in 4"><view v-for="(item, index) in 4"><slot :text="1"></slot></view></view></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="b"><view wx:for="{{item.a}}" wx:for-item="item"><view wx:for="{{item.a}}" wx:for-item="item"><slot name="{{item.a}}"></slot><slot></slot></view></view></view>`,
      `(_ctx, _cache) => {
  return { a: _f(4, (item, index, i0) => { return { a: _f(4, (item, index, i1) => { return { a: _f(4, (item, index, i2) => { return { a: "d-" + i0 + '-' + i1 + '-' + i2, b: _r("d", { text: 1 }, i0 + '-' + i1 + '-' + i2) }; }) }; }), b: index }; }) }
}`
    )
  })
  test('scoped + v-for + component', () => {
    assert(
      `<MyComponent :dataList="dataList">
  <template v-slot:default="slotProps">
    <view>
        <view v-for="(item, key) in dataList" :key="key">
            <test>{{ item.title }}</test>
        </view>
    </view>
  </template>
</MyComponent>`,
      `<my-component u-s="{{['d']}}" u-i="2a9ec0b0-0" u-p="{{b||''}}"><view wx:for="{{a}}" wx:for-item="slotProps" wx:key="b" slot="{{slotProps.c}}"><view><view wx:for="{{slotProps.a}}" wx:for-item="item" wx:key="c"><test u-s="{{['d']}}" u-i="{{item.b}}">{{item.a}}</test></view></view></view></my-component>`,
      `(_ctx, _cache) => {
  return { a: _w((slotProps, s0, i0) => { return { a: _f(_ctx.dataList, (item, key, i1) => { return { a: _t(item.title), b: '2a9ec0b0-1' + '-' + i0 + '-' + i1 + ',' + '2a9ec0b0-0', c: key }; }), b: i0, c: s0 }; }, { name: 'd', path: 'a', vueId: '2a9ec0b0-0' }), b: _p({ dataList: _ctx.dataList }) }
}`
    )
  })
  test('names slots with fallback content + v-for', () => {
    assert(
      `<button v-for="item in 1" :key="item"><slot name="text" :item="item">Submit</slot></button>`,
      `<button wx:for="{{a}}" wx:for-item="item" wx:key="c"><block wx:if="{{$slots.text}}"><slot name="{{item.a}}"></slot></block><block wx:else>Submit</block></button>`,
      `(_ctx, _cache) => {
  return { a: _f(1, (item, k0, i0) => { return { a: "text-" + i0, b: _r("text", { item: item }, i0), c: item }; }) }
}`
    )
  })
  test('scoped slots + slot', () => {
    assert(
      `<c><template #n="{ h }"><slot name="n" :h="h"></slot></template></c>`,
      `<c u-s="{{['n']}}" u-i="2a9ec0b0-0"><view wx:for="{{a}}" wx:for-item="v0" wx:key="b" slot="{{v0.c}}"><slot name="n"></slot></view></c>`,
      `(_ctx, _cache) => {
  return { a: _w(({ h }, s0, i0) => { return { a: _r("n", { h: h }), b: i0, c: s0 }; }, { name: 'n', path: 'a', vueId: '2a9ec0b0-0' }) }
}`
    )
  })
})
