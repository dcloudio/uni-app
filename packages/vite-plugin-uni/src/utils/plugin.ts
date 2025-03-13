import path from 'path'
import fs from 'fs-extra'
import type { Plugin } from 'vite'
import { extend, isArray, isFunction, isString } from '@vue/shared'
import {
  type CopyOptions,
  type UniViteCopyPluginTarget,
  type UniVitePlugin,
  registerPlatform,
} from '@dcloudio/uni-cli-shared'
import type { TemplateCompiler } from '@vue/compiler-sfc'
import type { VitePluginUniResolvedOptions } from '..'

interface PluginConfig {
  id: string
  name: string
  pluginPath: string
  apply?: UniApp.PLATFORM | UniApp.PLATFORM[]
  uvue?: boolean
  config: {
    name: string
    main?: string
  }
}

export function initPluginUniOptions(UniVitePlugins: UniVitePlugin[]): {
  compiler?: TemplateCompiler
  copyOptions: {
    assets: string[]
    targets: UniViteCopyPluginTarget[]
  }
  transformEvent: Record<string, string>
  compilerOptions: Required<Required<UniVitePlugin>['uni']>['compilerOptions']
  jsxOptions: Required<Required<UniVitePlugin>['uni']>['jsxOptions']
  styleOptions: Required<Required<UniVitePlugin>['uni']>['styleOptions']
} {
  const assets: string[] = []
  const targets: UniViteCopyPluginTarget[] = []
  const transformEvent: Record<string, string> = Object.create(null)
  const compilerOptions: Required<UniVitePlugin>['uni']['compilerOptions'] = {}
  const jsxOptions: Required<UniVitePlugin>['uni']['jsxOptions'] = {}
  const styleOptions: Required<UniVitePlugin>['uni']['styleOptions'] = {}
  let compiler: TemplateCompiler | undefined
  UniVitePlugins.forEach((plugin) => {
    const {
      compiler: pluginTemplateCompiler,
      copyOptions: pluginCopyOptions,
      compilerOptions: pluginCompilerOptions,
      jsxOptions: pluginJsxOptions,
      styleOptions: pluginStyleOpitons,
    } = plugin.uni || {}
    if (pluginTemplateCompiler) {
      compiler = pluginTemplateCompiler
    }
    if (pluginCompilerOptions) {
      extend(compilerOptions, pluginCompilerOptions)
    }
    if (pluginJsxOptions) {
      extend(jsxOptions, pluginJsxOptions)
    }
    if (pluginStyleOpitons) {
      extend(styleOptions, pluginStyleOpitons)
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
    jsxOptions,
    styleOptions,
  }
}

export function initExtraPlugins(
  cliRoot: string,
  platform: UniApp.PLATFORM,
  options: VitePluginUniResolvedOptions
) {
  return initPlugins(
    cliRoot,
    process.env.UNI_COMPILE_TARGET === 'ext-api' &&
      process.env.UNI_APP_NEXT_WORKSPACE
      ? resolvePluginsByWorkSpace(
          process.env.UNI_APP_NEXT_WORKSPACE,
          platform,
          options.uvue
        )
      : resolvePluginsByCliRoot(cliRoot, platform, options.uvue),
    options
  )
}

function initPlugin(
  _cliRoot: string,
  { pluginPath, config: { main } }: PluginConfig,
  options: VitePluginUniResolvedOptions
): Plugin | void {
  let plugin = require(path.join(pluginPath, main || '/lib/uni.plugin.js'))
  plugin = plugin.default || plugin
  if (isFunction(plugin)) {
    plugin = plugin(options)
  }
  return plugin
}

function initPlugins(
  cliRoot: string,
  plugins: PluginConfig[],
  options: VitePluginUniResolvedOptions
): Plugin[] {
  return plugins
    .map((plugin) => initPlugin(cliRoot, plugin, options))
    .flat()
    .filter<Plugin>(Boolean as any)
    .map((plugin) => {
      if (isFunction(plugin)) {
        return plugin(options)
      }
      return plugin
    })
    .flat()
}

interface Pkg {
  name: string
  pluginPath: string
  'uni-app'?: PluginConfig
}

function resolvePluginsByCliRoot(
  cliRoot: string,
  platform: UniApp.PLATFORM,
  uvue: boolean = false
) {
  const pkg = require(path.join(cliRoot, 'package.json'))
  return resolvePlugins(
    Object.keys(pkg.devDependencies || {})
      .concat(Object.keys(pkg.dependencies || {}))
      .map((id) => {
        try {
          const pkgFileName = require.resolve(id + '/package.json', {
            paths: [cliRoot],
          })
          const pkg = require(pkgFileName)
          return {
            ...pkg,
            pluginPath: path.dirname(pkgFileName),
          }
        } catch (e) {}
      })
      .filter<Pkg>(Boolean as any),
    platform,
    uvue
  )
}

function resolvePluginsByWorkSpace(
  workspaceFolder: string,
  platform: UniApp.PLATFORM,
  uvue: boolean = false
) {
  const pkgDirs = path.resolve(workspaceFolder, 'packages')
  return resolvePlugins(
    fs
      .readdirSync(pkgDirs)
      .map((dir) => {
        const pluginPath = path.join(pkgDirs, dir)
        const pkgFileName = path.join(pluginPath, 'package.json')
        if (fs.existsSync(pkgFileName)) {
          return {
            ...require(pkgFileName),
            pluginPath,
          } as Pkg
        }
      })
      .filter<Pkg>(Boolean as any),
    platform,
    uvue
  )
}

function resolvePlugins(
  pkgs: Pkg[],
  platform: UniApp.PLATFORM,
  uvue: boolean = false
) {
  return pkgs
    .map<PluginConfig | void>((pkg) => {
      try {
        const config = pkg['uni-app'] as PluginConfig
        if (!config || !config.name) {
          return
        }
        const { apply } = config
        if (isArray(apply)) {
          // 注册所有平台
          apply.forEach((p) => registerPlatform(p))
          if (!apply.includes(platform)) {
            return
          }
        } else if (isString(apply)) {
          if (!new RegExp(apply).test(platform)) {
            return
          }
        }
        // 插件必须支持 uvue
        if (uvue && !config.uvue) {
          return
        }
        return {
          id: pkg.name,
          name: config.name,
          pluginPath: pkg.pluginPath,
          config,
        }
      } catch (e) {}
    })
    .filter<PluginConfig>(Boolean as any)
}
