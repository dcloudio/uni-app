"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniManifestJsonPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const defaultRouter = {
    mode: 'hash',
    base: '/',
};
const defaultAsync = {
    loading: 'AsyncLoading',
    error: 'AsyncError',
    delay: 200,
    timeout: 60000,
    suspensible: true,
};
const defaultQQMapKey = 'XVXBZ-NDMC4-JOGUS-XGIEE-QVHDZ-AMFV2';
function uniManifestJsonPlugin() {
    return uni_cli_shared_1.defineUniManifestJsonPlugin((opts) => {
        return {
            name: 'vite:uni-h5-manifest-json',
            enforce: 'pre',
            transform(code, id) {
                if (!opts.filter(id)) {
                    return;
                }
                const manifest = uni_cli_shared_1.parseJson(code);
                const { debug, h5 } = manifest;
                const appid = (manifest.appid || '').replace('__UNI__', '');
                const router = { ...defaultRouter, ...((h5 && h5.router) || {}) };
                if (!router.base) {
                    router.base = '/';
                }
                const async = { ...defaultAsync, ...((h5 && h5.async) || {}) };
                const networkTimeout = uni_cli_shared_1.normalizeNetworkTimeout(manifest.networkTimeout);
                const sdkConfigs = (h5 && h5.sdkConfigs) || {};
                const qqMapKey = (sdkConfigs.maps &&
                    sdkConfigs.maps.qqmap &&
                    sdkConfigs.maps.qqmap.key) ||
                    defaultQQMapKey;
                const flexDirection = (manifest['app'] &&
                    manifest['app'].nvue &&
                    manifest['app'].nvue['flex-direction']) ||
                    'column';
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
                };
            },
        };
    });
}
exports.uniManifestJsonPlugin = uniManifestJsonPlugin;
