import type { Ref } from 'vue'

const mockUsePageMeta = jest.fn()
const mockSubscribe = jest.fn()
const mockMounted = jest.fn()
jest.mock('../src/framework/setup/provide', () => ({
  usePageMeta: () => mockUsePageMeta(),
}))
jest.mock('@dcloudio/uni-components', () => ({
  useSubscribe: (...args: unknown[]) => mockSubscribe(...args),
  withWebEvent: (handler: Function) => handler,
}))
jest.mock('vue', () => ({
  onMounted: (hook: Function) => mockMounted(hook),
  watch: jest.fn(),
  nextTick: jest.fn(),
}))
jest.mock('@dcloudio/uni-core', () => ({ invokeHook: jest.fn() }))
jest.mock('@dcloudio/uni-api', () => ({
  API_START_PULL_DOWN_REFRESH: 'startPullDownRefresh',
  API_STOP_PULL_DOWN_REFRESH: 'stopPullDownRefresh',
}))

import { usePageRefresh } from '../src/framework/components/page/page-refresh'

// 合并 PageBody 后显式传递当前页面配置，避免弹窗误用父页面注入的配置。
test.each([false, true])(
  '刷新订阅使用正确的页面 ID：显式传入=%s',
  (explicit) => {
    mockSubscribe.mockClear()
    mockUsePageMeta.mockClear()
    mockMounted.mockClear()
    const parentMeta = { id: 1, pullToRefresh: { range: 100, height: 50 } }
    const currentMeta = { id: 2, pullToRefresh: { range: 120, height: 60 } }
    mockUsePageMeta.mockReturnValue(parentMeta)
    const inner = { style: {} }
    const controller = { style: {}, querySelector: jest.fn(() => inner) }
    const querySelector = jest.fn((selector) =>
      selector === '.uni-page-refresh' ? controller : inner
    )
    const element = { querySelector }
    const refreshRef = { value: { $el: element } } as Ref
    const handlers = explicit
      ? usePageRefresh(refreshRef, currentMeta as UniApp.PageRouteMeta)
      : usePageRefresh(refreshRef)
    expect(mockUsePageMeta).toHaveBeenCalledTimes(explicit ? 0 : 1)
    expect(mockSubscribe.mock.calls.map((call) => [call[1], call[3]])).toEqual([
      ['startPullDownRefresh', explicit ? 2 : 1],
      ['stopPullDownRefresh', explicit ? 2 : 1],
    ])
    expect(mockMounted).toHaveBeenCalledTimes(1)
    mockMounted.mock.calls[0][0]()
    expect(querySelector).toHaveBeenCalledWith('.uni-page-refresh')
    expect(handlers.onTouchstartPassive).toEqual(expect.any(Function))
  }
)

test.each([false, true])('下拉刷新检查正确的滚动容器：蒸汽模式=%s', (vapor) => {
  const previous = {
    x: (global as any).__X__,
    vapor: (global as any).__VAPOR__,
    document: (global as any).document,
  }
  ;(global as any).__X__ = true
  ;(global as any).__VAPOR__ = vapor
  ;(global as any).document = {
    documentElement: { scrollTop: 0 },
    body: { scrollTop: 0 },
  }
  mockMounted.mockClear()
  try {
    const inner = { style: {} }
    const controller = { style: {}, querySelector: () => inner }
    const refreshRef = {
      value: {
        $el: {
          querySelector: () => controller,
          classList: { add: jest.fn() },
        },
      },
    } as unknown as Ref
    const handlers = usePageRefresh(refreshRef, {
      id: 2,
      enablePullDownRefresh: true,
      pullToRefresh: { range: 100, height: 50 },
    } as UniApp.PageRouteMeta)
    mockMounted.mock.calls[0][0]()
    handlers.onTouchstartPassive({
      changedTouches: [{ identifier: 1, pageY: 50 }],
    } as unknown as TouchEvent)
    const preventDefault = jest.fn()
    handlers.onTouchmove({
      changedTouches: [{ identifier: 1, pageY: 70 }],
      currentTarget: { scrollTop: 30 },
      cancelable: true,
      preventDefault,
    } as unknown as TouchEvent)
    expect(preventDefault).toHaveBeenCalledTimes(vapor ? 0 : 1)
  } finally {
    ;(global as any).__X__ = previous.x
    ;(global as any).__VAPOR__ = previous.vapor
    ;(global as any).document = previous.document
  }
})
