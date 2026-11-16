import {
  addMiniProgramPageJson,
  clearMiniProgramComponentStyleIsolation,
  resetMiniProgramJsonFiles,
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
    addMiniProgramPageJson('pages/index/index', {})
    updateMiniProgramComponentStyleIsolation(pageFilename, 'app', true)
    updateMiniProgramComponentStyleIsolation(componentFilename, 'isolated')
  })

  afterEach(() => {
    resetMiniProgramJsonFiles()
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
      '<page-meta page-style="{{a}}"/><view hover-class="active -a-active -p-active"/><view hover-class="none"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }) }
  return __returned__
}`,
      { filename: pageFilename, isX: true }
    )
    assert(
      '<input placeholder-class="placeholder muted"/><input placeholder-class=""/><view placeholder-class="placeholder"/>',
      '<page-meta page-style="{{a}}"/><input placeholder-class="placeholder -a-placeholder -p-placeholder muted -a-muted -p-muted"/><input placeholder-class=""/><view placeholder-class="placeholder"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }) }
  return __returned__
}`,
      { filename: pageFilename, isX: true }
    )
    assert(
      '<picker-view indicator-class="indicator" mask-class="mask muted"/><view indicator-class="indicator" mask-class="mask"/>',
      '<page-meta page-style="{{a}}"/><picker-view indicator-class="indicator -a-indicator -p-indicator" mask-class="mask -a-mask -p-mask muted -a-muted -p-muted"/><view indicator-class="indicator" mask-class="mask"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }) }
  return __returned__
}`,
      { filename: pageFilename, isX: true }
    )
  })

  test('动态原生 class 属性复用 helper 并使用当前作用域 mask', () => {
    assert(
      "<view :hover-class=\"enabled ? 'active' : 'none'\"/>",
      '<page-meta page-style="{{a}}"/><view hover-class="{{uV.h(b,3)}}"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }), b: _ctx.enabled ? 'active' : 'none' }
  return __returned__
}`,
      { filename: pageFilename, isX: true }
    )
    assert(
      '<textarea :placeholder-class="placeholderClass"/>',
      '<textarea placeholder-class="{{uV.c(a,4)}}"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _ctx.placeholderClass }
  return __returned__
}`,
      { filename: componentFilename, isX: true }
    )
    assert(
      '<picker-view :indicator-class="indicatorClass" :mask-class="maskClass"/>',
      '<picker-view indicator-class="{{uV.c(a,4)}}" mask-class="{{uV.c(b,4)}}"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _ctx.indicatorClass, b: _ctx.maskClass }
  return __returned__
}`,
      { filename: componentFilename, isX: true }
    )
  })

  test('非支付宝隔离 2.0 不改写原生 class 属性', () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    assert(
      '<view :hover-class="hoverClass"/><input :placeholder-class="placeholderClass"/><picker-view :indicator-class="indicatorClass" :mask-class="maskClass"/>',
      '<page-meta page-style="{{a}}"/><view hover-class="{{b}}"/><input placeholder-class="{{c}}"/><picker-view indicator-class="{{d}}" mask-class="{{e}}"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }), b: _ctx.hoverClass, c: _ctx.placeholderClass, d: _ctx.indicatorClass, e: _ctx.maskClass }
  return __returned__
}`,
      { filename: pageFilename, isX: true }
    )
  })

  test('支付宝非样式隔离 2.0 不改写 picker-view class 属性', () => {
    Reflect.set(process.env, 'UNI_APP_STYLE_ISOLATION_VERSION', '1')
    assert(
      '<picker-view :indicator-class="indicatorClass" :mask-class="maskClass"/>',
      '<page-meta page-style="{{a}}"/><picker-view indicator-class="{{b}}" mask-class="{{c}}"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` }), b: _ctx.indicatorClass, c: _ctx.maskClass }
  return __returned__
}`,
      { filename: pageFilename, isX: true }
    )
  })
})
