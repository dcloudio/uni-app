import fs from 'fs'
import path from 'path'
import type { ResolvedConfig } from 'vite'

import { getPlatformManifestJsonOnce } from '@dcloudio/uni-cli-shared'

export function initEnv(config: ResolvedConfig) {
  if (!process.env.UNI_PLATFORM) {
    process.env.UNI_PLATFORM = 'h5'
  }
  if (!process.env.UNI_CLI_CONTEXT) {
    process.env.UNI_CLI_CONTEXT = process.cwd()
  }
  if (!process.env.UNI_INPUT_DIR) {
    process.env.UNI_INPUT_DIR = path.resolve(config.root, 'src')
  }
  if (!process.env.UNI_OUTPUT_DIR) {
    process.env.UNI_OUTPUT_DIR = path.resolve(config.root, config.build.outDir)
  }
  process.env.VUE_APP_DARK_MODE =
    getPlatformManifestJsonOnce().darkmode || false

  process.env.BROWSERSLIST_CONFIG = [
    path.resolve(process.env.UNI_INPUT_DIR, '.browserslistrc'),
    path.resolve(process.env.UNI_CLI_CONTEXT, 'package.json'),
    path.resolve(process.cwd(), 'package.json'),
  ].find((file) => fs.existsSync(file))
}
