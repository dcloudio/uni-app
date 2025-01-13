import {
  type DirectiveNode,
  type ElementNode,
  type ExpressionNode,
  createCompoundExpression,
  createSimpleExpression,
  findProp,
} from '@vue/compiler-core'
import {
  createAttributeNode,
  createBindDirectiveNode,
  isAttributeNode,
  isDirectiveNode,
  isUserComponent,
} from '@dcloudio/uni-cli-shared'
import type { TransformContext } from '../transform'
import {
  GEN_UNI_ELEMENT_ID,
  SET_UNI_ELEMENT_ID,
  SET_UNI_ELEMENT_STYLE,
} from '../runtimeHelpers'
import {
  ATTR_ELEMENT_ID,
  ATTR_ELEMENT_TAG,
  ATTR_SET_ELEMENT_STYLE,
  ATTR_VUE_REF,
  FILTER_MODULE_FILE_NAME,
  FILTER_MODULE_NAME,
  FILTER_SET_ELEMENT_STYLE,
  filterName,
  filterObserverName,
} from './utils'
import { parseVForKeyAlias } from './transformSlot'
import { parseRefCode } from './transformRef'
import { SetUniElementIdTagType } from '@dcloudio/uni-shared'
import { isString } from '@vue/shared'
import {
  type Expression,
  binaryExpression,
  conditionalExpression,
  isCallExpression,
  isIdentifier,
  stringLiteral,
} from '@babel/types'
import { parseExpr } from '../ast'
import { genBabelExpr } from '../codegen'

const builtInCustomElements = ['uni-cloud-db-element']
const builtInComponents = ['unicloud-db']

export function rewriteId(node: ElementNode, context: TransformContext) {
  const isUniElement = !isUserComponent(node, context)
  const origTagName = node.tag
  const isBuiltInComponent =
    !isUniElement && builtInComponents.includes(origTagName)
  const userComponent = !(isUniElement || isBuiltInComponent)
  if (userComponent) {
    // TODO 目前不对用户的自定义组件支持 id 查询 UniElement
    // 后续要做的话，需要考虑自定义组件内部的单节点或多节点
    return
  }

  const isBuiltInCustomElement = builtInCustomElements.includes(origTagName)

  if (isUniElement) {
    // 将内置的自定义元素转换为 view
    if (isBuiltInCustomElement) {
      node.props.unshift(createAttributeNode(ATTR_ELEMENT_TAG, origTagName))
      node.tag = 'view'
    }
  }

  // 内置组件使用了 ref，没有 id 时，自动补充一个
  const refProp = findProp(node, ATTR_VUE_REF) || findProp(node, 'ref')
  let idProp = findProp(node, 'id')
  if (refProp && !idProp) {
    if (context.inVFor) {
      // v-for 中的 ref 需要使用 v-for 的 key 作为 id
      const keyAlias = parseVForKeyAlias(context)
      // 微信小程序元素id必须以字母开头，所以hashId不能放到前边，它可能是数字开头
      const id = 'r' + context.elementRefIndex++ + '-' + context.hashId + '-'
      node.props.push(
        createBindDirectiveNode(
          'id',
          createCompoundExpression([`'${id}'+`, keyAlias.join(`+'-'+`)])
        )
      )
    } else {
      const id = 'r' + context.elementRefIndex++ + '-' + context.hashId
      node.props.push(createAttributeNode('id', id))
    }
  } else if (refProp && idProp && isDirectiveNode(idProp)) {
    // ref 和 id 都存在，且 id 是动态绑定的, 但是可能为空字符串。比如virtualHost绑定的id
    const idPropIndex = node.props.indexOf(idProp)
    node.props.splice(idPropIndex, 1)
    if (idProp.exp) {
      let idBindingExpr = parseExpr(idProp.exp, context)! as Expression
      let genId = ''
      if (context.inVFor) {
        // v-for 中的 ref 需要使用 v-for 的 key 作为 id
        const keyAlias = parseVForKeyAlias(context)
        // 微信小程序元素id必须以字母开头，所以hashId不能放到前边，它可能是数字开头
        genId =
          'r' +
          context.elementRefIndex++ +
          '-' +
          context.hashId +
          '-' +
          keyAlias.join('-')
      } else {
        genId = 'r' + context.elementRefIndex++ + '-' + context.hashId
      }

      // TODO context.helperString能否避免调用?
      if (
        isCallExpression(idBindingExpr) &&
        isIdentifier(idBindingExpr.callee) &&
        idBindingExpr.callee.name === context.helperString(GEN_UNI_ELEMENT_ID)
      ) {
        // 如果调用的是genUniElementId，则直接传入自动生成的id作为第三个参数。此特性用于减小生成代码体积
        idBindingExpr.arguments.push(stringLiteral(genId))
      } else {
        idBindingExpr = conditionalExpression(
          binaryExpression('!==', idBindingExpr, stringLiteral('')),
          idBindingExpr,
          stringLiteral(genId)
        )
      }
      node.props.push(
        createBindDirectiveNode(
          'id',
          createSimpleExpression(genBabelExpr(idBindingExpr))
        )
      )
    }
  }

  idProp = findProp(node, 'id')
  if (!idProp) {
    return
  }
  let idOptions:
    | {
        name: string
        type?: SetUniElementIdTagType
      }
    | string = origTagName
  if (isBuiltInComponent || isBuiltInCustomElement) {
    idOptions = {
      name: origTagName,
      type: isBuiltInComponent
        ? SetUniElementIdTagType.BuiltInComponent
        : SetUniElementIdTagType.BuiltInRootElement,
    }
  }

  let idExprNode: string | ExpressionNode | undefined
  // id="test" => :id="setUniElementId('test')"
  // 目前标签名有隐患，可能传入的是自定义组件名称
  if (isAttributeNode(idProp)) {
    if (!idProp.value) {
      return
    }
    idExprNode = `'${idProp.value.content}'`
    node.props.push(
      createBindDirectiveNode(
        ATTR_ELEMENT_ID,
        createCompoundExpression([
          context.helperString(SET_UNI_ELEMENT_ID) + '(',
          idExprNode,
          ',',
          isString(idOptions) ? `'${idOptions}'` : JSON.stringify(idOptions),
          parseUniElementRefCode(node, context),
          ')',
        ])
      )
    )
  } else if (idProp.exp) {
    idExprNode = idProp.exp
    const idPropIndex = node.props.indexOf(idProp)
    // :id="a" => :id="setUniElementId(a)"
    node.props.splice(
      idPropIndex,
      1,
      createBindDirectiveNode(
        'id',
        createCompoundExpression([
          context.helperString(SET_UNI_ELEMENT_ID) + '(',
          idExprNode,
          ',',
          isString(idOptions) ? `'${idOptions}'` : JSON.stringify(idOptions),
          parseUniElementRefCode(node, context),
          ')',
        ])
      )
    )
  }

  if (context.miniProgram.filter?.setStyle) {
    // 支持通过filter来设置style
    node.props.push(
      createBindDirectiveNode(
        filterObserverName(ATTR_SET_ELEMENT_STYLE),
        filterName(FILTER_SET_ELEMENT_STYLE)
      )
    )
    node.props.push(createBindDirectiveNode(ATTR_SET_ELEMENT_STYLE, ''))
    if (
      !context.autoImportFilters.find(
        (filter) => filter.name === FILTER_MODULE_NAME
      )
    ) {
      context.autoImportFilters.push({
        name: FILTER_MODULE_NAME,
        id: FILTER_MODULE_FILE_NAME,
        type: 'filter',
      })
    }
  } else {
    // 如果没有动态绑定 style，则创建一个新的
    const styleProp = findProp(node, 'style', true, true) as
      | DirectiveNode
      | undefined
    if (!styleProp) {
      node.props.push(
        createBindDirectiveNode(
          'style',
          createCompoundExpression([
            context.helperString(SET_UNI_ELEMENT_STYLE) + '(',
            idExprNode!,
            ')',
          ])
        )
      )
    } else {
      // 传递已绑定的 style
      styleProp.exp = createCompoundExpression([
        context.helperString(SET_UNI_ELEMENT_STYLE) + '(',
        idExprNode!,
        ',',
        styleProp.exp!,
        ')',
      ])
    }
  }
}

function parseUniElementRefCode(node: ElementNode, context: TransformContext) {
  const refProp = findProp(node, ATTR_VUE_REF) || findProp(node, 'ref')
  if (!refProp) {
    return ''
  }
  const { code, refKey } = parseRefCode(refProp, context)
  const opts: Record<string, unknown> = {}
  if (refKey) {
    opts.k = refKey
  }
  if (context.inVFor) {
    opts.f = 1
  }
  const children = [',', code]
  if (Object.keys(opts).length) {
    children.push(',', JSON.stringify(opts))
  }
  return createCompoundExpression(children)
}
