import fs from 'fs'
import os from 'os'
import path from 'path'
import colors from 'picocolors'
import { performance } from 'perf_hooks'
import type { BuildOptions, InlineConfig, Logger } from 'vite'

import {
  M,
  getPlatformDir,
  initModulePaths,
  initPreContext,
  isInHBuilderX,
  isNormalCompileTarget,
  output,
  parseManifestJsonOnce,
  parseScripts,
  runByHBuilderX,
} from '@dcloudio/uni-cli-shared'

import type { CliOptions } from '.'
import { initNVueEnv } from './nvue'
import { initUVueEnv } from './uvue'

// uni -p
export const PLATFORMS = [
  'app',
  'h5',
  'mp-alipay',
  'mp-baidu',
  'mp-kuaishou',
  'mp-lark',
  'mp-qq',
  'mp-toutiao',
  'mp-weixin',
  'mp-xhs',
  'quickapp-webview',
  'quickapp-webview-huawei',
  'quickapp-webview-union',
]

export type PLATFORM =
  | 'app'
  | 'mp-alipay'
  | 'mp-baidu'
  | 'mp-kuaishou'
  | 'mp-lark'
  | 'mp-qq'
  | 'mp-toutiao'
  | 'mp-weixin'
  | 'mp-xhs'
  | 'quickapp-webview'
  | 'quickapp-webview-huawei'
  | 'quickapp-webview-union'

function resolveConfigFile() {
  const extname = ['.js', '.ts', '.mjs', '.mts'].find((ext) => {
    return fs.existsSync(
      path.resolve(process.env.UNI_INPUT_DIR, 'vite.config' + ext)
    )
  })
  if (extname) {
    return path.resolve(process.env.UNI_INPUT_DIR, 'vite.config' + extname)
  }
  return path.resolve(process.env.UNI_CLI_CONTEXT, 'vite.config.js')
}

export function addConfigFile(inlineConfig: InlineConfig) {
  if (isInHBuilderX()) {
    inlineConfig.configFile = resolveConfigFile()
  }
  return inlineConfig
}

let initialized = false
export function initEnv(
  type: 'unknown' | 'dev' | 'build',
  options: CliOptions
) {
  if (initialized) {
    return
  }
  initialized = true
  if (options.platform === 'mp-360') {
    console.error(M['mp.360.unsupported'])
    process.exit(0)
  }
  if (options.platform === 'web') {
    options.platform = 'h5'
  }
  if (options.plugin) {
    process.env.UNI_MP_PLUGIN = options.plugin
  }
  // TODO 需要识别 mode
  if (type === 'dev') {
    process.env.NODE_ENV = 'development'
  } else if (type === 'build') {
    if ((options as BuildOptions).watch) {
      process.env.NODE_ENV = 'development'
    } else {
      if (!isNormalCompileTarget()) {
        if (!process.env.NODE_ENV) {
          process.env.NODE_ENV = 'production'
        }
      } else {
        process.env.NODE_ENV = 'production'
      }
    }
  }
  if (!options.mode) {
    options.mode = process.env.NODE_ENV
  }
  // vite 会修改 NODE_ENV，存储在 UNI_NODE_ENV 中，稍后校正 NODE_ENV
  process.env.UNI_NODE_ENV = process.env.VITE_USER_NODE_ENV =
    process.env.NODE_ENV

  process.env.UNI_CLI_CONTEXT = isInHBuilderX()
    ? path.resolve(process.env.UNI_HBUILDERX_PLUGINS!, 'uniapp-cli-vite')
    : process.cwd()

  // TODO 待优化
  initUTSPlatform(options)

  if (
    options.platform === 'quickapp-webview-huawei' ||
    options.platform === 'quickapp-webview-union'
  ) {
    process.env.UNI_SUB_PLATFORM = options.platform
    options.platform = 'quickapp-webview'
  }
  if (isInHBuilderX()) {
    process.env.VITE_ROOT_DIR =
      process.env.VITE_ROOT_DIR || process.env.UNI_INPUT_DIR || process.cwd()
  } else {
    process.env.VITE_ROOT_DIR = process.env.VITE_ROOT_DIR || process.cwd()
  }

  process.env.UNI_INPUT_DIR =
    process.env.UNI_INPUT_DIR || path.resolve(process.cwd(), 'src')

  initCustomScripts(options)

  process.env.UNI_PLATFORM = options.platform as UniApp.PLATFORM

  // 需要提前初始化
  initUVueEnv()

  if (process.env.UNI_PLATFORM === 'app-harmony') {
    if (process.env.UNI_APP_HARMONY_PROJECT_PATH) {
      // 先通过原始outputDir设置，因为下边会修改原始的outputDir到鸿蒙项目里，而这些临时目录不应该影响到鸿蒙项目
      process.env.UNI_APP_X_TSC_DIR = path.resolve(
        process.env.UNI_OUTPUT_DIR,
        '../.tsc'
      )
      process.env.UNI_APP_X_UVUE_DIR = path.resolve(
        process.env.UNI_OUTPUT_DIR,
        '../.uvue'
      )
      const baseOutDir = path.basename(process.env.UNI_OUTPUT_DIR)
      process.env.UNI_APP_X_CACHE_DIR =
        process.env.UNI_APP_X_CACHE_DIR ||
        path.resolve(process.env.UNI_OUTPUT_DIR, '../cache/.' + baseOutDir)

      process.env.UNI_APP_X_TSC_CACHE_DIR = path.resolve(
        process.env.UNI_APP_X_CACHE_DIR,
        `tsc`
      )
      // 指定了鸿蒙项目根目录
      process.env.UNI_OUTPUT_DIR = path.resolve(
        process.env.UNI_APP_HARMONY_PROJECT_PATH,
        `entry/src/main/resources/resfile/apps/HBuilder/www`
      )
    }
  }

  const hasOutputDir = !!process.env.UNI_OUTPUT_DIR
  if (hasOutputDir) {
    ;(options as BuildOptions).outDir = process.env.UNI_OUTPUT_DIR
  } else {
    if (!(options as BuildOptions).outDir) {
      ;(options as BuildOptions).outDir = path.resolve(
        process.cwd(),
        'dist',
        process.env.NODE_ENV === 'production' ? 'build' : 'dev',
        getPlatformDir()
      )
    }
    process.env.UNI_OUTPUT_DIR = (options as BuildOptions).outDir!
  }

  // 编译为插件、分包时，需提前计算缓存目录位置
  process.env.UNI_APP_X_CACHE_DIR =
    process.env.UNI_APP_X_CACHE_DIR ||
    path.resolve(
      process.env.UNI_OUTPUT_DIR,
      '../cache/.' + path.basename(process.env.UNI_OUTPUT_DIR)
    )

  // 兼容 HBuilderX 旧参数
  if (process.env.UNI_SUBPACKGE) {
    options.subpackage = process.env.UNI_SUBPACKGE
  }
  if (options.subpackage) {
    process.env.UNI_SUBPACKAGE = options.subpackage
    if (!hasOutputDir) {
      // 未指定，则自动补充
      process.env.UNI_OUTPUT_DIR = (options as BuildOptions).outDir =
        path.resolve(process.env.UNI_OUTPUT_DIR, options.subpackage)
    }
  }

  if (options.plugin) {
    if (!hasOutputDir) {
      // 未指定，则自动补充
      process.env.UNI_OUTPUT_DIR = (options as BuildOptions).outDir =
        path.resolve(process.env.UNI_OUTPUT_DIR, options.plugin)
    }
  }

  const baseOutDir = path.basename(process.env.UNI_OUTPUT_DIR)

  if (isNormalCompileTarget()) {
    process.env.HX_DEPENDENCIES_DIR =
      process.env.HX_DEPENDENCIES_DIR ||
      path.resolve(process.env.UNI_OUTPUT_DIR, '../hx/' + baseOutDir)
  }

  process.env.UNI_MODULES_ENCRYPT_CACHE_DIR = path.resolve(
    process.env.UNI_APP_X_CACHE_DIR,
    '.encrypt',
    process.env.NODE_ENV === 'development' ? 'dev' : 'build',
    process.env.UNI_UTS_PLATFORM
  )

  // 默认开启 tsc
  process.env.UNI_APP_X_TSC = 'true'
  try {
    // 部分模式下缺少manifest.json，比如内部编译ext-api时
    const manifestJson = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
    // 留个开关
    if (
      manifestJson['app']?.['utsCompilerVersion'] === 'v1' ||
      manifestJson['app-plus']?.['utsCompilerVersion'] === 'v1'
    ) {
      process.env.UNI_APP_X_TSC = 'false'
    }
  } catch (e) {}

  if (!process.env.UNI_APP_X_TSC_DIR) {
    process.env.UNI_APP_X_TSC_DIR = path.resolve(
      process.env.UNI_OUTPUT_DIR,
      '../.tsc'
    )
  }
  if (!process.env.UNI_APP_X_UVUE_DIR) {
    process.env.UNI_APP_X_UVUE_DIR = path.resolve(
      process.env.UNI_OUTPUT_DIR,
      '../.uvue'
    )
  }
  if (!process.env.UNI_APP_X_TSC_CACHE_DIR) {
    process.env.UNI_APP_X_TSC_CACHE_DIR = path.resolve(
      process.env.UNI_APP_X_CACHE_DIR,
      `tsc`
    )
  }

  initAutomator(options)

  initDevtools(options)

  if (process.env.UNI_PLATFORM === 'app') {
    initNVueEnv()
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(
      M['dev.performance'] +
        (process.env.UNI_PLATFORM.startsWith('mp-')
          ? M['dev.performance.mp']
          : '') +
        (process.env.UNI_PLATFORM === 'web' || process.env.UNI_PLATFORM === 'h5'
          ? M['dev.performance.web']
          : '')
    )
  }

  // 兼容旧版本 SOURCEMAP 参数
  if (process.env.SOURCEMAP) {
    process.env.UNI_APP_SOURCEMAP = process.env.SOURCEMAP
  }

  if (
    (options as BuildOptions).sourcemap &&
    process.env.NODE_ENV !== 'development'
  ) {
    process.env.UNI_APP_SOURCEMAP = 'true'
  }

  initModulePaths()

  const pkg = require('../../package.json')

  process.env.UNI_COMPILER_VERSION =
    process.env.UNI_COMPILER_VERSION ||
    pkg['uni-app']?.['compilerVersion'] ||
    ''
  process.env.UNI_COMPILER_VERSION_TYPE = pkg.version.includes('alpha')
    ? 'a'
    : 'r'

  initPreContext(
    process.env.UNI_PLATFORM,
    process.env.UNI_CUSTOM_CONTEXT,
    process.env.UNI_UTS_PLATFORM,
    process.env.UNI_APP_X === 'true'
  )
  // 应该全平台都显示吧，当初为啥只在部分平台显示？
  if (
    process.env.UNI_PLATFORM === 'app' ||
    process.env.UNI_PLATFORM === 'web' ||
    process.env.UNI_PLATFORM === 'h5' ||
    process.env.UNI_PLATFORM === 'app-harmony'
  ) {
    console.log(
      M['app.compiler.version'].replace(
        '{version}',
        process.env.UNI_COMPILER_VERSION +
          `（${process.env.UNI_APP_X === 'true' ? 'uni-app x' : 'vue3'}）`
      )
    )
  }

  console.log(M['compiling'])
}

function initUTSPlatform(options: CliOptions) {
  if (options.platform === 'app-android') {
    process.env.UNI_UTS_PLATFORM = 'app-android'
    options.platform = 'app'
  } else if (options.platform === 'app-ios') {
    process.env.UNI_UTS_PLATFORM = 'app-ios'
    options.platform = 'app'
  } else {
    // 运行时，可能传入了 UNI_APP_PLATFORM = 'android'|'ios'
    if (process.env.UNI_APP_PLATFORM === 'android') {
      process.env.UNI_UTS_PLATFORM = 'app-android'
    }
    if (process.env.UNI_APP_PLATFORM === 'ios') {
      process.env.UNI_UTS_PLATFORM = 'app-ios'
    }
    if (options.platform === 'app-plus') {
      options.platform = 'app'
    }
    if (options.platform === 'app') {
      // app 平台未指定 UTS_PLATFORM 时，设置未 app，一般是发行模式
      if (!process.env.UNI_UTS_PLATFORM) {
        process.env.UNI_UTS_PLATFORM = 'app'
      }
    }
  }
  if (options.platform === 'h5') {
    process.env.UNI_UTS_PLATFORM = 'web'
  }
  // 非 app 平台，自动补充 UNI_UTS_PLATFORM
  // app 平台，必须主动传入
  if (options.platform !== 'app') {
    if (!process.env.UNI_UTS_PLATFORM) {
      process.env.UNI_UTS_PLATFORM = options.platform as any
    }
  }

  process.env.UNI_UTS_TARGET_LANGUAGE = 'javascript'
  if (process.env.UNI_UTS_PLATFORM === 'app-android') {
    process.env.UNI_UTS_TARGET_LANGUAGE = 'kotlin'
  } else if (process.env.UNI_UTS_PLATFORM === 'app-ios') {
    process.env.UNI_UTS_TARGET_LANGUAGE = 'swift'
  } else if (process.env.UNI_UTS_PLATFORM === 'app-harmony') {
    process.env.UNI_UTS_TARGET_LANGUAGE = 'arkts'
  }
}

function initDevtools({ devtools, devtoolsHost, devtoolsPort }: CliOptions) {
  if (!devtools) {
    return
  }
  process.env.__VUE_PROD_DEVTOOLS__ = 'true'
  if (devtoolsHost) {
    process.env.__VUE_DEVTOOLS_HOST__ = devtoolsHost
  }
  if (devtoolsPort) {
    process.env.__VUE_DEVTOOLS_PORT__ = devtoolsPort + ''
  }
}

function initAutomator({ autoHost, autoPort }: CliOptions) {
  const hasAutoHostOrPort =
    autoHost || autoPort || process.env.UNI_AUTOMATOR_HOST
  // 发行分包,插件也不需要自动化测试
  if (
    !hasAutoHostOrPort ||
    process.env.UNI_SUBPACKAGE ||
    process.env.UNI_MP_PLUGIN
  ) {
    return
  }
  process.env.UNI_AUTOMATOR_WS_ENDPOINT =
    'ws://' +
    (autoHost || process.env.UNI_AUTOMATOR_HOST || resolveHostname()) +
    ':' +
    (autoPort || process.env.UNI_AUTOMATOR_PORT)
}

function resolveHostname() {
  const interfaces = os.networkInterfaces()
  const keys = Object.keys(interfaces)
  for (const key of keys) {
    const interfaceInfos = interfaces[key]
    if (!interfaceInfos) {
      continue
    }
    for (const info of interfaceInfos) {
      if (
        (info.family === 'IPv4' ||
          /* Node >= v18 */ (info as any).family === 4) &&
        !info.address.includes('127.0.0.1')
      ) {
        return info.address
      }
    }
  }
  return 'localhost'
}

export function cleanOptions(options: CliOptions) {
  const ret = { ...options }
  delete ret['--']

  delete ret.c
  delete ret.config

  delete ret.platform
  delete ret.p
  delete ret.ssr

  delete ret.base
  delete ret.debug
  delete ret.d
  delete ret.filter
  delete ret.f
  delete ret.logLevel
  delete ret.l
  delete ret.clearScreen
  delete ret.m
  delete ret.mode

  delete ret.autoHost
  delete ret.autoPort

  return ret
}

export function printStartupDuration(
  logger: Logger,
  whitespace: boolean = true
) {
  if (global.__vite_start_time) {
    const startupDuration = performance.now() - global.__vite_start_time
    logger.info(
      `${whitespace ? `\n  ` : ''}${colors.cyan(
        `ready in ${Math.ceil(startupDuration)}ms.`
      )}\n`
    )
  }
}

function initCustomScripts(options: CliOptions) {
  const custom = parseScripts(
    process.env.UNI_SCRIPT || options.platform!, // process.env.UNI_SCRIPT 是 HBuilderX 传递的
    path.join(process.env.VITE_ROOT_DIR!, 'package.json')
  )
  if (!custom) {
    return
  }
  options.platform = custom.platform
  process.env.UNI_CUSTOM_SCRIPT = custom.name
  process.env.UNI_CUSTOM_DEFINE = JSON.stringify(custom.define)
  process.env.UNI_CUSTOM_CONTEXT = JSON.stringify(custom.context)
}

export function showRunPrompt(platform: PLATFORM) {
  if (!runByHBuilderX()) {
    const devtools = getPlatformDevtools(getOriginalPlatform(platform))
    const outputDir = path.relative(
      process.env.UNI_CLI_CONTEXT,
      process.env.UNI_OUTPUT_DIR
    )
    output(
      'log',
      `${M['prompt.run.message']
        .replace('{devtools}', M[devtools])
        .replace('{outputDir}', colors.cyan(outputDir))}`
    )
  }
}

function getOriginalPlatform(platform: PLATFORM) {
  if (platform.startsWith('quickapp-webview') && process.env.UNI_SUB_PLATFORM) {
    return process.env.UNI_SUB_PLATFORM
  }
  return platform
}

function getPlatformDevtools(platform: PLATFORM) {
  return `prompt.run.devtools.${platform}` as keyof typeof M
}
