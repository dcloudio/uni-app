import path from 'path'
import { ResolvedConfig } from 'vite'

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
}
