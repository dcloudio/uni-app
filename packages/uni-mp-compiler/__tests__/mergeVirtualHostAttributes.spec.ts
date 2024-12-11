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
      `<image class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}" hidden="{{virtualHostHidden}}"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
    assert(
      `<view><image/></view>`,
      `<view class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}" hidden="{{virtualHostHidden}}"><image/></view>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
  })
  test('root node style with mergeVirtualHostAttributes', () => {
    assert(
      `<image style="width:100%"/>`,
      `<image class="{{[virtualHostClass]}}" style="{{'width:100%' + ';' + virtualHostStyle}}" hidden="{{virtualHostHidden}}"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
    assert(
      `<image :style="style"/>`,
      `<image style="{{a + ';' + virtualHostStyle}}" class="{{[virtualHostClass]}}" hidden="{{virtualHostHidden}}"/>`,
      `(_ctx, _cache) => {
  return { a: _s(_ctx.style) }
}`,
      options
    )
    assert(
      `<image style="width:100%" :style="style"/>`,
      `<image style="{{'width:100%' + ';' + a + ';' + virtualHostStyle}}" class="{{[virtualHostClass]}}" hidden="{{virtualHostHidden}}"/>`,
      `(_ctx, _cache) => {
  return { a: _s(_ctx.style) }
}`,
      options
    )
  })
  test('root node class with mergeVirtualHostAttributes', () => {
    assert(
      `<image class="class1"/>`,
      `<image class="{{['class1', virtualHostClass]}}" style="{{virtualHostStyle}}" hidden="{{virtualHostHidden}}"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
    assert(
      `<image :class="class1"/>`,
      `<image class="{{[a, virtualHostClass]}}" style="{{virtualHostStyle}}" hidden="{{virtualHostHidden}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.class1) }
}`,
      options
    )
    assert(
      `<image class="class1" :class="class1"/>`,
      `<image class="{{['class1', a, virtualHostClass]}}" style="{{virtualHostStyle}}" hidden="{{virtualHostHidden}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.class1) }
}`,
      options
    )
  })
  test('root node hidden with mergeVirtualHostAttributes', () => {
    assert(
      `<image :hidden="!show"/>`,
      `<image hidden="{{virtualHostHidden !== '' ? virtualHostHidden : a}}" class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}"/>`,
      `(_ctx, _cache) => {
  return { a: !_ctx.show }
}`,
      options
    )
    assert(
      `<image :hidden="false"/>`,
      `<image hidden="{{virtualHostHidden !== '' ? virtualHostHidden : false}}" class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
    assert(
      `<image hidden/>`,
      `<image class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}" hidden="{{virtualHostHidden !== '' ? virtualHostHidden : true}}"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
    assert(
      `<image v-show="show"/>`,
      `<image class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}" hidden="{{virtualHostHidden !== '' ? virtualHostHidden : !a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.show }
}`,
      options
    )
  })
  test('user component attrs with mergeVirtualHostAttributes', () => {
    assert(
      `<view><custom-image/></view>`,
      `<view class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}" hidden="{{virtualHostHidden}}"><custom-image u-i="2a9ec0b0-0"/></view>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
    assert(
      `<view><custom-image v-show="show"/></view>`,
      `<view class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}" hidden="{{virtualHostHidden}}"><custom-image virtualHostHidden="{{!a}}" hidden="{{!a}}" u-i="2a9ec0b0-0"/></view>`,
      `(_ctx, _cache) => {
  return { a: _ctx.show }
}`,
      options
    )
    assert(
      `<custom-view v-show="show"><image /></custom-view>`,
      `<custom-view u-s="{{['d']}}" u-i="2a9ec0b0-0" class="{{[virtualHostClass]}}" virtualHostClass="{{[virtualHostClass]}}" style="{{virtualHostStyle}}" virtualHostStyle="{{virtualHostStyle}}" hidden="{{virtualHostHidden !== '' ? virtualHostHidden : !a}}" virtualHostHidden="{{virtualHostHidden !== '' ? virtualHostHidden : !a}}"><image/></custom-view>`,
      `(_ctx, _cache) => {
  return { a: _ctx.show }
}`,
      options
    )
    assert(
      `<view><custom-image class="class1" style="width:100%"/></view>`,
      `<view class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}" hidden="{{virtualHostHidden}}"><custom-image class="class1" virtualHostClass="class1" style="width:100%" virtualHostStyle="width:100%" u-i="2a9ec0b0-0"/></view>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
    assert(
      `<custom-view><custom-image/></custom-view>`,
      `<custom-view u-s="{{['d']}}" u-i="2a9ec0b0-0" class="{{[virtualHostClass]}}" virtualHostClass="{{[virtualHostClass]}}" style="{{virtualHostStyle}}" virtualHostStyle="{{virtualHostStyle}}" hidden="{{virtualHostHidden}}" virtualHostHidden="{{virtualHostHidden}}"><custom-image u-i="2a9ec0b0-1,2a9ec0b0-0"/></custom-view>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
  })
})
