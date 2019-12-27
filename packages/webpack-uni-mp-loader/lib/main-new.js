const fs = require('fs')
const path = require('path')

const loaderUtils = require('loader-utils')

const parser = require('@babel/parser')

const {
  removeExt,
  hyphenate,
  normalizePath,
  getComponentName,
  jsPreprocessOptions
} = require('@dcloudio/uni-cli-shared')

const {
  updateUsingComponents
} = require('@dcloudio/uni-cli-shared/lib/cache')

const preprocessor = require('@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/preprocess')

const {
  resolve,
  normalizeNodeModules
} = require('./shared')

const {
  findBabelLoader,
  addDynamicImport
} = require('./babel/util')

const traverse = require('./babel/global-component-traverse')

const babelPluginCreateApp = require.resolve('./babel/plugin-create-app')

function addCreateApp (babelLoader) {
  babelLoader.options = babelLoader.options || {}
  if (!babelLoader.options.plugins) {
    babelLoader.options.plugins = []
  }
  babelLoader.options.plugins.push([babelPluginCreateApp])
}

module.exports = function (content) {
  this.cacheable && this.cacheable()

  if (this.resourceQuery) {
    const params = loaderUtils.parseQuery(this.resourceQuery)
    if (params && params.page) {
      params.page = decodeURIComponent(params.page)
      // import Vue from 'vue'是为了触发 vendor 合并
      let ext = '.vue'
      // nvue 跨平台编译，理论上不需要这么麻烦，直接不指定后缀即可，但可能开发者有同名 js 文件，导致引用错误
      if (process.env.UNI_USING_NVUE_COMPILER) {
        const vuePagePath = path.resolve(process.env.UNI_INPUT_DIR, normalizePath(params.page) + '.vue')
        if (!fs.existsSync(vuePagePath)) {
          const nvuePagePath = path.resolve(process.env.UNI_INPUT_DIR, normalizePath(params.page) +
                        '.nvue')
          if (fs.existsSync(nvuePagePath)) {
            ext = '.nvue'
          }
        }
      }
      return `
import Vue from 'vue'            
import Page from './${normalizePath(params.page)}${ext}'
createPage(Page)
`
    }
  } else {
    content = preprocessor.preprocess(content, jsPreprocessOptions.context, {
      type: jsPreprocessOptions.type
    })

    const resourcePath = 'app'

    const {
      state: {
        components
      }
    } = traverse(parser.parse(content, {
      sourceType: 'module',
      plugins: [
        'optionalChaining',
        'typescript',
        ['decorators', {
          decoratorsBeforeExport: true
        }],
        'classProperties'
      ]
    }), {
      components: []
    })

    const babelLoader = findBabelLoader(this.loaders)
    if (!babelLoader) {
      throw new Error('babel-loader 查找失败')
    } else {
      addCreateApp(babelLoader)
    }

    if (!components.length) {
      // 防止组件从有到无
      updateUsingComponents(resourcePath, Object.create(null), 'App')
      return content
    }

    const callback = this.async()

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
            source
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

      addDynamicImport(babelLoader, resourcePath, dynamicImports)

      updateUsingComponents(resourcePath, usingComponents, 'App')
      callback(null, content)
    }, err => {
      callback(err, content)
    })
  }
}
