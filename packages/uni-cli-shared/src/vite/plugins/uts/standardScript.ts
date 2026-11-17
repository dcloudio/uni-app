import type {
  DiagnosticWithLocation,
  SourceFile,
  TransformerFactory,
} from 'typescript'
import { parse } from '@vue/compiler-sfc'
import type { ExistingRawSourceMap } from 'rollup'
import MagicString from 'magic-string'
import type { UniVitePlugin } from '../../index'
import type { UniAppXVaporScriptLang } from '../../../json'
import { resolveUTSCompiler } from '../../../uts'
import {
  createUniAppXScriptMacrosTransformer,
  hasUniAppXScriptMacros,
} from '../../../uts/scriptMacros'
import type { UasmTransformOptions } from '../../../uasm'
import type { WorkerTransformPluginOptions } from '../../../workers'

const JAVASCRIPT_TYPESCRIPT_RE = /\.[jt]s$/i
const TYPESCRIPT_DECLARATION_RE = /\.d\.ts$/i
const STANDARD_SFC_RE = /\.u?vue$/i
const LOAD_UASM = 'loadUasm'
const CREATE_WORKER = 'createWorker'

type TypeScriptCompiler = typeof import('typescript')
type StandardScriptRequest = 'module' | 'sfc'

interface SourceEdit {
  start: number
  end: number
  content: string
}

export interface UniAppXStandardScriptPluginOptions {
  /** @deprecated Web Vapor 默认语言由 compiler-sfc 负责，此字段仅保留旧调用方兼容性。 */
  defaultScriptLang?: UniAppXVaporScriptLang
  uasm?: UasmTransformOptions
  workers?: WorkerTransformPluginOptions
}

function cleanUrl(id: string) {
  const queryIndex = id.indexOf('?')
  return queryIndex < 0 ? id : id.slice(0, queryIndex)
}

export function resolveUniAppXStandardScriptRequest(
  id: string
): StandardScriptRequest | undefined {
  const filename = cleanUrl(id)
  const queryIndex = id.indexOf('?')
  if (queryIndex >= 0) {
    const query = new URLSearchParams(id.slice(queryIndex + 1))
    if (query.has('raw') || query.has('url') || query.has('vue')) {
      return
    }
  }
  if (
    JAVASCRIPT_TYPESCRIPT_RE.test(filename) &&
    !TYPESCRIPT_DECLARATION_RE.test(filename)
  ) {
    return 'module'
  }
  if (STANDARD_SFC_RE.test(filename)) {
    return 'sfc'
  }
}

function createTransformError(
  typescript: TypeScriptCompiler,
  diagnostic: DiagnosticWithLocation,
  id: string,
  offset: number
) {
  const error = new Error(
    typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
  ) as Error & { id?: string; pos?: number }
  error.id = id
  error.pos = offset + (diagnostic.start || 0)
  return error
}

function collectStandardScriptEdits(
  code: string,
  id: string,
  lang: 'js' | 'ts',
  offset: number,
  typescript: TypeScriptCompiler,
  options: UniAppXStandardScriptPluginOptions,
  edits: SourceEdit[]
) {
  const transformScriptMacros = hasUniAppXScriptMacros(code)
  const transformUasm = !!options.uasm && code.includes(LOAD_UASM)
  const transformWorker = !!options.workers && code.includes(CREATE_WORKER)
  if (!transformScriptMacros && !transformUasm && !transformWorker) {
    return
  }

  const sourceFile = typescript.createSourceFile(
    id,
    code,
    typescript.ScriptTarget.Latest,
    false,
    lang === 'js' ? typescript.ScriptKind.JS : typescript.ScriptKind.TS
  )
  // 脚本宏和 UASM 共用同一次 TypeScript transform，避免同一脚本重复创建 AST。
  const transformers: TransformerFactory<SourceFile>[] = []
  const onSourceEdit = (edit: SourceEdit) => {
    edits.push({
      start: offset + edit.start,
      end: offset + edit.end,
      content: edit.content,
    })
  }
  if (transformScriptMacros) {
    transformers.push(
      createUniAppXScriptMacrosTransformer({ typescript, onSourceEdit })
    )
  }
  if (transformUasm) {
    transformers.push(
      options.uasm!.createLoadUasmTransformer({
        ...options.uasm!,
        typescript,
        onSourceEdit,
        reportDiagnostic(_context, diagnostic) {
          throw createTransformError(typescript, diagnostic, id, offset)
        },
      })
    )
  }
  if (transformWorker) {
    transformers.push(
      options.workers!.createWorkerTransformer({
        ...options.workers!,
        typescript,
        onSourceEdit,
        reportDiagnostic(_context, diagnostic) {
          throw createTransformError(typescript, diagnostic, id, offset)
        },
      })
    )
  }

  const transformed = typescript.transform(sourceFile, transformers)
  transformed.dispose()
}

export function transformUniAppXStandardScript(
  code: string,
  id: string,
  typescript: TypeScriptCompiler,
  options: UniAppXStandardScriptPluginOptions = {}
): { code: string; map: ExistingRawSourceMap } | undefined {
  const transformScriptMacros = hasUniAppXScriptMacros(code)
  const transformUasm = !!options.uasm && code.includes(LOAD_UASM)
  const transformWorker = !!options.workers && code.includes(CREATE_WORKER)
  if (!transformScriptMacros && !transformUasm && !transformWorker) {
    return
  }

  const request = resolveUniAppXStandardScriptRequest(id)
  if (!request) {
    return
  }
  const filename = cleanUrl(id)
  const edits: SourceEdit[] = []
  if (request === 'module') {
    collectStandardScriptEdits(
      code,
      filename,
      /\.js$/i.test(filename) ? 'js' : 'ts',
      0,
      typescript,
      options,
      edits
    )
  } else {
    const { descriptor, errors } = parse(code, { filename })
    if (errors.length) {
      // SFC 语法错误继续交给标准 plugin-vue 统一报告，避免同一错误出现两次。
      return
    }
    for (const block of [descriptor.script, descriptor.scriptSetup]) {
      const lang = block?.lang ?? options.defaultScriptLang
      if (!block || block.src || (lang !== 'js' && lang !== 'ts')) {
        continue
      }
      collectStandardScriptEdits(
        block.content,
        filename,
        lang,
        block.loc.start.offset,
        typescript,
        options,
        edits
      )
    }
  }
  return applyStandardScriptEdits(code, filename, edits)
}

function applyStandardScriptEdits(
  code: string,
  filename: string,
  edits: SourceEdit[]
): { code: string; map: ExistingRawSourceMap } | undefined {
  if (!edits.length) {
    return
  }

  const output = new MagicString(code)
  for (const edit of edits) {
    if (edit.start === edit.end) {
      output.appendLeft(edit.start, edit.content)
    } else {
      output.overwrite(edit.start, edit.end, edit.content)
    }
  }
  return {
    code: output.toString(),
    map: output.generateMap({
      source: filename,
      includeContent: true,
      hires: 'boundary',
    }) as ExistingRawSourceMap,
  }
}

/**
 * 兼容现有平台的前置脚本插件，在 plugin-vue 之前处理 SFC 和独立 JS/TS 模块。
 * Web Vapor 使用 uniAppXScriptTransformPlugin，避免前置改写 SFC 破坏 compileScript 映射。
 */
export function uniAppXStandardScriptPlugin(
  options: UniAppXStandardScriptPluginOptions = {}
): UniVitePlugin {
  const typescript = resolveUTSCompiler().getTypeScript()
  return {
    name: 'uni:app-x-standard-script',
    enforce: 'pre',
    transform(code, id) {
      // 普通 Web、小程序及其他平台继续在 plugin-vue 前处理 SFC 和独立模块。
      return transformUniAppXStandardScript(code, id, typescript, options)
    },
  }
}

/**
 * 创建标准 JS/TS 脚本转换函数。
 *
 * SFC 由定制 plugin-vue 在 compileScript 后调用此函数，独立模块则由
 * uniAppXScriptTransformPlugin 直接调用。转换逻辑不依赖具体平台，便于后续 MP 复用。
 */
export function createUniAppXScriptTransform(
  options: UniAppXStandardScriptPluginOptions = {}
): NonNullable<
  NonNullable<UniVitePlugin['uni']>['uniAppXVaporScriptTransform']
> {
  const typescript = resolveUTSCompiler().getTypeScript()
  return createUniAppXScriptTransformWithTypeScript(options, typescript)
}

function createUniAppXScriptTransformWithTypeScript(
  options: UniAppXStandardScriptPluginOptions,
  typescript: TypeScriptCompiler
): NonNullable<
  NonNullable<UniVitePlugin['uni']>['uniAppXVaporScriptTransform']
> {
  return ({ code, id, lang }) => {
    if (lang !== 'js' && lang !== 'ts') return
    const edits: SourceEdit[] = []
    collectStandardScriptEdits(code, id, lang, 0, typescript, options, edits)
    return applyStandardScriptEdits(code, cleanUrl(id), edits)
  }
}

/**
 * 为标准脚本平台提供统一的脚本转换入口：
 * - SFC 通过 uniAppXVaporScriptTransform 交给定制 plugin-vue 后置处理；
 * - 独立 JS/TS 模块仍在本插件的 transform 钩子中直接处理。
 */
export function uniAppXScriptTransformPlugin(
  options: UniAppXStandardScriptPluginOptions = {}
): UniVitePlugin {
  const typescript = resolveUTSCompiler().getTypeScript()
  const transform = createUniAppXScriptTransformWithTypeScript(
    options,
    typescript
  )
  return {
    // 保留原内部名称，避免外部按 Vite 插件名查找时产生兼容性问题。
    name: 'uni:app-x-vapor-script',
    enforce: 'pre',
    uni: {
      uniAppXVaporScriptTransform: transform,
    },
    transform(code, id) {
      if (resolveUniAppXStandardScriptRequest(id) !== 'module') return
      const filename = cleanUrl(id)
      return transform({
        code,
        id: filename,
        lang: /\.js$/i.test(filename) ? 'js' : 'ts',
      })
    },
  }
}
