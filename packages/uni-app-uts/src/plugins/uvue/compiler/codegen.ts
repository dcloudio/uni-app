import { SourceMapGenerator } from 'source-map'
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
  // WITH_CTX,
  WITH_DIRECTIVES,
  advancePositionWithMutation,
  getVNodeBlockHelper,
  getVNodeHelper,
  helperNameMap,
  isSimpleIdentifier,
  locStub,
  toValidAssetId,
} from '@vue/compiler-core'
import { CodegenOptions, CodegenResult } from './options'
import { isArray, isString, isSymbol } from '@vue/shared'
import { genRenderFunctionDecl } from './utils'
import {
  IS_TRUE,
  RENDER_LIST,
  RESOLVE_COMPONENT,
  RESOLVE_DIRECTIVE,
} from './runtimeHelpers'

type CodegenNode = TemplateChildNode | JSChildNode | SSRCodegenNode

export interface CodegenContext extends Required<CodegenOptions> {
  source: string
  code: string
  line: number
  column: number
  offset: number
  indentLevel: number
  map?: SourceMapGenerator
  helper(key: symbol): string
  push(code: string, node?: CodegenNode): void
  indent(): void
  deindent(withoutNewLine?: boolean): void
  newline(): void
}

function createCodegenContext(
  ast: RootNode,
  {
    targetLanguage,
    mode = 'default',
    prefixIdentifiers = false,
    bindingMetadata = {},
    sourceMap = false,
    filename = '',
  }: CodegenOptions
): CodegenContext {
  const context: CodegenContext = {
    targetLanguage,
    mode,
    prefixIdentifiers,
    bindingMetadata,
    sourceMap,
    filename,
    source: ast.loc.source,
    code: ``,
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    map: undefined,
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
        line: loc.line,
        column: loc.column - 1, // source-map column is 0 based
      },
      generated: {
        line: context.line,
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

export function generate(
  ast: RootNode,
  options: CodegenOptions
): CodegenResult {
  const context = createCodegenContext(ast, options)
  const { mode, deindent, indent, push, newline } = context
  if (mode === 'function') {
    push(genRenderFunctionDecl(options) + ` {`)
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
  if (mode === 'function') {
    deindent()
    push(`}`)
  }
  return {
    code: context.code,
    // SourceMapGenerator does have toJSON() method but it's not in the types
    map: context.map ? (context.map as any).toJSON() : undefined,
  }
}

function genAssets(
  assets: string[],
  type: 'component' | 'directive',
  { helper, push, newline }: CodegenContext
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
    push(
      `const ${toValidAssetId(id, type)} = ${resolver}(${JSON.stringify(id)}${
        maybeSelfReference ? `, true` : ``
      })`
    )
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
    const text = JSON.stringify(node.content)
    push(text, node)
  } else {
    push(`[${node.content}]`, node)
  }
}

function genComment(node: CommentNode, context: CodegenContext) {
  const { push, helper } = context
  push(`${helper(CREATE_COMMENT)}(${JSON.stringify(node.content)})`, node)
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
    genNullableArgs([tag, props, children, patchFlag, dynamicProps]),
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
    node.arguments.forEach((item: any) => {
      if (item.type === 18) {
        item.returnType = 'VNode'
      }
    })
  }

  genNodeList(node.arguments, context)
  push(`)`)
}

function genObjectExpression(node: ObjectExpression, context: CodegenContext) {
  const { push, indent, deindent, newline } = context
  const { properties } = node
  if (!properties.length) {
    push(`new Map<string,any>()`, node)
    return
  }
  const multilines =
    properties.length > 1 ||
    properties.some((p) => p.value.type !== NodeTypes.SIMPLE_EXPRESSION)
  push(`new Map<string,any>([`)
  multilines && indent()
  for (let i = 0; i < properties.length; i++) {
    const { key, value } = properties[i]
    if ((key as SimpleExpressionNode).content === '_') {
      continue
    }
    if (!(value as FunctionExpression).isSlot) {
      push(`[`)
      // key
      genExpressionAsPropertyKey(key, context)
      push(`, `)
    }
    // value
    genNode(value, context)
    if (!(value as FunctionExpression).isSlot) {
      push(`]`)
    }
    if (i < properties.length - 1) {
      // will only reach this if it's multilines
      push(`,`)
      if (!(value as FunctionExpression).isSlot) {
        newline()
      }
    }
  }
  multilines && deindent()
  push(`])`)
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
    // push(`_${helperNameMap[WITH_CTX]}(`)
  } else {
    push(`(`, node)
  }
  if (isArray(params)) {
    genNodeList(params, context)
  } else if (params) {
    genNode(params, context)
  }
  if ((node as any).returnType) {
    push(`):${(node as any).returnType} => `)
  } else {
    if (!isSlot) {
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
  // if (isSlot) {
  //   push(`)`)
  // }
}

function genConditionalExpression(
  node: ConditionalExpression,
  context: CodegenContext
) {
  const { test, consequent, alternate, newline: needNewline } = node
  const { push, indent, deindent, newline } = context
  push(`${context.helper(IS_TRUE)}(`)
  if (test.type === NodeTypes.SIMPLE_EXPRESSION) {
    genExpression(test, context)
  } else {
    genNode(test, context)
  }
  push(`)`)
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
  push(`_cache[${node.index}] || (`)
  if (node.isVNode) {
    indent()
    push(`${helper(SET_BLOCK_TRACKING)}(-1),`)
    newline()
  }
  push(`_cache[${node.index}] = `)
  genNode(node.value, context)
  if (node.isVNode) {
    push(`,`)
    newline()
    push(`${helper(SET_BLOCK_TRACKING)}(1),`)
    newline()
    push(`_cache[${node.index}]`)
    deindent()
  }
  push(`)`)
}
