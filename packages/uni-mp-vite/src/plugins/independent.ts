import { parseIndependentSubPackages } from '@dcloudio/uni-cli-shared'
import type { Plugin } from 'vite'
import type { UniMiniProgramPluginOptions } from '../plugin'

const INDEPENDENT_MAIN_PREFIX = '\0uni:mp-independent-main'

export function uniIndependentSubpackagePlugin(
  _options: UniMiniProgramPluginOptions
): Plugin {
  const inputDir = process.env.UNI_INPUT_DIR
  let independentRoots = new Set<string>()
  return {
    name: 'uni:mp-independent-subpackage',
    enforce: 'pre',
    buildStart() {
      independentRoots = new Set(
        parseIndependentSubPackages(inputDir).map(({ root }) => root)
      )
    },
    resolveId(id) {
      const root = parseIndependentMainRoot(id)
      if (root && independentRoots.has(root)) {
        return id
      }
    },
    load(id) {
      const root = parseIndependentMainRoot(id)
      if (root && independentRoots.has(root)) {
        return {
          code: `import 'uni-mp-runtime'\n`,
          map: { mappings: '' },
        }
      }
    },
  }
}

function parseIndependentMainRoot(id: string) {
  if (!id.startsWith(INDEPENDENT_MAIN_PREFIX)) {
    return
  }
  const queryIndex = id.indexOf('?')
  if (queryIndex === -1) {
    return
  }
  const query = id.slice(queryIndex + 1)
  for (const item of query.split('&')) {
    const [name, value = ''] = item.split('=')
    if (name === 'root') {
      return decodeURIComponent(value)
    }
  }
}
