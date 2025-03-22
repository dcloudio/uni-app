import fs from 'fs'
import path from 'path'
import { extend, hasOwn } from '@vue/shared'
import {
  defaultMiniProgramRpx2Unit,
  defaultRpx2Unit,
  once,
} from '@dcloudio/uni-shared'

import { parseJson } from './json'
import { isNormalCompileTarget } from '../utils'

export const parseManifestJson = (inputDir: string) => {
  const manifestFilename = path.join(inputDir, 'manifest.json')
  if (!fs.existsSync(manifestFilename)) {
    if (!isNormalCompileTarget()) {
      return {}
    }
  }
  return parseJson(
    fs.readFileSync(manifestFilename, 'utf8'),
    false,
    manifestFilename
  )
}

export const parseManifestJsonOnce = once(parseManifestJson)

export const parseRpx2UnitOnce = once(
  (inputDir: string, platform: UniApp.PLATFORM = 'h5') => {
    const rpx2unit =
      platform === 'h5' || platform === 'app' || platform === 'app-harmony'
        ? defaultRpx2Unit
        : defaultMiniProgramRpx2Unit
    const manifestJson = parseManifestJsonOnce(inputDir)
    let platformOptions = getPlatformManifestJson(manifestJson, platform)
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
  let platformManifest = getPlatformManifestJson(manifest, platform)
  return extend(
    {},
    manifest.uniStatistics,
    platformManifest && platformManifest.uniStatistics
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
  const platformManifest = getPlatformManifestJson(manifest, platform)
  if (platform === 'app') {
    return (
      platformManifest?.distribute?.sdkConfigs?.push?.unipush?.version == '2'
    )
  }
  return platformManifest?.unipush?.enable === true
}

export function isEnableSecureNetwork(
  inputDir: string,
  platform: UniApp.PLATFORM
) {
  const manifest = parseManifestJsonOnce(inputDir)
  const platformManifest = getPlatformManifestJson(manifest, platform)
  if (platform === 'app') {
    return !!platformManifest?.modules?.SecureNetwork
  }
  return platformManifest?.secureNetwork?.enable === true
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
  return extend({}, getPlatformManifestJson(manifestJson, 'h5')?.router)
}

export function isEnableTreeShaking(manifestJson: Record<string, any>) {
  // 自动化测试时，一定不摇树
  if (process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
    return false
  }
  const platformManifest = getPlatformManifestJson(manifestJson, 'h5')
  return platformManifest?.optimization?.treeShaking?.enable !== false
}

export function getDevServerOptions(manifestJson: Record<string, any>) {
  const platformManifest = getPlatformManifestJson(manifestJson, 'h5')
  return extend({}, platformManifest?.devServer)
}

export function getPlatformManifestJson(
  manifestJson: any,
  platform?: UniApp.PLATFORM
) {
  if (!platform) {
    platform = process.env.UNI_PLATFORM
  }
  if (platform === 'app') {
    return manifestJson['app-plus'] || manifestJson['plus'] || {}
  }
  if (platform === 'h5') {
    return manifestJson.web || manifestJson.h5 || {}
  }
  return manifestJson[platform] || {}
}

export function getPlatformManifestJsonOnce() {
  const manifestJson = !process.env.UNI_INPUT_DIR
    ? {}
    : parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
  return getPlatformManifestJson(manifestJson)
}

const themeValues = ['dark', 'light', 'auto']
export function validateThemeValue(value: string) {
  return themeValues.indexOf(value) !== -1
}
