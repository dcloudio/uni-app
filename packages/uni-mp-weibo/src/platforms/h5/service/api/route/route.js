import {
  hasLifecycleHook,
  findExistsPageIndex
} from 'uni-helpers/index'

import {
  initEventChannel
} from 'uni-helpers/navigate-to'

const {
  invokeCallbackHandler: invoke
} = UniServiceJSBridge

function onAppRoute (type, {
  url,
  delta,
  events,
  exists,
  animationType,
  animationDuration,
  from = 'navigateBack',
  detail
} = {}) {
  const router = getApp().$router
  delete router.$eventChannel
  switch (type) {
    case 'redirectTo':
      if (exists === 'back') {
        const existsPageIndex = findExistsPageIndex(url)
        if (existsPageIndex !== -1) {
          const delta = (getCurrentPages().length - 1) - existsPageIndex
          if (delta > 0) {
            return onAppRoute('navigateBack', {
              delta
            })
          }
        }
      }
      router.replace({
        type,
        path: url
      })
      break
    case 'navigateTo':
      router.$eventChannel = initEventChannel(events)
      router.push({
        type,
        path: url,
        animationType,
        animationDuration
      })
      return {
        errMsg: type + ':ok',
        eventChannel: router.$eventChannel
      }
    case 'navigateBack':
      {
        let canBack = true
        const pages = getCurrentPages()
        if (pages.length) {
          const page = pages[pages.length - 1]
          if (hasLifecycleHook(page.$options, 'onBackPress') && page.__call_hook('onBackPress', {
            from
          }) === true) {
            canBack = false
          }
        }
        if (canBack) {
          if (delta > 1) {
            router._$delta = delta
          }
          router.go(-delta, {
            animationType,
            animationDuration
          })
        }
      }
      break
    case 'reLaunch':
      router.replace({
        type,
        path: url
      })
      break
    case 'switchTab':
      router.replace({
        type,
        path: url,
        params: {
          detail
        }
      })
      break
  }
  return {
    errMsg: type + ':ok'
  }
}

export function redirectTo (args) {
  return onAppRoute('redirectTo', args)
}

export function navigateTo (args) {
  return onAppRoute('navigateTo', args)
}

export function navigateBack (args) {
  return onAppRoute('navigateBack', args)
}

export function reLaunch (args) {
  return onAppRoute('reLaunch', args)
}

export function switchTab (args) {
  return onAppRoute('switchTab', args)
}

export function preloadPage ({
  url
}, callbackId) {
  const path = url.split('?')[0].replace(/\//g, '-')
  __uniConfig.__webpack_chunk_load__(path.substr(1)).then(() => {
    invoke(callbackId, {
      url,
      errMsg: 'preloadPage:ok'
    })
  }).catch(err => {
    invoke(callbackId, {
      url,
      errMsg: 'preloadPage:fail ' + err
    })
  })
}
