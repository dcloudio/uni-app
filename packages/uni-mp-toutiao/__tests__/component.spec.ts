import { addMiniProgramPageJson } from '@dcloudio/uni-cli-shared'
import { assert } from './testUtils'
import { customElements } from '../src/compiler/options'

describe('mp-toutiao: transform component', () => {
  test(`component with v-show`, () => {
    assert(
      `<custom v-show="ok"/>`,
      `<custom bind:-data-c-h="{{!a}}" u-i="2a9ec0b0-0" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.ok }
}`
    )
  })
  test(`match-media`, () => {
    assert(
      `<match-media/>`,
      `<uni-match-media u-i="2a9ec0b0-0" bind:__l="__l"/>`,
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
  return { a: _o(_ctx.getgoodsinfo) }
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
