import Vue from 'vue'

import parseBaseApp from '../../../mp-weixin/runtime/wrapper/app-base-parser'

import {
  mocks,
  initRefs
} from './util'

export default function parseApp (vm) {
  Object.defineProperty(Vue.prototype, '$slots', {
    get () {
      return this.$scope && this.$scope.props.$slots
    },
    set () {

    }
  })
  Object.defineProperty(Vue.prototype, '$scopedSlots', {
    get () {
      return this.$scope && this.$scope.props.$scopedSlots
    },
    set () {

    }
  })

  return parseBaseApp(vm, {
    mocks,
    initRefs
  })
}
