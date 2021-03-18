import fs from 'fs'
import path from 'path'
import { parse } from 'jsonc-parser'
import { ConfigEnv, UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

interface PagesFeatures {
  tabBar: boolean
}
interface ManifestFeatures {
  wx: boolean
  wxs: boolean
  promise: boolean
  routerMode: '"hash"' | '"history"'
}

function resolvePagesFeature(
  inputDir: string,
  { command }: ConfigEnv
): PagesFeatures {
  const features: PagesFeatures = {
    tabBar: true,
  }
  if (command === 'build') {
    const { tabBar } = parse(
      fs.readFileSync(path.join(inputDir, 'pages.json'), 'utf8')
    )
    if (!(tabBar && tabBar.list && tabBar.list.length)) {
      features.tabBar = false
    }
  }
  return features
}

function resolveManifestFeature(inputDir: string): ManifestFeatures {
  const features: ManifestFeatures = {
    wx: true, // 是否启用小程序的组件实例 API，如：selectComponent 等（uni-core/src/service/plugin/appConfig）
    wxs: true, // 是否启用 wxs 支持，如：getComponentDescriptor 等（uni-core/src/view/plugin/appConfig）
    promise: false, // 是否启用旧版本的 promise 支持（即返回[err,res]的格式）
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
  const features = Object.assign(
    resolveManifestFeature(inputDir),
    resolvePagesFeature(inputDir, env)
  )
  return {
    __UNI_FEATURE_WX__: features.wx,
    __UNI_FEATURE_WXS__: features.wxs,
    __UNI_FEATURE_PROMISE__: features.promise,
    __UNI_FEATURE_ROUTER_MODE__: features.routerMode,
    __UNI_FEATURE_TABBAR__: features.tabBar,
  }
}
