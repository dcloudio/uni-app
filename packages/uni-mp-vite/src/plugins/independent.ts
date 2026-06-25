import {
  parseIndependentSubPackages,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import type { Plugin } from 'vite'
import type { UniMiniProgramPluginOptions } from '../plugin'
import { withIndependentRoot } from './independentUtils'

const INDEPENDENT_MAIN_PREFIX = '\0uni:mp-independent-main'
const APP_FACTORY_PREFIX = '\0uni:mp-app-factory'
const INDEPENDENT_PAGES_PREFIX = '\0uni:mp-independent-pages'

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
      const pagesRoot = parseIndependentPagesRoot(id)
      if (pagesRoot && independentRoots.has(pagesRoot)) {
        return id
      }
    },
    load(id) {
      const root = parseIndependentMainRoot(id)
      if (root && independentRoots.has(root)) {
        return {
          code: generateIndependentMainCode(root),
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
      const pagesRoot = parseIndependentPagesRoot(id)
      if (pagesRoot && independentRoots.has(pagesRoot)) {
        return {
          code: '',
          map: { mappings: '' },
        }
      }
    },
  }
}

function generateIndependentMainCode(root: string) {
  const encodedRoot = encodeURIComponent(root)
  return `import ${JSON.stringify(withIndependentRoot('uni-mp-runtime', root))}
import { createApp as createUserApp } from ${JSON.stringify(
    `${APP_FACTORY_PREFIX}?root=${encodedRoot}`
  )}
import ${JSON.stringify(`${INDEPENDENT_PAGES_PREFIX}?root=${encodedRoot}`)}

const __uniSubpackageRoot = ${JSON.stringify(root)}
const __uniGlobal = typeof globalThis !== 'undefined' ? globalThis : global
try {
  __uniGlobal.__uniSubpackageRoot = __uniSubpackageRoot
  createUserApp().app.mount('#app')
} finally {
  __uniGlobal.__uniSubpackageRoot = ''
}
`
}

function parseIndependentMainRoot(id: string) {
  return parseVirtualRoot(id, INDEPENDENT_MAIN_PREFIX)
}

function parseAppFactoryRoot(id: string) {
  return parseVirtualRoot(id, APP_FACTORY_PREFIX)
}

function parseIndependentPagesRoot(id: string) {
  return parseVirtualRoot(id, INDEPENDENT_PAGES_PREFIX)
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
