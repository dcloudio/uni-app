import fs from 'fs'
import path from 'path'

import { parse } from 'jsonc-parser'
import { Plugin } from 'vite'
import { VitePluginUniResolvedOptions } from '../..'
import slash from 'slash'

const MANIFEST_JSON_JS = 'manifest.json.js'

const defaultRouter = {
  mode: 'hash',
  base: '/',
}

const defaultAsync = {
  loading: 'AsyncLoading',
  error: 'AsyncError',
  delay: 200,
  timeout: 60000,
  suspensible: true,
}

const defaultNetworkTimeout = {
  request: 60000,
  connectSocket: 60000,
  uploadFile: 60000,
  downloadFile: 60000,
}

const defaultQQMapKey = 'XVXBZ-NDMC4-JOGUS-XGIEE-QVHDZ-AMFV2'

export function uniManifestJsonPlugin(
  options: VitePluginUniResolvedOptions
): Plugin {
  const manifestJsonPath = slash(path.join(options.inputDir, 'manifest.json'))
  return {
    name: 'vite:uni-manifest-json',
    resolveId(id) {
      if (id.endsWith(MANIFEST_JSON_JS)) {
        return manifestJsonPath + '.js'
      }
    },
    transform(code, id) {
      if (id.endsWith(MANIFEST_JSON_JS)) {
        const manifest = JSON.parse(code)
        const { debug, h5 } = manifest
        const appid = (manifest.appid || '').replace('__UNI__', '')
        const router = { ...defaultRouter, ...((h5 && h5.router) || {}) }
        const async = { ...defaultAsync, ...((h5 && h5.async) || {}) }

        const networkTimeout = {
          ...defaultNetworkTimeout,
          ...(manifest.networkTimeout || {}),
        }

        const sdkConfigs = (h5 && h5.sdkConfigs) || {}

        const qqMapKey =
          (sdkConfigs.maps &&
            sdkConfigs.maps.qqmap &&
            sdkConfigs.maps.qqmap.key) ||
          defaultQQMapKey

        const flexDirection =
          (manifest['app-plus'] &&
            manifest['app-plus'].nvue &&
            manifest['app-plus'].nvue['flex-direction']) ||
          'column'

        return {
          code: `export const appid = '${appid || ''}'    
export const debug = ${!!debug}
export const nvue = ${JSON.stringify({
            'flex-direction': flexDirection,
          })}
export const networkTimeout = ${JSON.stringify(networkTimeout)}
// h5
export const router = ${JSON.stringify(router)}
export const async = ${JSON.stringify(async)}
export const qqMapKey = '${qqMapKey}'
export const sdkConfigs = ${JSON.stringify(sdkConfigs)}
`,
          map: { mappings: '' },
        }
      }
    },
    load(id) {
      if (id.endsWith(MANIFEST_JSON_JS)) {
        return JSON.stringify(parse(fs.readFileSync(manifestJsonPath, 'utf8')))
      }
    },
  }
}
