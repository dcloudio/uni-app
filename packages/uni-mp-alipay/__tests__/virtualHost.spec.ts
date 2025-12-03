import { extend } from '@vue/shared'
import { assert } from './testUtils'
import { miniProgram } from '../src/compiler/options'

const options = {
  miniProgram: {
    ...miniProgram,
    component: extend({}, miniProgram.component, {
      mergeVirtualHostAttributes: true,
    }),
  },
}

describe('mp-alipay: transform virtualHost class', () => {
  test('virtualHost class without class', () => {
    assert(
      `<view/>`,
      `<view class="{{(virtualHostClass || '')}}" style="{{virtualHostStyle}}" hidden="{{virtualHostHidden || false}}" id="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, '') }
}`,
      options
    )
  })

  test('virtualHost class with static class', () => {
    assert(
      `<view class="test"/>`,
      `<view class="{{('test') + ' ' + (virtualHostClass || '')}}" style="{{virtualHostStyle}}" hidden="{{virtualHostHidden || false}}" id="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, '') }
}`,
      options
    )
  })

  test('virtualHost class with dynamic class', () => {
    assert(
      `<view :class="class1"/>`,
      `<view class="{{(a) + ' ' + (virtualHostClass || '')}}" style="{{virtualHostStyle}}" hidden="{{virtualHostHidden || false}}" id="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.class1), b: _gei(_ctx, '') }
}`,
      options
    )
  })

  test('virtualHost class with static and dynamic class', () => {
    assert(
      `<view class="test" :class="class1"/>`,
      `<view class="{{('test') + ' ' + a + ' ' + (virtualHostClass || '')}}" style="{{virtualHostStyle}}" hidden="{{virtualHostHidden || false}}" id="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.class1), b: _gei(_ctx, '') }
}`,
      options
    )
  })
})
