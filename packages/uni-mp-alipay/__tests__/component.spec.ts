import { addMiniProgramPageJson } from '@dcloudio/uni-cli-shared'
import { customElements } from '../src/compiler/options'
import { assert } from './testUtils'

const blankScript = `(_ctx, _cache) => {
  return {}
}`
describe('mp-alipay: transform component', () => {
  test(`built-in component`, () => {
    // 这里已经包含了自定义组件
    const code = customElements.map((tag) => `<${tag}/>`).join('')
    assert(code, code, blankScript)
  })
  test(`match-media`, () => {
    assert(
      `<match-media/>`,
      `<uni-match-media u-i="2a9ec0b0-0" onVI="__l"/>`,
      blankScript
    )
  })
  test(`mini program component`, () => {
    const filename = 'pages/vant/vant'
    addMiniProgramPageJson(filename, {
      usingComponents: {
        'van-button': 'mycomponents/button/index',
      },
    })
    assert(
      `<van-button/>`,
      `<van-button u-t="m" u-i="dc555fe4-0" onVI="__l"/>`,
      blankScript,
      {
        filename,
      }
    )
  })

  test('alipay open component - webview', () => {
    assert(
      `<web-view
    src="https://https://uniapp.dcloud.io/"
    @message="onmessage"
  ></web-view>`,
      `<web-view src=\"https://https://uniapp.dcloud.io/\" onMessage=\"{{a}}\"></web-view>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onmessage) }
}`
    )
  })
  test('alipay open component - join-group-chat', () => {
    assert(
      `<join-group-chat template-id="your_template_id" />`,
      `<join-group-chat template-id="your_template_id"/>`,
      blankScript
    )
    assert(
      `<join-group-chat template-id="your_template_id"></join-group-chat>`,
      `<join-group-chat template-id="your_template_id"></join-group-chat>`,
      blankScript
    )
  })
  test('alipay open component - root-portal', () => {
    assert(
      `<root-portal :enable="true"/>`,
      `<root-portal enable="{{true}}"/>`,
      blankScript
    )
  })
  test('alipay open component - share-element', () => {
    assert(
      `<share-element :duration="400" :transform="true" easing-function="ease-out"/>`,
      `<share-element duration="{{400}}" transform="{{true}}" easing-function="ease-out"/>`,
      blankScript
    )
  })
  test('alipay open component - subscribe-message', () => {
    // <subscribe-message template-id='xxxxx' onComplete="completeHandler" />
    assert(
      `<subscribe-message template-id='xxxxx' onComplete="completeHandler" />`,
      `<subscribe-message template-id="xxxxx" onComplete="completeHandler"/>`,
      blankScript
    )
    assert(
      `<subscribe-message template-id='xxxxx' @complete="completeHandler" />`,
      `<subscribe-message template-id="xxxxx" onComplete="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.completeHandler) }
}`
    )
  })

  test(`button chooseAvatar`, () => {
    assert(
      `<button open-type="chooseAvatar" @chooseavatar="onChooseAvatar" />`,
      `<button open-type="chooseAvatar" onChooseAvatar="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onChooseAvatar) }
}`
    )
  })
})
