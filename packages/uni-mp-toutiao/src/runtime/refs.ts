import { hasOwn, isFunction, isString } from '@vue/shared'
import type {
  ComponentInternalInstance,
  ComponentPublicInstance,
  Ref,
} from 'vue'
import { isRef } from 'vue'

// @ts-expect-error setTemplateRef is provided by the uni-mp-vue runtime build.
import { setTemplateRef } from 'vue'

// @ts-expect-error EMPTY_OBJ 需要从 vue 导入，以确保与运行时使用同一个对象
import { EMPTY_OBJ } from 'vue'
import {
  type MPComponentInstance,
  initRefs as initLegacyRefs,
} from '@dcloudio/uni-mp-core'

function findTemplateRef(
  instance: ComponentInternalInstance,
  key: PropertyKey
) {
  if (!isString(key)) {
    return
  }
  const templateRefs = instance.$templateUniElementRefs
  for (let i = templateRefs.length - 1; i >= 0; i--) {
    const templateRef = templateRefs[i]
    const refKey = isString(templateRef.r) ? templateRef.r : templateRef.k
    if (refKey === key) {
      return templateRef
    }
  }
}

function initXRefs(instance: ComponentInternalInstance) {
  const rawRefs =
    instance.refs === EMPTY_OBJ || !Object.isExtensible(instance.refs)
      ? Object.assign({}, instance.refs)
      : instance.refs
  instance.refs = new Proxy(rawRefs, {
    get(target, key, receiver) {
      const templateRef = findTemplateRef(instance, key)
      return templateRef ? templateRef.v : Reflect.get(target, key, receiver)
    },
    has(target, key) {
      return !!findTemplateRef(instance, key) || Reflect.has(target, key)
    },
    set(target, key, value) {
      return Reflect.set(target, key, value, target)
    },
    ownKeys(target) {
      const keys = Reflect.ownKeys(target)
      instance.$templateUniElementRefs.forEach((templateRef) => {
        const refKey = isString(templateRef.r) ? templateRef.r : templateRef.k
        if (refKey && !keys.includes(refKey)) {
          keys.push(refKey)
        }
      })
      return keys
    },
    getOwnPropertyDescriptor(target, key) {
      const templateRef = findTemplateRef(instance, key)
      if (templateRef) {
        return {
          configurable: true,
          enumerable: true,
          value: templateRef.v,
          writable: true,
        }
      }
      return Reflect.getOwnPropertyDescriptor(target, key)
    },
  })
}

export function initRefs(
  instance: ComponentInternalInstance,
  mpInstance: MPComponentInstance
) {
  if (__X__) {
    initXRefs(instance)
  } else {
    initLegacyRefs(instance, mpInstance)
  }
}

export function handleRef(this: MPComponentInstance, ref: MPComponentInstance) {
  if (!ref || !this.$vm) {
    return
  }
  const props = (ref as any).props || (ref as any).properties
  const refName = props && props.uR
  const refInForName = props && props.uRIF
  if (!refName && !refInForName) {
    return
  }
  const instance = this.$vm.$
  const refs =
    instance.refs === EMPTY_OBJ ? (instance.refs = {}) : instance.refs
  const { setupState } = instance as ComponentInternalInstance & {
    setupState: Record<string, unknown>
  }
  const refValue = ((ref as any).$vm ||
    (props && props.uT === 'm' ? ref : undefined)) as ComponentPublicInstance

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
      const values = refs[refInForName] || (refs[refInForName] = [])
      ;(values as unknown[]).push(refValue)
    } else {
      setRef(refInForName, refValue, refs, setupState, true)
    }
  }
}

type VNodeRef =
  | string
  | Ref
  | ((ref: object | null, refs: Record<string, any>) => void)

type TemplateRef = {
  r: VNodeRef
  k?: string
  f?: boolean
}

function isTemplateRef(opts: unknown): opts is TemplateRef {
  return !!(opts && (opts as TemplateRef).r)
}

function setRef(
  ref: Ref | ((ref: object | null, refs: Record<string, any>) => void),
  refValue: ComponentPublicInstance,
  refs: Record<string, unknown>,
  setupState: Record<string, unknown>,
  isRefInVFor = false
) {
  if (isRef(ref)) {
    ref.value = refValue
  } else if (isFunction(ref)) {
    const templateRef = ref(refValue, refs)
    if (isTemplateRef(templateRef)) {
      setTemplateRef(templateRef, refValue, setupState)
      if (!templateRef.k && isString(templateRef.r)) {
        if (isRefInVFor) {
          ;(
            (refs[templateRef.r] || (refs[templateRef.r] = [])) as unknown[]
          ).push(refValue)
        } else {
          refs[templateRef.r] = refValue
        }
        return
      }
      if (!templateRef.k || !isRef(templateRef.r)) {
        return
      }
      if (isRefInVFor) {
        ;(
          (refs[templateRef.k] || (refs[templateRef.k] = [])) as unknown[]
        ).push(refValue)
      } else {
        refs[templateRef.k] = refValue
      }
    }
  }
}
