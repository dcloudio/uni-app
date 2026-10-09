import { unref, warn } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import type { UniApp } from '@dcloudio/uni-app-x/types/app'
import { initI18nAppVmMsgsOnce, useI18n } from '../i18n'

type MethodSource = Record<string, unknown> | null | undefined
type SetupState =
  | (Record<string, unknown> & { __isScriptSetup?: boolean })
  | null
  | undefined
type AppVmInternalInstance = {
  ctx: MethodSource
  setupState: SetupState
  exposed: MethodSource
}
type WarningMarker = {
  methodName: string
}

type InitUniAppVmMethodWarnings = (uniApp: UniApp) => Set<string>

export function warnUniAppVmMethod(methodName: string) {
  initI18nAppVmMsgsOnce()
  const methodCall = `getApp().vm?.${methodName}()`
  warn(
    useI18n().t('uni.appVm.methodWarning', {
      methodName,
      methodCall,
    })
  )
}

function createInitUniAppVmMethodWarnings(): InitUniAppVmMethodWarnings {
  const VM_METHOD_WARNING_GETTER = Symbol.for(
    'uni-app.vm-method-warning-getter'
  )
  type MarkedGetter = (() => unknown) & {
    [VM_METHOD_WARNING_GETTER]?: WarningMarker
  }

  // UniApp 自身的 API 不属于 App VM 方法兼容逻辑。
  const UNI_APP_METHODS = new Set([
    '$vm',
    'globalData',
    'getAndroidApplication',
    'getHarmonyAbility',
    'restart',
    'vm',
  ])

  function getMethodSources(vm: ComponentPublicInstance): MethodSource[] {
    const instance = vm.$ as unknown as AppVmInternalInstance
    if (instance.exposed) {
      return [instance.exposed]
    }
    return [
      instance.ctx,
      instance.setupState?.__isScriptSetup ? undefined : instance.setupState,
    ]
  }

  function getVmMethodNames(vm: ComponentPublicInstance) {
    const methodNames = new Set<string>()
    getMethodSources(vm).forEach((source) => {
      if (!source) {
        return
      }
      Object.getOwnPropertyNames(source).forEach((name) => {
        const descriptor = Object.getOwnPropertyDescriptor(source, name)
        if (typeof unref(descriptor?.value) === 'function') {
          methodNames.add(name)
        }
      })
    })
    return methodNames
  }

  function createWarningGetter(
    methodName: string,
    getter: (this: unknown) => unknown
  ) {
    const warningGetter = function (this: unknown) {
      warnUniAppVmMethod(methodName)
      return Reflect.apply(getter, this, [])
    }
    Object.defineProperty(warningGetter, VM_METHOD_WARNING_GETTER, {
      value: { methodName },
    })
    return warningGetter
  }

  function findPropertyDescriptor(target: object, methodName: string) {
    try {
      let owner: object | null = target
      while (owner) {
        const descriptor = Object.getOwnPropertyDescriptor(owner, methodName)
        if (descriptor) {
          return { descriptor, own: owner === target }
        }
        owner = Object.getPrototypeOf(owner)
      }
    } catch {
      return
    }
  }

  function defineProperty(
    target: object,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    try {
      Object.defineProperty(target, methodName, descriptor)
    } catch {}
  }

  function wrapAccessor(
    uniApp: UniApp,
    methodName: string,
    descriptor: PropertyDescriptor,
    own: boolean
  ) {
    const getter = descriptor.get as MarkedGetter | undefined
    if (
      !getter ||
      getter[VM_METHOD_WARNING_GETTER]?.methodName === methodName ||
      (own && !descriptor.configurable)
    ) {
      return
    }

    defineProperty(uniApp, methodName, {
      configurable: own ? descriptor.configurable : true,
      enumerable: descriptor.enumerable,
      get: createWarningGetter(methodName, getter),
      set: descriptor.set,
    })
  }

  function wrapDataProperty(
    uniApp: UniApp,
    methodName: string,
    value: unknown,
    descriptor?: PropertyDescriptor,
    own = false
  ) {
    if (own && !descriptor?.configurable) {
      return
    }
    let currentValue = value
    defineProperty(uniApp, methodName, {
      configurable: own ? descriptor?.configurable : true,
      enumerable: descriptor?.enumerable ?? false,
      get: createWarningGetter(methodName, () => currentValue),
      set:
        descriptor?.writable === false
          ? undefined
          : (value: unknown) => {
              currentValue = value
            },
    })
  }

  function wrapUniAppMethod(
    uniApp: UniApp,
    methodName: string,
    wrapMissingProperty = false
  ) {
    if (UNI_APP_METHODS.has(methodName)) {
      return
    }

    const property = findPropertyDescriptor(uniApp, methodName)
    if (property) {
      const { descriptor, own } = property
      if (descriptor.get) {
        wrapAccessor(uniApp, methodName, descriptor, own)
      } else if (typeof descriptor.value === 'function') {
        wrapDataProperty(uniApp, methodName, descriptor.value, descriptor, own)
      }
      return
    }

    // Native UniApp implementations may resolve methods dynamically without
    // exposing a property descriptor. Preserve that resolved method as-is.
    let method: unknown
    try {
      method = (uniApp as any)[methodName]
    } catch {
      return
    }
    if (typeof method === 'function' || wrapMissingProperty) {
      wrapDataProperty(uniApp, methodName, method)
    }
  }

  return function initUniAppVmMethodWarnings(uniApp: UniApp) {
    if (!uniApp.vm) {
      return new Set<string>()
    }
    const methodNames = getVmMethodNames(uniApp.vm)
    UNI_APP_METHODS.forEach((methodName) => methodNames.delete(methodName))
    methodNames.forEach((methodName) => {
      // App JS Engine 的 UniApp 上没有这些属性，也需要在读取时告警。
      wrapUniAppMethod(uniApp, methodName, __PLATFORM__ === 'app')
    })
    return methodNames
  }
}

export const initUniAppVmMethodWarnings: InitUniAppVmMethodWarnings = __DEV__
  ? createInitUniAppVmMethodWarnings()
  : () => new Set<string>()
