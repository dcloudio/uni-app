import { extend } from '@vue/shared'

import { ServiceJSBridge } from '@dcloudio/uni-core'

import { API_TYPE_RETURN, createApi } from '../../helpers/api'
import { getCurrentPageVm } from '../utils'

const defaultOptions = {
  thresholds: [0],
  initialRatio: 0,
  observeAll: false,
}

interface Margins {
  bottom?: number
  left?: number
  right?: number
  top?: number
}

interface RelativeInfo {
  selector: string
  margins: Margins
}

type ObserveResultCallback = (result: UniApp.ObserveResult) => void

interface requestComponentObserver {
  reqId: number
  reqEnd: boolean
  res: UniApp.ObserveResult
}

let reqComponentObserverId = 1

const reqComponentObserverCallbacks: Record<number, ObserveResultCallback> = {}

ServiceJSBridge.subscribe(
  'requestComponentObserver',
  ({ reqId, reqEnd, res }: requestComponentObserver) => {
    const callback = reqComponentObserverCallbacks[reqId]
    if (callback) {
      if (reqEnd) {
        return delete reqComponentObserverCallbacks[reqId]
      }
      callback(res)
    }
  }
)

class ServiceIntersectionObserver {
  private _reqId?: number
  private _options: UniApp.CreateIntersectionObserverOptions
  private _component: any
  private _pageId: number

  private _relativeInfo: RelativeInfo[]

  constructor(
    component: any,
    options: UniApp.CreateIntersectionObserverOptions
  ) {
    this._pageId = component.$page.id
    this._component = component._$id || component // app-plus 平台传输_$id
    this._options = extend({}, defaultOptions, options || {})
    this._relativeInfo = []
  }

  relativeTo(selector: string, margins: Margins) {
    if (this._reqId) {
      throw new Error(
        'Relative nodes cannot be added after "observe" call in IntersectionObserver'
      )
    }
    this._relativeInfo.push({
      selector,
      margins,
    })
    return this
  }

  relativeToViewport(margins: Margins) {
    return this.relativeTo((null as unknown) as string, margins)
  }

  observe(selector: string, callback: ObserveResultCallback) {
    if (typeof callback !== 'function') {
      return
    }
    if (this._reqId) {
      throw new Error(
        '"observe" call can be only called once in IntersectionObserver'
      )
    }

    this._reqId = reqComponentObserverId++
    reqComponentObserverCallbacks[this._reqId] = callback

    UniServiceJSBridge.publishHandler(
      'addIntersectionObserver',
      {
        selector,
        reqId: this._reqId,
        component: this._component,
        options: this._options,
        relativeInfo: this._relativeInfo,
      },
      this._pageId
    )
  }

  disconnect() {
    UniServiceJSBridge.publishHandler(
      'removeIntersectionObserver',
      {
        reqId: this._reqId,
      },
      this._pageId
    )
  }
}

export const createIntersectionObserver = createApi<
  typeof uni.createIntersectionObserver
>({ type: API_TYPE_RETURN }, (context?, options?) => {
  if (!context) {
    context = getCurrentPageVm()
  }
  return new ServiceIntersectionObserver(context, options)
})
