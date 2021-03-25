import { ConfigEnv, UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'
import { getFeatures } from '../utils'

export function createDefine(
  options: VitePluginUniResolvedOptions,
  env: ConfigEnv
): UserConfig['define'] {
  return getFeatures(options, env.command)
}
