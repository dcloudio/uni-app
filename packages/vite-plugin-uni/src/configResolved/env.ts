import path from 'path'
import { ResolvedConfig } from 'vite'

import { M } from '@dcloudio/uni-cli-shared'

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
  if (!config.isProduction) {
    console.log(
      M['dev.performance'] +
        (process.env.UNI_PLATFORM.startsWith('mp-')
          ? M['dev.performance.mp']
          : '')
    )
  }
}
