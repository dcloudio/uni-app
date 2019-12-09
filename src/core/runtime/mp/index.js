import Vue from 'vue'

import {
  parsePage
} from './parser/page-parser'

import {
  parseComponent
} from './parser/component-parser'

import {
  handleRelations
} from './polyfill/relations'

import polyfill from './polyfill/index'

export * from './wxs'

global['__wxRoute'] = ''
global['__wxComponents'] = Object.create(null)
global['__wxVueOptions'] = Object.create(null)

export function Page (options) {
  const pageOptions = parsePage(options)
  pageOptions.mixins.unshift(polyfill)
  pageOptions.mpOptions.path = global['__wxRoute']
  global['__wxComponents'][global['__wxRoute']] = pageOptions
}

function initRelationsHandler (vueComponentOptions) {
  // linked 需要在当前组件 attached 之后再执行
  if (!vueComponentOptions['onServiceAttached']) {
    vueComponentOptions['onServiceAttached'] = []
  }
  vueComponentOptions['onServiceAttached'].push(function onServiceAttached () {
    handleRelations(this, 'linked')
  })
}

export function Component (options) {
  const componentOptions = parseComponent(options)
  componentOptions.mixins.unshift(polyfill)
  componentOptions.mpOptions.path = global['__wxRoute']
  initRelationsHandler(componentOptions)
  global['__wxComponents'][global['__wxRoute']] = componentOptions
}

export function Behavior (options) {
  return options
}

export const nextTick = Vue.nextTick

export default uni
