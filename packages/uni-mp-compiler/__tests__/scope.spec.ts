import { assert } from './testUtils'

describe('compiler: scope', () => {
  test('v-for', () => {
    assert(
      `<view v-for="item in items" :key="item.id" :class="{red: item.isRed}" @longpress="longpress" @click="onClick(item)">{{item.title}}</view>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="b" class="{{[item.c && 'red']}}" bindlongpress="{{b}}" bindtap="{{item.d}}">{{item.a}}</view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _t(item.title), b: item.id, c: item.isRed ? 1 : '', d: _o($event => _ctx.onClick(item), "db") }; }), b: _o(_ctx.longpress, "f6") }
}`
    )
  })
  test('v-for + v-for', () => {
    assert(
      `<view v-for="item in items" :key="item.id">{{item.title}}{{handle(foo)}}<view v-for="item1 in item.list" :key="item1.id" @click="onClick(item)" @longpress="longpress(item1)">{{item.id}}{{item1.title}}</view></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="e">{{item.a}}{{b}}<view wx:for="{{item.b}}" wx:for-item="item1" wx:key="b" bindtap="{{item.d}}" bindlongpress="{{item1.c}}">{{item.c}}{{item1.a}}</view></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _t(item.title), b: _f(item.list, (item1, k1, i1) => { return { a: _t(item1.title), b: item1.id, c: _o($event => _ctx.longpress(item1), "c9") }; }), c: _t(item.id), d: _o($event => _ctx.onClick(item), "58"), e: item.id }; }), b: _t(_ctx.handle(_ctx.foo)) }
}`
    )
    assert(
      `<view v-for="item in items"><view v-for="item1 in item1" :data-id="item.id" :data-title="item1.title"/></view>`,
      `<view wx:for="{{a}}" wx:for-item="item"><view wx:for="{{item.a}}" wx:for-item="item1" data-id="{{item.b}}" data-title="{{item1.a}}"/></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _f(_ctx.item1, (item1, k1, i1) => { return { a: item1.title }; }), b: item.id }; }) }
}`
    )
    assert(
      `<view v-for="(item,weekIndex) in weeks" :key="weekIndex" :data-id="item.id"><view v-for="(weeks,weeksIndex) in item" :key="weeksIndex" :data-id="weeks.id"/></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="b" data-id="{{item.c}}"><view wx:for="{{item.a}}" wx:for-item="weeks" wx:key="a" data-id="{{weeks.b}}"/></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.weeks, (item, weekIndex, i0) => { return { a: _f(item, (weeks, weeksIndex, i1) => { return { a: weeksIndex, b: weeks.id }; }), b: weekIndex, c: item.id }; }) }
}`
    )
    assert(
      `<view v-for="x in 2"><view v-for="y in 2">{{x+y}}</view></view>`,
      `<view wx:for="{{a}}" wx:for-item="x"><view wx:for="{{x.a}}" wx:for-item="y">{{y.a}}</view></view>`,
      `(_ctx, _cache) => {
  return { a: _f(2, (x, k0, i0) => { return { a: _f(2, (y, k1, i1) => { return { a: _t(x + y) }; }) }; }) }
}`
    )
  })
  test('v-for + v-if', () => {
    assert(
      `<view v-for="item in items"><view v-if="true" :data-id="id"></view></view>`,
      `<view wx:for="{{a}}" wx:for-item="item"><view wx:if="{{true}}" data-id="{{item.a}}"></view></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return true ? { a: _ctx.id } : {}; }) }
}`
    )
  })
  test('v-for + v-for + v-if', () => {
    assert(
      `<view v-for="s in items1"><view v-for="r in items2"><text v-if="s == 2">s</text></view></view>`,
      `<view wx:for="{{a}}" wx:for-item="s"><view wx:for="{{s.a}}" wx:for-item="r"><text wx:if="{{s.b}}">s</text></view></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items1, (s, k0, i0) => { return { a: _f(_ctx.items2, (r, k1, i1) => { return s == 2 ? {} : {}; }), b: s == 2 }; }) }
}`
    )
    assert(
      `<view v-for="s in items1"><view v-for="r in items2"><text v-if="a == 2">s</text></view></view>`,
      `<view wx:for="{{a}}" wx:for-item="s"><view wx:for="{{s.a}}" wx:for-item="r"><text wx:if="{{b}}">s</text></view></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items1, (s, k0, i0) => { return { a: _f(_ctx.items2, (r, k1, i1) => { return _ctx.a == 2 ? {} : {}; }) }; }), b: _ctx.a == 2 }
}`
    )
  })
  test('v-for + v-for + v-if + v-else-if', () => {
    assert(
      `<view v-for="s in items1"><view v-for="r in items2"><text v-if="a == 2">a</text><text v-else-if="s == 3">s</text></view></view>`,
      `<view wx:for="{{a}}" wx:for-item="s"><view wx:for="{{s.a}}" wx:for-item="r"><text wx:if="{{b}}">a</text><text wx:elif="{{s.b}}">s</text></view></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items1, (s, k0, i0) => { return { a: _f(_ctx.items2, (r, k1, i1) => { return _ctx.a == 2 ? {} : s == 3 ? {} : {}; }), b: s == 3 }; }), b: _ctx.a == 2 }
}`
    )
    assert(
      `<view v-for="s in items1"><view v-for="r in items2"><text v-if="a == 2">a</text><text v-else-if="b == 3">s</text></view></view>`,
      `<view wx:for="{{a}}" wx:for-item="s"><view wx:for="{{s.a}}" wx:for-item="r"><text wx:if="{{b}}">a</text><text wx:elif="{{c}}">s</text></view></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items1, (s, k0, i0) => { return { a: _f(_ctx.items2, (r, k1, i1) => { return _ctx.a == 2 ? {} : _ctx.b == 3 ? {} : {}; }) }; }), b: _ctx.a == 2, c: _ctx.b == 3 }
}`
    )
  })
  test('v-for + v-for + v-for + v-if', () => {
    assert(
      `<view v-for="s in items1"><view v-for="r in items2"><view v-for="t in items3"><text v-if="s == 2">s</text></view></view></view>`,
      `<view wx:for="{{a}}" wx:for-item="s"><view wx:for="{{s.a}}" wx:for-item="r"><view wx:for="{{r.a}}" wx:for-item="t"><text wx:if="{{s.b}}">s</text></view></view></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items1, (s, k0, i0) => { return { a: _f(_ctx.items2, (r, k1, i1) => { return { a: _f(_ctx.items3, (t, k2, i2) => { return s == 2 ? {} : {}; }) }; }), b: s == 2 }; }) }
}`
    )
    assert(
      `<view v-for="s in items1"><view v-for="r in items2"><view v-for="t in items3"><text v-if="r == 2">s</text></view></view></view>`,
      `<view wx:for="{{a}}" wx:for-item="s"><view wx:for="{{s.a}}" wx:for-item="r"><view wx:for="{{r.a}}" wx:for-item="t"><text wx:if="{{r.b}}">s</text></view></view></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items1, (s, k0, i0) => { return { a: _f(_ctx.items2, (r, k1, i1) => { return { a: _f(_ctx.items3, (t, k2, i2) => { return r == 2 ? {} : {}; }), b: r == 2 }; }) }; }) }
}`
    )
  })
  test('v-if', () => {
    assert(
      `<view v-if="ok">{{ok}}</view><view v-else-if="ok1">{{ok1}}</view><view v-else-if="ok2">{{ok2}}</view><view v-else>{{ok3}}</view>`,
      `<view wx:if="{{a}}">{{b}}</view><view wx:elif="{{c}}">{{d}}</view><view wx:elif="{{e}}">{{f}}</view><view wx:else>{{g}}</view>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? { b: _t(_ctx.ok) } : _ctx.ok1 ? { d: _t(_ctx.ok1) } : _ctx.ok2 ? { f: _t(_ctx.ok2) } : { g: _t(_ctx.ok3) }, { c: _ctx.ok1, e: _ctx.ok2 })
}`
    )
  })
  test('v-if + v-for', () => {
    assert(
      `<view v-if="ok"><view v-for="item in items" :key="item.id" :data-title="item.title" :data-foo="foo" @click="onClick"/></view><view v-else-if="ok1"><view v-for="item in items" :key="item.id" :data-title="item.title" :data-foo="foo" @click="onClick"/></view><view v-else><view v-for="item in items" :key="item.id" :data-title="item.title" :data-foo="foo" @click="onClick"/></view>`,
      `<view wx:if="{{a}}"><view wx:for="{{b}}" wx:for-item="item" wx:key="a" data-title="{{item.b}}" data-foo="{{c}}" bindtap="{{d}}"/></view><view wx:elif="{{e}}"><view wx:for="{{f}}" wx:for-item="item" wx:key="a" data-title="{{item.b}}" data-foo="{{g}}" bindtap="{{h}}"/></view><view wx:else><view wx:for="{{i}}" wx:for-item="item" wx:key="a" data-title="{{item.b}}" data-foo="{{j}}" bindtap="{{k}}"/></view>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? { b: _f(_ctx.items, (item, k0, i0) => { return { a: item.id, b: item.title }; }), c: _ctx.foo, d: _o(_ctx.onClick, "d6") } : _ctx.ok1 ? { f: _f(_ctx.items, (item, k0, i0) => { return { a: item.id, b: item.title }; }), g: _ctx.foo, h: _o(_ctx.onClick, "49") } : { i: _f(_ctx.items, (item, k0, i0) => { return { a: item.id, b: item.title }; }), j: _ctx.foo, k: _o(_ctx.onClick, "e1") }, { e: _ctx.ok1 })
}`
    )
  })
})
