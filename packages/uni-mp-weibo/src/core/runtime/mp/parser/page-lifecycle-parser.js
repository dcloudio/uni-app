import {
  PAGE_LIFECYCLE
} from '../constants'

export function parsePageLifecycle (mpComponentOptions, vueComponentOptions) {
  Object.keys(mpComponentOptions).forEach(key => {
    if (PAGE_LIFECYCLE.indexOf(key) !== -1) {
      vueComponentOptions[key] = mpComponentOptions[key]
    }
  })
}
