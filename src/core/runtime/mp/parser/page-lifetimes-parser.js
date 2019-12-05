import {
  isFn
} from 'uni-shared'

import {
  PAGE_LIFETIMES,
  PAGE_LIFETIMES_KEYS
} from '../constants'

export function parsePageLifetimes (pageLifetimes, vueComponentOptions) {
  if (!pageLifetimes) {
    return
  }
  PAGE_LIFETIMES_KEYS.forEach(key => {
    const lifetimeFn = pageLifetimes[key]
    isFn(lifetimeFn) && (vueComponentOptions[PAGE_LIFETIMES[key]] = lifetimeFn)
  })
}
