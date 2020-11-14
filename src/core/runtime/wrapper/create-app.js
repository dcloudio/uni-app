import Vue from 'vue'

import 'uni-platform/runtime/index'

import EventChannel from 'uni-helpers/EventChannel'

import parseApp from 'uni-platform/runtime/wrapper/app-parser'

import {
  getEventChannel
} from 'uni-helpers/navigate-to'

export default function createApp (vm) {
  Vue.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    if (__PLATFORM__ === 'mp-weixin') {
      return this.$scope.getOpenerEventChannel()
    }
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel()
    }
    return this.__eventChannel__
  }
  const callHook = Vue.prototype.__call_hook
  Vue.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__)
      delete args.__id__
    }
    return callHook.call(this, hook, args)
  }
  App(parseApp(vm))
  return vm
}
