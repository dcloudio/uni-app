import type { Plugin, ResolvedConfig } from 'vite'
import { assetPlugin } from '../plugins/vitejs/plugins/asset'
import { cssPlugin, cssPostPlugin } from '../plugins/vitejs/plugins/css'
import { assetPlugin as h5AssetPlugin } from '../plugins/vitejs/plugins/h5Asset'
import {
  cssPlugin as h5CssPlugin,
  cssPostPlugin as h5CssPostPlugin,
} from '../plugins/vitejs/plugins/h5Css'
export type CreateUniViteFilterPlugin = (
  opts: UniViteFilterPluginOptions
) => Plugin
export interface UniViteFilterPluginOptions {
  resolvedConfig: ResolvedConfig
  filter: (id: string) => boolean
}

export function injectH5AssetPlugin(config: ResolvedConfig) {
  replacePlugins([h5AssetPlugin(config)], config)
}

export function injectH5CssPlugin(config: ResolvedConfig) {
  replacePlugins([h5CssPlugin(config)], config)
}

export function injectH5CssPostPlugin(config: ResolvedConfig) {
  replacePlugins([h5CssPostPlugin(config)], config)
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
    chunkCssCode: (filename: string, cssCode: string) => string
  }
) {
  replacePlugins(
    [cssPostPlugin(config, { chunkCssFilename, chunkCssCode })],
    config
  )
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
