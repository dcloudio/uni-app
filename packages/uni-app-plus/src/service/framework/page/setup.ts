import { initPageVm, invokeHook } from '@dcloudio/uni-core'
import {
  EventChannel,
  ON_READY,
  ON_UNLOAD,
  formatLog,
} from '@dcloudio/uni-shared'
import {
  type ComponentPublicInstance,
  getCurrentGenericInstance,
  nextTick,
  onBeforeUnmount,
  onMounted,
} from 'vue'
import type { VuePageComponent } from './define'
import { addCurrentPage } from './getCurrentPages'
import { setupXPage } from '../../../x/framework/page/setup'

export const beforeSetupPage: Required<VuePageComponent>['setup'] = (
  props,
  ctx
) => {
  const {
    attrs: { __pageId, __pagePath, /*__pageQuery,*/ __pageInstance },
  } = ctx
  if (__DEV__) {
    console.log(formatLog(__pagePath as string, 'setup'))
  }
  const instance = getCurrentGenericInstance()!
  const pageVm = instance.proxy!
  initPageVm(pageVm, __pageInstance as Page.PageInstance['$page'])
  if (__X__) {
    setupXPage(
      instance,
      __pageInstance as Page.PageInstance['$page'],
      pageVm,
      __pageId as number,
      __pagePath as string
    )
  } else {
    addCurrentPageWithInitScope(
      __pageId as number,
      pageVm,
      __pageInstance as Page.PageInstance['$page']
    )
    onMounted(() => {
      nextTick(() => {
        // onShow被延迟，故onReady也同时延迟
        invokeHook(pageVm, ON_READY)
      })
      // TODO preloadSubPackages
    })
    onBeforeUnmount(() => {
      invokeHook(pageVm, ON_UNLOAD)
    })
  }
}

export function setupPage(component: VuePageComponent) {
  if (!component.__vapor) {
    const oldSetup = component.setup
    component.inheritAttrs = false // 禁止继承 __pageId 等属性，避免告警
    component.setup = (props, ctx) => {
      beforeSetupPage(props, ctx)
      if (oldSetup) {
        return oldSetup(props, ctx)
      }
    }
  }
  return component
}

export function initScope(
  pageId: number,
  vm: ComponentPublicInstance,
  pageInstance: Page.PageInstance['$page']
) {
  if (!__X__) {
    const $getAppWebview = () => {
      return plus.webview.getWebviewById(pageId + '')
    }
    vm.$getAppWebview = $getAppWebview
    ;(vm.$ as any).ctx!.$scope = {
      $getAppWebview,
    }
  } else {
    Object.defineProperty(vm, '$viewToTempFilePath', {
      get() {
        return vm.$nativePage!.viewToTempFilePath.bind(vm.$nativePage!)
      },
    })
    Object.defineProperty(vm, '$getPageStyle', {
      get() {
        return vm.$nativePage!.getPageStyle.bind(vm.$nativePage!)
      },
    })
    Object.defineProperty(vm, '$setPageStyle', {
      get() {
        return vm.$nativePage!.setPageStyle.bind(vm.$nativePage!)
      },
    })
  }
  vm.getOpenerEventChannel = () => {
    if (!pageInstance.eventChannel) {
      pageInstance.eventChannel = new EventChannel(pageId)
    }
    return pageInstance.eventChannel as EventChannel
  }
  return vm
}

export function addCurrentPageWithInitScope(
  pageId: number,
  pageVm: ComponentPublicInstance,
  pageInstance: Page.PageInstance['$page']
) {
  addCurrentPage(initScope(pageId, pageVm, pageInstance))
}
