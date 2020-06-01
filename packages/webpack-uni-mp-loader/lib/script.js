const path = require('path')
const babel = require('@babel/core')

const {
  hashify,
  removeExt,
  hasModule
} = require('@dcloudio/uni-cli-shared')

const {
  resolve,
  cacheCompilerOptions
} = require('./shared')

const babelPluginScopedComponent = require('./babel-plugin-scoped-component')

module.exports = function (content, map) {
  if (process.env.UNI_USING_COMPONENTS) {
    if (process.env.UNI_PLATFORM === 'app-plus') {
      return require('./script-new').call(this, content, map)
    }
    return require('./script-new').call(this, content, map)
  }

  this.cacheable && this.cacheable()
  // 单页面 解析 component 依赖
  const plugins = []
  if (hasModule('@babel/plugin-syntax-typescript')) {
    plugins.push('@babel/plugin-syntax-typescript')
    plugins.push([
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ])
  }
  plugins.push(babelPluginScopedComponent)
  const ast = babel.transform(content, {
    configFile: false,
    plugins
  })

  const components = ast.metadata.components || {}

  const imports = {}

  const callback = this.async()

  Promise.all(Object.keys(components).map(name => {
    return resolve.call(this, components[name]).then(resolved => {
      resolved = path.relative(process.env.UNI_INPUT_DIR, resolved)
      const hashed = hashify(resolved)
      imports[name] = {
        name: hashed,
        src: removeExt(resolved)
      }
    })
  })).then(() => {
    const realResourcePath = path.relative(process.env.UNI_INPUT_DIR, this.resourcePath)
    const compilerOptions = {
      name: hashify(realResourcePath),
      imports
    }
    cacheCompilerOptions(realResourcePath, compilerOptions)
    callback(null, content, map)
  }, err => {
    callback(err, content, map)
  })
}
