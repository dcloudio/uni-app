import { getCurrentInstance, reactive, shallowRef, watchEffect } from 'vue'

type Hash<T> = {
  [key: string]: T
}

function entries<T>(obj: Hash<T>): [string, T][] {
  return Object.keys(obj).map((key: string) => [key, obj[key]])
}

interface Params {
  excludeListeners?: boolean
  excludeKeys?: string[]
}

const DEFAULT_EXCLUDE_KEYS = ['class', 'style']
const LISTENER_PREFIX = /^on[A-Z]+/

export const useAttrs = (params: Params = {}) => {
  const { excludeListeners = false, excludeKeys = [] } = params
  const instance = getCurrentInstance()
  const attrs = shallowRef({})
  const listeners = shallowRef({})
  const excludeAttrs = shallowRef({})
  const allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS)

  // Since attrs are not reactive, make it reactive instead of doing in `onUpdated` hook for better performance
  instance!.attrs = reactive(instance!.attrs)

  watchEffect(() => {
    const res = entries(instance!.attrs).reduce(
      (acc, [key, val]) => {
        if (allExcludeKeys.includes(key)) {
          ;(acc.exclude as any)[key] = val
        } else if (LISTENER_PREFIX.test(key)) {
          if (!excludeListeners) {
            ;(acc.attrs as any)[key] = val
          }
          ;(acc.listeners as any)[key] = val
        } else {
          ;(acc.attrs as any)[key] = val
        }

        return acc
      },
      {
        exclude: {},
        attrs: {},
        listeners: {},
      }
    )

    attrs.value = res.attrs
    listeners.value = res.listeners
    excludeAttrs.value = res.exclude
  })

  return { $attrs: attrs, $listeners: listeners, $excludeAttrs: excludeAttrs }
}
