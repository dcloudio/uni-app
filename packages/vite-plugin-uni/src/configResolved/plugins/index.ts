import debug from 'debug'
import { extend } from '@vue/shared'
import { Plugin, ResolvedConfig } from 'vite'
import { FilterPattern } from '@rollup/pluginutils'
import { VitePluginUniResolvedOptions } from '../..'
import { uniPrePlugin } from './pre'
import { uniJsonPlugin } from './json'
import { uniPreCssPlugin } from './preCss'
import { uniEasycomPlugin } from './easycom'
import { InjectOptions, uniInjectPlugin } from './inject'

import { uniMainJsPlugin } from './mainJs'
import { uniPagesJsonPlugin } from './pagesJson'
import { uniManifestJsonPlugin } from './manifestJson'
import { uniPageVuePlugin } from './pageVue'
import { uniCopyPlugin } from './copy'
import { uniStaticPlugin } from './static'
import { uniCssScopedPlugin } from './cssScoped'
import { uniRenderjsPlugin } from './renderjs'
import { uniPreVuePlugin } from './preVue'
import { uniSSRPlugin } from './ssr'

const debugPlugin = debug('vite:uni:plugin')

export interface UniPluginFilterOptions extends VitePluginUniResolvedOptions {
  include?: FilterPattern
  exclude?: FilterPattern
}

const UNI_H5_RE = /@dcloudio\/uni-h5/

const COMMON_EXCLUDE = [
  /pages\.json\.js$/,
  /manifest\.json\.js$/,
  /vite\//,
  /\/@vue\//,
  /\/vue-router\//,
  /\/vuex\//,
  /@dcloudio\/uni-h5-vue/,
  /@dcloudio\/uni-shared/,
  /@dcloudio\/uni-components\/style/,
]

const APP_VUE_RE = /App.vue$/

const uniCssScopedPluginOptions: Partial<UniPluginFilterOptions> = {
  exclude: [APP_VUE_RE],
}

const uniPrePluginOptions: Partial<UniPluginFilterOptions> = {
  exclude: [...COMMON_EXCLUDE, UNI_H5_RE],
}
const uniPreCssPluginOptions: Partial<UniPluginFilterOptions> = {
  exclude: [UNI_H5_RE],
}

const uniEasycomPluginOptions: Partial<UniPluginFilterOptions> = {
  exclude: [APP_VUE_RE, UNI_H5_RE],
}

const API_STYLES = {
  showModal: 'modal',
  showToast: 'toast',
  showActionSheet: 'action-sheet',
}

const uniInjectPluginOptions: Partial<InjectOptions> = {
  exclude: [...COMMON_EXCLUDE],
  'uni.': '@dcloudio/uni-h5',
  getApp: ['@dcloudio/uni-h5', 'getApp'],
  getCurrentPages: ['@dcloudio/uni-h5', 'getCurrentPages'],
  UniServiceJSBridge: ['@dcloudio/uni-h5', 'UniServiceJSBridge'],
  UniViewJSBridge: ['@dcloudio/uni-h5', 'UniViewJSBridge'],
  callback(imports, mod) {
    const style =
      mod[0] === '@dcloudio/uni-h5' &&
      API_STYLES[mod[1] as keyof typeof API_STYLES]
    if (!style) {
      return
    }
    const hash = `${mod[0]}.${mod[1]}`
    if (!imports.has(hash)) {
      imports.set(hash, `import '@dcloudio/uni-h5/style/api/${style}.css';`)
    }
  },
}

export function initPlugins(
  config: ResolvedConfig,
  options: VitePluginUniResolvedOptions
) {
  const command = config.command
  const plugins = config.plugins as Plugin[]
  if (options.platform === 'h5') {
    // h5平台需要为非App.vue组件自动增加scoped
    addPlugin(
      plugins,
      uniCssScopedPlugin(extend(uniCssScopedPluginOptions, options)),
      0,
      'pre'
    )
  }
  addPlugin(
    plugins,
    uniPrePlugin(extend(uniPrePluginOptions, options)),
    0,
    'pre'
  )
  addPlugin(plugins, uniMainJsPlugin(config, options), 1, 'pre')
  addPlugin(plugins, uniPagesJsonPlugin(config, options), 1, 'pre')
  addPlugin(plugins, uniManifestJsonPlugin(config, options), 1, 'pre')

  addPlugin(
    plugins,
    uniPreCssPlugin(extend(uniPreCssPluginOptions, options)),
    'vite:css'
  )
  addPlugin(plugins, uniPreVuePlugin(), 'vite:vue', 'pre')
  addPlugin(plugins, uniRenderjsPlugin(), 'vite:vue')

  const injectOptions = options.compiler.inject()
  // 可以考虑使用apply:'build'
  if (command === 'build') {
    addPlugin(
      plugins,
      uniInjectPlugin(extend(uniInjectPluginOptions, injectOptions)),
      'vite:vue'
    )
  } else {
    if (injectOptions && Object.keys(injectOptions).length) {
      addPlugin(
        plugins,
        uniInjectPlugin(
          extend({ exclude: [...COMMON_EXCLUDE] }, injectOptions)
        ),
        'vite:vue'
      )
    }
  }

  addPlugin(
    plugins,
    uniSSRPlugin(config, extend({ exclude: [...COMMON_EXCLUDE] }, options)),
    'vite:vue'
  )

  addPlugin(
    plugins,
    uniEasycomPlugin(extend(uniEasycomPluginOptions, options)),
    'vite:vue'
  )
  addPlugin(plugins, uniPageVuePlugin(options), 'vite:vue')
  addPlugin(plugins, uniJsonPlugin(options), 'vite:json', 'pre')
  addPlugin(plugins, uniStaticPlugin(options, config), 'vite:asset', 'pre')
  if (command === 'build' && !config.build.ssr) {
    addPlugin(plugins, uniCopyPlugin(options), plugins.length)
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
  if (typeof index === 'string') {
    index = plugins.findIndex((plugin) => (plugin as Plugin).name === index)
  }
  return plugins.splice(index + (type === 'pre' ? 0 : 1), 0, plugin)
}
