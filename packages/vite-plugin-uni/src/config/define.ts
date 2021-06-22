import { UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

export function createDefine({
  platform,
}: VitePluginUniResolvedOptions): UserConfig['define'] {
  return {
    'process.env.UNI_PLATFORM': JSON.stringify(platform),
  }
}
