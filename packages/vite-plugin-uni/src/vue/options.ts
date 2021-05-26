import { Plugin } from 'vite'
import { extend, hasOwn, isArray } from '@vue/shared'
import { SFCTemplateCompileOptions } from '@vue/compiler-sfc'

import { isCustomElement, isNativeTag } from '@dcloudio/uni-shared'
import { EXTNAME_VUE_RE, parseCompatConfigOnce } from '@dcloudio/uni-cli-shared'

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

interface UniPlugin extends Plugin {
  uni?: {
    transformEvent?: Record<string, string>
  }
}

export function initPluginVueOptions(
  options: VitePluginUniResolvedOptions,
  uniPlugins: UniPlugin[]
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

  const eventOpts = uniPlugins.reduce<Record<string, string>>(
    (eventOpts, uniPlugin) => {
      return extend(eventOpts, uniPlugin.uni?.transformEvent)
    },
    {}
  )
  compilerOptions.nodeTransforms.unshift(transformContext)
  compilerOptions.nodeTransforms.unshift(createTransformEvent(eventOpts))
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
