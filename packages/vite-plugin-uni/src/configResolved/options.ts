import type { VitePluginUniResolvedOptions } from '..'
import type { ResolvedConfig } from 'vite'
import { parseManifestJsonOnce } from '@dcloudio/uni-cli-shared'

function resolveBase() {
  const manifest = parseManifestJsonOnce(process.env.UNI_INPUT_DIR!)
  return (manifest.h5 && manifest.h5.router && manifest.h5.router.base) || '/'
}

export function initOptions(
  options: VitePluginUniResolvedOptions,
  config: ResolvedConfig
) {
  options.base = resolveBase()
  options.outputDir = process.env.UNI_OUTPUT_DIR
  options.assetsDir = config.build.assetsDir
}
