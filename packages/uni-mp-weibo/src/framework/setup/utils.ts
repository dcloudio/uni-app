import { extend } from '@vue/shared'
import { createLaunchOptions, LaunchOptions } from '@dcloudio/uni-core'

const launchOptions: LaunchOptions = /*#__PURE__*/ createLaunchOptions()

const enterOptions: LaunchOptions = /*#__PURE__*/ createLaunchOptions()

export function getEnterOptions() {
  return extend({}, enterOptions)
}

export function getLaunchOptions() {
  return extend({}, launchOptions)
}

export function initLaunchOptions({
  path,
  query,
}: {
  path: string
  query: Record<string, any>
}) {
  extend(launchOptions, {
    path,
    query,
  })
  extend(enterOptions, launchOptions)
  return extend({}, launchOptions)
}
