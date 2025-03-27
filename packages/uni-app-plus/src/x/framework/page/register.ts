import { isPromise } from '@vue/shared'
import { type ComponentPublicInstance, ref } from 'vue'
import type { IPage } from '@dcloudio/uni-app-x/types/native'
import type { EventChannel, UniNode } from '@dcloudio/uni-shared'
import {
  ON_PAGE_SCROLL,
  ON_PULL_DOWN_REFRESH,
  ON_REACH_BOTTOM,
  ON_READY,
  ON_RESIZE,
  ON_UNLOAD,
  formatLog,
} from '@dcloudio/uni-shared'
import {
  SYSTEM_DIALOG_PAGE_PATH_STARTER,
  dialogPageTriggerParentShow,
  initPageInternalInstance,
  invokeHook,
  isSystemDialogPage,
  // initPageVm,
  // invokeHook,
} from '@dcloudio/uni-core'
import { genWebviewId } from '../../../service/framework/webview/utils'
import { initRouteOptions } from '../../../service/framework/page/routeOptions'
import { pagesMap } from '../../../service/framework/page/define'
import { getVueApp } from '../../../service/framework/app/vueApp'
import type { VuePageComponent } from '../../../service/framework/page/define'
import { getPageManager } from '../app/app'
import { ON_POP_GESTURE } from '../../constants'
import { getAppThemeFallbackOS, normalizePageStyles } from '../theme'
import { invokePageReadyHooks } from '../../api/route/performance'
import { homeDialogPages, homeSystemDialogPages } from './dialogPage'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'
import { closeDialogPage } from '../../api/route/closeDialogPage'

type PageNodeOptions = {}

export interface RegisterPageOptions {
  url: string
  path: string
  query: Record<string, string>
  openType: UniApp.OpenType
  webview?: IPage
  nvuePageVm?: ComponentPublicInstance
  eventChannel?: EventChannel
}

// parsePageStyle
export function parsePageStyle(
  route: UniApp.UniRoute
): Map<string, any | null> {
  const style = new Map<string, any | null>()
  const routeMeta = route.meta
  const routeKeys = [
    'id',
    'route',
    'i18n',
    'isQuit',
    'isEntry',
    'isTabBar',
    'tabBarIndex',
    'tabBarText',
    'windowTop',
    'topWindow',
    'leftWindow',
    'rightWindow',
    'eventChannel',
    // 忽略 initRouteMeta产生的 navigationBar 对象
    'navigationBar',
  ]
  const navKeys = [
    'navigationBarTitleText',
    'navigationBarBackgroundColor',
    'navigationBarTextStyle',
    'navigationStyle',
  ]

  // 替换 dark mode 中的变量
  normalizePageStyles(
    routeMeta,
    __uniConfig.themeConfig,
    getAppThemeFallbackOS()
  )

  Object.keys(routeMeta).forEach((key) => {
    // 使用黑名单机制兼容后续新增的属性
    if (!routeKeys.includes(key) && !navKeys.includes(key)) {
      style.set(key, (routeMeta as Record<string, any>)[key])
    }
  })

  const navigationBar: Record<string, unknown> = {}
  navKeys.forEach((key) => {
    if (key in routeMeta) {
      navigationBar[key] = (routeMeta as Record<string, any>)[key]
    }
  })

  if (Object.keys(navigationBar).length > 0) {
    if (
      navigationBar.navigationBarTextStyle !== 'custom' &&
      !routeMeta.isQuit &&
      routeMeta.route !== __uniConfig.realEntryPagePath
    ) {
      style.set('navigationBarAutoBackButton', true)
    }
    Object.keys(navigationBar).forEach((key) => {
      style.set(key, navigationBar[key])
    })
  }

  return style
}

export function registerPage(
  {
    url,
    path,
    query,
    openType,
    webview,
    nvuePageVm,
    eventChannel,
  }: RegisterPageOptions,
  onCreated?: (page: IPage) => void,
  delay = 0
) {
  const id = genWebviewId()
  const routeOptions = initRouteOptions(path, openType)
  const pageStyle = parsePageStyle(routeOptions)
  if (openType === 'reLaunch') {
    pageStyle.set('disableSwipeBack', true)
  }
  const nativePage = getPageManager().createPage(url, id.toString(), pageStyle)
  if (onCreated) {
    onCreated(nativePage)
  }
  routeOptions.meta.id = parseInt(nativePage.pageId)
  if (__DEV__) {
    console.log(formatLog('registerPage', path, nativePage.pageId))
  }
  // TODO initWebview
  // initWebview(webview, path, query, routeOptions.meta)
  const route = path.slice(1)
  // ;(webview as any).__uniapp_route = route
  const pageInstance = initPageInternalInstance(
    openType,
    url,
    query,
    routeOptions.meta,
    eventChannel,
    // TODO ThemeMode
    'light'
  )
  function fn() {
    const page = createVuePage(
      id,
      route,
      query,
      pageInstance,
      {},
      nativePage
    ) as ComponentPublicInstance

    // 由于 iOS 调用 show 时机差异，暂不使用页面 onShow 事件
    // nativePage.addPageEventListener(ON_SHOW, (_) => {
    //   invokeHook(page, ON_SHOW)
    // })
    const pages = getCurrentPages()
    if (pages.length === 1) {
      if (homeDialogPages.length) {
        const homePage = pages[0] as unknown as UniPage
        // harmony manage dialogPages in framework
        const dialogPages = homePage.getDialogPages()
        homePage.vm.$.$dialogPages.value = homeDialogPages.map((dialogPage) => {
          dialogPage.getParentPage = () => homePage
          dialogPages.push(dialogPage)
          return dialogPage
        })
        homeDialogPages.length = 0
      }
      if (homeSystemDialogPages.length) {
        const homePage = pages[0] as unknown as UniPage
        if (!homePage.vm.$systemDialogPages) {
          homePage.vm.$systemDialogPages = ref<UniDialogPage[]>([])
        }
        homePage.vm.$systemDialogPages.value = homeSystemDialogPages.map(
          (dialogPage) => {
            dialogPage.getParentPage = () => homePage
            return dialogPage
          }
        )
        homeDialogPages.length = 0
      }
    }
    nativePage.addPageEventListener(ON_POP_GESTURE, function (e) {
      uni.navigateBack({
        from: 'popGesture',
        fail(e) {
          if (e.errMsg.endsWith('cancel')) {
            nativePage.show()
          }
        },
      } as UniApp.NavigateBackOptions)
    })
    nativePage.addPageEventListener(ON_UNLOAD, (_) => {
      invokeHook(page, ON_UNLOAD)
    })
    nativePage.addPageEventListener(ON_READY, (_) => {
      invokePageReadyHooks(page)
      invokeHook(page, ON_READY)
    })

    nativePage.addPageEventListener(ON_PAGE_SCROLL, (arg) => {
      invokeHook(page, ON_PAGE_SCROLL, {
        scrollTop: (arg as unknown as OnPageScrollOptions).scrollTop,
      })
    })

    nativePage.addPageEventListener(ON_PULL_DOWN_REFRESH, (_) => {
      invokeHook(page, ON_PULL_DOWN_REFRESH)
    })

    nativePage.addPageEventListener(ON_REACH_BOTTOM, (_) => {
      invokeHook(page, ON_REACH_BOTTOM)
    })

    nativePage.addPageEventListener(ON_RESIZE, (arg: any) => {
      const args: OnResizeOptions = {
        deviceOrientation: arg.deviceOrientation,
        size: {
          windowWidth: arg.size.windowWidth,
          windowHeight: arg.size.windowHeight,
          screenWidth: arg.size.screenWidth,
          screenHeight: arg.size.screenHeight,
        },
      }
      invokeHook(page, ON_RESIZE, args)
    })
    nativePage.startRender()
  }
  if (delay) {
    setTimeout(fn, delay)
  } else {
    fn()
  }
  return nativePage
}

export function registerDialogPage(
  { url, path, query, openType, eventChannel }: RegisterPageOptions,
  dialogPage: UniDialogPage,
  onCreated?: (page: IPage) => void,
  delay = 0
) {
  const id = genWebviewId()
  const routeOptions = initRouteOptions(path, openType)
  const pageStyle = parsePageStyle(routeOptions)

  const routePageMeta = __uniRoutes.find((route) => route.path === path)?.meta
  if (!routePageMeta?.navigationStyle) {
    pageStyle.set('navigationStyle', 'custom')
  }
  if (!routePageMeta?.backgroundColorContent) {
    pageStyle.set('backgroundColorContent', 'transparent')
  }
  if (typeof pageStyle.get('disableSwipeBack') !== 'boolean') {
    pageStyle.set('disableSwipeBack', true)
  }
  const parentPage = dialogPage.getParentPage()
  const createDialogPage = (getPageManager() as any).createDialogPage
  // 鸿蒙的API与Android保持一致，参数均为6个
  const isHarmony = createDialogPage.length === 6
  const nativePage = isHarmony
    ? createDialogPage(
        url,
        id.toString(),
        pageStyle,
        (parentPage as any)?.getNativePage()
      )
    : createDialogPage(
        // @ts-expect-error
        parentPage ? parentPage.__nativePageId : '',
        id.toString(),
        url,
        pageStyle
      )
  if (onCreated) {
    onCreated(nativePage)
  }
  routeOptions.meta.id = parseInt(nativePage.pageId)
  if (__DEV__) {
    console.log(formatLog('registerPage', path, nativePage.pageId))
  }
  // TODO initWebview
  // initWebview(webview, path, query, routeOptions.meta)
  const route = path.startsWith(SYSTEM_DIALOG_PAGE_PATH_STARTER)
    ? path
    : path.slice(1)
  // ;(webview as any).__uniapp_route = route
  const pageInstance = initPageInternalInstance(
    openType,
    url,
    query,
    routeOptions.meta,
    eventChannel,
    // TODO ThemeMode
    'light'
  )
  function fn() {
    const page = createVuePage(
      id,
      route,
      query,
      pageInstance,
      {},
      nativePage
    ) as ComponentPublicInstance
    // 由于 iOS 调用 show 时机差异，暂不使用页面 onShow 事件
    // nativePage.addPageEventListener(ON_SHOW, (_) => {
    //   invokeHook(page, ON_SHOW)
    // })
    nativePage.addPageEventListener(ON_POP_GESTURE, function (e) {
      closeDialogPage({ dialogPage })
    })
    nativePage.addPageEventListener(ON_UNLOAD, (_) => {
      invokeHook(page, ON_UNLOAD)
      // 此时 systemDialog 已在数组中移除，故需要初始化 1
      dialogPageTriggerParentShow(
        dialogPage,
        isSystemDialogPage(dialogPage) ? 1 : 0
      )
    })
    nativePage.addPageEventListener(ON_READY, (_) => {
      invokePageReadyHooks(page)
      invokeHook(page, ON_READY)
    })

    nativePage.addPageEventListener(ON_PAGE_SCROLL, (arg) => {
      invokeHook(page, ON_PAGE_SCROLL, arg)
    })

    nativePage.addPageEventListener(ON_PULL_DOWN_REFRESH, (_) => {
      invokeHook(page, ON_PULL_DOWN_REFRESH)
    })

    nativePage.addPageEventListener(ON_REACH_BOTTOM, (_) => {
      invokeHook(page, ON_REACH_BOTTOM)
    })

    nativePage.addPageEventListener(ON_RESIZE, (arg: any) => {
      const args: OnResizeOptions = {
        deviceOrientation: arg.deviceOrientation,
        size: {
          windowWidth: arg.size.windowWidth,
          windowHeight: arg.size.windowHeight,
          screenWidth: arg.size.screenWidth,
          screenHeight: arg.size.screenHeight,
        },
      }
      invokeHook(page, ON_RESIZE, args)
    })
    nativePage.startRender()
  }
  if (delay) {
    setTimeout(fn, delay)
  } else {
    fn()
  }
  return nativePage
}

function createVuePage(
  __pageId: number,
  __pagePath: string,
  __pageQuery: Record<string, any>,
  __pageInstance: Page.PageInstance['$page'],
  pageOptions: PageNodeOptions,
  nativePage: IPage
) {
  const document = nativePage.document
  const body = document.body
  const app = getVueApp()
  const component = pagesMap.get(__pagePath)!()
  const mountPage = (component: VuePageComponent) =>
    // TODO x
    app.mountPage(
      component,
      {
        __pageId,
        __pagePath,
        __pageQuery,
        __pageInstance,
      },
      body as unknown as UniNode,
      document
    )
  if (isPromise(component)) {
    return component.then((component) => mountPage(component))
  }
  return mountPage(component)
}
