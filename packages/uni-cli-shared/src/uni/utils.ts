import path from 'path'
import { UniCompiler } from './compiler'
import { UniPlugin } from './plugin'
interface PluginConfig {
  id: string
  name: string
  config: {
    name: string
    main?: string
  }
}

interface InitUniCompilerOptions {
  root: string
}

export function initUniCompiler(opts: InitUniCompilerOptions) {
  return new UniCompiler({ plugins: initPlugins(resolvePlugins(opts)) })
}

function initPlugin(plugin: PluginConfig) {
  const configFile = path.join(
    plugin.id,
    plugin.config.main || '/lib/uni.config.js'
  )
  try {
    /* eslint-disable no-restricted-globals */
    return new UniPlugin(plugin.id, require(configFile))
  } catch (e) {
    console.warn(`${configFile} not found`)
  }
}

function initPlugins(plugins: PluginConfig[]): UniPlugin[] {
  return plugins
    .map((plugin) => initPlugin(plugin))
    .filter<UniPlugin>(Boolean as any)
}

function resolvePlugins(opts: InitUniCompilerOptions) {
  /* eslint-disable no-restricted-globals */
  const pkg = require(path.join(opts.root, 'package.json'))
  return Object.keys(pkg.devDependencies || {})
    .concat(Object.keys(pkg.dependencies || {}))
    .map((id) => {
      try {
        /* eslint-disable no-restricted-globals */
        const pluginPkg = require(id + '/package.json')
        const config = pluginPkg['uni-app']
        if (!config || !config.name) {
          return
        }
        return {
          id,
          name: config.name,
          config,
        }
      } catch (e) {}
    })
    .filter<PluginConfig>(Boolean as any)
}
