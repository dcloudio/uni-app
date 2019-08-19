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
// TODO 解决方案不太理想
module.exports = function generateComponent (compilation) {
  const components = getComponentSet()
  if (components.size) {
    const assets = compilation.assets
    const modules = compilation.modules

    const uniModuleId = modules.find(module => module.resource && normalizePath(module.resource) === uniPath).id

    Object.keys(assets).forEach(name => {
      if (components.has(name.replace('.js', ''))) {
        const chunkName = name.replace('.js', '-create-component')

        let moduleId = ''
        if (name.indexOf('node-modules') === 0) {
          const modulePath = removeExt(restoreNodeModules(name))
          const resource = normalizePath(path.resolve(process.env.UNI_INPUT_DIR, '..', modulePath))
          const altResource = normalizePath(path.resolve(process.env.UNI_INPUT_DIR, modulePath))
          moduleId = modules.find(
            module => {
              if (module.resource) {
                const moduleResource = removeExt(module.resource)
                return (
                  module.resource.indexOf('.vue') !== -1 ||
                                        module.resource.indexOf('.nvue') !== -1
                ) &&
                                    (
                                      moduleResource === resource ||
                                        moduleResource === altResource
                                    )
              }
            }).id
        } else {
          const resource = removeExt(path.resolve(process.env.UNI_INPUT_DIR, name))
          moduleId = modules.find(
            module => {
              return module.resource &&
                                (
                                  module.resource.indexOf('.vue') !== -1 ||
                                    module.resource.indexOf('.nvue') !== -1
                                ) &&
                                removeExt(module.resource) === resource
            }).id
        }

        const origSource = assets[name].source()
        if (origSource.length !== `Component({})`.length) { // 不是空组件
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
}
