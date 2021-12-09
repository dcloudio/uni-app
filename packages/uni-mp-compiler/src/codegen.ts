import { isString, isSymbol, hasOwn } from '@vue/shared'
import {
  CodegenResult,
  CompoundExpressionNode,
  helperNameMap,
  InterpolationNode,
  NodeTypes,
  RESOLVE_COMPONENT,
  RootNode,
  SimpleExpressionNode,
  TextNode,
  TO_DISPLAY_STRING,
} from '@vue/compiler-core'
import { Expression } from '@babel/types'
import { default as babelGenerate, GeneratorOptions } from '@babel/generator'
import { addImportDeclaration, matchEasycom } from '@dcloudio/uni-cli-shared'
import { CodegenOptions, CodegenRootNode } from './options'

import {
  BindingComponentTypes,
  ImportItem,
  TransformContext,
} from './transform'

interface CodegenContext extends Omit<CodegenOptions, 'renderDataExpr'> {
  code: string
  bindingComponents: TransformContext['bindingComponents']
  indentLevel: number
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

  const hasHelpers = ast.helpers.length > 0
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
        `const { ${ast.helpers
          .map((s) => `${helperNameMap[s]}: _${helperNameMap[s]}`)
          .join(', ')} } = _Vue`
      )
      push(`\n`)
      newline()
    }
  }

  push(`return `)
  push(genBabelExpr(ast.renderData, options.generatorOpts))
  if (useWithBlock) {
    deindent()
    push(`}`)
  }
  deindent()
  push(`}`)
  return {
    code: context.code,
    preamble: isSetupInlined ? preambleContext.code : ``,
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
    code: ``,
    indentLevel: 0,
    push(code, node) {
      context.code += code
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
      push(`Math.max.call(null, ${names.join(', ')});`)
      push(`}`)
    }
    newline()
    importDeclarations.forEach((str) => push(str))
    if (importDeclarations.length) {
      newline()
    }
    if (components.length) {
      push(`if (!Math) {`)
      push(
        ` Math.max.call(null, ${components.map((name) => name).join(', ')}) `
      )
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
  if (ast.helpers.length > 0) {
    if (prefixIdentifiers) {
      push(
        `const { ${ast.helpers.map(aliasHelper).join(', ')} } = ${VueBinding}\n`
      )
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
  if (ast.helpers.length) {
    push(
      `import { ${ast.helpers
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
  | string
  | symbol

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
