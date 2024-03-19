import { initPageVm, invokeHook } from '@dcloudio/uni-core'
import {
  EventChannel,
  formatLog,
  ON_READY,
  ON_UNLOAD,
} from '@dcloudio/uni-shared'
import {
  nextTick,
  ComponentPublicInstance,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
} from 'vue'
import type { VuePageComponent } from './define'
import { addCurrentPage } from './getCurrentPages'
import { getNativeApp } from '../../../x/framework/app/app'
import { loadFontFaceByStyles } from '../../../x/framework/utils' //'packages/uni-app-plus/src/x/framework/utils.ts'

export function setupPage(component: VuePageComponent) {
  const oldSetup = component.setup
  component.inheritAttrs = false // 禁止继承 __pageId 等属性，避免告警
  component.setup = (_, ctx) => {
    const {
      attrs: { __pageId, __pagePath, __pageQuery, __pageInstance },
    } = ctx
    if (__DEV__) {
      console.log(formatLog(__pagePath as string, 'setup'))
    }
    const instance = getCurrentInstance()!
    const pageVm = instance.proxy!
    // instance.root

    initPageVm(pageVm, __pageInstance as Page.PageInstance['$page'])
    addCurrentPage(
      initScope(
        __pageId as number,
        pageVm,
        __pageInstance as Page.PageInstance['$page']
      )
    )

    function handleChildComponentStyles(component: VuePageComponent) {
      if (component.components) {
        const componentsList = Object.keys(component.components)
        if (componentsList.length > 0) {
          // console.log('含有子组件')
          componentsList.forEach((name) => {
            const childComp = component.components![name] as any
            const style = childComp.styles
            loadFontFaceByStyles(style, false)
            if (childComp.components) {
              handleChildComponentStyles(childComp)
            }
          })
        }
      }
    }

    handleChildComponentStyles(component)

    if (!__X__) {
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
    if (oldSetup) {
      return oldSetup(__pageQuery as any, ctx)
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
    Object.defineProperty(vm, '$nativePage', {
      get() {
        return getNativeApp().pageManager.findPageById(pageId + '')
      },
    })

    Object.defineProperty(vm, '$viewToTempFilePath', {
      get() {
        return vm.$nativePage!.viewToTempFilePath
      },
    })

    Object.defineProperty(vm, '$loadFontFace', {
      get() {
        return vm.$nativePage!.loadFontFace
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
