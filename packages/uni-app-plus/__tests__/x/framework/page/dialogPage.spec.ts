import {
  getCurrentDevToolsPage,
  homeDialogPages,
  notifyDevToolsPageChanged,
  setDevToolsPageChangedListener,
} from '../../../../src/x/framework/page/dialogPage'

describe('dialogPage DevTools 当前页面', () => {
  const getCurrentPages = jest.fn()
  const testGlobal = globalThis as typeof globalThis & {
    getCurrentPages?: typeof getCurrentPages
  }
  const originalGetCurrentPages = testGlobal.getCurrentPages

  beforeAll(() => {
    testGlobal.getCurrentPages = getCurrentPages
  })

  beforeEach(() => {
    getCurrentPages.mockReset()
    homeDialogPages.length = 0
    setDevToolsPageChangedListener()
  })

  afterAll(() => {
    testGlobal.getCurrentPages = originalGetCurrentPages
  })

  test('优先返回顶层已创建的用户 dialogPage', () => {
    const readyDialogPage = { $vm: {} }
    const pendingDialogPage = { $vm: null }
    const page = {
      getDialogPages: () => [readyDialogPage, pendingDialogPage],
    }
    getCurrentPages.mockReturnValue([page])

    expect(getCurrentDevToolsPage()).toBe(readyDialogPage)
  })

  test('没有已创建的用户 dialogPage 时返回普通 Page', () => {
    const page = {
      getDialogPages: () => [{ $vm: null }],
    }
    getCurrentPages.mockReturnValue([page])

    expect(getCurrentDevToolsPage()).toBe(page)
  })

  test('首页创建前可返回已创建的用户 dialogPage', () => {
    const dialogPage = { $vm: {} }
    homeDialogPages.push(dialogPage as never)
    getCurrentPages.mockReturnValue([])

    expect(getCurrentDevToolsPage()).toBe(dialogPage)
  })

  test('首页 dialogPage 迁移前仍优先返回 dialogPage', () => {
    const dialogPage = { $vm: {} }
    const page = { getDialogPages: () => [] }
    homeDialogPages.push(dialogPage as never)
    getCurrentPages.mockReturnValue([page])

    expect(getCurrentDevToolsPage()).toBe(dialogPage)
  })

  test('只通知当前设置的监听器', () => {
    const first = jest.fn()
    const second = jest.fn()

    setDevToolsPageChangedListener(first)
    setDevToolsPageChangedListener(second)
    notifyDevToolsPageChanged()

    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledTimes(1)

    setDevToolsPageChangedListener()
    notifyDevToolsPageChanged()
    expect(second).toHaveBeenCalledTimes(1)
  })

  test('监听器异常不影响 dialogPage 业务流程', () => {
    const error = new Error('devtools listener failed')
    const consoleError = jest.spyOn(console, 'error').mockImplementation()
    setDevToolsPageChangedListener(() => {
      throw error
    })

    expect(() => notifyDevToolsPageChanged()).not.toThrow()
    expect(consoleError).toHaveBeenCalledWith(error)

    consoleError.mockRestore()
  })
})
