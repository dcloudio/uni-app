import {
  clearMiniProgramComponentStyleIsolation,
  updateMiniProgramComponentStyleIsolation,
} from '@dcloudio/uni-cli-shared'
import { assert } from './testUtils'

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[name]
  } else {
    process.env[name] = value
  }
}

describe('mp-alipay: styleIsolation 2.0 class attributes', () => {
  const pageFilename = '/src/pages/index/index.vue'
  const componentFilename = '/src/components/test.vue'
  const originalPlatform = process.env.UNI_PLATFORM
  const originalAppX = process.env.UNI_APP_X
  const originalVersion = process.env.UNI_APP_STYLE_ISOLATION_VERSION
  const originalInputDir = process.env.UNI_INPUT_DIR

  beforeEach(() => {
    process.env.UNI_PLATFORM = 'mp-alipay'
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_STYLE_ISOLATION_VERSION = '2'
    process.env.UNI_INPUT_DIR = '/src'
    updateMiniProgramComponentStyleIsolation(pageFilename, 'app', true)
    updateMiniProgramComponentStyleIsolation(componentFilename, 'isolated')
  })

  afterEach(() => {
    restoreEnv('UNI_PLATFORM', originalPlatform)
    restoreEnv('UNI_APP_X', originalAppX)
    restoreEnv('UNI_APP_STYLE_ISOLATION_VERSION', originalVersion)
    restoreEnv('UNI_INPUT_DIR', originalInputDir)
    clearMiniProgramComponentStyleIsolation(pageFilename)
    clearMiniProgramComponentStyleIsolation(componentFilename)
  })

  test('静态原生 class 属性按页面作用域展开并保留特殊值', () => {
    assert(
      '<view hover-class="active"/><view hover-class="none"/>',
      "<view hover-class=\"active -a-active -p-active\" style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\"/><view hover-class=\"none\" style=\"{{'--status-bar-height:' + c + ';' + ('--uni-safe-area-inset-bottom:' + d)}}\"/>",
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\`, c: \`\${_ctx.u_s_b_h}px\`, d: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { filename: pageFilename, isX: true }
    )
    assert(
      '<input placeholder-class="placeholder muted"/><input placeholder-class=""/><view placeholder-class="placeholder"/>',
      "<input placeholder-class=\"placeholder -a-placeholder -p-placeholder muted -a-muted -p-muted\" style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\"/><input placeholder-class=\"\" style=\"{{'--status-bar-height:' + c + ';' + ('--uni-safe-area-inset-bottom:' + d)}}\"/><view placeholder-class=\"placeholder\" style=\"{{'--status-bar-height:' + e + ';' + ('--uni-safe-area-inset-bottom:' + f)}}\"/>",
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\`, c: \`\${_ctx.u_s_b_h}px\`, d: \`\${_ctx.u_s_a_i_b}px\`, e: \`\${_ctx.u_s_b_h}px\`, f: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { filename: pageFilename, isX: true }
    )
    assert(
      '<picker-view indicator-class="indicator" mask-class="mask muted"/><view indicator-class="indicator" mask-class="mask"/>',
      '<picker-view indicator-class="indicator -a-indicator -p-indicator" mask-class="mask -a-mask -p-mask muted -a-muted -p-muted" style="{{\'--status-bar-height:\' + a + \';\' + (\'--uni-safe-area-inset-bottom:\' + b)}}"/><view indicator-class="indicator" mask-class="mask" style="{{\'--status-bar-height:\' + c + \';\' + (\'--uni-safe-area-inset-bottom:\' + d)}}"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\`, c: \`\${_ctx.u_s_b_h}px\`, d: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { filename: pageFilename, isX: true }
    )
  })

  test('动态原生 class 属性复用 helper 并使用当前作用域 mask', () => {
    assert(
      "<view :hover-class=\"enabled ? 'active' : 'none'\"/>",
      "<view hover-class=\"{{uV.h(a,3)}}\" style=\"{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}\"/>",
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _ctx.enabled ? 'active' : 'none', b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { filename: pageFilename, isX: true }
    )
    assert(
      '<textarea :placeholder-class="placeholderClass"/>',
      "<textarea placeholder-class=\"{{uV.c(a,4)}}\" style=\"{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}\"/>",
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _ctx.placeholderClass, b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { filename: componentFilename, isX: true }
    )
    assert(
      '<picker-view :indicator-class="indicatorClass" :mask-class="maskClass"/>',
      '<picker-view indicator-class="{{uV.c(a,4)}}" mask-class="{{uV.c(b,4)}}" style="{{\'--status-bar-height:\' + c + \';\' + (\'--uni-safe-area-inset-bottom:\' + d)}}"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _ctx.indicatorClass, b: _ctx.maskClass, c: \`\${_ctx.u_s_b_h}px\`, d: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { filename: componentFilename, isX: true }
    )
  })

  test('非支付宝隔离 2.0 不改写原生 class 属性', () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    assert(
      '<view :hover-class="hoverClass"/><input :placeholder-class="placeholderClass"/><picker-view :indicator-class="indicatorClass" :mask-class="maskClass"/>',
      "<view hover-class=\"{{a}}\" style=\"{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}\"/><input placeholder-class=\"{{d}}\" style=\"{{'--status-bar-height:' + e + ';' + ('--uni-safe-area-inset-bottom:' + f)}}\"/><picker-view indicator-class=\"{{g}}\" mask-class=\"{{h}}\" style=\"{{'--status-bar-height:' + i + ';' + ('--uni-safe-area-inset-bottom:' + j)}}\"/>",
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _ctx.hoverClass, b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\`, d: _ctx.placeholderClass, e: \`\${_ctx.u_s_b_h}px\`, f: \`\${_ctx.u_s_a_i_b}px\`, g: _ctx.indicatorClass, h: _ctx.maskClass, i: \`\${_ctx.u_s_b_h}px\`, j: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { filename: pageFilename, isX: true }
    )
  })

  test('支付宝非样式隔离 2.0 不改写 picker-view class 属性', () => {
    Reflect.set(process.env, 'UNI_APP_STYLE_ISOLATION_VERSION', '1')
    assert(
      '<picker-view :indicator-class="indicatorClass" :mask-class="maskClass"/>',
      '<picker-view indicator-class="{{a}}" mask-class="{{b}}" style="{{\'--status-bar-height:\' + c + \';\' + (\'--uni-safe-area-inset-bottom:\' + d)}}"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _ctx.indicatorClass, b: _ctx.maskClass, c: \`\${_ctx.u_s_b_h}px\`, d: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { filename: pageFilename, isX: true }
    )
  })
})
