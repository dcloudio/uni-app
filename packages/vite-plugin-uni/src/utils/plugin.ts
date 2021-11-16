import path from 'path'
import type { Plugin } from 'vite'
import { extend, isArray, isString, isFunction } from '@vue/shared'
import type {
  CopyOptions,
  UniViteCopyPluginTarget,
  UniVitePlugin,
} from '@dcloudio/uni-cli-shared'
import type { TemplateCompiler } from '@vue/compiler-sfc'
import { VitePluginUniResolvedOptions } from '..'

interface PluginConfig {
  id: string
  name: string
  apply?: UniApp.PLATFORM | UniApp.PLATFORM[]
  config: {
    name: string
    main?: string
  }
}

export function initPluginUniOptions(UniVitePlugins: UniVitePlugin[]) {
  const assets: string[] = []
  const targets: UniViteCopyPluginTarget[] = []
  const transformEvent: Record<string, string> = Object.create(null)
  const compilerOptions: Required<UniVitePlugin>['uni']['compilerOptions'] = {}
  let compiler: TemplateCompiler | undefined
  UniVitePlugins.forEach((plugin) => {
    const {
      compiler: pluginTemplateCompiler,
      copyOptions: pluginCopyOptions,
      compilerOptions: pluginCompilerOptions,
    } = plugin.uni || {}
    if (pluginTemplateCompiler) {
      compiler = pluginTemplateCompiler
    }
    if (pluginCompilerOptions) {
      extend(compilerOptions, pluginCompilerOptions)
    }
    if (pluginCopyOptions) {
      let copyOptions = pluginCopyOptions as CopyOptions
      if (isFunction(pluginCopyOptions)) {
        copyOptions = pluginCopyOptions()
      }
      if (copyOptions.assets) {
        assets.push(...copyOptions.assets)
      }
      if (copyOptions.targets) {
        targets.push(...copyOptions.targets)
      }
    }
  })
  return {
    compiler,
    copyOptions: {
      assets,
      targets,
    },
    transformEvent,
    compilerOptions,
  }
}

export function initExtraPlugins(
  cliRoot: string,
  platform: UniApp.PLATFORM,
  options: VitePluginUniResolvedOptions
) {
  return initPlugins(resolvePlugins(cliRoot, platform), options)
}

function initPlugin(
  { id, config: { main } }: PluginConfig,
  options: VitePluginUniResolvedOptions
): Plugin | void {
  let plugin = require(path.join(id, main || '/lib/uni.plugin.js'))
  plugin = plugin.default || plugin
  if (isFunction(plugin)) {
    plugin = plugin(options)
  }
  return plugin
}

function initPlugins(
  plugins: PluginConfig[],
  options: VitePluginUniResolvedOptions
): Plugin[] {
  return plugins
    .map((plugin) => initPlugin(plugin, options))
    .flat()
    .filter<Plugin>(Boolean as any)
    .map((plugin) => {
      if (isFunction(plugin)) {
        return plugin(options)
      }
      return plugin
    })
}

function resolvePlugins(cliRoot: string, platform: UniApp.PLATFORM) {
  const pkg = require(path.join(cliRoot, 'package.json'))
  return Object.keys(pkg.devDependencies || {})
    .concat(Object.keys(pkg.dependencies || {}))
    .map<PluginConfig | void>((id) => {
      try {
        const pluginPkg = require(id + '/package.json')
        const config = pluginPkg['uni-app'] as PluginConfig
        if (!config || !config.name) {
          return
        }
        const { apply } = config
        if (isArray(apply)) {
          if (!apply.includes(platform)) {
            return
          }
        } else if (isString(apply)) {
          if (!new RegExp(apply).test(platform)) {
            return
          }
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
