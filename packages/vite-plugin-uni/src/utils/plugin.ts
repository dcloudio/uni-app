import path from 'path'
import { Plugin } from 'vite'
import { extend, isArray, isString } from '@vue/shared'
import { isCustomElement, isNativeTag } from '@dcloudio/uni-shared'
import { UniVitePlugin } from '@dcloudio/uni-cli-shared'
import { CompilerOptions } from '@vue/compiler-sfc'

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
  const transformEvent: Record<string, string> = Object.create(null)
  const compilerOptions: CompilerOptions = {
    isNativeTag,
    isCustomElement,
  }
  UniVitePlugins.forEach((plugin) => {
    const {
      compilerOptions: pluginCompilerOptions,
      transformEvent: pluginTransformEvent,
    } = plugin.uni || {}
    if (pluginCompilerOptions) {
      if (pluginCompilerOptions.isNativeTag) {
        compilerOptions.isNativeTag = pluginCompilerOptions.isNativeTag
      }
      if (pluginCompilerOptions.isCustomElement) {
        compilerOptions.isCustomElement = pluginCompilerOptions.isCustomElement
      }
      if (pluginCompilerOptions.directiveTransforms) {
        compilerOptions.directiveTransforms =
          pluginCompilerOptions.directiveTransforms
      }
    }
    if (pluginTransformEvent) {
      extend(transformEvent, pluginTransformEvent)
    }
  })
  return {
    transformEvent,
    compilerOptions,
  }
}

export function initExtraPlugins(cliRoot: string, platform: UniApp.PLATFORM) {
  return initPlugins(resolvePlugins(cliRoot, platform))
}

function initPlugin({ id, config: { main } }: PluginConfig): Plugin | void {
  const plugin = require(path.join(id, main || '/lib/uni.plugin.js'))
  return plugin.default || plugin
}

function initPlugins(plugins: PluginConfig[]): Plugin[] {
  return plugins
    .map((plugin) => initPlugin(plugin))
    .flat()
    .filter<Plugin>(Boolean as any)
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
          if (apply !== platform) {
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
