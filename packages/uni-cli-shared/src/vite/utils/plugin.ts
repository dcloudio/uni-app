import { Plugin, ResolvedConfig } from 'vite'
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
  { appCss }: { appCss?: string }
) {
  replacePlugins([cssPostPlugin(config, { appCss })], config)
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
