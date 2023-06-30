import {
  MPComponentInstance,
  MPComponentOptions,
  handleEvent,
} from '@dcloudio/uni-mp-core'

// import { handleLink } from '@dcloudio/uni-mp-weixin'

export { handleLink, initLifetimes } from '@dcloudio/uni-mp-weixin'

export const mocks = ['nodeId', 'componentPath', 'componentId']

export function isPage(mpInstance: MPComponentInstance) {
  return !!mpInstance.route
}

export function initRelation(
  mpInstance: MPComponentInstance,
  detail: Record<string, unknown>
) {
  // 小红书自定义组件从customEventMap取事件名
  mpInstance.customEventMap = {
    // @ts-ignore
    __l: '__l',
  }
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
    // console.log('触发了component事件', event)
    // @ts-ignore
    return handleEvent.call(this, event)
  }
}
