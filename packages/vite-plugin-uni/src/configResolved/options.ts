import fs from 'fs'
import path from 'path'
import { parse } from 'jsonc-parser'
import type { VitePluginUniResolvedOptions } from '..'
import type { ResolvedConfig } from 'vite'

function resolveBase() {
  const manifest = parse(
    fs.readFileSync(
      path.join(process.env.UNI_INPUT_DIR!, 'manifest.json'),
      'utf8'
    )
  )
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
