import { isNavigationFailure, Router } from 'vue-router'
import { createPageState } from '../../../framework/plugin/page'

export function navigate(
  type: 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab',
  url: string
): Promise<undefined> {
  const router = getApp().$router as Router
  return new Promise((resolve, reject) => {
    router[type === 'navigateTo' ? 'push' : 'replace']({
      path: url,
      force: true,
      state: createPageState(type),
    }).then((failure) => {
      if (isNavigationFailure(failure)) {
        return reject(failure.message)
      }
      return resolve(undefined)
    })
  })
}
