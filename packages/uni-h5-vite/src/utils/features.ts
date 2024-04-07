import type { ConfigEnv, UserConfig } from 'vite'
import {
  initFeatures,
  isSsr,
  parseManifestJsonOnce,
  parsePagesJsonOnce,
} from '@dcloudio/uni-cli-shared'
import { isSsrManifest } from './ssr'

export function createDefine(
  command: ConfigEnv['command'],
  config: UserConfig
): UserConfig['define'] {
  const platform = process.env.UNI_PLATFORM
  const inputDir = process.env.UNI_INPUT_DIR
  return initFeatures({
    inputDir,
    command,
    platform,
    pagesJson: parsePagesJsonOnce(inputDir, platform),
    manifestJson: parseManifestJsonOnce(inputDir),
    ssr: isSsr(command, config) || isSsrManifest(command, config),
  })
}
