const fs = require('fs')
const fsExtra = require('fs-extra')
const path = require('path')
const merge = require('merge')

const {
  parsePages,
  normalizePath,
  getFlexDirection
} = require('@dcloudio/uni-cli-shared')

const {
  parseStyle
} = require('../../util')

const parseV3Config = require('./config-parser')

function parseConfig (appJson) {
  return {
    name: 'app-config.js',
    content: `__registerConfig(${JSON.stringify(appJson)});`
  }
}

const _toString = Object.prototype.toString

function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function normalizeNetworkTimeout (appJson) {
  if (!isPlainObject(appJson.networkTimeout)) {
    appJson.networkTimeout = {
      request: 6000,
      connectSocket: 6000,
      uploadFile: 6000,
      downloadFile: 6000
    }
  } else {
    if (typeof appJson.networkTimeout.request === 'undefined') {
      appJson.networkTimeout.request = 6000
    }
    if (typeof appJson.networkTimeout.connectSocket === 'undefined') {
      appJson.networkTimeout.connectSocket = 6000
    }
    if (typeof appJson.networkTimeout.uploadFile === 'undefined') {
      appJson.networkTimeout.uploadFile = 6000
    }
    if (typeof appJson.networkTimeout.downloadFile === 'undefined') {
      appJson.networkTimeout.downloadFile = 6000
    }
  }
}

module.exports = function (pagesJson, userManifestJson) {
  const {
    app
  } = require('../mp')(pagesJson, userManifestJson)

  const manifest = {
    name: 'manifest'
  }

  const appJson = app.content

  const {
    navigationBarTextStyle = 'white',
    navigationBarBackgroundColor = '#000000'
  } = appJson['window'] || {}

  const TABBAR_HEIGHT = 50

  let manifestJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, './manifest.json'), 'utf8'))

  // 状态栏
  manifestJson.plus.statusbar = {
    immersed: 'supportedDevice',
    style: navigationBarTextStyle === 'black' ? 'dark' : 'light',
    background: navigationBarBackgroundColor
  }
  // 用户配置覆盖默认配置
  manifestJson = merge.recursive(
    true,
    manifestJson, {
      id: userManifestJson.appid || '',
      name: userManifestJson.name || '',
      description: userManifestJson.description || '',
      version: {
        name: userManifestJson.versionName,
        code: userManifestJson.versionCode
      }
    }, {
      plus: userManifestJson['app-plus']
    }
  )

  const splashscreenOptions = userManifestJson['app-plus'] && userManifestJson['app-plus']['splashscreen']

  const hasAlwaysShowBeforeRender = splashscreenOptions && splashscreenOptions.hasOwnProperty(
    'alwaysShowBeforeRender')

  // 转换为老版本配置
  if (manifestJson.plus.modules) {
    manifestJson.permissions = manifestJson.plus.modules
    delete manifestJson.plus.modules
  }

  const distribute = manifestJson.plus.distribute

  if (distribute) {
    if (distribute.android) {
      manifestJson.plus.distribute.google = distribute.android
      delete manifestJson.plus.distribute.android
    }
    if (distribute.ios) {
      manifestJson.plus.distribute.apple = distribute.ios
      delete manifestJson.plus.distribute.ios
    }
    if (distribute.sdkConfigs) {
      manifestJson.plus.distribute.plugins = distribute.sdkConfigs
      delete manifestJson.plus.distribute.sdkConfigs
    }
  }

  // 地图坐标系
  if (manifestJson.permissions && manifestJson.permissions.Maps) {
    manifestJson.permissions.Maps.coordType = 'gcj02'
  }

  if (!manifestJson.permissions) {
    manifestJson.permissions = {}
  }

  const nvuePages = pagesJson.nvue && pagesJson.nvue.pages

  if (nvuePages && nvuePages.length) {
    const pages = {}
    nvuePages.forEach(({
      path,
      style
    }) => {
      pages[path] = {
        'window': parseStyle(style),
        'nvue': true
      }
    })

    appJson.nvue = {
      pages
    }

    if (pagesJson.nvue.entryPagePath) {
      appJson.nvue.entryPagePath = pagesJson.nvue.entryPagePath
    }
    // nvue 权限
    manifestJson.permissions.UniNView = {
      'description': 'UniNView原生渲染'
    }
  } else if (process.env.UNI_USING_V8) {
    // nvue 权限
    manifestJson.permissions.UniNView = {
      'description': 'UniNView原生渲染'
    }
  }

  // 启动页面配置
  if (process.env.NODE_ENV === 'development') {
    const condition = pagesJson.condition
    if (condition && Array.isArray(condition.list) && condition.list.length) {
      const list = condition.list
      let current = parseInt(condition.current) || 0
      if (current < 0) {
        current = 0
      }
      if (current >= list.length) {
        current = 0
      }
      manifestJson.plus.arguments = JSON.stringify(list[current])
    }
  }

  // 允许内联播放视频
  manifestJson.plus.allowsInlineMediaPlayback = true

  const addRenderAlways = function () {
    // "render": "always"
    if (!manifestJson.plus.launchwebview) {
      manifestJson.plus.launchwebview = {
        'render': 'always'
      }
    } else if (!manifestJson.plus.launchwebview.render) {
      manifestJson.plus.launchwebview.render = 'always'
    }
  }

  if (appJson.tabBar && appJson.tabBar.list && appJson.tabBar.list.length) {
    // 安全区配置 仅包含 tabBar 的时候才配置
    if (!manifestJson.plus.safearea) {
      manifestJson.plus.safearea = {
        background: appJson.tabBar.backgroundColor || '#FFFFFF',
        bottom: {
          offset: 'auto'
        }
      }
    }
    if (!process.env.UNI_USING_COMPONENTS) { // 非自定义组件模式下，仍旧添加 render always
      addRenderAlways()
    }
  } else {
    addRenderAlways()
  }

  let flexDir = false

  if (manifestJson.plus.nvueCompiler && manifestJson.plus.nvueCompiler === 'uni-app') {
    appJson.nvueCompiler = 'uni-app'
    flexDir = getFlexDirection(manifestJson.plus)
  } else {
    appJson.nvueCompiler = 'weex'
  }

  if (manifestJson.plus.renderer === 'native') {
    appJson.renderer = 'native'
  } else {
    appJson.renderer = 'auto'
  }

  const nvueCompilerFilePath = path.resolve(process.env.UNI_OUTPUT_DIR, '__uniappnvuecompiler.js')
  const nvueCompilerExists = fs.existsSync(nvueCompilerFilePath)

  if (appJson.nvueCompiler === 'uni-app') {
    if (!nvueCompilerExists) {
      fsExtra.outputFile(nvueCompilerFilePath, '')
    }
  } else {
    if (nvueCompilerExists) {
      fs.unlinkSync(nvueCompilerFilePath)
    }
  }

  const rendererFilePath = path.resolve(process.env.UNI_OUTPUT_DIR, '__uniapprenderer.js')
  const rendererExists = fs.existsSync(rendererFilePath)

  if (appJson.renderer === 'native') {
    if (!rendererExists) {
      fsExtra.outputFile(rendererFilePath, '')
    }
  } else {
    if (rendererExists) {
      fs.unlinkSync(rendererFilePath)
    }
  }

  appJson.splashscreen = {
    alwaysShowBeforeRender: false, // 是否启用白屏检测 关闭 splash
    autoclose: false // 是否 uni-app 框架关闭 splash
  }

  // 强制白屏检测
  if (manifestJson.plus.splashscreen) {
    if (!hasAlwaysShowBeforeRender && manifestJson.plus.splashscreen.autoclose === false) { // 兼容旧版本仅配置了 autoclose 为 false
      manifestJson.plus.splashscreen.alwaysShowBeforeRender = false
    }
    if (manifestJson.plus.splashscreen.alwaysShowBeforeRender) { // 白屏检测
      if (!manifestJson.plus.splashscreen.target) {
        manifestJson.plus.splashscreen.target = 'id:1'
      }
      manifestJson.plus.splashscreen.autoclose = true
      manifestJson.plus.splashscreen.delay = 0

      appJson.splashscreen.alwaysShowBeforeRender = true
    } else { // 不启用白屏检测
      delete manifestJson.plus.splashscreen.target

      if (manifestJson.plus.splashscreen.autoclose) { // 启用 uni-app 框架关闭 splash
        manifestJson.plus.splashscreen.autoclose = false // 原 5+ autoclose 改为 false
        appJson.splashscreen.autoclose = true
      }
    }
    delete manifestJson.plus.splashscreen.alwaysShowBeforeRender
  }

  appJson.appname = manifestJson.name

  if (!manifestJson.plus.distribute) {
    manifestJson.plus.distribute = {
      plugins: {}
    }
  }

  if (!manifestJson.plus.distribute.plugins) {
    manifestJson.plus.distribute.plugins = {}
  }

  // 录音支持 mp3
  manifestJson.plus.distribute.plugins.audio = {
    mp3: {
      description: 'Android平台录音支持MP3格式文件'
    }
  }

  // 有效值为 close,none
  if (!['close', 'none'].includes(manifestJson.plus.popGesture + '')) {
    manifestJson.plus.popGesture = 'close'
  }

  // 检查原生混淆选项
  const confusion = manifestJson.plus.confusion
  if (confusion && confusion.resources) {
    const resources = {}
    for (const key in confusion.resources) {
      if (!/\.nvue$/.test(key)) {
        throw new Error(`原生混淆仅支持 nvue 页面，错误的页面路径：${key}`)
      } else {
        resources[key.replace(/\.nvue$/, '.js')] = confusion.resources[key]
      }
      if (!Object.keys(appJson.nvue.pages).find(path => {
        const subNVues = appJson.nvue.pages[path].window.subNVues || []
        return path.replace(/\.html$/, '.nvue') === key || subNVues.find(({ path }) => path === key.replace(/\.nvue$/, ''))
      }) && !pagesJson.pages.find(({ style = {} }) => {
        style = Object.assign(style, style['app-plus'])
        const subNVues = style.subNVues || []
        return subNVues.find(({ path }) => path === key.replace(/\.nvue$/, ''))
      })) {
        throw new Error(`原生混淆页面未在项目内使用，错误的页面路径：${key}`)
      }
    }
    confusion.resources = resources
  }

  // uni-app
  const uniApp = require('../../../package.json')['uni-app']
  manifestJson.plus['uni-app'] = uniApp
  // 控制页类型
  manifestJson.plus['uni-app'].control = process.env.UNI_USING_V8 ? 'v8' : 'webview'
  manifestJson.plus['uni-app'].nvueCompiler = appJson.nvueCompiler
  manifestJson.plus['uni-app'].renderer = appJson.renderer
  if (flexDir) {
    manifestJson.plus['uni-app'].nvue = {
      'flex-direction': flexDir
    }
  }

  // 记录编译器版本号
  appJson.compilerVersion = uniApp.compilerVersion

  if (process.env.UNI_USING_V8) {
    let entryPagePath = appJson.pages[0]
    let conditionPagePath = false
    if (manifestJson.plus.arguments) {
      try {
        const args = JSON.parse(manifestJson.plus.arguments)
        if (args && (args.path || args.pathName)) {
          entryPagePath = conditionPagePath = args.path || args.pathName
        }
      } catch (e) {}
    }

    let isNVueEntryPage = appJson.nvue && appJson.nvue.entryPagePath
    if (conditionPagePath && isNVueEntryPage) {
      isNVueEntryPage = appJson.nvue.entryPagePath === conditionPagePath
    }
    manifestJson.plus.useragent.value = 'uni-app'
    manifestJson.launch_path = '__uniappview.html'
    Object.assign(manifestJson.plus.launchwebview, {
      id: '1',
      kernel: 'WKWebview',
      'uni-app': 'auto'
    })
    if (process.env.UNI_USING_NATIVE) {
      appJson.entryPagePath = appJson.nvue.entryPagePath
      // networkTimeout
      normalizeNetworkTimeout(appJson)
      appJson.page = Object.create(null)
      appJson.pages = Object.keys(appJson.nvue.pages).map(pagePath => {
        const newPagePath = pagePath.replace('.html', '')
        appJson.page[newPagePath] = {
          window: appJson.nvue.pages[pagePath].window,
          nvue: true
        }
        return newPagePath
      })

      delete appJson.nvue

      delete manifestJson.plus.launchwebview.kernel
      manifestJson.launch_path = ''
      Object.assign(manifestJson.plus.launchwebview, {
        uniNView: {
          path: appJson.entryPagePath
        }
      })
    } else if (isNVueEntryPage) {
      // 非纯 nvue 项目首页为 nvue 页面
      manifestJson.plus.launchwebview.id = '2'
    }
    // 带 tab
    if (pagesJson.tabBar && pagesJson.tabBar.list && pagesJson.tabBar.list.length) {
      const tabBar = manifestJson.plus.tabBar = Object.assign({}, pagesJson.tabBar)
      tabBar.borderStyle = tabBar.borderStyle === 'white' ? '#ffffff' : '#c6c6c6'
      tabBar.height = `${parseFloat(tabBar.height) || TABBAR_HEIGHT}px`
      // 非纯 nvue 项目首页为 nvue 页面
      if (!process.env.UNI_USING_NATIVE && isNVueEntryPage) {
        manifestJson.plus.launchwebview.id = '2'
      } else {
        // 首页是 tabBar 页面
        const item = tabBar.list.find(page => page.pagePath === (process.env.UNI_USING_NATIVE ? appJson.entryPagePath : entryPagePath))
        if (item) {
          tabBar.child = ['lauchwebview']
          tabBar.selected = tabBar.list.indexOf(item)
        }
      }
    }
  }

  if (!process.env.UNI_USING_COMPONENTS) {
    manifestJson.plus.launchwebview.kernel = 'UIWebview'
  }

  manifest.content = manifestJson

  // 分包合并
  if (appJson.subPackages && appJson.subPackages.length) {
    appJson.subPackages.forEach(subPackage => {
      if (subPackage.pages && subPackage.pages.length) {
        subPackage.pages.forEach(page => {
          appJson.pages.push(normalizePath(path.join(subPackage.root, page)))
        })
      }
    })
  }

  delete appJson.subPackages

  if (process.env.UNI_USING_NATIVE) {
    manifest.name = 'manifest.json'
    manifest.content = JSON.stringify(manifest.content)
    return [manifest, parseConfig(appJson)]
  }
  if (process.env.UNI_USING_V3) {
    appJson.entryPagePath = appJson.pages[0]

    appJson.page = Object.create(null)

    const addPage = function (pagePath, windowOptions) {
      delete windowOptions.usingComponents
      appJson.page[pagePath] = {
        window: windowOptions
      }
    }
    parsePages(pagesJson, function (page) {
      addPage(page.path, parseStyle(page.style))
    }, function (root, page) {
      addPage(normalizePath(path.join(root, page.path)), parseStyle(page.style, root))
    })
    manifest.name = 'manifest.json'
    manifest.content = JSON.stringify(manifest.content)
    return [manifest, parseV3Config(appJson)]
  }
  return [app, manifest]
}
