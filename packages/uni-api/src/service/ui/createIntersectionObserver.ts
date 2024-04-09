import type { ComponentPublicInstance } from 'vue'
import { extend, isFunction } from '@vue/shared'
import { resolveComponentInstance } from '@dcloudio/uni-shared'
import { getCurrentPageVm, getPageIdByVm } from '@dcloudio/uni-core'
import {
  addIntersectionObserver,
  removeIntersectionObserver,
} from '@dcloudio/uni-platform'
import { defineSyncApi } from '../../helpers/api'
import type { RequestComponentObserverOptions } from '../../helpers/requestComponentObserver'

export interface AddIntersectionObserverArgs {
  reqId: number
  component: ComponentPublicInstance
  options: ServiceIntersectionObserverOptions
  callback: WechatMiniprogram.IntersectionObserverObserveCallback
}

export interface RemoveIntersectionObserverArgs {
  reqId: number
  component: ComponentPublicInstance
}

type ServiceIntersectionObserverOptions =
  UniApp.CreateIntersectionObserverOptions & RequestComponentObserverOptions

const defaultOptions = {
  thresholds: [0],
  initialRatio: 0,
  observeAll: false,
}

const MARGINS = ['top', 'right', 'bottom', 'left']

let reqComponentObserverId = 1

function normalizeRootMargin(margins: WechatMiniprogram.Margins = {}) {
  return MARGINS.map(
    (name) =>
      `${Number(margins[name as keyof WechatMiniprogram.Margins]) || 0}px`
  ).join(' ')
}
class ServiceIntersectionObserver {
  private _reqId?: number
  private _pageId: number
  private _component: ComponentPublicInstance
  private _options: ServiceIntersectionObserverOptions
  constructor(
    component: ComponentPublicInstance,
    options?: UniApp.CreateIntersectionObserverOptions
  ) {
    this._pageId = getPageIdByVm(component)!
    this._component = component
    this._options = extend({}, defaultOptions, options)
  }

  relativeTo(selector: string, margins?: WechatMiniprogram.Margins) {
    this._options.relativeToSelector = selector
    this._options.rootMargin = normalizeRootMargin(margins)
    return this
  }

  relativeToViewport(margins?: WechatMiniprogram.Margins) {
    this._options.relativeToSelector = undefined
    this._options.rootMargin = normalizeRootMargin(margins)
    return this
  }

  observe(
    selector: string,
    callback: WechatMiniprogram.IntersectionObserverObserveCallback
  ) {
    if (!isFunction(callback)) {
      return
    }
    this._options.selector = selector
    this._reqId = reqComponentObserverId++
    addIntersectionObserver(
      {
        reqId: this._reqId,
        component: this._component,
        options: this._options,
        callback,
      },
      this._pageId
    )
  }

  disconnect() {
    this._reqId &&
      removeIntersectionObserver(
        { reqId: this._reqId, component: this._component },
        this._pageId
      )
  }
}
export const createIntersectionObserver = defineSyncApi<
  typeof uni.createIntersectionObserver
>('createIntersectionObserver', (context?, options?) => {
  context = resolveComponentInstance(context)
  if (context && !getPageIdByVm(context)) {
    options = context
    context = null
  }
  if (context) {
    return new ServiceIntersectionObserver(context, options)
  }
  return new ServiceIntersectionObserver(getCurrentPageVm()!, options)
})
