import {
  parseComponentOptions
} from './index'

const mixins = {
  'wx://form-field': {

  },
  'wx://component-export': {

  }
}

function parseBehavior (behavior) {
  if (typeof behavior === 'string') {
    return mixins[behavior]
  }
  return parseComponentOptions(behavior)
}

export function parseBehaviors (behaviors, vueComponentOptions) {
  if (!behaviors) {
    vueComponentOptions.mixins = behaviors.forEach(behavior => {
      return parseBehavior(behavior)
    })
  }
}
