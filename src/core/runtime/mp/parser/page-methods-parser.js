import {
  isFn
} from 'uni-shared'

import {
  PAGE_LIFECYCLE
} from '../constants'

export function parsePageMethods (mpComponentOptions, vueComponentOptions) {
  const methods = Object.create(null)
  Object.keys(mpComponentOptions).forEach(key => {
    const value = mpComponentOptions[key]
    if (isFn(value) && PAGE_LIFECYCLE.indexOf(key) === -1) {
      methods[key] = value
    }
  })
  vueComponentOptions.methods = methods
}
