import path from 'path'
import type { Plugin, ResolvedConfig } from 'vite'
import type { CompilerOptions } from '@vue/compiler-sfc'
import {
  defineUniPagesJsonPlugin,
  normalizeAppConfigService,
  normalizePagesJson,
  parseManifestJsonOnce,
  getLocaleFiles,
  normalizeAppNVuePagesJson,
  APP_CONFIG_SERVICE,
  resolveBuiltIn,
  normalizePath,
} from '@dcloudio/uni-cli-shared'

interface NVuePages {
  [filename: string]: {
    disableScroll?: boolean
    scrollIndicator?: 'none'
  }
}

export const nvuePagesCache = new Map<ResolvedConfig, NVuePages>()
// 在 @vue/compiler-sfc@3.2.47 执行前重写 @vue/compiler-dom compile 方法
const nvuePages: NVuePages = {}
rewriteBindingMetadata(nvuePages)

export function uniPagesJsonPlugin({
  renderer,
  appService,
}: {
  renderer?: 'native'
  appService: boolean
}): Plugin {
  return defineUniPagesJsonPlugin((opts) => {
    return {
      name: 'uni:app-nvue-pages-json',
      enforce: 'pre',
      configResolved(config) {
        nvuePagesCache.set(config, nvuePages)
      },
      transform(code, id) {
        if (!opts.filter(id)) {
          return
        }
        this.addWatchFile(path.resolve(process.env.UNI_INPUT_DIR, 'pages.json'))
        getLocaleFiles(
          path.resolve(process.env.UNI_INPUT_DIR, 'locale')
        ).forEach((filepath) => {
          this.addWatchFile(filepath)
        })
        const pagesJson = normalizePagesJson(code, process.env.UNI_PLATFORM)
        Object.keys(nvuePages).forEach((name) => {
          delete nvuePages[name]
        })
        pagesJson.pages.forEach((page) => {
          if (page.style.isNVue) {
            const filename = normalizePath(
              path.resolve(process.env.UNI_INPUT_DIR, page.path + '.nvue')
            )
            nvuePages[filename] = {
              disableScroll: page.style.disableScroll,
              scrollIndicator: page.style.scrollIndicator,
            }
            this.addWatchFile(filename)
          }
        })
        if (renderer === 'native' && appService) {
          this.emitFile({
            fileName: APP_CONFIG_SERVICE,
            type: 'asset',
            source: normalizeAppConfigService(
              pagesJson,
              parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
            ),
          })
          return {
            code: '',
            map: { mappings: '' },
          }
        }
        return {
          code: normalizeAppNVuePagesJson(pagesJson),
          map: { mappings: '' },
        }
      },
    }
  })
}

/**
 * 在 BindingMetadata 中补充页面标记
 */
function rewriteBindingMetadata(nvuePages: NVuePages) {
  const compilerDom = require(resolveBuiltIn('@vue/compiler-dom'))
  const { compile } = compilerDom
  compilerDom.compile = (template: string, options: CompilerOptions = {}) => {
    if (options.filename) {
      if (nvuePages[options.filename]) {
        ;(
          options.bindingMetadata || ((options.bindingMetadata = {}) as any)
        ).__pageOptions = nvuePages[options.filename]
      }
    }
    return compile(template, options)
  }
}
