jest.mock('vue', () => ({
  getCurrentInstance: jest.fn(),
  callWithAsyncErrorHandling: jest.fn(
    (
      fn: (...args: unknown[]) => unknown,
      _instance: unknown,
      _type: unknown,
      args: unknown[]
    ) => fn(...args)
  ),
}))
import { RuntimeEventFlags } from '@dcloudio/uni-shared'
import { getCurrentInstance } from 'vue'
import { o } from '../src/helpers'
import { patchMPEvent, vOn } from '../src/helpers/vOn'

function mockCurrentInstance(platform = 'mp-weixin') {
  const scope: Record<string, any> = {}
  const instance = {
    $ei: 0,
    ctx: { $scope: scope, $mpPlatform: platform },
  }
  ;(getCurrentInstance as jest.Mock).mockReturnValue(instance)
  return { scope, instance }
}

function createMPEvent(type = 'click') {
  return {
    type,
    target: { dataset: {} },
    currentTarget: { dataset: {} },
    detail: {},
    touches: [],
  } as any
}

describe('uni-mp-vue: vOn', () => {
  const originalX = global.__X__

  afterEach(() => {
    global.__X__ = originalX
    jest.clearAllMocks()
  })

  it('preserves original target dataset in x event', () => {
    global.__X__ = true

    const event = {
      type: 'tap',
      target: {
        dataset: {
          foo: 'target',
        },
      },
      currentTarget: {
        dataset: {
          bar: 'current',
        },
      },
      detail: {
        dataset: {
          foo: 'detail',
        },
        x: 1,
        y: 2,
      },
      touches: [],
    }

    patchMPEvent(event as any)

    expect((event.target as any).dataset.get('foo')).toBe('target')
    expect((event.currentTarget as any).dataset.get('bar')).toBe('current')
  })

  describe('once modifier', () => {
    it('invokes the handler only once when Once flag is set', () => {
      const { scope } = mockCurrentInstance()
      const handler = jest.fn()
      const name = vOn(handler, undefined, RuntimeEventFlags.Once)
      const invoker = scope[name] as (...args: any[]) => unknown

      invoker(createMPEvent())
      invoker(createMPEvent())

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('invokes the handler every time without flags', () => {
      const { scope } = mockCurrentInstance()
      const handler = jest.fn()
      const name = vOn(handler, undefined)
      const invoker = scope[name] as (...args: any[]) => unknown

      invoker(createMPEvent())
      invoker(createMPEvent())

      expect(handler).toHaveBeenCalledTimes(2)
    })

    it('keeps once behavior after the invoker value is patched', () => {
      const { scope, instance } = mockCurrentInstance()
      const first = jest.fn()
      const second = jest.fn()
      const name = vOn(first, undefined, RuntimeEventFlags.Once)

      // 模拟组件重新渲染：$ei 重置后 vOn 命中 patch 分支
      instance.$ei = 0
      expect(vOn(second, undefined, RuntimeEventFlags.Once)).toBe(name)

      const invoker = scope[name] as (...args: any[]) => unknown
      invoker(createMPEvent())
      invoker(createMPEvent())

      expect(first).not.toHaveBeenCalled()
      expect(second).toHaveBeenCalledTimes(1)
    })

    it('passes flags through the o helper', () => {
      const { scope } = mockCurrentInstance()
      const handler = jest.fn()
      const name = o(handler, undefined, RuntimeEventFlags.Once)
      const invoker = scope[name] as (...args: any[]) => unknown

      invoker(createMPEvent())
      invoker(createMPEvent())

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })
})
