/// <reference path="../../uts/index.d.ts" />
/// <reference path="../vue.d.ts" />
declare global {
  interface Byte{}
  interface UByte{}
  interface Short{}
  interface UShort{}
  interface Int{}
  interface UInt{}
  interface Long{}
  interface ULong{}
  interface Float{}
  interface Double{}
}
declare global {
  const CSS_VAR_WINDOW_TOP: number
  const CSS_VAR_WINDOW_BOTTOM: number
  const CSS_VAR_STATUS_BAR_HEIGHT: number

  const __uniConfig: UniConfig
  const __uniRoutes: UniPageRoute[]

  type CreateVueComponent = any

  function numberEquals(a: any, b: any): boolean
  function utsMapOf<K = string,T = any>(obj?: Record<string,unknown> | any[]): any
  function padStyleMapOf(style: any): any
  function normalizeCssStyles(
    componentStyles: Map<string, Map<string, Map<string, any>>>[],
    appStyles?: Map<string, Map<string, Map<string, any>>>[]
  ): Map<string, Map<string, Map<string, any>>>

  // utsMapOf 简写
  function _uM<K = string, T = any>(obj?: Record<string,unknown> | any[]): any
  // padStyleMapOf 简写
  function _pS(style: any): any
  // normalizeCssStyles 简写
  function _nCS(
    componentStyles: Map<string, Map<string, Map<string, any>>>[],
    appStyles?: Map<string, Map<string, Map<string, any>>>[]
  ): Map<string, Map<string, Map<string, any>>>



  function isTrue(value: any): boolean
  function looseToNumber(value: any): number
  function resolveEasyComponent<T>(
    name: string,
    easyCom: T,
    maybeSelfReference?: boolean
  ): T
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

  class RenderHelpers {
    /**
     * v-for string
     * @private
     */
    static renderList(
      source: string | null,
      renderItem: (
        value: string,
        key: number,
        index: number | null,
        cached: any | null
      ) => any,
      cache?: Array<any | null> | null,
      index?: number | null
    ): any[]
    /**
     * v-for number
     */
    static renderList(
      source: number | null,
      renderItem: (
        value: number,
        key: number,
        index: number | null,
        cached: any | null
      ) => any,
      cache?: Array<any | null> | null,
      index?: number | null
    ): any[]
    /**
     * v-for array
     */
    static renderList<T>(
      source: Array<T> | null,
      renderItem: (
        value: T,
        key: number,
        index: number | null,
        cached: any | null
      ) => any,
      cache?: Array<any | null> | null,
      index?: number | null
    ): any[]
    /**
     * v-for Map
     */
    static renderList<K, V>(
      source: Map<K, V> | null,
      renderItem: (
        value: Array<any | null>,
        key: number,
        index: number | null,
        cached: any | null
      ) => any,
      cache?: Array<any | null> | null,
      index?: number | null
    ): any[]
    /**
     * v-for Set
     */
    static renderList<T>(
      source: Set<T> | null,
      renderItem: (
        value: T,
        key: number,
        index: number | null,
        cached: any | null
      ) => any,
      cache?: Array<any | null> | null,
      index?: number | null
    ): any[]
    /**
     * v-for object
     */
    static renderList<T>(
      source: T | null,
      renderItem: <K extends keyof T>(
        value: T[K],
        key: string,
        index: number | null,
        cached: any | null
      ) => any,
      cache?: Array<any | null> | null,
      index?: number | null
    ): any[]
  }

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

  const GenUniApp: any
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
    getTabBarConfig: () => Map<string, any> | null
    get ready(): boolean
    set ready(value: boolean)
  }

  function Suppress(...names: string[]): any

  interface UTSAndroid {
    consoleDebugError<T>(obj: T, info: string): T
    keyword(name: string): any
    Suppress(...names: string[]): any
  }

  interface IUTSSourceMap {
    __$getOriginalPosition(): UTSSourceMapPosition | null
  }

  class UTSSourceMapPosition<
    name = string,
    fileName = string,
    line = Int,
    column = Int
  > {
    constructor(name: name, fileName: fileName, line: Int, column: Int)
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
}

declare module 'vue' {
  interface ComponentInternalInstance {
    renderCache: (Function | VNode)[]
  }
}

export {}
