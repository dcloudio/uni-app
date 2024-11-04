import type { EventChannel, UniLifecycleHooks } from '@dcloudio/uni-shared'
import { ComponentCustomProperties, ComponentInternalInstance } from 'vue'
import type { IPage } from '@dcloudio/uni-app-x/types/native'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'

declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    rootElement?:
      | {
          name: string
          class: CustomElementConstructor
          options?: ElementDefinitionOptions
        }
      | 0
  }

  interface ComponentCustomProperties {
    route: string
    options?: Page.PageInstance['$page']['options']
    $scope: {
      $getAppWebview?: () => PlusWebviewWebviewObject
      setData(data: Record<string, unknown>, callback?: () => void): void
    }
    // 目前 H5,APP 平台 getCurrentPages 中获取的 page 对象调整为 vm 对象
    $getAppWebview?: () => PlusWebviewWebviewObject
    // X iOS start
    $nativePage?: IPage | null
    $fontFamilySet: Set<string>
    $viewToTempFilePath: (options: ViewToTempFilePathOptions) => void
    // X iOS end
    $requireNativePlugin?: (name: string) => unknown
    getOpenerEventChannel: () => EventChannel | undefined
    $page: Page.PageInstance['$page'] | UniPage | UniDialogPage
    // X web start
    $basePage: Page.PageInstance['$page']
    $dialogPage?: UniDialogPage
    $pageLayoutInstance: ComponentInternalInstance | null
    // X web end
    $mpType?: 'app' | 'page'
    $locale?: string
  }

  type LifecycleHook = Function[] | null

  type UniLifecycleHookInstance = {
    [name in (typeof UniLifecycleHooks)[number]]: LifecycleHook
  }
  interface ComponentInternalInstance extends UniLifecycleHookInstance {
    __isUnload: boolean
    __isVisible: boolean
    __isActive?: boolean // tabBar
    __isTabBar?: boolean
    // mp
    $updateScopedSlots: () => void
    $scopedSlotsData?: { path: string; index: number; data: Data }[]
    // h5 | app
    $wxsModules?: string[]
    // 暂定 h5
    $pageInstance: ComponentInternalInstance
    // x
    $waitNativeRender: (fn: () => void) => void
    $pageVm: ComponentPublicInstance | null
    $parentInstance?: ComponentInternalInstance
    $dialogPages?: Ref<UniDialogPage[]>
    $systemDialogPages?: Ref<UniDialogPage[]>
    $dialogPage?: UniDialogPage
    $uniElements: Map<string, UniElement>
    $uniElementIds: Map<string, { name: string }>
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
