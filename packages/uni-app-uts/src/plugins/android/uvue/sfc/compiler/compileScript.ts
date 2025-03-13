import {
  BindingTypes,
  isFunctionType,
  walkIdentifiers,
} from '@vue/compiler-dom'
import type { SFCDescriptor, SFCScriptBlock } from '@vue/compiler-sfc'
import type { ParserPlugin } from '@babel/parser'
import type {
  ArrayPattern,
  CallExpression,
  Declaration,
  ExportSpecifier,
  Identifier,
  Node,
  ObjectPattern,
  Statement,
} from '@babel/types'
import { walk } from 'estree-walker'
import {
  type RawSourceMap,
  SourceMapConsumer,
  SourceMapGenerator,
} from 'source-map-js'
import { processNormalScript, processTemplate } from './script/normalScript'
import type { SFCTemplateCompileOptions } from '@vue/compiler-sfc'
import { warnOnce } from './warn'
import { ScriptCompileContext } from './script/context'
import {
  DEFINE_PROPS,
  WITH_DEFAULTS,
  genRuntimeProps,
  processDefineProps,
} from './script/defineProps'
import {
  DEFINE_EMITS,
  genRuntimeEmits,
  processDefineEmits,
} from './script/defineEmits'
import { DEFINE_EXPOSE, processDefineExpose } from './script/defineExpose'
import { DEFINE_OPTIONS, processDefineOptions } from './script/defineOptions'
import { genRuntimeSlots, processDefineSlots } from './script/defineSlots'
import { DEFINE_MODEL, processDefineModel } from './script/defineModel'
import {
  getImportedName,
  isCallOf,
  isLiteralNode,
  resolveDefineCode,
  unwrapTSNode,
} from './script/utils'
import { analyzeScriptBindings } from './script/analyzeScriptBindings'
import { hasConsole, rewriteConsole } from './script/rewriteConsole'
import { hasDebugError, rewriteDebugError } from './script/rewriteDebugError'
import type { TypeScope } from './script/resolveType'
import { rewriteSourceMap } from './script/rewriteSourceMap'

export const normalScriptDefaultVar = `__default__`

export const DEFAULT_FILENAME = 'anonymous.vue'

export interface SFCScriptCompileOptions {
  root: string
  /**
   * 类型
   */
  componentType: 'app' | 'page' | 'component'
  /**
   * 是否同时支持使用 <script> 和 <script setup>
   */
  scriptAndScriptSetup?: boolean
  /**
   * Class name
   */
  className: string
  /**
   * Scope ID for prefixing injected CSS variables.
   * This must be consistent with the `id` passed to `compileStyle`.
   */
  id: string
  /**
   * Production mode. Used to determine whether to generate hashed CSS variables
   */
  isProd?: boolean
  /**
   * Enable/disable source map. Defaults to true.
   */
  sourceMap?: boolean
  /**
   * https://babeljs.io/docs/en/babel-parser#plugins
   */
  babelParserPlugins?: ParserPlugin[]
  /**
   * A list of files to parse for global types to be made available for type
   * resolving in SFC macros. The list must be fully resolved file system paths.
   */
  globalTypeFiles?: string[]
  /**
   * Compile the template and inline the resulting render function
   * directly inside setup().
   * - Only affects `<script setup>`
   * - This should only be used in production because it prevents the template
   * from being hot-reloaded separately from component state.
   */
  inlineTemplate?: boolean
  /**
   * Generate the final component as a variable instead of default export.
   * This is useful in e.g. @vitejs/plugin-vue where the script needs to be
   * placed inside the main module.
   */
  genDefaultAs?: string
  /**
   * Options for template compilation when inlining. Note these are options that
   * would normally be passed to `compiler-sfc`'s own `compileTemplate()`, not
   * options passed to `compiler-dom`.
   */
  templateOptions?: Partial<SFCTemplateCompileOptions>
  /**
   * Hoist <script setup> static constants.
   * - Only enables when one `<script setup>` exists.
   * @default true
   */
  hoistStatic?: boolean
  /**
   * (**Experimental**) Enable macro `defineModel`
   * @default false
   */
  defineModel?: boolean
  /**
   * (**Experimental**) Enable reactive destructure for `defineProps`
   * @default false
   */
  propsDestructure?: boolean
  /**
   * File system access methods to be used when resolving types
   * imported in SFC macros. Defaults to ts.sys in Node.js, can be overwritten
   * to use a virtual file system for use in browsers (e.g. in REPLs)
   */
  fs?: {
    fileExists(file: string): boolean
    readFile(file: string): string | undefined
  }
  /**
   * (Experimental) Enable syntax transform for using refs without `.value` and
   * using destructured props with reactivity
   * @deprecated the Reactivity Transform proposal has been dropped. This
   * feature will be removed from Vue core in 3.4. If you intend to continue
   * using it, disable this and switch to the [Vue Macros implementation](https://vue-macros.sxzz.moe/features/reactivity-transform.html).
   */
  reactivityTransform?: boolean
  /**
   * Transform Vue SFCs into custom elements.
   */
  customElement?: boolean | ((filename: string) => boolean)
}

export interface ImportBinding {
  isType: boolean
  imported: string
  local: string
  source: string
  isFromSetup: boolean
  isUsedInTemplate: boolean
}

/**
 * Compile `<script setup>`
 * It requires the whole SFC descriptor because we need to handle and merge
 * normal `<script>` + `<script setup>` if both are present.
 */
export function compileScript(
  sfc: SFCDescriptor,
  options: SFCScriptCompileOptions
): SFCScriptBlock {
  if (!options.id) {
    warnOnce(
      `compileScript now requires passing the \`id\` option.\n` +
        `Upgrade your vite or vue-loader version for compatibility with ` +
        `the latest experimental proposals.`
    )
  }

  const ctx = new ScriptCompileContext(sfc, options)
  const { script, scriptSetup, source, filename } = sfc
  const hoistStatic = options.hoistStatic !== false && !script
  const scopeId = options.id ? options.id.replace(/^data-v-/, '') : ''

  // 目前暂不提供<script setup>和<script>同时使用
  // 目前给了个开关，用于单元测试
  if (!options.scriptAndScriptSetup) {
    if (script && scriptSetup) {
      throw new Error(`<script setup> and <script> cannot be used together.`)
    }
  }
  // TODO remove in 3.4
  // const enableReactivityTransform = !!options.reactivityTransform
  let refBindings: string[] | undefined

  if (!scriptSetup) {
    if (!script) {
      throw new Error(`[@vue/compiler-sfc] SFC contains no <script> tags.`)
    }
    // normal <script> only
    return processNormalScript(ctx, scopeId)
  }

  // if (script && scriptLang !== scriptSetupLang) {
  //   throw new Error(
  //     `[@vue/compiler-sfc] <script> and <script setup> must have the same ` +
  //       `language type.`
  //   )
  // }

  // if (scriptSetupLang && !ctx.isJS && !ctx.isTS) {
  //   // do not process non js/ts script blocks
  //   return scriptSetup
  // }

  // metadata that needs to be returned
  // const ctx.bindingMetadata: BindingMetadata = {}
  const scriptBindings: Record<string, BindingTypes> = Object.create(null)
  const setupBindings: Record<string, BindingTypes> = Object.create(null)

  let defaultExport: Node | undefined
  let hasAwait = false
  // let hasInlinedSsrRenderFn = false

  // string offsets
  const startOffset = ctx.startOffset!
  const endOffset = ctx.endOffset!
  const scriptStartOffset = script && script.loc.start.offset
  const scriptEndOffset = script && script.loc.end.offset

  function hoistNode(node: Statement) {
    const start = node.start! + startOffset
    let end = node.end! + startOffset
    // locate comment
    if (node.trailingComments && node.trailingComments.length > 0) {
      const lastCommentNode =
        node.trailingComments[node.trailingComments.length - 1]
      end = lastCommentNode.end! + startOffset
    }
    // locate the end of whitespace between this statement and the next
    while (end <= source.length) {
      if (!/\s/.test(source.charAt(end))) {
        break
      }
      end++
    }
    ctx.s.move(start, end, 0)
  }

  function registerUserImport(
    source: string,
    local: string,
    imported: string,
    isType: boolean,
    isFromSetup: boolean,
    needTemplateUsageCheck: boolean
  ) {
    ctx.userImports[local] = {
      isType,
      imported,
      local,
      source,
      isFromSetup,
      isUsedInTemplate: needTemplateUsageCheck,
    }
  }

  function checkInvalidScopeReference(node: Node | undefined, method: string) {
    if (!node) return
    walkIdentifiers(node, (id) => {
      const binding = setupBindings[id.name]
      if (binding && binding !== BindingTypes.LITERAL_CONST) {
        ctx.error(
          `\`${method}()\` in <script setup> cannot reference locally ` +
            `declared variables because it will be hoisted outside of the ` +
            `setup() function. If your component options require initialization ` +
            `in the module scope, use a separate normal <script> to export ` +
            `the options instead.`,
          id
        )
      }
    })
  }

  const scriptAst = ctx.scriptAst
  const scriptSetupAst = ctx.scriptSetupAst!

  const relativeFilename = ctx.descriptor.relativeFilename
  // 处理 console 的日志输出源码位置，不然就需要rust端读取 sourcemap 做映射
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.UNI_RUST_TEST === 'true'
  ) {
    if (scriptAst) {
      // 仅 dev 处理
      const scriptContent = ctx.descriptor.script!.content
      const startLine = (ctx.descriptor.script!.loc.start.line || 1) - 1
      const startOffset = ctx.descriptor.script!.loc.start.offset || 0
      if (hasDebugError(scriptContent)) {
        rewriteDebugError(scriptAst, ctx.s, {
          fileName: relativeFilename,
          startLine,
          startOffset,
        })
      }
      if (scriptContent.includes('console.')) {
        rewriteConsole(scriptAst, ctx.s, {
          fileName: relativeFilename,
          startLine,
          startOffset,
        })
      }
      rewriteSourceMap(scriptAst, ctx.s, {
        fileName: relativeFilename,
        startLine,
        startOffset,
      })
    }
    if (scriptSetupAst) {
      const scriptSetupContent = ctx.descriptor.scriptSetup!.content
      const startLine = (ctx.descriptor.scriptSetup!.loc.start.line || 1) - 1
      const startOffset = ctx.descriptor.scriptSetup!.loc.start.offset || 0
      if (hasDebugError(scriptSetupContent)) {
        rewriteDebugError(scriptSetupAst, ctx.s, {
          fileName: relativeFilename,
          startLine,
          startOffset,
        })
      }
      if (hasConsole(scriptSetupContent)) {
        rewriteConsole(scriptSetupAst, ctx.s, {
          fileName: relativeFilename,
          startLine,
          startOffset,
        })
      }
      rewriteSourceMap(scriptSetupAst, ctx.s, {
        fileName: relativeFilename,
        startLine,
        startOffset,
      })
    }
  }

  // 1.1 walk import declarations of <script>
  if (scriptAst) {
    for (const node of scriptAst.body) {
      if (node.type === 'ImportDeclaration') {
        // record imports for dedupe
        for (const specifier of node.specifiers) {
          const imported = getImportedName(specifier)
          registerUserImport(
            node.source.value,
            specifier.local.name,
            imported,
            node.importKind === 'type' ||
              (specifier.type === 'ImportSpecifier' &&
                specifier.importKind === 'type'),
            false,
            !options.inlineTemplate
          )
        }
      }
    }
  }

  // 1.2 walk import declarations of <script setup>
  for (const node of scriptSetupAst.body) {
    if (node.type === 'ImportDeclaration') {
      // import declarations are moved to top
      hoistNode(node)

      // dedupe imports
      let removed = 0
      const removeSpecifier = (i: number) => {
        const removeLeft = i > removed
        removed++
        const current = node.specifiers[i]
        const next = node.specifiers[i + 1]
        ctx.s.remove(
          removeLeft
            ? node.specifiers[i - 1].end! + startOffset
            : current.start! + startOffset,
          next && !removeLeft
            ? next.start! + startOffset
            : current.end! + startOffset
        )
      }

      for (let i = 0; i < node.specifiers.length; i++) {
        const specifier = node.specifiers[i]
        const local = specifier.local.name
        const imported = getImportedName(specifier)
        const source = node.source.value
        const existing = ctx.userImports[local]
        if (
          source === 'vue' &&
          (imported === DEFINE_PROPS ||
            imported === DEFINE_EMITS ||
            imported === DEFINE_EXPOSE)
        ) {
          warnOnce(
            `\`${imported}\` is a compiler macro and no longer needs to be imported.`
          )
          removeSpecifier(i)
        } else if (existing) {
          if (existing.source === source && existing.imported === imported) {
            // already imported in <script setup>, dedupe
            removeSpecifier(i)
          } else {
            ctx.error(
              `different imports aliased to same local name.`,
              specifier
            )
          }
        } else {
          registerUserImport(
            source,
            local,
            imported,
            node.importKind === 'type' ||
              (specifier.type === 'ImportSpecifier' &&
                specifier.importKind === 'type'),
            true,
            !options.inlineTemplate
          )
        }
      }
      if (node.specifiers.length && removed === node.specifiers.length) {
        ctx.s.remove(node.start! + startOffset, node.end! + startOffset)
      }
    }
  }

  // 1.3 resolve possible user import alias of `ref` and `reactive`
  const vueImportAliases: Record<string, string> = {}
  for (const key in ctx.userImports) {
    const { source, imported, local } = ctx.userImports[key]
    if (source === 'vue') vueImportAliases[imported] = local
  }

  // 2.1 process normal <script> body
  if (script && scriptAst) {
    const scriptScope = {
      offset: script.loc.start.offset,
      filename: ctx.filename,
      source: ctx.descriptor.source,
    } as TypeScope
    for (const node of scriptAst.body) {
      if (node.type === 'ExportDefaultDeclaration') {
        if (!options.scriptAndScriptSetup) {
          ctx.error(
            `When <script> and <script setup> are used together, export default is not supported within <script>.`,
            node,
            scriptScope
          )
        } else {
          // export default
          defaultExport = node

          // check if user has manually specified `name` or 'render` option in
          // export default
          // if has name, skip name inference
          // if has render and no template, generate return object instead of
          // empty render function (#4980)
          let optionProperties
          if (defaultExport.declaration.type === 'ObjectExpression') {
            optionProperties = defaultExport.declaration.properties
          } else if (
            defaultExport.declaration.type === 'CallExpression' &&
            defaultExport.declaration.arguments[0] &&
            defaultExport.declaration.arguments[0].type === 'ObjectExpression'
          ) {
            optionProperties = defaultExport.declaration.arguments[0].properties
          }
          if (optionProperties) {
            for (const p of optionProperties) {
              if (
                p.type === 'ObjectProperty' &&
                p.key.type === 'Identifier' &&
                p.key.name === 'name'
              ) {
                ctx.hasDefaultExportName = true
              }
              if (
                (p.type === 'ObjectMethod' || p.type === 'ObjectProperty') &&
                p.key.type === 'Identifier' &&
                p.key.name === 'render'
              ) {
                // TODO warn when we provide a better way to do it?
                ctx.hasDefaultExportRender = true
              }
            }
          }

          // export default { ... } --> const __default__ = { ... }
          const start = node.start! + scriptStartOffset!
          const end = node.declaration.start! + scriptStartOffset!
          ctx.s.overwrite(start, end, `const ${normalScriptDefaultVar} = `)
        }
      } else if (node.type === 'ExportNamedDeclaration') {
        if (!options.scriptAndScriptSetup) {
          ctx.error(
            `When <script> and <script setup> are used together, export is not supported within <script>.`,
            node,
            scriptScope
          )
        } else {
          const defaultSpecifier = node.specifiers.find(
            (s) =>
              s.exported.type === 'Identifier' && s.exported.name === 'default'
          ) as ExportSpecifier
          if (defaultSpecifier) {
            defaultExport = node
            // 1. remove specifier
            if (node.specifiers.length > 1) {
              ctx.s.remove(
                defaultSpecifier.start! + scriptStartOffset!,
                defaultSpecifier.end! + scriptStartOffset!
              )
            } else {
              ctx.s.remove(
                node.start! + scriptStartOffset!,
                node.end! + scriptStartOffset!
              )
            }
            if (node.source) {
              // export { x as default } from './x'
              // rewrite to `import { x as __default__ } from './x'` and
              // add to top
              ctx.s.prepend(
                `import { ${defaultSpecifier.local.name} as ${normalScriptDefaultVar} } from '${node.source.value}'\n`
              )
            } else {
              // export { x as default }
              // rewrite to `const __default__ = x` and move to end
              ctx.s.appendLeft(
                scriptEndOffset!,
                `\nconst ${normalScriptDefaultVar} = ${defaultSpecifier.local.name}\n`
              )
            }
          }
          if (node.declaration) {
            walkDeclaration(
              'script',
              node.declaration,
              scriptBindings,
              vueImportAliases,
              hoistStatic
            )
          }
        }
      } else if (
        (node.type === 'VariableDeclaration' ||
          node.type === 'FunctionDeclaration' ||
          node.type === 'ClassDeclaration' ||
          node.type === 'TSEnumDeclaration') &&
        !node.declare
      ) {
        walkDeclaration(
          'script',
          node,
          scriptBindings,
          vueImportAliases,
          hoistStatic
        )
      }
    }

    // apply reactivity transform
    // TODO remove in 3.4
    // if (enableReactivityTransform && shouldTransform(script.content)) {
    //   const { rootRefs, importedHelpers } = transformAST(
    //     scriptAst,
    //     ctx.s,
    //     scriptStartOffset!
    //   )
    //   refBindings = rootRefs
    //   for (const h of importedHelpers) {
    //     ctx.helperImports.add(h)
    //   }
    // }

    // <script> after <script setup>
    // we need to move the block up so that `const __default__` is
    // declared before being used in the actual component definition
    if (scriptStartOffset! > startOffset) {
      // if content doesn't end with newline, add one
      if (!/\n$/.test(script.content.trim())) {
        ctx.s.appendLeft(scriptEndOffset!, `\n`)
      }
      ctx.s.move(scriptStartOffset!, scriptEndOffset!, 0)
    }
  }

  // 2.2 process <script setup> body
  for (const node of scriptSetupAst.body) {
    if (node.type === 'ExpressionStatement') {
      const expr = unwrapTSNode(node.expression)
      // process `defineProps` and `defineEmit(s)` calls
      if (
        processDefineProps(ctx, expr) ||
        processDefineEmits(ctx, expr) ||
        processDefineOptions(ctx, expr) ||
        processDefineSlots(ctx, expr)
      ) {
        ctx.s.remove(node.start! + startOffset, node.end! + startOffset)
      } else if (processDefineExpose(ctx, expr)) {
        // defineExpose({}) -> expose({})
        const callee = (expr as CallExpression).callee
        ctx.s.overwrite(
          callee.start! + startOffset,
          callee.end! + startOffset,
          '__expose'
        )
      } else {
        processDefineModel(ctx, expr)
      }
    }

    if (node.type === 'VariableDeclaration' && !node.declare) {
      const total = node.declarations.length
      let left = total
      let lastNonRemoved: number | undefined

      for (let i = 0; i < total; i++) {
        const decl = node.declarations[i]
        const init = decl.init && unwrapTSNode(decl.init)
        if (init) {
          if (processDefineOptions(ctx, init)) {
            ctx.error(
              `${DEFINE_OPTIONS}() has no returning value, it cannot be assigned.`,
              node
            )
          }

          // defineProps / defineEmits
          const isDefineProps = processDefineProps(ctx, init, decl.id)
          const isDefineEmits =
            !isDefineProps && processDefineEmits(ctx, init, decl.id)
          !isDefineEmits &&
            (processDefineSlots(ctx, init, decl.id) ||
              processDefineModel(ctx, init, decl.id))

          if (
            isDefineProps &&
            !ctx.propsDestructureRestId &&
            ctx.propsDestructureDecl
          ) {
            if (left === 1) {
              ctx.s.remove(node.start! + startOffset, node.end! + startOffset)
            } else {
              let start = decl.start! + startOffset
              let end = decl.end! + startOffset
              if (i === total - 1) {
                // last one, locate the end of the last one that is not removed
                // if we arrive at this branch, there must have been a
                // non-removed decl before us, so lastNonRemoved is non-null.
                start = node.declarations[lastNonRemoved!].end! + startOffset
              } else {
                // not the last one, locate the start of the next
                end = node.declarations[i + 1].start! + startOffset
              }
              ctx.s.remove(start, end)
              left--
            }
          } else if (isDefineEmits) {
            if (decl.id.type === 'Identifier') {
              ctx.s.overwrite(
                startOffset + node.start!,
                startOffset + node.end!,
                `function ${decl.id.name}(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}`
              )
            }
            // ctx.s.overwrite(
            //   startOffset + init.start!,
            //   startOffset + init.end!,
            //   '__emit'
            // )
          } else {
            lastNonRemoved = i
          }
        }
      }
    }

    let isAllLiteral = false
    // walk declarations to record declared bindings
    if (
      (node.type === 'VariableDeclaration' ||
        node.type === 'FunctionDeclaration' ||
        node.type === 'ClassDeclaration' ||
        node.type === 'TSEnumDeclaration') &&
      !node.declare
    ) {
      isAllLiteral = walkDeclaration(
        'scriptSetup',
        node,
        setupBindings,
        vueImportAliases,
        hoistStatic
      )
    }

    // hoist literal constants
    if (hoistStatic && isAllLiteral) {
      hoistNode(node)
    }

    // walk statements & named exports / variable declarations for top level
    // await
    if (
      (node.type === 'VariableDeclaration' && !node.declare) ||
      node.type.endsWith('Statement')
    ) {
      const scope: Statement[][] = [scriptSetupAst.body]
      walk(node, {
        enter(child: Node, parent: Node | undefined) {
          if (isFunctionType(child)) {
            this.skip()
          }
          if (child.type === 'BlockStatement') {
            scope.push(child.body)
          }
          if (child.type === 'AwaitExpression') {
            ctx.error(`<script setup> cannot contain Top-level await.`, node)
            // hasAwait = true
            // // if the await expression is an expression statement and
            // // - is in the root scope
            // // - or is not the first statement in a nested block scope
            // // then it needs a semicolon before the generated code.
            // const currentScope = scope[scope.length - 1]
            // const needsSemi = currentScope.some((n, i) => {
            //   return (
            //     (scope.length === 1 || i > 0) &&
            //     n.type === 'ExpressionStatement' &&
            //     n.start === child.start
            //   )
            // })
            // processAwait(
            //   ctx,
            //   child,
            //   needsSemi,
            //   parent!.type === 'ExpressionStatement'
            // )
          }
        },
        exit(node: Node) {
          if (node.type === 'BlockStatement') scope.pop()
        },
      })
    }

    if (
      (node.type === 'ExportNamedDeclaration' && node.exportKind !== 'type') ||
      node.type === 'ExportAllDeclaration' ||
      node.type === 'ExportDefaultDeclaration'
    ) {
      ctx.error(
        `<script setup> cannot contain ES module exports. ` +
          `If you are using a previous version of <script setup>, please ` +
          `consult the updated RFC at https://github.com/vuejs/rfcs/pull/227.`,
        node
      )
    }

    // move all Type declarations to outer scope
    if (
      node.type.startsWith('TS') ||
      (node.type === 'ExportNamedDeclaration' && node.exportKind === 'type') ||
      (node.type === 'VariableDeclaration' && node.declare)
    ) {
      if (node.type !== 'TSEnumDeclaration') {
        hoistNode(node)
      }
    }
  }

  // 3 props destructure transform
  // if (ctx.propsDestructureDecl) {
  //   transformDestructuredProps(ctx, vueImportAliases)
  // }

  // 4. Apply reactivity transform
  // TODO remove in 3.4
  // if (
  //   enableReactivityTransform &&
  //   // normal <script> had ref bindings that maybe used in <script setup>
  //   (refBindings || shouldTransform(scriptSetup.content))
  // ) {
  //   const { rootRefs, importedHelpers } = transformAST(
  //     scriptSetupAst,
  //     ctx.s,
  //     startOffset,
  //     refBindings
  //   )
  //   refBindings = refBindings ? [...refBindings, ...rootRefs] : rootRefs
  //   for (const h of importedHelpers) {
  //     ctx.helperImports.add(h)
  //   }
  // }

  // 5. check macro args to make sure it doesn't reference setup scope
  // variables
  checkInvalidScopeReference(ctx.propsRuntimeDecl, DEFINE_PROPS)
  checkInvalidScopeReference(ctx.propsRuntimeDefaults, DEFINE_PROPS)
  checkInvalidScopeReference(ctx.propsDestructureDecl, DEFINE_PROPS)
  checkInvalidScopeReference(ctx.emitsRuntimeDecl, DEFINE_EMITS)
  checkInvalidScopeReference(ctx.optionsRuntimeDecl, DEFINE_OPTIONS)

  // 6. remove non-script content
  if (script) {
    if (startOffset < scriptStartOffset!) {
      // <script setup> before <script>
      ctx.s.remove(0, startOffset)
      ctx.s.remove(endOffset, scriptStartOffset!)
      ctx.s.remove(scriptEndOffset!, source.length)
    } else {
      // <script> before <script setup>
      ctx.s.remove(0, scriptStartOffset!)
      ctx.s.remove(scriptEndOffset!, startOffset)
      ctx.s.remove(endOffset, source.length)
    }
  } else {
    // only <script setup>
    ctx.s.remove(0, startOffset)
    ctx.s.remove(endOffset, source.length)
  }

  // 7. analyze binding metadata
  // `defineProps` & `defineModel` also register props bindings
  if (scriptAst) {
    Object.assign(ctx.bindingMetadata, analyzeScriptBindings(scriptAst.body))
  }
  for (const [key, { isType, imported, source }] of Object.entries(
    ctx.userImports
  )) {
    if (isType) continue
    ctx.bindingMetadata[key] =
      imported === '*' ||
      (imported === 'default' && source.endsWith('.vue')) ||
      source === 'vue'
        ? BindingTypes.SETUP_CONST
        : BindingTypes.SETUP_MAYBE_REF
  }
  for (const key in scriptBindings) {
    ctx.bindingMetadata[key] = scriptBindings[key]
  }
  for (const key in setupBindings) {
    ctx.bindingMetadata[key] = setupBindings[key]
  }
  // known ref bindings
  if (refBindings) {
    for (const key of refBindings) {
      ctx.bindingMetadata[key] = BindingTypes.SETUP_REF
    }
  }

  // 8. inject `useCssVars` calls
  // if (
  //   sfc.cssVars.length &&
  //   // no need to do this when targeting SSR
  //   !options.templateOptions?.ssr
  // ) {
  //   ctx.helperImports.add(CSS_VARS_HELPER)
  //   ctx.helperImports.add('unref')
  //   ctx.s.prependLeft(
  //     startOffset,
  //     `\n${genCssVarsCode(
  //       sfc.cssVars,
  //       ctx.bindingMetadata,
  //       scopeId,
  //       !!options.isProd
  //     )}\n`
  //   )
  // }

  // 9. finalize setup() argument signature
  let args = `__props`
  // inject user assignment of props
  // we use a default __props so that template expressions referencing props
  // can use it directly
  if (ctx.propsDecl) {
    if (ctx.propsDestructureRestId) {
      ctx.s.overwrite(
        startOffset + ctx.propsCall!.start!,
        startOffset + ctx.propsCall!.end!,
        `${ctx.helper(`createPropsRestProxy`)}(__props, ${JSON.stringify(
          Object.keys(ctx.propsDestructuredBindings)
        )})`
      )
      ctx.s.overwrite(
        startOffset + ctx.propsDestructureDecl!.start!,
        startOffset + ctx.propsDestructureDecl!.end!,
        ctx.propsDestructureRestId
      )
    } else if (!ctx.propsDestructureDecl) {
      ctx.s.overwrite(
        startOffset + ctx.propsCall!.start!,
        startOffset + ctx.propsCall!.end!,
        '__props'
      )
    }
  }

  // inject temp variables for async context preservation
  // if (hasAwait) {
  //   const any = `: any`
  //   ctx.s.prependLeft(startOffset, `\nlet __temp${any}, __restore${any}\n`)
  // }

  const destructureElements =
    ctx.hasDefineExposeCall || !options.inlineTemplate
      ? [`expose: __expose`]
      : []
  // emit 是个函数且不定参数，不通过解构处理
  // if (ctx.emitDecl) {
  // destructureElements.push(`emit: __emit`)
  // }
  if (destructureElements.length) {
    args += `, { ${destructureElements.join(', ')} }: SetupContext`
  }
  // 10. finalize default export
  const genDefaultAs = options.genDefaultAs
    ? `const ${options.genDefaultAs} =`
    : `export default`

  if (options.genDefaultAs) {
    ctx.s.append(`\nexport default ${options.genDefaultAs}`)
  }

  let runtimeOptions = ``
  if (!ctx.hasDefaultExportName && filename && filename !== DEFAULT_FILENAME) {
    const match = filename.match(/([^/\\]+)\.\w+$/)
    if (match) {
      runtimeOptions += `\n  __name: '${match[1]}',`
    }
  }
  // if (hasInlinedSsrRenderFn) {
  //   runtimeOptions += `\n  __ssrInlineRender: true,`
  // }
  if (ctx.optionsRuntimeDecl) {
    runtimeOptions +=
      `\n` +
      scriptSetup.content
        .slice(ctx.optionsRuntimeDecl.start!, ctx.optionsRuntimeDecl.end!)
        .trim()
        .slice(1, -1) +
      `,`
  }

  const slotsDecl = genRuntimeSlots(ctx)
  if (slotsDecl) runtimeOptions += `\n  slots: ${slotsDecl},`

  const propsDecl = genRuntimeProps(ctx)
  if (propsDecl) {
    if (ctx.propsInterfaceDecl) {
      runtimeOptions += `\n  __props: ${ctx.propsInterfaceDecl.id.name},`
    }
    runtimeOptions += `\n  props: ${propsDecl},`
  }

  const emitsDecl = genRuntimeEmits(ctx)
  if (emitsDecl) runtimeOptions += `\n  emits: ${emitsDecl},`

  // <script setup> components are closed by default. If the user did not
  // explicitly call `defineExpose`, call expose() with no args.
  const exposeCall = ``
  // ctx.hasDefineExposeCall || options.inlineTemplate ? `` : `  __expose();\n`
  // wrap setup code with function.

  // for TS, make sure the exported type is still valid type with
  // correct props information
  // we have to use object spread for types to be merged properly
  // user's TS setting should compile it down to proper targets
  // export default defineComponent({ ...__default__, ... })
  ctx.s.prependLeft(
    startOffset,
    `\n${genDefaultAs} ${ctx.helper(
      resolveDefineCode(ctx.options.componentType!)
    )}({${runtimeOptions}\n  ` +
      `${hasAwait ? `async ` : ``}setup(${args}): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy${
        options.genDefaultAs
          ? ` as InstanceType<typeof ${options.genDefaultAs}>`
          : ''
      };
const _cache = __ins.renderCache;
${exposeCall}`
  )

  let scriptMap: RawSourceMap | undefined
  // 11. generate return statement
  // 剩余由 rust 编译器处理
  if (options.componentType !== 'app') {
    const { code, preamble, map } = processTemplate(sfc, {
      relativeFilename,
      bindingMetadata: ctx.bindingMetadata,
      rootDir: options.root,
      className: options.className,
    })
    if (preamble) {
      ctx.s.prepend(preamble)
    }

    // 放到最后，以免查找 offset 有问题
    let offset = map ? (ctx.s.toString().match(/\r?\n/g)?.length ?? 0) + 1 : 1
    if (options.genDefaultAs) {
      offset = offset - 2 // 排除 export default __sfc__
    }
    ctx.s.appendRight(endOffset, `\nreturn ${code}\n}\n\n})`)
    ctx.s.trim()
    scriptMap =
      options.sourceMap !== false
        ? (ctx.s.generateMap({
            source: relativeFilename,
            hires: true,
            includeContent: true,
          }) as unknown as RawSourceMap)
        : undefined
    if (map && scriptMap) {
      scriptMap = generateScriptMap(offset, map, scriptMap)
    }
  } else {
    ctx.s.appendRight(endOffset, `})`)
    ctx.s.trim()
    scriptMap =
      options.sourceMap !== false
        ? (ctx.s.generateMap({
            source: relativeFilename,
            hires: true,
            includeContent: true,
          }) as unknown as RawSourceMap)
        : undefined
  }

  // 12. finalize Vue helper imports
  // if (ctx.helperImports.size > 0) {
  //   ctx.s.prepend(
  //     `import { ${[...ctx.helperImports]
  //       .map((h) => `${h} as _${h}`)
  //       .join(', ')} } from 'vue'\n`
  //   )
  // }

  return {
    ...scriptSetup,
    bindings: ctx.bindingMetadata,
    imports: ctx.userImports,
    content: ctx.s.toString(),
    map: scriptMap,
    scriptAst: scriptAst?.body,
    scriptSetupAst: scriptSetupAst?.body,
    deps: ctx.deps ? [...ctx.deps] : undefined,
  }
}

function generateScriptMap(
  offset: number,
  templateMap: RawSourceMap,
  scriptMap: RawSourceMap
): RawSourceMap {
  const templateMapConsumer = new SourceMapConsumer(templateMap)
  const scriptMapConsumer = new SourceMapConsumer(scriptMap)
  const scriptMapGenerator = new SourceMapGenerator()
  scriptMapConsumer.eachMapping((m) => {
    scriptMapGenerator.addMapping({
      original: {
        line: m.originalLine ?? 0,
        column: m.originalColumn ?? 0,
      },
      generated: {
        line: m.generatedLine,
        column: m.generatedColumn,
      },
      source: m.source,
      name: m.name,
    })
  })
  templateMapConsumer.eachMapping((m) => {
    scriptMapGenerator.addMapping({
      original: {
        line: m.originalLine ?? 0,
        column: m.originalColumn ?? 0,
      },
      generated: {
        line: m.generatedLine + offset,
        column: m.generatedColumn,
      },
      source: m.source,
      name: m.name,
    })
  })

  scriptMap.sources.forEach(function (sourceFile) {
    const sourceContent = scriptMapConsumer.sourceContentFor(sourceFile)
    if (sourceContent != null) {
      scriptMapGenerator.setSourceContent(sourceFile, sourceContent)
    }
  })

  return JSON.parse(scriptMapGenerator.toString())
}

function registerBinding(
  bindings: Record<string, BindingTypes>,
  node: Identifier,
  type: BindingTypes
) {
  bindings[node.name] = type
}

function walkDeclaration(
  from: 'script' | 'scriptSetup',
  node: Declaration,
  bindings: Record<string, BindingTypes>,
  userImportAliases: Record<string, string>,
  hoistStatic: boolean
): boolean {
  let isAllLiteral = false

  if (node.type === 'VariableDeclaration') {
    const isConst = node.kind === 'const'
    isAllLiteral =
      isConst &&
      node.declarations.every(
        (decl) => decl.id.type === 'Identifier' && isStaticNode(decl.init!)
      )

    // export const foo = ...
    for (const { id, init: _init } of node.declarations) {
      const init = _init && unwrapTSNode(_init)
      const isDefineCall = !!(
        isConst &&
        isCallOf(
          init,
          (c) => c === DEFINE_PROPS || c === DEFINE_EMITS || c === WITH_DEFAULTS
        )
      )
      if (id.type === 'Identifier') {
        let bindingType
        const userReactiveBinding = userImportAliases['reactive']
        if (
          (hoistStatic || from === 'script') &&
          (isAllLiteral || (isConst && isStaticNode(init!)))
        ) {
          bindingType = BindingTypes.LITERAL_CONST
        } else if (isCallOf(init, userReactiveBinding)) {
          // treat reactive() calls as let since it's meant to be mutable
          bindingType = isConst
            ? BindingTypes.SETUP_REACTIVE_CONST
            : BindingTypes.SETUP_LET
        } else if (
          // if a declaration is a const literal, we can mark it so that
          // the generated render fn code doesn't need to unref() it
          isDefineCall ||
          (isConst && canNeverBeRef(init!, userReactiveBinding))
        ) {
          bindingType = isCallOf(init, DEFINE_PROPS)
            ? BindingTypes.SETUP_REACTIVE_CONST
            : BindingTypes.SETUP_CONST
        } else if (isConst) {
          if (
            isCallOf(
              init,
              (m) =>
                m === userImportAliases['ref'] ||
                m === userImportAliases['computed'] ||
                m === userImportAliases['shallowRef'] ||
                m === userImportAliases['customRef'] ||
                m === userImportAliases['toRef'] ||
                m === DEFINE_MODEL
            )
          ) {
            bindingType = BindingTypes.SETUP_REF
          } else {
            bindingType = BindingTypes.SETUP_MAYBE_REF
          }
        } else {
          bindingType = BindingTypes.SETUP_LET
        }
        registerBinding(bindings, id, bindingType)
      } else {
        if (isCallOf(init, DEFINE_PROPS)) {
          continue
        }
        if (id.type === 'ObjectPattern') {
          walkObjectPattern(id, bindings, isConst, isDefineCall)
        } else if (id.type === 'ArrayPattern') {
          walkArrayPattern(id, bindings, isConst, isDefineCall)
        }
      }
    }
  } else if (node.type === 'TSEnumDeclaration') {
    isAllLiteral = node.members.every(
      (member) => !member.initializer || isStaticNode(member.initializer)
    )
    bindings[node.id!.name] = isAllLiteral
      ? BindingTypes.LITERAL_CONST
      : BindingTypes.SETUP_CONST
  } else if (
    node.type === 'FunctionDeclaration' ||
    node.type === 'ClassDeclaration'
  ) {
    // export function foo() {} / export class Foo {}
    // export declarations must be named.
    bindings[node.id!.name] = BindingTypes.SETUP_CONST
  }

  return isAllLiteral
}

function walkObjectPattern(
  node: ObjectPattern,
  bindings: Record<string, BindingTypes>,
  isConst: boolean,
  isDefineCall = false
) {
  for (const p of node.properties) {
    if (p.type === 'ObjectProperty') {
      if (p.key.type === 'Identifier' && p.key === p.value) {
        // shorthand: const { x } = ...
        const type = isDefineCall
          ? BindingTypes.SETUP_CONST
          : isConst
          ? BindingTypes.SETUP_MAYBE_REF
          : BindingTypes.SETUP_LET
        registerBinding(bindings, p.key, type)
      } else {
        walkPattern(p.value, bindings, isConst, isDefineCall)
      }
    } else {
      // ...rest
      // argument can only be identifier when destructuring
      const type = isConst ? BindingTypes.SETUP_CONST : BindingTypes.SETUP_LET
      registerBinding(bindings, p.argument as Identifier, type)
    }
  }
}

function walkArrayPattern(
  node: ArrayPattern,
  bindings: Record<string, BindingTypes>,
  isConst: boolean,
  isDefineCall = false
) {
  for (const e of node.elements) {
    e && walkPattern(e, bindings, isConst, isDefineCall)
  }
}

function walkPattern(
  node: Node,
  bindings: Record<string, BindingTypes>,
  isConst: boolean,
  isDefineCall = false
) {
  if (node.type === 'Identifier') {
    const type = isDefineCall
      ? BindingTypes.SETUP_CONST
      : isConst
      ? BindingTypes.SETUP_MAYBE_REF
      : BindingTypes.SETUP_LET
    registerBinding(bindings, node, type)
  } else if (node.type === 'RestElement') {
    // argument can only be identifier when destructuring
    const type = isConst ? BindingTypes.SETUP_CONST : BindingTypes.SETUP_LET
    registerBinding(bindings, node.argument as Identifier, type)
  } else if (node.type === 'ObjectPattern') {
    walkObjectPattern(node, bindings, isConst)
  } else if (node.type === 'ArrayPattern') {
    walkArrayPattern(node, bindings, isConst)
  } else if (node.type === 'AssignmentPattern') {
    if (node.left.type === 'Identifier') {
      const type = isDefineCall
        ? BindingTypes.SETUP_CONST
        : isConst
        ? BindingTypes.SETUP_MAYBE_REF
        : BindingTypes.SETUP_LET
      registerBinding(bindings, node.left, type)
    } else {
      walkPattern(node.left, bindings, isConst)
    }
  }
}

function canNeverBeRef(node: Node, userReactiveImport?: string): boolean {
  if (isCallOf(node, userReactiveImport)) {
    return true
  }
  switch (node.type) {
    case 'UnaryExpression':
    case 'BinaryExpression':
    case 'ArrayExpression':
    case 'ObjectExpression':
    case 'FunctionExpression':
    case 'ArrowFunctionExpression':
    case 'UpdateExpression':
    case 'ClassExpression':
    case 'TaggedTemplateExpression':
      return true
    case 'SequenceExpression':
      return canNeverBeRef(
        node.expressions[node.expressions.length - 1],
        userReactiveImport
      )
    default:
      if (isLiteralNode(node)) {
        return true
      }
      return false
  }
}

function isStaticNode(node: Node): boolean {
  node = unwrapTSNode(node)

  switch (node.type) {
    case 'UnaryExpression': // void 0, !true
      return isStaticNode(node.argument)

    case 'LogicalExpression': // 1 > 2
    case 'BinaryExpression': // 1 + 2
      return isStaticNode(node.left) && isStaticNode(node.right)

    case 'ConditionalExpression': {
      // 1 ? 2 : 3
      return (
        isStaticNode(node.test) &&
        isStaticNode(node.consequent) &&
        isStaticNode(node.alternate)
      )
    }

    case 'SequenceExpression': // (1, 2)
    case 'TemplateLiteral': // `foo${1}`
      return node.expressions.every((expr) => isStaticNode(expr))

    case 'ParenthesizedExpression': // (1)
      return isStaticNode(node.expression)

    case 'StringLiteral':
    case 'NumericLiteral':
    case 'BooleanLiteral':
    case 'NullLiteral':
    case 'BigIntLiteral':
      return true
  }
  return false
}
