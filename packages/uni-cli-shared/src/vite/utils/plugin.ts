import type { Plugin, ResolvedConfig } from 'vite'
import { extend } from '@vue/shared'
import { assetPlugin } from '../plugins/vitejs/plugins/asset'
import { cssPlugin, cssPostPlugin } from '../plugins/vitejs/plugins/css'

export type CreateUniViteFilterPlugin = (
  opts: UniViteFilterPluginOptions
) => Plugin
export interface UniViteFilterPluginOptions {
  resolvedConfig: ResolvedConfig
  filter: (id: string) => boolean
}

export function injectAssetPlugin(config: ResolvedConfig) {
  replacePlugins([assetPlugin(config)], config)
}

export function injectCssPlugin(config: ResolvedConfig) {
  replacePlugins([cssPlugin(config)], config)
}

export function injectCssPostPlugin(
  config: ResolvedConfig,
  {
    chunkCssFilename,
    chunkCssCode,
  }: {
    chunkCssFilename: (id: string) => string | void
    chunkCssCode: (
      filename: string,
      cssCode: string
    ) => string | Promise<string>
  }
) {
  const newCssPostPlugin = cssPostPlugin(config, {
    chunkCssFilename,
    chunkCssCode,
  })
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
  if (!Array.isArray(plugins)) {
    plugins = [plugins]
  }
  plugins.forEach((name) => {
    const index = config.plugins.findIndex((p) => p.name === name)
    if (index > -1) {
      ;(config.plugins as Plugin[]).splice(index, 1)
    }
  })
}
