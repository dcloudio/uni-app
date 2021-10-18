import { extend, hasOwn, isArray, isPlainObject } from '@vue/shared'
import { TemplateCompiler } from '@vue/compiler-sfc'
import { isCustomElement } from '@dcloudio/uni-shared'
import {
  EXTNAME_VUE_RE,
  UniVitePlugin,
  uniPostcssScopedPlugin,
  createUniVueTransformAssetUrls,
} from '@dcloudio/uni-cli-shared'

import { VitePluginUniResolvedOptions } from '..'
import { transformMatchMedia } from './transforms/transformMatchMedia'
import { createTransformEvent } from './transforms/transformEvent'
// import { transformContext } from './transforms/transformContext'

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
  if (!vueOptions.include) {
    vueOptions.include = []
  }
  if (!isArray(vueOptions.include)) {
    vueOptions.include = [vueOptions.include]
  }
  vueOptions.include.push(EXTNAME_VUE_RE)

  const styleOptions = vueOptions.style || (vueOptions.style = {})
  if (!styleOptions.postcssPlugins) {
    styleOptions.postcssPlugins = []
  }
  // 解析 scoped 中 deep 等特殊语法
  styleOptions.postcssPlugins.push(uniPostcssScopedPlugin())

  const templateOptions = vueOptions.template || (vueOptions.template = {})

  templateOptions.transformAssetUrls = createUniVueTransformAssetUrls(
    options.base
  )

  const compilerOptions =
    templateOptions.compilerOptions || (templateOptions.compilerOptions = {})

  const {
    compiler,
    compilerOptions: {
      miniProgram,
      isNativeTag,
      isCustomElement,
      nodeTransforms,
      directiveTransforms,
    },
  } = uniPluginOptions
  if (compiler) {
    templateOptions.compiler = compiler
  }
  if (miniProgram) {
    ;(compilerOptions as any).miniProgram = miniProgram
  }
  compilerOptions.isNativeTag = isNativeTag
  compilerOptions.isCustomElement = isCustomElement
  if (directiveTransforms) {
    compilerOptions.directiveTransforms = extend(
      compilerOptions.directiveTransforms || {},
      directiveTransforms
    )
  }

  if (!compilerOptions.nodeTransforms) {
    compilerOptions.nodeTransforms = []
  }
  if (nodeTransforms) {
    compilerOptions.nodeTransforms.push(...nodeTransforms)
  }

  // const compatConfig = parseCompatConfigOnce(options.inputDir)

  // compilerOptions.compatConfig = extend(
  //   compilerOptions.compatConfig || {},
  //   compatConfig
  // )

  const eventOpts = UniVitePlugins.reduce<Record<string, string>>(
    (eventOpts, UniVitePlugin) => {
      return extend(eventOpts, UniVitePlugin.uni?.transformEvent)
    },
    {}
  )
  // compilerOptions.nodeTransforms.unshift(transformContext)
  compilerOptions.nodeTransforms.unshift(createTransformEvent(eventOpts))
  if (options.platform !== 'mp-weixin') {
    compilerOptions.nodeTransforms.unshift(transformMatchMedia)
  }

  // App,MP 平台不支持使用静态节点
  compilerOptions.hoistStatic = false
  return vueOptions
}

export function initPluginVueJsxOptions(options: VitePluginUniResolvedOptions) {
  const vueJsxOptions = isPlainObject(options.vueJsxOptions)
    ? options.vueJsxOptions
    : (options.vueJsxOptions = {})
  if (!hasOwn(vueJsxOptions, 'optimize')) {
    vueJsxOptions.optimize = true
  }
  vueJsxOptions.isCustomElement = isCustomElement
  return vueJsxOptions
}

export function initPluginViteLegacyOptions(
  options: VitePluginUniResolvedOptions
) {
  const viteLegacyOptions =
    options.viteLegacyOptions || (options.viteLegacyOptions = {})
  return viteLegacyOptions
}
