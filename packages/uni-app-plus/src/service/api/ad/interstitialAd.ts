import {
  defineSyncApi,
  API_CREATE_INTERSTITIAL_AD,
  API_TYPE_CREATE_INTERSTITIAL_AD,
  CreateInterstitialAdOptions,
  CreateInterstitialAdProtocol,
} from '@dcloudio/uni-api'

import { AdBase } from './adBase'

class InterstitialAd extends AdBase implements UniApp.InterstitialAdContext {
  constructor(options: any) {
    super(plus.ad.createInterstitialAd(options), options)

    this._loadAd()
  }
}

export const createInterstitialAd = <API_TYPE_CREATE_INTERSTITIAL_AD>(
  defineSyncApi(
    API_CREATE_INTERSTITIAL_AD,
    (options) => {
      return new InterstitialAd(options)
    },
    CreateInterstitialAdProtocol,
    CreateInterstitialAdOptions
  )
)
