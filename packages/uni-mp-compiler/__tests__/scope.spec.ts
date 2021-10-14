import { assert } from './testUtils'

describe('compiler: scope', () => {
  test('v-for', () => {
    assert(
      `<view v-for="item in items" :key="item.id" :class="{red: item.isRed}" @longpress="longpress" @click="onClick(item)">{{item.title}}</view>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="b" class="{{[item.c && 'red']}}" bindlongpress="{{b}}" bindtap="{{item.d}}">{{item.a}}</view>`,
      `(_ctx, _cache) => {
  return { a: _vFor(_ctx.items, item => { return { a: _toDisplayString(item.title), b: item.id, c: item.isRed, d: _vOn($event => _ctx.onClick(item)) }; }), b: _vOn(_ctx.longpress) }
}`
    )
  })
  test('v-for + v-for', () => {
    assert(
      `<view v-for="item in items" :key="item.id">{{item.title}}{{handle(foo)}}<view v-for="item1 in item.list" :key="item1.id" @click="onClick(item)" @longpress="longpress(item1)">{{item.id}}{{item1.title}}</view></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="e">{{item.a}}{{b}}<view wx:for="{{item.b}}" wx:for-item="item1" wx:key="b" bindtap="{{item.d}}" bindlongpress="{{item1.c}}">{{item.c}}{{item1.a}}</view></view>`,
      `(_ctx, _cache) => {
  return { a: _vFor(_ctx.items, item => { return { a: _toDisplayString(item.title), b: _vFor(item.list, item1 => { return { a: _toDisplayString(item1.title), b: item1.id, c: _vOn($event => _ctx.longpress(item1)) }; }), c: _toDisplayString(item.id), d: _vOn($event => _ctx.onClick(item)), e: item.id }; }), b: _toDisplayString(_ctx.handle(_ctx.foo)) }
}`
    )
    assert(
      `<view v-for="item in items"><view v-for="item1 in item1" :data-id="item.id" :data-title="item1.title"/></view>`,
      `<view wx:for="{{a}}" wx:for-item="item"><view wx:for="{{b}}" wx:for-item="item1" data-id="{{item.a}}" data-title="{{item1.a}}"/></view>`,
      `(_ctx, _cache) => {
  return { a: _vFor(_ctx.items, item => { return { a: item.id }; }), b: _vFor(_ctx.item1, item1 => { return { a: item1.title }; }) }
}`
    )
  })
  test('v-for + v-if', () => {
    assert(
      `<view v-for="item in items"><view v-if="true" :data-id="id"></view></view>`,
      `<view wx:for="{{a}}" wx:for-item="item"><view wx:if="{{true}}" data-id="{{item.a}}"></view></view>`,
      `(_ctx, _cache) => {
  return { a: _vFor(_ctx.items, item => { return { ...(true ? { a: _ctx.id } : {}) }; }) }
}`
    )
  })
  test('v-if', () => {
    assert(
      `<view v-if="ok">{{ok}}</view><view v-else-if="ok1">{{ok1}}</view><view v-else-if="ok2">{{ok2}}</view><view v-else>{{ok3}}</view>`,
      `<view wx:if="{{a}}">{{b}}</view><view wx:elif="{{c}}">{{d}}</view><view wx:elif="{{e}}">{{f}}</view><view wx:else>{{g}}</view>`,
      `(_ctx, _cache) => {
  return { a: _ctx.ok, ...(_ctx.ok ? { b: _toDisplayString(_ctx.ok) } : _ctx.ok1 ? { d: _toDisplayString(_ctx.ok1) } : _ctx.ok2 ? { f: _toDisplayString(_ctx.ok2) } : { g: _toDisplayString(_ctx.ok3) }), c: _ctx.ok1, e: _ctx.ok2 }
}`
    )
  })
  test('v-if + v-for', () => {
    assert(
      `<view v-if="ok"><view v-for="item in items" :key="item.id" :data-title="item.title" :data-foo="foo" @click="onClick"/></view><view v-else-if="ok1"><view v-for="item in items" :key="item.id" :data-title="item.title" :data-foo="foo" @click="onClick"/></view><view v-else><view v-for="item in items" :key="item.id" :data-title="item.title" :data-foo="foo" @click="onClick"/></view>`,
      `<view wx:if="{{a}}"><view wx:for="{{b}}" wx:for-item="item" wx:key="a" data-title="{{item.b}}" data-foo="{{c}}" bindtap="{{d}}"/></view><view wx:elif="{{e}}"><view wx:for="{{f}}" wx:for-item="item" wx:key="a" data-title="{{item.b}}" data-foo="{{g}}" bindtap="{{h}}"/></view><view wx:else><view wx:for="{{i}}" wx:for-item="item" wx:key="a" data-title="{{item.b}}" data-foo="{{j}}" bindtap="{{k}}"/></view>`,
      `(_ctx, _cache) => {
  return { a: _ctx.ok, ...(_ctx.ok ? { b: _vFor(_ctx.items, item => { return { a: item.id, b: item.title }; }), c: _ctx.foo, d: _vOn(_ctx.onClick) } : _ctx.ok1 ? { f: _vFor(_ctx.items, item => { return { a: item.id, b: item.title }; }), g: _ctx.foo, h: _vOn(_ctx.onClick) } : { i: _vFor(_ctx.items, item => { return { a: item.id, b: item.title }; }), j: _ctx.foo, k: _vOn(_ctx.onClick) }), e: _ctx.ok1 }
}`
    )
  })
})
