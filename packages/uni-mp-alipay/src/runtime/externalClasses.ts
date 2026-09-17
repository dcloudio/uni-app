import { camelize, hasOwn } from '@vue/shared'
import type { ComponentOptions } from 'vue'

export function createVueRuntimeOptions(
  vueOptions: ComponentOptions,
  externalClasses?: string[]
) {
  return externalClasses?.length
    ? Object.assign({}, vueOptions, { externalClasses: undefined })
    : vueOptions
}

/**
 * 支付宝 externalClass 的真实值由原生 props 提供，不经过 uP props 缓存。
 * Vue prop 使用驼峰命名，因此优先读取 boxClass，同时兼容平台返回 box-class 的情况。
 */
export function getExternalClassProps(
  nativeProps: Record<string, any>,
  externalClasses?: string[]
) {
  if (!externalClasses?.length) {
    return
  }
  const props: Record<string, any> = {}
  externalClasses.forEach((name) => {
    const camelizedName = camelize(name)
    if (hasOwn(nativeProps, camelizedName)) {
      props[camelizedName] = nativeProps[camelizedName]
    } else if (hasOwn(nativeProps, name)) {
      props[camelizedName] = nativeProps[name]
    }
  })
  return props
}
