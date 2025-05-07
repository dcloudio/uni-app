import type {
  AddMediaQueryObserverArgs,
  RemoveMediaQueryObserverArgs,
} from '@dcloudio/uni-api'

function getEventName(reqId: number) {
  const EVENT_NAME = 'MediaQueryObserver'
  return `${EVENT_NAME}.${reqId}`
}

export function addMediaQueryObserver(
  { reqId, component, options, callback }: AddMediaQueryObserverArgs,
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
  { reqId, component }: RemoveMediaQueryObserverArgs,
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
