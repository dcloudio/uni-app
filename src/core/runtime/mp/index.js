import {
  parseComponent
} from './parser/component-parser'

import polyfill from './polyfill'

export function Component (options) {
  const componentOptions = parseComponent(options)
  componentOptions.mixins.unshift(polyfill)
  global['__wxComponents'][global['__wxRoute']] = componentOptions
}

export function Behavior (options) {
  return options
}
