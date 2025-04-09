import type { EventChannel, UniLifecycleHooks } from '@dcloudio/uni-shared'
import type {
  ComponentCustomProperties,
  ComponentInternalInstance,
  Ref,
} from 'vue'
import type {
  IPage,
  UniElement,
  ViewToTempFilePathOptions,
} from '@dcloudio/uni-app-x/types/native'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'

declare module '@vue/runtime-core' {
  // 小程序
  interface ComponentCustomProperties {
    $vm: ComponentPublicInstance
    globalData: Record<string, any>
    $callHook: (hook: string, args?: unknown, extras?: unknown) => unknown
    $callCreatedHook: () => void
  }
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
      is?: string
      route?: string
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
    $triggerParentHide?: boolean
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
    renderer?: 'page' | 'component' | null
    // mp
    $updateScopedSlots: () => void
    $scopedSlotsData?: {
      path: string
      index: number
      data: Record<string, unknown>
    }[]
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
    $templateUniElementRefs: {
      i: string // id
      r: VNodeRef
      k?: string // setup ref key
      f?: boolean // refInFor marker
      v: null | UniElement | Array<UniElement | null>
    }[]
    // 模板绑定的 style ，key 为 elementId，值为 style 字符串，最终会合并到 $eS 中
    $templateUniElementStyles: Record<string, string>
    // 元素 style ，key 为 elementId，值为 style 字符串
    $eS: Record<string, string>
  }

  export const onBeforeActivate: (fn: () => void) => void
  export const onBeforeDeactivate: (fn: () => void) => void
  export const injectHook: (
    type: string,
    hook: Function,
    target: ComponentInternalInstance | null,
    prepend?: boolean
  ) => Function | undefined
  export const isInSSRComponentSetup: boolean

  export const logError: (
    err: unknown,
    type: string,
    contextVNode: VNode | null,
    throwInDev?: boolean
  ) => void

  export function registerCustomElement(
    tagName: string,
    elementClass: unknown
  ): void
}
