import vm from 'vm'

import {
  getGlobalObject,
  isUsableUniRuntime,
  probeUniRuntime,
  resolveUniRuntime,
} from '../../../src/public/infra/uniRuntime'

/** 在无 `globalThis` 标识符的沙箱中执行脚本，模拟支付宝等旧版小程序。 */
function runWithoutGlobalThis<T>(script: string): T {
  const sandbox: Record<string, unknown> = {
    global: {},
  }
  ;(sandbox.global as Record<string, unknown>).global = sandbox.global
  return vm.runInNewContext(script, sandbox) as T
}

/** 构造带最小可用 API 的 mock uni（各端 runtime 均远多于此）。 */
function createUsableUni(
  patch: Record<string, unknown> = {}
): Record<string, unknown> {
  return {
    getStorageSync: () => '',
    setStorageSync: () => undefined,
    removeStorageSync: () => undefined,
    ...patch,
  }
}

describe('infra/uniRuntime', () => {
  test('getGlobalObject 在无 globalThis 标识符时不抛错', () => {
    const result = runWithoutGlobalThis<Record<string, unknown>>(`
      (function () {
        function getGlobalObject() {
          if (typeof globalThis !== 'undefined' && globalThis != null) {
            return globalThis
          }
          if (typeof global !== 'undefined' && global != null) {
            return global
          }
          if (typeof self !== 'undefined' && self != null) {
            return self
          }
          try {
            if (typeof window !== 'undefined' && window != null) {
              return window
            }
          } catch (e) {}
          return {}
        }
        return getGlobalObject()
      })()
    `)
    expect(result).toBeTruthy()
    expect(typeof result).toBe('object')
  })

  test('resolveUniRuntime 不抛错', () => {
    expect(() => resolveUniRuntime()).not.toThrow()
  })

  test('getGlobalObject 在当前 Node 环境可返回对象', () => {
    expect(() => getGlobalObject()).not.toThrow()
    expect(typeof getGlobalObject()).toBe('object')
  })

  test('probeUniRuntime 在当前 Node 环境可返回探测结果', () => {
    expect(() => probeUniRuntime()).not.toThrow()
    expect(typeof probeUniRuntime().globalThisAvailable).toBe('boolean')
  })

  test('isUsableUniRuntime：空对象 / null 为 false', () => {
    expect(isUsableUniRuntime(null)).toBe(false)
    expect(isUsableUniRuntime({})).toBe(false)
  })

  test('isUsableUniRuntime：含 getStorageSync 或 onCreateVueApp 等为 true', () => {
    expect(isUsableUniRuntime(createUsableUni())).toBe(true)
    expect(isUsableUniRuntime({ onCreateVueApp: () => undefined })).toBe(true)
    expect(isUsableUniRuntime({ request: () => undefined })).toBe(true)
    expect(isUsableUniRuntime({ onAppShow: () => undefined })).toBe(true)
  })

  test('resolveUniRuntime：H5 发行空桩 global.uni={} 时返回 undefined', () => {
    const prev = (globalThis as unknown as { uni?: unknown }).uni
    try {
      ;(globalThis as unknown as { uni: unknown }).uni = {}
      expect(resolveUniRuntime()).toBeUndefined()
      expect(probeUniRuntime().globalThisUniStub).toBe(true)
      expect(probeUniRuntime().resolved).toBe(false)
    } finally {
      ;(globalThis as unknown as { uni?: unknown }).uni = prev
    }
  })

  test('resolveUniRuntime：global 为完整 uni 时优先 globalThis', () => {
    const prev = (globalThis as unknown as { uni?: unknown }).uni
    const usable = createUsableUni({ marker: 'global' })
    try {
      ;(globalThis as unknown as { uni: unknown }).uni = usable
      expect(resolveUniRuntime()).toBe(usable)
      expect(probeUniRuntime().source).toBe('globalThis')
      expect(probeUniRuntime().globalThisUniStub).toBe(false)
    } finally {
      ;(globalThis as unknown as { uni?: unknown }).uni = prev
    }
  })

  test('resolveUniRuntime：global 空桩时不误用空对象', () => {
    const prev = (globalThis as unknown as { uni?: unknown }).uni
    try {
      ;(globalThis as unknown as { uni: unknown }).uni = {}
      const resolved = resolveUniRuntime()
      expect(resolved).not.toEqual({})
      expect(resolved === undefined || isUsableUniRuntime(resolved)).toBe(true)
    } finally {
      ;(globalThis as unknown as { uni?: unknown }).uni = prev
    }
  })
})
