import { hasOwn, isFunction, isString } from '@vue/shared'

import {
  type ComponentInternalInstance,
  type ComponentOptions,
  type ComponentPublicInstance,
  type Ref,
  isRef,
} from 'vue'

// @ts-expect-error EMPTY_OBJ 不能从 @vue/shared 中引入，从 vue 中导入，保持一致
import { EMPTY_OBJ, setTemplateRef } from 'vue'

import {
  $createComponent,
  type CreateComponentOptions,
  findPropsData,
  initComponentInstance,
  initMocks,
  initRefs,
} from '@dcloudio/uni-mp-core'

export { handleLink } from '@dcloudio/uni-mp-weixin'

type MPPageInstance = tinyapp.IPageInstance<Record<string, any>>
export type MPComponentInstance = tinyapp.IComponentInstance<
  Record<string, any>,
  any
>

export const isComponent2 = xhs.canIUse('component2')

export const mocks = ['nodeId', 'componentId', 'componentPath']

export function initSpecialMethods(
  mpInstance: MPPageInstance | MPComponentInstance
) {
  if (!mpInstance.$vm) {
    return
  }
  let path = mpInstance.is || mpInstance.route
  if (!path) {
    return
  }
  if (path.indexOf('/') === 0) {
    path = path.slice(1)
  }
  const specialMethods =
    (xhs as any).specialMethods && (xhs as any).specialMethods[path]
  if (specialMethods) {
    specialMethods.forEach((method: string) => {
      if (isFunction(mpInstance.$vm[method])) {
        mpInstance[method] = function (event: Record<string, any>) {
          if (hasOwn(event, 'markerId')) {
            event.detail = typeof event.detail === 'object' ? event.detail : {}
            event.detail.markerId = event.markerId
          }
          // TODO normalizeEvent
          mpInstance.$vm[method](event)
        }
      }
    })
  }
}

export function handleRef(this: MPComponentInstance, ref: MPComponentInstance) {
  if (!ref) {
    return
  }
  const refName = ref.props.uR // data-ref
  const refInForName = ref.props.uRIF // data-ref-in-for
  if (!refName && !refInForName) {
    return
  }
  const instance = this.$vm.$
  const refs =
    instance.refs === EMPTY_OBJ ? (instance.refs = {}) : instance.refs

  const { setupState } = instance
  const refValue = ref.$vm
  if (refName) {
    if (isString(refName)) {
      refs[refName] = refValue
      if (hasOwn(setupState, refName)) {
        setupState[refName] = refValue
      }
    } else {
      setRef(refName, refValue, refs, setupState)
    }
  } else if (refInForName) {
    if (isString(refInForName)) {
      ;(refs[refInForName] || (refs[refInForName] = [])).push(refValue)
    } else {
      setRef(refInForName, refValue, refs, setupState)
    }
  }
}

type VNodeRef =
  | string
  | Ref
  | ((ref: object | null, refs: Record<string, any>) => void)

type TemplateRef = {
  r: VNodeRef
  k?: string // setup ref key
  f?: boolean // refInFor marker
}

function isTemplateRef(opts: unknown): opts is TemplateRef {
  return !!(opts && (opts as TemplateRef).r)
}

function setRef(
  ref: Ref | ((ref: object | null, refs: Record<string, any>) => void),
  refValue: ComponentPublicInstance,
  refs: Record<string, unknown>,
  setupState: Data
) {
  if (isRef(ref)) {
    ref.value = refValue
  } else if (isFunction(ref)) {
    const templateRef = ref(refValue, refs)
    if (isTemplateRef(templateRef)) {
      setTemplateRef(templateRef, refValue, setupState)
    }
  }
}

export function createVueComponent(
  mpType: 'page' | 'component',
  mpInstance: MPPageInstance | MPComponentInstance,
  vueOptions: ComponentOptions,
  parent?: ComponentPublicInstance
) {
  return $createComponent(
    {
      type: vueOptions,
      props: findPropsData(mpInstance.props, mpType === 'page'),
    },
    {
      mpType,
      mpInstance,
      slots: mpInstance.props.uS || {}, // vueSlots
      parentComponent: parent && parent.$,
      onBeforeSetup(
        instance: ComponentInternalInstance,
        options: CreateComponentOptions
      ) {
        initRefs(instance, mpInstance as any)
        initMocks(instance, mpInstance as any, mocks)
        initComponentInstance(instance, options)
      },
    }
  ) as ComponentPublicInstance
}
