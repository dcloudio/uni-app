import { addComponentBindLink } from '@dcloudio/uni-cli-shared'
import { assert } from './testUtils'

describe('compiler: transform component', () => {
  //   test('basic', () => {
  //     assert(
  //       `<custom/>`,
  //       `<custom class="v-r" v-i="2a9ec0b0-0" bind:__l="__l"/>`,
  //       `(_ctx, _cache) => {
  //   return {}
  // }`,
  //       {
  //         nodeTransforms: [addComponentBindLink as any],
  //       }
  //     )
  //   })
  test('component + component', () => {
    assert(
      `<custom><custom1/></custom>`,
      `<custom vue-slots="{{['default']}}" class="v-r" v-i="2a9ec0b0-0" bind:__l="__l"><custom1 class="v-r" v-i="2a9ec0b0-1,2a9ec0b0-0" bind:__l="__l"/></custom>`,
      `(_ctx, _cache) => {
  return {}
}`,
      {
        nodeTransforms: [addComponentBindLink as any],
      }
    )
  })
  test('component + component + component', () => {
    assert(
      `<custom><custom1><custom2/><custom2/></custom1></custom>`,
      `<custom vue-slots="{{['default']}}" class="v-r" v-i="2a9ec0b0-0" bind:__l="__l"><custom1 vue-slots="{{['default']}}" class="v-r" v-i="2a9ec0b0-1,2a9ec0b0-0" bind:__l="__l"><custom2 class="v-r" v-i="2a9ec0b0-2,2a9ec0b0-1" bind:__l="__l"/><custom2 class="v-r" v-i="2a9ec0b0-3,2a9ec0b0-1" bind:__l="__l"/></custom1></custom>`,
      `(_ctx, _cache) => {
  return {}
}`,
      {
        nodeTransforms: [addComponentBindLink as any],
      }
    )
  })
  test('component with v-for', () => {
    assert(
      `<custom v-for="item in items"/>`,
      `<custom wx:for="{{a}}" wx:for-item="item" class="v-r-i-f" v-i="{{item.a}}" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-0' + '-' + i0 }; }) }
}`,
      {
        nodeTransforms: [addComponentBindLink as any],
      }
    )
    assert(
      `<custom v-for="(item,key,index) in items"/>`,
      `<custom wx:for="{{a}}" wx:for-item="item" class="v-r-i-f" v-i="{{item.a}}" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, key, index) => { return { a: '2a9ec0b0-0' + '-' + index }; }) }
}`,
      {
        nodeTransforms: [addComponentBindLink as any],
      }
    )
  })
  test('component + component with v-for', () => {
    assert(
      `<custom><custom1 v-for="item in items"/></custom>`,
      `<custom vue-slots="{{['default']}}" class="v-r" v-i="2a9ec0b0-0" bind:__l="__l"><custom1 wx:for="{{a}}" wx:for-item="item" class="v-r-i-f" v-i="{{item.a}}" bind:__l="__l"/></custom>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-1' + '-' + i0 + ',' + '2a9ec0b0-0' }; }) }
}`,
      {
        nodeTransforms: [addComponentBindLink as any],
      }
    )
  })
  test('component with v-for + component', () => {
    assert(
      `<custom v-for="item in items"><custom1/></custom>`,
      `<custom wx:for="{{a}}" wx:for-item="item" vue-slots="{{['default']}}" class="v-r-i-f" v-i="{{item.b}}" bind:__l="__l"><custom1 class="v-r-i-f" v-i="{{item.a}}" bind:__l="__l"/></custom>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-1' + '-' + i0 + ',' + ('2a9ec0b0-0' + '-' + i0), b: '2a9ec0b0-0' + '-' + i0 }; }) }
}`,
      {
        nodeTransforms: [addComponentBindLink as any],
      }
    )
  })
  test('component with v-for + component with v-for', () => {
    assert(
      `<custom v-for="item in items"><custom1 v-for="item1 in item.items"/></custom>`,
      `<custom wx:for="{{a}}" wx:for-item="item" vue-slots="{{['default']}}" class="v-r-i-f" v-i="{{item.b}}" bind:__l="__l"><custom1 wx:for="{{item.a}}" wx:for-item="item1" class="v-r-i-f" v-i="{{item1.a}}" bind:__l="__l"/></custom>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _f(item.items, (item1, k1, i1) => { return { a: '2a9ec0b0-1' + '-' + i0 + '-' + i1 + ',' + ('2a9ec0b0-0' + '-' + i0) }; }), b: '2a9ec0b0-0' + '-' + i0 }; }) }
}`,
      {
        nodeTransforms: [addComponentBindLink as any],
      }
    )
  })
})
