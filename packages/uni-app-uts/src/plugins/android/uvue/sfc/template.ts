import type {
  CompilerOptions,
  SFCDescriptor,
  SFCTemplateCompileOptions,
} from 'vue/compiler-sfc'

import { getResolvedScript } from './script'
import type { ResolvedOptions } from '.'

export function resolveTemplateCompilerOptions(
  descriptor: SFCDescriptor,
  options: ResolvedOptions
): Omit<SFCTemplateCompileOptions, 'source'> | undefined {
  const block = descriptor.template
  if (!block) {
    return
  }
  const resolvedScript = getResolvedScript(descriptor)
  const hasScoped = descriptor.styles.some((s) => s.scoped)
  const { id, filename, cssVars } = descriptor

  let transformAssetUrls = options.template?.transformAssetUrls
  // compiler-sfc should export `AssetURLOptions`
  let assetUrlOptions //: AssetURLOptions | undefined
  if (transformAssetUrls !== false) {
    // build: force all asset urls into import requests so that they go through
    // the assets plugin for asset registration
    assetUrlOptions = {
      includeAbsolute: true,
    }
  }

  if (transformAssetUrls && typeof transformAssetUrls === 'object') {
    // presence of array fields means this is raw tags config
    if (Object.values(transformAssetUrls).some((val) => Array.isArray(val))) {
      transformAssetUrls = {
        ...assetUrlOptions,
        tags: transformAssetUrls as any,
      }
    } else {
      transformAssetUrls = { ...assetUrlOptions, ...transformAssetUrls }
    }
  } else {
    transformAssetUrls = assetUrlOptions
  }

  let preprocessOptions = block.lang && options.template?.preprocessOptions
  if (block.lang === 'pug') {
    preprocessOptions = {
      doctype: 'html',
      ...preprocessOptions,
    }
  }

  // if using TS, support TS syntax in template expressions
  const expressionPlugins: CompilerOptions['expressionPlugins'] =
    options.template?.compilerOptions?.expressionPlugins || []
  const lang = descriptor.scriptSetup?.lang || descriptor.script?.lang
  if (lang && /tsx?$/.test(lang) && !expressionPlugins.includes('typescript')) {
    expressionPlugins.push('typescript')
  }

  return {
    ...options.template,
    id,
    // @ts-ignore TODO remove ignore when dep is updated to 3.4
    ast: descriptor.template?.ast,
    filename,
    scoped: hasScoped,
    slotted: descriptor.slotted,
    isProd: options.isProduction,
    inMap: block.src ? undefined : block.map,
    ssrCssVars: cssVars,
    transformAssetUrls,
    preprocessLang: block.lang === 'html' ? undefined : block.lang,
    preprocessOptions,
    compilerOptions: {
      ...options.template?.compilerOptions,
      scopeId: hasScoped ? `data-v-${id}` : undefined,
      bindingMetadata: resolvedScript ? resolvedScript.bindings : undefined,
      expressionPlugins,
      sourceMap: options.sourceMap,
    },
  }
}
