import { UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

export function createDefine({
  platform,
}: VitePluginUniResolvedOptions): UserConfig['define'] {
  return {
    __VUE_PROD_DEVTOOLS__: false,
    'process.env.UNI_PLATFORM': JSON.stringify(platform),
  }
}
