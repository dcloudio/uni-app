const eventNames = [
  'load',
  'close',
  'error',
  'adClicked'
]

class InterstitialAd {
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
    this._isLoading = false
    this._adError = ''
    this._loadPromiseResolve = null
    this._loadPromiseReject = null

    const ad = this._ad = plus.ad.createInterstitialAd(options)
    ad.onLoad((e) => {
      this._isLoad = true
      this._isLoading = false
      this._dispatchEvent('load', {})

      if (this._loadPromiseResolve != null) {
        this._loadPromiseResolve()
        this._loadPromiseResolve = null
      }
    })
    ad.onClose((e) => {
      this._isLoad = false
      this._isLoading = false
      this._dispatchEvent('close', {})
    })
    ad.onError((e) => {
      this._isLoading = false

      const { code, message } = e
      const data = { code: code, errMsg: message }
      this._adError = message

      this._dispatchEvent('error', data)

      if (this._loadPromiseReject != null) {
        this._loadPromiseReject(data)
        this._loadPromiseReject = null
      }
    })
    ad.onAdClicked((e) => {
      this._dispatchEvent('adClicked', {})
    })
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

      if (this._isLoad) {
        this._ad.show()
        resolve()
      } else {
        reject(new Error(this._adError))
      }
    })
  }

  getProvider () {
    return this._ad.getProvider()
  }

  destroy () {
    this._ad.destroy()
  }

  _loadAd () {
    this._isLoad = false
    this._isLoading = true
    this._ad.load()
  }

  _dispatchEvent (name, data) {
    this._callbacks[name].forEach(callback => {
      if (typeof callback === 'function') {
        callback(data || {})
      }
    })
  }
}

export function createInterstitialAd (options) {
  return new InterstitialAd(options)
}
