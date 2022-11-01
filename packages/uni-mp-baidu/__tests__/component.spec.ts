import { assert } from './testUtils'
import { customElements } from '../src/compiler/options'
import { addMiniProgramPageJson } from '@dcloudio/uni-cli-shared'
describe('mp-baidu: transform component', () => {
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
  test(`match-media`, () => {
    assert(
      `<match-media/>`,
      `<uni-match-media u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test(`mini program component`, () => {
    const filename = 'pages/vant/vant'
    addMiniProgramPageJson(filename, {
      usingComponents: {
        'van-button': 'swancomponents/button/index',
      },
      usingSwanComponents: {
        'comment-list': 'dynamicLib://myDynamicLib/comment-list',
      },
    })
    assert(
      `<van-button/><comment-list :comment-param="comment"/>`,
      `<van-button s-if="{{r0}}" u-t="m" u-i="dc555fe4-0"/><comment-list s-if="{{r0}}" comment-param="{{a}}" u-t="m" u-i="dc555fe4-1"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.comment }
}`,
      {
        filename,
      }
    )
  })
})
