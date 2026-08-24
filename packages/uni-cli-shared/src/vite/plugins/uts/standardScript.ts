import type {
  DiagnosticWithLocation,
  SourceFile,
  TransformerFactory,
} from 'typescript'
import { parse } from '@vue/compiler-sfc'
import type { ExistingRawSourceMap } from 'rollup'
import MagicString from 'magic-string'
import type { Plugin } from 'vite'
import { resolveUTSCompiler } from '../../../uts'
import {
  createUniAppXScriptMacrosTransformer,
  hasUniAppXScriptMacros,
} from '../../../uts/scriptMacros'
import type { UasmTransformOptions } from '../../../uasm'

const JAVASCRIPT_TYPESCRIPT_RE = /\.[jt]s$/i
const TYPESCRIPT_DECLARATION_RE = /\.d\.ts$/i
const STANDARD_SFC_RE = /\.u?vue$/i
const LOAD_UASM = 'loadUASM'

type TypeScriptCompiler = typeof import('typescript')
type StandardScriptRequest = 'module' | 'sfc'

interface SourceEdit {
  start: number
  end: number
  content: string
}

export interface UniAppXStandardScriptPluginOptions {
  uasm?: UasmTransformOptions
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
  if (!transformScriptMacros && !transformUasm) {
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
    // H5、MP 的 UASM 调用不依赖 compileScript 产物，在原始脚本阶段处理即可继续使用标准 plugin-vue。
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
  if (!transformScriptMacros && !transformUasm) {
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
      if (!block || block.src || (block.lang !== 'js' && block.lang !== 'ts')) {
        continue
      }
      collectStandardScriptEdits(
        block.content,
        filename,
        block.lang,
        block.loc.start.offset,
        typescript,
        options,
        edits
      )
    }
  }
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

export function uniAppXStandardScriptPlugin(
  options: UniAppXStandardScriptPluginOptions = {}
): Plugin {
  const typescript = resolveUTSCompiler().getTypeScript()
  return {
    name: 'uni:app-x-standard-script',
    enforce: 'pre',
    transform(code, id) {
      // 该插件只由非 DOM2 平台安装，在标准 plugin-vue 前处理原始 SFC。
      return transformUniAppXStandardScript(code, id, typescript, options)
    },
  }
}
