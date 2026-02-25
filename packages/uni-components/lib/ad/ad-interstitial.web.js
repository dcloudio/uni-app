const EventType = {
  Load: 'load',
  Close: 'close',
  Error: 'error'
}

export default {
  props: {
    options: {
      type: [Object, Array],
      default () {
        return {}
      }
    },
    adpid: {
      type: [Number, String],
      default: ''
    },
    preload: {
      type: [Boolean, String],
      default: true
    },
    loadnext: {
      type: [Boolean, String],
      default: false
    }
  },
  watch: {
    adpid (val) {
      if (val) {
        this._loadData(val)
      }
    }
  },
  data () {
    return {
      loading: false,
      errorMessage: null
    }
  },
  created () {
    this._pc = {}
    this._pl = []
    this._interstitialData = {}
    this._adShow = false
    this._id = ''
    this._loadData()
  },
  methods: {
    load () {
      this._dispatchEvent(EventType.Load, {})
    },

    show () {
      this.errorMessage = null

      const res = this._interstitialData
      // 插屏广告返回格式：{ ret: 0, data: [...] }
      if (this._adShow) {
        if (res && res.ret === 0) {
          const id = this._createView()
          // 直接调用 renderAd 渲染插屏广告
          window.TencentGDT.NATIVE.renderAd(res.data[0], id)
          this._dispatchEvent(EventType.Load, {})
        } else {
          this.errorMessage = res ? `Error code: ${res.ret}` : 'No advertisement'
          this._dispatchEvent(EventType.Error, res || { errMsg: 'No advertisement' })
        }
      } else {
        this._dispatchEvent(EventType.Error, this.errorMessage)
      }
    },

    _onclick () {
      this.show()
    },

    _loadData (adpid) {
      this.loading = true
      const id = adpid || this.adpid
      AdConfig.instance.get(id, (a, b) => {
        this._pc = a
        this._pl = b
        this.loading = false

        const data = this._pl[0]
        const providerConfig = this._pc[data.a1]

        if (data.a1 === '2') {
          if (!window.TencentGDT) {
            window.TencentGDT = window.TencentGDT || []
          }
          // 优量汇（广点通）
          AdScript.instance.load(data.a1, providerConfig.script, () => {
            this._adShow = true
            // 脚本加载成功后初始化
            this._renderGdt(data)
          }, (err) => {
            this._adShow = false
            this.errorMessage = err.message
            this._dispatchEvent(EventType.Error, err)
          })
        }
      }, (err) => {
        this.loading = false
        this.errorMessage = err
        this._dispatchEvent(EventType.Error, err)
      })
    },

    _renderGdt (data) {
      window.TencentGDT.push({
        placement_id: data.a3, // 广告位ID
        app_id: data.a2, // APP ID
        type: 'native',
        display_type: 'interstitial', // 插屏广告
        count: 1,
        onComplete: (res) => {
          // 缓存数据
          this._interstitialData = res
        }
      })
    },

    _dispatchEvent (type, data) {
      this.$emit(type, {
        detail: data
      })
    },

    _createView () {
      const id = this._randomId()
      const adView = document.createElement('div')
      adView.setAttribute('id', id)
      this.$refs.container.innerHTML = ''
      this.$refs.container.append(adView)
      return id
    },

    _randomId () {
      let result = ''
      for (let i = 0; i < 4; i++) {
        result += (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
      }
      return '_u' + result
    }
  }
}

// let IC = 0
// let IS = 0

class AdConfig {
  static get instance () {
    if (this._instance == null) {
      this._instance = new AdConfig()
      this._instance._init()
    }
    return this._instance
  }

  constructor () {
    this._instance = null
    this._adConfig = null
    this._isLoading = false
    this._lastError = null
    this._callbacks = []
  }

  get adConfig () {
    return this._adConfig
  }

  get isExpired () {
    if (this._adConfig == null) {
      return true
    }
    return (Math.abs(Date.now() - this._adConfig.last) > this.CACHE_TIME)
  }

  _init () {
    var config = this._getConfig()
    if (config === null || !config.last) {
      return
    }

    if (!this.isExpired) {
      this._adConfig = config.data
    }
  }

  get (adpid, success, fail) {
    // IC++
    if (this._adConfig != null) {
      this._doCallback(adpid, success, fail)
      if (this.isExpired) {
        this._loadAdConfig(adpid)
      }
      return
    }

    this._callbacks.push({
      adpid: adpid,
      success: success,
      fail: fail
    })

    this._loadAdConfig(adpid)
  }

  _doCallback (adpid, success, fail) {
    // IS++
    var { a, b } = this._adConfig
    if (a[adpid]) {
      success(b, a[adpid])
    } else {
      fail(this.ERROR_INVALID_ADPID)
    }
  }

  _loadAdConfig (adpid) {
    if (this._isLoading === true) {
      return
    }
    this._isLoading = true

    uni.request({
      url: this.URL,
      method: 'GET',
      timeout: 8000,
      data: {
        d: location.hostname,
        a: adpid
      },
      dataType: 'json',
      success: (res) => {
        const rd = res.data
        if (rd.ret === 0) {
          const data = rd.data

          this._adConfig = data
          this._setConfig(data)

          this._callbacks.forEach(({ adpid, success, fail }) => {
            this._doCallback(adpid, success, fail)
          })
        } else {
          this._callbacks.forEach((i) => {
            i.fail({ errCode: rd.ret, errMsg: rd.msg })
          })
        }
        this._callbacks = []
      },
      fail: (err) => {
        this._callbacks.forEach((i) => {
          i.fail(err)
        })
        this._callbacks = []
      },
      complete: (c) => {
        this._isLoading = false
      }
    })
  }

  _getConfig () {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null
    }
    var data = localStorage.getItem(this.KEY)
    return data ? JSON.parse(data) : null
  }

  _setConfig (data) {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null
    }
    localStorage.setItem(this.KEY, JSON.stringify({
      last: Date.now(),
      data: data
    }))
  }
}
Object.assign(AdConfig.prototype, {
  URL: 'https://hac1.dcloud.net.cn/ah5',
  KEY: 'uni_app_ad_config',
  CACHE_TIME: 1000 * 60 * 10,
  ERROR_INVALID_ADPID: {
    '-5002': 'invalid adpid'
  }
})

class AdScript {
  static get instance () {
    if (this._instance == null) {
      this._instance = new AdScript()
    }
    return this._instance
  }

  constructor () {
    this._instance = null
    this._callback = {}
    this._cache = {}
  }

  load (provider, script, success, fail) {
    if (this._cache[provider] === undefined) {
      this.loadScript(provider, script)
    }

    if (this._cache[provider] === 1) {
      success()
    } else {
      if (!this._callback[provider]) {
        this._callback[provider] = []
      }
      this._callback[provider].push({
        success,
        fail
      })
    }
  }

  loadScript (provider, script) {
    this._cache[provider] = 0
    const domid = 'uniad_provider' + provider
    // 判断是否已经加载平台sdk
    const adScriptDom = document.getElementById(domid)
    const src = adScriptDom && adScriptDom.getAttribute('src')
    if (src) {
      this._cache[provider] = 1
      return
    }

    var ads = document.createElement('script')
    ads.setAttribute('id', domid)

    for (const var1 in script) {
      ads.setAttribute(var1, script[var1])
    }
    ads.onload = () => {
      this._cache[provider] = 1
      this._callback[provider].forEach(({ success }) => {
        success()
      })
      this._callback[provider].length = 0
    }
    ads.onerror = (err) => {
      this._cache[provider] = undefined
      this._callback[provider].forEach(({ fail }) => {
        fail(err)
      })
      this._callback[provider].length = 0
    }
    document.body.append(ads)
  }
}
