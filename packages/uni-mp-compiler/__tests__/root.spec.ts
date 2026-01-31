import { assert } from './testUtils'

describe('compiler: root', () => {
  test('root without style', () => {
    assert(
      `<view/>`,
      `<view style="{{'--status-bar-height:' + a}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<view><text>test</text></view>`,
      `<view style="{{'--status-bar-height:' + a}}"><text>test</text></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<view><text>test</text></view><view>test</view>`,
      `<view style="{{'--status-bar-height:' + a}}"><text>test</text></view><view style="{{'--status-bar-height:' + b}}">test</view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      { isX: true }
    )
  })
  test('root with static style', () => {
    assert(
      `<view style="color:red"/>`,
      `<view style="{{'color:red' + ';' + ('--status-bar-height:' + a)}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<view style="color:red"><text style="color:blue">test</text></view>`,
      `<view style=\"{{'color:red' + ';' + ('--status-bar-height:' + a)}}\"><text style=\"color:blue\">test</text></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<view style="color:red; font-size: 20rpx;"><text style="color:blue">test</text></view><view style="color:green">test2</view>`,
      `<view style=\"{{'color:red;font-size:20rpx' + ';' + ('--status-bar-height:' + a)}}\"><text style=\"color:blue\">test</text></view><view style=\"{{'color:green' + ';' + ('--status-bar-height:' + b)}}\">test2</view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_b_h}px\` }
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
  const __returned__ = { a: _s({ color: 'red' }), b: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\` }) }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<view :style="foo"/>`,
      `<view style="{{a + ';' + b}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s(_ctx.foo), b: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\` }) }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<view :style="foo"><text :style="bar">test</text></view>`,
      `<view style="{{b + ';' + c}}"><text style="{{a}}">test</text></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s(_ctx.bar), b: _s(_ctx.foo), c: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\` }) }
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
  const __returned__ = { a: _s(_ctx.foo), b: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\` }) }
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
      `<custom u-i="2a9ec0b0-0"></custom><view style="{{'--status-bar-height:' + a}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      { isX: true }
    )

    assert(
      `<custom></custom><view><custom/></view>`,
      `<custom u-i="2a9ec0b0-0"></custom><view style="{{'--status-bar-height:' + a}}"><custom u-i="2a9ec0b0-1"/></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      { isX: true }
    )
  })
  test('template', () => {
    assert(
      `<template v-if="show"><view/></template><template v-else><view/><text>123</text></template>`,
      `<block wx:if="{{a}}"><view style="{{'--status-bar-height:' + b}}"/></block><block wx:else><view style="{{'--status-bar-height:' + c}}"/><text style="{{'--status-bar-height:' + d}}">123</text></block>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = _e({ a: _ctx.show }, _ctx.show ? { b: \`\${_ctx.u_s_b_h}px\` } : { c: \`\${_ctx.u_s_b_h}px\`, d: \`\${_ctx.u_s_b_h}px\` })
  return __returned__
}`,
      { isX: true }
    )

    assert(
      `<template v-if="show"><template v-if="show2"><view/></template><text>123</text></template>`,
      `<block wx:if="{{a}}"><block wx:if="{{b}}"><view style="{{'--status-bar-height:' + c}}"/></block><text style="{{'--status-bar-height:' + d}}">123</text></block>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = _e({ a: _ctx.show }, _ctx.show ? _e({ b: _ctx.show2 }, _ctx.show2 ? { c: \`\${_ctx.u_s_b_h}px\` } : {}, { d: \`\${_ctx.u_s_b_h}px\` }) : {})
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
      `<block wx:if="{{$slots.d}}"><slot></slot></block><block wx:else><view style="{{'--status-bar-height:' + a}}">test</view></block>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<slot>test1<view>test2</view></slot>`,
      `<block wx:if="{{$slots.d}}"><slot></slot></block><block wx:else>test1<view style="{{'--status-bar-height:' + a}}">test2</view></block>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      { isX: true }
    )
    assert(
      `<slot>test1</slot><view>test2</view>`,
      `<block wx:if="{{$slots.d}}"><slot></slot></block><block wx:else>test1</block><view style="{{'--status-bar-height:' + a}}">test2</view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
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
  })
  test('v-for', () => {
    assert(
      `<template v-for="item in list"><view>item -- {{ item }}</view></template>`,
      `<block wx:for="{{a}}" wx:for-item="item"><view style="{{'--status-bar-height:' + b}}">item -- {{item.a}}</view></block>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(_ctx.list, (item, k0, i0) => { return { a: _t(item) }; }), b: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      { isX: true }
    )
  })
})
