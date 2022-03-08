const path = require('path')

const parser = require('@babel/parser')

const {
  removeExt,
  hyphenate,
  normalizePath,
  getComponentName,
  jsPreprocessOptions
} = require('@dcloudio/uni-cli-shared')

const {
  getBabelParserOptions
} = require('@dcloudio/uni-cli-shared/lib/platform')

const {
  isBuiltInComponentPath
} = require('@dcloudio/uni-cli-shared/lib/pages')

const {
  updateUsingComponents
} = require('@dcloudio/uni-cli-shared/lib/cache')

const preprocessor = require('@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/preprocess')

const traverse = require('./babel/scoped-component-traverse')

const {
  resolve,
  normalizeNodeModules
} = require('./shared')

const {
  findBabelLoader,
  addDynamicImport
} = require('./babel/util')

const uniI18n = require('@dcloudio/uni-cli-i18n')

module.exports = function (content, map) {
  this.cacheable && this.cacheable()

  content = preprocessor.preprocess(content, jsPreprocessOptions.context, {
    type: jsPreprocessOptions.type
  })

  let resourcePath = normalizeNodeModules(removeExt(normalizePath(path.relative(process.env.UNI_INPUT_DIR, this
    .resourcePath))))

  let type = ''
  if (resourcePath === 'App') {
    type = 'App'
  } else if (process.UNI_ENTRY[resourcePath]) {
    type = 'Page'
  }
  // <script src=""/>
  if (!type && this._module.issuer && this._module.issuer.issuer) {
    resourcePath = normalizeNodeModules(removeExt(normalizePath(path.relative(process.env.UNI_INPUT_DIR, this._module
      .issuer.issuer.resource))))
    if (resourcePath === 'App') {
      type = 'App'
    } else if (process.UNI_ENTRY[resourcePath]) {
      type = 'Page'
    }
  }

  if ( // windows 上 page-meta, navigation-bar 可能在不同盘上
    /^win/.test(process.platform) &&
    path.isAbsolute(resourcePath) &&
    isBuiltInComponentPath(resourcePath)
  ) {
    resourcePath = normalizePath(path.relative(process.env.UNI_CLI_CONTEXT, resourcePath))
  }

  if (!type) {
    type = 'Component'
  }

  const {
    state: {
      components
    }
  } = traverse(parser.parse(content, getBabelParserOptions()), {
    type,
    components: []
  })

  const callback = this.async()

  if (!components.length) {
    if (type === 'App') {
      callback(null, content, map)
      return
    }
    // 防止组件从有到无，App.vue 中不支持使用组件
    updateUsingComponents(resourcePath, Object.create(null), type)
    callback(null, content, map)
    return
  }

  const dynamicImports = Object.create(null)
  Promise.all(components.map(component => {
    return resolve.call(this, component.source).then(resolved => {
      component.name = getComponentName(hyphenate(component.name))
      const source = component.source
      component.source = normalizeNodeModules(removeExt(path.relative(process.env.UNI_INPUT_DIR,
        resolved)))
      // 非页面组件才需要 dynamic import
      if (!process.UNI_ENTRY[component.source]) {
        dynamicImports[source] = {
          identifier: component.value,
          chunkName: component.source,
          source: source
        }
      }
    })
  })).then(() => {
    const usingComponents = Object.create(null)
    components.forEach(({
      name,
      source
    }) => {
      usingComponents[name] = `/${source}`
    })

    const babelLoader = findBabelLoader(this.loaders)
    if (!babelLoader) {
      callback(new Error(uniI18n.__('mpLoader.findFail', { 0: 'babel-loader' })), content)
    } else {
      addDynamicImport(babelLoader, resourcePath, dynamicImports)

      updateUsingComponents(resourcePath, usingComponents, type)
      callback(null, content, map)
    }
  }, err => {
    callback(err, content, map)
  })
}
