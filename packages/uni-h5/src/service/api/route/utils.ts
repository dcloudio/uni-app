import { isNavigationFailure, Router } from 'vue-router'
import { createPageState } from '../../../framework/plugin/page'

export function navigate(
  type: 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab',
  url: string,
  callback: Function
) {
  const router = getApp().$router as Router
  router[type === 'navigateTo' ? 'push' : 'replace']({
    path: url,
    force: true,
    state: createPageState(type),
  }).then((failure) => {
    if (isNavigationFailure(failure)) {
      return callback({
        errMsg: `:fail ${failure.message}`,
      })
    }
    callback()
  })
}
