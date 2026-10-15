import { addMiniProgramPageJson, pagesCacheSet } from '@dcloudio/uni-cli-shared'
import { assert } from './testUtils'
import { customElements } from '../src/compiler/options'

describe('mp-toutiao: transform component', () => {
  test(`component with v-show`, () => {
    assert(
      `<custom v-show="ok"/>`,
      `<custom bind:-data-c-h="{{!a}}" u-p-i="{{uI+(uPI?','+uPI:'')}}" u-i="2a9ec0b0-0" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.ok }
}`
    )
  })
  test(`pass parent vue id across sfc`, () => {
    assert(
      `<view><custom><custom1><custom2/></custom1></custom></view>`,
      `<view><custom u-s="{{['d']}}" u-p-i="{{uI+(uPI?','+uPI:'')}}" u-i="2a9ec0b0-0" bind:__l="__l"><custom1 u-s="{{['d']}}" u-p-i="{{uI+(uPI?','+uPI:'')}}" u-i="2a9ec0b0-1,2a9ec0b0-0" bind:__l="__l"><custom2 u-p-i="{{uI+(uPI?','+uPI:'')}}" u-i="2a9ec0b0-2,2a9ec0b0-1,2a9ec0b0-0" bind:__l="__l"/></custom1></custom></view>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test(`generate unique parent path in nested v-for`, () => {
    assert(
      `<custom v-for="item in items"><custom1 v-for="item1 in item.items"><custom2/></custom1></custom>`,
      `<custom tt:for="{{a}}" tt:for-item="item" u-s="{{['d']}}" u-p-i="{{uI+(uPI?','+uPI:'')}}" u-i="{{item.b}}" bind:__l="__l"><custom1 tt:for="{{item.a}}" tt:for-item="item1" u-s="{{['d']}}" u-p-i="{{uI+(uPI?','+uPI:'')}}" u-i="{{item1.b}}" bind:__l="__l"><custom2 u-p-i="{{uI+(uPI?','+uPI:'')}}" u-i="{{item1.a}}" bind:__l="__l"/></custom1></custom>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _f(item.items, (item1, k1, i1) => { return { a: '2a9ec0b0-2' + '-' + i0 + '-' + i1 + ',' + ('2a9ec0b0-1' + '-' + i0 + '-' + i1) + ',' + ('2a9ec0b0-0' + '-' + i0), b: '2a9ec0b0-1' + '-' + i0 + '-' + i1 + ',' + ('2a9ec0b0-0' + '-' + i0) }; }), b: '2a9ec0b0-0' + '-' + i0 }; }) }
}`
    )
  })
  test(`do not pass parent vue id from page`, () => {
    const filename = 'pages/index/index.vue'
    pagesCacheSet.add('pages/index/index')
    try {
      assert(
        `<custom><custom1><custom2/></custom1></custom>`,
        `<custom u-s="{{['d']}}" u-i="57280228-0" bind:__l="__l"><custom1 u-s="{{['d']}}" u-i="57280228-1,57280228-0" bind:__l="__l"><custom2 u-i="57280228-2,57280228-1,57280228-0" bind:__l="__l"/></custom1></custom>`,
        `(_ctx, _cache) => {
  return {}
}`,
        { filename }
      )
    } finally {
      pagesCacheSet.delete('pages/index/index')
    }
  })
  test('match-media', () => {
    assert(
      `<match-media min-width="600" max-height="1000"/>`,
      `<match-media min-width="600" max-height="1000"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test(`mini program component`, () => {
    const filename = 'pages/vant/vant'
    addMiniProgramPageJson(filename, {
      usingComponents: {
        'van-button': 'ttcomponents/button/index',
      },
    })
    assert(
      `<van-button/>`,
      `<van-button tt:if="{{r0}}" u-t="m" u-i="dc555fe4-0" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      {
        filename,
      }
    )
  })
  test(`mini program plugin`, () => {
    const filename = 'pages/vant/vant'
    addMiniProgramPageJson(filename, {
      usingComponents: {
        'pay-button-sdk': 'ext://industry/pay-button',
      },
    })
    assert(
      `<pay-button-sdk :mode="2" :goods-type="2" goods-id="xxxxxx" @getgoodsinfo="getgoodsinfo"/>`,
      `<pay-button-sdk tt:if="{{r0}}" mode="{{2}}" goods-type="{{2}}" goods-id="xxxxxx" bindgetgoodsinfo="{{a}}" u-t="m" u-i="dc555fe4-0" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.getgoodsinfo, "02") }
}`,
      {
        filename,
      }
    )
  })
  test(`built-in component`, () => {
    const code = customElements.map((tag) => `<${tag}/>`).join('')
    assert(
      code,
      code,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
})
