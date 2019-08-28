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
  getPagesJson
} = require('@dcloudio/uni-cli-shared/lib/cache')

const {
  pagesJsonJsFileName
} = require('@dcloudio/uni-cli-shared/lib/pages')

const parseStyle = require('./util').parseStyle

const emitFileCaches = {}

function checkEmitFile (filePath, jsonObj, changedEmitFiles) {
  const content = JSON.stringify(jsonObj, null, 2)
  if (emitFileCaches[filePath] !== content) {
    changedEmitFiles.push(filePath)
    emitFileCaches[filePath] = content
  }
}

module.exports = function (content) {
  if (this.resourceQuery) {
    const params = loaderUtils.parseQuery(this.resourceQuery)
    if (params) {
      if (params.type === 'style') {
        return `export default ${JSON.stringify(getPagesJson())}`
      } else if (params.type === 'stat') {
        return `export default ${JSON.stringify(process.UNI_STAT_CONFIG || {})}`
      }
    }
  }

  if (process.env.UNI_USING_COMPONENTS || process.env.UNI_PLATFORM === 'h5') {
    return require('./index-new').call(this, content)
  }

  this.cacheable && this.cacheable()

  const manifestJsonPath = path.resolve(process.env.UNI_INPUT_DIR, 'manifest.json')
  const pagesJsonJsPath = path.resolve(process.env.UNI_INPUT_DIR, pagesJsonJsFileName)
  const manifestJson = parseManifestJson(fs.readFileSync(manifestJsonPath, 'utf8'))

  this.addDependency(manifestJsonPath)
  this.addDependency(pagesJsonJsPath)

  const pagesJson = parsePagesJson(content, {
    addDependency: (file) => {
      (process.UNI_PAGES_DEPS || (process.UNI_PAGES_DEPS = new Set())).add(normalizePath(file))
      this.addDependency(file)
    }
  })

  if (manifestJson.transformPx === false) {
    process.UNI_TRANSFORM_PX = false
  } else {
    process.UNI_TRANSFORM_PX = true
  }
  if (process.env.UNI_PLATFORM === 'h5') {
    return require('./platforms/h5')(pagesJson, manifestJson)
  }

  const changedEmitFiles = []

  function checkPageEmitFile (pagePath, pageStyle) {
    checkEmitFile(pagePath, parseStyle(pageStyle), changedEmitFiles)
  }

  parsePages(pagesJson, function (page) {
    checkPageEmitFile(page.path, page.style)
  }, function (root, page) {
    checkPageEmitFile(normalizePath(path.join(root, page.path)), page.style)
  })

  const jsonFiles = require('./platforms/' + process.env.UNI_PLATFORM)(pagesJson, manifestJson)

  if (jsonFiles && jsonFiles.length) {
    jsonFiles.forEach(jsonFile => {
      jsonFile && checkEmitFile(jsonFile.name, jsonFile.content, changedEmitFiles)
    })
  }

  changedEmitFiles.forEach(name => {
    this.emitFile(name + '.json', emitFileCaches[name])
  })

  return ''
}
