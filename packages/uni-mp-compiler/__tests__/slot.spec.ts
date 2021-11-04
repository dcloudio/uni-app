import { assert } from './testUtils'

describe('compiler: transform slot', () => {
  test('basic', () => {
    assert(
      `<button><slot/></button>`,
      `<button><slot/></button>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('fallback content', () => {
    assert(
      `<button><slot>Submit</slot></button>`,
      `<button><block wx:if="{{$slots.d}}"><slot></slot></block><block wx:else>Submit</block></button>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('names slots', () => {
    assert(
      `<button><slot name="text"/></button>`,
      `<button><slot name="text"/></button>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('names slots with fallback content', () => {
    assert(
      `<button><slot name="text">Submit</slot></button>`,
      `<button><block wx:if="{{$slots.text}}"><slot name="text"></slot></block><block wx:else>Submit</block></button>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('slot with v-for', () => {
    assert(
      `<slot v-for="(item,index) in items" :key="index"></slot>`,
      `<slot wx:for="{{a}}" wx:for-item="item" name="{{item.a}}"></slot>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, index, i0) => { return { a: "d-" + i0, b: _r("d", { key: index }, i0) }; }) }
}`
    )
  })
  test('slot with v-for + v-for', () => {
    assert(
      `<view v-for="(item,index) in items" :key="index"><slot v-for="(item1,index1) in item.list" :key="index1"></slot></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="b"><slot wx:for="{{item.a}}" wx:for-item="item1" name="{{item1.a}}"></slot></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, index, i0) => { return { a: _f(item.list, (item1, index1, i1) => { return { a: "d-" + i0 + '-' + i1, b: _r("d", { key: index1 }, i0 + '-' + i1) }; }), b: index }; }) }
}`
    )
  })
})
