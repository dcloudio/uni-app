import { VitePluginUniResolvedOptions } from '.'

const defaultPlatform = 'h5'

export function initEnv(_options: VitePluginUniResolvedOptions) {
  process.env.UNI_PLATFORM = process.env.UNI_PLATFORM || defaultPlatform
}
