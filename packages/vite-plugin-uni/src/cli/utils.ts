import fs from 'fs'
import os from 'os'
import path from 'path'
import colors from 'picocolors'
import { performance } from 'perf_hooks'
import type { BuildOptions, InlineConfig, Logger } from 'vite'

import {
  M,
  isInHBuilderX,
  initModulePaths,
  parseScripts,
  getPlatformDir,
  output,
} from '@dcloudio/uni-cli-shared'

import { CliOptions } from '.'
import { initNVueEnv } from './nvue'
import { initUVueEnv } from './uvue'

export const PLATFORMS = [
  'app',
  'h5',
  'mp-alipay',
  'mp-baidu',
  'mp-qq',
  'mp-lark',
  'mp-toutiao',
  'mp-weixin',
  'mp-weibo',
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
  | 'quickapp-webview'
  | 'quickapp-webview-huawei'
  | 'quickapp-webview-union'
  | 'mp-weibo'

function resolveConfigFile() {
  const viteConfigJs = path.resolve(process.env.UNI_INPUT_DIR, 'vite.config.js')
  const viteConfigTs = path.resolve(process.env.UNI_INPUT_DIR, 'vite.config.ts')

  if (fs.existsSync(viteConfigTs)) {
    return viteConfigTs
  }
  if (fs.existsSync(viteConfigJs)) {
    return viteConfigJs
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
  if (options.plugin) {
    process.env.UNI_MP_PLUGIN = 'true'
  }
  // TODO 需要识别 mode
  if (type === 'dev') {
    process.env.NODE_ENV = 'development'
  } else if (type === 'build') {
    if ((options as BuildOptions).watch) {
      process.env.NODE_ENV = 'development'
    } else {
      process.env.NODE_ENV = 'production'
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
  process.env.VITE_ROOT_DIR =
    process.env.VITE_ROOT_DIR || process.env.UNI_INPUT_DIR || process.cwd()

  process.env.UNI_INPUT_DIR =
    process.env.UNI_INPUT_DIR || path.resolve(process.cwd(), 'src')

  initCustomScripts(options)

  process.env.UNI_PLATFORM = options.platform as UniApp.PLATFORM

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
      if (options.platform === 'mp-weibo' && options.outDir) {
        options.outDir = path.join(options.outDir, 'src', 'res', 'h5')
      }
    }
    process.env.UNI_OUTPUT_DIR = (options as BuildOptions).outDir!
  }
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

  initAutomator(options)

  initDevtools(options)

  if (process.env.UNI_PLATFORM === 'app') {
    const pkg = require('../../package.json')
    console.log(
      M['app.compiler.version'].replace(
        '{version}',
        pkg['uni-app']['compilerVersion'] + '（vue3）'
      )
    )
    initNVueEnv()
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(
      M['dev.performance'] +
        (process.env.UNI_PLATFORM.startsWith('mp-')
          ? M['dev.performance.mp']
          : '')
    )
  }

  if (
    (options as BuildOptions).sourcemap &&
    process.env.NODE_ENV === 'production'
  ) {
    process.env.SOURCEMAP = 'true'
  }

  initModulePaths()

  initUVueEnv()

  if (options.platform === 'mp-weibo') {
    options.base = './'
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
  }
  if (options.platform === 'h5' || options.platform === 'mp-weibo') {
    process.env.UNI_UTS_PLATFORM = 'web'
  }
  // 非 app 平台，自动补充 UNI_UTS_PLATFORM
  // app 平台，必须主动传入
  if (options.platform !== 'app') {
    if (!process.env.UNI_UTS_PLATFORM) {
      process.env.UNI_UTS_PLATFORM = options.platform as any
    }
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
  // 发行分包,插件也不需要自动化测试
  if (!autoPort || process.env.UNI_SUBPACKAGE || process.env.UNI_MP_PLUGIN) {
    return
  }
  process.env.UNI_AUTOMATOR_WS_ENDPOINT =
    'ws://' + (autoHost || resolveHostname()) + ':' + autoPort
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
  // @ts-ignore
  if (global.__vite_start_time) {
    // @ts-ignore
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
  if (!isInHBuilderX()) {
    const devtools = getPlatformDevtools(getOriginalPlatform(platform))
    let outputDir = path.relative(
      process.env.UNI_CLI_CONTEXT,
      process.env.UNI_OUTPUT_DIR
    )
    if (platform === 'mp-weibo') {
      outputDir = path.resolve(
        path.join(outputDir, '..', '..', '..', 'weibomini.wbox-workspace')
      )
    }
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
