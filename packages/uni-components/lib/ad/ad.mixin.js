const ADType = {
  RewardedVideo: 'RewardedVideo',
  FullScreenVideo: 'FullScreenVideo',
  Interstitial: 'Interstitial'
}

const EventType = {
  Load: 'load',
  Close: 'close',
  Error: 'error'
}

const EXPIRED_TIME = 1000 * 60 * 30
const ProviderType = {
  CSJ: 'csj',
  GDT: 'gdt'
}

const RETRY_COUNT = 1

class AdBase {
  constructor (adInstance, options = {}) {
    this._isLoad = false
    this._isLoading = false
    this._isPlaying = false
    this._lastLoadTime = 0
    this._lastError = null
    this._retryCount = 0
    if (options.retry !== undefined) {
      this._retry = options.retry
    } else {
      this._retry = true
    }

    this._loadCallback = null
    this._closeCallback = null
    this._errorCallback = null

    const ad = this._ad = adInstance
    ad.onLoad((e) => {
      this._isLoading = false
      this._isLoad = true
      this._lastLoadTime = Date.now()

      this.onLoad()
    })
    ad.onClose((e) => {
      this._isLoad = false
      this._isPlaying = false
      this.onClose(e)
    })
    ad.onVerify && ad.onVerify((e) => {
      // e.isValid
    })
    ad.onError(({
      code,
      message
    }) => {
      this._isLoading = false
      const data = {
        code: code,
        errMsg: message
      }

      if (this._retry && code === -5008) {
        this._loadAd()
        return
      }

      if (this._retry && this._retryCount < RETRY_COUNT) {
        this._retryCount += 1
        this._loadAd()
        return
      }

      this._lastError = data
      this.onError(data)
    })
  }

  get isExpired () {
    return (this._lastLoadTime !== 0 && (Math.abs(Date.now() - this._lastLoadTime) > EXPIRED_TIME))
  }

  get isLoad () {
    return this._isLoad
  }

  get isLoading () {
    return this._isLoading
  }

  getProvider () {
    return this._ad.getProvider()
  }

  load (onload, onerror) {
    this._loadCallback = onload
    this._errorCallback = onerror

    if (this._isPlaying) {
      onerror && onerror()
      return
    }

    if (this._isLoading) {
      return
    }

    if (this._isLoad) {
      this.onLoad()
      return
    }

    this._retryCount = 0

    this._loadAd()
  }

  show (onclose, onshow) {
    this._closeCallback = onclose

    if (this._isLoading || this._isPlaying || !this._isLoad) {
      return
    }

    if (this._lastError !== null) {
      this.onError(this._lastError)
      return
    }

    const provider = this.getProvider()
    if (provider === ProviderType.CSJ && this.isExpired) {
      if (this._retry) {
        this._loadAd()
      } else {
        this.onError(this._lastError)
      }
      return
    }

    this._isPlaying = true
    this._ad.show()
    onshow && onshow()
  }

  onLoad (e) {
    if (this._loadCallback != null) {
      this._loadCallback()
    }
  }

  onClose (e) {
    if (this._closeCallback != null) {
      this._closeCallback({
        isEnded: e.isEnded
      })
    }
  }

  onError (e) {
    if (this._errorCallback != null) {
      this._errorCallback(e)
    }
  }

  destroy () {
    this._ad.destroy()
  }

  _loadAd () {
    this._isLoad = false
    this._isLoading = true
    this._lastError = null
    this._ad.load()
  }
}

class RewardedVideo extends AdBase {
  constructor (options = {}) {
    super(plus.ad.createRewardedVideoAd(options), options)
  }
}

class FullScreenVideo extends AdBase {
  constructor (options = {}) {
    super(plus.ad.createFullScreenVideoAd(options), options)
  }
}

class Interstitial extends AdBase {
  constructor (options = {}) {
    super(plus.ad.createInterstitialAd(options), options)
  }
}

class AdHelper {
  constructor (adType) {
    this._ads = {}
    this._adType = adType
    this._lastWaterfallIndex = -1
  }

  load (options, onload, onerror) {
    if (!options.adpid || this.isBusy(options.adpid)) {
      return
    }

    this.get(options).load(onload, onerror)
  }

  show (options, onload, onerror, onclose, onshow) {
    const ad = this.get(options)

    if (ad.isLoad) {
      this._lastWaterfallIndex = -1
      ad.show((e) => {
        onclose && onclose(e)
      }, () => {
        onshow && onshow()
      })
    } else {
      ad.load(() => {
        this._lastWaterfallIndex = -1
        onload && onload()
        ad.show((e) => {
          onclose && onclose(e)
        }, () => {
          onshow && onshow()
        })
      }, (err) => {
        onerror && onerror(err)
      })
    }
  }

  // 底价预载逻辑
  loadWaterfall (options, onload, onfail, index = 0) {
    const {
      adpid,
      urlCallback
    } = options
    if (!Array.isArray(adpid)) {
      return
    }

    const options2 = {
      adpid: adpid[index],
      urlCallback,
      retry: false
    }

    console.log('ad.loadWaterfall::index=' + index)

    this.load(options2, (res) => {
      this._lastWaterfallIndex = index
      onload(options2)
    }, (err) => {
      index++
      if (index >= adpid.length) {
        onfail(err)
      } else {
        this.loadWaterfall(options, onload, onfail, index)
      }
    })
  }

  // 底价逻辑，失败后下一个，无重试机制
  showWaterfall (options, onload, onfail, onclose, onshow, index = 0) {
    const {
      adpid,
      urlCallback
    } = options
    if (!Array.isArray(adpid)) {
      return
    }

    if (this._lastWaterfallIndex > -1) {
      index = this._lastWaterfallIndex
    }

    const options2 = {
      adpid: adpid[index],
      urlCallback,
      retry: false
    }

    console.log('ad.showWaterfall::index=' + index)

    this.show(options2, () => {
      onload()
    }, (err) => {
      index++
      if (index >= adpid.length) {
        onfail(err)
      } else {
        this.showWaterfall(options, onload, onfail, onclose, onshow, index)
      }
    }, (res) => {
      onclose(res)
    }, () => {
      onshow()
    })
  }

  // 预载底价瀑布流
  preloadWaterfall (options, index = 0, step = 1) {
    if (step === 1) {
      this.loadWaterfall(options, (res) => {
        console.log('preloadWaterfall.success::', res)
      }, (err) => {
        console.log('loadWaterfall.fail', err)
      })
      return
    }

    const {
      adpid,
      urlCallback
    } = options
    for (let i = 0; i < step; i++) {
      if (index < adpid.length) {
        const options2 = {
          adpid: adpid[index],
          urlCallback
        }
        this.loadWaterfall(options2, (res) => {
          console.log('preloadWaterfall.success::', res)
        }, (err) => {
          console.log('loadWaterfall.fail', err)
          this.preloadWaterfall(options, index, step)
        })
        index++
      } else {
        break
      }
    }
  }

  isBusy (adpid) {
    return (this._ads[adpid] && this._ads[adpid].isLoading)
  }

  get (options) {
    const {
      adpid
    } = options

    if (!this._ads[adpid]) {
      this._ads[adpid] = this._createInstance(options)
    }

    return this._ads[adpid]
  }

  getProvider (adpid) {
    if (this._ads[adpid]) {
      return this._ads[adpid].getProvider()
    }
    return null
  }

  remove (adpid) {
    if (this._ads[adpid]) {
      this._ads[adpid].destroy()
      delete this._ads[adpid]
    }
  }

  _createInstance (options) {
    const adType = options.adType || this._adType
    delete options.adType

    let ad = null
    if (adType === ADType.RewardedVideo) {
      ad = new RewardedVideo(options)
    } else if (adType === ADType.FullScreenVideo) {
      ad = new FullScreenVideo(options)
    } else if (adType === ADType.Interstitial) {
      ad = new Interstitial(options, true)
    }

    return ad
  }
}

export default {
  props: {
    options: {
      type: [Object, Array],
      default () {
        return {}
      }
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    adpid: {
      type: [Number, String, Array],
      default: ''
    },
    preload: {
      type: [Boolean, String],
      default: true
    },
    loadnext: {
      type: [Boolean, String],
      default: false
    },
    urlCallback: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      loading: false,
      errorMessage: null
    }
  },
  created() {
    this.$watch('adpid', (newValue, oldValue) => {
      this._removeInstance(oldValue)
      if (this.preload) {
        this._loadAd()
      }
    })

    // 服务器回调透传参数，仅在创建广告实例时可传递参数，如果发生变化需要重新创建广告实例
    this.$watch('urlCallback', () => {
      this._removeInstance()
    })
    
    this._adHelper = new AdHelper(this.adType)
    
    setTimeout(() => {
      if (this.preload) {
        this._loadAd()
      }
    }, 100)
  },
  methods: {
    load () {
      if (this.isLoading) {
        return
      }
      this._startLoading()
      const invoke = this._isWaterfall() ? 'loadWaterfall' : 'load'
      this._adHelper[invoke](this._getAdOptions(), () => {
        this._onLoad()
      }, (err) => {
        this._onLoadFail(err)
      })
    },

    show () {
      if (this.isLoading) {
        return
      }
      this._startLoading()
      const invoke = this._isWaterfall() ? 'showWaterfall' : 'show'
      this._adHelper[invoke](this._getAdOptions(), () => {
        this._onLoad()
      }, (err) => {
        this._onLoadFail(err)
      }, (res) => {
        this._dispatchEvent(EventType.Close, res)

        if (this.loadnext) {
          this.load()
        }
      }, () => {
        // show
        this.loading = false
      })
    },

    getProvider () {
      if (Array.isArray(this.adpid)) {
        return null
      }
      return this._adHelper.getProvider(this.adpid)
    },

    _loadAd () {
      if (this._canCreateAd()) {
        this.load()
      }
    },

    _onclick () {
      if (!this.disabled) {
        this.show()
      }
    },

    _getAdOptions () {
      return {
        adpid: this.adpid,
        urlCallback: this.urlCallback
      }
    },

    _isWaterfall () {
      return (Array.isArray(this.adpid) && this.adpid.length > 0)
    },

    _canCreateAd () {
      let result = false
      if (Array.isArray(this.adpid) && this.adpid.length > 0) {
        result = true
      } else if (typeof this.adpid === 'string' && this.adpid.length > 0) {
        result = true
      } else if (typeof this.adpid === 'number') {
        result = true
      }
      return result
    },

    _removeInstance (adpid) {
      const id = adpid || this.adpid
      if (Array.isArray(id)) {
        id.forEach((item) => {
          this._adHelper.remove(item)
        })
      } else if (id) {
        this._adHelper.remove(id)
      }
    },

    _startLoading () {
      this.loading = true
      this.errorMessage = null
    },

    _onLoad () {
      this.loading = false
      this._dispatchEvent(EventType.Load, {})
    },

    _onLoadFail (err) {
      this.loading = false
      this.errorMessage = JSON.stringify(err)
      this._dispatchEvent(EventType.Error, err)
    },

    _dispatchEvent (type, data) {
      this.$emit(type, {
        detail: data
      })
    }
  }
}
