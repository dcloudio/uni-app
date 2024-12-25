declare namespace NodeJS {
  interface Process {
    UNI_NVUE_ENTRY: Record<string, string>
  }

  interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test'
    UNI_NODE_ENV: 'production' | 'development' | 'test'
    UNI_SUB_PLATFORM: 'quickapp-webview-huawei' | 'quickapp-webview-union'
    UNI_UTS_PLATFORM: 'app-android' | 'app-ios' | 'web' | UniApp.PLATFORM

    UNI_UTS_JS_CODE_FORMAT?: 'cjs' | 'es'
    UNI_UTS_MODULE_TYPE?: 'built-in' | ''
    UNI_UTS_MODULE_PREFIX?: string
    UNI_UTS_TARGET_LANGUAGE?: 'javascript' | 'kotlin' | 'swift' | 'arkts'

    UNI_CLI_CONTEXT: string
    UNI_SUBPACKAGE?: string
    UNI_COMPILER_VERSION: string
    UNI_COMPILER_VERSION_TYPE: 'a' | 'r'
    UNI_HBUILDERX_PLUGINS: string
    UNI_RENDERER?: 'native'
    UNI_NVUE_COMPILER: 'uni-app' | 'weex' | 'vue' | 'vite'
    UNI_NVUE_STYLE_COMPILER: 'uni-app' | 'weex'
    UNI_APP_CODE_SPLITING?: 'true'

    UNI_CUSTOM_SCRIPT?: string
    UNI_CUSTOM_DEFINE?: string
    UNI_CUSTOM_CONTEXT?: string
    UNI_UVUE?: 'true'
    UNI_UVUE_TARGET_LANGUAGE?: 'kotlin' | 'swift' | 'javascript'
    UNI_COMPILER: 'vue' | 'nvue'
    UNI_RENDERER_NATIVE: 'appService' | 'pages'
    UNI_NVUE_APP_STYLES: string
    UNI_APP_CHANGED_FILES: string
    UNI_APP_CHANGED_PAGES: string
    VUE_APP_DARK_MODE: 'true' | 'false'

    __VUE_PROD_DEVTOOLS__?: 'true'
    __VUE_DEVTOOLS_HOST__: string
    __VUE_DEVTOOLS_PORT__: string

    UNI_APP_X?: 'true' | 'false'

    HX_Version: string

    UNI_APP_X_PAGE_COUNT: string
    UNI_APP_X_TSC?: string
    UNI_APP_X_TSC_DIR: string
    UNI_APP_X_TSC_CACHE_DIR: string
    UNI_APP_X_UVUE_DIR: string
    UNI_APP_X_SINGLE_THREAD?: string
    UNI_APP_X_SETUP?: string
    UNI_APP_X_UVUE_SCRIPT_ENGINE?: 'native' | 'js'

    UNI_COMPILE_TARGET?: 'uni_modules' | 'ext-api'
    UNI_COMPILE_CLOUD_DIR?: string
    UNI_MODULES_ENCRYPT_CACHE_DIR?: string

    UNI_APP_HARMONY_PROJECT_PATH?: string

    UNI_COMPILE_EXT_API_INPUT?: string
    UNI_APP_NEXT_WORKSPACE?: string

    // 内部使用，运行时日志通道是否保留原始日志输出
    UNI_CONSOLE_KEEP_ORIGINAL?: 'true' | 'false'

    // HBuilderX 可能传入的环境变量
    UNI_H5_BASE?: string
    UNI_H5_BROWSER?: 'builtin'

    HX_DEPENDENCIES_DIR?: string // 基座缓存目录，如：unpackage/cache/uts_standard_android
    HX_USE_BASE_TYPE?: 'standard' | 'custom' // 基座类型
    SOURCEMAP?: 'true' | 'false' // 是否生成 sourcemap
    UNI_APP_PACK_TYPE?: 'release' | 'debug' // 打包类型
    UNI_APP_PLATFORM?: 'android' | 'ios' | 'harmony' // 运行时，可能传入了 UNI_APP_PLATFORM = 'android'|'ios'|'harmony'
    UNI_APP_PRODUCTION_TYPE?: 'WGT' // 发行类型
    UNI_APP_X_CACHE_DIR: string // 当前运行/发行平台的缓存目录，如：unpackage/cache/.app-android
    UNI_CLI_LAUNCH_PAGE_PATH?: string // 开发阶段，传入指定入口页面
    UNI_CLI_LAUNCH_PAGE_QUERY?: string // 开发阶段，传入指定入口页面参数
    UNI_SCRIPT?: string // 指定自定义平台，package.json->uni-app->scripts
    UNI_HBUILDERX_LANGID?: string // 当前HBuilderX环境语言，如：zh_CN
    UNI_INPUT_DIR: string // 输入目录
    UNI_OUTPUT_DIR: string // 输出目录
    UNI_MINIMIZE?: 'true' // 是否压缩
    UNI_MP_PLUGIN?: 'true' // 是否发行为小程序插件
    UNI_PLATFORM: UniApp.PLATFORM // 目标平台
    UNI_SUBPACKGE?: string // 发行子包名
    // uniCloud相关
    UNI_CLOUD_SPACES?: string // uniCloud服务空间
    UNICLOUD_DEBUG?: string // 是否开启uniCloud调试
    UNICLOUD_DEBUGGER_PATH?: string // uniCloud调试器路径
    UNI_SECURE_NETWORK_CONFIG?: string // 安全网络配置
    UNI_SECURE_NETWORK_ENABLE?: string // 是否开启安全网络
    // 自动化测试
    HX_RUN_DEVICE_TYPE?: 'ios_simulator' | string // 运行设备类型
    UNI_AUTOMATOR_APP_WEBVIEW?: string // 自动化测试app webview
    UNI_AUTOMATOR_APP_WEBVIEW_SRC?: string // 自动化测试app webview目标地址
    UNI_AUTOMATOR_COMPILE?: string // 是否编译
    UNI_AUTOMATOR_CONFIG?: string // 自动化测试配置
    UNI_AUTOMATOR_HOST?: string // 自动化测试host
    UNI_AUTOMATOR_PORT?: string // 自动化测试port
    UNI_AUTOMATOR_WS_ENDPOINT?: string // 自动化测试ws endpoint
    UNI_OS_NAME?: string // 操作系统名称
    // HBuilderX的Socket通道
    UNI_SOCKET_ID: string
    UNI_SOCKET_PORT: string
    UNI_SOCKET_HOSTS: string

    UNI_CONSOLE_KEEP_ORIGINAL: boolean
    UNI_CONSOLE_WEBVIEW: boolean
    UNI_CONSOLE_WEBVIEW_EVAL_JS_CODE: string
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

declare var __vite_profile_session: import('node:inspector').Session | undefined
