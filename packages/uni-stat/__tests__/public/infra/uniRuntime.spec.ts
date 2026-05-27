import vm from 'vm'

import {
  getGlobalObject,
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
})
