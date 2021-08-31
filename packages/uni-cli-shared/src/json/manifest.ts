import fs from 'fs'
import path from 'path'
import { extend } from '@vue/shared'
import { once, defaultRpx2Unit } from '@dcloudio/uni-shared'

import { parseJson } from './json'

export const parseManifestJson = (inputDir: string) => {
  return parseJson(
    fs.readFileSync(path.join(inputDir, 'manifest.json'), 'utf8')
  )
}

export const parseManifestJsonOnce = once(parseManifestJson)

export const parseRpx2UnitOnce = once((inputDir: string) => {
  const { h5 } = parseManifestJsonOnce(inputDir)
  return extend({}, defaultRpx2Unit, (h5 && h5.rpx) || {})
})

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
  return extend(
    {},
    manifest.uniStatistics,
    manifest[platform] && manifest[platform].uniStatistics
  )
}

export function getFallbackLocale(inputDir: string) {
  const manifest = parseManifestJsonOnce(inputDir)
  return manifest.fallbackLocale
}
