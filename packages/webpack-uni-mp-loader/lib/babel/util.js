const t = require('@babel/types')

const hyphenateRE = /\B([A-Z])/g

function cached (fn) {
  const cache = Object.create(null)
  return function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

const hyphenate = cached((str) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

function findImportDeclaration (identifierName, bindings) {
  const binding = bindings[identifierName]
  if (!binding) {
    return
  }

  if (t.isImportDeclaration(binding.path.parent)) {
    return binding.path.parentPath
  }
}

function parseComponents (names, bindings, path) {
  const components = []
  const dynamicImportMap = new Map()
  names.forEach(({
    name,
    value
  }) => {
    const importDeclaration = findImportDeclaration(value, bindings)
    if (!importDeclaration) {
      throw new Error(`组件 ${name} 引用错误,仅支持 import 方式引入组件`)
    }
    let source = importDeclaration.node.source.value
    if (process.UNI_LIBRARIES && process.UNI_LIBRARIES.includes(source)) {
      const componentName = hyphenate(name)
      source = source + '/lib/' + componentName + '/' + componentName
    }
    const dynamicImportArray = dynamicImportMap.get(importDeclaration) || []
    dynamicImportArray.push({
      name,
      value,
      source
    })
    dynamicImportMap.set(importDeclaration, dynamicImportArray)
  })

  const importDeclarations = dynamicImportMap.keys()
  for (const importDeclaration of importDeclarations) {
    const dynamicImportArray = dynamicImportMap.get(importDeclaration)
    dynamicImportArray.forEach((dynamicImport) => {
      components.push(dynamicImport)
    })
    importDeclaration.remove()
  }
  return components
}

function findBabelLoader (loaders) {
  return loaders.find(loader => loader.path.indexOf('babel-loader') !== -1)
}

const babelPluginDynamicImport = require.resolve('./plugin-dynamic-import')

function addDynamicImport (babelLoader, resourcePath, dynamicImports) {
  babelLoader.options = babelLoader.options || {}
  if (!babelLoader.options.plugins) {
    babelLoader.options.plugins = []
  }
  babelLoader.options.plugins.push([babelPluginDynamicImport, {
    resourcePath,
    dynamicImports
  }])
}

module.exports = {
  addDynamicImport,
  findBabelLoader,
  parseComponents
}
