import { assert } from './testUtils'

describe('compiler: root', () => {
  test('root without style', () => {
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
