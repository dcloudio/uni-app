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

/**
 * 更贴近 uni 运行时真实语义的拦截器桩：
 *   - 每个 api 维护**多个**拦截器（uni 原生 merge，而非覆盖）。
 *   - `removeInterceptor(api, h)` 按引用精准移除单个；`removeInterceptor(api)`（无第二参数）
 *     清空整个 api（即 uni 源码的 `delete scopedInterceptors[api]`）。
 *   - `dispatch` 顺序触发该 api 下所有拦截器，用于验证第三方拦截器是否被保留。
 *
 * 直接覆盖 beforeEach 已装好的 `global.uni.{add,remove}Interceptor`，不额外 install/restore，
 * 保持备份栈平衡（由外层 afterEach 统一 restore）。
 */
function patchRichUniInterceptor() {
  const scoped = new Map<string, InterceptorHandlers[]>()
  const addInterceptor = jest.fn((api: string, h: InterceptorHandlers) => {
    const list = scoped.get(api) ?? []
    if (!list.includes(h)) list.push(h)
    scoped.set(api, list)
  })
  const removeInterceptor = jest.fn((api: string, h?: InterceptorHandlers) => {
    if (h) {
      const list = scoped.get(api)
      if (!list) return
      const i = list.indexOf(h)
      if (i >= 0) list.splice(i, 1)
      if (list.length === 0) scoped.delete(api)
    } else {
      scoped.delete(api)
    }
  })
  const u = (globalThis as unknown as { uni: Record<string, unknown> }).uni
  u.addInterceptor = addInterceptor
  u.removeInterceptor = removeInterceptor
  return {
    scoped,
    addInterceptor,
    removeInterceptor,
    dispatch(api: string, hook: keyof InterceptorHandlers, payload: unknown) {
      const list = scoped.get(api) ?? []
      let last: unknown
      for (const h of list) last = h[hook]?.(payload as never)
      return last
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

  test('同 api 多次 add：重装时按引用精准移除上一次 fanout 再 add（不累积本模块 fanout）', () => {
    interceptor.add('share', { invoke() {} })
    interceptor.add('share', { invoke() {} })
    // 首次 add 无前序 fanout 不 remove；第二次起每次 reinstall 先 remove 上一次 fanout 再 add。
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

  describe('精准解绑：不误删第三方/宿主在同一 api 上的拦截器', () => {
    test('重装时只按引用移除本模块上一次 fanout，第三方拦截器保留且本模块 fanout 不累积', () => {
      const rich = patchRichUniInterceptor()
      const calls: string[] = []
      // 业务方/其它插件先在 share 上注册拦截器
      const biz: InterceptorHandlers = {
        success() {
          calls.push('biz')
        },
      }
      rich.addInterceptor('share', biz)

      interceptor.add('share', {
        success() {
          calls.push('stat1')
        },
      })
      // 触发第二次 reinstall：应精准移除上一次 fanout，而非清空 share
      interceptor.add('share', {
        success() {
          calls.push('stat2')
        },
      })

      const list = rich.scoped.get('share')
      expect(list).toBeDefined()
      // 第三方拦截器仍在
      expect(list).toContain(biz)
      // 本模块只留单个 fanout（不随多次 add 累积）：biz + 1 fanout = 2
      expect(list!.length).toBe(2)

      rich.dispatch('share', 'success', {})
      // 第三方先注册先触发，本模块 fanout 内部按注册顺序 fanout 出 stat1/stat2
      expect(calls).toEqual(['biz', 'stat1', 'stat2'])
    })

    test('解绑本模块全部 handler 后，第三方拦截器仍在（不走 blanket delete）', () => {
      const rich = patchRichUniInterceptor()
      const biz: InterceptorHandlers = { success() {} }
      rich.addInterceptor('login', biz)

      const off1 = interceptor.add('login', { success() {} })
      const off2 = interceptor.add('login', { success() {} })
      off1()
      off2() // size 归零 → removeInterceptor('login', prevFanout) 精准移除

      // 整个 api 未被清空，第三方拦截器原样保留
      expect(rich.scoped.has('login')).toBe(true)
      expect(rich.scoped.get('login')).toEqual([biz])
      // 解绑从未调用「不带第二参数」的 blanket remove
      expect(
        rich.removeInterceptor.mock.calls.every((c) => c[1] !== undefined)
      ).toBe(true)
    })

    test('uni 不可用时重装不抛错，保留 registry 待下次重试', () => {
      // 覆盖为无拦截器 API 的 uni
      const u = (globalThis as unknown as { uni: Record<string, unknown> }).uni
      u.addInterceptor = undefined
      u.removeInterceptor = undefined
      expect(() => interceptor.add('share', { success() {} })).not.toThrow()
    })
  })
})
