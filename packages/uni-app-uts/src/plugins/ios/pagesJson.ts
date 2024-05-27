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
import { isPages, setGlobalPageOrientation } from '../utils'
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
            if (runByHBuilderX()) {
              console.log(
                `当前工程${
                  allPagePaths.length
                }个页面，正在编译${vueFilename}...${'\u200b'}`
              )
            }
            // }
          }
        }
      }
      if (isPages(id)) {
        this.addWatchFile(path.resolve(process.env.UNI_INPUT_DIR, 'pages.json'))
        // dark mode
        this.addWatchFile(path.resolve(process.env.UNI_INPUT_DIR, 'theme.json'))

        // pages.json
        const pagesJson = normalizeUniAppXAppPagesJson(code)

        // add themeConfig - can move to uni-x/index.ts
        pagesJson.themeConfig = readThemeJSONFile()

        setGlobalPageOrientation(pagesJson.globalStyle?.pageOrientation || '')

        allPagePaths = pagesJson.pages.map((p) => p.path)

        this.emitFile({
          fileName: APP_CONFIG,
          type: 'asset',
          // 生成 app-config.js
          source: normalizeUniAppXAppConfig(
            pagesJson,
            parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
          ),
        })
        return {
          code: normalizeAppPagesJson(pagesJson),
          map: { mappings: '' },
        }
      }
    },
    buildEnd() {
      isFirst = false
    },
  }
}

function readThemeJSONFile() {
  try {
    // 后续读取 theme location
    const themeJsonPath = path.resolve(process.env.UNI_INPUT_DIR, 'theme.json')
    let content = '{}'
    if (fs.existsSync(themeJsonPath)) {
      content = fs.readFileSync(themeJsonPath, 'utf8')
    }
    return JSON.parse(content)
  } catch (error) {
    console.error('read theme.json error:', error)
  }
}
