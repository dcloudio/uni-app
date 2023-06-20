import {
  AdBase
} from './ad-base.js'

class FullScreenVideoAd extends AdBase {
  constructor (options = {}) {
    super(plus.ad.createFullScreenVideoAd(options), options)
  }
}

export function createFullScreenVideoAd (options) {
  return new FullScreenVideoAd(options)
}
