import path from 'path'
import { BuildOptions } from 'vite'
import { CliOptions } from '.'

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

  process.env.UNI_CLI_CONTEXT = process.cwd() // TODO HBuilderX

  process.env.UNI_PLATFORM = options.platform as UniApp.PLATFORM

  process.env.VITE_ROOT_DIR = process.env.UNI_INPUT_DIR || process.cwd()

  process.env.UNI_INPUT_DIR =
    process.env.UNI_INPUT_DIR || path.resolve(process.cwd(), 'src')

  if (process.env.UNI_OUTPUT_DIR) {
    ;(options as BuildOptions).outDir = process.env.UNI_OUTPUT_DIR
  } else {
    if (!(options as BuildOptions).outDir) {
      ;(options as BuildOptions).outDir = path.join(
        'dist',
        process.env.NODE_ENV === 'production' ? 'build' : 'dev',
        process.env.UNI_PLATFORM
      )
    }
    process.env.UNI_OUTPUT_DIR = (options as BuildOptions).outDir!
  }
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
  return ret
}
