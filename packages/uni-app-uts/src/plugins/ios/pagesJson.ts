import path from 'path'
import fs from 'fs-extra'
import {
  APP_CONFIG,
  PAGES_JSON_UTS,
  normalizeAppPagesJson,
  normalizePath,
  normalizeUniAppXAppConfig,
  normalizeUniAppXAppPagesJson,
  parseManifestJsonOnce,
  parseVueRequest,
  removeExt,
  runByHBuilderX,
} from '@dcloudio/uni-cli-shared'
import type { Plugin } from 'vite'
import { isPages } from '../utils'
import { isVue } from '../android/utils'

export function uniAppPagesPlugin(): Plugin {
  const pagesJsonPath = path.resolve(process.env.UNI_INPUT_DIR, 'pages.json')
  const pagesJsonUTSPath = path.resolve(
    process.env.UNI_INPUT_DIR,
    PAGES_JSON_UTS
  )

  let allPagePaths: string[] = []
  let isFirst = true
  return {
    name: 'uni:app-pages',
    apply: 'build',
    resolveId(id) {
      if (isPages(id)) {
        return pagesJsonUTSPath
      }
    },
    load(id) {
      if (isPages(id)) {
        return fs.readFileSync(pagesJsonPath, 'utf8')
      }
    },
    transform(code, id) {
      if (isFirst && allPagePaths.length) {
        const { filename } = parseVueRequest(id)
        if (isVue(filename)) {
          const vueFilename = removeExt(
            normalizePath(path.relative(process.env.UNI_INPUT_DIR, filename))
          )
          // 项目内的
          if (!vueFilename.startsWith('.')) {
            // const index = allPagePaths.indexOf(pagePath)
            // if (index > -1) {
            console.log(
              `当前工程${allPagePaths.length}个页面，正在编译${vueFilename}...${
                runByHBuilderX() ? '\u200b' : '\r'
              }`
            )
            // }
          }
        }
      }
      if (isPages(id)) {
        this.addWatchFile(path.resolve(process.env.UNI_INPUT_DIR, 'pages.json'))
        const pagesJson = normalizeUniAppXAppPagesJson(code)

        allPagePaths = pagesJson.pages.map((p) => p.path)

        this.emitFile({
          fileName: APP_CONFIG,
          type: 'asset',
          source: normalizeUniAppXAppConfig(
            pagesJson,
            parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
          ),
        })
        return {
          code: normalizeAppPagesJson(pagesJson),
          map: null,
        }
      }
    },
    buildEnd() {
      isFirst = false
    },
  }
}
