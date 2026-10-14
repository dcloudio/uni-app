import parseBaseApp from './app-base-parser'

import {
  mocks,
  initRefs
} from './util'

function addLeadingSlash (path) {
  return path.charAt(0) === '/' ? path : '/' + path
}

export default function parseApp (vm) {
  const appOptions = parseBaseApp(vm, {
    mocks,
    initRefs
  })
  appOptions.restart = function restart (options = {}) {
    wx.restartMiniProgram({
      path: options.url || addLeadingSlash(wx.getLaunchOptionsSync().path)
    })
  }
  return appOptions
}
