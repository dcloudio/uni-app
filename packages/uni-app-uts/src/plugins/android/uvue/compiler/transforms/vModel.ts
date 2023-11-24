import {
  transformModel as baseTransform,
  CompoundExpressionNode,
  DirectiveNode,
  DirectiveTransform,
  ElementTypes,
  isStaticExp,
  NodeTypes,
} from '@vue/compiler-core'
import { isString } from '@vue/shared'
import { createCompilerError } from '../errors'

const tags = ['input', 'textarea']

export const transformModel: DirectiveTransform = (dir, node, context) => {
  // 组件 v-model 绑定了复杂表达式，且没有手动 as 类型
  if (
    node.tagType === ElementTypes.COMPONENT &&
    (dir.exp as CompoundExpressionNode)?.children?.length > 1 &&
    !dir.loc.source.includes(' as ')
  ) {
    context.onError(
      createCompilerError(100, dir.loc, {
        100: `When custom components use "v-model" to bind complex expressions, you must specify the type using "as", 详见：https://uniapp.dcloud.net.cn/uni-app-x/component/#v-model-complex-expression`,
      })
    )
  }
  const result = baseTransform(dir, node, context)
  // 将 input,textarea 的 onUpdate:modelValue 事件转换为 onInput
  if (tags.includes(node.tag) && result.props.length >= 2) {
    handleInputEvent(result, dir)
  }
  handleUpdateExpression(result.props)
  return result
}

function handleInputEvent(result: any, dir: DirectiveNode) {
  const key = result.props[1].key
  let value = result.props[1].value
  if (value.type === NodeTypes.JS_CACHE_EXPRESSION) {
    value = value.value
  }
  if (
    isStaticExp(key) &&
    key.content === 'onUpdate:modelValue' &&
    value.type === NodeTypes.COMPOUND_EXPRESSION
  ) {
    key.content = getEventName(dir)
    // 调整函数类型及返回表达式，适配 uts
    value.children = value.children.map((child: any) => {
      if (isString(child)) {
        if (child === '$event => ((') {
          return `($event: ${getEventParamsType(dir)}): any => {`
        } else if (child === ') = $event)') {
          return ` = ${
            withNumber(dir) ? '_looseToNumber(' : ''
          }$event.detail.value${withTrim(dir) ? '.trim()' : ''}${
            withNumber(dir) ? ')' : ''
          };\nreturn ${
            withNumber(dir) ? '_looseToNumber(' : ''
          }$event.detail.value${withTrim(dir) ? '.trim()' : ''}${
            withNumber(dir) ? ')' : ''
          };}`
        }
      }
      return child
    })
  }
}

function getEventName(dir: DirectiveNode): string {
  return withLazy(dir) ? 'onBlur' : 'onInput'
}

function getEventParamsType(dir: DirectiveNode): string {
  return withLazy(dir) ? 'InputBlurEvent' : 'InputEvent'
}

function withLazy(dir: DirectiveNode): boolean {
  return dir.modifiers.includes('lazy')
}

function withNumber(dir: DirectiveNode): boolean {
  return dir.modifiers.includes('number')
}

function withTrim(dir: DirectiveNode): boolean {
  return dir.modifiers.includes('trim')
}

/*
  ["onUpdate:modelValue", $event => ((_ctx.modelValue1) = $event)] => ["onUpdate:modelValue", $event => { (_ctx.modelValue1) = $event }]
  ["onUpdate:modelValue", $event => ((_ctx.modelValue1 as string) = $event)] => ["onUpdate:modelValue", ($event: string) => { (_ctx.modelValue1) = $event }]
*/
function handleUpdateExpression(props: any[]) {
  let variableType = ''
  props.forEach((prop: any) => {
    if (prop.value.children) {
      for (let i = 0; i < prop.value.children.length; i++) {
        const child = prop.value.children[i]
        if (isString(child)) {
          if (child.includes('as ')) {
            variableType = child.split('as ')[1]
            if (variableType.endsWith(')')) {
              variableType = variableType.slice(0, -1)
              prop.value.children[i] = ')'
            } else {
              prop.value.children.splice(i, 1)
              i--
            }
          }
          if (child.includes('$event =>') && variableType) {
            prop.value.children[i] = child.replace(
              '$event',
              `($event: ${variableType})`
            )
          }
          if (child.includes('=> ((')) {
            prop.value.children[i] = prop.value.children[i].replace(
              '=> ((',
              '=> {('
            )
          }
          if (child.includes('= $event)')) {
            prop.value.children[i] = child.replace('= $event)', '= $event}')
          }
        }
      }
    }
  })
}
