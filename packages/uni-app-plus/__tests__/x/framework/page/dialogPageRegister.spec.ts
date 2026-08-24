const startRender = jest.fn()
const addPageEventListener = jest.fn()
const isSystemDialogPage = jest.fn(() => false)
const getSystemDialogPages = jest.fn(() => [] as UniDialogPage[])
const mockInitRouteOptions = jest.fn(() => ({ meta: {} }))
const createNativePage = () => ({
  pageId: '2',
  document: { body: {} },
  addPageEventListener,
  startRender,
})
const createPage = jest.fn(createNativePage)
const createDialogPage = jest.fn(createNativePage)
const mountPage = jest.fn(() => ({}))

jest.mock('@dcloudio/uni-core', () => ({
  SYSTEM_DIALOG_PAGE_PATH_STARTER: '__uniappx_system_dialog__',
  dialogPageTriggerParentShow: jest.fn(),
  getSystemDialogPages,
  initPageInternalInstance: jest.fn(() => ({})),
  invokeHook: jest.fn(),
  isSystemDialogPage,
}))

jest.mock('../../../../src/service/framework/webview/utils', () => ({
  genWebviewId: jest.fn(() => 2),
}))

jest.mock('../../../../src/service/framework/page/routeOptions', () => ({
  initRouteOptions: mockInitRouteOptions,
}))

jest.mock('../../../../src/service/framework/page/define', () => ({
  pagesMap: new Map([
    ['pages/index/index', () => ({})],
    ['pages/dialog/dialog', () => ({})],
  ]),
}))

jest.mock('../../../../src/service/framework/app/vueApp', () => ({
  getVueApp: jest.fn(() => ({ mountPage })),
}))

jest.mock('../../../../src/x/framework/app/app', () => ({
  getPageManager: jest.fn(() => ({ createPage, createDialogPage })),
}))

jest.mock('../../../../src/x/framework/theme', () => ({
  getAppThemeFallbackOS: jest.fn(() => 'light'),
  normalizePageStyles: jest.fn(),
}))

jest.mock('../../../../src/x/api/route/performance', () => ({
  invokePageReadyHooks: jest.fn(),
}))

jest.mock('../../../../src/x/api/route/closeDialogPage', () => ({
  closeDialogPage: jest.fn(),
}))

jest.mock('../../../../src/x/api/route/appRoute', () => ({
  dispatchAppRoute: jest.fn(),
}))

import {
  registerDialogPage,
  registerPage,
} from '../../../../src/x/framework/page/register'
import {
  homeDialogPages,
  homeSystemDialogPages,
  setDevToolsPageChangedListener,
} from '../../../../src/x/framework/page/dialogPage'
import { ON_READY } from '@dcloudio/uni-shared'

describe('dialogPage DevTools 打开通知', () => {
  const getCurrentPages = jest.fn()
  const testGlobal = globalThis as typeof globalThis & {
    __DEV__?: boolean
    __UNI_X_DEVTOOLS__?: boolean
    __VAPOR__?: boolean
    __VAPOR_PLATFORM__?: string
    UniViewElementImpl?: new () => object
    __uniConfig?: UniApp.UniConfig
    __uniRoutes?: UniApp.UniRoute[]
    getCurrentPages?: typeof getCurrentPages
  }
  const originals = {
    dev: testGlobal.__DEV__,
    devTools: testGlobal.__UNI_X_DEVTOOLS__,
    vapor: testGlobal.__VAPOR__,
    platform: testGlobal.__VAPOR_PLATFORM__,
    uniViewElementImpl: testGlobal.UniViewElementImpl,
    config: testGlobal.__uniConfig,
    routes: testGlobal.__uniRoutes,
    getCurrentPages: testGlobal.getCurrentPages,
  }

  beforeAll(() => {
    testGlobal.__DEV__ = false
    testGlobal.__UNI_X_DEVTOOLS__ = true
    testGlobal.__VAPOR__ = true
    testGlobal.__VAPOR_PLATFORM__ = 'app-android'
    testGlobal.UniViewElementImpl = class UniViewElementImpl {}
    testGlobal.__uniConfig = {
      realEntryPagePath: 'pages/index/index',
      themeConfig: {},
    } as UniApp.UniConfig
    testGlobal.__uniRoutes = []
    testGlobal.getCurrentPages = getCurrentPages
  })

  beforeEach(() => {
    getCurrentPages.mockReset()
    startRender.mockReset()
    addPageEventListener.mockReset()
    createPage.mockClear()
    createDialogPage.mockClear()
    mountPage.mockClear()
    mockInitRouteOptions.mockReset()
    mockInitRouteOptions.mockReturnValue({ meta: {} })
    isSystemDialogPage.mockReturnValue(false)
    getSystemDialogPages.mockReset()
    getSystemDialogPages.mockReturnValue([])
    homeDialogPages.length = 0
    homeSystemDialogPages.length = 0
    setDevToolsPageChangedListener()
  })

  afterAll(() => {
    testGlobal.__DEV__ = originals.dev
    testGlobal.__UNI_X_DEVTOOLS__ = originals.devTools
    testGlobal.__VAPOR__ = originals.vapor
    testGlobal.__VAPOR_PLATFORM__ = originals.platform
    testGlobal.UniViewElementImpl = originals.uniViewElementImpl
    testGlobal.__uniConfig = originals.config
    testGlobal.__uniRoutes = originals.routes
    testGlobal.getCurrentPages = originals.getCurrentPages
  })

  function createDialogPages() {
    const dialogPages: UniDialogPage[] = []
    const page = {
      __nativePageId: 1,
      getDialogPages: () => dialogPages,
    } as unknown as UniPage
    const dialogPage = {
      $vm: {},
      getParentPage: () => page,
    } as unknown as UniDialogPage
    dialogPages.push(dialogPage)
    getCurrentPages.mockReturnValue([page])
    return { dialogPage, dialogPages }
  }

  test('顶层用户 dialogPage 开始渲染后通知', () => {
    const order: string[] = []
    const listener = jest.fn(() => order.push('notify'))
    const { dialogPage } = createDialogPages()
    startRender.mockImplementation(() => order.push('startRender'))
    setDevToolsPageChangedListener(listener)

    registerDialogPage(
      {
        url: '/pages/dialog/dialog',
        path: '/pages/dialog/dialog',
        query: {},
        openType: 'navigateTo',
      },
      dialogPage
    )

    expect(order).toEqual(['startRender', 'notify'])
    expect(listener).toHaveBeenCalledTimes(1)
  })

  test('系统 dialogPage 不通知', () => {
    const listener = jest.fn()
    const { dialogPage } = createDialogPages()
    isSystemDialogPage.mockReturnValue(true)
    setDevToolsPageChangedListener(listener)

    registerDialogPage(
      {
        url: '/pages/dialog/dialog',
        path: '/pages/dialog/dialog',
        query: {},
        openType: 'navigateTo',
      },
      dialogPage
    )

    expect(startRender).toHaveBeenCalledTimes(1)
    expect(listener).not.toHaveBeenCalled()
  })

  test('非顶层用户 dialogPage 不通知', () => {
    const listener = jest.fn()
    const { dialogPage, dialogPages } = createDialogPages()
    dialogPages.push({ $vm: {} } as unknown as UniDialogPage)
    setDevToolsPageChangedListener(listener)

    registerDialogPage(
      {
        url: '/pages/dialog/dialog',
        path: '/pages/dialog/dialog',
        query: {},
        openType: 'navigateTo',
      },
      dialogPage
    )

    expect(startRender).toHaveBeenCalledTimes(1)
    expect(listener).not.toHaveBeenCalled()
  })

  test('未观察 dialogPage 时不读取当前 Page', () => {
    const { dialogPage } = createDialogPages()

    registerDialogPage(
      {
        url: '/pages/dialog/dialog',
        path: '/pages/dialog/dialog',
        query: {},
        openType: 'navigateTo',
      },
      dialogPage
    )

    expect(startRender).toHaveBeenCalledTimes(1)
    expect(getCurrentPages).not.toHaveBeenCalled()
  })

  test('首页创建后分别迁移用户和系统 dialogPage', () => {
    const dialogPages: UniDialogPage[] = []
    const systemDialogPages: UniDialogPage[] = []
    const page = {
      getDialogPages: () => dialogPages,
    } as unknown as UniPage
    const userDialogPage = {
      getParentPage: () => null,
    } as unknown as UniDialogPage
    const systemDialogPage = {
      getParentPage: () => null,
    } as unknown as UniDialogPage
    homeDialogPages.push(userDialogPage)
    homeSystemDialogPages.push(systemDialogPage)
    getCurrentPages.mockReturnValue([page])
    getSystemDialogPages.mockReturnValue(systemDialogPages)

    registerPage({
      url: '/pages/index/index',
      path: '/pages/index/index',
      query: {},
      openType: 'launch',
    })

    expect(homeDialogPages).toHaveLength(0)
    expect(homeSystemDialogPages).toHaveLength(0)
    expect(dialogPages).toEqual([userDialogPage])
    expect(systemDialogPages).toEqual([systemDialogPage])
    expect(userDialogPage.getParentPage()).toBe(page)
    expect(systemDialogPage.getParentPage()).toBe(page)
  })

  test('normal page initializes vapor scroll styles on native ready', () => {
    const attributes = new Map<string, unknown>()
    const initialValues = new Map<string, unknown>()
    const attributeNames: Record<string, string> = {
      enableBackToTop: 'enable-back-to-top',
      bounces: 'bounces',
      androidOverscroll: 'android-overscroll',
      androidRefresherColor: 'android-refresher-color',
      backgroundColor: 'refresher-background',
    }
    const rootElement = {
      tagName: 'PAGE',
      addEventListener: jest.fn(() => 1),
      removeEventListener: jest.fn(),
    }
    mountPage.mockReturnValueOnce({
      $: {},
      _: {},
      $el: rootElement,
      $basePage: { meta: {} },
      $page: {
        __vaporPageStyleOverrides: new Map(),
        __setVaporPageStyleInitialValue: jest.fn(
          (name: string, value: unknown) => {
            initialValues.set(name, value)
          }
        ),
        __setVaporPageStyle: jest.fn((name: string, value: unknown) => {
          attributes.set(attributeNames[name], value)
        }),
      },
    })
    getCurrentPages.mockReturnValue([])
    mockInitRouteOptions.mockReturnValueOnce({
      meta: {
        enableBackToTop: true,
        bounces: true,
        androidOverscroll: true,
        androidRefresherColor: '#00ff00',
        backgroundColor: '#ff0000',
      },
    })

    registerPage({
      url: '/pages/index/index',
      path: '/pages/index/index',
      query: {},
      openType: 'launch',
    })

    expect(attributes.size).toBe(0)
    const readyListener = addPageEventListener.mock.calls.find(
      ([event]) => event === ON_READY
    )?.[1]
    expect(readyListener).toBeDefined()
    readyListener({})
    expect(Object.fromEntries(attributes)).toEqual({
      'enable-back-to-top': true,
      bounces: true,
      'android-overscroll': true,
      'android-refresher-color': '#00ff00',
      'refresher-background': '#ff0000',
    })
    expect(Object.fromEntries(initialValues)).toEqual({
      enableBackToTop: true,
      bounces: true,
      androidOverscroll: true,
      androidRefresherColor: '#00ff00',
      backgroundColor: '#ff0000',
    })
  })
})
