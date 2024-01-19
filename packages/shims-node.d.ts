declare namespace NodeJS {
  interface Process {
    UNI_NVUE_ENTRY: Record<string, string>
  }

  interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test'
    UNI_NODE_ENV: 'production' | 'development' | 'test'
    UNI_PLATFORM: UniApp.PLATFORM
    UNI_APP_PLATFORM: 'android' | 'ios'
    UNI_SUB_PLATFORM: 'quickapp-webview-huawei' | 'quickapp-webview-union'
    UNI_UTS_PLATFORM: 'app-android' | 'app-ios' | 'web' | UniApp.PLATFORM

    UNI_UTS_JS_CODE_FORMAT?: 'cjs' | 'es'
    UNI_UTS_MODULE_TYPE?: 'built-in' | ''
    UNI_UTS_MODULE_PREFIX?: string
    UNI_UTS_TARGET_LANGUAGE?: 'javascript' | 'kotlin' | 'swift'

    UNI_INPUT_DIR: string
    UNI_OUTPUT_DIR: string
    UNI_CLI_CONTEXT: string
    UNI_SUBPACKAGE?: string
    UNI_MP_PLUGIN?: 'true'
    UNI_COMPILER_VERSION: string
    UNI_COMPILER_VERSION_TYPE: 'a' | 'r'
    UNI_HBUILDERX_PLUGINS: string
    UNI_RENDERER?: 'native'
    UNI_NVUE_COMPILER: 'uni-app' | 'weex' | 'vue' | 'vite'
    UNI_NVUE_STYLE_COMPILER: 'uni-app' | 'weex'
    UNI_APP_CODE_SPLITING?: 'true'
    UNI_AUTOMATOR_WS_ENDPOINT?: string
    UNI_H5_BASE?: string
    UNI_H5_BROWSER?: 'builtin'
    UNI_CUSTOM_SCRIPT?: string
    UNI_CUSTOM_DEFINE?: string
    UNI_CUSTOM_CONTEXT?: string
    UNI_MINIMIZE?: 'true'
    UNI_UVUE?: 'true'
    UNI_UVUE_TARGET_LANGUAGE?: 'kotlin' | 'swift' | 'javascript'
    UNI_COMPILER: 'vue' | 'nvue'
    UNI_RENDERER_NATIVE: 'appService' | 'pages'
    UNI_NVUE_APP_STYLES: string
    UNI_APP_CHANGED_FILES: string
    UNI_APP_CHANGED_PAGES: string
    VUE_APP_DARK_MODE: 'true' | 'false'
    HX_USE_BASE_TYPE?: 'standard' | 'custom'
    HX_DEPENDENCIES_DIR?: string

    __VUE_PROD_DEVTOOLS__?: 'true'
    __VUE_DEVTOOLS_HOST__: string
    __VUE_DEVTOOLS_PORT__: string

    UNI_APP_X?: 'true' | 'false'
    UNI_APP_X_CACHE_DIR?: string

    HX_Version: string

    UNI_APP_X_PAGE_COUNT: string
    UNI_APP_X_TSC?: string
    UNI_APP_X_SINGLE_THREAD?: string
    UNI_APP_X_SETUP?: string
  }
}

declare module 'estree-walker' {
  export function walk<T>(
    root: T,
    options: {
      enter?: (node: T, parent: T | undefined) => any
      leave?: (node: T, parent: T | undefined) => any
      exit?: (node: T) => any
    } & ThisType<{ skip: () => void }>
  )
}
