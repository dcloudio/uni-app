import fs from 'fs'
import path from 'path'
import { ConfigEnv } from 'vite'
import { parse } from 'jsonc-parser'
import { isArray } from '@vue/shared'
import { VitePluginUniResolvedOptions } from '..'
import { normalizePagesJson } from './pagesJson'

interface ProjectFeatures {}
interface PagesFeatures {
  nvue: boolean
  pages: boolean
  tabBar: boolean
  topWindow: boolean
  leftWindow: boolean
  rightWindow: boolean
  pullDownRefresh: boolean
  navigationBarButtons: boolean
}
interface ManifestFeatures {
  wx: boolean
  wxs: boolean
  promise: boolean
  longpress: boolean
  routerMode: '"hash"' | '"history"'
}

function resolveProjectFeature(
  options: VitePluginUniResolvedOptions,
  command: ConfigEnv['command']
) {
  const features: ProjectFeatures = {}
  if (command === 'build') {
  }
  return features
}

function resolvePagesFeature(
  options: VitePluginUniResolvedOptions,
  command: ConfigEnv['command']
): PagesFeatures {
  const features: PagesFeatures = {
    nvue: true, // 是否启用nvue
    pages: true, // 是否多页面
    tabBar: true, // 是否启用tabBar
    topWindow: false, // 是否启用topWindow
    leftWindow: false, // 是否启用leftWindow
    rightWindow: false, // 是否启用rightWindow
    pullDownRefresh: false, // 是否启用下拉刷新
    navigationBarButtons: true, // 是否启用标题按钮
  }

  const {
    tabBar,
    pages,
    topWindow,
    leftWindow,
    rightWindow,
    globalStyle,
  } = normalizePagesJson(
    fs.readFileSync(path.join(options.inputDir, 'pages.json'), 'utf8'),
    options.platform
  )
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
    if (pages.find((page) => page.style && page.style.enablePullDownRefresh)) {
      features.pullDownRefresh = true
    }
  }
  if (command === 'build') {
    if (
      !pages.find((page) =>
        fs.existsSync(path.resolve(options.inputDir, page.path, '.nvue'))
      )
    ) {
      features.nvue = false
    }
    if (
      !pages.find(
        (page) =>
          isArray(page.style.navigationBar.buttons) &&
          page.style.navigationBar.buttons.length
      )
    ) {
      features.navigationBarButtons = false
    }
  }

  return features
}

function resolveManifestFeature(
  options: VitePluginUniResolvedOptions
): ManifestFeatures {
  const features: ManifestFeatures = {
    wx: true, // 是否启用小程序的组件实例 API，如：selectComponent 等（uni-core/src/service/plugin/appConfig）
    wxs: true, // 是否启用 wxs 支持，如：getComponentDescriptor 等（uni-core/src/view/plugin/appConfig）
    promise: false, // 是否启用旧版本的 promise 支持（即返回[err,res]的格式）
    longpress: true, // 是否启用longpress
    routerMode: '"hash"', // 启用的 router 类型（uni-h5/src/framework/plugin/router）
  }
  const manifest = parse(
    fs.readFileSync(path.join(options.inputDir, 'manifest.json'), 'utf8')
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

export type FEATURE_DEFINES = ReturnType<typeof getFeatures>

export function getFeatures(
  options: VitePluginUniResolvedOptions,
  command: ConfigEnv['command']
) {
  const {
    wx,
    wxs,
    nvue,
    pages,
    tabBar,
    promise,
    longpress,
    routerMode,
    topWindow,
    leftWindow,
    rightWindow,
    pullDownRefresh,
    navigationBarButtons,
  } = Object.assign(
    resolveManifestFeature(options),
    resolvePagesFeature(options, command),
    resolveProjectFeature(options, command)
  )
  return {
    __UNI_FEATURE_WX__: wx,
    __UNI_FEATURE_WXS__: wxs,
    __UNI_FEATURE_NVUE__: nvue,
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
    __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__: navigationBarButtons,
  }
}
