import {
  AdBase
} from './ad-base.js'

class InterstitialAd extends AdBase {
  constructor (options = {}) {
    super(plus.ad.createInterstitialAd(options), options)

    this._loadAd()
  }
}

export function createInterstitialAd (options) {
  return new InterstitialAd(options)
}
