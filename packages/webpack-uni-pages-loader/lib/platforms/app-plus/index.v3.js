const path = require('path')

const {
  normalizePath
} = require('@dcloudio/uni-cli-shared')

const {
  parsePages,
  addPageUsingComponents
} = require('@dcloudio/uni-cli-shared/lib/pages')

const {
  parseStyle
} = require('../../util')

const definePages = require('./define-pages')
const appConfigService = require('./app-config-service')

function getTabBarPages (appJson) {
  return appJson.tabBar &&
    appJson.tabBar.list &&
    appJson.tabBar.list.length &&
    appJson.tabBar.list
}

function isTabBarPage (pathName, tabBarPages) {
  return tabBarPages.find(item => item.pagePath === pathName)
}

function parseEntryPagePath (appJson, manifestJson) {
  const argsJsonStr = manifestJson.plus.arguments
  if (argsJsonStr) {
    try {
      const args = JSON.parse(argsJsonStr)
      const pathName = args.path || args.pathName
      if (pathName && appJson.pages[0] !== pathName) {
        appJson.entryPagePath = pathName
        if (!isTabBarPage(pathName, getTabBarPages(appJson))) {
          appJson.realEntryPagePath = appJson.pages[0]
        }
      }
    } catch (e) {}
  }
  if (!appJson.entryPagePath) {
    appJson.entryPagePath = appJson.pages[0]
  }
}

module.exports = function (appJson, manifestJson, {
  pagesJson,
  manifest,
  normalizeNetworkTimeout
}) {
  parseEntryPagePath(appJson, manifestJson)

  // timeout
  normalizeNetworkTimeout(appJson)
  appJson.page = Object.create(null)

  const addPage = function (pagePath, windowOptions, nvue) {
    // 缓存页面级usingComponents
    addPageUsingComponents(pagePath, windowOptions.usingComponents)
    delete windowOptions.usingComponents
    appJson.page[pagePath] = {
      window: windowOptions,
      nvue
    }
  }
  parsePages(pagesJson, function (page) {
    addPage(page.path, parseStyle(page.style), !!page.nvue)
  }, function (root, page) {
    addPage(normalizePath(path.join(root, page.path)), parseStyle(page.style, root), !!page.nvue)
  })
  // nvue 权限
  manifestJson.permissions.UniNView = {
    'description': 'UniNView原生渲染'
  }

  manifestJson.plus.launchwebview.id = '1' // 首页 id 固定 为 1
  // 删除首页 style 中的 uni-app 配置（不注入 app-view.js）
  delete manifestJson.plus.launchwebview['uni-app']

  if (appJson.page[appJson.entryPagePath].nvue) { // 首页是 nvue
    manifestJson.launch_path = '' // 首页地址为空
    manifestJson.plus.launchwebview.uniNView = {
      path: appJson.entryPagePath
    }
    if (manifestJson.plus.tabBar) {
      manifestJson.plus.tabBar.child = ['lauchwebview']
    }
  } else {
    manifestJson.plus.launch_path = '__uniappview.html' // 首页地址固定
  }

  // nvue 首页启动模式
  manifestJson.plus['uni-app'].nvueLaunchMode = manifestJson.plus.nvueLaunchMode === 'fast' ? 'fast' : 'normal'
  delete manifestJson.plus.nvueLaunchMode

  manifest.name = 'manifest.json'
  manifest.content = JSON.stringify(manifest.content)
  delete appJson.nvue
  return [manifest, definePages(appJson), appConfigService(appJson)]
}
