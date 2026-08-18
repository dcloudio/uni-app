const closeNativeDialogPage = jest.fn()
const isSystemDialogPage = jest.fn(() => false)

jest.mock('@dcloudio/uni-core', () => ({
  dialogPageTriggerPrevDialogPageLifeCycle: jest.fn(),
  getSystemDialogPages: jest.fn(() => []),
  invokeHook: jest.fn(),
  isSystemDialogPage,
}))

jest.mock('../../../../src/x/api/route/closeNativeDialogPage', () => ({
  __esModule: true,
  default: closeNativeDialogPage,
}))

jest.mock('../../../../src/x/framework/app/tabBar', () => ({
  isTabPage: jest.fn(() => false),
}))

import { closeDialogPage } from '../../../../src/x/api/route/closeDialogPage'
import { setDevToolsPageChangedListener } from '../../../../src/x/framework/page/dialogPage'

describe('dialogPage DevTools 关闭通知', () => {
  const getCurrentPages = jest.fn()
  const testGlobal = globalThis as typeof globalThis & {
    __UNI_X_DEVTOOLS__?: boolean
    getCurrentPages?: typeof getCurrentPages
    UniDialogPageImpl?: new () => UniPage
  }
  const originalDevTools = testGlobal.__UNI_X_DEVTOOLS__
  const originalGetCurrentPages = testGlobal.getCurrentPages
  const originalDialogPageImpl = testGlobal.UniDialogPageImpl

  class TestDialogPage {
    $vm = {}
    getParentPage: () => UniPage | null = () => null
  }

  beforeAll(() => {
    testGlobal.__UNI_X_DEVTOOLS__ = true
    testGlobal.getCurrentPages = getCurrentPages
    testGlobal.UniDialogPageImpl =
      TestDialogPage as unknown as new () => UniPage
  })

  beforeEach(() => {
    getCurrentPages.mockReset()
    closeNativeDialogPage.mockReset()
    isSystemDialogPage.mockReturnValue(false)
    setDevToolsPageChangedListener()
  })

  afterAll(() => {
    testGlobal.__UNI_X_DEVTOOLS__ = originalDevTools
    testGlobal.getCurrentPages = originalGetCurrentPages
    testGlobal.UniDialogPageImpl = originalDialogPageImpl
  })

  function createPages(count: number) {
    const dialogPages: TestDialogPage[] = []
    const page = {
      vm: {},
      getDialogPages: () => dialogPages,
    } as unknown as UniPage
    for (let index = 0; index < count; index++) {
      const dialogPage = new TestDialogPage()
      dialogPage.getParentPage = () => page
      dialogPages.push(dialogPage)
    }
    getCurrentPages.mockReturnValue([page])
    return { page, dialogPages }
  }

  test('关闭顶层用户 dialogPage 时通知一次', () => {
    const listener = jest.fn()
    const success = jest.fn()
    const complete = jest.fn()
    const { dialogPages } = createPages(2)
    const topDialogPage = dialogPages[1]
    setDevToolsPageChangedListener(listener)

    closeDialogPage({
      dialogPage: topDialogPage as unknown as UniDialogPage,
      success,
      complete,
    })

    expect(dialogPages).toHaveLength(1)
    expect(listener).toHaveBeenCalledTimes(1)
    expect(success).toHaveBeenCalledTimes(1)
    expect(complete).toHaveBeenCalledTimes(1)
  })

  test('关闭非顶层用户 dialogPage 时不通知', () => {
    const listener = jest.fn()
    const { dialogPages } = createPages(2)
    const lowerDialogPage = dialogPages[0]
    const topDialogPage = dialogPages[1]
    setDevToolsPageChangedListener(listener)

    closeDialogPage({
      dialogPage: lowerDialogPage as unknown as UniDialogPage,
    })

    expect(dialogPages).toEqual([topDialogPage])
    expect(listener).not.toHaveBeenCalled()
  })

  test('关闭全部用户 dialogPage 时只通知一次', () => {
    const listener = jest.fn()
    const { dialogPages } = createPages(3)
    setDevToolsPageChangedListener(listener)

    closeDialogPage()

    expect(dialogPages).toHaveLength(0)
    expect(listener).toHaveBeenCalledTimes(1)
  })

  test('多层用户 dialogPage 逐层关闭时逐次通知', () => {
    const listener = jest.fn()
    const { dialogPages } = createPages(2)
    setDevToolsPageChangedListener(listener)

    closeDialogPage({
      dialogPage: dialogPages[1] as unknown as UniDialogPage,
    })
    closeDialogPage({
      dialogPage: dialogPages[0] as unknown as UniDialogPage,
    })

    expect(dialogPages).toHaveLength(0)
    expect(listener).toHaveBeenCalledTimes(2)
  })

  test('未观察 dialogPage 时不额外读取当前 Page', () => {
    createPages(1)

    closeDialogPage()

    expect(getCurrentPages).toHaveBeenCalledTimes(1)
  })
})
