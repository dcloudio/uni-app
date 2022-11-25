export type APP_PLATFORM = 'app-android' | 'app-ios'

export interface CheckOptions {
  id: string
  env: Record<string, unknown>
  pluginDir: string
  pluginRelativeDir: string
  cacheDir: string
  outputDir: string
  is_uni_modules: boolean
}

export interface CheckResult {
  expired: boolean
  tips?: string
  files: string[]
}

export function customResourceTips(id: string) {
  return `uts插件[${id}]依赖的原生配置或三方SDK在运行至标准基座时不能生效，如需正常调用请使用自定义基座`
}

export function customResourceChangedTips(id: string) {
  return `uts插件[${id}]依赖的原生配置或三方SDK发生变化，需要重新打包自定义基座`
}

export function cacheTips(id: string) {
  return `uts插件[${id}]文件未发生变化，跳过编译`
}
