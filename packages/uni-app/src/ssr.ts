import {
  customRef,
  getCurrentInstance,
  ref,
  shallowRef,
  useSSRContext,
} from 'vue'
import { hasOwn, isObject } from '@vue/shared'
import {
  UNI_SSR,
  UNI_SSR_DATA,
  UNI_SSR_GLOBAL_DATA,
  sanitise,
} from '@dcloudio/uni-shared'

type SSRRef = (
  value: unknown,
  key?: string,
  shallow?: boolean
) => ReturnType<typeof ref> | ReturnType<typeof shallowRef>

function getSSRDataType() {
  return getCurrentInstance() ? UNI_SSR_DATA : UNI_SSR_GLOBAL_DATA
}

function assertKey(key?: string, shallow = false) {
  if (!key) {
    throw new Error(
      `${shallow ? 'shallowSsrRef' : 'ssrRef'}: You must provide a key.`
    )
  }
}

const ssrClientRef: SSRRef = (value, key, shallow = false) => {
  const valRef = shallow ? shallowRef(value) : ref(value)
  // 非 h5 平台
  if (typeof window === 'undefined') {
    return valRef
  }
  const __uniSSR = (window as any)[UNI_SSR]
  if (!__uniSSR) {
    return valRef
  }
  const type = getSSRDataType()
  assertKey(key, shallow)
  if (hasOwn(__uniSSR[type], key!)) {
    valRef.value = __uniSSR[type][key!]
    if (type === UNI_SSR_DATA) {
      delete __uniSSR[type][key!] // TODO 非全局数据仅使用一次？否则下次还会再次使用该数据
    }
  }
  return valRef
}

function proxy(
  target: Record<string | number, any>,
  track: () => void,
  trigger: () => void
): Record<string | number, any> {
  return new Proxy(target, {
    get(target, prop: string) {
      track()
      if (isObject(target[prop])) {
        return proxy(target[prop], track, trigger)
      }
      return Reflect.get(target, prop)
    },
    set(obj, prop, newVal) {
      const result = Reflect.set(obj, prop, newVal)
      trigger()
      return result
    },
  })
}

const globalData: Record<string, any> = {}

const ssrServerRef: SSRRef = (value, key, shallow = false) => {
  assertKey(key, shallow)
  const ctx = getCurrentInstance() && useSSRContext()
  let state: Record<string, any>
  if (ctx) {
    const __uniSSR = ctx[UNI_SSR] || (ctx[UNI_SSR] = {})
    state = __uniSSR[UNI_SSR_DATA] || (__uniSSR[UNI_SSR_DATA] = {})
  } else {
    state = globalData
  }
  state[key!] = sanitise(value)
  // SSR 模式下 watchEffect 不生效 https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/src/apiWatch.ts#L283
  // 故自定义ref
  return customRef((track, trigger) => {
    const customTrigger = () => (trigger(), (state[key!] = sanitise(value)))
    return {
      get: () => {
        track()
        if (!shallow && isObject(value)) {
          return proxy(value, track, customTrigger)
        }
        return value
      },
      set: (v) => {
        value = v
        customTrigger()
      },
    }
  })
}

export const ssrRef: SSRRef = (value, key) => {
  if (__NODE_JS__) {
    return ssrServerRef(value, key)
  }
  return ssrClientRef(value, key)
}

export const shallowSsrRef: SSRRef = (value, key) => {
  if (__NODE_JS__) {
    return ssrServerRef(value, key, true)
  }
  return ssrClientRef(value, key, true)
}

export function getSsrGlobalData() {
  return sanitise(globalData)
}
