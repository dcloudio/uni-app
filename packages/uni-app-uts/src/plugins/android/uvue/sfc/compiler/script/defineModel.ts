import type { LVal, Node, ObjectProperty, TSType } from '@babel/types'
import type { ScriptCompileContext } from './context'
import { inferRuntimeType } from './resolveType'
import {
  UNKNOWN_TYPE,
  concatStrings,
  isCallOf,
  toRuntimeTypeString,
  unwrapTSNode,
} from './utils'
import { BindingTypes } from '@vue/compiler-dom'
// import { warnOnce } from '../warn'

export const DEFINE_MODEL = 'defineModel'

export interface ModelDecl {
  type: TSType | undefined
  options: string | undefined
  identifier: string | undefined
}

const RUNTIME_TYPES: Record<string, string> = {
  Boolean: 'boolean',
  String: 'string',
  Number: 'number',
}

export function processDefineModel(
  ctx: ScriptCompileContext,
  node: Node,
  declId?: LVal
): boolean {
  if (!isCallOf(node, DEFINE_MODEL)) {
    return false
  }

  // if (!ctx.options.defineModel) {
  //   warnOnce(
  //     `defineModel() is an experimental feature and disabled by default.\n` +
  //       `To enable it, follow the RFC at https://github.com/vuejs/rfcs/discussions/503.`
  //   )
  //   return false
  // }

  // warnOnce(
  //   `This project is using defineModel(), which is an experimental ` +
  //     `feature. It may receive breaking changes or be removed in the future, so ` +
  //     `use at your own risk.\n` +
  //     `To stay updated, follow the RFC at https://github.com/vuejs/rfcs/discussions/503.`
  // )

  ctx.hasDefineModelCall = true

  const type =
    (node.typeParameters && node.typeParameters.params[0]) || undefined
  let modelName: string
  let options: Node | undefined
  const arg0 = node.arguments[0] && unwrapTSNode(node.arguments[0])
  if (arg0 && arg0.type === 'StringLiteral') {
    modelName = arg0.value
    options = node.arguments[1]
  } else {
    modelName = 'modelValue'
    options = arg0
  }

  if (ctx.modelDecls[modelName]) {
    ctx.error(`duplicate model name ${JSON.stringify(modelName)}`, node)
  }

  if (options) {
    if (options.type !== 'ObjectExpression') {
      ctx.error(`options must be an object expression`, options)
    }

    if (options.properties.find((p) => p.type === 'SpreadElement')) {
      ctx.error(`options does not support spread properties.`, options)
    }
  }

  const optionsString = options && ctx.getString(options)

  ctx.modelDecls[modelName] = {
    type,
    options: optionsString,
    identifier:
      declId && declId.type === 'Identifier' ? declId.name : undefined,
  }
  // register binding type
  ctx.bindingMetadata[modelName] = BindingTypes.PROPS

  const runtimeTypes = type && inferRuntimeType(ctx, type, 'defineModel')
  let runtimeType =
    runtimeTypes && runtimeTypes.length === 1 ? runtimeTypes[0] : undefined
  if (runtimeType) {
    runtimeType = RUNTIME_TYPES[runtimeType] || runtimeType
  }
  let runtimeOptions = ''
  if (options) {
    if (options.type === 'ObjectExpression') {
      if (!runtimeType) {
        // 未指定泛型，但指定了 options 中的 type
        const type = options.properties.find(
          (p) =>
            p.type === 'ObjectProperty' &&
            ((p.key.type === 'Identifier' && p.key.name === 'type') ||
              (p.key.type === 'StringLiteral' && p.key.value === 'type'))
        ) as ObjectProperty
        if (type) {
          if (type.value.type === 'TSAsExpression') {
            // Array as PropType<string[]>
            if (
              type.value.typeAnnotation.type === 'TSTypeReference' &&
              type.value.typeAnnotation.typeParameters
            ) {
              runtimeType = ctx.getString(
                type.value.typeAnnotation.typeParameters.params[0]
              )
            }
          } else {
            runtimeType = ctx.getString(type.value)
          }
        }
      }

      const local = options.properties.find(
        (p) =>
          p.type === 'ObjectProperty' &&
          ((p.key.type === 'Identifier' && p.key.name === 'local') ||
            (p.key.type === 'StringLiteral' && p.key.value === 'local'))
      ) as ObjectProperty

      if (local) {
        runtimeOptions = `{ ${ctx.getString(local)} }`
      } else {
        for (const p of options.properties) {
          if (p.type === 'SpreadElement' || p.computed) {
            runtimeOptions = optionsString!
            break
          }
        }
      }
    } else {
      runtimeOptions = optionsString!
    }
  }

  ctx.s.overwrite(
    ctx.startOffset! + node.start!,
    ctx.startOffset! + node.end!,
    `${ctx.helper('useModel')}<${
      runtimeType || 'any'
    }>(__ins.props, ${JSON.stringify(modelName)}${
      runtimeOptions ? `, ${runtimeOptions}` : ``
    })`
  )

  return true
}

export function genModelProps(ctx: ScriptCompileContext) {
  if (!ctx.hasDefineModelCall) return

  let modelPropsDecl = ''
  for (const [name, { type, options }] of Object.entries(ctx.modelDecls)) {
    let skipCheck = false

    let runtimeTypes = type && inferRuntimeType(ctx, type, 'defineProps')
    if (runtimeTypes) {
      const hasUnknownType = runtimeTypes.includes(UNKNOWN_TYPE)
      runtimeTypes = runtimeTypes.filter((el) => {
        if (el === UNKNOWN_TYPE) return false
        return true
      })
      skipCheck = hasUnknownType && runtimeTypes.length > 0
    }
    let runtimeType =
      (runtimeTypes &&
        runtimeTypes.length > 0 &&
        toRuntimeTypeString(runtimeTypes)) ||
      undefined

    const codegenOptions = concatStrings([
      runtimeType && `type: ${runtimeType}`,
      skipCheck && 'skipCheck: true',
    ])

    let decl: string
    if (runtimeType && options) {
      decl = `{ ${codegenOptions}, ...${options} }`
    } else {
      decl = options || (runtimeType ? `{ ${codegenOptions} }` : '{}')
    }
    modelPropsDecl += `\n    ${JSON.stringify(name)}: ${decl},`
  }
  return `{${modelPropsDecl}\n  }`
}
