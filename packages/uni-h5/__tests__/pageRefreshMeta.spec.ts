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
