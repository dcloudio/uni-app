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

describe('mp-alipay: styleIsolation 2.0', () => {
  const filename = '/src/pages/index/index.vue'
  const originalPlatform = process.env.UNI_PLATFORM
  const originalAppX = process.env.UNI_APP_X
  const originalDom2 = process.env.UNI_APP_X_DOM2
  const originalVersion = process.env.UNI_APP_STYLE_ISOLATION_VERSION
  const originalInputDir = process.env.UNI_INPUT_DIR

  beforeEach(() => {
    process.env.UNI_PLATFORM = 'mp-alipay'
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_STYLE_ISOLATION_VERSION = '2'
    process.env.UNI_INPUT_DIR = '/src'
    updateMiniProgramComponentStyleIsolation(filename, 'app', true)
  })

  afterEach(() => {
    restoreEnv('UNI_PLATFORM', originalPlatform)
    restoreEnv('UNI_APP_X', originalAppX)
    restoreEnv('UNI_APP_X_DOM2', originalDom2)
    restoreEnv('UNI_APP_STYLE_ISOLATION_VERSION', originalVersion)
    restoreEnv('UNI_INPUT_DIR', originalInputDir)
    clearMiniProgramComponentStyleIsolation(filename)
  })

  test('展开页面静态 class', () => {
    assert(
      '<view class="foo bar"/>',
      "<view class=\"foo -a-foo -p-foo bar -a-bar -p-bar\" style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\"/>",
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { filename, isX: true }
    )
  })

  test('非 DOM2 不展开页面静态 class', () => {
    Reflect.set(process.env, 'UNI_APP_X_DOM2', 'false')
    assert(
      '<view class="foo"/>',
      "<view class=\"foo\" style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\"/>",
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { filename, isX: true }
    )
  })

  test('动态 class 通过现有 uniView SJS 展开', () => {
    assert(
      '<view :class="klass"/>',
      "<view class=\"{{uV.c(a,3)}}\" style=\"{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}\"/>",
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _n(_ctx.klass), b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { filename, isX: true }
    )
  })

  test('静态和动态 class 只在合并后展开一次', () => {
    assert(
      '<view class="foo" :class="klass"/>',
      "<view class=\"{{uV.c(('foo') + ' ' + a,3)}}\" style=\"{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}\"/>",
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _n(_ctx.klass), b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      { filename, isX: true }
    )
  })

  test('静态 class 禁止使用内部保留前缀', () => {
    expect(() =>
      assert('<view class="-c-foo"/>', '', '', {
        filename,
        isX: true,
      })
    ).toThrow('支付宝小程序样式隔离不允许 class 使用保留前缀：-c-foo')
  })
})
