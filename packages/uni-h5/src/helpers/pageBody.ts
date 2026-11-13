import {
  type ComponentInternalInstance,
  onActivated,
  onBeforeDeactivate,
} from 'vue'
import { getPageInstanceByChild } from '@dcloudio/uni-core'

// 使用页面实例上的引用，避免相同路由、缓存页和弹页之间误选节点。
export function getPageBody(instance: ComponentInternalInstance) {
  return (
    getPageInstanceByChild(instance) as
      | (ComponentInternalInstance & { __pageBodyEl?: HTMLElement | null })
      | null
  )?.__pageBodyEl
}

export function usePageBodyScrollPosition(instance: ComponentInternalInstance) {
  let position: { left: number; top: number } | undefined
  onBeforeDeactivate(() => {
    const body = getPageBody(instance)
    if (body) {
      position = { left: body.scrollLeft, top: body.scrollTop }
    }
  })
  onActivated(() => {
    const body = getPageBody(instance)
    if (body && position) {
      body.scrollLeft = position.left
      body.scrollTop = position.top
    }
  })
}
