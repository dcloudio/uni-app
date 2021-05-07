import {
  ref,
  shallowRef,
  customRef,
  useSSRContext,
  getCurrentInstance,
} from 'vue'
import { isObject } from '@vue/shared'
import {
  sanitise,
  UNI_SSR,
  UNI_SSR_DATA,
  UNI_SSR_GLOBAL_DATA,
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
  if (__PLATFORM__ !== 'h5') {
    return valRef
  }
  const __uniSSR = (window as any)[UNI_SSR]
  if (!__uniSSR) {
    return valRef
  }
  const type = getSSRDataType()
  assertKey(key, shallow)
  valRef.value = (__uniSSR[type] as any)[key!]
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

const ssrServerRef: SSRRef = (value, key, shallow = false) => {
  const type = getSSRDataType()
  assertKey(key, shallow)
  const ctx = useSSRContext()!
  const __uniSSR = ctx[UNI_SSR] || (ctx[UNI_SSR] = {})
  const state = __uniSSR[type] || (__uniSSR[type] = {})
  // SSR 模式下 watchEffect 不生效 https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/src/apiWatch.ts#L253
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
