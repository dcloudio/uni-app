import path from 'path'
import debug from 'debug'
import { Plugin, ResolvedConfig } from 'vite'
import { normalizePath, resolveMainPathOnce } from '../../utils'
import { EXTNAME_VUE_RE } from '../../constants'
import { minifyCSS } from './vitejs/plugins/css'

const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`
const cssLangRE = new RegExp(cssLangs)
// const cssModuleRE = new RegExp(`\\.module${cssLangs}`)
// const directRequestRE = /(\?|&)direct\b/
const commonjsProxyRE = /\?commonjs-proxy/

const debugCss = debug('vite:uni:css')

// const isCSSRequest = (request: string): boolean =>
//   cssLangRE.test(request) && !directRequestRE.test(request)

const isCss = (id: string): boolean =>
  cssLangRE.test(id) && !commonjsProxyRE.test(id)

function normalizeCssChunkFilename(id: string) {
  return normalizePath(
    path.relative(
      process.env.UNI_INPUT_DIR,
      id.split('?')[0].replace(EXTNAME_VUE_RE, '.css')
    )
  )
}

interface UniCssPluginOptions {
  /**
   * 额外的全局样式
   */
  app: string
}

export function uniCssPlugin({ app }: UniCssPluginOptions): Plugin {
  const styles: Map<string, string> = new Map<string, string>()
  let cssChunks: Map<string, Set<string>>
  let resolvedConfig: ResolvedConfig
  return {
    name: 'vite:uni-app-css',
    configResolved(config) {
      resolvedConfig = config
    },
    buildStart() {
      cssChunks = new Map<string, Set<string>>()
    },
    transform(css, id) {
      if (!isCss(id)) {
        return
      }
      debugCss(id)
      styles.set(id, css)
      return {
        code: '',
        map: { mappings: '' },
        moduleSideEffects: 'no-treeshake',
      }
    },
    async generateBundle() {
      const findCssModuleIds = (
        moduleId: string,
        cssModuleIds?: Set<string>
      ) => {
        if (!cssModuleIds) {
          cssModuleIds = new Set<string>()
        }
        const moduleInfo = this.getModuleInfo(moduleId)
        if (moduleInfo) {
          moduleInfo.importedIds.forEach((id) => {
            if (id.includes('pages.json.js')) {
              // 查询main.js时，需要忽略pages.json.js，否则会把所有页面样式加进来
              return
            }
            if (isCss(id)) {
              cssModuleIds!.add(id)
            } else {
              findCssModuleIds(id, cssModuleIds)
            }
          })
        }
        return cssModuleIds
      }
      const moduleIds = Array.from(this.getModuleIds())
      const mainPath = resolveMainPathOnce(process.env.UNI_INPUT_DIR)
      moduleIds.forEach((id) => {
        if (id === mainPath) {
          // 全局样式
          cssChunks.set('app.css', findCssModuleIds(id))
        } else if (id.includes('mpType=page')) {
          // 页面样式
          cssChunks.set(normalizeCssChunkFilename(id), findCssModuleIds(id))
        }
      })
      if (!cssChunks.size) {
        return
      }
      const genCssCode = (fileName: string) => {
        return [...cssChunks.get(fileName)!]
          .map((id) => styles.get(id) || '')
          .join('\n')
      }
      for (const fileName of cssChunks.keys()) {
        let source =
          (fileName === 'app.css' ? app + '\n' : '') + genCssCode(fileName)
        if (resolvedConfig.build.minify) {
          source = await minifyCSS(source, resolvedConfig)
        }
        this.emitFile({
          fileName,
          type: 'asset',
          source,
        })
      }
    },
  }
}
