const fs = require('fs')
const path = require('path')

const loaderUtils = require('loader-utils')

const {
  parsePages,
  normalizePath,
  parsePagesJson,
  parseManifestJson
} = require('@dcloudio/uni-cli-shared')

const {
  updateAppJson,
  updatePageJson,
  updateProjectJson
} = require('@dcloudio/uni-cli-shared/lib/cache')

const {
  initTheme,
  parseTheme
} = require('@dcloudio/uni-cli-shared/lib/theme')

const {
  // pagesJsonJsFileName,
  initAutoImportComponents
} = require('@dcloudio/uni-cli-shared/lib/pages')

const uniI18n = require('@dcloudio/uni-cli-i18n')

const parseStyle = require('./util').parseStyle

const {
  initI18nOptions
} = require('@dcloudio/uni-cli-shared/lib/i18n')
const {
  parseI18nJson
} = require('@dcloudio/uni-i18n')

// 将开发者手动设置的 usingComponents 调整名称，方便与自动解析到的 usingComponents 做最后合并
function renameUsingComponents (jsonObj) {
  if (jsonObj.usingComponents) {
    jsonObj.customUsingComponents = jsonObj.usingComponents
    delete jsonObj.usingComponents
  }
  return jsonObj
}

module.exports = function (content, map) {
  this.cacheable && this.cacheable()

  initTheme()

  let isAppView = false
  if (this.resourceQuery) {
    const params = loaderUtils.parseQuery(this.resourceQuery)
    isAppView = params.type === 'view'
  }

  // const pagesJsonJsPath = path.resolve(process.env.UNI_INPUT_DIR, pagesJsonJsFileName)
  const manifestJsonPath = path.resolve(
    process.env.UNI_INPUT_DIR,
    'manifest.json'
  )
  const manifestJson = parseManifestJson(
    fs.readFileSync(manifestJsonPath, 'utf8')
  )

  // this.addDependency(pagesJsonJsPath)
  this.addContextDependency(path.resolve(process.env.UNI_INPUT_DIR, 'locale'))
  this.addDependency(manifestJsonPath)

  let pagesJson = parsePagesJson(content, {
    addDependency: file => {
      (process.UNI_PAGES_DEPS || (process.UNI_PAGES_DEPS = new Set())).add(
        normalizePath(file)
      )
      this.addDependency(file)
    }
  })

  if (!pagesJson.pages || pagesJson.pages.length === 0) {
    console.error(uniI18n.__('pagesLoader.pagesNodeCannotNull'))
    process.exit(0)
  }

  if (global.uniPlugin.defaultTheme) {
    pagesJson = parseTheme(pagesJson)
    this.addDependency(path.resolve(process.env.UNI_INPUT_DIR, 'theme.json'))
  }

  // 组件自动导入配置
  process.UNI_AUTO_SCAN_COMPONENTS = !(
    pagesJson.easycom && pagesJson.easycom.autoscan === false
  )
  initAutoImportComponents(pagesJson.easycom)

  // TODO 与 usingComponents 放在一块读取设置
  if (manifestJson.transformPx === false) {
    process.UNI_TRANSFORM_PX = false
  } else {
    process.UNI_TRANSFORM_PX = true
  }

  if (process.env.UNI_PLATFORM === 'h5') {
    return this.callback(
      null,
      require('./platforms/h5')(pagesJson, manifestJson, this),
      map
    )
  }
  if (process.env.UNI_PLATFORM === 'quickapp-native') {
    return this.callback(
      null,
      require('./platforms/quickapp-native')(pagesJson, manifestJson, this),
      map
    )
  }
  // 仅限小程序
  if (process.env.UNI_PLATFORM !== 'app-plus') {
    const i18nOptions = initI18nOptions(
      process.env.UNI_PLATFORM,
      process.env.UNI_INPUT_DIR,
      true,
      true
    )
    if (i18nOptions) {
      const {
        locale,
        locales,
        delimiters
      } = i18nOptions
      parseI18nJson(pagesJson, locales[locale], delimiters)
    }
  }
  if (!process.env.UNI_USING_V3) {
    parsePages(
      pagesJson,
      function (page) {
        updatePageJson(
          page.path,
          renameUsingComponents(parseStyle(page.style))
        )
      },
      function (root, page) {
        updatePageJson(
          normalizePath(path.join(root, page.path)),
          renameUsingComponents(parseStyle(page.style, root))
        )
      }
    )
  }

  const jsonFiles = require('./platforms/' + process.env.UNI_PLATFORM)(
    pagesJson,
    manifestJson,
    isAppView
  )

  if (jsonFiles && jsonFiles.length) {
    if (process.env.UNI_USING_V3) {
      let appConfigContent = ''
      jsonFiles.forEach(jsonFile => {
        if (jsonFile) {
          if (!isAppView && jsonFile.name === 'manifest.json') {
            const content = JSON.parse(jsonFile.content)
            if (
              !content.launch_path &&
              content.plus['uni-app'].nvueLaunchMode === 'fast'
            ) {
              console.log(
                uniI18n.__('pagesLoader.nvueFirstPageStartModeIsFast', {
                  0: 'https://ask.dcloud.net.cn/article/36749'
                })
              )
            }
          }
          if (jsonFile.name === 'define-pages.js') {
            appConfigContent = jsonFile.content
          } else {
            // app-view 不需要生成 app-config-service.js,manifest.json
            !isAppView && this.emitFile(jsonFile.name, jsonFile.content)
          }
        }
      })
      return this.callback(null, appConfigContent, map)
    }
    if (process.env.UNI_USING_NATIVE || process.env.UNI_USING_V3_NATIVE) {
      let appConfigContent = ''
      jsonFiles.forEach(jsonFile => {
        if (jsonFile) {
          if (
            jsonFile.name === 'app-config.js' ||
            jsonFile.name === 'define-pages.js'
          ) {
            appConfigContent = jsonFile.content
          } else {
            this.emitFile(jsonFile.name, jsonFile.content)
          }
        }
      })
      return this.callback(null, appConfigContent, map)
    }

    jsonFiles.forEach(jsonFile => {
      if (jsonFile) {
        if (jsonFile.name === 'app') {
          updateAppJson(jsonFile.name, renameUsingComponents(jsonFile.content))
        } else {
          updateProjectJson(jsonFile.name, jsonFile.content)
        }
      }
    })
  }

  this.callback(null, '', map)
}
