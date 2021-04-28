import { ConfigEnv, UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'
import {
  parsePagesJsonOnce,
  parseManifestJsonOnce,
} from '@dcloudio/uni-cli-shared'
import { initFeatures } from '../utils'

export function createDefine(
  { inputDir, platform }: VitePluginUniResolvedOptions,
  { command }: ConfigEnv
): UserConfig['define'] {
  return initFeatures({
    inputDir,
    command,
    platform,
    pagesJson: parsePagesJsonOnce(inputDir, platform),
    manifestJson: parseManifestJsonOnce(inputDir),
  })
}
