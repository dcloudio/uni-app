import postcss from 'postcss'

import {
  ALIPAY_CLASS_MASK_APP,
  ALIPAY_CLASS_MASK_COMPONENT,
  ALIPAY_CLASS_MASK_PAGE,
  clearMiniProgramComponentStyleIsolation,
  formatAlipayStyleIsolationClasses,
  getAlipayStyleIsolationClassMask,
  isAlipayXStyleIsolation,
  updateMiniProgramComponentStyleIsolation,
} from '../src/mp/externalClasses'
import externalPlugin from '../src/postcss/plugins/stylePluginExternal'

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[name]
  } else {
    process.env[name] = value
  }
}

describe('支付宝小程序样式隔离 2.0', () => {
  const originalPlatform = process.env.UNI_PLATFORM
  const originalAppX = process.env.UNI_APP_X
  const originalDom2 = process.env.UNI_APP_X_DOM2
  const originalVersion = process.env.UNI_APP_STYLE_ISOLATION_VERSION
  const originalInputDir = process.env.UNI_INPUT_DIR
  const originalPagePaths = process.env.UNI_COMPILE_EXT_API_PAGE_PATHS

  beforeEach(() => {
    process.env.UNI_PLATFORM = 'mp-alipay'
    process.env.UNI_APP_X = 'true'
    Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
    process.env.UNI_APP_STYLE_ISOLATION_VERSION = '2'
    process.env.UNI_INPUT_DIR = '/src'
    process.env.UNI_COMPILE_EXT_API_PAGE_PATHS = JSON.stringify([
      'pages/index/index',
    ])
  })

  afterEach(() => {
    restoreEnv('UNI_PLATFORM', originalPlatform)
    restoreEnv('UNI_APP_X', originalAppX)
    restoreEnv('UNI_APP_X_DOM2', originalDom2)
    restoreEnv('UNI_APP_STYLE_ISOLATION_VERSION', originalVersion)
    restoreEnv('UNI_INPUT_DIR', originalInputDir)
    restoreEnv('UNI_COMPILE_EXT_API_PAGE_PATHS', originalPagePaths)
    clearMiniProgramComponentStyleIsolation('/src/pages/index/index.vue')
    clearMiniProgramComponentStyleIsolation('/src/components/test.vue')
  })

  test('仅在支付宝 uni-app x 隔离 2.0 下启用', () => {
    expect(isAlipayXStyleIsolation()).toBe(true)
    Reflect.set(process.env, 'UNI_APP_STYLE_ISOLATION_VERSION', '1')
    expect(isAlipayXStyleIsolation()).toBe(false)
    process.env.UNI_APP_STYLE_ISOLATION_VERSION = '2'
    process.env.UNI_PLATFORM = 'mp-weixin'
    expect(isAlipayXStyleIsolation()).toBe(false)
  })

  test('按页面和组件 styleIsolation 生成 mask', () => {
    const page = '/src/pages/index/index.vue'
    const component = '/src/components/test.vue'

    updateMiniProgramComponentStyleIsolation(page, 'isolated', true)
    expect(getAlipayStyleIsolationClassMask(page)).toBe(ALIPAY_CLASS_MASK_PAGE)

    updateMiniProgramComponentStyleIsolation(component, 'app-and-page')
    expect(getAlipayStyleIsolationClassMask(component)).toBe(
      ALIPAY_CLASS_MASK_APP |
        ALIPAY_CLASS_MASK_PAGE |
        ALIPAY_CLASS_MASK_COMPONENT
    )
  })

  test('静态 class 在编译期展开并拒绝保留前缀', () => {
    expect(
      formatAlipayStyleIsolationClasses(
        'foo  bar',
        ALIPAY_CLASS_MASK_APP | ALIPAY_CLASS_MASK_PAGE
      )
    ).toBe('foo -a-foo -p-foo bar -a-bar -p-bar')
    expect(() =>
      formatAlipayStyleIsolationClasses('-a-foo', ALIPAY_CLASS_MASK_APP)
    ).toThrow('支付宝小程序样式隔离不允许 class 使用保留前缀：-a-foo')
  })

  test('CSS 仅改写单 class 选择器并保留复杂选择器', async () => {
    const processor = postcss([externalPlugin])
    const pageResult = await processor.process(
      '.foo, .parent .child, #id { color: red; }',
      { from: '/src/pages/index/index.vue', map: false }
    )
    expect(pageResult.css).toBe(
      'page .-p-foo, .parent .child, #id { color: red; }'
    )

    const componentResult = await processor.process('.foo { color: red; }', {
      from: '/src/components/test.vue',
      map: false,
    })
    expect(componentResult.css).toBe('.-c-foo { color: red; }')
  })

  test('CSS 跳过 keyframes 并校验保留前缀', async () => {
    const processor = postcss([externalPlugin])
    const result = await processor.process(
      '@keyframes fade { from { opacity: 0; } to { opacity: 1; } }',
      { from: '/src/components/test.vue', map: false }
    )
    expect(result.css).toContain('from { opacity: 0; }')

    await expect(
      processor.process('.-p-foo { color: red; }', {
        from: '/src/components/test.vue',
        map: false,
      })
    ).rejects.toThrow('支付宝小程序样式隔离不允许 class 使用保留前缀：-p-foo')
  })
})
