export * from '../../lib/uvue.runtime.esm'
import type { ComponentCustomOptions } from 'vue'
import { ref, shallowRef } from '../../lib/uvue.runtime.esm'
import { defineComponent as origDefineComponent } from '../../lib/uvue.runtime.esm'
// TODO 临时方案，后续升级到最新vue版本，则不需要这个方法
import { getCurrentInstance } from '../../lib/uvue.runtime.esm'
export const getCurrentGenericInstance = getCurrentInstance

export const defineComponent = (options: any) => {
  const rootElement: ComponentCustomOptions['rootElement'] | undefined =
    options.rootElement
  if (rootElement && typeof customElements !== 'undefined') {
    let shouldDefine = true
    if (__PLATFORM__ === 'app-ios') {
      // 这个判断主要是解决iOS平台使用 utssdk 定义 Element 时的兼容性问题
      // iOS 平台下通过 utssdk 定义的 Element 已经被框架UniExtElement注册过了，不需要重复注册
      // 且 utssdk 导出的这个 Element 类本身也不能被初始化为自定义元素，否则会报错
      shouldDefine = !String(rootElement.class).includes(
        'function ProxyObject()'
      )
    }
    if (shouldDefine) {
      customElements.define(
        rootElement.name,
        rootElement.class,
        rootElement.options
      )
    }
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
  onAppShow,
  onAppHide,
  onLaunch,
  onError,
  onThemeChange,
  // onKeyboardHeightChange,
  onPageNotFound,
  onUnhandledRejection,
  onLastPageBackPress,
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
