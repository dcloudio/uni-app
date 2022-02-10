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
const EMPTY_COMPONENT = 'Component({})'

const usingComponentsMap = {}

// 百度小程序动态组件库 usingSwanComponents 引用组件
const mpBaiduDynamicLibs = [
  'dynamicLib://editorLib/editor',
  'dynamicLib://echartsLib/chart',
  'dynamicLib://myModelviewer/modelviewer',
  'dynamicLib://myDynamicLib/panoviewer',
  'dynamicLib://myDynamicLib/spintileviewer',
  'dynamicLib://myDynamicLib/vrvideo'
]

function analyzeUsingComponents () {
  if (!process.env.UNI_OPT_SUBPACKAGES) {
    return
  }
  const pageSet = getPageSet()
  const jsonFileMap = getJsonFileMap()

  // 生成所有组件引用关系
  for (const name of jsonFileMap.keys()) {
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
      if (pkgs.size > 1) { // 被多个分包引用
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

const parseRequirePath = path => /^[A-z]/.test(path) ? `./${path}` : path

function normalizeUsingComponents (file, usingComponents) {
  const names = Object.keys(usingComponents)
  if (!names.length) {
    return usingComponents
  }
  file = path.dirname('/' + file)
  names.forEach(name => {
    usingComponents[name] = normalizePath(parseRequirePath(path.relative(file, usingComponents[name])))
  })
  return usingComponents
}

module.exports = function generateJson (compilation) {
  analyzeUsingComponents()

  const jsonFileMap = getChangedJsonFileMap()
  for (const name of jsonFileMap.keys()) {
    const jsonObj = JSON.parse(jsonFileMap.get(name))
    if (process.env.UNI_PLATFORM === 'app-plus') { // App平台默认增加usingComponents,激活__wxAppCode__
      jsonObj.usingComponents = jsonObj.usingComponents || {}
    }
    // customUsingComponents
    if (jsonObj.customUsingComponents && Object.keys(jsonObj.customUsingComponents).length) {
      jsonObj.usingComponents = Object.assign(jsonObj.customUsingComponents, jsonObj.usingComponents)
    }
    delete jsonObj.customUsingComponents
    // usingGlobalComponents
    if (jsonObj.usingGlobalComponents && Object.keys(jsonObj.usingGlobalComponents).length) {
      jsonObj.usingComponents = Object.assign(jsonObj.usingGlobalComponents, jsonObj.usingComponents)
    }
    delete jsonObj.usingGlobalComponents

    // usingAutoImportComponents
    if (jsonObj.usingAutoImportComponents && Object.keys(jsonObj.usingAutoImportComponents).length) {
      jsonObj.usingComponents = Object.assign(jsonObj.usingAutoImportComponents, jsonObj.usingComponents)
    }
    delete jsonObj.usingAutoImportComponents

    // 百度小程序插件内组件使用 usingSwanComponents
    if (process.env.UNI_PLATFORM === 'mp-baidu') {
      const usingComponents = jsonObj.usingComponents || {}
      Object.keys(usingComponents).forEach(key => {
        const value = usingComponents[key]
        if (value.includes('://')) {
          /**
           * 部分动态库组件（如：editor）使用‘usingSwanComponents’ 引入
           * 部分动态库组件（如：swan-sitemap-list）使用'usingComponents'引入
           * 做白名单机制
           */
          if (mpBaiduDynamicLibs.includes(value)) {
            delete usingComponents[key]
            jsonObj.usingSwanComponents = jsonObj.usingSwanComponents || {}
            jsonObj.usingSwanComponents[key] = value
          }
        }
      })
    }
    // fix mp-alipay plugin
    if (process.env.UNI_PLATFORM === 'mp-alipay') {
      const usingComponents = jsonObj.usingComponents || {}
      if (Object.values(usingComponents).find(value => value.startsWith('plugin://'))) {
        const componentName = 'plugin-wrapper'
        usingComponents[componentName] = '/' + componentName
      }
    }

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

    if ((process.env.UNI_SUBPACKGE || process.env.UNI_MP_PLUGIN) && jsonObj.usingComponents) {
      jsonObj.usingComponents = normalizeUsingComponents(name, jsonObj.usingComponents)
    }
    const source = JSON.stringify(jsonObj, null, 2)

    const jsFile = name.replace('.json', '.js')
    if (
      ![
        'app.js',
        'manifest.js',
        'mini.project.js',
        'quickapp.config.js',
        'project.config.js',
        'project.swan.js'
      ].includes(
        jsFile) &&
      !compilation.assets[jsFile]
    ) {
      const jsFileAsset = {
        size () {
          return Buffer.byteLength(EMPTY_COMPONENT, 'utf8')
        },
        source () {
          return EMPTY_COMPONENT
        }
      }
      compilation.assets[jsFile] = jsFileAsset
    }
    const jsonAsset = {
      size () {
        return Buffer.byteLength(source, 'utf8')
      },
      source () {
        return source
      }
    }

    compilation.assets[name] = jsonAsset
  }
  if (process.env.UNI_USING_CACHE && jsonFileMap.size) {
    setTimeout(() => {
      require('@dcloudio/uni-cli-shared/lib/cache').store()
    }, 50)
  }
}
