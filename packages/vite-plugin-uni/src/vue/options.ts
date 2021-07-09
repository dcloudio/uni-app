import { extend, hasOwn, isArray } from '@vue/shared'
import { ParserOptions } from '@vue/compiler-core'
import { CompilerOptions, SFCTemplateCompileOptions } from '@vue/compiler-sfc'

import { isCustomElement, isNativeTag } from '@dcloudio/uni-shared'
import {
  EXTNAME_VUE_RE,
  parseCompatConfigOnce,
  UniVitePlugin,
} from '@dcloudio/uni-cli-shared'

import { VitePluginUniResolvedOptions } from '..'
import { transformMatchMedia } from './transforms/transformMatchMedia'
import { createTransformEvent } from './transforms/transformEvent'
import { transformContext } from './transforms/transformContext'

function createUniVueTransformAssetUrls(
  base: string
): SFCTemplateCompileOptions['transformAssetUrls'] {
  return {
    base,
    tags: {
      audio: ['src'],
      video: ['src', 'poster'],
      img: ['src'],
      image: ['src'],
      'cover-image': ['src'],
      // h5
      'v-uni-audio': ['src'],
      'v-uni-video': ['src', 'poster'],
      'v-uni-image': ['src'],
      'v-uni-cover-image': ['src'],
      // nvue
      'u-image': ['src'],
      'u-video': ['src', 'poster'],
    },
  }
}

export function initPluginVueOptions(
  options: VitePluginUniResolvedOptions,
  UniVitePlugins: UniVitePlugin[]
) {
  const vueOptions = options.vueOptions || (options.vueOptions = {})
  if (!vueOptions.include) {
    vueOptions.include = []
  }
  if (!isArray(vueOptions.include)) {
    vueOptions.include = [vueOptions.include]
  }
  vueOptions.include.push(EXTNAME_VUE_RE)

  const templateOptions = vueOptions.template || (vueOptions.template = {})

  templateOptions.transformAssetUrls = createUniVueTransformAssetUrls(
    options.base
  )

  let isCompilerNativeTag: ParserOptions['isNativeTag'] = isNativeTag
  let isCompilerCustomElement: ParserOptions['isCustomElement'] =
    isCustomElement

  let directiveTransforms: CompilerOptions['directiveTransforms']

  UniVitePlugins.forEach((plugin) => {
    const compilerOptions = plugin.uni?.compilerOptions
    if (compilerOptions) {
      if (compilerOptions.isNativeTag) {
        isCompilerNativeTag = compilerOptions.isNativeTag
      }
      if (compilerOptions.isCustomElement) {
        isCompilerCustomElement = compilerOptions.isCustomElement
      }
      if (compilerOptions.directiveTransforms) {
        directiveTransforms = compilerOptions.directiveTransforms
      }
    }
  })
  const compilerOptions =
    templateOptions.compilerOptions || (templateOptions.compilerOptions = {})
  compilerOptions.isNativeTag = isCompilerNativeTag
  if (!compilerOptions.nodeTransforms) {
    compilerOptions.nodeTransforms = []
  }

  const compatConfig = parseCompatConfigOnce(options.inputDir)

  compilerOptions.compatConfig = extend(
    compilerOptions.compatConfig || {},
    compatConfig
  )

  compilerOptions.isCustomElement = isCompilerCustomElement

  const eventOpts = UniVitePlugins.reduce<Record<string, string>>(
    (eventOpts, UniVitePlugin) => {
      return extend(eventOpts, UniVitePlugin.uni?.transformEvent)
    },
    {}
  )
  compilerOptions.nodeTransforms.unshift(transformContext)
  compilerOptions.nodeTransforms.unshift(createTransformEvent(eventOpts))
  if (options.platform !== 'mp-weixin') {
    compilerOptions.nodeTransforms.unshift(transformMatchMedia)
  }

  if (directiveTransforms) {
    compilerOptions.directiveTransforms = extend(
      compilerOptions.directiveTransforms || {},
      directiveTransforms
    )
  }
  // App,MP 平台不支持使用静态节点
  compilerOptions.hoistStatic = false

  return vueOptions
}

export function initPluginVueJsxOptions(options: VitePluginUniResolvedOptions) {
  const vueJsxOptions = options.vueJsxOptions || (options.vueJsxOptions = {})
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
