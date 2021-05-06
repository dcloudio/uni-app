import path from 'path'
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

export function initEnv(options: CliOptions) {
  process.env.VITE_ROOT_DIR = process.env.UNI_INPUT_DIR || process.cwd()
  process.env.UNI_INPUT_DIR =
    process.env.UNI_INPUT_DIR || path.resolve(process.cwd(), 'src')

  process.env.UNI_PLATFORM = options.platform as UniApp.PLATFORM
}
