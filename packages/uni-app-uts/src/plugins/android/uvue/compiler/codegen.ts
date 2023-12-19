import { SourceMapGenerator } from 'source-map-js'
import {
  ArrayExpression,
  CREATE_COMMENT,
  CacheExpression,
  CallExpression,
  CommentNode,
  CompoundExpressionNode,
  ConditionalExpression,
  ExpressionNode,
  FunctionExpression,
  InterpolationNode,
  JSChildNode,
  Node,
  NodeTypes,
  OPEN_BLOCK,
  ObjectExpression,
  Position,
  RootNode,
  SET_BLOCK_TRACKING,
  SSRCodegenNode,
  SimpleExpressionNode,
  TO_DISPLAY_STRING,
  TemplateChildNode,
  TextNode,
  VNodeCall,
  WITH_DIRECTIVES,
  advancePositionWithMutation,
  createSimpleExpression,
  getVNodeBlockHelper,
  getVNodeHelper,
  helperNameMap,
  isSimpleIdentifier,
  locStub,
  toValidAssetId,
} from '@vue/compiler-core'
import { NOOP, isArray, isString, isSymbol } from '@vue/shared'
import { ParserPlugin, parseExpression } from '@babel/parser'
import {
  isCompoundExpressionNode,
  isSimpleExpressionNode,
} from '@dcloudio/uni-cli-shared'
import { CodegenOptions, CodegenResult } from './options'
import { addEasyComponentAutoImports, genRenderFunctionDecl } from './utils'
import {
  IS_TRUE,
  RENDER_LIST,
  RESOLVE_CACHE,
  RESOLVE_COMPONENT,
  RESOLVE_DIRECTIVE,
  RESOLVE_EASY_COMPONENT,
  WITH_SCOPED_SLOT_CTX,
  WITH_SLOT_CTX,
} from './runtimeHelpers'
import { stringifyExpression } from './transforms/transformExpression'
import { isBinaryExpression } from '@babel/types'
import {
  isDestructuringSlotProps,
  SLOT_PROPS_NAME,
  createDestructuringSlotProps,
} from './transforms/transformSlotPropsDestructuring'
import { ImportItem } from './transform'

type CodegenNode = TemplateChildNode | JSChildNode | SSRCodegenNode

export interface CodegenContext
  extends Required<
    Omit<
      CodegenOptions,
      | 'sourceMapGeneratedLine'
      | 'className'
      | 'originalLineOffset'
      | 'generatedLineOffset'
      | 'inMap'
    >
  > {
  source: string
  code: string
  easyComponentAutoImports: Record<string, [string, string]>
  importEasyComponents: string[]
  importUTSComponents: string[]
  importUTSElements: string[]
  line: number
  column: number
  offset: number
  indentLevel: number
  map?: SourceMapGenerator
  expressionPlugins: ParserPlugin[]
  helper(key: symbol): string
  push(code: string, node?: CodegenNode): void
  indent(): void
  deindent(withoutNewLine?: boolean): void
  newline(): void
}

function createCodegenContext(
  ast: RootNode,
  {
    rootDir = '',
    targetLanguage = 'kotlin',
    mode = 'default',
    prefixIdentifiers = false,
    bindingMetadata = {},
    inline = false,
    sourceMap = false,
    filename = '',
    matchEasyCom = NOOP,
    parseUTSComponent = NOOP,
    originalLineOffset = 0,
    generatedLineOffset = 0,
  }: CodegenOptions
): CodegenContext {
  const context: CodegenContext = {
    rootDir,
    targetLanguage,
    mode,
    prefixIdentifiers,
    bindingMetadata,
    inline,
    sourceMap,
    filename,
    source: ast.loc.source,
    code: ``,
    easyComponentAutoImports: {},
    importEasyComponents: [],
    importUTSComponents: [],
    importUTSElements: [],
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    map: undefined,
    expressionPlugins: ['typescript'],
    matchEasyCom,
    parseUTSComponent,
    helper(key) {
      return `${helperNameMap[key]}`
    },
    push(code, node) {
      context.code += code
      if (context.map) {
        if (node) {
          let name
          if (node.type === NodeTypes.SIMPLE_EXPRESSION) {
            const content = node.content.replace(/^_ctx\./, '')
            if (content !== node.content && isSimpleIdentifier(content)) {
              name = content
            }
          }
          addMapping(node.loc.start, name)
        }
        advancePositionWithMutation(context, code)
        if (node && node.loc !== locStub) {
          addMapping(node.loc.end)
        }
      }
    },
    indent() {
      newline(++context.indentLevel)
    },
    deindent(withoutNewLine = false) {
      if (withoutNewLine) {
        --context.indentLevel
      } else {
        newline(--context.indentLevel)
      }
    },
    newline() {
      newline(context.indentLevel)
    },
  }

  function newline(n: number) {
    context.push('\n' + `  `.repeat(n))
  }

  function addMapping(loc: Position, name?: string) {
    context.map!.addMapping({
      name,
      source: context.filename,
      original: {
        line: loc.line + originalLineOffset,
        column: loc.column - 1, // source-map column is 0 based
      },
      generated: {
        line: context.line + generatedLineOffset,
        column: context.column - 1,
      },
    })
  }

  if (sourceMap) {
    // lazy require source-map implementation, only in non-browser builds
    context.map = new SourceMapGenerator()
    context.map!.setSourceContent(filename, context.source)
  }

  return context
}

const UTS_COMPONENT_ELEMENT_IMPORTS = `/*UTS-COMPONENTS-IMPORTS*/`

export function generate(
  ast: RootNode,
  options: CodegenOptions = {}
): CodegenResult {
  const context = createCodegenContext(ast, options)
  const { mode, deindent, indent, push, newline } = context
  const isSetupInlined = !!options.inline
  // preambles
  // in setup() inline mode, the preamble is generated in a sub context
  // and returned separately.
  // const preambleContext = isSetupInlined
  //   ? createCodegenContext(ast, options)
  //   : context
  // 目前不分割
  const preambleContext = context

  if (mode === 'module') {
    preambleContext.push(UTS_COMPONENT_ELEMENT_IMPORTS)
    newline()
    genEasyComImports(ast.components, preambleContext)
    if (ast.imports.length) {
      genImports(ast.imports, preambleContext)
      newline()
    }
    push(genRenderFunctionDecl(options) + ` {`)
    newline()
    if (!isSetupInlined) {
      push(`const _ctx = this`)
      newline()
      push(`const _cache = this.$.renderCache`)
    }
    // generate asset resolution statements
    if (ast.components.length) {
      newline()
      genAssets(ast.components, 'component', context)
      if (ast.directives.length || ast.temps > 0) {
        newline()
      }
    }
    if (ast.directives.length) {
      genAssets(ast.directives, 'directive', context)
      if (ast.temps > 0) {
        newline()
      }
    }
    if (ast.components.length || ast.directives.length || ast.temps) {
      newline()
    }
    indent()
    push(`return `)
  }
  if (ast.codegenNode) {
    genNode(ast.codegenNode as CodegenNode, context)
  } else {
    push(`null`)
  }
  if (mode === 'module') {
    deindent()
    push(`}`)
  }

  preambleContext.code = preambleContext.code.replace(
    UTS_COMPONENT_ELEMENT_IMPORTS,
    context.importUTSElements.length
      ? context.importUTSElements.join(';') + ';'
      : ''
  )

  return {
    ast,
    code: context.code,
    // preamble: isSetupInlined ? preambleContext.code : ``,
    easyComponentAutoImports: context.easyComponentAutoImports,
    importEasyComponents: context.importEasyComponents,
    importUTSComponents: context.importUTSComponents,
    imports: ast.imports.map((item) => `import '${item.path}'`),
    // SourceMapGenerator does have toJSON() method but it's not in the types
    map: context.map ? (context.map as any).toJSON() : undefined,
    // @ts-ignore
    elements: ast.elements,
  }
}

function genImports(importsOptions: ImportItem[], context: CodegenContext) {
  if (!importsOptions.length) {
    return
  }
  importsOptions.forEach((imports) => {
    if (isString(imports.exp)) {
      context.push(`import ${imports.exp} from '${imports.path}'`)
    } else if (isSimpleExpressionNode(imports.exp)) {
      // 解决静态资源导入 sourcemap 映射问题
      context.push(
        `import ${imports.exp.content} from '${imports.path}'`,
        imports.exp
      )
    } else {
      context.push(`import `)
      genNode(imports.exp, context)
      context.push(` from '${imports.path}'`)
    }

    context.newline()
  })
}

function genEasyComImports(
  components: string[],
  { push, newline, matchEasyCom, rootDir }: CodegenContext
) {
  for (let i = 0; i < components.length; i++) {
    let id = components[i]
    const maybeSelfReference = id.endsWith('__self')
    if (maybeSelfReference) {
      id = id.slice(0, -6)
    }
    const source = matchEasyCom(id, true)
    if (source) {
      const componentId = toValidAssetId(id, 'easycom' as 'component')
      push(`import ${componentId} from '${source}'`)
      newline()
    }
  }
}

function genAssets(
  assets: string[],
  type: 'component' | 'directive',
  {
    helper,
    push,
    newline,
    importEasyComponents,
    easyComponentAutoImports,
    matchEasyCom,
    rootDir,
  }: CodegenContext
) {
  const resolver = helper(
    type === 'component' ? RESOLVE_COMPONENT : RESOLVE_DIRECTIVE
  )
  for (let i = 0; i < assets.length; i++) {
    let id = assets[i]
    // potential component implicit self-reference inferred from SFC filename
    const maybeSelfReference = id.endsWith('__self')
    if (maybeSelfReference) {
      id = id.slice(0, -6)
    }
    let assetCode = ''
    if (type === 'component') {
      const source = matchEasyCom(id, false)
      if (source) {
        const easyComponentId = toValidAssetId(id, 'easycom' as 'component')
        const componentId = toValidAssetId(id, type)
        assetCode = `const ${componentId} = ${helper(
          RESOLVE_EASY_COMPONENT
        )}(${JSON.stringify(id)},${easyComponentId})`
        const importCode = `import ${easyComponentId} from '${source}';`
        if (!importEasyComponents.includes(importCode)) {
          importEasyComponents.push(importCode)
          addEasyComponentAutoImports(
            easyComponentAutoImports,
            rootDir,
            id,
            source
          )
        }
      }
    }
    if (!assetCode) {
      assetCode = `const ${toValidAssetId(
        id,
        type
      )} = ${resolver}(${JSON.stringify(id)}${
        maybeSelfReference ? `, true` : ``
      })`
    }
    push(assetCode)
    if (i < assets.length - 1) {
      newline()
    }
  }
}

function isText(n: string | CodegenNode) {
  return (
    isString(n) ||
    n.type === NodeTypes.SIMPLE_EXPRESSION ||
    n.type === NodeTypes.TEXT ||
    n.type === NodeTypes.INTERPOLATION ||
    n.type === NodeTypes.COMPOUND_EXPRESSION
  )
}

function genNodeListAsArray(
  nodes: (string | CodegenNode | TemplateChildNode[])[],
  context: CodegenContext
) {
  const multilines =
    nodes.length > 3 || nodes.some((n) => isArray(n) || !isText(n))
  context.push(`[`)
  multilines && context.indent()
  genNodeList(nodes, context, multilines)
  multilines && context.deindent()
  context.push(`]`)
}

function genNodeList(
  nodes: (string | symbol | CodegenNode | TemplateChildNode[])[],
  context: CodegenContext,
  multilines: boolean = false,
  comma: boolean = true
) {
  const { push, newline } = context
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (isString(node)) {
      push(node)
    } else if (isArray(node)) {
      genNodeListAsArray(node, context)
    } else {
      genNode(node, context)
    }
    if (i < nodes.length - 1) {
      if (multilines) {
        comma && push(',')
        newline()
      } else {
        comma && push(', ')
      }
    }
  }
}

function genNode(node: CodegenNode | symbol | string, context: CodegenContext) {
  if (isString(node)) {
    context.push(node)
    return
  }
  if (isSymbol(node)) {
    context.push(context.helper(node))
    return
  }
  switch (node.type) {
    case NodeTypes.ELEMENT:
    case NodeTypes.IF:
    case NodeTypes.FOR:
      genNode(node.codegenNode!, context)
      break
    case NodeTypes.TEXT:
      genText(node, context)
      break
    case NodeTypes.SIMPLE_EXPRESSION:
      genExpression(node, context)
      break
    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context)
      break
    case NodeTypes.TEXT_CALL:
      genNode(node.codegenNode, context)
      break
    case NodeTypes.COMPOUND_EXPRESSION:
      genCompoundExpression(node, context)
      break
    case NodeTypes.COMMENT:
      genComment(node, context)
      break
    case NodeTypes.VNODE_CALL:
      genVNodeCall(node, context)
      break

    case NodeTypes.JS_CALL_EXPRESSION:
      genCallExpression(node, context)
      break
    case NodeTypes.JS_OBJECT_EXPRESSION:
      genObjectExpression(node, context)
      break
    case NodeTypes.JS_ARRAY_EXPRESSION:
      genArrayExpression(node, context)
      break
    case NodeTypes.JS_FUNCTION_EXPRESSION:
      genFunctionExpression(node, context)
      break
    case NodeTypes.JS_CONDITIONAL_EXPRESSION:
      genConditionalExpression(node, context)
      break
    case NodeTypes.JS_CACHE_EXPRESSION:
      genCacheExpression(node, context)
      break
    case NodeTypes.JS_BLOCK_STATEMENT:
      genNodeList(node.body, context, true, false)
      break

    /* istanbul ignore next */
    case NodeTypes.IF_BRANCH:
      // noop
      break
    default:
  }
}

function genText(
  node: TextNode | SimpleExpressionNode,
  context: CodegenContext
) {
  context.push(JSON.stringify(node.content), node)
}

function genExpression(node: SimpleExpressionNode, context: CodegenContext) {
  const { content, isStatic } = node
  context.push(isStatic ? JSON.stringify(content) : content, node)
}

function genInterpolation(node: InterpolationNode, context: CodegenContext) {
  const { push, helper } = context
  push(`${helper(TO_DISPLAY_STRING)}(`)
  genNode(node.content, context)
  push(`)`)
}

function genCompoundExpression(
  node: CompoundExpressionNode,
  context: CodegenContext
) {
  for (let i = 0; i < node.children!.length; i++) {
    const child = node.children![i]
    if (isString(child)) {
      context.push(child)
    } else {
      genNode(child, context)
    }
  }
}

function genExpressionAsPropertyKey(
  node: ExpressionNode,
  context: CodegenContext
) {
  const { push } = context
  if (node.type === NodeTypes.COMPOUND_EXPRESSION) {
    push(`[`)
    genCompoundExpression(node, context)
    push(`]`)
  } else if (node.isStatic) {
    // only quote keys if necessary
    const text = isSimpleIdentifier(node.content)
      ? node.content
      : JSON.stringify(node.content)
    push(text, node)
  } else {
    push(`[${node.content}]`, node)
  }
}

function genComment(node: CommentNode, context: CodegenContext) {
  const { push, helper } = context
  push(`${helper(CREATE_COMMENT)}(${JSON.stringify(node.content)})`, node)
}

function parseTag(
  tag: string | symbol | CallExpression,
  curNode: Node,
  {
    parseUTSComponent,
    targetLanguage,
    importUTSComponents,
    importUTSElements,
  }: CodegenContext
) {
  if (isString(tag)) {
    // 原生UTS组件
    const utsComponentOptions = parseUTSComponent(
      tag.slice(1, -1),
      targetLanguage
    )
    if (utsComponentOptions) {
      const importCode = `import '${utsComponentOptions.source}';`
      if (!importUTSComponents.includes(importCode)) {
        importUTSComponents.push(importCode)
      }
      const importElementCode = `import { ${utsComponentOptions.className.replace(
        /Component$/,
        'Element'
      )} } from '${utsComponentOptions.namespace}'`
      if (!importUTSElements.includes(importElementCode)) {
        importUTSElements.push(importElementCode)
      }
      return createSimpleExpression(
        utsComponentOptions.namespace +
          '.' +
          utsComponentOptions.className +
          '.name',
        false,
        curNode.loc
      )
    }
  }
  return tag
}

function genVNodeCall(node: VNodeCall, context: CodegenContext) {
  const { push, helper } = context
  const {
    tag,
    props,
    children,
    patchFlag,
    dynamicProps,
    directives,
    // isBlock,
    disableTracking,
    isComponent,
  } = node
  if (directives) {
    push(helper(WITH_DIRECTIVES) + `(`)
  }
  const isBlock = false
  if (isBlock) {
    push(`(${helper(OPEN_BLOCK)}(${disableTracking ? `true` : ``}), `)
  }
  const callHelper: symbol = isBlock
    ? getVNodeBlockHelper(false, isComponent)
    : getVNodeHelper(false, isComponent)
  push(helper(callHelper) + `(`, node)
  genNodeList(
    genNullableArgs([
      parseTag(tag, node, context),
      props,
      children,
      patchFlag,
      dynamicProps,
    ]),
    context
  )
  push(`)`)
  if (isBlock) {
    push(`)`)
  }
  if (directives) {
    push(`, `)
    genNode(directives, context)
    push(`)`)
  }
}

function genNullableArgs(args: any[]): CallExpression['arguments'] {
  let i = args.length
  while (i--) {
    if (args[i] != null) break
  }
  return args.slice(0, i + 1).map((arg) => arg || `null`)
}

// JavaScript
function genCallExpression(node: CallExpression, context: CodegenContext) {
  const { push, helper } = context
  const callee = isString(node.callee) ? node.callee : helper(node.callee)
  push(callee + `(`, node)

  if (callee === helper(RENDER_LIST)) {
    genRenderList(node)
  }
  genNodeList(node.arguments, context)

  push(`)`)
}

function genRenderList(node: CallExpression) {
  node.arguments.forEach((argument: any) => {
    if (argument.type === NodeTypes.JS_FUNCTION_EXPRESSION) {
      argument.returnType = 'VNode'
    }
  })
}

function genObjectExpression(node: ObjectExpression, context: CodegenContext) {
  const { push, indent, deindent, newline } = context
  const { properties } = node
  if (!properties.length) {
    push(`utsMapOf()`, node)
    return
  }
  push(`utsMapOf(`)
  const multilines =
    properties.length > 1 ||
    properties.some((p) => p.value.type !== NodeTypes.SIMPLE_EXPRESSION)
  push(multilines ? `{` : `{ `)
  multilines && indent()
  for (let i = 0; i < properties.length; i++) {
    const { key, value } = properties[i]
    // key
    genExpressionAsPropertyKey(key, context)
    push(`: `)
    // value
    genNode(value, context)
    if (i < properties.length - 1) {
      // will only reach this if it's multilines
      push(`,`)
      newline()
    }
  }
  multilines && deindent()
  push(multilines ? `}` : ` }`)
  push(`)`)
}

function genArrayExpression(node: ArrayExpression, context: CodegenContext) {
  genNodeListAsArray(node.elements as CodegenNode[], context)
}

function genFunctionExpression(
  node: FunctionExpression,
  context: CodegenContext
) {
  const { push, indent, deindent } = context
  const { params, returns, body, newline, isSlot } = node
  if (isSlot) {
    // wrap slot functions with owner context
    push(`${helperNameMap[params ? WITH_SCOPED_SLOT_CTX : WITH_SLOT_CTX]}(`)
  }
  push(`(`, node)
  if (isArray(params)) {
    genNodeList(params, context)
  } else if (params) {
    if (
      isDestructuringSlotProps(isSlot, params as CompoundExpressionNode) ||
      (params as SimpleExpressionNode)?.content === '{}'
    ) {
      push(SLOT_PROPS_NAME)
    } else {
      genNode(params, context)
    }
  }
  if ((node as any).returnType) {
    push(`): ${(node as any).returnType} => `)
  } else {
    if (isSlot) {
      if (params) {
        push(`: Map<string, any | null>): any[] => `)
        if (
          isDestructuringSlotProps(isSlot, params as CompoundExpressionNode)
        ) {
          push('{')
          createDestructuringSlotProps(
            params as CompoundExpressionNode,
            context
          )
          context.newline()
          push('return ')
        }
      } else {
        push(`): any[] => `)
      }
    } else {
      push(`) => `)
    }
  }
  if (newline || body) {
    push(`{`)
    indent()
  }
  if (returns) {
    if (newline) {
      push(`return `)
    }
    if (isArray(returns)) {
      genNodeListAsArray(returns, context)
    } else {
      genNode(returns, context)
    }
  } else if (body) {
    genNode(body, context)
  }
  if (newline || body) {
    deindent()
    push(`}`)
  }
  if (isSlot) {
    if (isDestructuringSlotProps(isSlot, params as CompoundExpressionNode)) {
      push('}')
    }
    push(`)`)
  }
}

const booleanBinExprOperators = ['==', '===', '!=', '!==', '<', '>', '<=', '>=']

function shouldWrapperConditionalTest(
  test: JSChildNode,
  context: CodegenContext
) {
  const isSimpleExpr = isSimpleExpressionNode(test)
  if (isSimpleExpr) {
    const { content } = test
    if (content === 'true' || content === 'false') {
      return false
    }
  }
  if (isSimpleExpr || isCompoundExpressionNode(test)) {
    const code = stringifyExpression(test)
    const ast = parseExpression(code, {
      plugins: context.expressionPlugins,
    })
    if (isBinaryExpression(ast)) {
      // 先简易解析
      if (booleanBinExprOperators.includes(ast.operator)) {
        return false
      }
    }
  }

  return true
}

function genConditionalExpression(
  node: ConditionalExpression,
  context: CodegenContext
) {
  const { test, consequent, alternate, newline: needNewline } = node
  const { push, indent, deindent, newline } = context
  const wrapper = shouldWrapperConditionalTest(test, context)
  wrapper && push(`${context.helper(IS_TRUE)}(`)
  if (test.type === NodeTypes.SIMPLE_EXPRESSION) {
    genExpression(test, context)
  } else {
    genNode(test, context)
  }
  wrapper && push(`)`)
  needNewline && indent()
  context.indentLevel++
  needNewline || push(` `)
  push(`? `)
  genNode(consequent, context)
  context.indentLevel--
  needNewline && newline()
  needNewline || push(` `)
  push(`: `)
  const isNested = alternate.type === NodeTypes.JS_CONDITIONAL_EXPRESSION
  if (!isNested) {
    context.indentLevel++
  }
  genNode(alternate, context)
  if (!isNested) {
    context.indentLevel--
  }
  needNewline && deindent(true /* without newline */)
}

function genCacheExpression(node: CacheExpression, context: CodegenContext) {
  const { push, helper, indent, deindent, newline } = context
  push(`${helperNameMap[RESOLVE_CACHE]}(_cache, ${node.index}, (): VNode => {`)
  if (node.isVNode) {
    indent()
    push(`${helper(SET_BLOCK_TRACKING)}(-1)`)
    newline()
  }
  push(`_cache[${node.index}] = `)
  genNode(node.value, context)
  if (node.isVNode) {
    newline()
    push(`${helper(SET_BLOCK_TRACKING)}(1)`)
    newline()
    push(`return _cache[${node.index}] as VNode`)
    deindent()
  }
  push(`})`)
}
