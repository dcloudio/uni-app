import { hasOwn, isArray, isPlainObject } from '@vue/shared'
import type { TemplateCompiler } from '@vue/compiler-sfc'
import {
  EXTNAME_VUE_RE,
  UniVitePlugin,
  uniPostcssScopedPlugin,
  createUniVueTransformAssetUrls,
  onContextCreated,
} from '@dcloudio/uni-cli-shared'

import { VitePluginUniResolvedOptions } from '..'

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
  ;(compilerOptions as any).onContextCreated = onContextCreated

  compilerOptions.directiveTransforms = {
    ...compilerOptions.directiveTransforms,
    ...directiveTransforms,
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

  // App,MP 平台不支持使用静态节点
  compilerOptions.hoistStatic = false
  return vueOptions
}

export function initPluginVueJsxOptions(
  options: VitePluginUniResolvedOptions,
  {
    isCustomElement,
  }: Required<Required<UniVitePlugin>['uni']>['compilerOptions']
) {
  const vueJsxOptions = isPlainObject(options.vueJsxOptions)
    ? options.vueJsxOptions
    : (options.vueJsxOptions = {})
  if (!hasOwn(vueJsxOptions, 'optimize')) {
    vueJsxOptions.optimize = true
  }
  vueJsxOptions.isCustomElement = isCustomElement as (tag: string) => boolean
  return vueJsxOptions
}

export function initPluginViteLegacyOptions(
  options: VitePluginUniResolvedOptions
) {
  const viteLegacyOptions =
    options.viteLegacyOptions || (options.viteLegacyOptions = {})
  return viteLegacyOptions
}
