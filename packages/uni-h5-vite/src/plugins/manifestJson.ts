import type { Plugin } from 'vite'

import {
  defineUniManifestJsonPlugin,
  normalizeNetworkTimeout,
  parseJson,
  initI18nOptions,
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

export function uniManifestJsonPlugin(): Plugin {
  return defineUniManifestJsonPlugin((opts) => {
    return {
      name: 'uni:h5-manifest-json',
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
          sdkConfigs.maps && sdkConfigs.maps.qqmap && sdkConfigs.maps.qqmap.key

        const googleMapKey =
          sdkConfigs.maps &&
          sdkConfigs.maps.google &&
          sdkConfigs.maps.google.key

        let locale: string | null | undefined = manifest.locale
        locale = locale && locale.toUpperCase() !== 'AUTO' ? locale : ''

        const i18nOptions = initI18nOptions(
          process.env.UNI_PLATFORM,
          process.env.UNI_INPUT_DIR,
          false,
          false
        )
        const fallbackLocale = (i18nOptions && i18nOptions.locale) || ''

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
  export const qqMapKey = ${JSON.stringify(qqMapKey)}
  export const googleMapKey = ${JSON.stringify(googleMapKey)}
  export const sdkConfigs = ${JSON.stringify(sdkConfigs)}
  export const locale = '${locale}'
  export const fallbackLocale = '${fallbackLocale}'
  `,
          map: { mappings: '' },
        }
      },
    }
  })
}
