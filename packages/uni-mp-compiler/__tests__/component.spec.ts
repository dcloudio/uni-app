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
      `<custom v-s="{{['default']}}" v-i="2a9ec0b0-0" bind:__l="__l"><custom1 v-i="2a9ec0b0-1,2a9ec0b0-0" bind:__l="__l"/></custom>`,
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
      `<custom v-s="{{['default']}}" v-i="2a9ec0b0-0" bind:__l="__l"><custom1 v-s="{{['default']}}" v-i="2a9ec0b0-1,2a9ec0b0-0" bind:__l="__l"><custom2 v-i="2a9ec0b0-2,2a9ec0b0-1" bind:__l="__l"/><custom2 v-i="2a9ec0b0-3,2a9ec0b0-1" bind:__l="__l"/></custom1></custom>`,
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
      `<custom wx:for="{{a}}" wx:for-item="item" v-i="{{item.a}}" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-0' + '-' + i0 }; }) }
}`,
      {
        nodeTransforms,
      }
    )
    assert(
      `<custom v-for="(item,key,index) in items"/>`,
      `<custom wx:for="{{a}}" wx:for-item="item" v-i="{{item.a}}" bind:__l="__l"/>`,
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
      `<custom v-s="{{['default']}}" v-i="2a9ec0b0-0" bind:__l="__l"><custom1 wx:for="{{a}}" wx:for-item="item" v-i="{{item.a}}" bind:__l="__l"/></custom>`,
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
      `<custom wx:for="{{a}}" wx:for-item="item" v-s="{{['default']}}" v-i="{{item.b}}" bind:__l="__l"><custom1 v-i="{{item.a}}" bind:__l="__l"/></custom>`,
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
      `<custom wx:for="{{a}}" wx:for-item="item" v-s="{{['default']}}" v-i="{{item.b}}" bind:__l="__l"><custom1 wx:for="{{item.a}}" wx:for-item="item1" v-i="{{item1.a}}" bind:__l="__l"/></custom>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _f(item.items, (item1, k1, i1) => { return { a: '2a9ec0b0-1' + '-' + i0 + '-' + i1 + ',' + ('2a9ec0b0-0' + '-' + i0) }; }), b: '2a9ec0b0-0' + '-' + i0 }; }) }
}`,
      {
        nodeTransforms,
      }
    )
  })
})
