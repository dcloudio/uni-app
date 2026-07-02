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
    /** 对外 load：仅派发 load 事件（与历史行为一致） */
    load () {
      this._dispatchEvent(EventType.Load, {})
    },

    /** 展示插屏：在 SDK 与素材就绪后调用 GDT NATIVE.renderAd */
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

    /** 点击插屏区域时尝试展示广告 */
    _onclick () {
      this.show()
    },

    /** 按 adpid 拉取 H5 广告配置并加载优量汇脚本、预请求素材 */
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

    /** 向 TencentGDT 队列提交插屏 native 请求，onComplete 写入 _interstitialData */
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

    /** 以小程序风格 detail 包装后向父组件派发事件 */
    _dispatchEvent (type, data) {
      this.$emit(type, {
        detail: data
      })
    },

    /** 在容器内创建带随机 id 的 DOM 节点，供 renderAd 挂载 */
    _createView () {
      const id = this._randomId()
      const adView = document.createElement('div')
      adView.setAttribute('id', id)
      this.$refs.container.innerHTML = ''
      this.$refs.container.append(adView)
      return id
    },

    /** 生成 renderAd 容器 DOM id */
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
  /** @returns {AdConfig} 全局单例 */
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

  /** @returns 当前内存中的配置体（服务端返回的 data） */
  get adConfig () {
    return this._adConfig
  }

  /** @returns {boolean} 本地缓存是否超过 CACHE_TIME */
  get isExpired () {
    if (this._adConfig == null) {
      return true
    }
    return (Math.abs(Date.now() - this._adConfig.last) > this.CACHE_TIME)
  }

  /** 从 localStorage 恢复未过期的配置到内存 */
  _init () {
    var config = this._getConfig()
    if (config === null || !config.last) {
      return
    }

    if (!this.isExpired) {
      this._adConfig = config.data
    }
  }

  /**
   * 按 adpid 获取配置：优先内存/缓存命中，否则请求 ah5v2 并排队回调
   * @param {string|number} adpid
   * @param {(a: object, b: object[]) => void} success
   * @param {(err: object) => void} fail
   */
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

  /** 用当前 _adConfig 解析 adpid 并调用 success 或 fail */
  _doCallback (adpid, success, fail) {
    // IS++
    var { a, b } = this._adConfig
    if (a[adpid]) {
      success(b, a[adpid])
    } else {
      fail(this.ERROR_INVALID_ADPID)
    }
  }

  /** 请求远端 H5 广告配置并刷新内存与等待队列 */
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

  /** @returns {{ last: number, data: object }|null} localStorage 中的包装结构 */
  _getConfig () {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null
    }
    var data = localStorage.getItem(this.KEY)
    return data ? JSON.parse(data) : null
  }

  /** 将服务端 data 与当前时间写入 localStorage */
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
  // 旧版 https://hac1.dcloud.net.cn/ah5 已废弃，配置迁移至 v2（与 Vue3 H5 插屏一致）
  URL: 'https://hac1.dcloud.net.cn/ah5v2',
  KEY: 'uni_app_ad_config',
  CACHE_TIME: 1000 * 60 * 10,
  ERROR_INVALID_ADPID: {
    '-5002': 'invalid adpid'
  }
})

class AdScript {
  /** @returns {AdScript} 脚本加载器单例 */
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

  /**
   * 按渠道加载广告 SDK script，已缓存则同步 success
   * @param {string} provider 渠道标识（如优量汇为 '2'）
   */
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

  /** 向 document 插入 script 节点并处理 onload/onerror 队列 */
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
