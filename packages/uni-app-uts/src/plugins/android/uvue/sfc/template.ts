import type { TransformPluginContext } from 'rollup'
import type {
  BindingMetadata,
  CompilerOptions,
  SFCDescriptor,
  SFCTemplateCompileOptions,
} from 'vue/compiler-sfc'
import path from 'path'
import {
  SPECIAL_CHARS,
  createRollupError,
  generateCodeFrameColumns,
  matchEasycom,
  normalizePath,
  parseUTSComponent,
  parseUTSCustomElement,
} from '@dcloudio/uni-cli-shared'

import { getResolvedScript, scriptIdentifier } from './script'
import type { ResolvedOptions } from '.'
import type { TemplateCompilerOptions } from '../compiler/options'
import { parseUTSImportFilename } from '../../utils'
import type { CompilerError } from '../compiler/errors'

export function resolveGenTemplateCodeOptions(
  relativeFileName: string,
  code: string,
  descriptor: SFCDescriptor,
  options: {
    mode: 'module' | 'default'
    inline: boolean
    rootDir: string
    className: string
    sourceMap: boolean
    bindingMetadata?: BindingMetadata
    preprocessLang?: string
    preprocessOptions?: any
  },
  pluginContext?: TransformPluginContext
): TemplateCompilerOptions & { genDefaultAs?: string } {
  const block = descriptor.template
  if (!block) {
    return {
      genDefaultAs: scriptIdentifier,
      ...options,
      filename: relativeFileName,
    }
  }
  const inputRoot = normalizePath(options.rootDir)
  const templateStartLine = descriptor.template?.loc.start.line ?? 0
  let preprocessOptions = block.lang && options.preprocessOptions
  if (block.lang === 'pug') {
    preprocessOptions = {
      doctype: 'html',
      ...preprocessOptions,
    }
  }
  return {
    genDefaultAs: scriptIdentifier,
    ...options,
    filename: relativeFileName,
    inMap: descriptor.template?.map,
    preprocessLang: block.lang === 'html' ? undefined : block.lang,
    preprocessOptions,
    inline: !!descriptor.scriptSetup,
    matchEasyCom: (tag, uts) => {
      const source = matchEasycom(tag)
      if (uts && source) {
        if (source.startsWith(inputRoot)) {
          return '@/' + normalizePath(path.relative(inputRoot, source))
        }
        return parseUTSImportFilename(source)
      }
      return source
    },
    onWarn(warning: CompilerError & { errorType?: 'css' }) {
      if (pluginContext && warning.errorType !== 'css') {
        pluginContext.warn(
          createRollupError(
            '',
            path.resolve(options.rootDir, relativeFileName),
            warning,
            code
          )
        )
      } else {
        onTemplateLog(
          'warn',
          warning,
          code,
          relativeFileName,
          templateStartLine
        )
      }
    },
    onError(error: CompilerError & { errorType?: 'css' }) {
      if (pluginContext && error.errorType !== 'css') {
        pluginContext.error(
          createRollupError(
            '',
            path.resolve(options.rootDir, relativeFileName),
            error,
            code
          )
        )
      } else {
        onTemplateLog('error', error, code, relativeFileName, templateStartLine)
      }
    },
    parseUTSComponent,
    parseUTSCustomElement,
  }
}

function onTemplateLog(
  type: 'warn' | 'error',
  error: CompilerError,
  code: string,
  relativeFileName: string,
  templateStartLine: number
) {
  const char =
    type === 'warn' ? SPECIAL_CHARS.WARN_BLOCK : SPECIAL_CHARS.ERROR_BLOCK
  console[type](char + type + ': ' + error.message + (error.loc ? '' : char))
  if (error.loc) {
    const start = error.loc.start
    console.log(
      'at ' +
        relativeFileName +
        ':' +
        (start.line + templateStartLine - 1) +
        ':' +
        (start.column - 1)
    )
    console.log(generateCodeFrameColumns(code, error.loc) + char)
  }
}

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
    // TODO remove ignore when dep is updated to 3.4
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
