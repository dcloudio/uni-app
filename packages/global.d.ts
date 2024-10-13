declare var __VUE__: any
declare var Vue: any
declare var weex: any

declare var tt: any
declare var qa: any
declare var swan: any
declare var qq: any
declare var ks: any
declare var jd: any
declare var xhs: any
declare var __NVUE__: undefined | boolean
declare var __PLATFORM__: UniApp.PLATFORM
declare var __PLATFORM_PREFIX__:
  | 'wx'
  | 'qq'
  | 'my'
  | 'swan'
  | 'tt'
  | 'qa'
  | 'ks'
  | 'jd'
  | 'xhs'
declare var __GLOBAL__: Record<string, any>

// importMeta(es|cjs)
declare var __IMPORT_META_ENV_BASE_URL__:
  | 'import.meta.env.BASE_URL'
  | '__IMPORT_META_ENV_BASE_URL__'

// Global compile-time constants
declare var __X__: boolean
declare var __DEV__: boolean
declare var __TEST__: boolean
declare var __NODE_JS__: boolean
declare var __APP_VIEW__: boolean
declare var __PLUS__: boolean

// Feature flags
declare var __VUE_OPTIONS_API__: boolean
declare var __VUE_PROD_DEVTOOLS__: boolean

declare var __UNI_FEATURE_WX__: boolean
declare var __UNI_FEATURE_WXS__: boolean
declare var __UNI_FEATURE_RPX__: boolean
declare var __UNI_FEATURE_NVUE__: boolean
declare var __UNI_FEATURE_PROMISE__: boolean
declare var __UNI_FEATURE_LONGPRESS__: boolean
declare var __UNI_FEATURE_ROUTER_MODE__: 'hash' | 'history'
declare var __UNI_FEATURE_UNI_CLOUD__: boolean

declare var __UNI_FEATURE_PAGES__: boolean
declare var __UNI_FEATURE_TABBAR__: boolean
declare var __UNI_FEATURE_TABBAR_MIDBUTTON__: boolean
declare var __UNI_FEATURE_TOPWINDOW__: boolean
declare var __UNI_FEATURE_LEFTWINDOW__: boolean
declare var __UNI_FEATURE_RIGHTWINDOW__: boolean
declare var __UNI_FEATURE_RESPONSIVE__: boolean
declare var __UNI_FEATURE_PULL_DOWN_REFRESH__: boolean
declare var __UNI_FEATURE_NAVIGATIONBAR__: boolean
declare var __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__: boolean
declare var __UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__: boolean
declare var __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__: boolean
declare var __UNI_FEATURE_I18N_LOCALE__: boolean
declare var __UNI_FEATURE_I18N_EN__: boolean
declare var __UNI_FEATURE_I18N_ES__: boolean
declare var __UNI_FEATURE_I18N_FR__: boolean
declare var __UNI_FEATURE_I18N_ZH_HANS__: boolean
declare var __UNI_FEATURE_I18N_ZH_HANT__: boolean
// TODO
declare var __uniRoutes: UniApp.UniRoutes
declare var __uniConfig: UniApp.UniConfig
declare var UniViewJSBridge: UniApp.UniViewJSBridge
declare var UniServiceJSBridge: UniApp.UniServiceJSBridge
// app view
declare var __id__: string
// TODO X 引入真实类型
declare class UTSJSONObject {
  constructor(obj: Record<string, any>)
}
// 解决 test-dts 使用了小程序的Require导致编译器require.resolve,require.cache报错
interface Require {
  resolve: NodeRequire['resolve']
  cache: NodeRequire['cache']
}

declare class UniPageImpl implements UniPage {
  vm: ComponentPublicInstance
  $vm: ComponentPublicInstance
  route: string
  options: UTSJSONObject
  getParentPage: () => UniPage | null
  getParentPageByJS: () => UniPage | null
  getDialogPages(): UniDialogPage[]
  getPageStyle(): UTSJSONObject
  $getPageStyle(): UTSJSONObject
  getPageStyleByJS(): UTSJSONObject
  setPageStyle(style: UTSJSONObject): void
  $setPageStyle(style: UTSJSONObject): void
  setPageStyleByJS(style: UTSJSONObject): void
  getElementById(id: string.IDString | string): UniElement | null
  getAndroidView(): null
  getHTMLElement(): null
}

declare class UniDialogPageImpl implements UniPage {
  vm: ComponentPublicInstance
  $vm: ComponentPublicInstance
  route: string
  options: UTSJSONObject
  getParentPage: () => UniPage | null
  getParentPageByJS: () => UniPage | null
  getDialogPages(): UniDialogPage[]
  getPageStyle(): UTSJSONObject
  $getPageStyle(): UTSJSONObject
  getPageStyleByJS(): UTSJSONObject
  setPageStyle(style: UTSJSONObject): void
  $setPageStyle(style: UTSJSONObject): void
  setPageStyleByJS(style: UTSJSONObject): void
  getElementById(id: string.IDString | string): UniElement | null
  getAndroidView(): null
  getHTMLElement(): null
  $component: any | null
  $disableEscBack: boolean
}
