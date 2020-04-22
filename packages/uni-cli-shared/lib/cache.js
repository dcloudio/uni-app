const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
/**
 * 1.page-loader 缓存基础的  app.json page.json project.config.json
 * 2.main-loader 缓存 app.json 中的 usingComponents 节点
 * 3.script-loader 修改缓存 usingComponents 节点
 * 5.webpack plugin 中获取被修改的 page.json,component.json 并 emitFile
 */
let jsonFileMap = new Map()
const changedJsonFileSet = new Set()
let componentSet = new Set()

let pageSet = new Set()

let globalUsingComponents = Object.create(null)
let appJsonUsingComponents = Object.create(null)
let componentSpecialMethods = Object.create(null)

function getPagesJson () {
  if (process.env.UNI_PLATFORM === 'h5') {
    return process.UNI_H5_PAGES_JSON
  }
  const pagesJson = {
    pages: {}
  }
  for (const name of pageSet.values()) {
    const style = JSON.parse(getJsonFile(name) || '{}')
    delete style.customUsingComponents
    pagesJson.pages[name] = style
  }
  const appJson = JSON.parse(getJsonFile('app') || '{}')
  pagesJson.globalStyle = appJson.window || {}
  return pagesJson
}

function updateJsonFile (name, jsonStr) {
  changedJsonFileSet.add(name)
  if (typeof jsonStr !== 'string') {
    jsonStr = JSON.stringify(jsonStr, null, 2)
  }
  jsonFileMap.set(name, jsonStr)
}

function getJsonFile (name) {
  return jsonFileMap.get(name)
}

function getChangedJsonFileMap (clear = true) {
  const changedJsonFileMap = new Map()
  for (const name of changedJsonFileSet.values()) {
    changedJsonFileMap.set(name + '.json', jsonFileMap.get(name))
  }
  clear && changedJsonFileSet.clear()
  return changedJsonFileMap
}

function updateAppJson (name, jsonObj) {
  updateComponentJson(name, jsonObj, true, 'App')
}

function updatePageJson (name, jsonObj) {
  pageSet.add(name)
  updateComponentJson(name, jsonObj, true, 'Page')
}

function updateProjectJson (name, jsonObj) {
  updateComponentJson(name, jsonObj, false, 'Project')
}

const supportGlobalUsingComponents = process.env.UNI_PLATFORM === 'mp-weixin' || process.env.UNI_PLATFORM === 'mp-qq'

function updateComponentJson (name, jsonObj, usingComponents = true, type = 'Component') {
  if (type === 'Component') {
    jsonObj.component = true
  }
  if (type === 'Page') {
    if (process.env.UNI_PLATFORM === 'mp-baidu') {
      jsonObj.component = true
    }
  }

  const oldJsonStr = getJsonFile(name)
  if (oldJsonStr) { // update
    if (usingComponents) { // merge usingComponents
      // 其实直接拿新的 merge 到旧的应该就行
      const oldJsonObj = JSON.parse(oldJsonStr)
      jsonObj.usingComponents = oldJsonObj.usingComponents || {}
      jsonObj.usingAutoImportComponents = oldJsonObj.usingAutoImportComponents || {}
      if (oldJsonObj.usingGlobalComponents) { // 复制 global components(针对不支持全局 usingComponents 的平台)
        jsonObj.usingGlobalComponents = oldJsonObj.usingGlobalComponents
      }
    }
    const newJsonStr = JSON.stringify(jsonObj, null, 2)
    if (newJsonStr !== oldJsonStr) {
      updateJsonFile(name, newJsonStr)
    }
  } else { // add
    updateJsonFile(name, jsonObj)
  }
}

function updateUsingGlobalComponents (name, usingGlobalComponents) {
  if (supportGlobalUsingComponents) {
    return
  }
  const oldJsonStr = getJsonFile(name)
  if (oldJsonStr) { // update
    const jsonObj = JSON.parse(oldJsonStr)
    jsonObj.usingGlobalComponents = usingGlobalComponents
    const newJsonStr = JSON.stringify(jsonObj, null, 2)
    if (newJsonStr !== oldJsonStr) {
      updateJsonFile(name, newJsonStr)
    }
  } else { // add
    const jsonObj = {
      usingGlobalComponents
    }
    updateJsonFile(name, jsonObj)
  }
}

function updateUsingAutoImportComponents (name, usingAutoImportComponents) {
  const oldJsonStr = getJsonFile(name)
  if (oldJsonStr) { // update
    const jsonObj = JSON.parse(oldJsonStr)
    jsonObj.usingAutoImportComponents = usingAutoImportComponents
    const newJsonStr = JSON.stringify(jsonObj, null, 2)
    if (newJsonStr !== oldJsonStr) {
      updateJsonFile(name, newJsonStr)
    }
  } else { // add
    updateJsonFile(name, {
      usingAutoImportComponents
    })
  }
}

function updateUsingComponents (name, usingComponents, type) {
  if (type === 'Component') {
    componentSet.add(name)
  }
  if (type === 'App') { // 记录全局组件
    globalUsingComponents = usingComponents
  }

  const oldJsonStr = getJsonFile(name)
  if (oldJsonStr) { // update
    const jsonObj = JSON.parse(oldJsonStr)
    if (type === 'Component') {
      jsonObj.component = true
    } else if (type === 'Page') {
      if (process.env.UNI_PLATFORM === 'mp-baidu') {
        jsonObj.component = true
      }
    }

    jsonObj.usingComponents = usingComponents
    const newJsonStr = JSON.stringify(jsonObj, null, 2)
    if (newJsonStr !== oldJsonStr) {
      updateJsonFile(name, newJsonStr)
    }
  } else { // add
    const jsonObj = {
      usingComponents
    }
    if (type === 'Component') {
      jsonObj.component = true
    } else if (type === 'Page') {
      if (process.env.UNI_PLATFORM === 'mp-baidu') {
        jsonObj.component = true
      }
    }

    updateJsonFile(name, jsonObj)
  }
}

function updateComponentGenerics (name, componentGenerics) {
  const oldJsonStr = getJsonFile(name)
  if (oldJsonStr) { // update
    const jsonObj = JSON.parse(oldJsonStr)
    jsonObj.componentGenerics = componentGenerics
    const newJsonStr = JSON.stringify(jsonObj, null, 2)
    if (newJsonStr !== oldJsonStr) {
      updateJsonFile(name, newJsonStr)
    }
  } else { // add
    const jsonObj = {
      componentGenerics
    }
    updateJsonFile(name, jsonObj)
  }
}

function updateGenericComponents (name, genericComponents) {
  const oldJsonStr = getJsonFile(name)
  if (oldJsonStr) { // update
    const jsonObj = JSON.parse(oldJsonStr)
    jsonObj.genericComponents = genericComponents
    const newJsonStr = JSON.stringify(jsonObj, null, 2)
    if (newJsonStr !== oldJsonStr) {
      updateJsonFile(name, newJsonStr)
    }
  } else { // add
    const jsonObj = {
      genericComponents
    }
    updateJsonFile(name, jsonObj)
  }
}

function updateAppJsonUsingComponents (usingComponents) {
  appJsonUsingComponents = usingComponents
}

function getComponentSet () {
  return componentSet
}

function getGlobalUsingComponents () {
  // 合并 app.json ，main.js 全局组件
  return Object.assign({}, appJsonUsingComponents, globalUsingComponents)
}

function getWXComponents (name) {
  const oldJsonStr = getJsonFile(name)
  if (oldJsonStr) {
    const jsonObj = JSON.parse(oldJsonStr)
    if (jsonObj.customUsingComponents) {
      return Object.assign({}, appJsonUsingComponents, jsonObj.customUsingComponents)
    }
  }
  return Object.assign({}, appJsonUsingComponents)
}

function updateSpecialMethods (name, specialMethods) {
  if (specialMethods.length) {
    componentSpecialMethods[name] = specialMethods
  } else {
    delete componentSpecialMethods[name]
  }
}

function getSpecialMethods (name) {
  if (!name) {
    return componentSpecialMethods
  }
  return componentSpecialMethods[name] || []
}

const cacheTypes = ['babel-loader', 'css-loader', 'uni-template-compiler', 'vue-loader']

function clearCache () {
  const fsExtra = require('fs-extra')
  cacheTypes.forEach(cacheType => {
    fsExtra.emptyDirSync(path.resolve(
      process.env.UNI_CLI_CONTEXT,
      'node_modules/.cache/' + cacheType + '/' + process.env.UNI_PLATFORM
    ))
  })
}

function digest (str) {
  return crypto
    .createHash('md5')
    .update(str)
    .digest('hex')
}

module.exports = {
  getPageSet () {
    return pageSet
  },
  getJsonFileMap () {
    return jsonFileMap
  },
  // 先简单处理,该方案不好,
  // 后续为 pages-loader 增加 cache-loader,
  // 然后其他修改 json 的地方也要定制 cache-loader
  store () {
    const pagesJsonPath = path.resolve(process.env.UNI_INPUT_DIR, 'pages.json')
    const filepath = path.resolve(
      process.env.UNI_CLI_CONTEXT,
      'node_modules/.cache/uni-pages-loader/' + process.env.UNI_PLATFORM,
      digest(process.env.UNI_INPUT_DIR) + '.json'
    )

    const files = Array.from(jsonFileMap.entries())
    const pages = Array.from(pageSet)
    const components = Array.from(componentSet)
    const methods = componentSpecialMethods
    fs.writeFileSync(filepath, JSON.stringify({
      mtimeMs: fs.statSync(pagesJsonPath).mtimeMs,
      files,
      pages,
      components,
      methods,
      globalUsingComponents,
      appJsonUsingComponents
    }))
  },
  restore () {
    const filepath = path.resolve(
      process.env.UNI_CLI_CONTEXT,
      'node_modules/.cache/uni-pages-loader/' + process.env.UNI_PLATFORM,
      digest(process.env.UNI_INPUT_DIR) + '.json'
    )
    if (!fs.existsSync(filepath)) {
      try {
        clearCache()
      } catch (e) {}
      return
    }
    const pagesJsonPath = path.resolve(process.env.UNI_INPUT_DIR, 'pages.json')
    const mtimeMs = fs.statSync(pagesJsonPath).mtimeMs
    const jsonCache = require(filepath)
    if (jsonCache.mtimeMs !== mtimeMs) {
      try {
        clearCache()
      } catch (e) {}
      return
    }
    jsonFileMap = new Map(jsonCache.files)
    pageSet = new Set(jsonCache.pages)
    componentSet = new Set(jsonCache.components)
    componentSpecialMethods = jsonCache.methods
    globalUsingComponents = jsonCache.globalUsingComponents
    appJsonUsingComponents = jsonCache.appJsonUsingComponents
    // restore 时,所有 file 均触发 change
    for (const name of jsonFileMap.keys()) {
      changedJsonFileSet.add(name)
    }
    return true
  },
  getJsonFile,
  getPagesJson,
  getComponentSet,
  getWXComponents,
  getGlobalUsingComponents,
  updateAppJson,
  updatePageJson,
  updateProjectJson,
  updateComponentJson,
  updateSpecialMethods,
  updateUsingComponents,
  updateUsingGlobalComponents,
  updateAppJsonUsingComponents,
  updateUsingAutoImportComponents,
  updateComponentGenerics,
  updateGenericComponents,
  getChangedJsonFileMap,
  getSpecialMethods
}
