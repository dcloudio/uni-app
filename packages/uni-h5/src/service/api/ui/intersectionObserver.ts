import {
  type AddIntersectionObserverArgs,
  type RemoveIntersectionObserverArgs,
  requestComponentObserver,
} from '@dcloudio/uni-api'
import { findElem } from '../../../platform/dom'

export function addIntersectionObserver(
  { reqId, component, options, callback }: AddIntersectionObserverArgs,
  _pageId?: number
) {
  const $el = findElem(component)
  ;($el.__io || ($el.__io = {}))[reqId] = requestComponentObserver(
    $el,
    options,
    callback
  )
}

export function removeIntersectionObserver(
  { reqId, component }: RemoveIntersectionObserverArgs,
  _pageId?: number
) {
  const $el = findElem(component)
  const intersectionObserver = $el.__io && $el.__io[reqId]
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    delete $el.__io[reqId]
  }
}
