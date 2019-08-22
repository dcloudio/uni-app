const {
  removeExt,
  getPlatformExts,
  getPlatformTarget
} = require('@dcloudio/uni-cli-shared')

const {
  normalizeNodeModules
} = require('@dcloudio/uni-cli-shared/lib/platform')

const templates = {}
const compilerOptions = {}

const compiledComponentTemplates = {}

let globalComponents = {}

const components = new Set()
const usingComponents = {}

function resolve (source) {
  return new Promise((resolve, reject) => {
    this.resolve(this.context, source, (err, filepath) => {
      if (err) {
        reject(err)
        return
      }

      resolve(filepath)
    })
  })
}

function restoreNodeModules (str) {
  if (process.env.UNI_PLATFORM === 'mp-alipay') {
    str = str.replace('node-modules/npm-scope-', 'node-modules/@')
  }
  str = str.replace('node-modules', 'node_modules')
  return str
}

module.exports = {
  resolve,
  restoreNodeModules,
  normalizeNodeModules,
  getComponents () {
    return components
  },
  getUsingComponents () {
    return usingComponents
  },
  cacheUsingComponents (name, scopedComponents) {
    usingComponents[name] = scopedComponents // 方便写入 json usingComponents
    scopedComponents.forEach(scopedComponent => {
      components.add(scopedComponent.source + '.js')
    })
  },
  cacheGlobalComponents (newGlobalComponents) {
    globalComponents = newGlobalComponents
  },
  cacheTemplate (name, content) {
    templates[removeExt(name)] = content
  },
  cacheCompilerOptions (name, options = {}) {
    name = removeExt(name)
    compilerOptions[name] = Object.assign(compilerOptions[name] || {}, options)
  },
  cacheCompiledComponentTemplates (name, options) {
    compiledComponentTemplates[name] = options
  },
  getCompiledComponentTemplate (name) {
    return compiledComponentTemplates[name] || {}
  },
  getTemplates () {
    return templates
  },
  getCompilerOptions () {
    return compilerOptions
  },
  getGlobalComponents () {
    return globalComponents
  },
  getPages () {
    const pages = {}
    Object.keys(process.UNI_ENTRY).forEach(page => {
      if (compilerOptions[page]) {
        pages[page] = compilerOptions[page].name
      }
    })
    return pages
  },
  getSubPages () {
    return process.UNI_SUB_PACKAGES_ROOT
  },
  getRoot (filePath, subPackages) {
    const subPackage = subPackages.find(subPackage => filePath.indexOf(subPackage + '/') === 0)
    if (subPackage) {
      return subPackage + '/'
    }
    return ''
  },
  getPlatformExts,
  getPlatformTarget
}
