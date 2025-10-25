import { extend } from '@vue/shared'
import { assert, miniProgram } from './testUtils'

const options = {
  miniProgram: {
    ...miniProgram,
    component: extend({}, miniProgram.component, {
      // mergeVirtualHostAttributes: true,
    }),
  },
}
const optionsX = {
  isX: true,
  ...options,
}

describe('complier: merge part class', () => {
  test('only static part', () => {
    assert(
      `<view><image part="logo logo-active"/></view>`,
      `<view style=\"{{'--status-bar-height:' + b}}\"><image part=\"logo logo-active\" class=\"{{a}}\"/></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _mpc('logo logo-active'), b: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      optionsX
    )
  })
  test('static part with static class', () => {
    assert(
      `<view><image class="img-large" part="logo logo-active"/></view>`,
      `<view style=\"{{'--status-bar-height:' + b}}\"><image class=\"{{a}}\" part=\"logo logo-active\"/></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _mpc('logo logo-active', 'img-large'), b: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      optionsX
    )
  })
  test('static part with dynamic class', () => {
    assert(
      `<view><image :class="x" part="logo logo-active"/></view>`,
      `<view style=\"{{'--status-bar-height:' + b}}\"><image class=\"{{a}}\" part=\"logo logo-active\"/></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _mpc('logo logo-active', _ctx.x), b: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      optionsX
    )
  })
  test('only dynamic part', () => {
    assert(
      `<view><image :part="p"/></view>`,
      `<view style=\"{{'--status-bar-height:' + c}}\"><image part=\"{{b}}\" class=\"{{a}}\"/></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _mpc(_ctx.p), b: _ctx.p, c: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      optionsX
    )
  })
  test('dynamic part with static class', () => {
    assert(
      `<view><image :part="p" class="img-large"/></view>`,
      `<view style=\"{{'--status-bar-height:' + c}}\"><image part=\"{{b}}\" class=\"{{a}}\"/></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _mpc(_ctx.p, 'img-large'), b: _ctx.p, c: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      optionsX
    )
  })
  test('dynamic part with dynamic class', () => {
    assert(
      `<view><image :part="p" :class="x"/></view>`,
      `<view style=\"{{'--status-bar-height:' + c}}\"><image part=\"{{b}}\" class=\"{{a}}\"/></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _mpc(_ctx.p, _ctx.x), b: _ctx.p, c: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      optionsX
    )
  })
})
