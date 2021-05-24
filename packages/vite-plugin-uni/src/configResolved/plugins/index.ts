import debug from 'debug'
import { extend } from '@vue/shared'
import { Plugin, ResolvedConfig } from 'vite'
import { FilterPattern } from '@rollup/pluginutils'
import vue from '@vitejs/plugin-vue'

import { API_DEPS_CSS } from '@dcloudio/uni-cli-shared'

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
import { uniResolveIdPlugin } from './resolveId'
import { uniCssPlugin, buildInCssSet, isCombineBuiltInCss } from './css'

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

const uniInjectPluginOptions: Partial<InjectOptions> = {
  exclude: [...COMMON_EXCLUDE],
  'uni.': '@dcloudio/uni-h5',
  getApp: ['@dcloudio/uni-h5', 'getApp'],
  getCurrentPages: ['@dcloudio/uni-h5', 'getCurrentPages'],
  UniServiceJSBridge: ['@dcloudio/uni-h5', 'UniServiceJSBridge'],
  UniViewJSBridge: ['@dcloudio/uni-h5', 'UniViewJSBridge'],
}

function createUniInjectCallback(
  config: ResolvedConfig
): InjectOptions['callback'] {
  const needCombineBuiltInCss = isCombineBuiltInCss(config)
  return (imports, mod) => {
    const styles =
      mod[0] === '@dcloudio/uni-h5' &&
      API_DEPS_CSS[mod[1] as keyof typeof API_DEPS_CSS]
    if (!styles) {
      return
    }
    styles.forEach((style) => {
      if (needCombineBuiltInCss) {
        buildInCssSet.add(style)
      } else {
        if (!imports.has(style)) {
          imports.set(style, `import '${style}';`)
        }
      }
    })
  }
}

export function initPlugins(
  config: ResolvedConfig,
  options: VitePluginUniResolvedOptions
) {
  const command = config.command
  const plugins = config.plugins as Plugin[]
  addPlugin(plugins, vue(options.vueOptions), 'vite:uni', 'pre')

  addPlugin(plugins, uniResolveIdPlugin(options), 'vite:resolve', 'pre')

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

  // 可以考虑使用apply:'build'
  if (command === 'build') {
    addPlugin(
      plugins,
      uniInjectPlugin(
        extend(uniInjectPluginOptions, {
          callback: createUniInjectCallback(config),
        })
      ),
      'vite:vue'
    )
  }

  addPlugin(
    plugins,
    uniSSRPlugin(config, extend({ exclude: [...COMMON_EXCLUDE] }, options)),
    'vite:vue'
  )

  addPlugin(
    plugins,
    uniEasycomPlugin(extend(uniEasycomPluginOptions, options), config),
    'vite:vue'
  )
  addPlugin(plugins, uniPageVuePlugin(options), 'vite:vue')
  addPlugin(plugins, uniJsonPlugin(options), 'vite:json', 'pre')
  addPlugin(plugins, uniStaticPlugin(options, config), 'vite:asset', 'pre')

  if (isCombineBuiltInCss(config)) {
    addPlugin(plugins, uniCssPlugin(config), 'vite:asset')
  }

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
