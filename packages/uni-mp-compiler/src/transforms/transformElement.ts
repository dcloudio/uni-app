import { camelize, capitalize } from '@vue/shared'
import {
  BindingTypes,
  type ComponentNode,
  type DirectiveNode,
  type ElementNode,
  ElementTypes,
  ErrorCodes,
  type ExpressionNode,
  NodeTypes,
  type Property,
  RESOLVE_COMPONENT,
  type TemplateLiteral,
  UNREF,
  createCompilerError,
  findDir,
  isCoreComponent,
  isStaticArgOf,
  toValidAssetId,
} from '@vue/compiler-core'
import { isComponentTag } from '@dcloudio/uni-shared'

import { MPErrorCodes, createMPCompilerError } from '../errors'

import {
  BindingComponentTypes,
  type DirectiveTransform,
  type NodeTransform,
  type TransformContext,
} from '../transform'
import { transformModel } from './vModel'
import { addStaticClass } from '@dcloudio/uni-cli-shared'

export interface DirectiveTransformResult {
  props: Property[]
  needRuntime?: boolean | symbol
  ssrTagParts?: TemplateLiteral['elements']
}

export const transformElement: NodeTransform = (node, context) => {
  return function postTransformElement() {
    node = context.currentNode!
    if (
      !(
        node.type === NodeTypes.ELEMENT &&
        (node.tagType === ElementTypes.ELEMENT ||
          node.tagType === ElementTypes.COMPONENT)
      )
    ) {
      return
    }
    if (node.tagType === ElementTypes.COMPONENT) {
      processComponent(node, context)
    }
    if (context.scopeId) {
      addScopeId(node, context.scopeId)
    }
    const { props } = node
    if (props.length > 0) {
      processProps(node, context)
    }
  }
}

function addScopeId(node: ElementNode, scopeId: string) {
  return addStaticClass(node, scopeId)
}

function processComponent(node: ComponentNode, context: TransformContext) {
  const { tag } = node
  if (context.bindingComponents[tag]) {
    return
  }

  // 1. dynamic component
  if (isComponentTag(tag)) {
    return context.onError(
      createMPCompilerError(
        MPErrorCodes.X_DYNAMIC_COMPONENT_NOT_SUPPORTED,
        node.loc
      )
    )
  }
  if (findDir(node, 'is')) {
    return context.onError(
      createMPCompilerError(MPErrorCodes.X_V_IS_NOT_SUPPORTED, node.loc)
    )
  }
  // TODO not supported
  // const isProp = findProp(node, 'is')
  // if (isProp) {
  // }
  // 2. built-in components (Teleport, Transition, KeepAlive, Suspense...)
  const builtIn = isCoreComponent(tag) || context.isBuiltInComponent(tag)
  if (builtIn) {
    return context.onError(
      createMPCompilerError(MPErrorCodes.X_NOT_SUPPORTED, node.loc, tag)
    )
  }

  // 3. user component (from setup bindings)
  const fromSetup = resolveSetupReference(tag, context)
  if (fromSetup) {
    return (context.bindingComponents[tag] = {
      name: fromSetup,
      type: BindingComponentTypes.SETUP,
    })
  }
  const dotIndex = tag.indexOf('.')
  if (dotIndex > 0) {
    return context.onError(
      createMPCompilerError(MPErrorCodes.X_NOT_SUPPORTED, node.loc, tag)
    )
  }

  // 4. Self referencing component (inferred from filename)
  if (context.selfName && capitalize(camelize(tag)) === context.selfName) {
    return (context.bindingComponents[tag] = {
      name: toValidAssetId(tag, `component`),
      type: BindingComponentTypes.SELF,
    })
  }

  // 5. user component (resolve)
  context.bindingComponents[tag] = {
    name: toValidAssetId(tag, `component`),
    type: BindingComponentTypes.UNKNOWN,
  }
  context.helper(RESOLVE_COMPONENT)
}

function resolveSetupReference(name: string, context: TransformContext) {
  const bindings = context.bindingMetadata
  if (!bindings || bindings.__isScriptSetup === false) {
    return
  }

  const camelName = camelize(name)
  const PascalName = capitalize(camelName)
  const checkType = (type: BindingTypes) => {
    if (bindings[name] === type) {
      return name
    }
    if (bindings[camelName] === type) {
      return camelName
    }
    if (bindings[PascalName] === type) {
      return PascalName
    }
  }

  const fromConst =
    checkType(BindingTypes.SETUP_CONST) ||
    checkType(BindingTypes.SETUP_REACTIVE_CONST)
  if (fromConst) {
    return context.inline
      ? // in inline mode, const setup bindings (e.g. imports) can be used as-is
        fromConst
      : `$setup[${JSON.stringify(fromConst)}]`
  }

  const fromMaybeRef =
    checkType(BindingTypes.SETUP_LET) ||
    checkType(BindingTypes.SETUP_REF) ||
    checkType(BindingTypes.SETUP_MAYBE_REF)
  if (fromMaybeRef) {
    return context.inline
      ? // setup scope bindings that may be refs need to be unrefed
        `${context.helperString(UNREF)}(${fromMaybeRef})`
      : `$setup[${JSON.stringify(fromMaybeRef)}]`
  }
}

export function processProps(
  node: ElementNode,
  context: TransformContext,
  props: ElementNode['props'] = node.props
) {
  const { tag } = node
  const isComponent = node.tagType === ElementTypes.COMPONENT
  const isPluginComponent =
    isComponent && context.isMiniProgramComponent(node.tag) === 'plugin'
  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    if (prop.type === NodeTypes.DIRECTIVE) {
      // directives
      const { name, arg, loc } = prop
      const isVBind = name === 'bind'
      const isVOn = name === 'on'
      // skip v-slot - it is handled by its dedicated transform.
      if (name === 'slot') {
        if (!isComponent) {
          context.onError(
            createCompilerError(ErrorCodes.X_V_SLOT_MISPLACED, loc)
          )
        }
        continue
      }
      // skip v-once/v-memo - they are handled by dedicated transforms.
      if (name === 'once' || name === 'memo') {
        continue
      }
      // skip v-is and :is on <component>
      if (
        name === 'is' ||
        (isVBind && isStaticArgOf(arg, 'is') && isComponentTag(tag))
      ) {
        continue
      }

      if (isVBind || isVOn) {
        // v-on=""
        // v-bind=""
        if (!arg) {
          if (isVOn) {
            context.onError(
              createMPCompilerError(MPErrorCodes.X_V_ON_NO_ARGUMENT, loc)
            )
          }
          if (isVBind && (!isComponent || isPluginComponent)) {
            context.onError(
              createMPCompilerError(MPErrorCodes.X_V_BIND_NO_ARGUMENT, loc)
            )
          }
          continue
        }
        // v-on:[a]=""
        // v-on:[a.b]=""
        // v-bind:[a]=""
        // v-bind:[a.b]=""
        if (!(arg.type === NodeTypes.SIMPLE_EXPRESSION && arg.isStatic)) {
          if (isVOn) {
            context.onError(
              createMPCompilerError(MPErrorCodes.X_V_ON_DYNAMIC_EVENT, loc)
            )
          }
          if (isVBind && (!isComponent || isPluginComponent)) {
            context.onError(
              createMPCompilerError(MPErrorCodes.X_V_BIND_DYNAMIC_ARGUMENT, loc)
            )
          }
          continue
        }
      }

      const directiveTransform = context.directiveTransforms[name]
      if (name !== 'model' && directiveTransform) {
        const { props } = directiveTransform(prop, node, context as any)
        if (props.length) {
          prop.exp = props[0].value as ExpressionNode
        }
      }
    }
  }
  const transformVModel = (context.directiveTransforms.model ||
    transformModel) as unknown as DirectiveTransform
  processVModel(node, transformVModel, context)
}

function processVModel(
  node: ElementNode,
  transformVModel: DirectiveTransform,
  context: TransformContext
) {
  const { props } = node
  const dirs: DirectiveNode[] = []
  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    if (prop.type === NodeTypes.DIRECTIVE && prop.name === 'model') {
      dirs.push(
        ...(transformVModel(prop, node, context as any)
          .props as unknown as DirectiveNode[])
      )
      props.splice(i, 1)
      i--
    }
  }
  if (dirs.length) {
    props.push(...dirs)
  }
}
