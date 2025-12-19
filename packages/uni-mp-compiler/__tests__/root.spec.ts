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
})
