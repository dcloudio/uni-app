import { extend } from '@vue/shared'
import { type LaunchOptions, createLaunchOptions } from '@dcloudio/uni-core'
import type { ComponentInternalInstance } from 'vue'

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

export function getPageInstanceByChild(child: ComponentInternalInstance) {
  let pageInstance = child
  while (pageInstance.type?.name !== 'Page') {
    pageInstance = pageInstance.parent!
  }
  return pageInstance
}
