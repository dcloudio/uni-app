import safeAreaInsets from 'safe-area-insets'
import {
  type ComponentInternalInstance,
  type ComponentPublicInstance,
  markRaw,
  watchEffect,
} from 'vue'
import {
  dialogPageTriggerParentHide,
  getCurrentPage,
  initPageVm,
} from '@dcloudio/uni-core'
import {
  ON_REACH_BOTTOM_DISTANCE,
  invokeArrayFns,
  normalizeTitleColor,
  removeLeadingSlash,
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
import { isDialogPageInstance } from '../helpers/utils'
import type { UniSafeAreaInsets } from '@dcloudio/uni-app-x/types/native/UniSafeAreaInsets'
import type { UniPageBody } from '@dcloudio/uni-app-x/types/native/UniPage'

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
  const pageEle = document.querySelector(
    `uni-page[data-page="${page.vm?.route}"]`
  )
  if (!pageEle) {
    throw new Error('page not found')
  }
  return pageEle as HTMLElement
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
    const pageEle = getPageElement(this)
    const pageHead = pageEle.querySelector('uni-page-head')
    return this.pageBody.height + (pageHead ? pageHead.clientHeight : 0)
  }

  get pageBody(): UniPageBody {
    const pageEle = getPageElement(this)
    const pageBody = pageEle.querySelector('uni-page-wrapper') as HTMLElement
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
    const pageEle = getPageElement(this)
    const pageBody = pageEle.querySelector('uni-page-wrapper') as HTMLElement
    return getSafeAreaInsets(pageBody)
  }
  getPageStyle(): UTSJSONObject {
    const pageMeta = this.vm?.$basePage.meta
    return pageMeta
      ? new UTSJSONObject({
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
      : new UTSJSONObject({})
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
    const uniPageBody = document.querySelector('uni-page-body')
    return uniPageBody
      ? (uniPageBody.querySelector(`#${id}`) as unknown as UniElement)
      : null
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
    return document.querySelector('uni-page-body') as unknown as UniElement
  }
  getParentPage: () => UniPage | null = () => null
  getDialogPages(): UniPage[] {
    return []
  }
  getAndroidActivity() {
    return null
  }
  exitFullscreen() {}
  createElement() {
    return new UniElementImpl({
      id: '',
      name: '',
      attrs: new Map(),
      style: new Map(),
    })
  }
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
    const uniPageBody = document.querySelector(
      `uni-page[data-page="${this.vm?.route}"] uni-page-body`
    )
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
    return document.querySelector(
      `uni-page[data-page="${this.vm?.route}"] uni-page-body`
    ) as unknown as UniElement
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
  vm.$basePage = vm.$page as Page.PageInstance['$page']

  // 暂时只在page上加 $waitNativeRender 方法
  vm.$.$waitNativeRender = (callback: () => void) => {
    vm.$nextTick(() => {
      callback && callback()
    })
  }
  const pageInstance = vm.$pageLayoutInstance!
  if (!isDialogPageInstance(pageInstance)) {
    const uniPage = new UniNormalPageImpl({
      route: removeLeadingSlash(route?.path) || '',
      options: new UTSJSONObject(route?.query || {}),
      vm,
    })
    vm.$page = uniPage
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
    vm.$page = vm.$pageLayoutInstance?.$dialogPage!
    pageInstance.$dialogPage!.vm = vm
    pageInstance.$dialogPage!.$vm = vm
  }
}

export function useBackgroundColorContent(vm: ComponentPublicInstance | null) {
  vm &&
    watchEffect(() => {
      const uniPageBody = document.querySelector(
        `uni-page[data-page="${vm.route}"] uni-page-body`
      )
      if (uniPageBody && vm.$basePage.meta.backgroundColorContent) {
        // @ts-expect-error
        uniPageBody.style.backgroundColor =
          vm.$basePage.meta.backgroundColorContent
      }
    })
}

function handleEscKeyPress(event) {
  if (__NODE_JS__) {
    return
  }
  if (event.key === 'Escape') {
    const currentPage = getCurrentPage() as unknown as UniPage
    const dialogPages = currentPage.getDialogPages()
    const dialogPage = dialogPages[dialogPages.length - 1]
    // @ts-expect-error
    if (!dialogPage.$disableEscBack) {
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

export function triggerDialogPageOnHide(instance: ComponentInternalInstance) {
  const parentPage = (instance.proxy?.$page as UniPage).getParentPage()
  const parentPageInstance = parentPage?.vm.$pageLayoutInstance
  if (parentPageInstance) {
    const dialogPages = parentPageInstance.$dialogPages.value
    if (dialogPages.length > 1) {
      const preDialogPage = dialogPages[dialogPages.length - 2]
      if (preDialogPage.vm) {
        const { onHide } = preDialogPage.vm.$
        onHide && invokeArrayFns(onHide)
      }
    }
  }
  dialogPageTriggerParentHide(instance.proxy?.$page as UniDialogPage)
}
