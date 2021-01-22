import { FilterPattern } from '@rollup/pluginutils'
import debug from 'debug'
import { UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '../..'
import { uniPrePlugin } from './pre'
import { uniJsonPlugin } from './json'
import { uniPreCssPlugin } from './preCss'
import { uniPostVuePlugin } from './postVue'
const debugPlugin = debug('uni:plugin')

export interface UniPluginFilterOptions extends VitePluginUniResolvedOptions {
  include?: FilterPattern
  exclude?: FilterPattern
}

const UNI_H5_RE = /@dcloudio\/uni-h5/

const uniPrePluginOptions: Partial<UniPluginFilterOptions> = {
  exclude: [
    /pages\.json\.js$/,
    /vite\/dist\/client\/client\.js$/,
    /vue&type=/,
    UNI_H5_RE,
  ],
}
const uniPreCssPluginOptions: Partial<UniPluginFilterOptions> = {
  exclude: [UNI_H5_RE],
}

const uniPostVuePluginOptions: Partial<UniPluginFilterOptions> = {
  exclude: [UNI_H5_RE],
}

export function resolvePlugins(
  config: UserConfig,
  options: VitePluginUniResolvedOptions
) {
  const jsonIndex = config.plugins!.findIndex(
    (plugin) => (plugin as Plugin).name === 'vite:json'
  )
  config.plugins!.splice(jsonIndex, 1, uniJsonPlugin(options))
  const cssIndex = config.plugins!.findIndex(
    (plugin) => (plugin as Plugin).name === 'vite:css'
  )
  config.plugins!.splice(
    cssIndex + 1,
    0,
    uniPreCssPlugin(Object.assign(uniPreCssPluginOptions, options))
  )
  config.plugins!.unshift(
    uniPrePlugin(Object.assign(uniPrePluginOptions, options))
  )
  if (process.env.DEBUG) {
    const vueIndex = config.plugins!.findIndex(
      (plugin) => (plugin as Plugin).name === 'vite:vue'
    )
    config.plugins!.splice(
      vueIndex + 1,
      0,
      uniPostVuePlugin(Object.assign(uniPostVuePluginOptions, options))
    )
    debugPlugin(config.plugins!.map((p) => (p as Plugin).name))
  }
}
