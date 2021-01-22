import { isArray, isObject, isFunction } from '@vue/shared'

import {
  InjectionKey,
  ComponentPublicInstance,
  ComponentInternalInstance,
} from 'vue'

function provide<T>(
  instance: ComponentInternalInstance,
  key: InjectionKey<T> | string,
  value: T
) {
  if (!instance) {
    if (__DEV__) {
      console.warn(`provide() can only be used inside setup().`)
    }
  } else {
    let provides = (instance as any).provides
    // by default an instance inherits its parent's provides object
    // but when it needs to provide values of its own, it creates its
    // own provides object using parent provides object as prototype.
    // this way in `inject` we can simply look up injections from direct
    // parent and let the prototype chain do the work.
    const parentProvides = instance.parent && (instance.parent as any).provides
    if (parentProvides === provides) {
      provides = (instance as any).provides = Object.create(parentProvides)
    }
    // TS doesn't allow symbol as index type
    provides[key as string] = value
  }
}

export function initProvide(instance: ComponentPublicInstance) {
  const provideOptions = instance.$options.provide
  if (!provideOptions) {
    return
  }
  const provides = isFunction(provideOptions)
    ? provideOptions.call(instance)
    : provideOptions
  const internalInstance = instance.$
  for (const key in provides) {
    provide(internalInstance, key, provides[key])
  }
}

function inject(
  instance: ComponentInternalInstance,
  key: InjectionKey<any> | string,
  defaultValue?: unknown,
  treatDefaultAsFactory = false
) {
  if (instance) {
    // #2400
    // to support `app.use` plugins,
    // fallback to appContext's `provides` if the intance is at root
    const provides =
      instance.parent == null
        ? instance.vnode.appContext && instance.vnode.appContext.provides
        : (instance.parent as any).provides

    if (provides && (key as string | symbol) in provides) {
      // TS doesn't allow symbol as index type
      return provides[key as string]
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue)
        ? defaultValue()
        : defaultValue
    } else if (__DEV__) {
      console.warn(`injection "${String(key)}" not found.`)
    }
  } else if (__DEV__) {
    console.warn(
      `inject() can only be used inside setup() or functional components.`
    )
  }
}

export function initInjections(instance: ComponentPublicInstance) {
  const injectOptions = instance.$options.inject
  if (!injectOptions) {
    return
  }
  const internalInstance = instance.$
  const ctx = (internalInstance as any).ctx
  if (isArray(injectOptions)) {
    for (let i = 0; i < injectOptions.length; i++) {
      const key = injectOptions[i]
      ctx[key] = inject(internalInstance, key)
    }
  } else {
    for (const key in injectOptions) {
      const opt = injectOptions[key]
      if (isObject(opt)) {
        ctx[key] = inject(
          internalInstance,
          opt.from || key,
          opt.default,
          true /* treat default function as factory */
        )
      } else {
        ctx[key] = inject(internalInstance, opt)
      }
    }
  }
}
