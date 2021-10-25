import { EventChannel, UniLifecycleHooks } from '@dcloudio/uni-shared'
import { ComponentCustomProperties, ComponentInternalInstance } from 'vue'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    route: string
    $scope: {
      $getAppWebview?: () => PlusWebviewWebviewObject
    }
    // 目前 H5,APP 平台 getCurrentPages 中获取的 page 对象调整为 vm 对象
    $getAppWebview?: () => PlusWebviewWebviewObject
    getOpenerEventChannel: () => EventChannel
    $page: Page.PageInstance['$page']
    $mpType?: 'app' | 'page'
    $locale?: string
    __isTabBar: boolean
  }

  type LifecycleHook = Function[] | null

  type UniLifecycleHookInstance = {
    [name in typeof UniLifecycleHooks[number]]: LifecycleHook
  }
  interface ComponentInternalInstance extends UniLifecycleHookInstance {
    __isUnload: boolean
    __isVisible: boolean
    __isActive?: boolean // tabBar
    // h5 | app
    $wxsModules?: string[]
  }

  export const onBeforeActivate: (fn: () => void) => void
  export const onBeforeDeactivate: (fn: () => void) => void
  export const injectHook: (
    type: string,
    hook: Function,
    target: ComponentInternalInstance | null,
    prepend: boolean = false
  ) => Function | undefined
  export const isInSSRComponentSetup: boolean
}
