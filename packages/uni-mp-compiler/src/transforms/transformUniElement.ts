import {
  type DirectiveNode,
  type ElementNode,
  type ExpressionNode,
  createCompoundExpression,
  findProp,
} from '@vue/compiler-core'
import {
  createAttributeNode,
  createBindDirectiveNode,
  isAttributeNode,
  isUserComponent,
} from '@dcloudio/uni-cli-shared'
import type { TransformContext } from '../transform'
import { SET_UNI_ELEMENT_ID, SET_UNI_ELEMENT_STYLE } from '../runtimeHelpers'
import {
  ATTR_ELEMENT_ID,
  ATTR_SET_ELEMENT_STYLE,
  FILTER_MODULE_FILE_NAME,
  FILTER_MODULE_NAME,
  FILTER_SET_ELEMENT_STYLE,
  filterName,
  filterObserverName,
} from './utils'
import { parseVForKeyAlias } from './transformSlot'
import { parseRefCode } from './transformRef'

export function rewriteId(node: ElementNode, context: TransformContext) {
  const isUniElement = !isUserComponent(node, context)
  if (isUniElement) {
    // 内置组件使用了 ref，没有 id 时，自动补充一个
    if (findProp(node, 'ref') && !findProp(node, 'id')) {
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
    }
  }
  const idProp = findProp(node, 'id')
  if (!idProp) {
    return
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
          ",'" + node.tag + "'",
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
          ",'" + node.tag + "'",
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
  const refProp = findProp(node, 'ref')
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
