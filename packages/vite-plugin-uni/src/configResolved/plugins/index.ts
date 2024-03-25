import path from 'path'
import debug from 'debug'
import { extend, isString } from '@vue/shared'
import { Plugin, ResolvedConfig } from 'vite'
import { FilterPattern } from '@rollup/pluginutils'

import { COMMON_EXCLUDE, isInHBuilderX } from '@dcloudio/uni-cli-shared'

import { VitePluginUniResolvedOptions } from '../..'
import { uniPrePlugin } from './pre'
import { uniJsonPlugin } from './json'
import { uniPreCssPlugin } from './preCss'

import { uniStaticPlugin } from './static'
import { uniPreVuePlugin } from './preVue'
import { uniSSRPlugin } from './ssr'
import { uniResolveIdPlugin } from './resolveId'

const debugPlugin = debug('uni:plugin')

export interface UniPluginFilterOptions extends VitePluginUniResolvedOptions {
  include?: FilterPattern
  exclude?: FilterPattern
}

const UNI_H5_RE = /@dcloudio\/uni-h5/

export function initPlugins(
  config: ResolvedConfig,
  options: VitePluginUniResolvedOptions
) {
  const uniPrePluginOptions: Partial<UniPluginFilterOptions> = {
    exclude: [...COMMON_EXCLUDE, UNI_H5_RE],
  }
  const uniPreCssPluginOptions: Partial<UniPluginFilterOptions> = {
    exclude: [...COMMON_EXCLUDE],
  }

  const plugins = config.plugins as Plugin[]

  addPlugin(plugins, uniResolveIdPlugin(options), 'vite:resolve', 'pre')

  addPlugin(
    plugins,
    uniPrePlugin(config, extend(uniPrePluginOptions, options)),
    0,
    'pre'
  )

  addPlugin(
    plugins,
    uniPreCssPlugin(config, extend(uniPreCssPluginOptions, options)),
    'vite:css'
  )
  addPlugin(plugins, uniPreVuePlugin(), 'vite:vue', 'pre')

  addPlugin(
    plugins,
    uniSSRPlugin(config, extend({ exclude: [...COMMON_EXCLUDE] }, options)),
    'vite:vue'
  )

  addPlugin(plugins, uniJsonPlugin(options), 'vite:json', 'pre')
  addPlugin(plugins, uniStaticPlugin(options, config), 'vite:asset', 'pre')

  if (isInHBuilderX()) {
    try {
      require(path.resolve(
        process.env.UNI_HBUILDERX_PLUGINS,
        'uni_helpers/lib/bytenode'
      ))
      const { V } = require(path.join(
        process.env.UNI_HBUILDERX_PLUGINS,
        'uni_helpers'
      ))
      addPlugin(plugins, V({ dir: process.env.UNI_INPUT_DIR }), 0, 'pre')
    } catch (e) {}
  }

  if (process.env.DEBUG) {
    debugPlugin(plugins.length)
    debugPlugin(plugins.map((p) => (p as Plugin).name))
  }
}

function addPlugin(
  plugins: Plugin[],
  plugin: Plugin,
  index: string | number,
  type: 'pre' | 'post' = 'post'
) {
  if (isString(index)) {
    index = plugins.findIndex((plugin) => (plugin as Plugin).name === index)
  }
  return plugins.splice(index + (type === 'pre' ? 0 : 1), 0, plugin)
}
