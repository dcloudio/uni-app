import {
  requireNativePlugin
} from '../../bridge'

import {
  eventTypes,
  eventNames
} from './ad-base.js'

const sdkCache = {}
const sdkQueue = {}

function initSDK (options) {
  const provider = options.provider
  if (!sdkCache[provider]) {
    sdkCache[provider] = {}
  }
  if (typeof sdkCache[provider].instance === 'object') {
    options.success(sdkCache[provider].instance)
    return
  }

  if (!sdkQueue[provider]) {
    sdkQueue[provider] = []
  }
  sdkQueue[provider].push(options)

  if (sdkCache[provider].loading === true) {
    options.__plugin = sdkCache[provider].plugin
    return
  }
  sdkCache[provider].loading = true
  const plugin = requireNativePlugin(provider) || {}
  const initFunction = plugin.init || plugin.initSDK
  if (!initFunction) {
    sdkQueue[provider].forEach((item) => {
      item.fail({
        code: -1,
        message: 'provider [' + provider + '] invalid'
      })
    })
    sdkQueue[provider].length = 0
    sdkCache[provider].loading = false
    return
  }
  sdkCache[provider].plugin = plugin
  options.__plugin = plugin
  initFunction((res) => {
    const code = res.code
    const isSuccess = (provider === 'BXM-AD') ? (code === 0 || code === 1) : (code === 0)
    if (isSuccess) {
      sdkCache[provider].instance = plugin
    } else {
      sdkCache[provider].loading = false
    }

    sdkQueue[provider].forEach((item) => {
      if (isSuccess) {
        item.success(item.__plugin)
      } else {
        item.fail(res)
      }
    })
    sdkQueue[provider].length = 0
  })
}

class InteractiveAd {
  constructor (options) {
    const _callbacks = this._callbacks = {}
    eventNames.forEach(item => {
      _callbacks[item] = []
      const name = item[0].toUpperCase() + item.substr(1)
      this[`on${name}`] = function (callback) {
        _callbacks[item].push(callback)
      }
    })

    this._ad = null
    this._adError = ''
    this._adpid = options.adpid
    this._provider = options.provider
    this._userData = options.userData || {}
    this._isLoaded = false
    this._isLoading = false
    this._loadPromiseResolve = null
    this._loadPromiseReject = null
    this._showPromiseResolve = null
    this._showPromiseReject = null

    setTimeout(() => {
      this._init()
    })
  }

  _init () {
    this._adError = ''
    initSDK({
      provider: this._provider,
      success: (res) => {
        this._ad = res
        if (this._userData) {
          this.bindUserData(this._userData)
        }
        this._loadAd()
      },
      fail: (err) => {
        this._adError = err
        this._dispatchEvent(eventTypes.error, err)
      }
    })
  }

  getProvider () {
    return this._provider
  }

  load () {
    return new Promise((resolve, reject) => {
      this._loadPromiseResolve = resolve
      this._loadPromiseReject = reject
      if (this._isLoading) {
        return
      }

      if (this._adError) {
        this._init()
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

      if (this._adError) {
        this._init()
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
    if (this._ad !== null && this._ad.destroy) {
      this._ad.destroy({
        adpid: this._adpid
      })
    }
  }

  bindUserData (data) {
    if (this._ad !== null && this._ad.bindUserData) {
      this._ad.bindUserData(data)
    }
  }

  _loadAd () {
    if (this._ad !== null) {
      if (this._isLoading === true) {
        return
      }
      this._isLoading = true

      this._ad.loadData({
        adpid: this._adpid,
        ...this._userData
      }, (res) => {
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

        this._dispatchEvent(eventTypes.load, res)
      }, (err) => {
        this._isLoading = false

        if (this._showPromiseReject != null) {
          this._showPromiseReject(this._createError(err))
          this._showPromiseReject = null
        }

        this._dispatchEvent(eventTypes.error, err)
      })
    }
  }

  _showAd () {
    if (this._ad !== null && this._isLoaded === true) {
      this._ad.show({
        adpid: this._adpid
      }, (res) => {
        this._isLoaded = false
      }, (err) => {
        this._isLoaded = false

        if (this._showPromiseReject != null) {
          this._showPromiseReject(this._createError(err))
          this._showPromiseReject = null
        }

        this._dispatchEvent(eventTypes.error, err)
      })
    }
  }

  _createError (err) {
    const error = new Error(JSON.stringify(err))
    error.code = err.code
    error.errMsg = err.message
    return error
  }

  _dispatchEvent (name, data) {
    this._callbacks[name].forEach(callback => {
      if (typeof callback === 'function') {
        callback(data || {})
      }
    })
  }
}

export function createInteractiveAd (options) {
  if (!options.provider) {
    return new Error('provider invalid')
  }
  if (!options.adpid) {
    return new Error('adpid invalid')
  }
  return new InteractiveAd(options)
}
