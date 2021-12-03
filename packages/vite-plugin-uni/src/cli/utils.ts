import fs from 'fs'
import os from 'os'
import path from 'path'
import { BuildOptions, InlineConfig } from 'vite'

import { M, isInHBuilderX, initModulePaths } from '@dcloudio/uni-cli-shared'

import { CliOptions } from '.'
import { initNVueEnv } from './nvue'

export const PLATFORMS = [
  'app',
  'h5',
  'mp-alipay',
  'mp-baidu',
  'mp-qq',
  'mp-lark',
  'mp-toutiao',
  'mp-weixin',
  'quickapp-webview',
  'quickapp-webview-huawei',
  'quickapp-webview-union',
]

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

export function initEnv(type: 'dev' | 'build', options: CliOptions) {
  if (options.platform === 'mp-360') {
    console.error(M['mp.360.unsupported'])
    process.exit(0)
  }
  if (options.plugin) {
    process.env.UNI_MP_PLUGIN = 'true'
  }
  if (type === 'dev') {
    process.env.NODE_ENV = 'development'
  } else if (type === 'build') {
    if ((options as BuildOptions).watch) {
      process.env.NODE_ENV = 'development'
    } else {
      process.env.NODE_ENV = 'production'
    }
  }
  // vite 会修改 NODE_ENV，存储在 UNI_NODE_ENV 中，稍后校正 NODE_ENV
  process.env.UNI_NODE_ENV = process.env.VITE_USER_NODE_ENV =
    process.env.NODE_ENV

  process.env.UNI_CLI_CONTEXT = isInHBuilderX()
    ? path.resolve(process.env.UNI_HBUILDERX_PLUGINS!, 'uniapp-cli-vite')
    : process.cwd()

  if (options.platform === 'app-plus') {
    options.platform = 'app'
  }
  if (
    options.platform === 'quickapp-webview-huawei' ||
    options.platform === 'quickapp-webview-union'
  ) {
    process.env.UNI_SUB_PLATFORM = options.platform
    options.platform = 'quickapp-webview'
  }

  process.env.UNI_PLATFORM = options.platform as UniApp.PLATFORM

  process.env.VITE_ROOT_DIR = process.env.UNI_INPUT_DIR || process.cwd()

  process.env.UNI_INPUT_DIR =
    process.env.UNI_INPUT_DIR || path.resolve(process.cwd(), 'src')

  const hasOutputDir = !!process.env.UNI_OUTPUT_DIR
  if (hasOutputDir) {
    ;(options as BuildOptions).outDir = process.env.UNI_OUTPUT_DIR
  } else {
    if (!(options as BuildOptions).outDir) {
      ;(options as BuildOptions).outDir = path.resolve(
        process.cwd(),
        'dist',
        process.env.NODE_ENV === 'production' ? 'build' : 'dev',
        process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM
      )
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

  initModulePaths()

  console.log(M['compiling'])
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
      if (info.family === 'IPv4' && !info.address.includes('127.0.0.1')) {
        return info.address
      }
    }
  }
  return 'localhost'
}

export function cleanOptions(options: CliOptions) {
  const ret = { ...options }
  delete ret['--']

  delete ret.platform
  delete ret.p
  delete ret.ssr

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
