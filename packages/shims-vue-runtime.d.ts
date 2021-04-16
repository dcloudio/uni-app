import { UniLifecycleHooks } from '@dcloudio/uni-vue/src/apiLifecycle'
import { ComponentCustomProperties, ComponentInternalInstance } from 'vue'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $page: Page.PageInstance['$page']
  }

  type LifecycleHook = Function[] | null

  type UniLifecycleHookInstance = {
    [name in UniLifecycleHooks]: LifecycleHook
  }
  interface ComponentInternalInstance extends UniLifecycleHookInstance {
    __isUnload: boolean
    __isVisible: boolean
    __isActive?: boolean // tabBar
  }

  export const callSyncHook: (
    name: 'onLaunch' | 'onLoad' | 'onShow',
    type: UniLifecycleHooks,
    options: ComponentOptions,
    instance: ComponentInternalInstance,
    globalMixins: ComponentOptions[]
  ) => void
  export const onBeforeActivate: (fn: () => void) => void
  export const onBeforeDeactivate: (fn: () => void) => void
}
