import {
  isFn
} from 'uni-shared'

function onAppRoute (type, {
  url,
  delta,
  from = 'navigateBack'
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
        path: url
      })
      break
    case 'navigateBack':
      let canBack = true
      const pages = getCurrentPages()
      if (pages.length) {
        const page = pages[pages.length - 1]
        if (isFn(page.$options.onBackPress) && page.$options.onBackPress.call(page, {
          from
        }) === true) {
          canBack = false
        }
      }
      if (canBack) {
        router.go(-delta)
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
        path: url
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
