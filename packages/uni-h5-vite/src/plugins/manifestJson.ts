import { Plugin } from 'vite'

import {
  defineUniManifestJsonPlugin,
  normalizeNetworkTimeout,
  parseJson,
} from '@dcloudio/uni-cli-shared'

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

const defaultQQMapKey = 'XVXBZ-NDMC4-JOGUS-XGIEE-QVHDZ-AMFV2'

export function uniManifestJsonPlugin(): Plugin {
  return defineUniManifestJsonPlugin((opts) => {
    return {
      name: 'vite:uni-h5-manifest-json',
      enforce: 'pre',
      transform(code, id) {
        if (!opts.filter(id)) {
          return
        }
        const manifest = parseJson(code)
        const { debug, h5 } = manifest
        const appid = (manifest.appid || '').replace('__UNI__', '')
        const router = { ...defaultRouter, ...((h5 && h5.router) || {}) }
        if (!router.base) {
          router.base = '/'
        }
        const async = { ...defaultAsync, ...((h5 && h5.async) || {}) }

        const networkTimeout = normalizeNetworkTimeout(manifest.networkTimeout)

        const sdkConfigs = (h5 && h5.sdkConfigs) || {}

        const qqMapKey =
          (sdkConfigs.maps &&
            sdkConfigs.maps.qqmap &&
            sdkConfigs.maps.qqmap.key) ||
          defaultQQMapKey

        let locale: string | null | undefined = manifest.locale
        locale = locale && locale.toUpperCase() !== 'AUTO' ? locale : ''

        const flexDirection =
          (manifest['app'] &&
            manifest['app'].nvue &&
            manifest['app'].nvue['flex-direction']) ||
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
  export const locale = '${locale}'
  `,
          map: { mappings: '' },
        }
      },
    }
  })
}
