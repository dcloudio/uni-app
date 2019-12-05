import {
  hasOwn
} from 'uni-shared'

import {
  COMPONENT_LIFECYCLE,
  COMPONENT_LIFECYCLE_KEYS
} from '../constants'

export function parseLifecycle (mpComponentOptions, vueComponentOptions) {
  COMPONENT_LIFECYCLE_KEYS.forEach(name => {
    if (hasOwn(mpComponentOptions, name)) {
      (vueComponentOptions[COMPONENT_LIFECYCLE[name]] || (vueComponentOptions[COMPONENT_LIFECYCLE[name]] = []))
        .push(mpComponentOptions[name])
    }
  })
}
