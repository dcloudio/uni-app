import { UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

export function createDefine(
  options: VitePluginUniResolvedOptions
): UserConfig['define'] {
  return {
    __UNI_WX_API__: true,
    __UNI_WXS_API__: true,
    __UNI_PROMISE_API__: !!(options.feature && options.feature.promise),
    __UNI_ROUTER_MODE__: JSON.stringify('hash'),
  }
}
