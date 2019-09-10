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

  Vue.prototype.$onAliGetAuthorize = function onAliGetAuthorize (method, $event) {
    my.getPhoneNumber({
      success: (res) => {
        $event.type = 'getphonenumber'
        const response = JSON.parse(res.response).response
        if (response.code === '10000') { // success
          $event.detail.errMsg = 'getPhoneNumber:ok'
          $event.detail.encryptedData = res.response
        } else {
          $event.detail.errMsg = 'getPhoneNumber:fail Error: ' + res.response
        }
        this[method]($event)
      },
      fail: (res) => {
        $event.type = 'getphonenumber'
        $event.detail.errMsg = 'getPhoneNumber:fail'
        this[method]($event)
      }
    })
  }

  Vue.prototype.$onAliAuthError = function $onAliAuthError (method, $event) {
    $event.type = 'getphonenumber'
    $event.detail.errMsg = 'getPhoneNumber:fail Error: ' + $event.detail.errorMessage
    this[method]($event)
  }

  return parseBaseApp(vm, {
    mocks,
    initRefs
  })
}
