const path = require('path')

const {
  normalizePath
} = require('@dcloudio/uni-cli-shared')

const {
  getPageSet,
  getJsonFileMap,
  getChangedJsonFileMap
} = require('@dcloudio/uni-cli-shared/lib/cache')

// 主要解决 extends 且未实际引用的组件
const EMPTY_COMPONENT = `Component({})`

const usingComponentsMap = {}

function analyzeUsingComponents () {
  if (!process.env.UNI_OPT_SUBPACKAGES) {
    return
  }
  const pageSet = getPageSet()
  const jsonFileMap = getJsonFileMap()

  // 生成所有组件引用关系
  for (let name of jsonFileMap.keys()) {
    const jsonObj = JSON.parse(jsonFileMap.get(name))
    const usingComponents = jsonObj.usingComponents
    if (!usingComponents || !pageSet.has(name)) {
      continue
    }
    // usingComponentsMap[name] = {}

    Object.keys(usingComponents).forEach(componentName => {
      const componentPath = usingComponents[componentName].slice(1)
      if (!usingComponentsMap[componentPath]) {
        usingComponentsMap[componentPath] = new Set()
      }
      usingComponentsMap[componentPath].add(name)
    })
  }

  const subPackageRoots = Object.keys(process.UNI_SUBPACKAGES)

  const findSubPackage = function (pages) {
    const pkgs = new Set()
    for (let i = 0; i < pages.length; i++) {
      const pagePath = pages[i]
      const pkgRoot = subPackageRoots.find(root => pagePath.indexOf(root) === 0)
      if (!pkgRoot) { // 被非分包引用
        return false
      }
      pkgs.add(pkgRoot)
      if (pkgs.length > 1) { // 被多个分包引用
        return false
      }
    }
    return [...pkgs][0]
  }

  Object.keys(usingComponentsMap).forEach(componentName => {
    const subPackage = findSubPackage([...usingComponentsMap[componentName]])
    if (subPackage && componentName.indexOf(subPackage) !== 0) { // 仅存在一个子包引用且未在该子包
      console.warn(`自定义组件 ${componentName} 建议移动到子包 ${subPackage} 内`)
    }
  })

  // 生成所有组件递归引用关系
  //   Object.keys(usingComponentsMap).forEach(name => {
  //     Object.keys(usingComponentsMap[name]).forEach(componentName => {
  //       const usingComponents = usingComponentsMap[componentName.slice(1)]
  //       if (usingComponents) {
  //         usingComponentsMap[name][componentName] = usingComponents
  //       }
  //     })
  //   })
  //
  //   // 生成页面组件引用关系
  //   const pageSet = getPageSet()
  //   const pagesUsingComponents = Object.keys(usingComponentsMap).reduce((pages, name) => {
  //     if (pageSet.has(name)) {
  //       pages[name] = usingComponentsMap[name]
  //     }
  //     return pages
  //   }, {})
}

module.exports = function generateJson (compilation) {
  analyzeUsingComponents()

  const jsonFileMap = getChangedJsonFileMap()
  for (let name of jsonFileMap.keys()) {
    const jsonObj = JSON.parse(jsonFileMap.get(name))

    // customUsingComponents
    if (jsonObj.customUsingComponents && Object.keys(jsonObj.customUsingComponents)) {
      jsonObj.usingComponents = Object.assign(jsonObj.customUsingComponents, jsonObj.usingComponents)
    }
    delete jsonObj.customUsingComponents
    // usingGlobalComponents
    if (jsonObj.usingGlobalComponents && Object.keys(jsonObj.usingGlobalComponents)) {
      jsonObj.usingComponents = Object.assign(jsonObj.usingGlobalComponents, jsonObj.usingComponents)
    }
    delete jsonObj.usingGlobalComponents

    if (jsonObj.genericComponents && jsonObj.genericComponents.length) { // scoped slots
      // 生成genericComponents json
      const genericComponents = Object.create(null)

      const scopedSlotComponents = []
      jsonObj.genericComponents.forEach(genericComponentName => {
        const genericComponentFile = normalizePath(
          path.join(path.dirname(name), genericComponentName + '.json')
        )
        genericComponents[genericComponentName] = '/' +
          genericComponentFile.replace(
            path.extname(genericComponentFile), ''
          )
        scopedSlotComponents.push(genericComponentFile)
      })

      jsonObj.usingComponents = Object.assign(genericComponents, jsonObj.usingComponents)

      const scopedSlotComponentJson = {
        component: true,
        usingComponents: jsonObj.usingComponents
      }

      const scopedSlotComponentJsonSource = JSON.stringify(scopedSlotComponentJson, null, 2)

      scopedSlotComponents.forEach(scopedSlotComponent => {
        compilation.assets[scopedSlotComponent] = {
          size () {
            return Buffer.byteLength(scopedSlotComponentJsonSource, 'utf8')
          },
          source () {
            return scopedSlotComponentJsonSource
          }
        }
      })
    }

    delete jsonObj.genericComponents

    if (process.env.UNI_PLATFORM !== 'app-plus' && process.env.UNI_PLATFORM !== 'h5') {
      delete jsonObj.navigationBarShadow
    }

    const source = JSON.stringify(jsonObj, null, 2)

    const jsFile = name.replace('.json', '.js')
    if (
      !['app.js', 'manifest.js', 'project.config.js', 'project.swan.js'].includes(jsFile) &&
      !compilation.assets[jsFile]
    ) {
      compilation.assets[jsFile] = {
        size () {
          return Buffer.byteLength(EMPTY_COMPONENT, 'utf8')
        },
        source () {
          return EMPTY_COMPONENT
        }
      }
    }
    compilation.assets[name] = {
      size () {
        return Buffer.byteLength(source, 'utf8')
      },
      source () {
        return source
      }
    }
  }
}
