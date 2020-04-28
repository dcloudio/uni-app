const fs = require('fs')
const path = require('path')

const {
  removeExt,
  normalizePath,
  camelize,
  capitalize
} = require('./util')

const {
  getJson,
  parseJson
} = require('./json')

let mainEntry = ''
let nvueMainEntry = ''

function getMainEntry () {
  if (!mainEntry) {
    mainEntry = fs.existsSync(path.resolve(process.env.UNI_INPUT_DIR, 'main.ts')) ? 'main.ts' : 'main.js'
  }
  return mainEntry
}

function getNVueMainEntry () {
  if (!nvueMainEntry) {
    nvueMainEntry = fs.existsSync(path.resolve(process.env.UNI_INPUT_DIR, 'main.js')) ? 'main.js' : '.main.js'
    if (nvueMainEntry === '.main.js') {
      fs.writeFileSync(path.resolve(process.env.UNI_INPUT_DIR, '.main.js'), '')
    }
  }
  return nvueMainEntry
}

function getPagesJson () {
  return processPagesJson(getJson('pages.json', true))
}

function parsePagesJson (content, loader) {
  return processPagesJson(parseJson(content, true), loader)
}

function filterPages (pages = [], root) {
  for (let i = pages.length - 1; i >= 0; i--) {
    const page = pages[i]
    if (!isValidPage(page, root)) {
      pages.splice(i, 1)
    }
  }
}

const pagesJsonJsFileName = 'pages.js'

function processPagesJson (pagesJson, loader = {
  addDependency: function () {}
}) {
  const pagesJsonJsPath = path.resolve(process.env.UNI_INPUT_DIR, pagesJsonJsFileName)
  if (fs.existsSync(pagesJsonJsPath)) {
    delete require.cache[pagesJsonJsPath]
    const pagesJsonJsFn = require(pagesJsonJsPath)
    if (typeof pagesJsonJsFn === 'function') {
      pagesJson = pagesJsonJsFn(pagesJson, loader)
      if (!pagesJson) {
        console.error(`${pagesJsonJsFileName}  必须返回一个 json 对象`)
      }
    } else {
      console.error(`${pagesJsonJsFileName} 必须导出 function`)
    }
  }

  let uniNVueEntryPagePath
  if (pagesJson.pages && pagesJson.pages.length) { // 如果首页是 nvue
    if (isNVuePage(pagesJson.pages[0])) {
      uniNVueEntryPagePath = pagesJson.pages[0].path
    }
  }
  // pages
  filterPages(pagesJson.pages)
  // subPackages
  if (Array.isArray(pagesJson.subPackages) && pagesJson.subPackages.length) {
    pagesJson.subPackages.forEach(subPackage => {
      filterPages(subPackage.pages, subPackage.root)
    })
  }

  if (uniNVuePages.length) { // 直接挂在 pagesJson 上
    pagesJson.nvue = {
      pages: uniNVuePages.reverse()
    }
    if (uniNVueEntryPagePath) {
      pagesJson.nvue.entryPagePath = uniNVueEntryPagePath
    }
  }
  return pagesJson
}

function isNVuePage (page, root = '') {
  if (process.env.UNI_PLATFORM === 'app-plus') {
    const pagePath = path.join(root, page.path)
    if (fs.existsSync(path.resolve(process.env.UNI_INPUT_DIR, pagePath + '.nvue'))) { // cache一下结果？如果文件被删除，cache 就会出现错误
      return true
    }
  }
  return false
}

function isValidPage (page, root = '') {
  if (typeof page === 'string') { // 不合法的配置
    console.warn(`${page} 配置错误, 已被忽略, 查看文档: https://uniapp.dcloud.io/collocation/pages?id=pages`)
    return false
  }
  let pagePath = page.path

  if (pagePath.indexOf('platforms') === 0) { // 平台相关
    if (pagePath.indexOf('platforms/' + process.env.UNI_PLATFORM) === -1) { // 非本平台
      return false
    }
  }

  if (
    process.env.UNI_PLATFORM === 'app-plus' &&
    page.style
  ) {
    const subNVues = page.style.subNVues || (page.style['app-plus'] && page.style['app-plus'].subNVues)
    if (Array.isArray(subNVues)) {
      subNVues.forEach(subNVue => {
        let subNVuePath = subNVue.path
        if (subNVuePath) {
          subNVuePath = subNVue.path.split('?')[0]
          const subNVuePagePath = removeExt(path.join(root, subNVuePath))
          process.UNI_NVUE_ENTRY[subNVuePagePath] = getNVueMainJsPath(subNVuePagePath)
        }
      })
    }
  } else {
    page.style && (delete page.style.subNVues)
  }

  if (isNVuePage(page, root)) {
    // 存储 nvue 相关信息
    pagePath = normalizePath(path.join(root, pagePath))

    process.UNI_NVUE_ENTRY[pagePath] = getNVueMainJsPath(pagePath)

    if (process.env.UNI_USING_V3 || process.env.UNI_USING_V3_NATIVE) { // 不移除
      page.nvue = true
      return true
    } else {
      uniNVuePages.push({
        path: pagePath + '.html',
        style: page.style || {}
      })
      return false
    }
  }

  return true
}

function getMainJsPath (page) {
  return path.resolve(process.env.UNI_INPUT_DIR, getMainEntry() + '?' + JSON.stringify({
    page: encodeURIComponent(page)
  }))
}

function getNVueMainJsPath (page) {
  return path.resolve(process.env.UNI_INPUT_DIR, getNVueMainEntry() + '?' + JSON.stringify({
    page: encodeURIComponent(page)
  }))
}

process.UNI_ENTRY = {}
process.UNI_NVUE_ENTRY = {}

const uniNVuePages = []

function parsePages (pagesJson, pageCallback, subPageCallback) {
  if (!pagesJson) {
    pagesJson = getPagesJson()
  }

  // pages
  pagesJson.pages.forEach(page => {
    pageCallback && pageCallback(page)
  })
  // subPackages
  if (Array.isArray(pagesJson.subPackages) && pagesJson.subPackages.length) {
    pagesJson.subPackages.forEach((subPackage) => {
      const {
        root,
        pages
      } = subPackage
      pages.forEach(page => {
        root && subPageCallback && subPageCallback(root, page, subPackage)
      })
    })
  }
}

function parseEntry (pagesJson) {
  process.UNI_ENTRY = {
    'common/main': path.resolve(process.env.UNI_INPUT_DIR, getMainEntry())
  }

  process.UNI_SUB_PACKAGES_ROOT = {}

  process.UNI_NVUE_ENTRY = {}

  if (process.env.UNI_USING_NATIVE || process.env.UNI_USING_V3_NATIVE) {
    process.UNI_NVUE_ENTRY['app-config'] = path.resolve(process.env.UNI_INPUT_DIR, 'pages.json')
    process.UNI_NVUE_ENTRY['app-service'] = path.resolve(process.env.UNI_INPUT_DIR, getMainEntry())
  }

  uniNVuePages.length = 0

  if (!pagesJson) {
    pagesJson = getPagesJson() // 会检测修改 nvue entry
  }

  // pages
  pagesJson.pages.forEach(page => {
    process.UNI_ENTRY[page.path] = getMainJsPath(page.path)
  })
  // subPackages
  if (Array.isArray(pagesJson.subPackages) && pagesJson.subPackages.length) {
    pagesJson.subPackages.forEach(({
      root,
      pages
    }) => {
      Array.isArray(pages) && pages.forEach(page => {
        if (root) {
          const pagePath = normalizePath(path.join(root, page.path))
          process.UNI_ENTRY[pagePath] = getMainJsPath(pagePath)
          process.UNI_SUB_PACKAGES_ROOT[pagePath] = root
        }
      })
    })
  }
}

function parseUsingComponents (usingComponents = {}) {
  const components = []
  Object.keys(usingComponents).forEach(name => {
    const identifier = capitalize(camelize(name))
    let source = usingComponents[name]
    if (source.indexOf('/') === 0) { // 绝对路径
      source = '@' + source
    } else if (source.indexOf('.') !== 0) { // 相对路径
      source = './' + source
    }
    components.push({
      name,
      identifier,
      source
    })
  })
  return components
}

function generateUsingComponentsCode (usingComponents) {
  const components = parseUsingComponents(usingComponents)
  const importCode = []
  const componentsCode = []
  components.forEach(({
    name,
    identifier,
    source
  }) => {
    importCode.push(`import ${identifier} from '${source}.vue'`)
    componentsCode.push(`'${name}':${identifier}`)
  })
  if (!importCode.length) {
    return ''
  }
  return `;${importCode.join(';')};exports.default.components=Object.assign({${componentsCode.join(',')}},exports.default.components||{});`
}

function generateGlobalUsingComponentsCode (usingComponents) {
  const components = parseUsingComponents(usingComponents)
  const importCode = []
  const componentsCode = []
  components.forEach(({
    name,
    identifier,
    source
  }) => {
    importCode.push(`import ${identifier} from '${source}.vue'`)
    componentsCode.push(`Vue.component('${name}',${identifier})`)
  })
  if (!importCode.length) {
    return ''
  }
  return `${importCode.join(';')};${componentsCode.join(';')};`
}

function getGlobalUsingComponentsCode () {
  const pagesJson = getPagesJson()
  const usingComponents = pagesJson.globalStyle && pagesJson.globalStyle.usingComponents
  if (!usingComponents) {
    return ''
  }
  return generateGlobalUsingComponentsCode(usingComponents)
}

function getUsingComponentsCode (pagePath) {
  const usingComponents = usingComponentsPages[pagePath]
  if (!usingComponents) {
    return ''
  }
  return generateUsingComponentsCode(usingComponents)
}

const usingComponentsPages = Object.create(null)

function addPageUsingComponents (pagePath, usingComponents) {
  if (usingComponents && Object.keys(usingComponents).length) {
    usingComponentsPages[pagePath] = usingComponents
  }
}
// 存储自动组件
const autoComponentMap = {}

let lastUsingAutoImportComponentsJson = ''

let uniAutoImportComponents = []

let uniAutoImportScanComponents = []

let uniQuickAppAutoImportScanComponents = false

const isDirectory = source => fs.lstatSync(source).isDirectory()

function getAutoComponentsByDir (componentsPath, absolute = false) {
  const components = {}
  try {
    fs.existsSync(componentsPath) && fs.readdirSync(componentsPath).forEach(name => {
      const folder = path.resolve(componentsPath, name)
      if (!isDirectory(folder)) {
        return
      }
      const importDir = absolute ? normalizePath(folder) : `@/components/${name}`
      // 读取文件夹文件列表，比对文件名（fs.existsSync在大小写不敏感的系统会匹配不准确）
      const files = fs.readdirSync(folder)
      if (files.includes(name + '.vue')) {
        components[`^${name}$`] = `${importDir}/${name}.vue`
      } else if (files.includes(name + '.nvue')) {
        components[`^${name}$`] = `${importDir}/${name}.nvue`
      }
    })
  } catch (e) {
    console.log(e)
  }
  return components
}

function initAutoImportScanComponents () {
  const componentsPath = path.resolve(process.env.UNI_INPUT_DIR, 'components')

  const components = getAutoComponentsByDir(componentsPath)

  if (process.env.UNI_PLATFORM === 'quickapp-vue') {
    if (!uniQuickAppAutoImportScanComponents) {
      uniQuickAppAutoImportScanComponents = getAutoComponentsByDir(
        path.resolve(require.resolve('@dcloudio/uni-quickapp-vue'), '../../components'),
        true
      )
    }
    // 平台内置组件优先级高
    Object.assign(components, uniQuickAppAutoImportScanComponents)
  }

  uniAutoImportScanComponents = parseUsingAutoImportComponents(components)
  refreshAutoComponentMap()
}

const _toString = Object.prototype.toString

function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function initAutoImportComponents (easycom = {}) {
  let usingAutoImportComponents = easycom.custom || easycom || {}
  if (!isPlainObject(usingAutoImportComponents)) {
    usingAutoImportComponents = {}
  }
  // 目前仅 mp-weixin 内置支持 page-meta 等组件
  if (process.env.UNI_PLATFORM !== 'mp-weixin') {
    if (!usingAutoImportComponents['^page-meta$']) {
      usingAutoImportComponents['^page-meta$'] =
        '@dcloudio/uni-cli-shared/components/page-meta.vue'
    }
    if (!usingAutoImportComponents['^navigation-bar$']) {
      usingAutoImportComponents['^navigation-bar$'] =
        '@dcloudio/uni-cli-shared/components/navigation-bar.vue'
    }
  }

  const newUsingAutoImportComponentsJson = JSON.stringify(usingAutoImportComponents)
  if (newUsingAutoImportComponentsJson !== lastUsingAutoImportComponentsJson) {
    lastUsingAutoImportComponentsJson = newUsingAutoImportComponentsJson
    uniAutoImportComponents = parseUsingAutoImportComponents(usingAutoImportComponents)
    refreshAutoComponentMap()
  }
}

/**
 * UNI_AUTO_COMPONENTS 被更新,重新刷新 map
 */
function refreshAutoComponentMap () {
  Object.keys(autoComponentMap).forEach(name => {
    addAutoComponent(name)
  })
}

function addAutoComponent (name) {
  let opt = uniAutoImportComponents.find(opt => opt.pattern.test(name))
  if (!opt) {
    opt = uniAutoImportScanComponents.find(opt => opt.pattern.test(name))
  }
  if (!opt) { // 不匹配
    return (autoComponentMap[name] = true) // cache
  }
  return (autoComponentMap[name] = {
    name,
    identifier: capitalize(camelize(name + '-auto-import')),
    source: name.replace(opt.pattern, opt.replacement)
  })
}

function getAutoComponents (autoComponents) {
  const components = []
  autoComponents.forEach(name => {
    let autoComponent = autoComponentMap[name]
    if (!autoComponent) {
      autoComponent = addAutoComponent(name)
    }
    if (autoComponent !== true) {
      components.push(autoComponent)
    }
  })
  return components
}

function parseUsingAutoImportComponents (usingAutoImportComponents) {
  const autoImportComponents = []
  if (usingAutoImportComponents) {
    Object.keys(usingAutoImportComponents).forEach(pattern => {
      const replacement = usingAutoImportComponents[pattern]
      if (replacement && typeof replacement === 'string') {
        autoImportComponents.push({
          pattern: new RegExp(pattern),
          replacement: replacement
        })
      }
    })
  }
  return autoImportComponents
}
module.exports = {
  getMainEntry,
  getNVueMainEntry,
  parsePages,
  parseEntry,
  getPagesJson,
  parsePagesJson,
  pagesJsonJsFileName,
  getAutoComponents,
  initAutoImportComponents,
  initAutoImportScanComponents,
  addPageUsingComponents,
  getUsingComponentsCode,
  generateUsingComponentsCode,
  getGlobalUsingComponentsCode,
  parseUsingAutoImportComponents,
  generateGlobalUsingComponentsCode
}
