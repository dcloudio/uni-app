import { extend, hasOwn, isArray } from '@vue/shared'
import { SFCTemplateCompileOptions } from '@vue/compiler-sfc'

import { isCustomElement, isNativeTag } from '@dcloudio/uni-shared'
import { EXTNAME_VUE_RE, parseCompatConfigOnce } from '@dcloudio/uni-cli-shared'

import { transformMatchMedia } from './transforms/transformMatchMedia'
import { VitePluginUniResolvedOptions } from '..'
import { createTransformEvent } from './transforms/transformEvent'

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

export function initPluginVueOptions(options: VitePluginUniResolvedOptions) {
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

  const compilerOptions =
    templateOptions.compilerOptions || (templateOptions.compilerOptions = {})
  compilerOptions.isNativeTag = isNativeTag
  if (!compilerOptions.nodeTransforms) {
    compilerOptions.nodeTransforms = []
  }

  const compatConfig = parseCompatConfigOnce(options.inputDir)

  compilerOptions.compatConfig = extend(
    compilerOptions.compatConfig || {},
    compatConfig
  )

  compilerOptions.nodeTransforms.unshift(createTransformEvent({}))
  if (options.platform !== 'mp-weixin') {
    compilerOptions.nodeTransforms.unshift(transformMatchMedia)
  }

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
