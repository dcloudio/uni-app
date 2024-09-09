import MagicString from 'magic-string'
import type { BindingMetadata, SFCDescriptor } from '@vue/compiler-sfc'
import {
  addUniModulesExtApiComponents,
  enableSourceMap,
} from '@dcloudio/uni-cli-shared'
import { analyzeScriptBindings } from './analyzeScriptBindings'
import type { ScriptCompileContext } from './context'
import { hasConsole, rewriteConsole } from './rewriteConsole'
import { hasDebugError, rewriteDebugError } from './rewriteDebugError'
import { rewriteSourceMap } from './rewriteSourceMap'
import { rewriteDefaultAST } from '../rewriteDefault'
import { resolveDefineCode } from './utils'
import { resolveGenTemplateCodeOptions } from '../../template'
import { addExtApiComponents } from '../../../../../utils'
import { genTemplateCode } from '../../../code/template'

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
    const relativeFilename = ctx.descriptor.relativeFilename
    const startLine = (ctx.descriptor.script!.loc.start.line || 1) - 1
    const startOffset = 0

    if (ctx.options.genDefaultAs) {
      rewriteDefaultAST(
        scriptAst.body,
        s,
        ctx.options.genDefaultAs,
        resolveDefineCode(ctx.options.componentType!)
      )
    }

    if (
      process.env.NODE_ENV === 'development' ||
      process.env.UNI_RUST_TEST === 'true'
    ) {
      if (hasDebugError(content)) {
        rewriteDebugError(scriptAst, s, {
          fileName: relativeFilename,
          startLine,
          startOffset,
        })
      }
      if (hasConsole(content)) {
        rewriteConsole(scriptAst, s, {
          fileName: relativeFilename,
          startLine,
          startOffset,
        })
      }
      rewriteSourceMap(scriptAst, s, {
        fileName: relativeFilename,
        startLine,
        startOffset,
      })
    }

    if (ctx.options.genDefaultAs) {
      s.append(`\nexport default ${ctx.options.genDefaultAs}`)
    }

    if (s.hasChanged()) {
      content = s.toString()
      // 需要合并旧的 sourcemap
      // if (ctx.options.sourceMap) {
      //   map = s.generateMap({
      //     source: relativeFilename,
      //     hires: true,
      //     includeContent: true,
      //   }) as unknown as RawSourceMap
      // }
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

export function processTemplate(
  sfc: SFCDescriptor,
  {
    relativeFilename,
    bindingMetadata,
    className,
    rootDir,
  }: {
    relativeFilename: string
    bindingMetadata?: BindingMetadata
    className: string
    rootDir: string
  }
) {
  const options = resolveGenTemplateCodeOptions(
    relativeFilename,
    sfc.source,
    sfc,
    {
      mode: 'module',
      inline: !!sfc.scriptSetup,
      className,
      rootDir,
      sourceMap: enableSourceMap(),
      bindingMetadata,
    }
  )
  const { code, preamble, elements, map } = genTemplateCode(sfc, options)

  if (process.env.NODE_ENV === 'production') {
    const components = elements.filter((element) => {
      // 如果是UTS原生组件，则无需记录摇树
      if (options.parseUTSComponent!(element, 'kotlin')) {
        return false
      }
      return true
    })
    if (process.env.UNI_COMPILE_TARGET === 'uni_modules') {
      addUniModulesExtApiComponents(relativeFilename, components)
    } else {
      addExtApiComponents(components)
    }
  }
  return { code, map, preamble }
}
