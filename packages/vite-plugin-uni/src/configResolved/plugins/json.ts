import path from 'path'
import slash from 'slash'
import { Plugin } from 'vite'
import { parse } from 'jsonc-parser'
import { VitePluginUniResolvedOptions } from '../..'

export function uniJsonPlugin(options: VitePluginUniResolvedOptions): Plugin {
  const pagesJsonPath = slash(path.resolve(options.inputDir, 'pages.json'))
  const manifestJsonPath = slash(
    path.resolve(options.inputDir, 'manifest.json')
  )
  return {
    name: 'vite:uni-json',
    transform(code, id) {
      if (
        (id.startsWith(pagesJsonPath) || id.startsWith(manifestJsonPath)) &&
        !id.endsWith('.json.js')
      ) {
        code = JSON.stringify(parse(code))
      }
      return code
    },
  }
}
