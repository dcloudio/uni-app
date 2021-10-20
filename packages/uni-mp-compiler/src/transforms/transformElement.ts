import { camelize, capitalize } from '@vue/shared'
import {
  NodeTypes,
  ElementTypes,
  createCompilerError,
  ErrorCodes,
  ElementNode,
  isBindKey,
  TemplateLiteral,
  Property,
  ExpressionNode,
  isCoreComponent,
  BindingTypes,
  UNREF,
  toValidAssetId,
  findDir,
  locStub,
  AttributeNode,
} from '@vue/compiler-core'
import { errorMessages, MPErrorCodes } from '../errors'

import {
  BindingComponentTypes,
  NodeTransform,
  TransformContext,
} from '../transform'
import { createAttributeNode } from '../ast'

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
    const isComponent = node.tagType === ElementTypes.COMPONENT
    if (isComponent) {
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

function createClassAttribute(clazz: string): AttributeNode {
  return createAttributeNode('class', clazz)
}

function addScopeId(node: ElementNode, scopeId: string) {
  const classProp = node.props.find(
    (prop) => prop.type === NodeTypes.ATTRIBUTE && prop.name === 'class'
  ) as AttributeNode | undefined

  if (!classProp) {
    return node.props.unshift(createClassAttribute(scopeId))
  }

  if (classProp.value) {
    return (classProp.value.content = classProp.value.content + ' ' + scopeId)
  }
  classProp.value = {
    type: NodeTypes.TEXT,
    loc: locStub,
    content: scopeId,
  }
}

function processComponent(node: ElementNode, context: TransformContext) {
  const { tag } = node
  if (context.bindingComponents[tag]) {
    return
  }

  // 1. dynamic component
  if (isComponentTag(tag)) {
    return context.onError(
      createCompilerError(
        MPErrorCodes.X_DYNAMIC_COMPONENT_NOT_SUPPORTED,
        node.loc,
        errorMessages
      )
    )
  }
  if (findDir(node, 'is')) {
    return context.onError(
      createCompilerError(
        MPErrorCodes.X_V_IS_NOT_SUPPORTED,
        node.loc,
        errorMessages
      )
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
      createCompilerError(
        MPErrorCodes.X_NOT_SUPPORTED,
        node.loc,
        errorMessages,
        tag
      )
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
      createCompilerError(
        MPErrorCodes.X_NOT_SUPPORTED,
        node.loc,
        errorMessages,
        tag
      )
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

  const fromConst = checkType(BindingTypes.SETUP_CONST)
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

function processProps(node: ElementNode, context: TransformContext) {
  const { tag, props } = node
  const isComponent = node.tagType === ElementTypes.COMPONENT

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
        (isVBind && isBindKey(arg, 'is') && isComponentTag(tag))
      ) {
        continue
      }

      if (isVBind || isVOn) {
        // v-on=""
        // v-bind=""
        if (!arg) {
          context.onError(
            createCompilerError(
              isVBind
                ? MPErrorCodes.X_V_BIND_NO_ARGUMENT
                : MPErrorCodes.X_V_ON_NO_ARGUMENT,
              loc,
              errorMessages
            )
          )
          continue
        }
        // v-on:[a]=""
        // v-on:[a.b]=""
        // v-bind:[a]=""
        // v-bind:[a.b]=""
        if (!(arg.type === NodeTypes.SIMPLE_EXPRESSION && arg.isStatic)) {
          context.onError(
            createCompilerError(
              isVBind
                ? MPErrorCodes.X_V_BIND_DYNAMIC_ARGUMENT
                : MPErrorCodes.X_V_ON_DYNAMIC_EVENT,
              loc,
              errorMessages
            )
          )
          continue
        }
      }

      const directiveTransform = context.directiveTransforms[name]
      if (directiveTransform) {
        prop.exp = directiveTransform(prop, node, context).props[0]
          .value as ExpressionNode
      }
    }
  }
}

function isComponentTag(tag: string) {
  return tag[0].toLowerCase() + tag.slice(1) === 'component'
}
