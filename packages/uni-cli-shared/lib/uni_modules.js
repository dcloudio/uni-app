const fs = require('fs')
const path = require('path')

const {
  parseJson
} = require('./json')

const merge = require('./pages-json').default

function normalizeUniModulesPagesJson (pagesJson, pluginId) {
  if (Array.isArray(pagesJson.pages)) {
    pagesJson.pages.forEach(page => {
      page.path = 'uni_modules/' + pluginId + '/' + page.path
    })
  }
  if (Array.isArray(pagesJson.subPackages)) {
    pagesJson.subPackages.forEach(subPackage => {
      subPackage.root = 'uni_modules/' + pluginId + '/' + subPackage.root
    })
  }
  return pagesJson
}

function initUniModules () {
  global.uniModules = []
  try {
    global.uniModules = fs
      .readdirSync(path.resolve(process.env.UNI_INPUT_DIR, 'uni_modules'))
      .filter(module =>
        fs.existsSync(
          path.resolve(process.env.UNI_INPUT_DIR, 'uni_modules', module, 'package.json')
        )
      )
  } catch (e) {}
}

module.exports = {
  initUniModules,
  getPagesJson (content) {
    const uniModulesDir = path.resolve(process.env.UNI_INPUT_DIR, 'uni_modules')
    const pluginPagesJsons = []
    global.uniModules.forEach(plugin => {
      const pagesJsonPath = path.resolve(uniModulesDir, plugin, 'pages.json')
      if (fs.existsSync(pagesJsonPath)) {
        pluginPagesJsons.push(
          normalizeUniModulesPagesJson(parseJson(fs.readFileSync(pagesJsonPath).toString(), true), plugin)
        )
      }
    })
    content = content || fs.readFileSync(path.resolve(process.env.UNI_INPUT_DIR, 'pages.json'), 'utf8')
    const mainPagesJson = parseJson(content, true)
    if (pluginPagesJsons.length) {
      const pagesJson = merge(pluginPagesJsons.concat(mainPagesJson))
      if (Array.isArray(mainPagesJson.pages)) { // entry page
        const entryPagePath = mainPagesJson.pages[0].path
        const index = pagesJson.pages.findIndex(page => page.path === entryPagePath)
        const entryPage = pagesJson.pages[index]
        pagesJson.pages.splice(index, 1)
        pagesJson.pages.unshift(entryPage)
      }
      return pagesJson
    }
    return mainPagesJson
  }
}
