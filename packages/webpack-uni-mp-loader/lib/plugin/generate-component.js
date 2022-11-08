const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const {
  removeExt,
  normalizePath
} = require('@dcloudio/uni-cli-shared')
const {
  getComponentSet
} = require('@dcloudio/uni-cli-shared/lib/cache')

const {
  isBuiltInComponentPath
} = require('@dcloudio/uni-cli-shared/lib/pages')

const {
  restoreNodeModules,
  createSource,
  getModuleId
} = require('../shared')

const EMPTY_COMPONENT_LEN = 'Component({})'.length

const uniPath = normalizePath(require('@dcloudio/uni-cli-shared/lib/platform').getMPRuntimePath())

function findModule (modules, resource, altResource) {
  return modules.find(
    module => {
      let moduleResource = module.resource
      if (
        !moduleResource ||
        (
          moduleResource.indexOf('.vue') === -1 &&
          moduleResource.indexOf('.nvue') === -1
        )
      ) {
        return
      }
      moduleResource = removeExt(module.resource)
      return moduleResource === resource || moduleResource === altResource
    }
  )
}

function findModuleId (compilation, modules, resource, altResource) {
  const module = findModule(modules, resource, altResource)
  return module && getModuleId(compilation, module)
}

function findModuleIdFromConcatenatedModules (compilation, modules, resource, altResource) {
  const module = modules.find(module => {
    return findModule(module.modules, resource, altResource)
  })
  return module && getModuleId(compilation, module)
}

function findComponentModuleId (compilation, modules, concatenatedModules, resource, altResource) {
  return findModuleId(compilation, modules, resource, altResource) ||
    findModuleIdFromConcatenatedModules(compilation, concatenatedModules, resource, altResource) ||
    resource
}

let lastComponents = []
// TODO 解决方案不太理想
module.exports = function generateComponent (compilation, jsonpFunction = 'webpackJsonp') {
  const curComponents = []
  const componentChunkNameMap = {}
  const components = getComponentSet()
  if (components.size) {
    const modules = Array.from(compilation.modules)

    const concatenatedModules = modules.filter(module => module.modules)
    let uniModule = modules.find(module => module.resource && normalizePath(module.resource) === uniPath)
    if (!uniModule && webpack.version[0] > 4) {
      uniModule = modules.find(module => module.rootModule && module.rootModule.resource && normalizePath(module.rootModule.resource) === uniPath)
    }
    const uniModuleId = getModuleId(compilation, uniModule)
    const vueOuterComponentSting = 'vueOuterComponents'

    compilation.getAssets().forEach(asset => {
      const name = asset.name
      // 判断是不是vue
      const isVueComponent = components.has(name.replace('.js', ''))
      // 独立分包外面的组件，复制到独立分包内，在components中看不到，所以需要单独处理
      const isVueOuterComponent = Boolean(name.endsWith('.js') && name.indexOf(vueOuterComponentSting) >= 0)
      if (isVueComponent || isVueOuterComponent) {
        curComponents.push(name.replace('.js', ''))

        if (asset.source.__$wrappered) {
          return
        }

        const chunkName = name.replace('.js', '-create-component')

        let moduleId = ''
        if (name.indexOf('node-modules') === 0) {
          const modulePath = removeExt(restoreNodeModules(name))
          let resource = normalizePath(path.resolve(process.env.UNI_INPUT_DIR, '..', modulePath))
          const altResource = normalizePath(path.resolve(process.env.UNI_INPUT_DIR, modulePath))

          if (modulePath.includes('@dcloudio') && isBuiltInComponentPath(modulePath)) {
            resource = normalizePath(path.resolve(process.env.UNI_CLI_CONTEXT, modulePath))
          }

          moduleId = findComponentModuleId(compilation, modules, concatenatedModules, resource, altResource)
        } else {
          const resource = removeExt(path.resolve(process.env.UNI_INPUT_DIR, name))
          moduleId = findComponentModuleId(compilation, modules, concatenatedModules, resource)
        }

        const origSource = asset.source.source()

        if (isVueComponent) {
          componentChunkNameMap[name] = moduleId
        } else if (isVueOuterComponent) {
          const startIndex = name.indexOf(vueOuterComponentSting) + vueOuterComponentSting.length + 1
          const rightOriginalComponentName = name.substring(startIndex)
          moduleId = componentChunkNameMap[rightOriginalComponentName]
        }

        if (origSource.length !== EMPTY_COMPONENT_LEN) { // 不是空组件
          const globalVar = process.env.UNI_PLATFORM === 'mp-alipay' ? 'my' : 'global'
          // 主要是为了解决支付宝旧版本， Component 方法只在组件 js 里有，需要挂在 my.defineComponent
          let beforeCode = ''
          if (process.env.UNI_PLATFORM === 'mp-alipay') {
            beforeCode = ';my.defineComponent || (my.defineComponent = Component);'
          }
          const source = beforeCode + origSource + (webpack.version[0] > 4
            ? `
;(${globalVar}["${jsonpFunction}"] = ${globalVar}["${jsonpFunction}"] || []).push([
    ['${chunkName}'],
    {},
    function(__webpack_require__){
      __webpack_require__('${uniModuleId}')['createComponent'](__webpack_require__(${JSON.stringify(moduleId)}))
    }
]);
`
            : `
;(${globalVar}["${jsonpFunction}"] = ${globalVar}["${jsonpFunction}"] || []).push([
    '${chunkName}',
    {
        '${chunkName}':(function(module, exports, __webpack_require__){
            __webpack_require__('${uniModuleId}')['createComponent'](__webpack_require__(${JSON.stringify(moduleId)}))
        })
    },
    [['${chunkName}']]
]);
`
          )
          const newSource = createSource(source)
          newSource.__$wrappered = true
          compilation.updateAsset(name, newSource)
        }
      }
    })
  }
  if (process.env.UNI_FEATURE_OBSOLETE !== 'false') {
    if (lastComponents.length) {
      for (const name of lastComponents) {
        if (!curComponents.includes(name)) {
          removeUnusedComponent(name) // 组件被移除
        }
      }
    }
    for (const name of curComponents) {
      if (!lastComponents.includes(name)) {
        addComponent(name) // 新增组件
      }
    }
    lastComponents = curComponents
  }
}

function addComponent (name) {
  const bakJson = path.join(process.env.UNI_OUTPUT_DIR, name + '.bak.json')
  if (fs.existsSync(bakJson)) {
    try {
      fs.renameSync(bakJson, path.join(process.env.UNI_OUTPUT_DIR, name + '.json'))
    } catch (e) { }
  }
}

function removeUnusedComponent (name) {
  try {
    fs.renameSync(path.join(process.env.UNI_OUTPUT_DIR, name + '.json'), path.join(process.env.UNI_OUTPUT_DIR, name +
      '.bak.json'))
  } catch (e) { }
}
