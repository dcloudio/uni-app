const fs = require('fs')
const path = require('path')

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

const parseStyle = require('./util').parseStyle

// 将开发者手动设置的 usingComponents 调整名称，方便与自动解析到的 usingComponents 做最后合并
function renameUsingComponents (jsonObj) {
  if (jsonObj.usingComponents) {
    jsonObj.customUsingComponents = jsonObj.usingComponents
    delete jsonObj.usingComponents
  }
  return jsonObj
}

module.exports = function (content) {
  this.cacheable && this.cacheable()

  const manifestJsonPath = path.resolve(process.env.UNI_INPUT_DIR, 'manifest.json')
  const manifestJson = parseManifestJson(fs.readFileSync(manifestJsonPath, 'utf8'))

  this.addDependency(manifestJsonPath)

  const pagesJson = parsePagesJson(content)
  // TODO 与 usingComponents 放在一块读取设置
  if (manifestJson.transformPx === false) {
    process.UNI_TRANSFORM_PX = false
  } else {
    process.UNI_TRANSFORM_PX = true
  }

  if (process.env.UNI_PLATFORM === 'h5') {
    return require('./platforms/h5')(pagesJson, manifestJson)
  }

  parsePages(pagesJson, function (page) {
    updatePageJson(page.path, renameUsingComponents(parseStyle(page.style)))
  }, function (root, page) {
    updatePageJson(normalizePath(path.join(root, page.path)), renameUsingComponents(
      parseStyle(page.style, root)
    ))
  })

  const jsonFiles = require('./platforms/' + process.env.UNI_PLATFORM)(pagesJson, manifestJson)

  if (jsonFiles && jsonFiles.length) {
    if (process.env.UNI_USING_NATIVE) {
      let appConfigContent = ''
      jsonFiles.forEach(jsonFile => {
        if (jsonFile) {
          if (jsonFile.name === 'app-config.js') {
            appConfigContent = jsonFile.content
          } else {
            this.emitFile(jsonFile.name, jsonFile.content)
          }
        }
      })
      return appConfigContent
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

  return ''
}
