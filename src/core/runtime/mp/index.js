import {
  parseComponent
} from './parser/component-parser'

import polyfill from './polyfill'

export * from './wxs'

global['__wxRoute'] = []

export function Component (options) {
  const componentOptions = parseComponent(options)
  componentOptions.mixins.unshift(polyfill)
  if (!global['__wxComponents']) {
    global['__wxComponents'] = Object.create(null)
  }
  global['__wxComponents'][global['__wxRoute'].pop()] = componentOptions
}

export function Behavior (options) {
  return options
}
