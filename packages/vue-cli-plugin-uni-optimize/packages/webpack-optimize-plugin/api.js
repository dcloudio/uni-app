const fs = require('fs')
const path = require('path')
const updateComponents = require('./component')

const tmpDir = path.resolve(__dirname, '../../.tmp')

function writeFileSync (filename, content) {
  fs.writeFileSync(path.resolve(tmpDir, filename), content, 'utf8')
}

function parseImportPath (filepath) {
  if (filepath.indexOf('/platforms') === 0) { // api,appComponents(h5),appMixins(h5),systemRoutes(h5)
    return filepath.replace('/platforms/' + process.env.UNI_PLATFORM, 'uni-platform')
  } else if (filepath.indexOf('/core/helpers') === 0) { // protocol
    return filepath.replace('/core/helpers', 'uni-helpers')
  } else if (filepath.indexOf('/core/view') === 0) { // subscribe
    return filepath.replace('/core/view', 'uni-view')
  } else if (filepath.indexOf('/core') === 0) { // api
    return filepath.replace('/core', 'uni-core')
  }
  return filepath
}

function updateExportDefaultObject (paths, filename, isMulti = true, isExportArray = false) {
  const imports = []
  const exports = []
  Object.keys(paths).forEach(name => {
    if (isMulti) {
      imports.push(`import {${name}} from '${parseImportPath(paths[name])}'`)
    } else {
      imports.push(`import ${name} from '${parseImportPath(paths[name])}'`)
    }
    exports.push(name)
  })
  let content = isExportArray ? 'export default []' : 'export default {}'
  if (exports.length) {
    if (isExportArray) {
      content = `
      ${imports.join('\n')}
      export default [
        ${exports.join(',\n')}
      ]
      `
    } else {
      content = `
      ${imports.join('\n')}
      export default {
        ${exports.join(',\n')}
      }
      `
    }
  }
  writeFileSync(filename, content)
}

function updateApi (paths) {
  return updateExportDefaultObject(paths, 'api.js')
}

function updateApiProtocol (paths) {
  return updateExportDefaultObject(paths, 'protocol.js')
}

function updateApiSubscribe (paths) {
  return updateExportDefaultObject(paths, 'subscribe.js')
}

function updateInvokeApi (paths) {
  return updateExportDefaultObject(paths, 'invoke-api.js')
}

function updateAppComponents (paths) {
  return updateExportDefaultObject(paths, 'app-components.js', false)
}

function updateCoreComponents (paths) {
  const tags = process.UNI_TAGS || new Set()
  Object.keys(paths).forEach(tag => tags.add(tag.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()))
  updateComponents(tags)
}

function updateAppMixins (paths) {
  return updateExportDefaultObject(paths, 'app-mixins.js', false, true)
}

function updateSystemRoutes (paths) {
  return updateExportDefaultObject(paths, 'system-routes.js', false)
}

const isProtocol = filepath => {
  return filepath.indexOf('/core/helpers/protocol') === 0
}

const isPlatformApi = filepath => {
  return filepath.indexOf('/platforms/' + process.env.UNI_PLATFORM + '/service/api') === 0
}

const isAppComponents = filepath => {
  return path.extname(filepath) === '.vue' &&
    filepath.indexOf('/platforms/' + process.env.UNI_PLATFORM + '/components/app/') === 0
}

const isCoreComponents = filepath => {
  return path.extname(filepath) === '.vue' &&
    filepath.indexOf('/core/view/components/') === 0
}

const isAppMixins = filepath => {
  return path.extname(filepath) === '.js' &&
    filepath.indexOf('/platforms/' + process.env.UNI_PLATFORM + '/components/app/') === 0
}

const isSystemRoutes = filepath => {
  return filepath.indexOf('/platforms/' + process.env.UNI_PLATFORM + '/components/system-routes') === 0
}

const isApiSubscribe = filepath => {
  return filepath.indexOf('/core/view/bridge/subscribe/api') === 0
}

function parseDeps (apis, manifest) {
  const apiPaths = Object.create(null)
  const apiProtocolPaths = Object.create(null)
  const invokeApiPaths = Object.create(null)
  const appComponentsPaths = Object.create(null)
  const coreComponentsPaths = Object.create(null)
  const appMixinsPaths = Object.create(null)
  const systemRoutesPaths = Object.create(null)
  const apiSubscribePaths = Object.create(null)

  const strategies = [{
    test: isProtocol,
    paths: apiProtocolPaths
  }, {
    test: isPlatformApi,
    paths: apiPaths
  }, {
    test: isAppComponents,
    paths: appComponentsPaths
  }, {
    test: isCoreComponents,
    paths: coreComponentsPaths
  }, {
    test: isAppMixins,
    paths: appMixinsPaths
  }, {
    test: isSystemRoutes,
    paths: systemRoutesPaths
  }, {
    test: isApiSubscribe,
    paths: apiSubscribePaths
  }]
  for (const name of apis.values()) {
    const options = manifest[name]
    if (Array.isArray(options)) {
      apiPaths[name] = options[0]
      const deps = options[1]
      if (!Array.isArray(deps) || !deps.length) {
        continue
      }

      const isCoreApi = !isPlatformApi(options[0])

      deps.forEach(dep => {
        const filepath = dep[0]
        const exports = dep[1]

        if (isCoreApi && isPlatformApi(filepath)) { // invoke-api
          invokeApiPaths[exports] = filepath
        } else {
          const strategy = strategies.find(strategy => {
            return strategy.test(filepath)
          })
          if (strategy) {
            strategy.paths[exports] = filepath
          } else {
            console.log('dep', name, dep)
            console.warn(`${filepath} 未识别`)
          }
        }
      })
    } else {
      // console.warn(`${process.env.UNI_PLATFORM} 平台不支持 uni.${name}`)
    }
  }

  return {
    apiPaths,
    apiProtocolPaths,
    invokeApiPaths,
    appComponentsPaths,
    coreComponentsPaths,
    appMixinsPaths,
    systemRoutesPaths,
    apiSubscribePaths
  }
}

module.exports = function updateApis (apis = new Set(), userApis = new Set()) {
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir)
  }

  const manifest = require('@dcloudio/uni-' + process.env.UNI_PLATFORM + '/manifest.json')
  // autoload
  Object.keys(manifest).forEach(name => {
    if (manifest[name][2]) {
      apis.add(name)
    }
  })

  apis = new Set([...apis, ...userApis])

  const {
    apiPaths,
    apiProtocolPaths,
    invokeApiPaths,
    apiSubscribePaths,
    appComponentsPaths,
    coreComponentsPaths,
    appMixinsPaths,
    systemRoutesPaths
  } = parseDeps(apis, manifest)

  updateApi(apiPaths)
  updateApiProtocol(apiProtocolPaths)
  updateApiSubscribe(apiSubscribePaths)

  updateInvokeApi(invokeApiPaths)

  updateAppComponents(appComponentsPaths)
  updateCoreComponents(coreComponentsPaths)
  updateAppMixins(appMixinsPaths)
  updateSystemRoutes(systemRoutesPaths)
}
