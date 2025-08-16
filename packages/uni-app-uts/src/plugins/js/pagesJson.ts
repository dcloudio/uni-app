import path from 'path'
import fs from 'fs-extra'
import {
  APP_CONFIG,
  PAGES_JSON_UTS,
  checkPagesJson,
  createRollupError,
  normalizeAppPagesJson,
  normalizePath,
  normalizeUniAppXAppConfig,
  normalizeUniAppXAppPagesJson,
  parseManifestJsonOnce,
  parseVueRequest,
  preUVueJson,
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
    name: 'uni:app-pages-json',
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
                }个页面，正在编译${vueFilename}...${'\u200D'}`
              )
            }
            // }
          }
        }
      }
      if (isPages(id)) {
        // 调整换行符，确保 parseTree 的loc正确
        const jsonCode = code.replace(/\r\n/g, '\n')
        try {
          checkPagesJson(
            preUVueJson(jsonCode, 'pages.json'),
            process.env.UNI_INPUT_DIR
          )
        } catch (err: any) {
          if (err.loc) {
            const error = createRollupError(
              'uni:app-pages',
              pagesJsonPath,
              err,
              jsonCode
            )
            this.error(error)
          } else {
            throw err
          }
        }

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
          code: normalizeAppPagesJson(
            pagesJson,
            'app',
            process.env.UNI_APP_DYNAMIC_IMPORT === 'true' ||
              process.env.UNI_APP_CODE_SPLITTING === 'true'
          ),
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
