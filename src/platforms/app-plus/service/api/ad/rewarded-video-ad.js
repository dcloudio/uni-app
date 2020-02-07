
const eventNames = [
  'load',
  'close',
  'error'
]

class RewardedVideoAd {
  constructor (adpid) {
    this._options = {
      adpid: adpid
    }

    const _callbacks = this._callbacks = {}
    eventNames.forEach(item => {
      _callbacks[item] = []
      const name = item[0].toUpperCase() + item.substr(1)
      this[`on${name}`] = function (callback) {
        _callbacks[item].push(callback)
      }
    })

    this._isLoad = false
    this._adError = false
    this._loadPromiseResolve = null
    this._loadPromiseReject = null
    const rewardAd = this._rewardAd = plus.ad.createRewardedVideoAd(this._options)
    rewardAd.onLoad((e) => {
      this._isLoad = true
      this._dispatchEvent('load', {})
      if (this._loadPromiseResolve != null) {
        this._loadPromiseResolve()
        this._loadPromiseResolve = null
      }
    })
    rewardAd.onClose((e) => {
      this._loadAd()
      this._dispatchEvent('close', { isEnded: e.isEnded })
    })
    rewardAd.onError((e) => {
      const { code } = e
      this._adError = (code && code < 5005)
      this._dispatchEvent('error', e)
      if (code === 5005 && this._loadPromiseReject != null) {
        this._loadPromiseReject(e)
        this._loadPromiseReject = null
      }
    })
    this._loadAd()
  }
  load () {
    return new Promise((resolve, reject) => {
      if (this._isLoad) {
        resolve()
        return
      }
      this._loadPromiseResolve = resolve
      this._loadPromiseReject = reject
      this._loadAd()
    })
  }
  show () {
    return new Promise((resolve, reject) => {
      if (this._isLoad) {
        this._rewardAd.show()
        resolve()
      } else {
        reject(new Error(''))
      }
    })
  }
  _loadAd () {
    if (this._adError) {
      return
    }
    this._isLoad = false
    this._rewardAd.load()
  }
  _dispatchEvent (name, data) {
    this._callbacks[name].forEach(callback => {
      if (typeof callback === 'function') {
        callback(data || {})
      }
    })
  }
}

export function createRewardedVideoAd ({
  adpid = ''
} = {}) {
  return new RewardedVideoAd(adpid)
}
