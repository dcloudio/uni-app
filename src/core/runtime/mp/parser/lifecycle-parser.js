import {
  hasOwn
} from 'uni-shared'

const LIFECYCLE = {
  'created': 'created',
  'attached': 'created',
  'ready': 'mounted',
  'moved': 'moved',
  'detached': 'destroyed'
}
const LIFECYCLE_KEYS = Object.keys(LIFECYCLE)

export function parseLifecycle (mpComponentOptions, vueComponentOptions) {
  Object.keys(LIFECYCLE_KEYS).forEach(name => {
    if (hasOwn(mpComponentOptions, name)) {
      vueComponentOptions[LIFECYCLE[name]] = mpComponentOptions[name]
    }
  })
}
