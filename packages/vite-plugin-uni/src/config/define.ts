import fs from 'fs'
import path from 'path'
import { parse } from 'jsonc-parser'
import { ConfigEnv, UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

interface ProjectFeatures {}
interface PagesFeatures {
  pages: boolean
  tabBar: boolean
  topWindow: boolean
  leftWindow: boolean
  rightWindow: boolean
  pullDownRefresh: boolean
}
interface ManifestFeatures {
  wx: boolean
  wxs: boolean
  promise: boolean
  longpress: boolean
  routerMode: '"hash"' | '"history"'
}

function resolveProjectFeature(inputDir: string, { command }: ConfigEnv) {
  const features: ProjectFeatures = {}
  if (command === 'build') {
  }
  return features
}

function resolvePagesFeature(
  inputDir: string,
  { command }: ConfigEnv
): PagesFeatures {
  const features: PagesFeatures = {
    pages: true, // 是否多页面
    tabBar: true, // 是否启用tabBar
    topWindow: false, // 是否启用topWindow
    leftWindow: false, // 是否启用leftWindow
    rightWindow: false, // 是否启用rightWindow
    pullDownRefresh: false, // 是否启用下拉刷新
  }

  const {
    tabBar,
    pages,
    topWindow,
    leftWindow,
    rightWindow,
    globalStyle,
  } = parse(fs.readFileSync(path.join(inputDir, 'pages.json'), 'utf8'))
  if (pages && pages.length === 1) {
    features.pages = false
  }
  if (!(tabBar && tabBar.list && tabBar.list.length)) {
    features.tabBar = false
  }
  if (topWindow && topWindow.path) {
    features.topWindow = true
  }
  if (leftWindow && leftWindow.path) {
    features.leftWindow = true
  }
  if (rightWindow && rightWindow.path) {
    features.rightWindow = true
  }
  if (globalStyle && globalStyle.enablePullDownRefresh) {
    features.pullDownRefresh = true
  } else {
    if (
      pages.find(
        (page: { style: { enablePullDownRefresh: any } }) =>
          page.style && page.style.enablePullDownRefresh
      )
    ) {
      features.pullDownRefresh = true
    }
  }

  return features
}

function resolveManifestFeature(inputDir: string): ManifestFeatures {
  const features: ManifestFeatures = {
    wx: true, // 是否启用小程序的组件实例 API，如：selectComponent 等（uni-core/src/service/plugin/appConfig）
    wxs: true, // 是否启用 wxs 支持，如：getComponentDescriptor 等（uni-core/src/view/plugin/appConfig）
    promise: false, // 是否启用旧版本的 promise 支持（即返回[err,res]的格式）
    longpress: true, // 是否启用longpress
    routerMode: '"hash"', // 启用的 router 类型（uni-h5/src/framework/plugin/router）
  }
  const manifest = parse(
    fs.readFileSync(path.join(inputDir, 'manifest.json'), 'utf8')
  )
  if (
    manifest.h5 &&
    manifest.h5.router &&
    manifest.h5.router.mode === 'history'
  ) {
    features.routerMode = '"history"'
  }
  // TODO manifest.json features
  return features
}

export function createDefine(
  { inputDir }: VitePluginUniResolvedOptions,
  env: ConfigEnv
): UserConfig['define'] {
  const {
    wx,
    wxs,
    pages,
    tabBar,
    promise,
    longpress,
    routerMode,
    topWindow,
    leftWindow,
    rightWindow,
    pullDownRefresh,
  } = Object.assign(
    resolveManifestFeature(inputDir),
    resolvePagesFeature(inputDir, env),
    resolveProjectFeature(inputDir, env)
  )
  return {
    __UNI_FEATURE_WX__: wx,
    __UNI_FEATURE_WXS__: wxs,
    __UNI_FEATURE_PROMISE__: promise,
    __UNI_FEATURE_LONGPRESS__: longpress,
    __UNI_FEATURE_ROUTER_MODE__: routerMode,
    __UNI_FEATURE_PAGES__: pages,
    __UNI_FEATURE_TABBAR__: tabBar,
    __UNI_FEATURE_TOPWINDOW__: topWindow,
    __UNI_FEATURE_LEFTWINDOW__: leftWindow,
    __UNI_FEATURE_RIGHTWINDOW__: rightWindow,
    __UNI_FEATURE_RESPONSIVE__: topWindow || leftWindow || rightWindow,
    __UNI_FEATURE_PULL_DOWN_REFRESH__: pullDownRefresh,
  }
}
