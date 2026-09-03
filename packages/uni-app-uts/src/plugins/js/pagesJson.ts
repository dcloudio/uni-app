import path from 'path'
import fs from 'fs-extra'
import {
  APP_CONFIG,
  PAGES_JSON_UTS,
  checkPagesJson,
  normalizeAppPagesJson,
  normalizePath,
  normalizeUniAppXAppConfig,
  normalizeUniAppXAppPagesJson,
  parseManifestJsonOnce,
  parseVueRequest,
  preUVueJson,
  removeExt,
  runByHBuilderX,
  staticImportPageCode,
} from '@dcloudio/uni-cli-shared'
import type { Plugin } from 'vite'
import { isPages, setGlobalPageOrientation } from '../utils'
import { isVue } from '../utils'

export function uniAppPagesPlugin(): Plugin {
  const pagesJsonPath = path.resolve(process.env.UNI_INPUT_DIR, 'pages.json')
  const pagesJsonUTSPath = path.resolve(
    process.env.UNI_INPUT_DIR,
    PAGES_JSON_UTS
  )

  const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

  let allPagePaths: string[] = []
  let isFirst = true
  const loggedPagePaths = new Set<string>()
  return {
    name: 'uni:app-pages-json',
    apply: 'build',
    buildStart() {
      // 进度日志按一次构建记录页面，避免插件实例复用时沿用上一轮记录。
      if (isFirst) {
        loggedPagePaths.clear()
      }
    },
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
    watchChange(id) {
      if (isDom2 && normalizePath(id) === normalizePath(pagesJsonPath)) {
        // dom2 下 pages.json 变更需要页面模板重新编译，并走全量更新通知。
        process.env.UNI_APP_X_DOM2_PAGES_JSON_CHANGED = 'true'
      }
    },
    transform(code, id) {
      if (isFirst && allPagePaths.length) {
        const { filename, query } = parseVueRequest(id)
        // 只记录 SFC 主请求，?vue&type=... 是同一个文件的内部子模块。
        if (isVue(filename) && !query.vue) {
          const vueFilename = removeExt(
            normalizePath(path.relative(process.env.UNI_INPUT_DIR, filename))
          )
          // 项目内的
          if (!vueFilename.startsWith('.')) {
            if (!loggedPagePaths.has(vueFilename)) {
              loggedPagePaths.add(vueFilename)
              if (runByHBuilderX()) {
                console.log(
                  `当前工程${
                    allPagePaths.length
                  }个页面，正在编译${vueFilename}...${'\u200D'}`
                )
              }
            }
          }
        }
      }
      if (isPages(id)) {
        this.addWatchFile(path.resolve(process.env.UNI_INPUT_DIR, 'pages.json'))
        // dark mode
        this.addWatchFile(path.resolve(process.env.UNI_INPUT_DIR, 'theme.json'))
        // 调整换行符，确保 parseTree 的loc正确
        const jsonCode = code.replace(/\r\n/g, '\n')
        checkPagesJson(
          preUVueJson(jsonCode, 'pages.json'),
          process.env.UNI_INPUT_DIR
        )

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
        if (process.env.UNI_PLATFORM === 'app-harmony') {
          this.emitFile({
            type: 'asset',
            fileName: 'import/dynamic.ets',
            source:
              process.env.UNI_APP_DYNAMIC_IMPORT === 'true'
                ? staticImportPageCode(pagesJson)
                : '',
          })
        }
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
