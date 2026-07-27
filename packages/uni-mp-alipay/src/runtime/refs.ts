import { isString } from '@vue/shared'
import type { ComponentInternalInstance } from 'vue'

// @ts-expect-error EMPTY_OBJ 需要从 vue 导入，以确保与运行时使用同一个对象
import { EMPTY_OBJ } from 'vue'

function findTemplateUniElementRef(
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

export function initRefs(instance: ComponentInternalInstance) {
  const rawRefs =
    instance.refs === EMPTY_OBJ || !Object.isExtensible(instance.refs)
      ? Object.assign({}, instance.refs)
      : instance.refs
  instance.refs = new Proxy(rawRefs, {
    get(target, key, receiver) {
      const templateRef = findTemplateUniElementRef(instance, key)
      return templateRef ? templateRef.v : Reflect.get(target, key, receiver)
    },
    has(target, key) {
      return (
        !!findTemplateUniElementRef(instance, key) || Reflect.has(target, key)
      )
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
      const templateRef = findTemplateUniElementRef(instance, key)
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
