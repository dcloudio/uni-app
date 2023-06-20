import {
  parseData
} from './data-parser'

import {
  parseComponents
} from './components-parser'

import {
  parsePageMethods
} from './page-methods-parser'

import {
  parsePageLifecycle
} from './page-lifecycle-parser'

export function parsePage (mpComponentOptions) {
  const vueComponentOptions = {
    mixins: [],
    mpOptions: {}
  }

  parseComponents(vueComponentOptions)

  parseData(mpComponentOptions.data, vueComponentOptions)

  parsePageMethods(mpComponentOptions, vueComponentOptions)
  parsePageLifecycle(mpComponentOptions, vueComponentOptions)

  return vueComponentOptions
}
