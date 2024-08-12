declare global {
  const CSS_VAR_WINDOW_TOP: number
  const CSS_VAR_WINDOW_BOTTOM: number
  const CSS_VAR_STATUS_BAR_HEIGHT: number

  const __uniConfig: UniConfig
  const __uniRoutes: UniPageRoute[]

  function utsMapOf(obj?: any): any
  function padStyleMapOf(style: any): any

  function isTrue(value: any): boolean
  function looseToNumber(value: any): number
  function resolveEasyComponent(
    name: string,
    easyCom: CreateVueComponent,
    maybeSelfReference?: boolean
  ): any
  function resolveCache(
    cache: Array<any | null>,
    index: number,
    run: () => VNode
  ): VNode
  function trySetRefValue<T>(target: T, value: any | null): T
  function tryUpdateRefNumber<T extends number>(
    target: T,
    step: number,
    isPrefix: boolean
  ): T
  function tryUpdateRefNumber<T extends number>(
    target: Ref<T>,
    step: number,
    isPrefix: boolean
  ): Ref<T>

  const withScopedSlotCtx: typeof withCtx
  const withSlotCtx: typeof withCtx

  type UniPageMeta = {
    isQuit: boolean
  }

  type UniPageRoute = {
    path: string
    component: any
    meta: UniPageMeta
    style: Map<string, any>
    needLogin?: boolean | null
  }
  type UniConfigOnReadyCallback = () => void

  type UniConfig = {
    realEntryPagePath: string
    entryPagePath: string
    globalStyle: Map<string, any>
    tabBar: Map<string, any> | null
    conditionUrl: string
    uniIdRouter: Map<string, any>
    themeConfig: Map<string, Map<string, any>>
    _ready: boolean
    callbacks: UniConfigOnReadyCallback[]
    onReady(callback: UniConfigOnReadyCallback): void
    get ready(): boolean
    set ready(value: boolean)
  }

  interface UTSAndroid {
    consoleDebugError<T>(obj: T, info: string): T
  }

  interface IUTSSourceMap {
    __$getOriginalPosition(): UTSSourceMapPosition | null
  }

  class UTSSourceMapPosition<
    name = string,
    fileName = string,
    line = number,
    column = number
  > {
    constructor(name: name, fileName: fileName, line: line, column: column)
  }

  namespace uts {
    namespace sdk {
      namespace modules {}
    }
  }

  namespace io {
    namespace dcloud {
      namespace uniapp {
        namespace appframe {
          class AppConfig {
            name: string
            appid: string
            versionName: string
            versionCode: string
            uniCompilerVersion: string
            singleThread: boolean
            flexDirection: string
            splashScreen: Map<string, any> | null
            isShowSplashAd: boolean
            darkmode: boolean
            defaultAppTheme: string
          }
        }
      }
    }
  }
  // Vue 相关
  type SetupContext = any
}

declare module 'vue' {
  interface ComponentInternalInstance {
    renderCache: (Function | VNode)[]
  }
}

export {}
