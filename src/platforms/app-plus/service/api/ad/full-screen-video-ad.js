const eventNames = [
  'load',
  'close',
  'error'
]

class FullScreenVideoAd {
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
    this._lastLoadTime = 0

    const ad = this._ad = plus.ad.createFullScreenVideoAd(options)
    ad.onLoad((e) => {
      this._isLoad = true
      this._lastLoadTime = Date.now()
      this._dispatchEvent('load', {})

      if (this._loadPromiseResolve != null) {
        this._loadPromiseResolve()
        this._loadPromiseResolve = null
      }
    })
    ad.onClose((e) => {
      this._isLoad = false
      this._dispatchEvent('close', { isEnded: e.isEnded })
    })
    ad.onError((e) => {
      const { code, message } = e
      const data = { code: code, errMsg: message }
      this._adError = message
      if (code === -5008) {
        this._isLoad = false
      }
      this._dispatchEvent('error', data)

      if (this._loadPromiseReject != null) {
        this._loadPromiseReject(data)
        this._loadPromiseReject = null
      }
    })
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

export function createFullScreenVideoAd (options) {
  return new FullScreenVideoAd(options)
}
