const path = require('path')

const babel = require('@babel/core')

const loaderUtils = require('loader-utils')

const {
  hashify,
  hasModule,
  removeExt,
  normalizePath
} = require('@dcloudio/uni-cli-shared')

const {
  resolve,
  getPlatformExts,
  cacheGlobalComponents,
  normalizeNodeModules
} = require('./shared')

const babelPluginGlobalComponent = require('./babel-plugin-global-component')

const templateExt = getPlatformExts().template

function getNormalMainJsCode (params) {
  return `import App from './${normalizePath(params.page)}.vue'
import Vue from 'vue'
App.mpType='page'
const app = new Vue(App)
app.$mount()`
}

function getMPVuePageFactoryMainJsCode (params) {
  return `import pageFactory from 'mpvue-page-factory'
    import App from './${normalizePath(params.page)}.vue'
    Page(pageFactory(App))`
}

module.exports = function (content) {
  if (process.env.UNI_USING_COMPONENTS) {
    return require('./main-new').call(this, content)
  }
  this.cacheable && this.cacheable()
  if (this.resourceQuery) {
    const params = loaderUtils.parseQuery(this.resourceQuery)
    if (params && params.page) {
      params.page = decodeURIComponent(params.page)
      return (process.env.UNI_PLATFORM === 'mp-weixin' || process.env.UNI_PLATFORM === 'app-plus')
        ? getMPVuePageFactoryMainJsCode(params) : getNormalMainJsCode(params)
    }
  } else {
    // 解析全局组件
    const plugins = []
    if (hasModule('@babel/plugin-syntax-typescript')) {
      plugins.push('@babel/plugin-syntax-typescript')
      plugins.push([
        '@babel/plugin-proposal-decorators',
        {
          'legacy': true
        }
      ])
    }
    plugins.push(babelPluginGlobalComponent)
    const ast = babel.transform(content, {
      root: process.env.UNI_CLI_CONTEXT,
      plugins
    })

    const globalComponents = {}

    const callback = this.async()

    if (!ast.metadata.globalComponents) {
      ast.metadata.globalComponents = {}
    }

    Promise.all(Object.keys(ast.metadata.globalComponents).map(name => {
      return resolve.call(this, ast.metadata.globalComponents[name]).then(resolved => {
        resolved = path.relative(process.env.UNI_INPUT_DIR, resolved)
        const hashed = hashify(resolved)
        globalComponents[name] = {
          name: hashed,
          src: '/' + normalizeNodeModules(removeExt(resolved)) + '.vue' +
                        templateExt
        }
      })
    })).then(() => {
      cacheGlobalComponents(globalComponents)
      callback(null, content)
    }, err => {
      callback(err, content)
    })
  }
}
