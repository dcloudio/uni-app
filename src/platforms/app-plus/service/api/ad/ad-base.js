const eventTypes = {
  load: 'load',
  close: 'close',
  error: 'error',
  adClicked: 'adClicked'
}

const eventNames = [
  eventTypes.load,
  eventTypes.close,
  eventTypes.error,
  eventTypes.adClicked
]

class AdBase {
  constructor (adInstance, options) {
    const _callbacks = this._callbacks = {}
    eventNames.forEach(item => {
      _callbacks[item] = []
      const name = item[0].toUpperCase() + item.substr(1)
      this[`on${name}`] = function (callback) {
        _callbacks[item].push(callback)
      }
    })

    this._preload = options.preload !== undefined ? options.preload : false

    this._isLoaded = false
    this._isLoading = false
    this._adError = ''
    this._loadPromiseResolve = null
    this._loadPromiseReject = null
    this._showPromiseResolve = null
    this._showPromiseReject = null

    const ad = this._ad = adInstance
    ad.onLoad((e) => {
      this._isLoaded = true
      this._isLoading = false

      if (this._loadPromiseResolve != null) {
        this._loadPromiseResolve()
        this._loadPromiseResolve = null
      }
      if (this._showPromiseResolve != null) {
        this._showPromiseResolve()
        this._showPromiseResolve = null
        this._showAd()
      }

      this._dispatchEvent(eventTypes.load, {})
    })
    ad.onClose((e) => {
      this._isLoaded = false
      this._isLoading = false
      this._dispatchEvent(eventTypes.close, { isEnded: e.isEnded })

      if (this._preload === true) {
        this._loadAd()
      }
    })
    ad.onError((e) => {
      this._isLoading = false

      const data = {
        code: e.code,
        errMsg: e.message
      }

      this._adError = data

      this._dispatchEvent(eventTypes.error, data)

      const error = new Error(JSON.stringify(this._adError))
      error.code = e.code
      error.errMsg = e.message

      if (this._loadPromiseReject != null) {
        this._loadPromiseReject(error)
        this._loadPromiseReject = null
      }

      if (this._showPromiseReject != null) {
        this._showPromiseReject(error)
        this._showPromiseReject = null
      }
    })
    ad.onAdClicked && ad.onAdClicked((e) => {
      this._dispatchEvent(eventTypes.adClicked, {})
    })
  }

  load () {
    return new Promise((resolve, reject) => {
      this._loadPromiseResolve = resolve
      this._loadPromiseReject = reject
      if (this._isLoading) {
        return
      }

      if (this._isLoaded) {
        resolve()
      } else {
        this._loadAd()
      }
    })
  }

  show () {
    return new Promise((resolve, reject) => {
      this._showPromiseResolve = resolve
      this._showPromiseReject = reject

      if (this._isLoading) {
        return
      }

      if (this._isLoaded) {
        this._showAd()
        resolve()
      } else {
        this._loadAd()
      }
    })
  }

  destroy () {
    this._ad.destroy()
  }

  getProvider () {
    return this._ad.getProvider()
  }

  _loadAd () {
    this._adError = ''
    this._isLoaded = false
    this._isLoading = true
    this._ad.load()
  }

  _showAd () {
    this._ad.show()
  }

  _dispatchEvent (name, data) {
    this._callbacks[name].forEach(callback => {
      if (typeof callback === 'function') {
        callback(data || {})
      }
    })
  }
}

export {
  eventTypes,
  eventNames,
  AdBase
}
