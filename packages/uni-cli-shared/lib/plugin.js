const path = require('path')

const initPreprocessContext = require('./preprocess')

const Plugin = {
  options: {},
  // 初步校验相关配置是否正确
  validate: [], // (platformOptions, manifestJson) {},
  configureEnv: [], // (){},
  // 以 H5 为基准的平台特殊配置
  configureH5: [], // (h5Options) {},
  configurePages: [], // (pagesJson,manifestJson,loader) {},
  // 链式修改 webpack config
  chainWebpack: [], // (config, vueOptions, api) {},
  // 修改 webpack config
  configureWebpack: [], // (config, vueOptions, api) {},
  // 配置额外的资源拷贝
  copyWebpackOptions: [] // (platformOptions, vueOptions) {}
}

const PLUGIN_KEYS = Object.keys(Plugin)

function initPlugin (plugin) {
  let pluginApi
  try {
    pluginApi = require(path.join(plugin.id, (plugin.config.main || '/lib/uni.config.js')))
  } catch (e) {
    console.warn(`${plugin.id} 缺少 uni.config.js `)
  }

  pluginApi && PLUGIN_KEYS.forEach(name => {
    if (pluginApi[name]) {
      if (Array.isArray(Plugin[name])) { // hooks
        Plugin[name].push(pluginApi[name])
      } else { // options
        Object.assign(Plugin[name], pluginApi[name])
      }
    }
  })
}

const pluginRE = /^(uni-|@[\w-]+(\.)?[\w-]+\/uni-)/

function resolvePlugins () {
  const pkg = require(path.resolve(process.env.UNI_CLI_CONTEXT, 'package.json'))
  return Object.keys(pkg.devDependencies || {})
    .concat(Object.keys(pkg.dependencies || {}))
    .map(id => {
      if (!pluginRE.test(id)) {
        return
      }
      try {
        const pluginPkg = require(id + '/package.json')
        const config = pluginPkg['uni-app']
        if (!config) {
          return
        }
        if (!config.name) {
          return console.warn(`${id}/package.json->uni-app 缺少 name 属性`)
        }
        return {
          id,
          name: config.name,
          config
        }
      } catch (e) {}
    }).filter(Boolean)
}

function initExtends (name, plugin, plugins) {
  const extendsPlatform = plugin.config.extends
  if (extendsPlatform) {
    if (extendsPlatform !== 'h5') {
      console.error('目前仅支持基于 h5 平台做扩展')
      process.exit(0)
    }
    const extendsPlugin = plugins.find(plugin => plugin.name === extendsPlatform)
    if (!plugin) {
      console.error(`缺少平台 ${extendsPlatform} 插件`)
      process.exit(0)
    }
    process.env.UNI_SUB_PLATFORM = name
    process.env.UNI_PLATFORM = extendsPlatform
    initPlugin(extendsPlugin)
  }
}

module.exports = {
  init () {
    const plugins = resolvePlugins()
    const plugin = plugins.find(plugin => plugin.name === process.env.UNI_PLATFORM)
    if (!plugin) {
      console.error(`缺少平台 ${process.env.UNI_PLATFORM} 插件`)
      process.exit(0)
    }
    const name = plugin.name

    initExtends(name, plugin, plugins)

    initPlugin(plugin)

    Plugin.name = name
    Plugin.id = plugin.id
    Plugin.config = plugin.config
    Plugin.platforms = plugins.map(plugin => plugin.name)
    Plugin.preprocess = initPreprocessContext(name, Plugin.platforms, process.UNI_SCRIPT_DEFINE)

    return Plugin
  }
}
