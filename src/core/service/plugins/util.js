import {
  isFn
} from 'uni-shared'

function callHook (vm, hook, params) {
  return isFn(vm.$options[hook]) && vm.$options[hook].apply(vm, params)
}

export function callAppHook (vm, hook, ...params) {
  if (hook !== 'onError') {
    console.debug(`App：${hook} have been invoked` + (params.length ? ` ${JSON.stringify(params)}` : ''))
  }
  return callHook(vm, hook, params)
}

export function callPageHook (vm, hook, ...params) {
  // hack 一下，H5 平台通知 View 层onShow，方便 View 层来切换 scroll 事件监听
  if (__PLATFORM__ === 'h5') {
    if (hook === 'onLoad') {
      vm.$mp.query = params[0]
      UniServiceJSBridge.publishHandler('onPageLoad', vm, vm.$page.id)
    }
    if (hook === 'onShow') {
      UniServiceJSBridge.publishHandler('onPageShow', vm, vm.$page.id)
    }
  }
  if (hook !== 'onPageScroll') {
    console.debug(`${vm.$page.route}[${vm.$page.id}]：${hook} have been invoked`)
  }
  return callHook(vm, hook, params)
}
