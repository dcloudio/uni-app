import { extend } from '@vue/shared'
import { createLaunchOptions, LaunchOptions } from '@dcloudio/uni-core'

const launchOptions: LaunchOptions = createLaunchOptions()

const enterOptions: LaunchOptions = createLaunchOptions()

export function getEnterOptions() {
  return enterOptions
}

export function getLaunchOptions() {
  return launchOptions
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
  return launchOptions
}
