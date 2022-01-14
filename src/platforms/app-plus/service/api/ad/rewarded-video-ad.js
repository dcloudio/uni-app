const eventNames = [
  'load',
  'close',
  'verify',
  'error',
  'adClicked'
]

const ERROR_CODE_LIST = [-5001, -5002, -5003, -5004, -5005, -5006]
const EXPIRED_TIME = 1000 * 60 * 30
const EXPIRED_TEXT = { code: -5008, errMsg: '广告数据已过期，请重新加载' }
const ProviderType = { CSJ: 'csj', GDT: 'gdt' }

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

    this._preload = options.preload !== undefined ? options.preload : true
    this._isLoad = false
    this._isLoading = false
    this._adError = ''
    this._loadPromiseResolve = null
    this._loadPromiseReject = null
    this._lastLoadTime = 0

    const rewardAd = this._rewardAd = plus.ad.createRewardedVideoAd(options)
    rewardAd.onLoad((e) => {
      this._isLoad = true
      this._isLoading = false
      this._lastLoadTime = Date.now()
      this._dispatchEvent('load', {})

      if (this._loadPromiseResolve != null) {
        this._loadPromiseResolve()
        this._loadPromiseResolve = null
      }
    })
    rewardAd.onClose((e) => {
      this._isLoad = false
      this._isLoading = false
      if (this._preload) {
        this._loadAd()
      }
      this._dispatchEvent('close', { isEnded: e.isEnded })
    })
    rewardAd.onVerify && rewardAd.onVerify((e) => {
      this._dispatchEvent('verify', { isValid: e.isValid })
    })
    rewardAd.onError((e) => {
      this._isLoading = false
      const { code, message } = e
      const data = { code: code, errMsg: message }
      this._adError = message
      if (code === -5008) {
        this._isLoad = false
      }
      this._dispatchEvent('error', data)
      // TODO
      if ((code === -5005 || ERROR_CODE_LIST.index(code) === -1) && this._loadPromiseReject != null) {
        this._loadPromiseReject(data)
        this._loadPromiseReject = null
      }
    })
    rewardAd.onAdClicked((e) => {
      this._dispatchEvent('adClicked', {})
    })

    this._loadAd()
  }

  get isExpired () {
    return (this._lastLoadTime !== 0 && (Math.abs(Date.now() - this._lastLoadTime) > EXPIRED_TIME))
  }

  load () {
    return new Promise((resolve, reject) => {
      this._loadPromiseResolve = resolve
      this._loadPromiseReject = reject
      if (this._isLoading) {
        return
      }
      if (this._isLoad) {
        resolve()
        return
      }
      this._loadAd()
    })
  }

  show () {
    return new Promise((resolve, reject) => {
      if (this._isLoading) {
        return
      }

      const provider = this.getProvider()
      if (provider === ProviderType.CSJ && this.isExpired) {
        this._isLoad = false
        // TODO
        this._dispatchEvent('error', EXPIRED_TEXT)
        reject(new Error(EXPIRED_TEXT.errMsg))
        return
      }

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
    this._isLoading = true
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
