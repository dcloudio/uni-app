import { parseUrl } from '@dcloudio/uni-shared'
import { isNavigationFailure, Router } from 'vue-router'
import { createPageState } from '../../../framework/setup/page'

export type NavigateType =
  | 'navigateTo'
  | 'redirectTo'
  | 'reLaunch'
  | 'switchTab'

export function navigate(
  type: NavigateType,
  url: string,
  __id__?: number
): Promise<undefined> {
  const router = getApp().$router as Router
  const { path, query } = parseUrl(url)
  return new Promise((resolve, reject) => {
    router[type === 'navigateTo' ? 'push' : 'replace']({
      path,
      query,
      force: true,
      state: createPageState(type, __id__),
    }).then((failure) => {
      if (isNavigationFailure(failure)) {
        return reject(failure.message)
      }
      return resolve(undefined)
    })
  })
}
