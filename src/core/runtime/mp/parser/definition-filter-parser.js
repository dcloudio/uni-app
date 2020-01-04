import {
  isFn
} from 'uni-shared'

const mpBehaviors = {
  'wx://form-field': {},
  'wx://component-export': {}
}

function callDefinitionFilter (mpComponentOptions) {
  const {
    behaviors,
    definitionFilter
  } = mpComponentOptions

  const behaviorDefinitionFilters = []

  if (Array.isArray(behaviors)) {
    behaviors.forEach(behavior => {
      behavior = typeof behavior === 'string' ? mpBehaviors[behavior] : behavior
      if (behavior.definitionFilter) {
        behaviorDefinitionFilters.push(behavior.definitionFilter)
        behavior.definitionFilter.call(null, mpComponentOptions, [])
      }
    })
  }

  if (isFn(definitionFilter)) {
    return function (defFields) {
      definitionFilter(defFields, behaviorDefinitionFilters)
    }
  }
}

export function parseDefinitionFilter (mpComponentOptions, vueComponentOptions) {
  callDefinitionFilter(mpComponentOptions)
}
