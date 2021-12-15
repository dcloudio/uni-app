import { addMiniProgramPageJson } from '@dcloudio/uni-cli-shared'
import { assert } from './testUtils'

describe('mp-baidu: transform component', () => {
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
      `<van-button u-t="m" u-i="dc555fe4-0" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      {
        filename,
      }
    )
  })
})
