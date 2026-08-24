import type { ExistingRawSourceMap } from 'rollup'
import MagicString from 'magic-string'
import { resolveUTSCompiler } from '../uts'
import type { UniVitePlugin } from '../vite'
import {
  type ScriptMacrosTypeScript,
  type UniAppXScriptMacroSourceEdit,
  createUniAppXScriptMacrosTransformer,
  hasUniAppXScriptMacros,
} from '../uts/scriptMacros'

const JAVASCRIPT_TYPESCRIPT_RE = /\.[jt]s$/i
const TYPESCRIPT_DECLARATION_RE = /\.d\.ts$/i

function cleanUrl(id: string) {
  const queryIndex = id.indexOf('?')
  return queryIndex < 0 ? id : id.slice(0, queryIndex)
}

export function resolveVaporScriptMacrosRequest(id: string) {
  const filename = cleanUrl(id)
  if (
    !JAVASCRIPT_TYPESCRIPT_RE.test(filename) ||
    TYPESCRIPT_DECLARATION_RE.test(filename)
  ) {
    return
  }
  const queryIndex = id.indexOf('?')
  if (queryIndex >= 0) {
    const query = new URLSearchParams(id.slice(queryIndex + 1))
    if (query.has('raw') || query.has('url')) {
      return
    }
  }
  return filename
}

export function transformUniAppXScriptMacros(
  code: string,
  id: string,
  typescript: ScriptMacrosTypeScript
): { code: string; map: ExistingRawSourceMap } | undefined {
  if (!hasUniAppXScriptMacros(code)) {
    return
  }

  const filename = cleanUrl(id)
  const sourceFile = typescript.createSourceFile(
    filename,
    code,
    typescript.ScriptTarget.Latest,
    false,
    /\.js$/i.test(filename)
      ? typescript.ScriptKind.JS
      : typescript.ScriptKind.TS
  )
  const edits: UniAppXScriptMacroSourceEdit[] = []
  const transformed = typescript.transform(sourceFile, [
    createUniAppXScriptMacrosTransformer({
      typescript,
      onSourceEdit(edit) {
        edits.push(edit)
      },
    }),
  ])
  transformed.dispose()
  if (!edits.length) {
    return
  }

  const output = new MagicString(code)
  for (const edit of edits) {
    output.overwrite(edit.start, edit.end, edit.content)
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

export function uniVaporScriptMacrosPlugin(): UniVitePlugin {
  const typescript = resolveUTSCompiler().getTypeScript()
  return {
    name: 'uni:vapor-script-macros',
    enforce: 'pre',
    uni: {
      uniAppXVaporScriptTransform(input) {
        return transformUniAppXScriptMacros(input.code, input.id, typescript)
      },
    },
    transform(code, id) {
      if (!resolveVaporScriptMacrosRequest(id)) {
        return
      }
      return transformUniAppXScriptMacros(code, id, typescript)
    },
  }
}
