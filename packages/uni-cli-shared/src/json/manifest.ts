import fs from 'fs'
import path from 'path'
import { extend, hasOwn } from '@vue/shared'
import {
  defaultMiniProgramRpx2Unit,
  defaultRpx2Unit,
  once,
} from '@dcloudio/uni-shared'

import { parseJson } from './json'

export const parseManifestJson = (inputDir: string) => {
  const manifestFilename = path.join(inputDir, 'manifest.json')
  if (!fs.existsSync(manifestFilename)) {
    if (process.env.UNI_COMPILE_TARGET === 'uni_modules') {
      return {}
    }
  }
  return parseJson(
    fs.readFileSync(path.join(inputDir, 'manifest.json'), 'utf8')
  )
}

export const parseManifestJsonOnce = once(parseManifestJson)

export const parseRpx2UnitOnce = once(
  (inputDir: string, platform: UniApp.PLATFORM = 'h5') => {
    const rpx2unit =
      platform === 'h5' || platform === 'app' || platform === 'app-harmony'
        ? defaultRpx2Unit
        : defaultMiniProgramRpx2Unit
    const platformOptions = parseManifestJsonOnce(inputDir)[platform]
    if (platformOptions && platformOptions.rpx) {
      return extend({}, rpx2unit, platformOptions)
    }
    return extend({}, rpx2unit)
  }
)

interface CompilerCompatConfig {
  MODE?: 2 | 3
}
function parseCompatConfig(_inputDir: string): CompilerCompatConfig {
  // 不支持 mode:2
  return { MODE: 3 } //parseManifestJsonOnce(inputDir).compatConfig || {}
}

export const parseCompatConfigOnce = once(parseCompatConfig)

const defaultNetworkTimeout = {
  request: 60000,
  connectSocket: 60000,
  uploadFile: 60000,
  downloadFile: 60000,
}

export function normalizeNetworkTimeout(
  networkTimeout?: Partial<typeof defaultNetworkTimeout>
) {
  return {
    ...defaultNetworkTimeout,
    ...networkTimeout,
  }
}

export function getUniStatistics(inputDir: string, platform: UniApp.PLATFORM) {
  const manifest = parseManifestJsonOnce(inputDir)
  if (platform === 'app') {
    platform = 'app-plus'
  }
  return extend(
    {},
    manifest.uniStatistics,
    manifest[platform] && manifest[platform].uniStatistics
  )
}

export function isEnableUniPushV1(inputDir: string, platform: UniApp.PLATFORM) {
  if (isEnableUniPushV2(inputDir, platform)) {
    return false
  }
  const manifest = parseManifestJsonOnce(inputDir)
  if (platform === 'app') {
    const push = manifest['app-plus']?.distribute?.sdkConfigs?.push
    if (push && hasOwn(push, 'unipush')) {
      return true
    }
  }
  return false
}

export function isEnableUniPushV2(inputDir: string, platform: UniApp.PLATFORM) {
  const manifest = parseManifestJsonOnce(inputDir)
  if (platform === 'app') {
    return (
      manifest['app-plus']?.distribute?.sdkConfigs?.push?.unipush?.version ==
      '2'
    )
  }
  return manifest[platform]?.unipush?.enable === true
}

export function isEnableSecureNetwork(
  inputDir: string,
  platform: UniApp.PLATFORM
) {
  const manifest = parseManifestJsonOnce(inputDir)
  if (platform === 'app') {
    return !!manifest['app-plus']?.modules?.SecureNetwork
  }
  return manifest[platform]?.secureNetwork?.enable === true
}

export function hasPushModule(inputDir: string) {
  const manifest = parseManifestJsonOnce(inputDir)
  return !!manifest['app-plus']?.modules?.Push
}

export function isUniPushOffline(inputDir: string) {
  const manifest = parseManifestJsonOnce(inputDir)
  return (
    manifest['app-plus']?.distribute?.sdkConfigs?.push?.unipush?.offline ===
    true
  )
}

export function getRouterOptions(manifestJson: Record<string, any>): {
  mode?: 'history' | 'hash'
  base?: string
} {
  return extend({}, manifestJson.h5?.router)
}

export function isEnableTreeShaking(manifestJson: Record<string, any>) {
  // 自动化测试时，一定不摇树
  if (process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
    return false
  }
  return manifestJson.h5?.optimization?.treeShaking?.enable !== false
}

export function getDevServerOptions(manifestJson: Record<string, any>) {
  return extend({}, manifestJson.h5?.devServer)
}

export function getPlatformManifestJsonOnce() {
  const platform =
    process.env.UNI_PLATFORM === 'app' ? 'app-plus' : process.env.UNI_PLATFORM
  return !process.env.UNI_INPUT_DIR
    ? {}
    : parseManifestJsonOnce(process.env.UNI_INPUT_DIR)[platform] || {}
}

const themeValues = ['dark', 'light', 'auto']
export function validateThemeValue(value: string) {
  return themeValues.indexOf(value) !== -1
}
