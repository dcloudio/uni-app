import {
  parseData
} from './data-parser'

import {
  parseProperties
} from './properties-parser'

import {
  parseOptions
} from './options-parser'

import {
  parseMethods
} from './methods-parser'

import {
  parseBehaviors
} from './behaviors-parser'

import {
  parseObservers
} from './observers-parser'

import {
  parseRelations
} from './relations-parser'

import {
  parseExternalClasses
} from './external-classes-parser'

import {
  parseLifetimes
} from './lifetimes-parser'

import {
  parseLifecycle
} from './lifecycle-parser'

import {
  parseDefinitionFilter
} from './definition-filter-parser'

import {
  parsePageLifetimes
} from './page-lifetimes-parser'

export function parseComponent (mpComponentOptions) {
  const {
    data,
    options,
    methods,
    behaviors,
    lifetimes,
    observers,
    relations,
    properties,
    pageLifetimes,
    externalClasses
  } = mpComponentOptions

  const vueComponentOptions = {
    mixins: [],
    watch: {},
    mpOptions: {
      mpObservers: []
    }
  }

  parseData(data, vueComponentOptions)
  parseOptions(options, vueComponentOptions)
  parseMethods(methods, vueComponentOptions)
  parseBehaviors(behaviors, vueComponentOptions)
  parseLifetimes(lifetimes, vueComponentOptions)
  parseObservers(observers, vueComponentOptions)
  parseRelations(relations, vueComponentOptions)
  parseProperties(properties, vueComponentOptions)
  parsePageLifetimes(pageLifetimes, vueComponentOptions)
  parseExternalClasses(externalClasses, vueComponentOptions)

  parseLifecycle(mpComponentOptions, vueComponentOptions)
  parseDefinitionFilter(mpComponentOptions, vueComponentOptions)

  return vueComponentOptions
}
