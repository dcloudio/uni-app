import { getAppChannel } from '../../../src/public/adapter/channel'
import { installMockPlus, restoreMockPlus } from '../helpers/mockPlus'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

type AnyObj = Record<string, unknown>

function clearGlobal(name: string): void {
  delete (globalThis as AnyObj)[name]
}

describe('adapter/channel', () => {
  afterEach(() => {
    restoreMockUni()
    restoreMockPlus()
    clearGlobal('plus')
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
})
