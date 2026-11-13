import safeAreaInsets from 'safe-area-insets'
import { type ComponentPublicInstance, markRaw, watchEffect } from 'vue'
//#if _X_VAPOR_
import { onMounted } from 'vue'
import { getPageBody } from '../../../helpers/pageBody'
import { normalizePageSelector } from '../../../helpers/pageSelector'
//#endif
import {
  getCurrentPage,
  getLastDialogPage,
  initPageVm,
  invokeHook,
} from '@dcloudio/uni-core'
import {
  ON_BACK_PRESS,
  ON_REACH_BOTTOM_DISTANCE,
  UTSJSONObject,
  normalizeTitleColor,
  removeLeadingSlash,
  setUniElementPage,
} from '@dcloudio/uni-shared'
import { handleBeforeEntryPageRoutes } from '../../../service/api/route/utils'

import type {
  UniDialogPage,
  UniNormalPage,
  UniPage,
} from '@dcloudio/uni-app-x/types/page'
//#if !_NODE_JS_
import { closeDialogPage } from '../../service/api/route/closeDialogPage'
import {
  getPageWrapperInfo,
  getSafeAreaInsets,
} from '../../../helpers/safeArea'
//#endif
import {
  currentPagesMap,
  normalizeRouteKey,
} from '../../../framework/setup/page'
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import { isDialogPageInstance } from '@dcloudio/uni-core'
import type { UniSafeAreaInsets } from '@dcloudio/uni-app-x/types/native/UniSafeAreaInsets'
import { normalizeStyles } from '@dcloudio/uni-shared'

let escBackPageNum = 0
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

export const homeDialogPages: UniDialogPage[] = []
export const homeSystemDialogPages: UniDialogPage[] = []

function getPageElement(page: UniPage): HTMLElement {
  if (__NODE_JS__) {
    throw new Error('Not support get page element in non-browser environment')
  }
  const currentPage = getCurrentPage() as unknown as UniPage
  if (page !== currentPage) {
    const dialogPages = currentPage.getDialogPages()
    const dialogPage = dialogPages[dialogPages.length - 1]
    if (dialogPage !== page) {
      const systemDialogPages =
        currentPage.vm.$pageLayoutInstance!.$systemDialogPages.value
      const systemDialogPage = systemDialogPages[systemDialogPages.length - 1]
      if (systemDialogPage !== page) {
        throw new Error("Can't get element of other page")
      }
    }
  }
  //#if _X_VAPOR_
  const pageEle = page.vm && getPageBody(page.vm.$)
  //#else
  const pageEle = document.querySelector(
    `uni-page[data-page="${page.vm?.route}"]`
  )
  //#endif
  if (!pageEle) {
    throw new Error('page not found')
  }
  return pageEle as HTMLElement
}

function getPageBodyElement(page: UniPage): HTMLElement {
  const pageElement = getPageElement(page)
  //#if _X_VAPOR_
  return pageElement
  //#else
  return pageElement.querySelector('uni-page-wrapper') as HTMLElement
  //#endif
}

function getQueryPageBody(page: UniPage): HTMLElement | null {
  //#if _X_VAPOR_
  return (page.vm && getPageBody(page.vm.$)) || null
  //#else
  return document.querySelector<HTMLElement>('uni-page-body')
  //#endif
}

class UniPageImpl implements UniPage {
  route: string
  options: UTSJSONObject
  vm: ComponentPublicInstance | null
  $vm: ComponentPublicInstance | null

  get statusBarHeight(): number {
    return safeAreaInsets.top
  }

  get width(): number {
    return this.pageBody.width
  }

  get height(): number {
    //#if _X_VAPOR_
    const pageHead = (
      this.vm?.$pageLayoutInstance?.refs.pageHead as
        | ComponentPublicInstance
        | undefined
    )?.$el
    //#else
    const pageEle = getPageElement(this)
    const pageHead = pageEle.querySelector('uni-page-head')
    //#endif
    return this.pageBody.height + (pageHead ? pageHead.clientHeight : 0)
  }

  get pageBody() {
    const pageBody = getPageBodyElement(this)
    const pageWrapperInfo = getPageWrapperInfo(pageBody)
    return {
      top: pageWrapperInfo.top,
      left: pageWrapperInfo.left,
      right: pageWrapperInfo.left + pageWrapperInfo.width,
      bottom: pageWrapperInfo.top + pageWrapperInfo.height,
      width: pageWrapperInfo.width,
      height: pageWrapperInfo.height,
    }
  }
  get safeAreaInsets(): UniSafeAreaInsets {
    const pageBody = getPageBodyElement(this)
    return getSafeAreaInsets(pageBody)
  }
  getPageStyle(): UTSJSONObject {
    const pageMeta = this.vm?.$basePage.meta
      ? normalizeStyles(this.vm?.$basePage.meta, __uniConfig.themeConfig)
      : undefined

    const scriptLang = (this.vm?.$?.type as any)?.__scriptLang
    const pageStyle = pageMeta
      ? {
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
        }
      : {}
    if (!scriptLang || scriptLang === 'uts') {
      return new UTSJSONObject(pageStyle)
    }
    // 忽略类型，不同环境UTSJSONObject表示不同类型
    return pageStyle as unknown as UTSJSONObject
  }
  $getPageStyle(): UTSJSONObject {
    return this.getPageStyle()
  }
  setPageStyle(style: PageStyle): void {
    // TODO uni-cli-shared内处理样式的逻辑移至uni-shared内并复用
    const pageMeta = this.vm?.$basePage.meta
    if (!pageMeta) return

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
  $setPageStyle(style: PageStyle): void {
    this.setPageStyle(style)
  }
  getElementById(id: string.IDString | string): UniElement | null {
    if (__NODE_JS__) {
      return null
    }
    const currentPage = getCurrentPage() as unknown as UniPage
    if (currentPage !== this) {
      return null
    }
    const uniPageBody = getQueryPageBody(this)
    return uniPageBody
      ? (uniPageBody.querySelector(`#${id}`) as unknown as UniElement)
      : null
  }
  querySelector(selector: string): UniElement | null {
    if (__NODE_JS__) {
      return null
    }
    const currentPage = getCurrentPage() as unknown as UniPage
    //#if _X_VAPOR_
    if (
      currentPage !== this &&
      (!currentPage || currentPage !== this.getParentPage())
    ) {
      return null
    }
    //#else
    if (currentPage !== this) {
      return null
    }
    //#endif
    const uniPageBody = getQueryPageBody(this)
    //#if _X_VAPOR_
    const normalizedSelector = normalizePageSelector(selector)
    if (
      normalizedSelector !== selector &&
      uniPageBody?.matches(normalizedSelector)
    ) {
      return uniPageBody as unknown as UniElement
    }
    selector = normalizedSelector
    //#endif
    return uniPageBody
      ? (uniPageBody.querySelector(selector) as unknown as UniElement)
      : null
  }
  querySelectorAll(selector: string): UniElement[] {
    const res: UniElement[] = []
    if (__NODE_JS__) {
      return res
    }
    const currentPage = getCurrentPage() as unknown as UniPage
    //#if _X_VAPOR_
    if (
      currentPage !== this &&
      (!currentPage || currentPage !== this.getParentPage())
    ) {
      return res
    }
    //#else
    if (currentPage !== this) {
      return res
    }
    //#endif
    const uniPageBody = getQueryPageBody(this)
    if (!uniPageBody) {
      return res
    }
    //#if _X_VAPOR_
    const normalizedSelector = normalizePageSelector(selector)
    if (
      normalizedSelector !== selector &&
      uniPageBody.matches(normalizedSelector)
    ) {
      res.push(uniPageBody as unknown as UniElement)
    }
    selector = normalizedSelector
    //#endif
    const nodeList = uniPageBody.querySelectorAll(selector)
    nodeList.forEach((node) => {
      res.push(node as unknown as UniElement)
    })
    return res
  }
  getAndroidView() {
    return null
  }
  getIOSView() {
    return null
  }
  getHTMLElement() {
    if (__NODE_JS__) {
      return null
    }
    const currentPage = getCurrentPage() as unknown as UniPage
    if (currentPage !== this) {
      return null
    }
    return getQueryPageBody(this) as unknown as UniElement
  }
  getParentPage: () => UniPage | null = () => null
  getDialogPages(): UniPage[] {
    return []
  }
  $getSystemDialogPages(): UniDialogPage[] {
    return this.vm?.$pageLayoutInstance?.$systemDialogPages?.value || []
  }
  __$$getSystemDialogPages(): UniDialogPage[] {
    return []
  }
  getAndroidActivity() {
    return null
  }
  exitFullscreen() {}
  createElement() {
    return null as any
  }
  onLayoutChange() {
    return -1
  }
  offLayoutChange() {}
  onRenderChange() {
    return -1
  }
  offRenderChange() {}
  onTouchStart() {
    return -1
  }
  offTouchStart() {}
  onTouchEnd() {
    return -1
  }
  offTouchEnd() {}
  takeSnapshot() {}
  constructor({
    route,
    options,
    vm,
  }: {
    route: string
    options: UTSJSONObject
    vm: ComponentPublicInstance | null
  }) {
    this.route = vm?.route || route
    this.options = options
    this.vm = vm
    this.$vm = vm
  }
}

class UniNormalPageImpl extends UniPageImpl implements UniNormalPage {
  getDialogPages(): UniPage[] {
    return this.vm?.$pageLayoutInstance?.$dialogPages!.value || []
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
    super({ route, options, vm })
  }
}

export class UniDialogPageImpl extends UniPageImpl implements UniDialogPage {
  $component: any | null = null
  $disableEscBack: boolean = false
  $triggerParentHide: boolean = false
  getElementById(id: string.IDString | string): UniElement | null {
    if (__NODE_JS__) {
      return null
    }
    const currentPage = getCurrentPage() as unknown as UniPage
    if (currentPage !== this.getParentPage()) {
      return null
    }
    //#if _X_VAPOR_
    const uniPageBody = getQueryPageBody(this)
    //#else
    const uniPageBody = document.querySelector(
      `uni-page[data-page="${this.vm?.route}"] uni-page-body`
    )
    //#endif
    return uniPageBody
      ? (uniPageBody.querySelector(`#${id}`) as unknown as UniElement)
      : null
  }
  getHTMLElement() {
    if (__NODE_JS__) {
      return null
    }
    const currentPage = getCurrentPage() as unknown as UniPage
    if (currentPage !== this.getParentPage()) {
      return null
    }
    //#if _X_VAPOR_
    return getQueryPageBody(this) as unknown as UniElement
    //#else
    return document.querySelector(
      `uni-page[data-page="${this.vm?.route}"] uni-page-body`
    ) as unknown as UniElement
    //#endif
  }
  constructor({
    route,
    options,
    $component,
    $triggerParentHide,
    getParentPage,
    $disableEscBack = false,
  }: {
    route: string
    options: UTSJSONObject
    $component: any
    $triggerParentHide: boolean
    getParentPage: () => UniPage | null
    $disableEscBack?: boolean | null
  }) {
    super({ route, options, vm: null })
    this.$component = markRaw($component)
    this.getParentPage = getParentPage
    this.$disableEscBack = !!$disableEscBack
    this.$triggerParentHide = !!$triggerParentHide
  }
}

export function initXPage(
  vm: ComponentPublicInstance,
  route: RouteLocationNormalizedLoadedGeneric,
  page: Page.PageInstance['$page']
) {
  initPageVm(vm, page)
  // 获取 packages/uni-h5/src/framework/components/page/index.ts defineSystemComponent page currentInstance
  if (!('$pageLayoutInstance' in vm)) {
    Object.defineProperty(vm, '$pageLayoutInstance', {
      get() {
        // @ts-expect-error !('$pageLayoutInstance' in vm)导致vm推断为never，不可使用vm.hasOwnProperty
        let res = vm.$?.parent
        while (res && res.type?.name !== 'Page') {
          res = res.parent
        }
        return res
      },
    })
  }

  // 暂时只在page上加 $waitNativeRender 方法
  vm.$.$waitNativeRender = (callback: () => void) => {
    vm.$nextTick(() => {
      callback && callback()
    })
  }
  const pageInstance = vm.$pageLayoutInstance!
  if (!isDialogPageInstance(pageInstance)) {
    const scriptLang = (vm.$.type as any).__scriptLang
    const isUTS = !scriptLang || scriptLang === 'uts'
    const uniPage = new UniNormalPageImpl({
      route: route?.path ? removeLeadingSlash(route?.path) : '',
      // 忽略类型，不同环境UTSJSONObject表示不同类型
      options: isUTS
        ? new UTSJSONObject(route?.query || {})
        : ((route?.query || {}) as unknown as UTSJSONObject),
      vm,
    })
    vm.$.page = uniPage
    vm.$dialogPage = vm.$pageLayoutInstance?.$dialogPage

    currentPagesMap.set(normalizeRouteKey(page.path, page.id), vm)
    if (currentPagesMap.size === 1) {
      // 通过异步保证首页生命周期触发
      setTimeout(() => {
        handleBeforeEntryPageRoutes()
      }, 0)
      if (homeDialogPages.length) {
        homeDialogPages.forEach((dialogPage) => {
          dialogPage.getParentPage = () => vm.$page as UniPage
          pageInstance!.$dialogPages!.value.push(dialogPage)
        })
        homeDialogPages.length = 0
      }
      if (homeSystemDialogPages.length) {
        homeSystemDialogPages.forEach((dialogPage) => {
          dialogPage.getParentPage = () => vm.$page as UniPage
          pageInstance!.$systemDialogPages!.value.push(dialogPage)
        })
        homeSystemDialogPages.length = 0
      }
    }
  } else {
    vm.$.page = vm.$pageLayoutInstance?.$dialogPage!
    pageInstance.$dialogPage!.vm = vm
    pageInstance.$dialogPage!.$vm = vm
    // fix dialogPage $basePage.fullPath
    vm.$basePage.fullPath = vm.$basePage.path
  }
  //#if _X_VAPOR_
  if (!__NODE_JS__) {
    onMounted(() => {
      const pageElement = getPageBody(vm.$)
      pageElement && setUniElementPage(pageElement, vm.$.page)
    })
  }
  //#else
  const pageElement = pageInstance.proxy?.$el
  if (!__NODE_JS__ && pageElement instanceof Element) {
    setUniElementPage(pageElement, vm.$.page)
  }
  //#endif
}

export function useBackgroundColorContent(vm: ComponentPublicInstance | null) {
  vm &&
    watchEffect(() => {
      //#if _X_VAPOR_
      const uniPageBody = getPageBody(vm.$)
      //#else
      const uniPageBody = document.querySelector(
        `uni-page[data-page="${vm.route}"] uni-page-body`
      )
      //#endif
      if (uniPageBody && vm.$basePage.meta.backgroundColorContent) {
        ;(uniPageBody as HTMLElement).style.backgroundColor =
          vm.$basePage.meta.backgroundColorContent
      }
    })
}

function handleEscKeyPress(event: KeyboardEvent) {
  if (__NODE_JS__) {
    return
  }
  if (event.key !== 'Escape' && event.key !== 'Esc') {
    return
  }
  const currentPage = getCurrentPage() as unknown as UniPage | null
  const dialogPage = getLastDialogPage(currentPage)
  if (dialogPage && !dialogPage.$disableEscBack) {
    const onBackPressRes = invokeHook(dialogPage.vm, ON_BACK_PRESS, {
      from: 'navigateBack',
    })
    if (onBackPressRes !== true) {
      closeDialogPage({ dialogPage })
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
