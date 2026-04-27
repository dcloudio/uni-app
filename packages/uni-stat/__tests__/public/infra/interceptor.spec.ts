import {
  type InterceptorHandlers,
  interceptor,
} from '../../../src/public/infra/interceptor'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

interface RecordedAdd {
  api: string
  handlers: InterceptorHandlers
}

interface UniInterceptorMock {
  addInterceptor: jest.Mock<void, [string, InterceptorHandlers]>
  removeInterceptor: jest.Mock<void, [string]>
  __adds: RecordedAdd[]
  __removes: string[]
  /** 直接触发某个 api 的 invoke / success / fail，模拟 uni 真实分发。 */
  __dispatch(
    api: string,
    hook: keyof InterceptorHandlers,
    payload: unknown
  ): unknown
}

function patchUniInterceptor(): UniInterceptorMock {
  const adds: RecordedAdd[] = []
  const removes: string[] = []
  const installed = new Map<string, InterceptorHandlers>()

  const addInterceptor = jest.fn(
    (api: string, handlers: InterceptorHandlers) => {
      adds.push({ api, handlers })
      installed.set(api, handlers)
    }
  )
  const removeInterceptor = jest.fn((api: string) => {
    removes.push(api)
    installed.delete(api)
  })

  installMockUni({ patch: { addInterceptor, removeInterceptor } })

  return {
    addInterceptor,
    removeInterceptor,
    __adds: adds,
    __removes: removes,
    __dispatch(api, hook, payload) {
      const h = installed.get(api)
      if (!h) throw new Error(`no installed interceptor for ${api}`)
      return h[hook]?.(payload as never)
    },
  }
}

describe('infra/interceptor', () => {
  let mock: UniInterceptorMock

  beforeEach(() => {
    interceptor.__reset()
    mock = patchUniInterceptor()
  })

  afterEach(() => {
    restoreMockUni()
    interceptor.__reset()
  })

  test('add 之后 uni.addInterceptor 被调用一次', () => {
    interceptor.add('login', { invoke() {} })
    expect(mock.__adds.length).toBe(1)
    expect(mock.__adds[0].api).toBe('login')
  })

  test('同 api 多次 add：每次重装都会 remove 一次再 add（防御不同 uni 实现的"重复 add"行为）', () => {
    interceptor.add('share', { invoke() {} })
    interceptor.add('share', { invoke() {} })
    // 每次 reinstall（含首次）都会先 try-remove 再 add；测试只关心最终一致性
    expect(mock.__adds.filter((a) => a.api === 'share').length).toBe(2)
    expect(
      mock.__removes.filter((a) => a === 'share').length
    ).toBeGreaterThanOrEqual(1)
  })

  test('多个 handlers 都会被触发（修复缺陷 #26：私有版后注册的会覆盖前者）', () => {
    const calls: string[] = []
    interceptor.add('login', {
      invoke() {
        calls.push('h1')
      },
    })
    interceptor.add('login', {
      invoke() {
        calls.push('h2')
      },
    })
    mock.__dispatch('login', 'invoke', { user: 'x' })
    expect(calls).toEqual(['h1', 'h2'])
  })

  test('任一 invoke 返回 false 视为整体阻断', () => {
    interceptor.add('login', {
      invoke() {
        /* allow */
      },
    })
    interceptor.add('login', {
      invoke() {
        return false
      },
    })
    const r = mock.__dispatch('login', 'invoke', {})
    expect(r).toBe(false)
  })

  test('解绑函数：移除后不再触发该 handlers', () => {
    const calls: string[] = []
    const off = interceptor.add('share', {
      success() {
        calls.push('a')
      },
    })
    interceptor.add('share', {
      success() {
        calls.push('b')
      },
    })
    off()
    mock.__dispatch('share', 'success', {})
    expect(calls).toEqual(['b'])
  })

  test('解绑最后一个 handler 时调用 uni.removeInterceptor', () => {
    const off = interceptor.add('share', { success() {} })
    off()
    expect(
      mock.__removes.filter((a) => a === 'share').length
    ).toBeGreaterThanOrEqual(1)
  })

  test('returnValue 沿调用链顺序变换', () => {
    interceptor.add('foo', {
      returnValue(v) {
        return (v as number) + 1
      },
    })
    interceptor.add('foo', {
      returnValue(v) {
        return (v as number) * 10
      },
    })
    const r = mock.__dispatch('foo', 'returnValue', 1)
    expect(r).toBe(20) // (1+1)*10
  })
})
