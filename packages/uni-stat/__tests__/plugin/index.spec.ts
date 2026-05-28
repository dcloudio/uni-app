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
})
