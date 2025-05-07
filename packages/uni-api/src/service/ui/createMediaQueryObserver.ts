import { isFunction } from '@vue/shared'
import { defineSyncApi } from '../../helpers/api'
import {
  addMediaQueryObserver,
  removeMediaQueryObserver,
} from '@dcloudio/uni-platform'
import type { ComponentPublicInstance } from 'vue'

export interface AddMediaQueryObserverArgs {
  reqId: number
  options: UniApp.DescriptorOptions
  component?: ComponentPublicInstance
  callback: WechatMiniprogram.MediaQueryObserverObserveCallback
}

export interface RemoveMediaQueryObserverArgs {
  reqId: number
  component?: ComponentPublicInstance
}

let reqComponentObserverId = 1

class ServiceMediaQueryObserver {
  private _reqId?: number

  observe(
    options: UniApp.DescriptorOptions,
    callback: WechatMiniprogram.MediaQueryObserverObserveCallback
  ) {
    if (!isFunction(callback)) {
      return
    }
    this._reqId = reqComponentObserverId++
    addMediaQueryObserver({
      reqId: this._reqId,
      options,
      callback,
    })
  }

  disconnect() {
    this._reqId &&
      removeMediaQueryObserver({
        reqId: this._reqId,
      })
  }
}

export const createMediaQueryObserver = defineSyncApi<
  typeof uni.createMediaQueryObserver
>('createMediaQueryObserver', () => {
  return new ServiceMediaQueryObserver()
})
