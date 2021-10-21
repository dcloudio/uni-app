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
  DirectiveNode,
  ComponentNode,
} from '@vue/compiler-core'
import { isComponentTag } from '@dcloudio/uni-shared'

import { createMPCompilerError, MPErrorCodes } from '../errors'

import {
  BindingComponentTypes,
  NodeTransform,
  TransformContext,
} from '../transform'
import { createAttributeNode } from '../ast'
import { transformModel } from './vModel'

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

function createClassAttribute(clazz: string): AttributeNode {
  return createAttributeNode('class', clazz)
}

function addStaticClass(node: ElementNode, clazz: string) {
  const classProp = node.props.find(
    (prop) => prop.type === NodeTypes.ATTRIBUTE && prop.name === 'class'
  ) as AttributeNode | undefined

  if (!classProp) {
    return node.props.unshift(createClassAttribute(clazz))
  }

  if (classProp.value) {
    return (classProp.value.content = classProp.value.content + ' ' + clazz)
  }
  classProp.value = {
    type: NodeTypes.TEXT,
    loc: locStub,
    content: clazz,
  }
}

function addScopeId(node: ElementNode, scopeId: string) {
  return addStaticClass(node, scopeId)
}

function addVueId(node: ComponentNode, context: TransformContext) {
  let { vueId, scopes } = context
  if (!vueId) {
    return
  }
  return vueId + '-' + scopes.vueId++
}

function addVueRef(node: ComponentNode, context: TransformContext) {
  return addStaticClass(
    node,
    context.scopes.vFor ? 'vue-ref-in-for' : 'vue-ref'
  )
}

function processComponent(node: ComponentNode, context: TransformContext) {
  const { tag } = node
  if (context.bindingComponents[tag]) {
    return addVueRef(node, context)
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

  addVueId(node, context)
  addVueRef(node, context)

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
    if (prop.type === NodeTypes.ATTRIBUTE) {
      // <custom ref="c"/> => <custom data-ref="c"/>
      if (prop.name === 'ref') {
        prop.name = 'data-ref'
      }
    } else {
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
            createMPCompilerError(
              isVBind
                ? MPErrorCodes.X_V_BIND_NO_ARGUMENT
                : MPErrorCodes.X_V_ON_NO_ARGUMENT,
              loc
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
            createMPCompilerError(
              isVBind
                ? MPErrorCodes.X_V_BIND_DYNAMIC_ARGUMENT
                : MPErrorCodes.X_V_ON_DYNAMIC_EVENT,
              loc
            )
          )
          continue
        }
      }

      if (isVBind) {
        // <custom :ref="c"/> => <custom :data-ref="c" />
        if (
          arg?.type === NodeTypes.SIMPLE_EXPRESSION &&
          arg.content === 'ref'
        ) {
          arg.content = 'data-ref'
        }
      }

      const directiveTransform = context.directiveTransforms[name]
      if (directiveTransform) {
        const { props } = directiveTransform(prop, node, context)
        if (props.length) {
          prop.exp = props[0].value as ExpressionNode
        }
      }
    }
  }
  processVModel(node, context)
}

function processVModel(node: ElementNode, context: TransformContext) {
  const { props } = node
  const dirs: DirectiveNode[] = []
  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    if (prop.type === NodeTypes.DIRECTIVE && prop.name === 'model') {
      dirs.push(...transformModel(prop, node, context))
      props.splice(i, 1)
      i--
    }
  }
  props.push(...dirs)
}
