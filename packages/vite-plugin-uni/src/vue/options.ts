import { hasOwn, isArray, isPlainObject } from '@vue/shared'
import type {
  SFCStyleCompileOptions,
  TemplateCompiler,
} from '@vue/compiler-sfc'
import type { Options as VueOptions } from '@vitejs/plugin-vue'
import {
  EXTNAME_VUE_RE,
  UniVitePlugin,
  uniPostcssScopedPlugin,
  createUniVueTransformAssetUrls,
  getBaseNodeTransforms,
  isExternalUrl,
  normalizePath,
} from '@dcloudio/uni-cli-shared'

import type { ViteLegacyOptions, VitePluginUniResolvedOptions } from '..'
import { createNVueCompiler } from '../utils'

const pluginVuePath = require.resolve('@vitejs/plugin-vue')
const normalizedPluginVuePath = normalizePath(pluginVuePath)
/**
 * 每次创建新的 plugin-vue 实例。因为该插件内部会 cache  descriptor，而相同的vue文件在编译到vue页面和nvue页面时，不能共享缓存（条件编译，css scoped等均不同）
 * @returns
 */
export function createPluginVueInstance(options: VueOptions) {
  delete require.cache[pluginVuePath]
  delete require.cache[normalizedPluginVuePath]
  const vuePlugin = require('@vitejs/plugin-vue')
  return vuePlugin(options)
}

export function initPluginVueOptions(
  options: VitePluginUniResolvedOptions,
  UniVitePlugins: UniVitePlugin[],
  uniPluginOptions: Required<
    Omit<Required<UniVitePlugin>['uni'], 'compiler'>
  > & {
    compiler?: TemplateCompiler
  }
) {
  const vueOptions = options.vueOptions || (options.vueOptions = {})
  // if (!hasOwn(vueOptions, 'reactivityTransform')) {
  //   vueOptions.reactivityTransform = true
  // }
  if (!vueOptions.include) {
    vueOptions.include = []
  }
  if (!isArray(vueOptions.include)) {
    vueOptions.include = [vueOptions.include]
  }
  vueOptions.include.push(EXTNAME_VUE_RE)

  const styleOptions: Partial<SFCStyleCompileOptions> =
    vueOptions.style || (vueOptions.style = {})
  if (!styleOptions.postcssPlugins) {
    styleOptions.postcssPlugins = []
  }
  // 解析 scoped 中 deep 等特殊语法
  styleOptions.postcssPlugins.push(uniPostcssScopedPlugin())

  const templateOptions = vueOptions.template || (vueOptions.template = {})

  const compilerOptions =
    templateOptions.compilerOptions || (templateOptions.compilerOptions = {})

  const {
    compiler,
    styleOptions: { postcssPlugins },
    compilerOptions: {
      miniProgram,
      isNativeTag,
      isCustomElement,
      nodeTransforms,
      directiveTransforms,
    },
  } = uniPluginOptions

  if (postcssPlugins) {
    styleOptions.postcssPlugins.push(...postcssPlugins)
  }

  if (compiler) {
    templateOptions.compiler = compiler
  }
  if (miniProgram) {
    ;(compilerOptions as any).miniProgram = miniProgram
  }

  if (isNativeTag) {
    const userIsNativeTag = compilerOptions.isNativeTag
    compilerOptions.isNativeTag = (tag) => {
      if (isNativeTag(tag)) {
        return true
      }
      if (userIsNativeTag && userIsNativeTag(tag)) {
        return true
      }
      return false
    }
  }

  if (isCustomElement) {
    const userIsCustomElement = compilerOptions.isCustomElement
    compilerOptions.isCustomElement = (tag) => {
      if (isCustomElement(tag)) {
        return true
      }
      if (userIsCustomElement && userIsCustomElement(tag)) {
        return true
      }
      return false
    }
  }

  compilerOptions.directiveTransforms = {
    ...compilerOptions.directiveTransforms,
    ...directiveTransforms,
  }

  if (!compilerOptions.nodeTransforms) {
    compilerOptions.nodeTransforms = []
  }
  if (options.platform === 'h5' || options.platform === 'web') {
    templateOptions.transformAssetUrls = createUniVueTransformAssetUrls(
      isExternalUrl(options.base) ? options.base : ''
    )
  } else {
    // 替换内置的 transformAssetUrls 逻辑
    templateOptions.transformAssetUrls = {
      tags: {},
    }
    compilerOptions.nodeTransforms.push(...getBaseNodeTransforms(options.base))
  }

  if (nodeTransforms) {
    compilerOptions.nodeTransforms.push(...nodeTransforms)
  }

  // const compatConfig = parseCompatConfigOnce(options.inputDir)

  // compilerOptions.compatConfig = extend(
  //   compilerOptions.compatConfig || {},
  //   compatConfig
  // )

  // App,MP 平台不支持使用静态节点
  compilerOptions.hoistStatic = false
  // 小程序使用了
  ;(compilerOptions as any).root = process.env.UNI_INPUT_DIR
  const isX = process.env.UNI_APP_X === 'true'
  // app-nvue | app-uvue 需要启用 customElement 机制来内联 styles
  if (
    process.env.UNI_COMPILER === 'nvue' ||
    (isX && options.platform === 'app')
  ) {
    vueOptions.customElement = true
    if (process.env.UNI_RENDERER_NATIVE !== 'appService' || isX) {
      // nvue 需要使用自己的 compiler，来移除 scoped
      vueOptions.compiler = createNVueCompiler()
    }
  }
  if (isX) {
    if (!vueOptions.script) {
      vueOptions.script = {
        babelParserPlugins: [],
      }
    }
    if (!vueOptions.script.babelParserPlugins) {
      vueOptions.script.babelParserPlugins = []
    }

    if (!vueOptions.script.babelParserPlugins.includes('typescript')) {
      vueOptions.script.babelParserPlugins.push('typescript')
    }
    // decorators or decorators-legacy
    if (!vueOptions.script.babelParserPlugins.includes('decorators')) {
      vueOptions.script.babelParserPlugins.push('decorators')
    }
  }

  return vueOptions
}

export function initPluginVueJsxOptions(
  options: VitePluginUniResolvedOptions,
  {
    isCustomElement,
  }: Required<Required<UniVitePlugin>['uni']>['compilerOptions'],
  jsxOptions: Required<Required<UniVitePlugin>['uni']>['jsxOptions']
) {
  const vueJsxOptions = isPlainObject(options.vueJsxOptions)
    ? options.vueJsxOptions
    : (options.vueJsxOptions = {})
  if (!hasOwn(vueJsxOptions, 'optimize')) {
    vueJsxOptions.optimize = true
  }
  vueJsxOptions.isCustomElement = isCustomElement as (tag: string) => boolean
  if (!vueJsxOptions.babelPlugins) {
    vueJsxOptions.babelPlugins = []
  }
  if (isArray(jsxOptions.babelPlugins)) {
    vueJsxOptions.babelPlugins.push(...jsxOptions.babelPlugins)
  }

  return vueJsxOptions
}

export function initPluginViteLegacyOptions(
  options: VitePluginUniResolvedOptions
): ViteLegacyOptions {
  const viteLegacyOptions =
    options.viteLegacyOptions || (options.viteLegacyOptions = {})
  return viteLegacyOptions
}
