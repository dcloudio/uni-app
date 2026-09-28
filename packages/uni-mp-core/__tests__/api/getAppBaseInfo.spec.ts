import { getAppBaseInfo } from '../../src/api/protocols/getAppBaseInfo'
import type { MPProtocolObject } from '../../src/api/protocols/types'

jest.mock('../../src/api/protocols/enhanceSystemInfo', () => ({
  getAppLanguage: (language: string) => language,
  getHostName: () => '',
}))

describe('getAppBaseInfo protocol', () => {
  const originalGlobal = (global as any).__GLOBAL__

  afterEach(() => {
    ;(global as any).__GLOBAL__ = originalGlobal
  })

  function normalize(miniProgramAppId: string) {
    ;(global as any).__GLOBAL__ = {
      getAccountInfoSync: () => ({
        miniProgram: { appId: miniProgramAppId },
      }),
    }
    const result: Record<string, unknown> = {}
    const protocol = getAppBaseInfo as MPProtocolObject
    ;(protocol.returnValue as Function)({ language: 'zh_CN' }, result)
    return result
  }

  test('平台小程序 AppID 有值时返回包名字段', () => {
    const result = normalize('mini-program-app-id')

    expect(result.packagename).toBe('mini-program-app-id')
    expect(result.packageName).toBe('mini-program-app-id')
  })

  test('平台小程序 AppID 为空时不返回包名字段', () => {
    const result = normalize('')

    expect(result).not.toHaveProperty('packagename')
    expect(result).not.toHaveProperty('packageName')
  })
})
