import { EMPTY_OBJ, NOOP, extend, hasOwn, isArray, isString } from '@vue/shared'

import {
  type ArrowFunctionExpression,
  type BlockStatement,
  type ConditionalExpression,
  type Identifier,
  type ObjectExpression,
  type ObjectProperty,
  type ReturnStatement,
  type SpreadElement,
  callExpression,
  identifier,
  isCallExpression,
  isConditionalExpression,
  isIdentifier,
  isObjectExpression,
  isObjectProperty,
  isSpreadElement,
  objectExpression,
  spreadElement,
} from '@babel/types'
import {
  type CacheExpression,
  type CompilerError,
  type DirectiveNode,
  type ElementNode,
  type ExpressionNode,
  type JSChildNode,
  NodeTypes,
  type ParentNode,
  type Property,
  type RootNode,
  TO_DISPLAY_STRING,
  type TemplateChildNode,
  helperNameMap,
  locStub,
} from '@vue/compiler-core'
import { findMiniProgramUsingComponents } from '@dcloudio/uni-cli-shared'
import type { MiniProgramComponentsType } from '@dcloudio/uni-cli-shared'
import IdentifierGenerator from './identifier'
import type {
  CodegenRootNode,
  CodegenRootScope,
  CodegenScope,
  CodegenVForScope,
  CodegenVForScopeInit,
  CodegenVIfScope,
  CodegenVIfScopeInit,
  TransformOptions,
} from './options'
import { EXTEND } from './runtimeHelpers'
import { createObjectExpression } from './ast'
import { SCOPED_SLOT_IDENTIFIER } from './transforms/utils'
import { genBabelExpr } from './codegen'

export interface ImportItem {
  exp: string | ExpressionNode
  path: string
}

export type NodeTransform = (
  node: RootNode | TemplateChildNode,
  context: TransformContext
) => void | (() => void) | (() => void)[]

export type DirectiveTransform = (
  dir: DirectiveNode,
  node: ElementNode,
  context: TransformContext,
  augmentor?: (ret: DirectiveTransformResult) => DirectiveTransformResult
) => DirectiveTransformResult

interface DirectiveTransformResult {
  props: Property[]
  needRuntime?: boolean | symbol
}

export interface ErrorHandlingOptions {
  onWarn?: (warning: CompilerError) => void
  onError?: (error: CompilerError) => void
}

export const enum BindingComponentTypes {
  SELF = 'self',
  SETUP = 'setup',
  UNKNOWN = 'unknown',
}
export interface TransformContext
  extends Required<Omit<TransformOptions, 'filename' | 'root'>> {
  selfName: string | null
  currentNode: RootNode | TemplateChildNode | null
  parent: ParentNode | null
  childIndex: number
  helpers: Map<symbol, number>
  components: Set<string>
  imports: ImportItem[]
  bindingComponents: Record<
    string,
    { type: BindingComponentTypes; name: string }
  >
  identifiers: { [name: string]: number | undefined }
  cached: number
  scopes: {
    vFor: number
    vueId: number
  }
  scope: CodegenRootScope
  currentScope: CodegenScope
  currentVueId: string
  vueIds: string[]
  inVOnce: boolean
  inVFor: boolean
  helper<T extends symbol>(name: T): T
  removeHelper<T extends symbol>(name: T): void
  helperString(name: symbol): string
  replaceNode(node: TemplateChildNode): void
  removeNode(node?: TemplateChildNode): void
  onNodeRemoved(): void
  addIdentifiers(exp: ExpressionNode | string): void
  removeIdentifiers(exp: ExpressionNode | string): void
  popScope(): CodegenScope | undefined
  getScopeIndex(scope: CodegenScope): number
  addVIfScope(initScope: CodegenVIfScopeInit): CodegenVIfScope
  addVForScope(initScope: CodegenVForScopeInit): CodegenVForScope
  cache<T extends JSChildNode>(exp: T, isVNode?: boolean): CacheExpression | T
  isMiniProgramComponent(name: string): MiniProgramComponentsType | undefined
  rootNode: TemplateChildNode | null
}

export function isRootScope(scope: CodegenScope): scope is CodegenRootScope {
  return !isVIfScope(scope) && !isVForScope(scope)
}

export function isVIfScope(scope: CodegenScope): scope is CodegenVIfScope {
  return (
    !!(scope as CodegenVIfScope).condition ||
    (scope as CodegenVIfScope).name === 'else'
  )
}

export function isVForScope(scope: CodegenScope): scope is CodegenVForScope {
  return !!(scope as CodegenVForScope).source
}

export function isScopedSlotVFor({ source }: CodegenVForScope) {
  if (source.type !== NodeTypes.COMPOUND_EXPRESSION) {
    return false
  }
  const first = source.children[0] as ExpressionNode
  return (
    first.type === NodeTypes.SIMPLE_EXPRESSION &&
    first.content.includes(SCOPED_SLOT_IDENTIFIER)
  )
}

export function transform(root: CodegenRootNode, options: TransformOptions) {
  const context = createTransformContext(root, options)
  findRootNode(root, context)
  traverseNode(root, context)
  root.renderData = createRenderDataExpr(context.scope.properties, context)
  // finalize meta information
  root.helpers = new Set([...context.helpers.keys()])
  root.components = [...context.components]
  root.imports = context.imports
  root.cached = context.cached
  return context
}

function findRootNode(root: RootNode, context: TransformContext) {
  const children = root.children.filter(
    (node) => node.type === NodeTypes.ELEMENT && node.tag !== 'template'
  )
  if (children.length === 1) {
    context.rootNode = children[0]
  }
}

export function traverseNode(
  node: RootNode | TemplateChildNode,
  context: TransformContext
) {
  context.currentNode = node
  // apply transform plugins
  const { nodeTransforms } = context
  const exitFns: Array<() => void> = []
  for (let i = 0; i < nodeTransforms.length; i++) {
    const onExit = nodeTransforms[i](node, context as any)
    if (onExit) {
      if (isArray(onExit)) {
        exitFns.push(...onExit)
      } else {
        exitFns.push(onExit)
      }
    }
    if (!context.currentNode) {
      // node was removed
      return
    } else {
      // node may have been replaced
      node = context.currentNode
    }
  }

  switch (node.type) {
    case NodeTypes.COMMENT:
      // context.helper(CREATE_COMMENT)
      break
    case NodeTypes.INTERPOLATION:
      context.helper(TO_DISPLAY_STRING)
      break
    // for container types, further traverse downwards
    case NodeTypes.IF:
      for (let i = 0; i < node.branches.length; i++) {
        traverseNode(node.branches[i], context)
      }
      break
    case NodeTypes.IF_BRANCH:
    case NodeTypes.FOR:
    case NodeTypes.ELEMENT:
    case NodeTypes.ROOT:
      traverseChildren(node, context)
      break
  }

  // exit transforms
  context.currentNode = node
  let i = exitFns.length
  while (i--) {
    exitFns[i]()
  }
}

export function traverseChildren(
  parent: ParentNode,
  context: TransformContext
) {
  let i = 0
  const nodeRemoved = () => {
    i--
  }
  for (; i < parent.children.length; i++) {
    const child = parent.children[i]
    if (isString(child)) continue
    context.parent = parent
    context.childIndex = i
    context.onNodeRemoved = nodeRemoved
    traverseNode(child, context)
  }
}
function defaultOnError(error: CompilerError) {
  throw error
}

function defaultOnWarn(msg: CompilerError) {
  console.warn(`[Vue warn] ${msg.message}`)
}

export function createTransformContext(
  rootNode: RootNode,
  {
    root = '',
    filename = '',
    isTS = false,
    inline = false,
    hashId = null,
    scopeId = null,
    filters = [],
    bindingCssVars = [],
    bindingMetadata = EMPTY_OBJ,
    cacheHandlers = false,
    prefixIdentifiers = false,
    skipTransformIdentifier = false,
    renderDataSpread = false,
    nodeTransforms = [],
    directiveTransforms = {},
    miniProgram = {
      class: {
        array: true,
      },
      slot: {
        fallbackContent: false,
        dynamicSlotNames: true,
      },
      directive: '',
    },
    isBuiltInComponent = NOOP,
    isCustomElement = NOOP,
    expressionPlugins = [],
    onError = defaultOnError,
    onWarn = defaultOnWarn,
  }: TransformOptions
): TransformContext {
  const rootScope: CodegenRootScope = {
    id: new IdentifierGenerator(),
    identifiers: [],
    properties: [],
    parent: null,
  }

  function findVIfParentScope(): CodegenVForScope | CodegenRootScope {
    for (let i = scopes.length - 1; i >= 0; i--) {
      const scope = scopes[i]
      if (isVForScope(scope) || isRootScope(scope)) {
        return scope
      }
    }
    return rootScope
  }

  function createScope(
    id: IdentifierGenerator,
    initScope: CodegenVIfScopeInit | CodegenVForScopeInit
  ) {
    return extend(
      {
        id,
        properties: [],
        parent: scopes[scopes.length - 1],
        get identifiers() {
          return Object.keys(identifiers)
        },
      },
      initScope
    )
  }

  const vueIds: string[] = []
  const identifiers = Object.create(null)
  const scopes: CodegenScope[] = [rootScope]

  const miniProgramComponents = findMiniProgramUsingComponents({
    filename,
    componentsDir: miniProgram.component?.dir,
    inputDir: root,
  })
  // const nameMatch = filename.replace(/\?.*$/, '').match(/([^/\\]+)\.\w+$/)
  const context: TransformContext = {
    // options
    // 暂不提供根据文件名生成递归组件
    selfName: '', //nameMatch && capitalize(camelize(nameMatch[1])),
    miniProgram,
    isTS,
    inline,
    hashId,
    scopeId,
    filters,
    bindingCssVars,
    bindingMetadata,
    cacheHandlers,
    prefixIdentifiers,
    nodeTransforms,
    directiveTransforms,
    expressionPlugins,
    skipTransformIdentifier,
    renderDataSpread,
    isBuiltInComponent,
    isCustomElement,
    onError,
    onWarn,
    // state
    parent: null,
    childIndex: 0,
    helpers: new Map(),
    components: new Set(),
    imports: [],
    bindingComponents: Object.create(null),
    cached: 0,
    identifiers,
    scope: rootScope,
    scopes: {
      vFor: 0,
      vueId: 0,
    },
    get currentScope() {
      return scopes[scopes.length - 1]
    },
    currentNode: rootNode,
    vueIds,
    get currentVueId() {
      return vueIds[vueIds.length - 1]
    },
    inVOnce: false,
    get inVFor() {
      let parent: CodegenScope | null = scopes[scopes.length - 1]
      while (parent) {
        if (isVForScope(parent) && !isScopedSlotVFor(parent)) {
          return true
        }
        parent = parent.parent
      }
      return false
    },
    // methods
    getScopeIndex(scope: CodegenScope) {
      return scopes.indexOf(scope)
    },
    popScope() {
      return scopes.pop()
    },
    addVIfScope(initScope) {
      const vIfScope = createScope(
        scopes[scopes.length - 1].id,
        extend(initScope, { parentScope: findVIfParentScope() })
      ) as unknown as CodegenVIfScope
      scopes.push(vIfScope)
      return vIfScope
    },
    addVForScope(initScope) {
      const vForScope = createScope(
        new IdentifierGenerator(),
        initScope
      ) as CodegenVForScope
      scopes.push(vForScope)
      return vForScope
    },
    helper(name) {
      const count = context.helpers.get(name) || 0
      context.helpers.set(name, count + 1)
      return name
    },
    removeHelper(name) {
      const count = context.helpers.get(name)
      if (count) {
        const currentCount = count - 1
        if (!currentCount) {
          context.helpers.delete(name)
        } else {
          context.helpers.set(name, currentCount)
        }
      }
    },
    helperString(name) {
      return `_${helperNameMap[context.helper(name)]}`
    },
    replaceNode(node) {
      context.parent!.children[context.childIndex] = context.currentNode = node
    },
    removeNode(node) {
      if (!context.parent) {
        throw new Error(`Cannot remove root node.`)
      }
      const list = context.parent!.children
      const removalIndex = node
        ? list.indexOf(node)
        : context.currentNode
        ? context.childIndex
        : -1
      /* istanbul ignore if */
      if (removalIndex < 0) {
        throw new Error(`node being removed is not a child of current parent`)
      }
      if (!node || node === context.currentNode) {
        // current node removed
        context.currentNode = null
        context.onNodeRemoved()
      } else {
        // sibling node removed
        if (context.childIndex > removalIndex) {
          context.childIndex--
          context.onNodeRemoved()
        }
      }
      context.parent!.children.splice(removalIndex, 1)
    },
    onNodeRemoved: () => {},
    addIdentifiers(exp) {
      if (isString(exp)) {
        addId(exp)
      } else if (exp.identifiers) {
        exp.identifiers.forEach(addId)
      } else if (exp.type === NodeTypes.SIMPLE_EXPRESSION) {
        addId(exp.content)
      }
    },
    removeIdentifiers(exp) {
      if (isString(exp)) {
        removeId(exp)
      } else if (exp.identifiers) {
        exp.identifiers.forEach(removeId)
      } else if (exp.type === NodeTypes.SIMPLE_EXPRESSION) {
        removeId(exp.content)
      }
    },
    cache(exp, isVNode = false) {
      return createCacheExpression(context.cached++, exp, isVNode)
    },
    isMiniProgramComponent(name) {
      return miniProgramComponents[name]
    },
    rootNode: null,
  }

  function addId(id: string) {
    const { identifiers } = context
    if (identifiers[id] === undefined) {
      identifiers[id] = 0
    }
    identifiers[id]!++
  }

  function removeId(id: string) {
    context.identifiers[id]!--
  }

  return context
}

function createCacheExpression(
  index: number,
  value: JSChildNode,
  isVNode: boolean = false
): CacheExpression {
  return {
    type: NodeTypes.JS_CACHE_EXPRESSION,
    index,
    value,
    isVNode,
    loc: locStub,
  }
}

export declare type StructuralDirectiveTransform = (
  node: ElementNode,
  dir: DirectiveNode,
  context: TransformContext
) => void | (() => void)

export function createStructuralDirectiveTransform(
  name: string | RegExp,
  fn: StructuralDirectiveTransform
): NodeTransform {
  const matches = isString(name)
    ? (n: string) => n === name
    : (n: string) => name.test(n)

  return (node, context) => {
    if (node.type === NodeTypes.ELEMENT) {
      const { props } = node
      // structural directive transforms are not concerned with slots
      // as they are handled separately in vSlot.ts
      // if (node.tagType === ElementTypes.TEMPLATE && props.some(isVSlot)) {
      //   return
      // }
      const exitFns: Array<() => void> = []
      for (let i = 0; i < props.length; i++) {
        const prop = props[i]
        if (prop.type === NodeTypes.DIRECTIVE && matches(prop.name)) {
          // structural directives are removed to avoid infinite recursion
          // also we remove them *before* applying so that it can further
          // traverse itself in case it moves the node around
          props.splice(i, 1)
          i--
          const onExit = fn(node, prop, context)
          if (onExit) exitFns.push(onExit)
        }
      }
      return exitFns
    }
  }
}

function createRenderDataExpr(
  properties: (ObjectProperty | SpreadElement)[],
  context: TransformContext
) {
  const objExpr = createObjectExpression(properties)
  if (!hasSpreadElement(objExpr)) {
    return objExpr
  }
  // filters: ['test']
  // v-if="text.aa()"
  if (context.filters.length) {
    transformFilterObjectSpreadExpr(objExpr, context)
  }
  if (context.renderDataSpread) {
    return objExpr
  }
  return transformObjectSpreadExpr(objExpr, context)
}

function hasSpreadElement(expr: ObjectExpression): boolean {
  return expr.properties.some((prop) => {
    if (isSpreadElement(prop)) {
      return true
    } else {
      const returnStatement = parseReturnStatement(prop as ObjectProperty)
      if (returnStatement) {
        return hasSpreadElement(returnStatement.argument as ObjectExpression)
      }
    }
  })
}

// 目前硬编码识别 _f,应该读取 context.helperString
const returnObjExprMap = {
  _f: 1, // _f(_ctx.items,()=>{return {}})
  _w: 0, // _w(()=>{return {}})
}

function parseReturnStatement(prop: ObjectProperty) {
  if (
    isObjectProperty(prop) &&
    isCallExpression(prop.value) &&
    isIdentifier(prop.value.callee)
  ) {
    const { name } = prop.value.callee as Identifier
    if (hasOwn(returnObjExprMap, name)) {
      return (
        (
          prop.value.arguments[
            returnObjExprMap[name]
          ] as ArrowFunctionExpression
        ).body as BlockStatement
      ).body[0] as ReturnStatement
    }
  }
}

function transformObjectPropertyExpr(
  prop: ObjectProperty,
  context: TransformContext
) {
  // vFor,withScopedSlot
  const returnStatement = parseReturnStatement(prop)
  if (returnStatement) {
    const objExpr = returnStatement.argument as ObjectExpression
    if (hasSpreadElement(objExpr)) {
      returnStatement.argument = transformObjectSpreadExpr(objExpr, context)
    }
  }
  return prop
}

function transformObjectSpreadExpr(
  objExpr: ObjectExpression,
  context: TransformContext
) {
  const properties = objExpr.properties as (ObjectProperty | SpreadElement)[]
  const args: (ObjectExpression | ConditionalExpression)[] = []
  let objExprProperties: ObjectProperty[] = []
  properties.forEach((prop) => {
    if (isObjectProperty(prop)) {
      objExprProperties.push(transformObjectPropertyExpr(prop, context))
    } else {
      if (objExprProperties.length) {
        args.push(objectExpression(objExprProperties))
      }
      args.push(
        transformConditionalExpression(
          prop.argument as ConditionalExpression,
          context
        )
      )
      objExprProperties = []
    }
  })
  if (objExprProperties.length) {
    args.push(objectExpression(objExprProperties))
  }
  if (args.length === 1) {
    return args[0] as ObjectExpression
  }
  return callExpression(identifier(context.helperString(EXTEND)), args)
}
function transformConditionalExpression(
  expr: ConditionalExpression,
  context: TransformContext
) {
  const { consequent, alternate } = expr
  if (isObjectExpression(consequent) && hasSpreadElement(consequent)) {
    expr.consequent = transformObjectSpreadExpr(consequent, context)
  }
  if (isObjectExpression(alternate)) {
    if (hasSpreadElement(alternate)) {
      expr.alternate = transformObjectSpreadExpr(alternate, context)
    }
  } else if (isConditionalExpression(alternate)) {
    transformConditionalExpression(alternate, context)
  }
  return expr
}

function transformFilterObjectSpreadExpr(
  objExpr: ObjectExpression,
  context: TransformContext
) {
  const properties = objExpr.properties as (ObjectProperty | SpreadElement)[]
  properties.forEach((prop) => {
    if (isObjectProperty(prop)) {
      transformFilterObjectPropertyExpr(prop, context)
    } else {
      prop.argument = transformFilterConditionalExpression(
        prop.argument as ConditionalExpression,
        context
      )
    }
  })
}

function transformFilterObjectPropertyExpr(
  prop: ObjectProperty,
  context: TransformContext
) {
  // vFor, withScopedSlot
  const returnStatement = parseReturnStatement(prop)
  if (returnStatement) {
    const objExpr = returnStatement.argument as ObjectExpression
    if (hasSpreadElement(objExpr)) {
      transformFilterObjectSpreadExpr(objExpr, context)
    }
  }
}
function transformFilterConditionalExpression(
  expr: ConditionalExpression,
  context: TransformContext
) {
  const { test, consequent, alternate } = expr
  if (isObjectExpression(consequent) && hasSpreadElement(consequent)) {
    transformFilterObjectSpreadExpr(consequent, context)
  }
  if (isObjectExpression(alternate)) {
    if (hasSpreadElement(alternate)) {
      transformFilterObjectSpreadExpr(alternate, context)
    }
  } else if (isConditionalExpression(alternate)) {
    expr.alternate = transformFilterConditionalExpression(alternate, context)
  }
  const testCode = genBabelExpr(test)
  // filter test
  if (context.filters.find((filter) => testCode.includes(filter + '.'))) {
    // test.aa() ? {a:1} : {b:2} => {...{a:1},...{b:2}}
    const properties: SpreadElement[] = []
    if (!isObjectExpression(consequent) || consequent.properties.length) {
      properties.push(spreadElement(consequent))
    }
    if (
      !isObjectExpression(expr.alternate) ||
      expr.alternate.properties.length
    ) {
      properties.push(spreadElement(expr.alternate))
    }
    return objectExpression(properties)
  }
  return expr
}
