const fs = require('fs')
const path = require('path')
const {
  removeExt,
  normalizePath
} = require('@dcloudio/uni-cli-shared')
const {
  getComponentSet
} = require('@dcloudio/uni-cli-shared/lib/cache')

const {
  restoreNodeModules
} = require('../shared')

const uniPath = normalizePath(require.resolve('@dcloudio/uni-' + process.env.UNI_PLATFORM))

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

function findModuleId (modules, resource, altResource) {
  const module = findModule(modules, resource, altResource)
  return module && module.id
}

function findModuleIdFromConcatenatedModules (modules, resource, altResource) {
  const module = modules.find(module => {
    return findModule(module.modules, resource, altResource)
  })
  return module && module.id
}

function findComponentModuleId (modules, concatenatedModules, resource, altResource) {
  return findModuleId(modules, resource, altResource) ||
    findModuleIdFromConcatenatedModules(concatenatedModules, resource, altResource) ||
    resource
}

let lastComponents = []
// TODO 解决方案不太理想
module.exports = function generateComponent (compilation) {
  const curComponents = []
  const components = getComponentSet()
  if (components.size) {
    const assets = compilation.assets
    const modules = compilation.modules

    const concatenatedModules = modules.filter(module => module.modules)
    const uniModuleId = modules.find(module => module.resource && normalizePath(module.resource) === uniPath).id

    Object.keys(assets).forEach(name => {
      if (components.has(name.replace('.js', ''))) {
        curComponents.push(name.replace('.js', ''))
        const chunkName = name.replace('.js', '-create-component')

        let moduleId = ''
        if (name.indexOf('node-modules') === 0) {
          const modulePath = removeExt(restoreNodeModules(name))
          const resource = normalizePath(path.resolve(process.env.UNI_INPUT_DIR, '..', modulePath))
          const altResource = normalizePath(path.resolve(process.env.UNI_INPUT_DIR, modulePath))
          moduleId = findComponentModuleId(modules, concatenatedModules, resource, altResource)
        } else {
          const resource = removeExt(path.resolve(process.env.UNI_INPUT_DIR, name))
          moduleId = findComponentModuleId(modules, concatenatedModules, resource)
        }

        const origSource = assets[name].source()
        if (origSource.length !== 'Component({})'.length) { // 不是空组件
          const globalVar = process.env.UNI_PLATFORM === 'mp-alipay' ? 'my' : 'global'
          // 主要是为了解决支付宝旧版本， Component 方法只在组件 js 里有，需要挂在 my.defineComponent
          let beforeCode = ''
          if (process.env.UNI_PLATFORM === 'mp-alipay') {
            beforeCode = ';my.defineComponent || (my.defineComponent = Component);'
          }
          const source = beforeCode + origSource +
            `
;(${globalVar}["webpackJsonp"] = ${globalVar}["webpackJsonp"] || []).push([
    '${chunkName}',
    {
        '${chunkName}':(function(module, exports, __webpack_require__){
            __webpack_require__('${uniModuleId}')['createComponent'](__webpack_require__(${JSON.stringify(moduleId)}))
        })
    },
    [['${chunkName}']]
]);
`
          assets[name] = {
            size () {
              return Buffer.byteLength(source, 'utf8')
            },
            source () {
              return source
            }
          }
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
    } catch (e) {}
  }
}

function removeUnusedComponent (name) {
  try {
    fs.renameSync(path.join(process.env.UNI_OUTPUT_DIR, name + '.json'), path.join(process.env.UNI_OUTPUT_DIR, name +
      '.bak.json'))
  } catch (e) {}
}
