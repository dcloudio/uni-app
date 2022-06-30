import { extend } from '@vue/shared'
import { assert, miniProgram } from './testUtils'

const options = {
  miniProgram: {
    ...miniProgram,
    component: extend({}, miniProgram.component, {
      mergeVirtualHostAttributes: true,
    }),
  },
}

describe('complier: options with mergeVirtualHostAttributes', () => {
  test('root node with mergeVirtualHostAttributes', () => {
    assert(
      `<image/>`,
      `<image class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
    assert(
      `<view><image/></view>`,
      `<view class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}"><image/></view>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
  })
  test('root node style with mergeVirtualHostAttributes', () => {
    assert(
      `<image style="width:100%"/>`,
      `<image class="{{[virtualHostClass]}}" style="{{'width:100%' + ';' + virtualHostStyle}}"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
    assert(
      `<image :style="style"/>`,
      `<image style="{{a + ';' + virtualHostStyle}}" class="{{[virtualHostClass]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _s(_ctx.style) }
}`,
      options
    )
    assert(
      `<image style="width:100%" :style="style"/>`,
      `<image style="{{'width:100%' + ';' + a + ';' + virtualHostStyle}}" class="{{[virtualHostClass]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _s(_ctx.style) }
}`,
      options
    )
  })
  test('root node class with mergeVirtualHostAttributes', () => {
    assert(
      `<image class="class1"/>`,
      `<image class="{{['class1', virtualHostClass]}}" style="{{virtualHostStyle}}"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
    assert(
      `<image :class="class1"/>`,
      `<image class="{{[a, virtualHostClass]}}" style="{{virtualHostStyle}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.class1) }
}`,
      options
    )
    assert(
      `<image class="class1" :class="class1"/>`,
      `<image class="{{['class1', a, virtualHostClass]}}" style="{{virtualHostStyle}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.class1) }
}`,
      options
    )
  })
  test('user component attrs with mergeVirtualHostAttributes', () => {
    assert(
      `<view><custom-image/></view>`,
      `<view class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}"><custom-image u-i="2a9ec0b0-0"/></view>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
    assert(
      `<view><custom-image class="class1" style="width:100%"/></view>`,
      `<view class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}"><custom-image class="class1" virtualHostClass="class1" style="width:100%" virtualHostStyle="width:100%" u-i="2a9ec0b0-0"/></view>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
    assert(
      `<custom-view><custom-image/></custom-view>`,
      `<custom-view u-s="{{['d']}}" u-i="2a9ec0b0-0" class="{{[virtualHostClass]}}" virtualHostClass="{{[virtualHostClass]}}" style="{{virtualHostStyle}}" virtualHostStyle="{{virtualHostStyle}}"><custom-image u-i="2a9ec0b0-1,2a9ec0b0-0"/></custom-view>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
  })
})
