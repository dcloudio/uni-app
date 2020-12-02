import {
  capitalize
} from 'uni-shared'

function showWindow (type, show) {
  const api = show ? 'show' : 'hide' + capitalize(type) + 'Window'
  const app = getApp()
  if (app) {
    const msg = app.$children[0].$refs.layout.showWindow(type, show)
    if (msg) {
      return {
        errMsg: `${api}:fail ${msg}`
      }
    }
    return {}
  }
  return {
    errMsg: `${api}:fail app not ready`
  }
}

export function showTopWindow () {
  return showWindow('top', true)
}

export function hideTopWindow () {
  return showWindow('top', false)
}

export function showLeftWindow () {
  return showWindow('left', true)
}

export function hideLeftWindow () {
  return showWindow('left', false)
}
export function showRightWindow () {
  return showWindow('right', true)
}

export function hideRightWindow () {
  return showWindow('right', false)
}

function setWindowStyle (type, style) {
  const api = 'set' + capitalize(type) + 'WindowStyle'
  const app = getApp()
  if (!app) {
    return {
      errMsg: `${api}:fail app not ready`
    }
  }
  const msg = app.$children[0].$refs.layout.setWindowStyle(type, style)
  if (msg) {
    return {
      errMsg: `${api}:fail ${msg}`
    }
  }
  return {}
}

export function setTopWindowStyle (style) {
  return setWindowStyle('top', style)
}
export function setLeftWindowStyle (style) {
  return setWindowStyle('left', style)
}
export function setRightWindowStyle (style) {
  return setWindowStyle('right', style)
}
