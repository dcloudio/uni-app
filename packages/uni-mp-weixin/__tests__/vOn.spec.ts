import { assert } from './testUtils'

describe('mp-weixin: transform v-on', () => {
  test('basic', () => {
    assert(
      `<view v-on:click="onClick"/>`,
      `<view bindtap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onClick) }
}`
    )
    assert(
      `<custom v-on:click="onClick"/>`,
      `<custom bindclick="{{a}}" bindtap="{{a}}" u-i="2a9ec0b0-0" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onClick) }
}`
    )
  })
  test('v-for with v-on', () => {
    assert(
      `<view v-for="item of arr" :key="item._id" @click="show(item)">{{ item.text }}</view>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="b" bindtap="{{item.c}}">{{item.a}}</view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.arr, (item, k0, i0) => { return { a: _t(item.text), b: item._id, c: _o($event => _ctx.show(item), item._id) }; }) }
}`
    )
    assert(
      `<view v-for="(item, index) in list" :key="item.id"><view @click="handleClickItem(item, index)"></view></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="b"><view bindtap="{{item.a}}"></view></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.list, (item, index, i0) => { return { a: _o($event => _ctx.handleClickItem(item, index), item.id), b: item.id }; }) }
}`
    )
    assert(
      `<view v-for="item in items" @click="test(item)"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" bindtap="{{item.a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _o($event => _ctx.test(item)) }; }) }
}`
    )
    assert(
      `<view v-for="(item,index) in items" :key="index" @click="test(item)"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="a" bindtap="{{item.b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, index, i0) => { return { a: index, b: _o($event => _ctx.test(item), index) }; }) }
}`
    )
    assert(
      `<view v-for="item in items" :key="item" @click="test(item)"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="a" bindtap="{{item.b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: item, b: _o($event => _ctx.test(item), item) }; }) }
}`
    )
  })
})
