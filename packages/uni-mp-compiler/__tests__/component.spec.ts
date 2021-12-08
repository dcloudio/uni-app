import {
  COMPONENT_BIND_LINK,
  createTransformComponentLink,
} from '@dcloudio/uni-cli-shared'
import { assert } from './testUtils'

const nodeTransforms = [createTransformComponentLink(COMPONENT_BIND_LINK)]
describe('compiler: transform component', () => {
  test('component + component', () => {
    assert(
      `<custom><custom1/></custom>`,
      `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0" bind:__l="__l"><custom1 u-i="2a9ec0b0-1,2a9ec0b0-0" bind:__l="__l"/></custom>`,
      `(_ctx, _cache) => {
  return {}
}`,
      {
        nodeTransforms,
      }
    )
  })
  test('component + component + component', () => {
    assert(
      `<custom><custom1><custom2/><custom2/></custom1></custom>`,
      `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0" bind:__l="__l"><custom1 u-s="{{['d']}}" u-i="2a9ec0b0-1,2a9ec0b0-0" bind:__l="__l"><custom2 u-i="2a9ec0b0-2,2a9ec0b0-1" bind:__l="__l"/><custom2 u-i="2a9ec0b0-3,2a9ec0b0-1" bind:__l="__l"/></custom1></custom>`,
      `(_ctx, _cache) => {
  return {}
}`,
      {
        nodeTransforms,
      }
    )
  })
  test('component with v-for', () => {
    assert(
      `<custom v-for="item in items"/>`,
      `<custom wx:for="{{a}}" wx:for-item="item" u-i="{{item.a}}" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-0' + '-' + i0 }; }) }
}`,
      {
        nodeTransforms,
      }
    )
    assert(
      `<custom v-for="(item,key,index) in items"/>`,
      `<custom wx:for="{{a}}" wx:for-item="item" u-i="{{item.a}}" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, key, index) => { return { a: '2a9ec0b0-0' + '-' + index }; }) }
}`,
      {
        nodeTransforms,
      }
    )
  })
  test('component + component with v-for', () => {
    assert(
      `<custom><custom1 v-for="item in items"/></custom>`,
      `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0" bind:__l="__l"><custom1 wx:for="{{a}}" wx:for-item="item" u-i="{{item.a}}" bind:__l="__l"/></custom>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-1' + '-' + i0 + ',' + '2a9ec0b0-0' }; }) }
}`,
      {
        nodeTransforms,
      }
    )
  })
  test('component with v-for + component', () => {
    assert(
      `<custom v-for="item in items"><custom1/></custom>`,
      `<custom wx:for="{{a}}" wx:for-item="item" u-s="{{['d']}}" u-i="{{item.b}}" bind:__l="__l"><custom1 u-i="{{item.a}}" bind:__l="__l"/></custom>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-1' + '-' + i0 + ',' + ('2a9ec0b0-0' + '-' + i0), b: '2a9ec0b0-0' + '-' + i0 }; }) }
}`,
      {
        nodeTransforms,
      }
    )
  })
  test('component with v-for + component with v-for', () => {
    assert(
      `<custom v-for="item in items"><custom1 v-for="item1 in item.items"/></custom>`,
      `<custom wx:for="{{a}}" wx:for-item="item" u-s="{{['d']}}" u-i="{{item.b}}" bind:__l="__l"><custom1 wx:for="{{item.a}}" wx:for-item="item1" u-i="{{item1.a}}" bind:__l="__l"/></custom>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _f(item.items, (item1, k1, i1) => { return { a: '2a9ec0b0-1' + '-' + i0 + '-' + i1 + ',' + ('2a9ec0b0-0' + '-' + i0) }; }), b: '2a9ec0b0-0' + '-' + i0 }; }) }
}`,
      {
        nodeTransforms,
      }
    )
  })
  test(`component with boolean attribute`, () => {
    assert(
      `<uni-collapse accordion/>`,
      `<uni-collapse u-i="2a9ec0b0-0" u-p="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _p({ accordion: true }) }
}`
    )
  })
  test(`component with props`, () => {
    assert(
      `<uni-collapse ref="a" :ref="b" slot="c" :slot="d" class="e" :class="f" style="g" :style="h" @click="i" v-model:first="j" v-model:last="k" prop-a="l" :prop-b="m" data-a="n" :data-b="o" key="p" :key="r" is="s" :is="t"/>`,
      `<uni-collapse ref="a" ref="{{a}}" slot="c" slot="{{b}}" class="{{['e', c]}}" style="{{'g' + ';' + d}}" bindclick="{{e}}" data-a="n" data-b="{{f}}" key="p" key="{{g}}" is="s" is="{{h}}" u-i="2a9ec0b0-0" bindupdateFirst="{{i}}" bindupdateLast="{{j}}" u-p="{{k}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.b, b: _ctx.d, c: _n(_ctx.f), d: _s(_ctx.h), e: _o(_ctx.i), f: _ctx.o, g: _ctx.r, h: _ctx.t, i: _o($event => _ctx.j = $event), j: _o($event => _ctx.k = $event), k: _p({ ['prop-a']: 'l', ['prop-b']: _ctx.m, first: _ctx.j, last: _ctx.k }) }
}`
    )
  })
})
