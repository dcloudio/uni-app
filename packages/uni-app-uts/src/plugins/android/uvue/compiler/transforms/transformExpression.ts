// - Parse expressions in templates into compound expressions so that each
//   identifier gets more accurate source-map locations.
//
// - Prefix identifiers with `_ctx.` or `$xxx` (for known binding types) so that
//   they are accessed from the right source
//
// - This transform is only applied in non-browser builds because it relies on
//   an additional JavaScript parser. In the browser, there is no source-map
//   support and the code is wrapped in `with (this) { ... }`.
import type { NodeTransform, TransformContext } from '../transform'

import { hasOwn, isArray, isString, makeMap } from '@vue/shared'

import { isGloballyAllowed } from '@dcloudio/uni-shared'

import type {
  AssignmentExpression,
  Identifier,
  Node,
  UpdateExpression,
} from '@babel/types'

import { parse } from '@babel/parser'
import {
  BindingTypes,
  type CompoundExpressionNode,
  ConstantTypes,
  type ExpressionNode,
  IS_REF,
  NodeTypes,
  type SimpleExpressionNode,
  UNREF,
  advancePositionWithClone,
  createCompoundExpression,
  createSimpleExpression,
  isInDestructureAssignment,
  isSimpleIdentifier,
  isStaticProperty,
  isStaticPropertyKey,
  walkIdentifiers,
} from '@vue/compiler-core'

import { ErrorCodes, createCompilerError } from '../errors'
import { TRY_SET_REF_VALUE, TRY_UPDATE_REF_NUMBER } from '../runtimeHelpers'

const isLiteralWhitelisted = /*#__PURE__*/ makeMap('true,false,null,this')

// a heuristic safeguard to bail constant expressions on presence of
// likely function invocation and member access
const constantBailRE = /\w\s*\(|\.[^\d]/

export const transformExpression: NodeTransform = (node, context) => {
  if (node.type === NodeTypes.INTERPOLATION) {
    node.content = processExpression(
      node.content as SimpleExpressionNode,
      context
    )
  } else if (node.type === NodeTypes.ELEMENT) {
    // handle directives on element
    for (let i = 0; i < node.props.length; i++) {
      const dir = node.props[i]
      // do not process for v-on & v-for since they are special handled
      if (dir.type === NodeTypes.DIRECTIVE && dir.name !== 'for') {
        const exp = dir.exp
        const arg = dir.arg
        // do not process exp if this is v-on:arg - we need special handling
        // for wrapping inline statements.
        if (
          exp &&
          exp.type === NodeTypes.SIMPLE_EXPRESSION &&
          !(dir.name === 'on' && arg)
        ) {
          dir.exp = processExpression(
            exp,
            context,
            // slot args must be processed as function params
            dir.name === 'slot'
          )
        }
        if (arg && arg.type === NodeTypes.SIMPLE_EXPRESSION && !arg.isStatic) {
          dir.arg = processExpression(arg, context)
        }
      }
    }
  }
}

interface PrefixMeta {
  prefix?: string
  isConstant: boolean
  start: number
  end: number
  scopeIds?: Set<string>
}

// Important: since this function uses Node.js only dependencies, it should
// always be used with a leading !__BROWSER__ check so that it can be
// tree-shaken from the browser build.
export function processExpression(
  node: SimpleExpressionNode,
  context: TransformContext,
  // some expressions like v-slot props & v-for aliases should be parsed as
  // function params
  asParams = false,
  // v-on handler values may contain multiple statements
  asRawStatements = false,
  localVars: Record<string, number> = Object.create(context.identifiers)
): ExpressionNode {
  if (!context.prefixIdentifiers || !node.content.trim()) {
    return node
  }

  const { inline, bindingMetadata } = context
  const rewriteIdentifier = (raw: string, parent?: Node, id?: Identifier) => {
    const type = hasOwn(bindingMetadata, raw) && bindingMetadata[raw]
    if (inline) {
      // x = y
      const isAssignmentLVal =
        parent && parent.type === 'AssignmentExpression' && parent.left === id
      // x++
      const isUpdateArg =
        parent && parent.type === 'UpdateExpression' && parent.argument === id
      // ({ x } = y)
      const isDestructureAssignment =
        parent && isInDestructureAssignment(parent, parentStack)

      if (
        isConst(type) ||
        type === BindingTypes.SETUP_REACTIVE_CONST ||
        localVars[raw]
      ) {
        return raw
      } else if (type === BindingTypes.SETUP_REF) {
        return `${raw}.value`
      } else if (type === BindingTypes.SETUP_MAYBE_REF) {
        // const binding that may or may not be ref
        // if it's not a ref, then assignments don't make sense -
        // so we ignore the non-ref assignment case and generate code
        // that assumes the value to be a ref for more efficiency
        return isAssignmentLVal || isUpdateArg || isDestructureAssignment
          ? `${raw}.value`
          : `${context.helperString(UNREF)}(${raw})`
      } else if (type === BindingTypes.SETUP_LET) {
        if (isAssignmentLVal) {
          // let binding.
          // this is a bit more tricky as we need to cover the case where
          // let is a local non-ref value, and we need to replicate the
          // right hand side value.
          // x = y --> isRef(x) ? x.value = y : x = y
          const { right: rVal, operator } = parent as AssignmentExpression
          const rExp = rawExp.slice(rVal.start! - 1, rVal.end! - 1)
          const rExpString = stringifyExpression(
            processExpression(
              createSimpleExpression(rExp, false),
              context,
              false,
              false,
              knownIds
            )
          )
          const value =
            operator === '='
              ? rExpString
              : `${context.helperString(
                  UNREF
                )}(${raw}.also((_)=>{ ${raw} ${operator} ${rExpString} }))`

          return `${context.helperString(
            IS_REF
          )}(${raw}) ? ${context.helperString(
            TRY_SET_REF_VALUE
          )}(${raw}, ${value}) : ${raw}`
        } else if (isUpdateArg) {
          // make id replace parent in the code range so the raw update operator
          // is removed
          id!.start = parent!.start
          id!.end = parent!.end
          const { prefix, operator } = parent as UpdateExpression
          // let binding.
          // x++ --> isRef(a) ? a.value++ : a++
          return `${
            type === BindingTypes.SETUP_LET ? `${raw} = ` : ''
          }${context.helperString(TRY_UPDATE_REF_NUMBER)}(${raw}, ${
            operator === '--' ? '-1' : '1'
          }, ${prefix})`
        } else if (isDestructureAssignment) {
          // TODO
          // let binding in a destructure assignment - it's very tricky to
          // handle both possible cases here without altering the original
          // structure of the code, so we just assume it's not a ref here
          // for now
          return raw
        } else {
          return `${context.helperString(UNREF)}(${raw})`
        }
      }
      // else if (type === BindingTypes.PROPS) {
      //   // use __props which is generated by compileScript so in ts mode
      //   // it gets correct type
      //   return genPropsAccessExp(raw)
      // } else if (type === BindingTypes.PROPS_ALIASED) {
      //   // prop with a different local alias (from defineProps() destructure)
      //   return genPropsAccessExp(bindingMetadata.__propsAliases![raw])
      // }
    } else {
      // if (
      //   (type && type.startsWith('setup')) ||
      //   type === BindingTypes.LITERAL_CONST
      // ) {
      //   // setup bindings in non-inline mode
      //   // return `$setup.${raw}`
      //   return `$setup.${raw}`
      // } else if (type === BindingTypes.PROPS_ALIASED) {
      //   return `$props['${bindingMetadata.__propsAliases![raw]}']`
      // } else if (type) {
      //   return `$${type}.${raw}`
      // }
    }
    // fallback to ctx
    return `_ctx.${raw}`
  }

  // fast path if expression is a simple identifier.
  const rawExp = node.content
  // bail constant on parens (function invocation) and dot (member access)
  const bailConstant = constantBailRE.test(rawExp)

  if (isSimpleIdentifier(rawExp)) {
    const isScopeVarReference = context.identifiers[rawExp]
    const isAllowedGlobal = isGloballyAllowed(rawExp)
    const isLiteral = isLiteralWhitelisted(rawExp)
    if (
      !asParams &&
      !isScopeVarReference &&
      !isLiteral &&
      (!isAllowedGlobal || bindingMetadata[rawExp])
    ) {
      // const bindings exposed from setup can be skipped for patching but
      // cannot be hoisted to module scope
      if (bindingMetadata[node.content] === BindingTypes.SETUP_CONST) {
        node.constType = ConstantTypes.CAN_SKIP_PATCH
      }
      node.content = rewriteIdentifier(rawExp)
    } else if (!isScopeVarReference) {
      if (isLiteral) {
        node.constType = ConstantTypes.CAN_STRINGIFY
      } else {
        node.constType = ConstantTypes.CAN_HOIST
      }
    }
    return node
  }

  let ast: any
  // exp needs to be parsed differently:
  // 1. Multiple inline statements (v-on, with presence of `;`): parse as raw
  //    exp, but make sure to pad with spaces for consistent ranges
  // 2. Expressions: wrap with parens (for e.g. object expressions)
  // 3. Function arguments (v-for, v-slot): place in a function argument position
  const source = asRawStatements
    ? ` ${rawExp} `
    : `(${rawExp})${asParams ? `=>{}` : ``}`
  try {
    ast = parse(source, {
      plugins: context.expressionPlugins,
    }).program
  } catch (e: any) {
    context.onError(
      createCompilerError(
        ErrorCodes.X_INVALID_EXPRESSION,
        node.loc,
        undefined,
        e.message
      )
    )
    return node
  }

  type QualifiedId = Identifier & PrefixMeta
  const ids: QualifiedId[] = []
  const parentStack: Node[] = []
  const knownIds: Record<string, number> = Object.create(context.identifiers)

  walkIdentifiers(
    ast,
    (node, parent, _, isReferenced, isLocal) => {
      if (isStaticPropertyKey(node, parent!)) {
        return
      }

      const needPrefix = isReferenced && canPrefix(node)
      if (needPrefix && !isLocal) {
        if (isStaticProperty(parent!) && parent.shorthand) {
          // property shorthand like { foo }, we need to add the key since
          // we rewrite the value
          ;(node as QualifiedId).prefix = `${node.name}: `
        }
        node.name = rewriteIdentifier(node.name, parent, node)
        ids.push(node as QualifiedId)
      } else {
        // The identifier is considered constant unless it's pointing to a
        // local scope variable (a v-for alias, or a v-slot prop)
        if (!(needPrefix && isLocal) && !bailConstant) {
          ;(node as QualifiedId).isConstant = true
        }
        // also generate sub-expressions for other identifiers for better
        // source map support. (except for property keys which are static)
        ids.push(node as QualifiedId)
      }
    },
    true, // invoke on ALL identifiers
    parentStack,
    knownIds
  )

  // We break up the compound expression into an array of strings and sub
  // expressions (for identifiers that have been prefixed). In codegen, if
  // an ExpressionNode has the `.children` property, it will be used instead of
  // `.content`.
  const children: CompoundExpressionNode['children'] = []
  ids.sort((a, b) => a.start - b.start)
  ids.forEach((id, i) => {
    // range is offset by -1 due to the wrapping parens when parsed
    const start = id.start - 1
    const end = id.end - 1
    const last = ids[i - 1]
    const leadingText = rawExp.slice(last ? last.end - 1 : 0, start)
    if (leadingText.length || id.prefix) {
      children.push(leadingText + (id.prefix || ``))
    }
    const source = rawExp.slice(start, end)
    const child = createSimpleExpression(
      id.name,
      false,
      {
        source,
        start: advancePositionWithClone(node.loc.start, source, start),
        end: advancePositionWithClone(node.loc.start, source, end),
      },
      id.isConstant ? ConstantTypes.CAN_STRINGIFY : ConstantTypes.NOT_CONSTANT
    )
    if (id.typeAnnotation?.type === 'TSTypeAnnotation') {
      child.content = child.loc.source
    }
    children.push(child)
    if (i === ids.length - 1 && end < rawExp.length) {
      children.push(rawExp.slice(end))
    }
  })

  let ret
  if (children.length) {
    ret = createCompoundExpression(children, node.loc)
  } else {
    ret = node
    ret.constType = bailConstant
      ? ConstantTypes.NOT_CONSTANT
      : ConstantTypes.CAN_STRINGIFY
  }
  ret.identifiers = Object.keys(knownIds)
  return ret
}

function canPrefix(id: Identifier) {
  // skip whitelisted globals
  if (isGloballyAllowed(id.name)) {
    return false
  }
  // special case for webpack compilation
  if (id.name === 'require') {
    return false
  }
  return true
}

export function stringifyExpression(
  exp: ExpressionNode | string | (ExpressionNode | string)[]
): string {
  if (isArray(exp)) {
    return exp.map(stringifyExpression).join('')
  } else if (isString(exp)) {
    return exp
  } else if (exp.type === NodeTypes.SIMPLE_EXPRESSION) {
    return exp.content
  } else {
    return (exp.children as (ExpressionNode | string)[])
      .map(stringifyExpression)
      .join('')
  }
}

function isConst(type: unknown) {
  return (
    type === BindingTypes.SETUP_CONST || type === BindingTypes.LITERAL_CONST
  )
}
