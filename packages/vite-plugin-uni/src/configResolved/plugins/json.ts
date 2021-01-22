import path from 'path'
import slash from 'slash'
import { Plugin } from 'vite'
import { parse } from 'jsonc-parser'
import { VitePluginUniResolvedOptions } from '../..'
import { jsonPlugin } from './baseJson'

export function uniJsonPlugin(options: VitePluginUniResolvedOptions): Plugin {
  const vitePluginJson = jsonPlugin({ preferConst: true, namedExports: true })
  const pagesJsonPath = slash(path.resolve(options.inputDir, 'pages.json'))
  return {
    name: 'vite:uni-json',
    transform(code, id) {
      if (id.startsWith(pagesJsonPath)) {
        code = JSON.stringify(parse(code))
      }
      return vitePluginJson.transform!.call(this, code, id)
    },
  }
}
