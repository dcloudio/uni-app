import type {
  AddMediaQueryObserverArgs,
  RemoveMediaQueryObserverArgs,
} from '@dcloudio/uni-api'
import type { ComponentPublicInstance } from 'vue'

function getEventName(reqId: number) {
  const EVENT_NAME = 'MediaQueryObserver'
  return `${EVENT_NAME}.${reqId}`
}

export function addMediaQueryObserver(
  {
    reqId,
    component,
    options,
    callback,
  }: AddMediaQueryObserverArgs & { component: ComponentPublicInstance },
  _pageId: number
) {
  const eventName = getEventName(reqId)
  UniServiceJSBridge.invokeViewMethod(
    'addMediaQueryObserver',
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

export function removeMediaQueryObserver(
  {
    reqId,
    component,
  }: RemoveMediaQueryObserverArgs & { component: ComponentPublicInstance },
  _pageId: number
) {
  UniServiceJSBridge.invokeViewMethod(
    'removeMediaQueryObserver',
    {
      reqId,
      component: component.$el.nodeId,
    },
    _pageId
  )
  UniServiceJSBridge.unsubscribe(getEventName(reqId))
}
