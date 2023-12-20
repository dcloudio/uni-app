import MagicString from 'magic-string'
import { parseUTSRelativeFilename } from '../../../../utils'
import { analyzeScriptBindings } from './analyzeScriptBindings'
import { ScriptCompileContext } from './context'
import { hasConsole, rewriteConsole } from './rewriteConsole'
import { hasDebugError, rewriteDebugError } from './rewriteDebugError'

export function processNormalScript(
  ctx: ScriptCompileContext,
  _scopeId: string
) {
  const script = ctx.descriptor.script!
  // if (script.lang && !ctx.isJS && !ctx.isTS) {
  //   // do not process non js/ts script blocks
  //   return script
  // }
  try {
    let content = script.content
    let map = script.map
    const scriptAst = ctx.scriptAst!
    const bindings = analyzeScriptBindings(scriptAst.body)
    const s = new MagicString(content)
    const fileName = parseUTSRelativeFilename(ctx.descriptor.filename)
    const startLine = (ctx.descriptor.script!.loc.start.line || 1) - 1
    const startOffset = 0
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.UNI_RUST_TEST === 'true'
    ) {
      if (hasDebugError(content)) {
        rewriteDebugError(scriptAst, s, {
          fileName,
          startLine,
          startOffset,
        })
      }
    }
    if (hasConsole(content)) {
      rewriteConsole(scriptAst, s, {
        fileName,
        startLine,
        startOffset,
      })
    }
    if (s.hasChanged()) {
      content = s.toString()
    }
    return {
      ...script,
      content,
      map,
      bindings,
      scriptAst: scriptAst.body,
    }
  } catch (e: any) {
    // silently fallback if parse fails since user may be using custom
    // babel syntax
    return script
  }
}
