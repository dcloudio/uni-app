export * from '../../lib/uvue.vapor.runtime.esm'
import type { ComponentCustomOptions } from 'vue'
import { ref, shallowRef } from '../../lib/uvue.vapor.runtime.esm'
import { defineComponent as origDefineComponent } from '../../lib/uvue.vapor.runtime.esm'

export const defineComponent = (options: any) => {
  const rootElement: ComponentCustomOptions['rootElement'] | undefined =
    options.rootElement
  if (rootElement && typeof customElements !== 'undefined') {
    customElements.define(
      rootElement.name,
      rootElement.class,
      rootElement.options
    )
  }
  return origDefineComponent(options)
}

export const ssrRef = ref

export const shallowSsrRef = shallowRef

export {
  // ssr
  // ssrRef,
  // shallowSsrRef,
  // uni-app lifecycle
  // App and Page
  onShow,
  onHide,
  // App
  onLaunch,
  onError,
  onThemeChange,
  // onKeyboardHeightChange,
  onPageNotFound,
  onUnhandledRejection,
  // onLastPageBackPress,
  onExit,
  // Page
  onPageShow,
  onPageHide,
  onLoad,
  onReady,
  onUnload,
  onResize,
  onBackPress,
  onPageScroll,
  onTabItemTap,
  onReachBottom,
  onPullDownRefresh,

  // 其他
  onShareTimeline,
  onShareAppMessage,
  // onShareChat, // xhs-share

  // 辅助，用于自定义render函数时，开发者可以调用此方法渲染组件的slot
  renderComponentSlot,
} from '@dcloudio/uni-app'
