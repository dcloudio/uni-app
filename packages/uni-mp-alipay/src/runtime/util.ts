import { hasOwn, isFunction, camelize, EMPTY_OBJ } from '@vue/shared'

import {
  ComponentPublicInstance,
  ComponentOptions,
  ComponentInternalInstance,
} from 'vue'

import {
  initMocks,
  $createComponent,
  initComponentInstance,
  CreateComponentOptions,
} from '@dcloudio/uni-mp-core'

import { handleLink as handleBaseLink } from '@dcloudio/uni-mp-weixin'

import deepEqual from './deepEqual'
import { ON_READY } from '@dcloudio/uni-shared'

type MPPageInstance = tinyapp.IPageInstance<Record<string, any>>
export type MPComponentInstance = tinyapp.IComponentInstance<
  Record<string, any>,
  any
>

export const isComponent2 = my.canIUse('component2')

export const mocks = ['$id']

const customizeRE = /:/g

function customize(str: string) {
  return camelize(str.replace(customizeRE, '-'))
}

export function initBehavior({ properties }: Record<string, any>) {
  const props: Record<string, any> = {}
  Object.keys(properties).forEach((key) => {
    props[key] = properties[key].value
  })
  return {
    props,
  }
}

export function initRelation(
  mpInstance: MPComponentInstance,
  detail: RelationOptions
) {
  // onVueInit
  mpInstance.props.onVI(detail)
}

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
    path = path.substr(1)
  }
  const specialMethods =
    (my as any).specialMethods && (my as any).specialMethods[path]
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

export interface RelationOptions {
  vuePid: string
  createComponent: (parent: ComponentPublicInstance) => ComponentPublicInstance
  mpInstance: MPComponentInstance
  parent?: ComponentPublicInstance
}

export function initChildVues(
  mpInstance: MPPageInstance | MPComponentInstance
) {
  // 此时需保证当前 mpInstance 已经存在 $vm
  if (!mpInstance.$vm) {
    return
  }
  const childVues = mpInstance._$childVues as RelationOptions[]
  if (childVues) {
    childVues.forEach((relationOptions) => {
      // 父子关系
      handleBaseLink.call(mpInstance as any, {
        detail: relationOptions,
      })

      const { mpInstance: childMPInstance, createComponent } = relationOptions
      childMPInstance.$vm = createComponent(relationOptions.parent!)

      initSpecialMethods(childMPInstance)

      if (relationOptions.parent) {
        handleRef.call(relationOptions.parent.$scope as any, childMPInstance)
      }

      initChildVues(childMPInstance)

      childMPInstance.$vm.$callHook('mounted')
      childMPInstance.$vm.$callHook(ON_READY)
    })
  }

  delete mpInstance._$childVues
}

// TODO vue3
export function handleRef(this: MPComponentInstance, ref: MPComponentInstance) {
  if (!ref) {
    return
  }
  const refName = ref.props['data-r'] // data-ref
  const refInForName = ref.props['data-r-i-f'] // data-ref-in-for
  if (!refName && !refInForName) {
    return
  }
  const instance = this.$vm.$
  const refs =
    instance.refs === EMPTY_OBJ ? (instance.refs = {}) : instance.refs

  if (refName) {
    refs[refName] = ref.$vm || ref
  } else if (refInForName) {
    ;(refs[refInForName] || (refs[refInForName] = [])).push(ref.$vm || ref)
  }
}

export function triggerEvent(
  this: MPComponentInstance,
  type: string,
  detail: object
) {
  const handler = this.props[customize('on-' + type)]
  if (!handler) {
    return
  }

  const eventOpts = this.props['data-event-opts']

  const target = {
    dataset: {
      eventOpts,
    },
  }

  handler({
    type: customize(type),
    target,
    currentTarget: target,
    detail,
  })
}

const IGNORES = ['$slots', '$scopedSlots']

export function createObserver(isDidUpdate: boolean = false) {
  return function observe(
    this: MPComponentInstance,
    props: Record<string, any>
  ) {
    const prevProps = isDidUpdate ? props : this.props
    const nextProps = isDidUpdate ? this.props : props
    if (deepEqual(prevProps, nextProps)) {
      return
    }
    Object.keys(prevProps).forEach((name) => {
      if (IGNORES.indexOf(name) === -1) {
        const prevValue = prevProps[name]
        const nextValue = nextProps[name]
        if (
          !isFunction(prevValue) &&
          !isFunction(nextValue) &&
          !deepEqual(prevValue, nextValue)
        ) {
          this.$vm.$.props[name] = nextProps[name]
        }
      }
    })
  }
}

export const handleLink = (function () {
  if (isComponent2) {
    return function handleLink(
      this: MPComponentInstance,
      detail: RelationOptions
    ) {
      return handleBaseLink.call(this as any, {
        detail,
      })
    }
  }
  return function handleLink(
    this: MPComponentInstance,
    detail: RelationOptions
  ) {
    if (this.$vm && this.$vm.$.isMounted) {
      // 父已初始化
      return handleBaseLink.call(this as any, {
        detail,
      })
    }
    // 支付宝通过 didMount 来实现，先子后父，故等父 ready 之后，统一初始化
    ;(this._$childVues || (this._$childVues = [])).unshift(detail)
  }
})()

export function createVueComponent(
  mpType: 'page' | 'component',
  mpInstance: MPPageInstance | MPComponentInstance,
  vueOptions: ComponentOptions,
  parent?: ComponentPublicInstance
) {
  return $createComponent(
    {
      type: vueOptions,
      props: mpInstance.props,
    },
    {
      mpType,
      mpInstance,
      parentComponent: parent && parent.$,
      onBeforeSetup(
        instance: ComponentInternalInstance,
        options: CreateComponentOptions
      ) {
        initMocks(instance, mpInstance as any, mocks)
        initComponentInstance(instance, options)
      },
    }
  ) as ComponentPublicInstance
}
