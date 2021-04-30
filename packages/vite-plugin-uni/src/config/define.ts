import { ConfigEnv, UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'
import {
  parsePagesJsonOnce,
  parseManifestJsonOnce,
} from '@dcloudio/uni-cli-shared'
import { initFeatures } from '../utils'

export function createDefine(
  { inputDir, platform }: VitePluginUniResolvedOptions,
  { server }: UserConfig,
  { command }: ConfigEnv
): UserConfig['define'] {
  const features = initFeatures({
    inputDir,
    command,
    platform,
    pagesJson: parsePagesJsonOnce(inputDir, platform),
    manifestJson: parseManifestJsonOnce(inputDir),
  })
  if (server && server.middlewareMode) {
    Object.assign(globalThis, features)
  }
  return features
}
