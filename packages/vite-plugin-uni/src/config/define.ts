import { UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

export function createDefine(
  _options: VitePluginUniResolvedOptions
): UserConfig['define'] {
  return {
    __UNI_WX_API__: true,
    __UNI_WXS_API__: true,
    __UNI_ROUTER_MODE__: JSON.stringify('hash'),
  }
}
