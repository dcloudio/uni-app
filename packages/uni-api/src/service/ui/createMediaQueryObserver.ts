import type { ComponentPublicInstance } from 'vue'
import { isFunction } from '@vue/shared'
import { resolveComponentInstance } from '@dcloudio/uni-shared'
import { getCurrentPageVm, getPageIdByVm } from '@dcloudio/uni-core'
import { defineSyncApi } from '../../helpers/api'
import {
  addMediaQueryObserver,
  removeMediaQueryObserver,
} from '@dcloudio/uni-platform'

export interface AddMediaQueryObserverArgs {
  reqId: number
  component: ComponentPublicInstance
  options: UniApp.DescriptorOptions
  callback: WechatMiniprogram.MediaQueryObserverObserveCallback
}

export interface RemoveMediaQueryObserverArgs {
  reqId: number
  component: ComponentPublicInstance
}

let reqComponentObserverId = 1

class ServiceMediaQueryObserver {
  private _reqId?: number
  private _pageId: number
  private _component: ComponentPublicInstance

  constructor(component: ComponentPublicInstance) {
    // APP 平台 _pageId 不能为空，H5 不处理 _pageId 和 component
    this._pageId =
      component?.$page && (component.$page as Page.PageInstance['$page']).id
    this._component = component
  }

  observe(
    options: UniApp.DescriptorOptions,
    callback: WechatMiniprogram.MediaQueryObserverObserveCallback
  ) {
    if (!isFunction(callback)) {
      return
    }
    this._reqId = reqComponentObserverId++
    addMediaQueryObserver(
      {
        reqId: this._reqId,
        component: this._component,
        options,
        callback,
      },
      this._pageId
    )
  }

  disconnect() {
    this._reqId &&
      removeMediaQueryObserver(
        {
          reqId: this._reqId,
          component: this._component,
        },
        this._pageId
      )
  }
}

export const createMediaQueryObserver = defineSyncApi<
  typeof uni.createMediaQueryObserver
>('createMediaQueryObserver', (context?: any) => {
  context = resolveComponentInstance(context)
  if (context && !getPageIdByVm(context)) {
    context = null
  }
  if (context) {
    return new ServiceMediaQueryObserver(context)
  }
  return new ServiceMediaQueryObserver(getCurrentPageVm()!)
})
