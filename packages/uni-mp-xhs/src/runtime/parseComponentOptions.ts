import {
  MPComponentInstance,
  MPComponentOptions,
  handleEvent,
} from '@dcloudio/uni-mp-core'
import { handleLink } from '@dcloudio/uni-mp-weixin'

export { handleLink, initLifetimes } from '@dcloudio/uni-mp-weixin'

export const mocks = ['nodeId', 'componentPath', 'componentId']

export function isPage(mpInstance: MPComponentInstance) {
  return !!mpInstance.route
}

export function initRelation(
  mpInstance: MPComponentInstance,
  detail: Record<string, unknown>
) {
  mpInstance.triggerEvent('__l', detail)
}
export function parse(componentOptions: MPComponentOptions) {
  const methods = componentOptions.methods as Record<
    string,
    (...args: any[]) => any
  >
  methods.__e = handleEvent
  methods.__l = handleLink 
}
