const fs = require('fs')
const path = require('path')

const apis = require('../lib/apis')

const AUTO_LOADS = [
  'upx2px',
  'canIUse',

  'getSystemInfo',
  'getSystemInfoSync',

  'navigateTo',
  'redirectTo',
  'switchTab',
  'reLaunch',
  'navigateBack'
]

const TOAST_DEPS = [
  ['/platforms/h5/components/app/popup/toast.vue', 'Toast'],
  ['/platforms/h5/components/app/popup/mixins/toast.js', 'ToastMixin']
]

// TODO 暂不考虑 head,tabBar 的动态拆分
const DEPS = {
  'chooseLocation': [
    ['/platforms/h5/components/system-routes/choose-location/index.vue', 'ChooseLocation']
  ],
  'openLocation': [
    ['/platforms/h5/components/system-routes/open-location/index.vue', 'OpenLocation']
  ],
  'previewImage': [
    ['/platforms/h5/components/system-routes/preview-image/index.vue', 'PreviewImage']
  ],
  'showToast': TOAST_DEPS,
  'hideToast': TOAST_DEPS,
  'showLoading': TOAST_DEPS,
  'hideLoading': TOAST_DEPS,
  'showModal': [
    ['/platforms/h5/components/app/popup/modal.vue', 'Modal'],
    ['/platforms/h5/components/app/popup/mixins/modal.js', 'ModalMixin']
  ],
  'showActionSheet': [
    ['/platforms/h5/components/app/popup/actionSheet.vue', 'Modal'],
    ['/platforms/h5/components/app/popup/mixins/action-sheet.js', 'ActionSheetMixin']
  ],
  'createSelectorQuery': [
    ['/core/view/bridge/subscribe/api/request-component-info.js', 'requestComponentInfo']
  ],
  'createIntersectionObserver': [
    ['/core/view/bridge/subscribe/api/request-component-observer.js', 'requestComponentObserver'],
    ['/core/view/bridge/subscribe/api/request-component-observer.js', 'destroyComponentObserver']
  ]
}

// 检查依赖文件是否存在
Object.keys(DEPS).reduce(function (depFiles, name) {
  DEPS[name].forEach(function (dep) {
    depFiles.add(dep[0])
  })
  return depFiles
}, new Set()).forEach(file => {
  if (!fs.existsSync(path.join(__dirname, '../src', file))) {
    console.error(file + ' 不存在')
    process.exit(0)
  }
})

function parseApiManifestDeps (manifest, protocol) {
  // 解析 platform 依赖
  Object.keys(manifest).forEach(name => {
    const deps = manifest[name][1]
    if (deps.length) {
      deps.forEach(dep => {
        if (manifest[dep[1]]) {
          dep[0] = manifest[dep[1]][0]
        } else {
          console.error(`依赖模块[${dep[1]}]不存在`)
        }
      })
    }
  })
  // 解析 protocol 依赖
  Object.keys(manifest).forEach(name => {
    const deps = manifest[name][1]
    if (protocol[name]) {
      deps.push([protocol[name], name])
    } else {
      console.warn(`${name} 缺少 protocol`)
    }
  })
  // 追加默认依赖
  Object.keys(DEPS).forEach(name => {
    if (manifest[name]) {
      manifest[name][1].push(...DEPS[name])
    } else {
      console.error(`缺少 ${name}`)
    }
  })
  // 设置自动加载标记
  AUTO_LOADS.forEach(name => {
    if (manifest[name]) {
      manifest[name][2] = true
    } else {
      console.error(`缺少 ${name}`)
    }
  })
}

module.exports = {
  generateApiManifest (manifest, protocol) {
    if (!Object.keys(manifest).length) {
      throw new Error('api manifest.json 生成失败')
    }
    parseApiManifestDeps(manifest, protocol)

    const manifestJson = Object.create(null)
    const todoApis = []
    apis.forEach(name => {
      if (manifest[name]) {
        manifestJson[name] = manifest[name]
      } else {
        todoApis.push(name)
      }
    })

    if (todoApis.length) {
      console.log('\n')
      console.warn(`${process.env.UNI_PLATFORM} 平台缺少以下 API  实现(共 ${todoApis.length} 个)`)
      todoApis.forEach(name => {
        console.warn(name)
      })
    }

    fs.writeFileSync(path.resolve(__dirname, '../packages/uni-' + process.env.UNI_PLATFORM + '/manifest.json'),
      JSON.stringify(manifestJson, null, 4)
    )
  }
}
