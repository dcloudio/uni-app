import {
  defineSyncApi,
  API_CREATE_FULL_SCREEN_VIDEO_AD,
  API_TYPE_CREATE_FULL_SCREEN_VIDEO_AD,
  CreateFullScreenVideoAdOptions,
  CreateFullScreenVideoAdProtocol,
} from '@dcloudio/uni-api'

import { AdBase } from './adBase'

class FullScreenVideoAd
  extends AdBase
  implements UniApp.FullScreenVideoAdContext
{
  constructor(options: any) {
    super(plus.ad.createFullScreenVideoAd(options), options)
    this.preload = false
  }
}

export const createFullScreenVideoAd =
  defineSyncApi<API_TYPE_CREATE_FULL_SCREEN_VIDEO_AD>(
    API_CREATE_FULL_SCREEN_VIDEO_AD,
    (options) => {
      return new FullScreenVideoAd(options)
    },
    CreateFullScreenVideoAdProtocol,
    CreateFullScreenVideoAdOptions
  )
