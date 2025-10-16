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
  normalizeNodeModules,
  getIssuer
} = require('./shared')

const {
  findBabelLoader,
  addDynamicImport
} = require('./babel/util')

const uniI18n = require('@dcloudio/uni-cli-i18n')

function convertCamelCaseToKebabCase (str) {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
}

function parseAsyncComponentComment (commentContent) {
  try {
    const config = JSON.parse(commentContent)
    return {
      placeholder: config.placeholder || 'view',
      platform: config.platform || 'mp-weixin'
    }
  } catch (e) {
    // 如果 JSON 解析失败，返回默认值
    return {
      placeholder: 'view',
      platform: 'mp-weixin'
    }
  }
}

function isPlatformMatch (configPlatform, currentPlatform) {
  if (!configPlatform || !currentPlatform) return false

  // 支持逗号分割的多平台配置
  const platforms = configPlatform.split(',').map(p => p.trim())
  return platforms.includes(currentPlatform)
}

function processAsyncComponentImports (content) {
  const asyncCustomComponents = []
  let processedContent = content

  // 处理基于注释的异步组件
  const commentImportRegex = /\/\*\s*@uni-async-component\s*({[^}]*})?\s*\*\/\s*\n\s*import\s+(\w+)\s+from\s+['"`]([^'"`]+)['"`]/g

  let match
  while ((match = commentImportRegex.exec(content)) !== null) {
    const [fullMatch, configJson, localName, importPath] = match
    const config = parseAsyncComponentComment(configJson || '{}')

    // 检查平台匹配
    if (isPlatformMatch(config.platform, process.env.UNI_PLATFORM)) {
      const componentTagName = convertCamelCaseToKebabCase(localName)

      asyncCustomComponents.push({
        name: componentTagName,
        value: importPath,
        placeholder: config.placeholder
      })
    }

    // 移除注释，保留 import 语句
    const newImportStatement = `import ${localName} from '${importPath}'`
    processedContent = processedContent.replace(fullMatch, newImportStatement)
  }

  return {
    content: processedContent,
    asyncCustomComponents
  }
}

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
  if (!type) {
    const moduleIssuer = getIssuer(this._compilation, this._module)
    if (moduleIssuer) {
      const moduleIssuerIssuer = getIssuer(this._compilation, moduleIssuer)
      if (moduleIssuerIssuer) {
        resourcePath = normalizeNodeModules(removeExt(normalizePath(path.relative(process.env.UNI_INPUT_DIR, moduleIssuerIssuer.resource))))
        if (resourcePath === 'App') {
          type = 'App'
        } else if (process.UNI_ENTRY[resourcePath]) {
          type = 'Page'
        }
      }
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

  // 处理异步组件导入（在 babel 转换之前）
  const asyncComponentInfo = processAsyncComponentImports(content)
  content = asyncComponentInfo.content

  const {
    state: {
      components
    }
  } = traverse(parser.parse(content, getBabelParserOptions()), {
    type,
    components: [],
    asyncCustomComponents: asyncComponentInfo.asyncCustomComponents,
    filename: this.resourcePath
  })

  const asyncCustomComponents = asyncComponentInfo.asyncCustomComponents

  const callback = this.async()

  if (!components.length && !asyncCustomComponents.length) {
    if (type === 'App') {
      callback(null, content, map)
      return
    }
    // 防止组件从有到无，App.vue 中不支持使用组件
    updateUsingComponents(resourcePath, Object.create(null), type, content, asyncCustomComponents)
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

    let babelLoader = findBabelLoader(this.loaders)
    if (!babelLoader) {
      callback(new Error(uniI18n.__('mpLoader.findFail', {
        0: 'babel-loader'
      })), content)
    } else {
      const webpack = require('webpack')
      if (webpack.version[0] > 4) {
        // clone babelLoader and options
        const index = this.loaders.indexOf(babelLoader)
        const newBabelLoader = Object.assign({}, babelLoader)
        Object.assign(newBabelLoader, { options: Object.assign({}, babelLoader.options) })
        this.loaders.splice(index, 1, newBabelLoader)
        babelLoader = newBabelLoader
      }
      addDynamicImport(babelLoader, resourcePath, dynamicImports)

      updateUsingComponents(resourcePath, usingComponents, type, content, asyncCustomComponents)
      callback(null, content, map)
    }
  }, err => {
    callback(err, content, map)
  })
}
