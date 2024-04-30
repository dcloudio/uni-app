import {
  API_CREATE_INTERSTITIAL_AD,
  type API_TYPE_CREATE_INTERSTITIAL_AD,
  CreateInterstitialAdOptions,
  CreateInterstitialAdProtocol,
  defineSyncApi,
} from '@dcloudio/uni-api'

import { AdBase } from './adBase'

class InterstitialAd extends AdBase implements UniApp.InterstitialAdContext {
  constructor(options: any) {
    super(plus.ad.createInterstitialAd(options), options)
    this.preload = false
    this._loadAd()
  }
}

export const createInterstitialAd =
  defineSyncApi<API_TYPE_CREATE_INTERSTITIAL_AD>(
    API_CREATE_INTERSTITIAL_AD,
    (options) => {
      return new InterstitialAd(options)
    },
    CreateInterstitialAdProtocol,
    CreateInterstitialAdOptions
  )
