import {
  hasLifecycleHook
} from 'uni-helpers/index'

function onAppRoute (type, {
  url,
  delta,
  animationType,
  animationDuration,
  from = 'navigateBack',
  detail
} = {}) {
  const router = getApp().$router
  switch (type) {
    case 'redirectTo':
      router.replace({
        type,
        path: url
      })
      break
    case 'navigateTo':
      router.push({
        type,
        path: url,
        animationType,
        animationDuration
      })
      break
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
