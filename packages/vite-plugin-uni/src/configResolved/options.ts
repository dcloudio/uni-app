import type { VitePluginUniResolvedOptions } from '..'
import type { ResolvedConfig } from 'vite'
import {
  getPlatformManifestJson,
  parseManifestJsonOnce,
} from '@dcloudio/uni-cli-shared'

function resolveBase() {
  const manifest = parseManifestJsonOnce(process.env.UNI_INPUT_DIR!)
  const webManifest = getPlatformManifestJson(manifest, 'h5')
  return (webManifest && webManifest.router && webManifest.router.base) || '/'
}

export function initOptions(
  options: VitePluginUniResolvedOptions,
  config: ResolvedConfig
) {
  options.base = resolveBase()
  options.outputDir = process.env.UNI_OUTPUT_DIR
  options.assetsDir = config.build.assetsDir
}
