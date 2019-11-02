import {
  parseData
} from './data-parser'

import {
  parseProperties
} from './properties-parser'

import {
  parseMethods
} from './methods-parser'

import {
  parseLifecycle
} from './lifecycle-parser'

import {
  parseDefinitionFilter
} from './definition-filter-parser'

function parseBehavior (behavior) {
  const {
    data,
    methods,
    behaviors,
    properties
  } = behavior

  const vueComponentOptions = {
    watch: {},
    mpOptions: {
      mpObservers: []
    }
  }

  parseData(data, vueComponentOptions)
  parseMethods(methods, vueComponentOptions)
  parseBehaviors(behaviors, vueComponentOptions)
  parseProperties(properties, vueComponentOptions)

  parseLifecycle(behavior, vueComponentOptions)
  parseDefinitionFilter(behavior, vueComponentOptions)

  return vueComponentOptions
}

export function parseBehaviors (behaviors, vueComponentOptions) {
  if (!behaviors) {
    return
  }
  behaviors.forEach(behavior => {
    if (typeof behavior === 'string') {
      (vueComponentOptions.behaviors || (vueComponentOptions.behaviors = [])).push(behavior)
    } else {
      vueComponentOptions.mixins.push(parseBehavior(behavior))
    }
  })
}
