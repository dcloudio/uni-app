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
  'mp-toutiao',
  'mp-weixin',
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
  if (type === 'dev') {
    process.env.NODE_ENV = 'development'
  } else if (type === 'build') {
    if ((options as BuildOptions).watch) {
      process.env.NODE_ENV = 'development'
    } else {
      process.env.NODE_ENV = 'production'
    }
  }

  process.env.UNI_CLI_CONTEXT = isInHBuilderX()
    ? path.resolve(process.env.UNI_HBUILDERX_PLUGINS!, 'uniapp-cli-vite')
    : process.cwd()

  process.env.UNI_PLATFORM = options.platform as UniApp.PLATFORM

  process.env.VITE_ROOT_DIR = process.env.UNI_INPUT_DIR || process.cwd()

  process.env.UNI_INPUT_DIR =
    process.env.UNI_INPUT_DIR || path.resolve(process.cwd(), 'src')

  if (process.env.UNI_OUTPUT_DIR) {
    ;(options as BuildOptions).outDir = process.env.UNI_OUTPUT_DIR
  } else {
    if (!(options as BuildOptions).outDir) {
      ;(options as BuildOptions).outDir = path.resolve(
        process.cwd(),
        'dist',
        process.env.NODE_ENV === 'production' ? 'build' : 'dev',
        process.env.UNI_PLATFORM
      )
    }
    process.env.UNI_OUTPUT_DIR = (options as BuildOptions).outDir!
  }

  initAutomator(options)

  if (process.env.NODE_ENV === 'production') {
    if (!(options as BuildOptions).minify) {
      ;(options as BuildOptions).minify = 'terser'
    }
  }
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
  if (!autoPort) {
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

  delete ret.autoHost
  delete ret.autoPort

  return ret
}
