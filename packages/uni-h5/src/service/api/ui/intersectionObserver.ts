import {
  type AddIntersectionObserverArgs,
  type RemoveIntersectionObserverArgs,
  requestComponentObserver,
} from '@dcloudio/uni-api'
//#if _X_VAPOR_
import {
  type VaporComponentInstance,
  querySelectorAllInComponent,
  querySelectorInComponent,
} from 'vue'
import { getPageBody } from '../../../helpers/pageBody'
import { normalizePageSelector } from '../../../helpers/pageSelector'
// 观察器跟随组件实例保存，避免根节点切换后无法断开连接。
const componentObservers = new WeakMap<
  VaporComponentInstance,
  Map<number, IntersectionObserver>
>()
//#else
import { findElem } from '../../../platform/dom'
//#endif

export function addIntersectionObserver(
  { reqId, component, options, callback }: AddIntersectionObserverArgs,
  _pageId?: number
) {
  //#if _X_VAPOR_
  const instance = component.$ as unknown as VaporComponentInstance
  const observer = requestComponentObserver(
    {
      querySelector(selector) {
        const normalizedSelector = normalizePageSelector(selector)
        const pageBody =
          normalizedSelector !== selector &&
          component.$.$pageInstance === component.$
            ? getPageBody(component.$)
            : undefined
        return pageBody
          ? pageBody.matches(normalizedSelector)
            ? pageBody
            : pageBody.querySelector(normalizedSelector)
          : querySelectorInComponent(instance, normalizedSelector)
      },
      querySelectorAll(selector) {
        const normalizedSelector = normalizePageSelector(selector)
        const pageBody =
          normalizedSelector !== selector &&
          component.$.$pageInstance === component.$
            ? getPageBody(component.$)
            : undefined
        return pageBody
          ? [
              ...(pageBody.matches(normalizedSelector) ? [pageBody] : []),
              ...pageBody.querySelectorAll(normalizedSelector),
            ]
          : querySelectorAllInComponent(instance, normalizedSelector)
      },
    },
    options,
    callback
  )
  let observers = componentObservers.get(instance)
  if (!observers) {
    componentObservers.set(instance, (observers = new Map()))
  }
  observers.set(reqId, observer)
  //#else
  // TODO 非 Vapor 仍依赖单个 $el，尚未适配组件多根节点查询。
  const $el = findElem(component)
  ;($el.__io || ($el.__io = {}))[reqId] = requestComponentObserver(
    $el,
    options,
    callback
  )
  //#endif
}

export function removeIntersectionObserver(
  { reqId, component }: RemoveIntersectionObserverArgs,
  _pageId?: number
) {
  //#if _X_VAPOR_
  const instance = component.$ as unknown as VaporComponentInstance
  const observers = componentObservers.get(instance)
  if (!observers) {
    return
  }
  const observer = observers.get(reqId)
  if (observer) {
    observer.disconnect()
    observers.delete(reqId)
    if (!observers.size) {
      componentObservers.delete(instance)
    }
  }
  //#else
  const $el = findElem(component)
  const intersectionObserver = $el.__io && $el.__io[reqId]
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    delete $el.__io[reqId]
  }
  //#endif
}
