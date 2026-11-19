import {
  addMiniProgramPageJson,
  resetMiniProgramJsonFiles,
} from '@dcloudio/uni-cli-shared'
import { createIsCustomElement } from '@dcloudio/uni-shared'
import { assert } from './testUtils'

const originalPlatform = process.env.UNI_PLATFORM
const originalInputDir = process.env.UNI_INPUT_DIR

afterEach(() => {
  resetMiniProgramJsonFiles()
  if (originalPlatform === undefined) {
    Reflect.deleteProperty(process.env, 'UNI_PLATFORM')
  } else {
    process.env.UNI_PLATFORM = originalPlatform
  }
  if (originalInputDir === undefined) {
    Reflect.deleteProperty(process.env, 'UNI_INPUT_DIR')
  } else {
    process.env.UNI_INPUT_DIR = originalInputDir
  }
})

const otherPlatforms = ['mp-toutiao', 'mp-baidu', 'mp-qq', undefined] as const

describe.each(otherPlatforms)('compiler: root (%s)', (platform) => {
  beforeEach(() => {
    if (platform === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_PLATFORM')
    } else {
      process.env.UNI_PLATFORM = platform
    }
    // 注册为页面，确认其他平台不会切换到 page-meta 注入。
    addMiniProgramPageJson('foo', {})
  })

  test('root styles', () => {
    assert(
      `<view/>`,
      `<view/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<view style="color:red"/>`,
      `<view style="color:red"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<comp style="color:red"><text>test</text></comp>`,
      `<comp u-s="{{['d']}}" style="color:red" u-i="2a9ec0b0-0"><text>test</text></comp>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('x: root styles', () => {
    assert(
      `<view/>`,
      `<view style="{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<view><text>test</text></view>`,
      `<view style="{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}"><text>test</text></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<view><text>test</text></view><view>test</view>`,
      `<view style="{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}"><text>test</text></view><view style="{{'--status-bar-height:' + c + ';' + ('--uni-safe-area-inset-bottom:' + d)}}">test</view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\`, c: \`\${_ctx.u_s_b_h}px\`, d: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { isX: true }
    )
  })
  test('root with static style', () => {
    assert(
      `<view style="color:red"/>`,
      `<view style="{{'color:red' + ';' + ('--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b))}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<view style="color:red"><text style="color:blue">test</text></view>`,
      `<view style=\"{{'color:red' + ';' + ('--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b))}}\"><text style=\"color:blue\">test</text></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<view style="color:red; font-size: 20rpx;"><text style="color:blue">test</text></view><view style="color:green">test2</view>`,
      `<view style=\"{{'color:red;font-size:20rpx' + ';' + ('--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b))}}\"><text style=\"color:blue\">test</text></view><view style=\"{{'color:green' + ';' + ('--status-bar-height:' + c + ';' + ('--uni-safe-area-inset-bottom:' + d))}}\">test2</view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\`, c: \`\${_ctx.u_s_b_h}px\`, d: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { isX: true }
    )
  })
  test('root with dynamic style', () => {
    assert(
      `<view :style="{color: 'red'}"/>`,
      `<view style="{{a + ';' + b}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s({ color: 'red' }), b: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }) }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<view :style="foo"/>`,
      `<view style="{{a + ';' + b}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s(_ctx.foo), b: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }) }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<view :style="foo"><text :style="bar">test</text></view>`,
      `<view style="{{b + ';' + c}}"><text style="{{a}}">test</text></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s(_ctx.bar), b: _s(_ctx.foo), c: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }) }
  return __returned__
}`,
      { isX: true }
    )
  })
  test('root with dynamic style and static style', () => {
    assert(
      `<view :style="foo" style="color:red"/>`,
      `<view style="{{a + ';' + b + ';' + 'color:red'}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s(_ctx.foo), b: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }) }
  return __returned__
}`,
      { isX: true }
    )
  })
  test('user component', () => {
    assert(
      `<custom/>`,
      `<custom u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = {}
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<custom><view/></custom>`,
      `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0"><view/></custom>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = {}
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<custom></custom><view/>`,
      `<custom u-i="2a9ec0b0-0"></custom><view style="{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<custom></custom><view><custom/></view>`,
      `<custom u-i="2a9ec0b0-0"></custom><view style="{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}"><custom u-i="2a9ec0b0-1"/></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<custom>test</custom>`,
      `<custom u-s="{{['d']}}" u-i="2a9ec0b0-0">test</custom>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = {}
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<custom><template #name><view>test</view></template></custom>`,
      `<custom u-s="{{['name']}}" u-i="2a9ec0b0-0"><view slot="name">test</view></custom>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = {}
  return __returned__
}`,
      { isX: true }
    )
  })
  test('template', () => {
    assert(
      `<view><template v-if="show"><text>show</text></template><template v-else><text>hidden</text></template><text>test</text></view>`,
      `<view style="{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}"><block wx:if="{{a}}"><text>show</text></block><block wx:else><text>hidden</text></block><text>test</text></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = _e({ a: _ctx.show }, _ctx.show ? {} : {}, { b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\` })
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<template v-if="show"><view/></template><template v-else><view/><text>123</text></template>`,
      `<block wx:if="{{a}}"><view style="{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}"/></block><block wx:else><view style="{{'--status-bar-height:' + d + ';' + ('--uni-safe-area-inset-bottom:' + e)}}"/><text style="{{'--status-bar-height:' + f + ';' + ('--uni-safe-area-inset-bottom:' + g)}}">123</text></block>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = _e({ a: _ctx.show }, _ctx.show ? { b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\` } : { d: \`\${_ctx.u_s_b_h}px\`, e: \`\${_ctx.u_s_a_i_b}px\`, f: \`\${_ctx.u_s_b_h}px\`, g: \`\${_ctx.u_s_a_i_b}px\` })
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<template v-if="show"><template v-if="show2"><view/></template><text>123</text></template>`,
      `<block wx:if="{{a}}"><block wx:if="{{b}}"><view style="{{'--status-bar-height:' + c + ';' + ('--uni-safe-area-inset-bottom:' + d)}}"/></block><text style="{{'--status-bar-height:' + e + ';' + ('--uni-safe-area-inset-bottom:' + f)}}">123</text></block>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = _e({ a: _ctx.show }, _ctx.show ? _e({ b: _ctx.show2 }, _ctx.show2 ? { c: \`\${_ctx.u_s_b_h}px\`, d: \`\${_ctx.u_s_a_i_b}px\` } : {}, { e: \`\${_ctx.u_s_b_h}px\`, f: \`\${_ctx.u_s_a_i_b}px\` }) : {})
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<template v-if="show"><template v-if="show2"><view><slot/></view><template v-if="show3">test text <view><slot>slot text</slot></view></template></template><text>123</text></template>`,
      `<block wx:if="{{a}}"><block wx:if="{{b}}"><view style="{{'--status-bar-height:' + c + ';' + ('--uni-safe-area-inset-bottom:' + d)}}"><slot/></view><block wx:if="{{e}}">test text <view style="{{'--status-bar-height:' + f + ';' + ('--uni-safe-area-inset-bottom:' + g)}}"><block wx:if="{{$slots.d}}"><slot></slot></block><block wx:else>slot text</block></view></block></block><text style="{{'--status-bar-height:' + h + ';' + ('--uni-safe-area-inset-bottom:' + i)}}">123</text></block>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = _e({ a: _ctx.show }, _ctx.show ? _e({ b: _ctx.show2 }, _ctx.show2 ? _e({ c: \`\${_ctx.u_s_b_h}px\`, d: \`\${_ctx.u_s_a_i_b}px\`, e: _ctx.show3 }, _ctx.show3 ? { f: \`\${_ctx.u_s_b_h}px\`, g: \`\${_ctx.u_s_a_i_b}px\` } : {}) : {}, { h: \`\${_ctx.u_s_b_h}px\`, i: \`\${_ctx.u_s_a_i_b}px\` }) : {})
  return __returned__
}`,
      { isX: true }
    )
  })
  test('slot', () => {
    assert(
      `<slot>test</slot>`,
      `<block wx:if="{{$slots.d}}"><slot></slot></block><block wx:else>test</block>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = {}
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<slot><view>test</view></slot>`,
      `<block wx:if="{{$slots.d}}"><slot></slot></block><block wx:else><view style="{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}">test</view></block>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<slot>test1<view>test2</view></slot>`,
      `<block wx:if="{{$slots.d}}"><slot></slot></block><block wx:else>test1<view style="{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}">test2</view></block>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<slot>test1</slot><view>test2</view>`,
      `<block wx:if="{{$slots.d}}"><slot></slot></block><block wx:else>test1</block><view style="{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}">test2</view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<slot name="test">test1</slot>`,
      `<block wx:if="{{$slots.test}}"><slot name="test"></slot></block><block wx:else>test1</block>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = {}
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<view>test</view><view><slot name="s1"><view><view>test1</view></view><view>test2</view></slot></view>`,
      `<view style="{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}">test</view><view style="{{'--status-bar-height:' + c + ';' + ('--uni-safe-area-inset-bottom:' + d)}}"><block wx:if="{{$slots.s1}}"><slot name="s1"></slot></block><block wx:else><view><view>test1</view></view><view>test2</view></block></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\`, c: \`\${_ctx.u_s_b_h}px\`, d: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { isX: true }
    )
  })
  test('v-for', () => {
    assert(
      `<view><text v-for="item in list" :key="item.id">item -- {{ item.text }}</text></view>`,
      `<view style="{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}"><text wx:for="{{a}}" wx:for-item="item" wx:key="b">item -- {{item.a}}</text></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(_ctx.list, (item, k0, i0) => { return { a: _t(item.text), b: item.id }; }), b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<template v-for="item in list"><view><text>item -- {{ item }}</text></view></template>`,
      `<block wx:for="{{a}}" wx:for-item="item"><view style="{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}"><text>item -- {{item.a}}</text></view></block>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(_ctx.list, (item, k0, i0) => { return { a: _t(item) }; }), b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<template v-for="item in list"><view>item -- {{ item }}</view></template><view><text>test</text></view>`,
      `<block wx:for="{{a}}" wx:for-item="item"><view style="{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}">item -- {{item.a}}</view></block><view style="{{'--status-bar-height:' + d + ';' + ('--uni-safe-area-inset-bottom:' + e)}}"><text>test</text></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(_ctx.list, (item, k0, i0) => { return { a: _t(item) }; }), b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\`, d: \`\${_ctx.u_s_b_h}px\`, e: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { isX: true }
    )
  })
})

describe.each(['mp-weixin', 'mp-alipay'] as const)(
  'compiler: root page-meta (%s)',
  (platform) => {
    const options = {
      isX: true,
      root: '/src',
      filename: '/src/pages/index.uvue',
      hashId: 'test',
      comments: true,
      isCustomElement: createIsCustomElement(['page-meta', 'navigation-bar']),
    }

    beforeEach(() => {
      process.env.UNI_PLATFORM = platform
      process.env.UNI_INPUT_DIR = '/src'
      addMiniProgramPageJson('pages/index', {})
    })

    test.each(['<view/>', '<view/><text>test</text>'])(
      'prepend page-meta: %s',
      (template) => {
        assert(
          template,
          `<page-meta page-style="{{a}}"/>${template}`,
          `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }) }
  return __returned__
}`,
          options
        )
      }
    )

    test('page with a user component root', () => {
      assert(
        '<custom/>',
        '<page-meta page-style="{{a}}"/><custom u-i="test-0"/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }) }
  return __returned__
}`,
        options
      )
    })

    test('reuse page-meta and preserve its attributes and children', () => {
      assert(
        '<page-meta background-color="#fff"><navigation-bar title="test"/></page-meta><view/>',
        '<page-meta background-color="#fff" page-style="{{a}}"><navigation-bar title="test"/></page-meta><view/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }) }
  return __returned__
}`,
        options
      )
    })

    test('reuse page-meta after a leading comment', () => {
      assert(
        '<!-- header --><page-meta page-style="color:red"/><view/>',
        '<page-meta page-style="{{a}}"/><view/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s(['color:red', { '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }]) }
  return __returned__
}`,
        options
      )
    })

    test('reuse page-meta after leading comments and blank text', () => {
      const preserveWhitespaceOptions = { ...options, whitespace: 'preserve' }
      assert(
        '<!-- header --> <!-- settings --><page-meta page-style="color:red"/><view/>',
        ' <page-meta page-style="{{a}}"/><view/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s(['color:red', { '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }]) }
  return __returned__
}`,
        preserveWhitespaceOptions
      )
    })

    test('prepend page-meta to a comments-only template', () => {
      assert(
        '<!-- header --><!-- settings -->',
        '<page-meta page-style="{{a}}"/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }) }
  return __returned__
}`,
        options
      )
    })

    test('merge static page-style', () => {
      assert(
        '<page-meta page-style="color:red"/><view/>',
        '<page-meta page-style="{{a}}"/><view/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s(['color:red', { '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }]) }
  return __returned__
}`,
        options
      )
    })

    test('merge empty page-style', () => {
      assert(
        '<page-meta page-style=""/><view/>',
        '<page-meta page-style="{{a}}"/><view/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s(['', { '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }]) }
  return __returned__
}`,
        options
      )
    })

    test('merge bare page-style', () => {
      assert(
        '<page-meta page-style/><view/>',
        '<page-meta page-style="{{a}}"/><view/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s(['', { '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }]) }
  return __returned__
}`,
        options
      )
    })

    test('merge dynamic string page-style', () => {
      assert(
        '<page-meta :page-style="foo"/><view/>',
        '<page-meta page-style="{{a}}"/><view/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s([_ctx.foo, { '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }]) }
  return __returned__
}`,
        options
      )
    })

    test('merge dynamic object page-style', () => {
      assert(
        '<page-meta :page-style="{ color: color }"/><view/>',
        '<page-meta page-style="{{a}}"/><view/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s([{ color: _ctx.color }, { '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }]) }
  return __returned__
}`,
        options
      )
    })

    test('merge dynamic array page-style', () => {
      assert(
        '<page-meta :page-style="[foo, { fontSize: fontSize }]"/><view/>',
        '<page-meta page-style="{{a}}"/><view/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s([_ctx.foo, { fontSize: _ctx.fontSize }, { '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }]) }
  return __returned__
}`,
        options
      )
    })

    test('merge null page-style', () => {
      assert(
        '<page-meta :page-style="null"/><view/>',
        '<page-meta page-style="{{a}}"/><view/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s([null, { '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }]) }
  return __returned__
}`,
        options
      )
    })

    test('merge static page-style before dynamic page-style', () => {
      assert(
        '<page-meta page-style="color:red" :page-style="foo"/><view/>',
        '<page-meta page-style="{{a}}"/><view/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s(['color:red', [_ctx.foo, { '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }]]) }
  return __returned__
}`,
        options
      )
    })

    test('merge dynamic page-style before static page-style', () => {
      assert(
        '<page-meta :page-style="foo" page-style="color:red"/><view/>',
        '<page-meta page-style="{{a}}"/><view/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s([[_ctx.foo, { '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }], 'color:red']) }
  return __returned__
}`,
        options
      )
    })

    test('page-style does not merge the page-meta element style', () => {
      assert(
        '<page-meta style="color:red" page-style="background:white"/><view/>',
        '<page-meta style="color:red" page-style="{{a}}"/><view/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s(['background:white', { '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }]) }
  return __returned__
}`,
        options
      )
    })

    test('preserve root style and component CSS bindings', () => {
      for (const prefix of ['', '<page-meta/>']) {
        assert(
          `${prefix}<view :style="foo"/>`,
          `<page-meta page-style="{{a}}"/><view style="{{b + ';' + c}}"/>`,
          `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }), b: _s(_ctx.foo), c: _s(_ctx.__cssVars()) }
  return __returned__
}`,
          { ...options, bindingCssVars: ['color'] }
        )
      }
    })

    test('component files do not inject page-meta or system CSS vars', () => {
      assert(
        '<view style="color:red"/><text/>',
        '<view style="color:red"/><text/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = {}
  return __returned__
}`,
        { ...options, filename: '/src/components/test.uvue' }
      )
    })

    test('subpackage pages inject page-meta', () => {
      addMiniProgramPageJson('package/pages/detail', {})
      assert(
        '<view/>',
        '<page-meta page-style="{{a}}"/><view/>',
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }) }
  return __returned__
}`,
        { ...options, filename: '/src/package/pages/detail.uvue' }
      )
    })

    test('non-x pages retain their existing behavior', () => {
      assert(
        '<view/>',
        '<view/>',
        `(_ctx, _cache) => {
  return {}
}`,
        { ...options, isX: false }
      )
      assert(
        '<page-meta page-style="color:red"/><view/>',
        '<page-meta page-style="color:red"/><view/>',
        `(_ctx, _cache) => {
  return {}
}`,
        { ...options, isX: false }
      )
    })
  }
)
