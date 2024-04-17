import type {
  AddIntersectionObserverArgs,
  RemoveIntersectionObserverArgs,
} from '@dcloudio/uni-api'

function getEventName(reqId: number) {
  const EVENT_NAME = 'IntersectionObserver'
  return `${EVENT_NAME}.${reqId}`
}

export function addIntersectionObserver(
  { reqId, component, options, callback }: AddIntersectionObserverArgs,
  _pageId: number
) {
  const eventName = getEventName(reqId)
  UniServiceJSBridge.invokeViewMethod(
    'addIntersectionObserver',
    {
      reqId,
      component: component.$el.nodeId,
      options,
      eventName,
    },
    _pageId
  )
  UniServiceJSBridge.subscribe(eventName, callback)
}

export function removeIntersectionObserver(
  { reqId, component }: RemoveIntersectionObserverArgs,
  _pageId: number
) {
  UniServiceJSBridge.invokeViewMethod(
    'removeIntersectionObserver',
    {
      reqId,
      component: component.$el.nodeId,
    },
    _pageId
  )
  UniServiceJSBridge.unsubscribe(getEventName(reqId))
}
