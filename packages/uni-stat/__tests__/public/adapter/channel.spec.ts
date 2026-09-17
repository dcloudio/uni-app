import { getAppChannel } from '../../../src/public/adapter/channel'
import { installMockPlus, restoreMockPlus } from '../helpers/mockPlus'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

type AnyObj = Record<string, unknown>

function clearGlobal(name: string): void {
  delete (globalThis as AnyObj)[name]
}

describe('adapter/channel', () => {
  let originalVapor: string | undefined

  beforeEach(() => {
    originalVapor = (process.env as Record<string, string | undefined>)
      .UNI_STAT_VAPOR
    delete (process.env as Record<string, string | undefined>).UNI_STAT_VAPOR
  })

  afterEach(() => {
    restoreMockUni()
    restoreMockPlus()
    clearGlobal('plus')
    if (originalVapor === undefined) {
      delete (process.env as Record<string, string | undefined>).UNI_STAT_VAPOR
    } else {
      ;(process.env as Record<string, string | undefined>).UNI_STAT_VAPOR =
        originalVapor
    }
  })

  test('非 App 端 → 恒为 空字符串', () => {
    installMockUni({ platform: 'mp-weixin' })
    expect(getAppChannel()).toBe('')
  })

  test('App 端：读取 plus.runtime.channel', () => {
    installMockUni({ platform: 'app' })
    installMockPlus({ runtime: { channel: 'huawei' } })
    expect(getAppChannel()).toBe('huawei')
  })

  test('平台变量缺失但存在 plus.runtime → 仍读取 plus.runtime.channel', () => {
    installMockUni()
    installMockPlus({ runtime: { channel: 'dlmm-Android-oppo' } })
    expect(getAppChannel()).toBe('dlmm-Android-oppo')
  })

  test('App 端：plus.runtime.channel 为数字 0 → "0"', () => {
    installMockUni({ platform: 'app' })
    installMockPlus({ runtime: { channel: 0 as unknown as string } })
    expect(getAppChannel()).toBe('0')
  })

  test('App 端：无 plus → 空字符串', () => {
    installMockUni({ platform: 'app-plus' })
    expect(getAppChannel()).toBe('')
  })

  test('App 端：读取抛错 → 空字符串', () => {
    installMockUni({ platform: 'app' })
    installMockPlus()
    const plus = (globalThis as unknown as { plus: Record<string, unknown> })
      .plus
    Object.defineProperty(plus, 'runtime', {
      get() {
        throw new Error('boom')
      },
      configurable: true,
    })
    expect(getAppChannel()).toBe('')
  })

  test('Vapor App：从 getAppBaseInfo.channel 获取，且不访问 plus', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STAT_VAPOR = 'true'
    installMockUni({
      platform: 'app',
      patch: { getAppBaseInfo: () => ({ channel: 'xiaomi' }) },
    })
    Object.defineProperty(globalThis, 'plus', {
      get() {
        throw new Error('Vapor must not access plus')
      },
      configurable: true,
    })

    expect(getAppChannel()).toBe('xiaomi')
  })
})
