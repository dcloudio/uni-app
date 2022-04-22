const fs = require('fs')
const path = require('path')
const {
  removeExt,
  normalizePath,
  getPlatformExts
} = require('@dcloudio/uni-cli-shared')
const {
  getComponentSet
} = require('@dcloudio/uni-cli-shared/lib/cache')

const {
  isBuiltInComponentPath
} = require('@dcloudio/uni-cli-shared/lib/pages')

const {
  restoreNodeModules
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
module.exports = function generateComponent (compilation, jsonpFunction = 'webpackJsonp') {
  const curComponents = []
  const components = getComponentSet()
  if (components.size) {
    const assets = compilation.assets
    const modules = compilation.modules

    const concatenatedModules = modules.filter(module => module.modules)
    const uniModuleId = modules.find(module => module.resource && normalizePath(module.resource) === uniPath).id
    const styleImports = {}
    const fixSlots = {}

    Object.keys(assets).forEach(name => {
      if (components.has(name.replace('.js', ''))) {
        curComponents.push(name.replace('.js', ''))

        if (assets[name].source.__$wrappered) {
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

          moduleId = findComponentModuleId(modules, concatenatedModules, resource, altResource)
        } else {
          const resource = removeExt(path.resolve(process.env.UNI_INPUT_DIR, name))
          moduleId = findComponentModuleId(modules, concatenatedModules, resource)
        }

        const origSource = assets[name].source()
        if (origSource.length !== EMPTY_COMPONENT_LEN) { // 不是空组件
          const globalVar = process.env.UNI_PLATFORM === 'mp-alipay' ? 'my' : 'global'
          // 主要是为了解决支付宝旧版本， Component 方法只在组件 js 里有，需要挂在 my.defineComponent
          let beforeCode = ''
          if (process.env.UNI_PLATFORM === 'mp-alipay') {
            beforeCode = ';my.defineComponent || (my.defineComponent = Component);'
          }
          const source = beforeCode + origSource +
            `
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
          const newSource = function () {
            return source
          }
          newSource.__$wrappered = true
          assets[name].source = newSource
        }
      }
      const styleExtname = getPlatformExts().style
      if (name.endsWith(styleExtname)) {
        // 移除部分含有错误引用的 wxss 文件
        let origSource = assets[name].source()
        origSource = origSource.trim ? origSource.trim() : ''
        const result = origSource.match(/^@import ["'](.+?)["']$/)
        if (result) {
          const stylePath = normalizePath(path.join(path.dirname(name), result[1]))
          if (Object.keys(assets).includes(stylePath)) {
            styleImports[stylePath] = styleImports[stylePath] || []
            styleImports[stylePath].push(name)
          } else {
            if (styleImports[name]) {
              styleImports[name].forEach(name => delete assets[name])
              delete styleImports[name]
            }
            delete assets[name]
          }
        }
      }
      // 处理字节跳动|飞书小程序作用域插槽
      const fixExtname = '.fix'
      if (name.endsWith(fixExtname)) {
        const source = assets[name].source()
        const [ownerName, parentName, componentName, slotName] = source.split(',')
        const json = assets[ownerName + '.json']
        const jsonSource = json && json.source()
        if (jsonSource) {
          const data = JSON.parse(jsonSource)
          const usingComponents = data.usingComponents || {}
          const componentPath = normalizePath(path.relative('/', usingComponents[parentName]))
          const slots = fixSlots[componentPath] = fixSlots[componentPath] || {}
          const slot = slots[slotName] = slots[slotName] || {}
          slot[componentName] = '/' + name.replace(fixExtname, '')
          delete assets[name]

          const jsonFile = assets[`${componentPath}.json`]
          if (jsonFile) {
            const oldSource = jsonFile.__$oldSource || jsonFile.source()
            const sourceObj = JSON.parse(oldSource)
            Object.values(slots).forEach(components => {
              const usingComponents = sourceObj.usingComponents = sourceObj.usingComponents || {}
              Object.assign(usingComponents, components)
            })
            delete sourceObj.componentGenerics
            const source = JSON.stringify(sourceObj, null, 2)
            jsonFile.source = function () {
              return source
            }
            jsonFile.__$oldSource = oldSource
          }

          const templateFile = assets[`${componentPath}${getPlatformExts().template}`]
          if (templateFile) {
            const oldSource = templateFile.__$oldSource || templateFile.source()
            let templateSource
            Object.keys(slots).forEach(name => {
              const reg = new RegExp(`<${name} (.+?)></${name}>`)
              templateSource = oldSource.replace(reg, string => {
                const props = string.match(reg)[1]
                return Object.keys(slots[name]).map(key => {
                  return `<block tt:if="{{generic['${name.replace(/^scoped-slots-/, '')}']==='${key}'}}"><${key} ${props}></${key}></block>`
                }).join('')
              })
            })
            templateFile.source = function () {
              return templateSource
            }
            templateFile.__$oldSource = oldSource
          }
        }
      }
    })
  }
  // fix mp-qq https://github.com/dcloudio/uni-app/issues/2648
  const appJsonFile = compilation.assets['app.json']
  if (process.env.UNI_PLATFORM === 'mp-qq' && appJsonFile) {
    const obj = JSON.parse(appJsonFile.source())
    if (obj && obj.usingComponents && !Object.keys(obj.usingComponents).length) {
      const componentName = 'fix-2648'
      obj.usingComponents[componentName] = `/${componentName}`
      const source = JSON.stringify(obj, null, 2)
      appJsonFile.source = function () {
        return source
      }
      const files = [
        {
          ext: 'qml',
          source: '<!-- https://github.com/dcloudio/uni-app/issues/2648 -->'
        },
        {
          ext: 'js',
          source: 'Component({})'
        },
        {
          ext: 'json',
          source: '{"component":true}'
        }
      ]
      files.forEach(({ ext, source }) => {
        compilation.assets[`${componentName}.${ext}`] = {
          size () {
            return Buffer.byteLength(source, 'utf8')
          },
          source () {
            return source
          }
        }
      })
    }
  }
  // fix mp-alipay plugin
  if (process.env.UNI_PLATFORM === 'mp-alipay' && appJsonFile) {
    const obj = JSON.parse(appJsonFile.source())
    if (obj && obj.usingComponents && !Object.keys(obj.usingComponents).length) {
      const componentName = 'plugin-wrapper'
      obj.usingComponents[componentName] = `/${componentName}`
      const source = JSON.stringify(obj, null, 2)
      appJsonFile.source = function () {
        return source
      }
      const files = [
        {
          ext: 'axml',
          source: '<slot></slot>'
        },
        {
          ext: 'js',
          source: 'Component({onInit(){this.props.onPluginWrap(this)},didUnmount(){this.props.onPluginWrap(this,true)}})'
        },
        {
          ext: 'json',
          source: '{"component":true}'
        }
      ]
      files.forEach(({ ext, source }) => {
        compilation.assets[`${componentName}.${ext}`] = {
          size () {
            return Buffer.byteLength(source, 'utf8')
          },
          source () {
            return source
          }
        }
      })
    }
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
