import { ConfigEnv, UserConfig } from 'vite'
import {
  parsePagesJsonOnce,
  parseManifestJsonOnce,
  initFeatures,
} from '@dcloudio/uni-cli-shared'
import { isSsr, isSsrManifest } from './ssr'

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
