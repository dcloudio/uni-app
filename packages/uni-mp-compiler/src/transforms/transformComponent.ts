import { camelize } from '@vue/shared'
import {
  type ComponentNode,
  type DirectiveNode,
  type ElementNode,
  NodeTypes,
  createSimpleExpression,
  isSimpleIdentifier,
  isStaticExp,
} from '@vue/compiler-core'
import {
  createAttributeNode,
  createBindDirectiveNode,
  isAttributeNode,
  isDirectiveNode,
  isUserComponent,
} from '@dcloudio/uni-cli-shared'
import {
  type NodeTransform,
  type TransformContext,
  isVForScope,
} from '../transform'
import {
  ATTR_COM_TYPE,
  ATTR_ELEMENT_ID,
  ATTR_SET_ELEMENT_ANIMATION,
  ATTR_SET_ELEMENT_STYLE,
  ATTR_VUE_ID,
  ATTR_VUE_PROPS,
  ATTR_VUE_REF,
  ATTR_VUE_REF_IN_FOR,
  ATTR_VUE_SLOTS,
  filterObserverName,
  rewirteWithHelper,
} from './utils'
import { genBabelExpr, genExpr } from '../codegen'
import {
  type Expression,
  type ObjectProperty,
  type SpreadElement,
  identifier,
  logicalExpression,
  objectExpression,
  objectProperty,
  spreadElement,
  stringLiteral,
} from '@babel/types'
import { RENDER_PROPS } from '../runtimeHelpers'
import { parseExpr } from '../ast'
import { isIfElementNode } from './vIf'

export const transformComponent: NodeTransform = (node, context) => {
  if (!isUserComponent(node, context as any)) {
    return
  }
  // 新版本的 vue，识别 template 有差异，可能认为是自定义组件
  if (node.tag === 'template') {
    return
  }
  addComponentType(node, context)

  addVueId(node, context)
  processBooleanAttr(node)
  return function postTransformComponent() {
    context.vueIds.pop()
  }
}

function addComponentType(node: ComponentNode, context: TransformContext) {
  if (!context.isMiniProgramComponent(node.tag)) {
    return
  }
  node.props.push(createAttributeNode(ATTR_COM_TYPE, 'm'))
}

function addVueId(node: ComponentNode, context: TransformContext) {
  let { hashId, scopes, currentScope, currentVueId } = context
  if (!hashId) {
    return
  }
  let vueId = hashId + '-' + scopes.vueId++
  const indexs: string[] = []
  while (currentScope) {
    if (isVForScope(currentScope)) {
      indexs.push(`+'-'+${currentScope.indexAlias}`)
    }
    currentScope = currentScope.parent!
  }
  const inFor = !!indexs.length
  if (inFor) {
    vueId = `'${vueId}'` + indexs.reverse().join('')
  }

  context.vueIds.push(vueId)

  let value = vueId
  if (currentVueId) {
    const isParentDynamic = currentVueId.includes('+')
    const isCurrentDynamic = vueId.includes('+')
    if (isParentDynamic || isCurrentDynamic) {
      value = `(${vueId})+','+(${
        isParentDynamic ? currentVueId : `'${currentVueId}'`
      })`
    } else {
      value = vueId + ',' + currentVueId
    }
  }
  if (value.includes('+')) {
    return node.props.push(createBindDirectiveNode(ATTR_VUE_ID, value))
  }
  return node.props.push(createAttributeNode(ATTR_VUE_ID, value))
}
/**
 * <uni-collapse accordion/> => <uni-collapse :accordion="true"/>
 * 否则部分平台(快手)可能获取到的 accordion 是空字符串
 * @param param0
 */
function processBooleanAttr({ props }: ComponentNode) {
  props.forEach((prop, index) => {
    if (
      prop.type === NodeTypes.ATTRIBUTE &&
      typeof prop.value === 'undefined'
    ) {
      props.splice(index, 1, createBindDirectiveNode(prop.name, 'true'))
    }
  })
}

const builtInProps = [
  // 'id',
  'class',
  'style',
  ATTR_VUE_ID,
  ATTR_VUE_PROPS,
  ATTR_VUE_SLOTS,
  ATTR_VUE_REF,
  ATTR_VUE_REF_IN_FOR,
  ATTR_COM_TYPE,
  ATTR_ELEMENT_ID,
  ATTR_SET_ELEMENT_STYLE,
  ATTR_SET_ELEMENT_ANIMATION,
  'eO',
  'e-o',
  'onVI',
  'ref',
  'slot',
  'key',
  'is',
]

function isComponentProp(name: string) {
  if (builtInProps.includes(name)) {
    return false
  }
  if (name.startsWith('data-')) {
    return false
  }
  if (name === filterObserverName(ATTR_SET_ELEMENT_STYLE)) {
    return false
  }
  if (name === filterObserverName(ATTR_SET_ELEMENT_ANIMATION)) {
    return false
  }
  return true
}
/**
 * 重写组件 props 绑定
 * @param node
 * @param context
 */
export function rewriteBinding(
  { tag, props }: ComponentNode,
  context: TransformContext
) {
  const isMiniProgramComponent = context.isMiniProgramComponent(tag)
  if (
    isMiniProgramComponent === 'plugin' ||
    isMiniProgramComponent === 'dynamicLib' ||
    isMiniProgramComponent === 'xr-frame' ||
    isMiniProgramComponent === 'ext'
  ) {
    // 因无法介入插件类型组件内部实现，故保留原始属性
    return
  }

  const createObjectProperty = isMiniProgramComponent
    ? (name: string, value: Expression) =>
        objectProperty(identifier(camelize(name)), value)
    : (name: string, value: Expression) => {
        const computed = !isSimpleIdentifier(name)
        return objectProperty(
          computed ? stringLiteral(name) : identifier(name),
          value,
          computed
        )
      }
  const properties: (ObjectProperty | SpreadElement)[] = []
  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    let isIdProp = false
    if (isAttributeNode(prop)) {
      const { name } = prop
      isIdProp = name === 'id'
      if (!isComponentProp(name)) {
        continue
      }
      properties.push(
        createObjectProperty(name, stringLiteral(prop.value?.content || ''))
      )
    } else if (isDirectiveNode(prop)) {
      if (prop.name !== 'bind') {
        continue
      }
      const { arg, exp } = prop
      if (!exp) {
        continue
      }
      if (!arg) {
        const spreadElement = createVBindSpreadElement(prop, context)
        if (spreadElement) {
          properties.push(spreadElement)
        }
      } else if (isStaticExp(arg)) {
        isIdProp = arg.content === 'id'
        if (!isComponentProp(arg.content)) {
          continue
        }
        // :name="name"
        const valueExpr = parseExpr(genExpr(exp), context, exp)
        if (!valueExpr) {
          continue
        }
        properties.push(createObjectProperty(arg.content, valueExpr))
      } else {
        // :[dynamic]="dynamic"
        const leftExpr = parseExpr(genExpr(arg), context, exp)
        if (!leftExpr) {
          continue
        }
        const valueExpr = parseExpr(genExpr(exp), context, exp)
        if (!valueExpr) {
          continue
        }
        properties.push(
          objectProperty(
            logicalExpression('||', leftExpr, stringLiteral('')),
            valueExpr,
            true
          )
        )
      }
    }
    // 即保留 id 属性，又补充到 props 中
    if (!isIdProp) {
      props.splice(i, 1)
      i--
    }
  }

  if (properties.length) {
    props.push(
      createBindDirectiveNode(
        ATTR_VUE_PROPS,
        genBabelExpr(objectExpression(properties))
      )
    )
  }
}

function createVBindSpreadElement(
  prop: DirectiveNode,
  context: TransformContext
) {
  const { arg, exp } = prop
  if (!exp) {
    return
  }
  if (!arg) {
    const argument = parseExpr(genExpr(exp), context, exp)
    if (!argument) {
      return
    }
    return spreadElement(argument)
  }
}

export function isPropsBinding({ arg }: DirectiveNode) {
  return (
    arg &&
    arg.type === NodeTypes.SIMPLE_EXPRESSION &&
    arg.content === ATTR_VUE_PROPS
  )
}

export function rewritePropsBinding(
  dir: DirectiveNode,
  node: ElementNode,
  context: TransformContext
) {
  dir.exp = createSimpleExpression(
    genBabelExpr(
      rewirteWithHelper(
        RENDER_PROPS,
        parseExpr(dir.exp!, context)!,
        dir.loc,
        context
      )!
    ) +
      ((isIfElementNode(node) && node.vIf.name === 'else') ||
      context.miniProgram.component?.getPropertySync
        ? `||''`
        : '')
  )
}
