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

const BEHAVIORS = {
  'wx://form-field': {
    beforeCreate () {
      const mpOptions = this.$options.mpOptions
      if (!mpOptions.properties) {
        mpOptions.properties = Object.create(null)
      }

      const props = mpOptions.properties
      // TODO form submit,reset
      if (!props.name) {
        props.name = {
          type: String
        }
      }
      if (!props.value) {
        props.value = {
          type: String // 默认类型为 String,否则默认值为 null,导致一些自定义 input 显示不正确
        }
      }
    }
  }
}

export function parseBehaviors (behaviors, vueComponentOptions) {
  if (!behaviors) {
    return
  }
  behaviors.forEach(behavior => {
    if (typeof behavior === 'string') {
      BEHAVIORS[behavior] && vueComponentOptions.mixins.push(BEHAVIORS[behavior])
    } else {
      vueComponentOptions.mixins.push(parseBehavior(behavior))
    }
  })
}
