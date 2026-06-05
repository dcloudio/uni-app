import { parseManifestJsonOnce } from '@dcloudio/uni-cli-shared'

import {
  isUniAppXCompile,
  shouldAutoImportStatRuntime,
} from '../../src/plugin/runtimeEnable'

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

  afterEach(() => {
    process.env.UNI_APP_X = originalUniAppX
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

  test('uni-app x 下无论 manifest 如何配置都不自动 import', () => {
    process.env.UNI_APP_X = 'true'
    mockedParseManifestJsonOnce.mockReturnValue({
      uniStatistics: { enable: true },
    })
    expect(shouldAutoImportStatRuntime('/project')).toBe(false)
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
