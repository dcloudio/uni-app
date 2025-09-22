import fsExtra from 'fs-extra'
import { hasOwn, isArray, isPlainObject } from '@vue/shared'
import type { Plugin } from 'vite'
import type {
  AssetURLOptions,
  SFCDescriptor,
  SFCStyleCompileOptions,
  TemplateCompiler,
} from '@vue/compiler-sfc'
import type { Options as VueOptions } from '@vitejs/plugin-vue'
import {
  EXTNAME_VUE_RE,
  type UniVitePlugin,
  createResolveStaticAsset,
  createUniVueTransformAssetUrls,
  genDom2ClassName,
  getBaseNodeTransforms,
  isExternalUrl,
  isUniPageFile,
  normalizePath,
  preJs,
  resolveUniTypeScript,
  uniPostcssScopedPlugin,
} from '@dcloudio/uni-cli-shared'
import { parseInlineStyleSync } from '@dcloudio/uni-nvue-styler'
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
  const vuePluginInstance: Plugin = vuePlugin(options)
  if (process.env.NODE_ENV === 'development') {
    // 删除 buildEnd 逻辑，因为里边清理了缓存，导致 watch 模式失效 https://github.com/vitejs/vite-plugin-vue/commit/96dbb220ff210d2f7391f43a807bcd8cfb0da776
    delete vuePluginInstance.buildEnd
  }
  return vuePluginInstance
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

  ;(compilerOptions as any).isX = process.env.UNI_APP_X === 'true'

  // 默认就移除comments节点
  compilerOptions.comments = false

  if (process.env.UNI_PLATFORM !== 'web') {
    // 非 web 平台，使用 factory 模式
    ;(compilerOptions as any).templateMode = 'factory'
    // 目前禁用事件委托
    ;(compilerOptions as any).disableEventDelegation = true
    // 禁用 class 绑定，全部编译为 setClass 模式
    ;(compilerOptions as any).disableClassBinding = true
    // 解析静态样式
    ;(compilerOptions as any).parseStaticStyle = (style: string) => {
      return parseInlineStyleSync(style, {
        type: 'uvue',
        platform: process.env.UNI_UTS_PLATFORM,
      })
    }
  }

  const {
    compiler,
    styleOptions: { postcssPlugins },
    compilerOptions: {
      miniProgram,
      isNativeTag,
      isVoidTag,
      isCustomElement,
      nodeTransforms,
      directiveTransforms,
      whitespace,
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

  if (isVoidTag) {
    const userIsVoidTag = compilerOptions.isVoidTag
    compilerOptions.isVoidTag = (tag) => {
      if (isVoidTag(tag)) {
        return true
      }
      if (userIsVoidTag && userIsVoidTag(tag)) {
        return true
      }
      return false
    }
  }

  if (whitespace) {
    compilerOptions.whitespace = whitespace
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
  // 合并 transformAssetUrls

  // 内置配置
  const builtInTransformAssetUrls: AssetURLOptions =
    createUniVueTransformAssetUrls(
      isExternalUrl(options.base) ? options.base : ''
    )

  // 用户传递配置 eg: transformAssetUrls.tags = {'my-image': ['src']}
  // docs: https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
  const userOptionsTransformAssetUrls = templateOptions.transformAssetUrls

  templateOptions.transformAssetUrls = builtInTransformAssetUrls
  if (
    typeof userOptionsTransformAssetUrls !== 'boolean' &&
    !!userOptionsTransformAssetUrls?.tags &&
    !isArray(userOptionsTransformAssetUrls.tags)
  ) {
    templateOptions.transformAssetUrls = {
      ...builtInTransformAssetUrls,
      ...userOptionsTransformAssetUrls,
      tags: {
        ...builtInTransformAssetUrls.tags,
        ...userOptionsTransformAssetUrls.tags,
      },
    }
  }
  if (options.platform !== 'h5' && options.platform !== 'web') {
    compilerOptions.nodeTransforms.push(
      ...getBaseNodeTransforms(
        options.base,
        process.env.UNI_VUE_VAPOR === 'true' ||
          process.env.UNI_VUE_DOM2 === 'true'
          ? createResolveStaticAsset(options.inputDir)
          : undefined
      )
    )
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
    (isX && (options.platform === 'app' || options.platform === 'app-harmony'))
  ) {
    vueOptions.customElement = true
    if (process.env.UNI_RENDERER_NATIVE !== 'appService' || isX) {
      // nvue 需要使用自己的 compiler，来移除 scoped
      vueOptions.compiler = createNVueCompiler()
    }
  }
  if (!vueOptions.script) {
    vueOptions.script = {}
  }

  // TODO 目前暂不支持通过@/开头引入文件，因为需要tsconfig.json配置，建议使用相对路径
  // https://github.com/vuejs/core/blob/main/packages/compiler-sfc/src/script/resolveType.ts#L911
  require('@vue/compiler-sfc').registerTS(() => {
    if (isX) {
      return resolveUniTypeScript()
    }
    return require('typescript')
  })

  if (!vueOptions.script.fs) {
    function resolveFile(file: string) {
      if (file.startsWith('@/')) {
        file = file.replace('@/', normalizePath(process.env.UNI_INPUT_DIR))
      }
      return file
    }
    vueOptions.script.fs = {
      fileExists(file) {
        return fsExtra.existsSync(resolveFile(file))
      },
      readFile(file) {
        const filename = resolveFile(file)
        // 需要走条件编译
        return preJs(fsExtra.readFileSync(filename, 'utf-8'), filename)
      },
      realpath(file) {
        return resolveFile(file)
      },
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
    if (process.env.UNI_VUE_DOM2 === 'true') {
      ;(vueOptions.script as any).extraOptions = (
        descriptor: SFCDescriptor
      ) => {
        return {
          className: genDom2ClassName(
            descriptor.filename,
            process.env.UNI_INPUT_DIR
          ),
          componentType: isUniPageFile(descriptor.filename)
            ? 'page'
            : 'component',
        }
      }
      ;(vueOptions.template.compilerOptions as any).extraOptions = (
        descriptor: SFCDescriptor
      ) => {
        return {
          className: genDom2ClassName(
            descriptor.filename,
            process.env.UNI_INPUT_DIR
          ),
          componentType: isUniPageFile(descriptor.filename)
            ? 'page'
            : 'component',
          emitElement: (result) => {
            console.log('emitElement', result)
          },
          emitNativeView: (result) => {
            console.log('emitElement', result)
          },
          parseStaticStyle(
            type: 'element' | 'nativeView',
            style: string
          ): Record<string, unknown> {
            return {}
          },
        }
      }
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
