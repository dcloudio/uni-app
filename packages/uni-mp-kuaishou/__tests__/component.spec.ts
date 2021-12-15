import { addMiniProgramPageJson } from '@dcloudio/uni-cli-shared'
import { assert } from './testUtils'

describe('mp-kuaishou: transform component', () => {
  test('lazy element', () => {
    assert(
      `<switch/>`,
      `<switch/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<switch @change="change"/>`,
      `<block ks:if="{{r0}}"><switch bindchange="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.change) }
}`
    )
  })
  test(`mini program component`, () => {
    const filename = 'pages/vant/vant'
    addMiniProgramPageJson(filename, {
      usingComponents: {
        'van-button': 'kscomponents/button/index',
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
