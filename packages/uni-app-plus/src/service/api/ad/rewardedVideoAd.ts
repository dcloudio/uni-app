import {
  API_CREATE_REWARDED_VIDEO_AD,
  type API_TYPE_CREATE_REWARDED_VIDEO_AD,
  CreateRewardedVideoAdOptions,
  CreateRewardedVideoAdProtocol,
  defineSyncApi,
} from '@dcloudio/uni-api'

import { AdBase } from './adBase'

class RewardedVideoAd extends AdBase implements UniApp.RewardedVideoAdContext {
  constructor(options: any) {
    super(plus.ad.createRewardedVideoAd(options), options)

    this._loadAd()
  }
}

export const createRewardedVideoAd =
  defineSyncApi<API_TYPE_CREATE_REWARDED_VIDEO_AD>(
    API_CREATE_REWARDED_VIDEO_AD,
    (options) => {
      return new RewardedVideoAd(options)
    },
    CreateRewardedVideoAdProtocol,
    CreateRewardedVideoAdOptions
  )
