import type { Plugin, ResolvedConfig } from 'vite'

import {
  defineUniManifestJsonPlugin,
  getPlatformManifestJson,
  initI18nOptions,
  normalizeNetworkTimeout,
  normalizeThemeConfigOnce,
  parseJson,
} from '@dcloudio/uni-cli-shared'

const defaultRouter = {
  mode: 'hash',
  base: '/',
  assets: 'assets',
  routerBase: '/',
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
    let resolvedConfig: ResolvedConfig
    return {
      name: 'uni:h5-manifest-json',
      enforce: 'pre',
      configResolved(config) {
        defaultRouter.assets = config.build.assetsDir
        resolvedConfig = config
      },
      transform(code, id) {
        if (!opts.filter(id)) {
          return
        }
        const manifest = parseJson(code)
        const { debug } = manifest
        const h5 = getPlatformManifestJson(manifest, 'h5')
        const router = {
          ...defaultRouter,
          ...{ base: resolvedConfig.base },
          ...((h5 && h5.router) || {}),
        }
        if (!router.base) {
          router.base = '/'
        }

        /**
         * ssr时base和访问域名不一致导致跳到错误链接，其实应该区分server和client的部署路径，后续有需求可以加上
         */
        router.routerBase = new URL(router.base, 'http://localhost').pathname

        const async = { ...defaultAsync, ...((h5 && h5.async) || {}) }

        const networkTimeout = normalizeNetworkTimeout(manifest.networkTimeout)

        const sdkConfigs = (h5 && h5.sdkConfigs) || {}

        const tempTencentMapKey =
          sdkConfigs.maps &&
          sdkConfigs.maps.tencent &&
          sdkConfigs.maps.tencent.key
        const tempQQMapKey =
          sdkConfigs.maps && sdkConfigs.maps.qqmap && sdkConfigs.maps.qqmap.key
        const qqMapKey = tempTencentMapKey || tempQQMapKey

        const bMapKey =
          sdkConfigs.maps && sdkConfigs.maps.bmap && sdkConfigs.maps.bmap.key

        const googleMapKey =
          sdkConfigs.maps &&
          sdkConfigs.maps.google &&
          sdkConfigs.maps.google.key

        const aMapKey =
          sdkConfigs.maps && sdkConfigs.maps.amap && sdkConfigs.maps.amap.key

        const aMapSecurityJsCode =
          sdkConfigs.maps &&
          sdkConfigs.maps.amap &&
          sdkConfigs.maps.amap.securityJsCode

        const aMapServiceHost =
          sdkConfigs.maps &&
          sdkConfigs.maps.amap &&
          sdkConfigs.maps.amap.serviceHost

        let locale: string | null | undefined = manifest.locale
        locale = locale && locale.toUpperCase() !== 'AUTO' ? locale : ''

        const i18nOptions = initI18nOptions(
          process.env.UNI_PLATFORM,
          process.env.UNI_INPUT_DIR,
          false,
          false
        )
        const fallbackLocale = (i18nOptions && i18nOptions.locale) || ''

        const vueType = process.env.UNI_APP_X === 'true' ? 'uvue' : 'nvue'

        const flexDirection =
          (process.env.UNI_APP_X === 'true'
            ? manifest['uni-app-x'] && manifest['uni-app-x']['flex-direction']
            : manifest['app'] &&
              manifest['app'].nvue &&
              manifest['app'].nvue['flex-direction']) || 'column'

        const platformConfig =
          manifest[
            process.env.UNI_PLATFORM === 'app'
              ? 'app-plus'
              : process.env.UNI_PLATFORM
          ] || {}

        return {
          code: `export const appId = ${JSON.stringify(manifest.appid || '')}
  export const appName = ${JSON.stringify(manifest.name || '')}
  export const appVersion = ${JSON.stringify(manifest.versionName || '')}
  export const appVersionCode = ${JSON.stringify(manifest.versionCode || '')}

  export const debug = ${!!debug}
  export const ${vueType} = ${JSON.stringify({
            'flex-direction': flexDirection,
          })}
  export const networkTimeout = ${JSON.stringify(networkTimeout)}
  // h5
  export const router = ${JSON.stringify(router)}
  export const async = ${JSON.stringify(async)}
  export const qqMapKey = ${JSON.stringify(qqMapKey)}
  export const bMapKey = ${JSON.stringify(bMapKey)}
  export const googleMapKey = ${JSON.stringify(googleMapKey)}
  export const aMapKey = ${JSON.stringify(aMapKey)}
  export const aMapSecurityJsCode = ${JSON.stringify(aMapSecurityJsCode)}
  export const aMapServiceHost = ${JSON.stringify(aMapServiceHost)}
  export const sdkConfigs = ${JSON.stringify(sdkConfigs)}
  export const locale = '${locale}'
  export const fallbackLocale = '${fallbackLocale}'
  export const darkmode = ${platformConfig.darkmode || 'false'}
  export const themeConfig = ${JSON.stringify(
    normalizeThemeConfigOnce(platformConfig)
  )}
  `,
          map: { mappings: '' },
        }
      },
    }
  })
}
