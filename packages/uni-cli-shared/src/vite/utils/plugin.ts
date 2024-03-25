import type { Plugin, ResolvedConfig } from 'vite'
import { extend, isArray } from '@vue/shared'
import { assetPlugin } from '../plugins/vitejs/plugins/asset'
import { cssPlugin } from '../plugins/vitejs/plugins/css'

export type CreateUniViteFilterPlugin = (
  opts: UniViteFilterPluginOptions
) => Plugin
export interface UniViteFilterPluginOptions {
  resolvedConfig: ResolvedConfig
  filter: (id: string) => boolean
}

export function injectAssetPlugin(
  config: ResolvedConfig,
  options?: { isAndroidX: boolean }
) {
  replacePlugins([assetPlugin(config, options)], config)
}

export function injectCssPlugin(config: ResolvedConfig) {
  replacePlugins([cssPlugin(config)], config)
}

export function injectCssPostPlugin(
  config: ResolvedConfig,
  newCssPostPlugin: Plugin
) {
  const oldCssPostPlugin = config.plugins.find(
    (p) => p.name === newCssPostPlugin.name
  )
  // 直接覆盖原有方法，不能删除，替换，因为 unocss 在 pre 阶段已经获取到了旧的 css-post 插件对象
  if (oldCssPostPlugin) {
    extend(oldCssPostPlugin, newCssPostPlugin)
  }
}

export function replacePlugins(plugins: Plugin[], config: ResolvedConfig) {
  plugins.forEach((plugin) => {
    const index = (config.plugins as Plugin[]).findIndex(
      (p) => p.name === plugin.name
    )
    if (index > -1) {
      ;(config.plugins as Plugin[]).splice(index, 1, plugin)
    }
  })
}

export function removePlugins(
  plugins: string | string[],
  config: ResolvedConfig
) {
  if (!isArray(plugins)) {
    plugins = [plugins]
  }
  plugins.forEach((name) => {
    const index = config.plugins.findIndex((p) => p.name === name)
    if (index > -1) {
      ;(config.plugins as Plugin[]).splice(index, 1)
    }
  })
}

export function insertBeforePlugin(
  plugin: Plugin,
  before: string,
  config: ResolvedConfig
) {
  const index = config.plugins.findIndex((p) => p.name === before)
  if (index > -1) {
    ;(config.plugins as Plugin[]).splice(index, 0, plugin)
  }
}
