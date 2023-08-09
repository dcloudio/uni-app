import {
  MPComponentInstance,
  MPComponentOptions,
  handleEvent,
} from '@dcloudio/uni-mp-core'
import { handleLink } from '@dcloudio/uni-mp-weixin'
// import { handleRef } from './util'

export { handleLink, initLifetimes } from '@dcloudio/uni-mp-weixin'

export const mocks = ['nodeId', 'componentPath', 'componentId']

export function isPage(mpInstance: MPComponentInstance) {
  return !!mpInstance.route
}

export function initRelation(
  mpInstance: MPComponentInstance,
  detail: Record<string, unknown>
) {
  // 依赖 __l 来做 provide inject
  mpInstance.customEventMap && Object.assign(mpInstance.customEventMap, {
    __l: '__l'
  })
  mpInstance.triggerEvent('__l', detail)
}
export function parse(componentOptions: MPComponentOptions) {
  const methods = componentOptions.methods as Record<
    string,
    (...args: any[]) => any
  >
  methods.__e = function (event: any) {
    const {
      currentTarget: { dataset },
    } = event
    dataset['eO'] = {
      // eslint-disable-next-line no-restricted-syntax
      ...dataset['eO'],
      tap: dataset['eO']?.tap || dataset['eO']?.click,
    }
    // @ts-ignore
    return handleEvent.call(this, event)
  }

  methods.__l = handleLink
}
