import {
  type ComponentInternalInstance,
  type ComponentPublicInstance,
  type ConcreteComponent,
  type VNode,
  computed,
  nextTick,
  watch,
} from 'vue'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import {
  type CreateScrollListenerOptions,
  createScrollListener,
  disableScrollListener,
  getCurrentPage,
  initPageInternalInstance,
  initPageVm,
  invokeHook,
} from '@dcloudio/uni-core'
import {
  ON_PAGE_SCROLL,
  ON_REACH_BOTTOM,
  ON_REACH_BOTTOM_DISTANCE,
  ON_UNLOAD,
  normalizeTitleColor,
} from '@dcloudio/uni-shared'
import { usePageMeta } from './provide'
import {
  type NavigateOptions,
  type NavigateType,
  handleBeforeEntryPageRoutes,
} from '../../service/api/route/utils'
import { updateCurPageCssVar } from '../../helpers/cssVar'
import { getStateId } from '../../helpers/dom'
import { getPageInstanceByVm } from './utils'

import type { UniBasePage } from '@dcloudio/uni-app-x/types/page'
import { setCurrentPageMeta } from '../../service/api/ui/setPageMeta'

const SEP = '$$'

const currentPagesMap = new Map<string, ComponentPublicInstance>()
export const homeDialogPages: UniDialogPage[] = []

export class UniBasePageImpl implements UniBasePage {
  route: string
  options: UTSJSONObject
  getParentPage: () => UniPage | null = () => null
  getDialogPages(): UniDialogPage[] {
    return []
  }
  constructor({ route, options }: { route: string; options: UTSJSONObject }) {
    this.route = route
    this.options = options
  }
}

export class UniPageImpl extends UniBasePageImpl implements UniPage {
  vm: ComponentPublicInstance
  $vm: ComponentPublicInstance
  getPageStyle(): UTSJSONObject {
    return new UTSJSONObject({})
  }
  setPageStyle(style: UTSJSONObject): void {}
  getElementById(id: string.IDString | string): UniElement | null {
    const currentPage = getCurrentPage() as unknown as UniPage
    if (currentPage !== this) {
      return null
    }
    const uniPageBody = document.querySelector('uni-page-body')
    return uniPageBody
      ? (uniPageBody.querySelector(`#${id}`) as unknown as UniElement)
      : null
  }
  getParentPage = (): UniPage | null => {
    return null
  }
  getDialogPages(): UniDialogPage[] {
    return getPageInstanceByVm(this.vm)?.$dialogPages.value || []
  }
  getAndroidView() {
    return null
  }
  getHTMLElement() {
    const currentPage = getCurrentPage() as unknown as UniPage
    if (currentPage !== this) {
      return null
    }
    return document.querySelector('uni-page-body') as unknown as UniElement
  }
  constructor({
    route,
    options,
    vm,
  }: {
    route: string
    options: UTSJSONObject
    vm: ComponentPublicInstance
  }) {
    super({ route, options })
    this.vm = vm
    this.$vm = vm
  }
}

export function getPage$BasePage(
  page: ComponentPublicInstance
): Page.PageInstance['$page'] {
  return __X__ ? page.$basePage : (page.$page as Page.PageInstance['$page'])
}

export class UniDialogPageImpl
  extends UniBasePageImpl
  implements UniDialogPage
{
  vm: ComponentPublicInstance | null = null
  $vm: ComponentPublicInstance | null = null
  $component: any | null = null
  $disableEscBack: boolean = false

  constructor({
    route,
    options,
    $component,
    getParentPage,
    $disableEscBack = false,
  }: {
    route: string
    options: UTSJSONObject
    $component: any
    getParentPage: () => UniPage | null
    $disableEscBack?: boolean
  }) {
    super({ route, options })
    this.$component = $component
    this.getParentPage = getParentPage
    this.$disableEscBack = $disableEscBack
  }
}

export const entryPageState = {
  handledBeforeEntryPageRoutes: false,
}
type NavigateToPage = {
  args: NavigateOptions
  resolve: (res: void | AsyncApiRes<UniNamespace.NavigateToOptions>) => void
  reject: (errMsg?: string, errRes?: any) => void
}
type SwitchTabPage = {
  args: NavigateOptions
  resolve: (res: void | AsyncApiRes<UniNamespace.SwitchTabOptions>) => void
  reject: (errMsg?: string, errRes?: any) => void
}
type RedirectToPage = {
  args: NavigateOptions
  resolve: (res: void | AsyncApiRes<UniNamespace.RedirectToOptions>) => void
  reject: (errMsg?: string, errRes?: any) => void
}
type ReLaunchPage = {
  args: NavigateOptions
  resolve: (res: void | AsyncApiRes<UniNamespace.ReLaunchOptions>) => void
  reject: (errMsg?: string, errRes?: any) => void
}
export const navigateToPagesBeforeEntryPages: NavigateToPage[] = []
export const switchTabPagesBeforeEntryPages: SwitchTabPage[] = []
export const redirectToPagesBeforeEntryPages: RedirectToPage[] = []
export const reLaunchPagesBeforeEntryPages: ReLaunchPage[] = []
let escBackPageNum = 0
function handleEscKeyPress(event) {
  if (event.key === 'Escape') {
    const currentPage = getCurrentPage()
    // @ts-expect-error
    const dialogPages = currentPage.getDialogPages()
    const dialogPage = dialogPages[dialogPages.length - 1]
    if (!dialogPage.$disableEscBack) {
      // @ts-expect-error
      uni.closeDialogPage({ dialogPage })
    }
  }
}
export function incrementEscBackPageNum() {
  escBackPageNum++
  if (escBackPageNum === 1) {
    document.addEventListener('keydown', handleEscKeyPress)
  }
}
export function decrementEscBackPageNum() {
  escBackPageNum--
  if (escBackPageNum === 0) {
    document.removeEventListener('keydown', handleEscKeyPress)
  }
}

function pruneCurrentPages() {
  currentPagesMap.forEach((page, id) => {
    if ((page as unknown as ComponentPublicInstance).$.isUnmounted) {
      currentPagesMap.delete(id)
    }
  })
}

export function getCurrentPagesMap() {
  return currentPagesMap
}

export function getCurrentPages() {
  const curPages = getCurrentBasePages()
  if (__X__) {
    return curPages.map((page) => page.$page)
  }
  return curPages
}

export function getCurrentBasePages() {
  const curPages: ComponentPublicInstance[] = []
  const pages = currentPagesMap.values()
  for (const page of pages) {
    if (page.$.__isTabBar) {
      if (page.$.__isActive) {
        curPages.push(page)
      }
    } else {
      curPages.push(page)
    }
  }
  return curPages
}

function removeRouteCache(routeKey: string) {
  const vnode = pageCacheMap.get(routeKey)
  if (vnode) {
    pageCacheMap.delete(routeKey)
    routeCache.pruneCacheEntry!(vnode)
  }
}

export function removePage(routeKey: string, removeRouteCaches = true) {
  const pageVm = currentPagesMap.get(routeKey) as ComponentPublicInstance
  if (__X__) {
    const dialogPages = (pageVm.$page as UniPage).getDialogPages()
    for (let i = dialogPages.length - 1; i >= 0; i--) {
      // @ts-expect-error
      uni.closeDialogPage({ dialogPage: dialogPages[i] })
    }
  }
  pageVm.$.__isUnload = true
  invokeHook(pageVm, ON_UNLOAD)
  currentPagesMap.delete(routeKey)
  removeRouteCaches && removeRouteCache(routeKey)
}

let id = /*#__PURE__*/ getStateId()

export function createPageState(type: NavigateType, __id__?: number) {
  return {
    __id__: __id__ || ++id,
    __type__: type,
  }
}

function initPublicPage(route: RouteLocationNormalizedLoaded) {
  const meta = usePageMeta()

  if (!__UNI_FEATURE_PAGES__) {
    return initPageInternalInstance('navigateTo', __uniRoutes[0].path, {}, meta)
  }
  let fullPath = route.fullPath
  if (route.meta.isEntry && fullPath.indexOf(route.meta.route) === -1) {
    fullPath = '/' + route.meta.route + fullPath.replace('/', '')
  }
  return initPageInternalInstance('navigateTo', fullPath, {}, meta)
}

type PageStyle = {
  navigationBarBackgroundColor?: string
  navigationBarTextStyle?: string
  navigationBarTitleText?: string
  titleImage?: string
  navigationStyle?: 'default' | 'custom'
  disableScroll?: boolean
  enablePullDownRefresh?: boolean
  onReachBottomDistance?: number
}

export function initPage(vm: ComponentPublicInstance) {
  const route = vm.$route
  const page = initPublicPage(route)
  initPageVm(vm, page)
  if (__X__) {
    vm.$basePage = vm.$page as Page.PageInstance['$page']
    const pageInstance = getPageInstanceByVm(vm)
    if (pageInstance?.attrs.type !== 'dialog') {
      const uniPage = new UniPageImpl({
        route: route?.path || '',
        options: new UTSJSONObject(route?.query || {}),
        vm,
      })
      vm.$page = uniPage

      const pageMeta = page.meta
      uniPage.setPageStyle = (style: PageStyle) => {
        // TODO uni-cli-shared内处理样式的逻辑移至uni-shared内并复用
        for (const key in style) {
          switch (key) {
            case 'navigationBarBackgroundColor':
              pageMeta.navigationBar.backgroundColor = style[key]
              break
            case 'navigationBarTextStyle':
              const textStyle = style[key]
              if (textStyle == null) {
                continue
              }
              // TODO titleColor属性类型定义问题
              pageMeta.navigationBar.titleColor = ['black', 'white'].includes(
                textStyle
              )
                ? normalizeTitleColor(textStyle || '')
                : (textStyle as any)
              break
            case 'navigationBarTitleText':
              pageMeta.navigationBar.titleText = style[key]
              break
            case 'titleImage':
              pageMeta.navigationBar.titleImage = style[key]
              break
            case 'navigationStyle':
              pageMeta.navigationBar.style = style[key]
              break
            default:
              pageMeta[key] = style[key]
              break
          }
        }
      }
      uniPage.getPageStyle = () =>
        new UTSJSONObject({
          navigationBarBackgroundColor: pageMeta.navigationBar.backgroundColor,
          navigationBarTextStyle: pageMeta.navigationBar.titleColor,
          navigationBarTitleText: pageMeta.navigationBar.titleText,
          titleImage: pageMeta.navigationBar.titleImage || '',
          navigationStyle: pageMeta.navigationBar.style || 'default',
          disableScroll: pageMeta.disableScroll || false,
          enablePullDownRefresh: pageMeta.enablePullDownRefresh || false,
          onReachBottomDistance:
            pageMeta.onReachBottomDistance || ON_REACH_BOTTOM_DISTANCE,
          backgroundColorContent: pageMeta.backgroundColorContent,
        })
      // @ts-expect-error
      vm.$dialogPage = getPageInstanceByVm(vm)?.$dialogPage
    } else {
      vm.$page = getPageInstanceByVm(vm)?.$dialogPage!
    }
  }

  if (__X__) {
    const pageInstance = getPageInstanceByVm(vm)
    if (pageInstance?.attrs.type !== 'dialog') {
      currentPagesMap.set(normalizeRouteKey(page.path, page.id), vm)
      if (currentPagesMap.size === 1) {
        // 通过异步保证首页生命周期触发
        setTimeout(() => {
          handleBeforeEntryPageRoutes()
        }, 0)
        if (homeDialogPages.length) {
          homeDialogPages.forEach((dialogPage) => {
            dialogPage.getParentPage = () => vm.$page as UniPage
            pageInstance!.$dialogPages.value.push(dialogPage)
          })
          homeDialogPages.length = 0
        }
      }
    } else {
      pageInstance.$dialogPage!.$vm = vm
    }
    return
  }
  currentPagesMap.set(normalizeRouteKey(page.path, page.id), vm)
  if (currentPagesMap.size === 1) {
    // 通过异步保证首页生命周期触发
    setTimeout(() => {
      handleBeforeEntryPageRoutes()
    }, 0)
  }
}

export function normalizeRouteKey(path: string, id: number) {
  return path + SEP + id
}

export function useKeepAliveRoute() {
  const route = useRoute()
  const routeKey = computed(() =>
    normalizeRouteKey('/' + route.meta.route, getStateId())
  )
  const isTabBar = computed(() => route.meta.isTabBar)
  return {
    routeKey,
    isTabBar,
    routeCache,
  }
}

// https://github.com/vuejs/rfcs/pull/284
// https://github.com/vuejs/vue-next/pull/3414

type CacheKey = string | number | ConcreteComponent
interface KeepAliveCache {
  get(key: CacheKey): VNode | void
  set(key: CacheKey, value: VNode): void
  delete(key: CacheKey): void
  forEach(
    fn: (value: VNode, key: CacheKey, map: Map<CacheKey, VNode>) => void,
    thisArg?: any
  ): void
  pruneCacheEntry?: (cached: VNode) => void
}
const pageCacheMap = new Map<CacheKey, VNode>()
const routeCache: KeepAliveCache = {
  get(key) {
    return pageCacheMap.get(key)
  },
  set(key, value) {
    pruneRouteCache(key as string)
    pageCacheMap.set(key, value)
  },
  delete(key) {
    const vnode = pageCacheMap.get(key)
    if (!vnode) {
      return
    }
    pageCacheMap.delete(key)
  },
  forEach(fn) {
    pageCacheMap.forEach(fn)
  },
}

function isTabBarVNode(vnode: VNode): boolean {
  return vnode.props!.type === 'tabBar'
}

function pruneRouteCache(key: string) {
  const pageId = parseInt(key.split(SEP)[1])
  if (!pageId) {
    return
  }
  routeCache.forEach((vnode, key) => {
    const cPageId = parseInt((key as string).split(SEP)[1])
    if (cPageId && cPageId > pageId) {
      if (__UNI_FEATURE_TABBAR__ && isTabBarVNode(vnode)) {
        // tabBar keep alive
        return
      }
      routeCache.delete(key)
      routeCache.pruneCacheEntry!(vnode)
      nextTick(() => pruneCurrentPages())
    }
  })
}

function updateCurPageAttrs(pageMeta: UniApp.PageRouteMeta) {
  if (__X__) {
    const uvueDirKey = 'uvue-dir-' + __uniConfig.uvue!['flex-direction']
    document.body.setAttribute('uvue', '')
    document.body.setAttribute(uvueDirKey, '')
  } else {
    const nvueDirKey = 'nvue-dir-' + __uniConfig.nvue!['flex-direction']
    if (pageMeta.isNVue) {
      document.body.setAttribute('nvue', '')
      document.body.setAttribute(nvueDirKey, '')
    } else {
      document.body.removeAttribute('nvue')
      document.body.removeAttribute(nvueDirKey)
    }
  }
}
// 触发页面page-meta.vue的设置
function updatePageMeta(pageMeta: UniApp.PageRouteMeta) {
  setCurrentPageMeta(null, {
    pageStyle: pageMeta.pageStyle,
    rootFontSize: pageMeta.rootFontSize,
  })
}
// 页面mounted和activeated时触发
export function onPageActivated(
  instance: ComponentInternalInstance,
  pageMeta: UniApp.PageRouteMeta
) {
  updatePageMeta(pageMeta)
}

export function onPageShow(
  instance: ComponentInternalInstance,
  pageMeta: UniApp.PageRouteMeta
) {
  updateBodyScopeId(instance)
  updateCurPageCssVar(pageMeta)
  updateCurPageAttrs(pageMeta)
  initPageScrollListener(instance, pageMeta)
  nextTick(() => {
    onPageActivated(instance, pageMeta)
  })
}

export function onPageReady(instance: ComponentInternalInstance) {
  const scopeId = getScopeId(instance)
  scopeId && updateCurPageBodyScopeId(scopeId)
}

function updateCurPageBodyScopeId(scopeId: string) {
  const pageBodyEl = document.querySelector('uni-page-body')
  if (pageBodyEl) {
    pageBodyEl.setAttribute(scopeId, '')
  } else if (__DEV__) {
    console.warn('uni-page-body not found')
  }
}

function getScopeId(instance: ComponentInternalInstance) {
  return (instance.type as any).__scopeId
}

let curScopeId: string
function updateBodyScopeId(instance: ComponentInternalInstance) {
  const scopeId = getScopeId(instance)
  const { body } = document
  curScopeId && body.removeAttribute(curScopeId!)
  scopeId && body.setAttribute(scopeId, '')
  curScopeId = scopeId!
}

let curScrollListener: (evt: Event) => any

export function initPageScrollListener(
  instance: ComponentInternalInstance,
  pageMeta: UniApp.PageRouteMeta
) {
  document.removeEventListener('touchmove', disableScrollListener)
  if (curScrollListener) {
    document.removeEventListener('scroll', curScrollListener)
  }
  if (pageMeta.disableScroll) {
    return document.addEventListener('touchmove', disableScrollListener)
  }

  const { onPageScroll, onReachBottom } = instance
  const navigationBarTransparent = pageMeta.navigationBar.type === 'transparent'
  if (
    !onPageScroll?.length &&
    !onReachBottom?.length &&
    !navigationBarTransparent
  ) {
    return
  }
  const opts: CreateScrollListenerOptions = {}
  const pageId = getPage$BasePage(instance.proxy!).id
  if (onPageScroll || navigationBarTransparent) {
    opts.onPageScroll = createOnPageScroll(
      pageId,
      onPageScroll,
      navigationBarTransparent
    )
  }
  if (onReachBottom?.length) {
    opts.onReachBottomDistance =
      pageMeta.onReachBottomDistance || ON_REACH_BOTTOM_DISTANCE
    opts.onReachBottom = () =>
      UniViewJSBridge.publishHandler(ON_REACH_BOTTOM, {}, pageId)
  }
  curScrollListener = createScrollListener(opts)
  // 避免监听太早，直接触发了 scroll
  requestAnimationFrame(() =>
    document.addEventListener('scroll', curScrollListener)
  )

  if (__X__) {
    watch(
      () => pageMeta.onReachBottomDistance,
      (onReachBottomDistance) => {
        if (!onReachBottom) {
          return
        }
        opts.onReachBottomDistance =
          onReachBottomDistance || ON_REACH_BOTTOM_DISTANCE
        document.removeEventListener('scroll', curScrollListener)
        curScrollListener = createScrollListener(opts)
        document.addEventListener('scroll', curScrollListener)
      }
    )
    watch(
      () => pageMeta.disableScroll,
      (disableScroll) => {
        document.removeEventListener('touchmove', disableScrollListener)
        if (disableScroll) {
          return document.addEventListener('touchmove', disableScrollListener)
        }
      }
    )
  }
}

function createOnPageScroll(
  pageId: number,
  onPageScroll: unknown,
  navigationBarTransparent: boolean
) {
  return (scrollTop: number) => {
    if (onPageScroll) {
      UniViewJSBridge.publishHandler(ON_PAGE_SCROLL, { scrollTop }, pageId)
    }
    if (navigationBarTransparent) {
      UniViewJSBridge.emit(pageId + '.' + ON_PAGE_SCROLL, {
        scrollTop,
      })
    }
  }
}
