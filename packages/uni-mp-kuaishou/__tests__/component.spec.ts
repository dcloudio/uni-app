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
      `<van-button ks:if="{{r0}}" u-t="m" u-i="dc555fe4-0" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      {
        filename,
      }
    )
  })

  // test ad
  test('test ad component', () => {
    assert(
      `<ad :type='13001' :unit-id='13001001' @load='onLoad' @error='onError' @close='onClose'/>`,
      `<ad type=\"{{13001}}\" unit-id=\"{{13001001}}\" bindload=\"{{a}}\" binderror=\"{{b}}\" bindclose=\"{{c}}\"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onLoad), b: _o(_ctx.onError), c: _o(_ctx.onClose) }
}`
    )
    assert(
      `<ad :type='13001' :unit-id='13001001' @load='onLoad' @error='onError' @close='onClose'></ad>`,
      `<ad type=\"{{13001}}\" unit-id=\"{{13001001}}\" bindload=\"{{a}}\" binderror=\"{{b}}\" bindclose=\"{{c}}\"></ad>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onLoad), b: _o(_ctx.onError), c: _o(_ctx.onClose) }
}`
    )
  })
  // test payment-list
  test('test payment-list component', () => {
    assert(
      `<payment-list @change="handlePaymentSelect" @error="handleError" />`,
      `<payment-list bindchange=\"{{a}}\" binderror=\"{{b}}\"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.handlePaymentSelect), b: _o(_ctx.handleError) }
}`
    )
    assert(
      `<payment-list @change="handlePaymentSelect" @error="handleError"></payment-list>`,
      `<payment-list bindchange=\"{{a}}\" binderror=\"{{b}}\"></payment-list>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.handlePaymentSelect), b: _o(_ctx.handleError) }
}`
    )
  })
  // test follow-service
  test('test follow-service component', () => {
    assert(
      `<follow-service followed-id="xxxxxx" desc="abc" />`,
      `<follow-service followed-id=\"xxxxxx\" desc=\"abc\"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<follow-service followed-id="xxxxxx" desc="abc"></follow-service>`,
      `<follow-service followed-id=\"xxxxxx\" desc=\"abc\"></follow-service>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  // test web-view
  test('test web-view component', () => {
    assert(
      `<web-view src="https://www.baidu.com" :bindmessage="onMessage" />`,
      `<web-view src=\"https://www.baidu.com\" bindmessage=\"{{a}}\"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.onMessage }
}`
    )
    assert(
      `<web-view src="https://www.baidu.com" :bindmessage="onMessage"></web-view>`,
      `<web-view src=\"https://www.baidu.com\" bindmessage=\"{{a}}\"></web-view>`,
      `(_ctx, _cache) => {
  return { a: _ctx.onMessage }
}`
    )
  })

  // test playlet component
  test('test playlet component', () => {
    assert(
      `<playlet playlet-id='123' :show-bottom-safe-area='true' @play='onPlay' @pause='onPause'/>`,
      `<playlet playlet-id=\"123\" show-bottom-safe-area=\"{{true}}\" bindplay=\"{{a}}\" bindpause=\"{{b}}\"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onPlay), b: _o(_ctx.onPause) }
}`
    )
    assert(
      `<playlet playlet-id='123' :show-bottom-safe-area='true' @play='onPlay' @pause='onPause'></playlet>`,
      `<playlet playlet-id=\"123\" show-bottom-safe-area=\"{{true}}\" bindplay=\"{{a}}\" bindpause=\"{{b}}\"></playlet>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onPlay), b: _o(_ctx.onPause) }
}`
    )
  })
})
