"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniManifestJsonPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const defaultRouter = {
    mode: 'hash',
    base: '/',
    assets: 'assets',
    routerBase: '/',
};
const defaultAsync = {
    loading: 'AsyncLoading',
    error: 'AsyncError',
    delay: 200,
    timeout: 60000,
    suspensible: true,
};
function uniManifestJsonPlugin() {
    return (0, uni_cli_shared_1.defineUniManifestJsonPlugin)((opts) => {
        let resolvedConfig;
        return {
            name: 'uni:h5-manifest-json',
            enforce: 'pre',
            configResolved(config) {
                defaultRouter.assets = config.build.assetsDir;
                resolvedConfig = config;
            },
            transform(code, id) {
                if (!opts.filter(id)) {
                    return;
                }
                const manifest = (0, uni_cli_shared_1.parseJson)(code);
                const { debug, h5 } = manifest;
                const router = {
                    ...defaultRouter,
                    ...{ base: resolvedConfig.base },
                    ...((h5 && h5.router) || {}),
                };
                if (!router.base) {
                    router.base = '/';
                }
                /**
                 * ssr时base和访问域名不一致导致跳到错误链接，其实应该区分server和client的部署路径，后续有需求可以加上
                 */
                router.routerBase = new URL(router.base, 'http://localhost').pathname;
                const async = { ...defaultAsync, ...((h5 && h5.async) || {}) };
                const networkTimeout = (0, uni_cli_shared_1.normalizeNetworkTimeout)(manifest.networkTimeout);
                const sdkConfigs = (h5 && h5.sdkConfigs) || {};
                const qqMapKey = sdkConfigs.maps && sdkConfigs.maps.qqmap && sdkConfigs.maps.qqmap.key;
                const googleMapKey = sdkConfigs.maps &&
                    sdkConfigs.maps.google &&
                    sdkConfigs.maps.google.key;
                const aMapKey = sdkConfigs.maps && sdkConfigs.maps.amap && sdkConfigs.maps.amap.key;
                const aMapSecurityJsCode = sdkConfigs.maps &&
                    sdkConfigs.maps.amap &&
                    sdkConfigs.maps.amap.securityJsCode;
                const aMapServiceHost = sdkConfigs.maps &&
                    sdkConfigs.maps.amap &&
                    sdkConfigs.maps.amap.serviceHost;
                let locale = manifest.locale;
                locale = locale && locale.toUpperCase() !== 'AUTO' ? locale : '';
                const i18nOptions = (0, uni_cli_shared_1.initI18nOptions)(process.env.UNI_PLATFORM, process.env.UNI_INPUT_DIR, false, false);
                const fallbackLocale = (i18nOptions && i18nOptions.locale) || '';
                const flexDirection = (manifest['app'] &&
                    manifest['app'].nvue &&
                    manifest['app'].nvue['flex-direction']) ||
                    'column';
                const platformConfig = manifest[process.env.UNI_PLATFORM === 'app'
                    ? 'app-plus'
                    : process.env.UNI_PLATFORM] || {};
                return {
                    code: `export const appId = ${JSON.stringify(manifest.appid || '')}
  export const appName = ${JSON.stringify(manifest.name || '')}
  export const appVersion = ${JSON.stringify(manifest.versionName || '')}
  export const appVersionCode = ${JSON.stringify(manifest.versionCode || '')}

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
  export const aMapKey = ${JSON.stringify(aMapKey)}
  export const aMapSecurityJsCode = ${JSON.stringify(aMapSecurityJsCode)}
  export const aMapServiceHost = ${JSON.stringify(aMapServiceHost)}
  export const sdkConfigs = ${JSON.stringify(sdkConfigs)}
  export const locale = '${locale}'
  export const fallbackLocale = '${fallbackLocale}'
  export const darkmode = ${platformConfig.darkmode || 'false'}
  export const themeConfig = ${JSON.stringify((0, uni_cli_shared_1.normalizeThemeConfigOnce)(platformConfig))}
  `,
                    map: { mappings: '' },
                };
            },
        };
    });
}
exports.uniManifestJsonPlugin = uniManifestJsonPlugin;
