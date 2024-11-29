import { hasOwn, isString, isSymbol } from '@vue/shared'
import {
  type CodegenResult,
  type CompoundExpressionNode,
  type InterpolationNode,
  NodeTypes,
  type Position,
  RESOLVE_COMPONENT,
  type RootNode,
  type SimpleExpressionNode,
  TO_DISPLAY_STRING,
  type TextNode,
  advancePositionWithMutation,
  helperNameMap,
  isSimpleIdentifier,
  locStub,
} from '@vue/compiler-core'
import type { Expression } from '@babel/types'
import {
  type GeneratorOptions,
  default as babelGenerate,
} from '@babel/generator'
import { addImportDeclaration, matchEasycom } from '@dcloudio/uni-cli-shared'
import type { SourceMapGenerator } from 'source-map-js'
import type { CodegenOptions, CodegenRootNode } from './options'

import {
  BindingComponentTypes,
  type ImportItem,
  type TransformContext,
} from './transform'

interface CodegenContext extends Omit<CodegenOptions, 'renderDataExpr'> {
  code: string
  source: string
  line: number
  column: number
  offset: number
  bindingComponents: TransformContext['bindingComponents']
  indentLevel: number
  map?: SourceMapGenerator
  push(code: string, node?: CodegenNode): void
  indent(): void
  deindent(withoutNewLine?: boolean): void
  newline(): void
}

export function generate(
  ast: CodegenRootNode,
  options: CodegenOptions
): Omit<CodegenResult, 'ast'> {
  const context = createCodegenContext(ast, options)

  const { mode, push, indent, deindent, newline, prefixIdentifiers } = context
  const helpers = Array.from(ast.helpers)
  const hasHelpers = helpers.length > 0
  const useWithBlock = !prefixIdentifiers && mode !== 'module'
  const isSetupInlined = !!options.inline

  // preambles
  // in setup() inline mode, the preamble is generated in a sub context
  // and returned separately.
  const preambleContext = isSetupInlined
    ? createCodegenContext(ast, options)
    : context
  if (mode === 'module') {
    genModulePreamble(ast, preambleContext, isSetupInlined)
  } else {
    genFunctionPreamble(ast, preambleContext)
  }

  // enter render function
  const functionName = `render`
  const args = ['_ctx', '_cache']
  if (options.bindingMetadata && !options.inline) {
    // binding optimization args
    args.push('$props', '$setup', '$data', '$options')
  }
  const signature = options.isTS
    ? args.map((arg) => `${arg}: any`).join(',')
    : args.join(', ')

  if (isSetupInlined) {
    push(`(${signature}) => {`)
  } else {
    push(`function ${functionName}(${signature}) {`)
  }
  indent()

  if (useWithBlock) {
    push(`with (_ctx) {`)
    indent()
    if (hasHelpers) {
      push(
        `const { ${helpers
          .map((s) => `${helperNameMap[s]}: _${helperNameMap[s]}`)
          .join(', ')} } = _Vue`
      )
      push(`\n`)
      newline()
    }
  }

  if (isSetupInlined && options.isX) {
    push(`const __returned__ = `)
    push(genBabelExpr(ast.renderData, options.generatorOpts))
    newline()
    push(`return __returned__`)
  } else {
    push(`return `)
    push(genBabelExpr(ast.renderData, options.generatorOpts))
  }

  if (useWithBlock) {
    deindent()
    push(`}`)
  }
  deindent()
  push(`}`)
  return {
    code: context.code,
    preamble: isSetupInlined ? preambleContext.code : ``,
    // SourceMapGenerator does have toJSON() method but it's not in the types
    map: context.map ? (context.map as any).toJSON() : undefined,
  }
}

function createCodegenContext(
  ast: CodegenRootNode,
  {
    mode = 'function',
    prefixIdentifiers = mode === 'module',
    filename = `template.vue.html`,
    scopeId = null,
    runtimeGlobalName = `Vue`,
    runtimeModuleName = `vue`,
    isTS = false,
    sourceMap = false,
  }: CodegenOptions
): CodegenContext {
  const context: CodegenContext = {
    mode,
    prefixIdentifiers,
    filename,
    scopeId,
    runtimeGlobalName,
    runtimeModuleName,
    bindingComponents: ast.bindingComponents,
    isTS,
    source: ast.loc.source,
    code: ``,
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    push(code, node) {
      context.code += code
      if (context.map) {
        if (node) {
          let name
          if (node.type === NodeTypes.SIMPLE_EXPRESSION && !node.isStatic) {
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
      source: context.filename || '',
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
  // 暂时无需提供 sourcemap 支持
  // if (sourceMap) {
  //   // lazy require source-map implementation
  //   context.map = new SourceMapGenerator()
  //   context.map!.setSourceContent(filename, context.source)
  // }

  return context
}

function genComponentImports(
  bindingComponents: TransformContext['bindingComponents'],
  { push, newline }: CodegenContext
) {
  const tags = Object.keys(bindingComponents)
  const importDeclarations: string[] = []
  // 仅记录easycom和setup组件
  const components: string[] = []
  tags.forEach((tag) => {
    const { name, type } = bindingComponents[tag]
    if (type === BindingComponentTypes.UNKNOWN) {
      const source = matchEasycom(tag)
      if (source) {
        // 调整为easycom命名
        const easycomName = name.replace('component', 'easycom')
        bindingComponents[tag].name = easycomName
        components.push(easycomName)
        addImportDeclaration(importDeclarations, easycomName, source)
      }
    } else if (type === BindingComponentTypes.SETUP) {
      components.push(name)
    }
  })
  if (tags.length) {
    push(
      `const __BINDING_COMPONENTS__ = '` +
        JSON.stringify(bindingComponents) +
        `'`
    )
    const resolveComponents: string[] = []
    const names: string[] = []
    Object.keys(bindingComponents).forEach((id) => {
      const { type, name } = bindingComponents[id]
      if (type === BindingComponentTypes.UNKNOWN) {
        resolveComponents.push(
          `const ${name} = _${helperNameMap[RESOLVE_COMPONENT]}("${id}");`
        )
        names.push(name)
      }
    })
    if (resolveComponents.length) {
      newline()
      push(`if (!Array) {`)
      resolveComponents.forEach((code) => {
        push(code)
      })
      push(`(${names.join('+')})()`)
      push(`}`)
    }
    newline()
    importDeclarations.forEach((str) => push(str))
    if (importDeclarations.length) {
      newline()
    }
    if (components.length) {
      push(`if (!Math) {`)
      push(` (${components.map((name) => name).join('+')})() `)
      push(`}`)
      newline()
    }
  }
}

function genFunctionPreamble(ast: RootNode, context: CodegenContext) {
  const {
    prefixIdentifiers,
    push,
    newline,
    runtimeGlobalName,
    bindingComponents,
  } = context
  const VueBinding = runtimeGlobalName
  const aliasHelper = (s: symbol) => `${helperNameMap[s]}: _${helperNameMap[s]}`
  const helpers = Array.from(ast.helpers)
  if (helpers.length > 0) {
    if (prefixIdentifiers) {
      push(`const { ${helpers.map(aliasHelper).join(', ')} } = ${VueBinding}\n`)
    } else {
      push(`const _Vue = ${VueBinding}\n`)
    }
  }
  genComponentImports(bindingComponents, context)
  newline()
  push(`return `)
}

function genModulePreamble(
  ast: RootNode,
  context: CodegenContext,
  inline?: boolean
) {
  const { push, newline, runtimeModuleName, bindingComponents } = context
  const helpers = Array.from(ast.helpers)
  if (helpers.length) {
    push(
      `import { ${helpers
        .map((s) => `${helperNameMap[s]} as _${helperNameMap[s]}`)
        .join(', ')} } from ${JSON.stringify(runtimeModuleName)}\n`
    )
  }

  if (ast.imports.length) {
    genImports(ast.imports, context)
  }

  genComponentImports(bindingComponents, context)
  newline()
  if (!inline) {
    push(`export `)
  }
}

function genImports(
  importsOptions: ImportItem[],
  { push, newline }: CodegenContext
) {
  if (!importsOptions.length) {
    return
  }
  importsOptions.forEach((imports) => {
    push(`import `)
    push(genExpr(imports.exp))
    push(` from '${imports.path}'`)
    newline()
  })
}

type CodegenNode =
  | SimpleExpressionNode
  | CompoundExpressionNode
  | InterpolationNode
  | TextNode

interface GenNodeContext {
  code: string
  helper(key: symbol): string
  push(code: string, node?: CodegenNode): void
}

function createGenNodeContext() {
  const context: GenNodeContext = {
    code: '',
    helper(key) {
      return `_${helperNameMap[key]}`
    },
    push(code) {
      context.code += code
    },
  }
  return context
}

export function genBabelExpr(expr: Expression, opts: GeneratorOptions = {}) {
  if (!hasOwn(opts, 'jsescOption')) {
    opts.jsescOption = {}
  }
  opts.jsescOption!.quotes = 'single'
  return babelGenerate(expr, opts).code
}

export function genExpr(
  node: CodegenNode | symbol | string,
  context?: GenNodeContext
) {
  return genNode(node, context).code
}

function genNode(
  node: CodegenNode | symbol | string,
  context?: GenNodeContext
) {
  if (!context) {
    context = createGenNodeContext()
  }
  if (isString(node)) {
    context.push(node)
    return context
  }
  if (isSymbol(node)) {
    context.push(context.helper(node))
    return context
  }
  switch (node.type) {
    case NodeTypes.TEXT:
      genText(node, context)
      break
    case NodeTypes.SIMPLE_EXPRESSION:
      genExpression(node, context)
      break
    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context)
      break
    case NodeTypes.COMPOUND_EXPRESSION:
      genCompoundExpression(node, context)
      break
  }
  return context
}

function genText(
  node: TextNode | SimpleExpressionNode,
  context: GenNodeContext
) {
  context.push(JSON.stringify(node.content), node)
}

function genExpression(node: SimpleExpressionNode, context: GenNodeContext) {
  const { content, isStatic } = node
  context.push(isStatic ? JSON.stringify(content) : content, node)
}

function genInterpolation(node: InterpolationNode, context: GenNodeContext) {
  const { push, helper } = context
  push(`${helper(TO_DISPLAY_STRING)}(`)
  genExpr(node.content, context)
  push(`)`)
}

function genCompoundExpression(
  node: CompoundExpressionNode,
  context: GenNodeContext
) {
  for (let i = 0; i < node.children!.length; i++) {
    const child = node.children![i]
    if (isString(child)) {
      context.push(child)
    } else {
      genExpr(child, context)
    }
  }
}
