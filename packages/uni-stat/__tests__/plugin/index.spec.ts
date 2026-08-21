import { parseManifestJsonOnce } from '@dcloudio/uni-cli-shared'

import {
  isUniAppXCompile,
  isUniAppXVaporCompile,
  shouldAutoImportStatRuntime,
  shouldBootstrapVaporRuntime,
  shouldRunStatRuntime,
} from '../../src/plugin/runtimeEnable'
import { resolvePublicStatImportPath } from '../../src/plugin/statRuntime'

jest.mock('@dcloudio/uni-cli-shared', () => {
  const actual = jest.requireActual('@dcloudio/uni-cli-shared')
  return {
    ...actual,
    parseManifestJsonOnce: jest.fn(),
  }
})

const mockedParseManifestJsonOnce = parseManifestJsonOnce as jest.Mock

describe('plugin/index', () => {
  const originalUniAppX = process.env.UNI_APP_X
  const originalUniAppXDom2 = process.env.UNI_APP_X_DOM2

  afterEach(() => {
    process.env.UNI_APP_X = originalUniAppX
    process.env.UNI_APP_X_DOM2 = originalUniAppXDom2
    mockedParseManifestJsonOnce.mockReset()
  })

  test('isUniAppXCompile 在 UNI_APP_X=true 时为 true', () => {
    process.env.UNI_APP_X = 'true'
    expect(isUniAppXCompile()).toBe(true)
  })

  test('isUniAppXCompile 在非 x 编译时为 false', () => {
    process.env.UNI_APP_X = 'false'
    expect(isUniAppXCompile()).toBe(false)
  })

  test.each([
    ['development', false, false],
    ['development', undefined, false],
    ['development', true, true],
    ['production', false, true],
    ['production', undefined, true],
    ['production', true, true],
  ])('运行模式闸门 NODE_ENV=%s debug=%s => %s', (nodeEnv, debug, expected) => {
    expect(shouldRunStatRuntime(debug, nodeEnv)).toBe(expected)
  })

  test('uni-app x App 不走普通统计运行时', () => {
    process.env.UNI_APP_X = 'true'
    mockedParseManifestJsonOnce.mockReturnValue({
      uniStatistics: { enable: true },
    })
    expect(shouldAutoImportStatRuntime('/project', 'app-android')).toBe(false)
  })

  test('uni-app x Web 走 route bridge', () => {
    process.env.UNI_APP_X = 'true'
    Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
    mockedParseManifestJsonOnce.mockReturnValue({
      uniStatistics: { enable: true },
    })
    expect(shouldAutoImportStatRuntime('/project', 'web')).toBe(false)
    expect(shouldBootstrapVaporRuntime('/project', 'web')).toBe(true)
  })

  test('uni-app x 微信小程序走 route bridge', () => {
    process.env.UNI_APP_X = 'true'
    Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
    mockedParseManifestJsonOnce.mockReturnValue({
      uniStatistics: { enable: true },
    })
    expect(shouldAutoImportStatRuntime('/project', 'mp-weixin')).toBe(false)
    expect(shouldBootstrapVaporRuntime('/project', 'mp-weixin')).toBe(true)
    expect(resolvePublicStatImportPath('mp-weixin')).toBe(
      '@dcloudio/uni-stat-public-mp-weixin'
    )
  })

  test('非微信公有版保持完整运行时', () => {
    expect(resolvePublicStatImportPath('h5')).toBe('@dcloudio/uni-stat-public')
    expect(resolvePublicStatImportPath('mp-qq')).toBe(
      '@dcloudio/uni-stat-public'
    )
  })

  test.each(['mp-alipay', 'mp-baidu', 'mp-toutiao', 'mp-qq'])(
    'uni-app x 暂不为 %s 注入 Vapor bridge',
    (platform) => {
      process.env.UNI_APP_X = 'true'
      Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
      mockedParseManifestJsonOnce.mockReturnValue({
        uniStatistics: { enable: true },
      })
      expect(isUniAppXVaporCompile(platform)).toBe(false)
      expect(shouldBootstrapVaporRuntime('/project', platform)).toBe(false)
    }
  )

  test.each(['app-android', 'app-ios', 'app-harmony'])(
    'uni-app x %s 蒸汽模式下开启生命周期桥接',
    (platform) => {
      process.env.UNI_APP_X = 'true'
      process.env.UNI_APP_X_DOM2 = 'true'
      mockedParseManifestJsonOnce.mockReturnValue({
        uniStatistics: { enable: true },
      })
      expect(isUniAppXVaporCompile(platform)).toBe(true)
      expect(shouldBootstrapVaporRuntime('/project', platform)).toBe(true)
    }
  )

  test.each(['app-android', 'app-ios', 'app-harmony'])(
    'uni-app x %s VDOM 不注入生命周期桥接',
    (platform) => {
      process.env.UNI_APP_X = 'true'
      Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
      mockedParseManifestJsonOnce.mockReturnValue({
        uniStatistics: { enable: true },
      })
      expect(isUniAppXVaporCompile(platform)).toBe(false)
      expect(shouldBootstrapVaporRuntime('/project', platform)).toBe(false)
    }
  )

  test('Web route bridge 在 enable=false 时不注入', () => {
    process.env.UNI_APP_X = 'true'
    Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
    mockedParseManifestJsonOnce.mockReturnValue({
      uniStatistics: { enable: false },
    })
    expect(shouldBootstrapVaporRuntime('/project', 'web')).toBe(false)
  })

  test('Web route bridge 不依赖 UNI_APP_X_DOM2', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    mockedParseManifestJsonOnce.mockReturnValue({
      uniStatistics: { enable: true },
    })
    expect(isUniAppXVaporCompile('web')).toBe(true)
    expect(shouldBootstrapVaporRuntime('/project', 'web')).toBe(true)
    expect(shouldAutoImportStatRuntime('/project', 'web')).toBe(false)
  })

  test('蒸汽模式 enable=false 时不注入生命周期桥接', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    mockedParseManifestJsonOnce.mockReturnValue({
      uniStatistics: { enable: false },
    })
    expect(shouldBootstrapVaporRuntime('/project', 'app-android')).toBe(false)
  })

  test('uni-app 无 uniStatistics 节点时默认自动 import', () => {
    process.env.UNI_APP_X = 'false'
    mockedParseManifestJsonOnce.mockReturnValue({})
    expect(shouldAutoImportStatRuntime('/project')).toBe(true)
  })

  test('uni-app 显式 enable=false 时不自动 import', () => {
    process.env.UNI_APP_X = 'false'
    mockedParseManifestJsonOnce.mockReturnValue({
      uniStatistics: { enable: false },
    })
    expect(shouldAutoImportStatRuntime('/project')).toBe(false)
  })

  test('根 enable=false、平台 enable=true：分平台覆盖后自动 import（mp-weixin）', () => {
    process.env.UNI_APP_X = 'false'
    mockedParseManifestJsonOnce.mockReturnValue({
      uniStatistics: { enable: false },
      'mp-weixin': { uniStatistics: { enable: true } },
    })
    expect(shouldAutoImportStatRuntime('/project', 'mp-weixin')).toBe(true)
  })

  test('根 enable=true、平台 enable=false：分平台覆盖后不自动 import（mp-weixin）', () => {
    process.env.UNI_APP_X = 'false'
    mockedParseManifestJsonOnce.mockReturnValue({
      uniStatistics: { enable: true },
      'mp-weixin': { uniStatistics: { enable: false } },
    })
    expect(shouldAutoImportStatRuntime('/project', 'mp-weixin')).toBe(false)
  })

  test('h5 平台节点取 web/h5：根 enable=true、web enable=false 时不自动 import', () => {
    process.env.UNI_APP_X = 'false'
    mockedParseManifestJsonOnce.mockReturnValue({
      uniStatistics: { enable: true },
      web: { uniStatistics: { enable: false } },
    })
    expect(shouldAutoImportStatRuntime('/project', 'h5')).toBe(false)
  })

  test('app 平台节点取 app-plus：根 enable=false、app-plus enable=true 时自动 import', () => {
    process.env.UNI_APP_X = 'false'
    mockedParseManifestJsonOnce.mockReturnValue({
      uniStatistics: { enable: false },
      'app-plus': { uniStatistics: { enable: true } },
    })
    expect(shouldAutoImportStatRuntime('/project', 'app')).toBe(true)
  })

  test('平台节点未配置 enable 时回退根节点', () => {
    process.env.UNI_APP_X = 'false'
    mockedParseManifestJsonOnce.mockReturnValue({
      uniStatistics: { enable: false },
      'mp-weixin': { uniStatistics: { debug: true } },
    })
    expect(shouldAutoImportStatRuntime('/project', 'mp-weixin')).toBe(false)
  })

  test('根无 uniStatistics、子 enable=true：以子为准自动 import', () => {
    process.env.UNI_APP_X = 'false'
    mockedParseManifestJsonOnce.mockReturnValue({
      'mp-weixin': { uniStatistics: { enable: true } },
    })
    expect(shouldAutoImportStatRuntime('/project', 'mp-weixin')).toBe(true)
  })

  test('根无 uniStatistics、子 enable=false：以子为准不自动 import', () => {
    process.env.UNI_APP_X = 'false'
    mockedParseManifestJsonOnce.mockReturnValue({
      'mp-weixin': { uniStatistics: { enable: false } },
    })
    expect(shouldAutoImportStatRuntime('/project', 'mp-weixin')).toBe(false)
  })

  test('根无 uniStatistics、子仅有 debug 等非 enable 字段：默认自动 import', () => {
    process.env.UNI_APP_X = 'false'
    mockedParseManifestJsonOnce.mockReturnValue({
      'mp-weixin': { uniStatistics: { debug: true } },
    })
    expect(shouldAutoImportStatRuntime('/project', 'mp-weixin')).toBe(true)
  })
})
