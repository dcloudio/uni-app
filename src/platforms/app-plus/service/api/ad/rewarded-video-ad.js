
const eventNames = [
  'load',
  'close',
  'verify',
  'error'
]

const ERROR_CODE_LIST = [-5001, -5002, -5003, -5004, -5005, -5006]

class RewardedVideoAd {
  constructor (options = {}) {
    const _callbacks = this._callbacks = {}
    eventNames.forEach(item => {
      _callbacks[item] = []
      const name = item[0].toUpperCase() + item.substr(1)
      this[`on${name}`] = function (callback) {
        _callbacks[item].push(callback)
      }
    })

    this._isLoad = false
    this._adError = ''
    this._loadPromiseResolve = null
    this._loadPromiseReject = null
    const rewardAd = this._rewardAd = plus.ad.createRewardedVideoAd(options)
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
    rewardAd.onVerify((e) => {
      this._dispatchEvent('verify', { isValid: e.isValid })
    })
    rewardAd.onError((e) => {
      const { code, message } = e
      const data = { code: code, errMsg: message }
      this._adError = message
      this._dispatchEvent('error', data)
      if ((code === -5005 || ERROR_CODE_LIST.index(code) === -1) && this._loadPromiseReject != null) {
        this._loadPromiseReject(data)
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
        reject(new Error(this._adError))
      }
    })
  }
  getProvider () {
    return this._rewardAd.getProvider()
  }
  destroy () {
    this._rewardAd.destroy()
  }
  _loadAd () {
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

export function createRewardedVideoAd (options) {
  return new RewardedVideoAd(options)
}
