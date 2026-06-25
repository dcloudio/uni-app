import {
  parseIndependentSubPackages,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import type { Plugin } from 'vite'
import type { UniMiniProgramPluginOptions } from '../plugin'
import { withIndependentRoot } from './independentUtils'

const INDEPENDENT_MAIN_PREFIX = '\0uni:mp-independent-main'
const APP_FACTORY_PREFIX = '\0uni:mp-app-factory'

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
      const appFactoryRoot = parseAppFactoryRoot(id)
      if (appFactoryRoot && independentRoots.has(appFactoryRoot)) {
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
      const appFactoryRoot = parseAppFactoryRoot(id)
      if (appFactoryRoot && independentRoots.has(appFactoryRoot)) {
        const mainPath = withIndependentRoot(
          resolveMainPathOnce(inputDir),
          appFactoryRoot
        )
        return {
          code: `export { createApp } from ${JSON.stringify(mainPath)}\n`,
          map: { mappings: '' },
        }
      }
    },
  }
}

function parseIndependentMainRoot(id: string) {
  return parseVirtualRoot(id, INDEPENDENT_MAIN_PREFIX)
}

function parseAppFactoryRoot(id: string) {
  return parseVirtualRoot(id, APP_FACTORY_PREFIX)
}

function parseVirtualRoot(id: string, prefix: string) {
  if (!id.startsWith(prefix)) {
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
