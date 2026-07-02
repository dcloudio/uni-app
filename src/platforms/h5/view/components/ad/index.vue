<template>
  <uni-ad
    v-bind="attrs"
    v-on="$listeners"
  >
    <div
      ref="container"
      class="uni-ad-container"
      @click="_onhandle"
    />
    <div
      v-if="customTuiaVisible"
      class="uni-ad-custom-material"
      @click="renderTuiaFromCustomMaterial"
    >
      <slot />
    </div>
  </uni-ad>
</template>
<script>
import {
  subscriber
} from 'uni-mixins'

class AdConfig {
  static get instance () {
    if (this._instance == null) {
      this._instance = new AdConfig()
      this._instance._init()
    }
    return this._instance
  }

  static IC = 0
  static IS = 0

  constructor () {
    this._instance = null
    this._adConfig = null
    this._configLast = 0
    this._isLoading = false
    this._lastError = null
    this._callbacks = []
  }

  get adConfig () {
    return this._adConfig
  }

  /** 使用独立 _configLast，与 localStorage 中包装结构的 last 一致（v2 配置体本身不含 last） */
  get isExpired () {
    if (this._adConfig == null) {
      return true
    }
    if (!this._configLast) {
      return true
    }
    return (Math.abs(Date.now() - this._configLast) > this.CACHE_TIME)
  }

  /** 从本地恢复未过期配置 */
  _init () {
    var config = this._getConfig()
    if (config === null || !config.last) {
      return
    }

    if (Math.abs(Date.now() - config.last) <= this.CACHE_TIME) {
      this._adConfig = config.data
      this._configLast = config.last
    }
  }

  get (adpid, success, fail) {
    AdConfig.IC++
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

  /** v2 接口 a[adpid] 可能为单条对象或数组，统一为数组供渲染链使用 */
  _doCallback (adpid, success, fail) {
    AdConfig.IS++
    var { a, b } = this._adConfig
    const adData = a[adpid]
    if (adData) {
      success(b, Array.isArray(adData) ? adData : [adData])
    } else {
      fail(this.ERROR_INVALID_ADPID)
    }
  }

  _loadAdConfig (adpid) {
    if (this._isLoading === true) {
      return
    }
    this._isLoading = true

    const appid = typeof __uniConfig !== 'undefined' ? (__uniConfig.appId || '') : ''

    uni.request({
      url: this.URL,
      method: 'GET',
      timeout: 8000,
      data: {
        d: location.hostname,
        a: adpid,
        appid
      },
      dataType: 'json',
      success: (res) => {
        const rd = res.data
        if (rd.ret === 0) {
          const data = rd.data

          this._adConfig = data
          this._configLast = Date.now()
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
  // 旧版 ah5 已废弃，与 Vue3 H5 一致使用 ah5v2
  URL: 'https://hac1.dcloud.net.cn/ah5v2',
  KEY: 'uni_app_ad_config',
  CACHE_TIME: 1000 * 60 * 10,
  ERROR_INVALID_ADPID: {
    '-5002': 'invalid adpid'
  }
})

class AdReport {
  static get instance () {
    if (this._instance == null) {
      this._instance = new AdReport()
    }
    return this._instance
  }

  constructor () {
    this._instance = null
    this._guid = null

    var config = this._getConfig()
    if (config !== null && config.guid) {
      this._guid = config.guid
      return
    }

    this._guid = this._newGUID()
    this._setConfig(this._guid)
  }

  get (data) {
    this._process(Object.assign(data, {
      d: location.hostname,
      i: this._guid
    }))
  }

  _process (data) {
    uni.request({
      url: this.URL,
      method: 'GET',
      data: data,
      dataType: 'json',
      success: () => {
      }
    })
  }

  _newGUID () {
    let guid = ''
    const format = 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'
    for (let i = 0; i < format.length; i++) {
      if (format[i] === 'x') {
        guid += (Math.random() * 16 | 0).toString(16)
      } else {
        guid += format[i]
      }
    }
    return guid.toUpperCase()
  }

  _getConfig () {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null
    }
    var data = localStorage.getItem(this.KEY)
    return data ? JSON.parse(data) : null
  }

  _setConfig (guid) {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null
    }
    localStorage.setItem(this.KEY, JSON.stringify({
      last: Date.now(),
      guid: guid
    }))
  }
}
Object.assign(AdReport.prototype, {
  URL: 'https://has1.dcloud.net.cn/ahl',
  KEY: 'uni_app_ad_guid'
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

  /** @param {{ provider: string, script: object }} data 与 Vue3 一致传入整包 */
  load (data, success, fail) {
    const provider = data.provider
    if (this._cache[provider] === undefined) {
      this.loadScript(data)
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

  loadScript (data) {
    const provider = data.provider
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
    const script = data.script
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

const CHECK_RENDER_DELAY = 1000
const CHECK_RENDER_RETRY = 5
const DEFAULT_WIDESCREEN_WIDTH = 750

/** 与 Vue3 temp/index.tsx 中 AD_PROVIDER 对齐 */
const AD_PROVIDER = {
  GDT: '2',
  TUIA: '10035'
}

export default {
  name: 'Ad',
  mixins: [subscriber],
  props: {
    adpid: {
      type: [Number, String],
      default: ''
    },
    adpidWidescreen: {
      type: [Number, String],
      default: ''
    },
    widescreenWidth: {
      type: [Number, String],
      default: DEFAULT_WIDESCREEN_WIDTH
    }
  },
  data () {
    return {
      /** 推啊自定义素材插槽是否展示（与 Vue3 customTuiaVisible 一致） */
      customTuiaVisible: false
    }
  },
  watch: {
    adpid (val) {
      if (val) {
        this._loadData(val)
      }
    },
    adpidWidescreen (val) {
      if (val) {
        this._loadData(val)
      }
    }
  },
  mounted () {
    this._pd = {}
    this._pl = []
    this._pi = 0
    this._tuiaData = null
    this._currentAdpid = ''
    this._checkTimer = null
    this._checkTimerCount = 0
    this._isWidescreen = this.$refs.container.clientWidth > parseInt(this.widescreenWidth)
    this._loadData()
    AdReport.instance.get({
      h: __uniConfig.compilerVersion,
      a: this.adpid,
      at: -3,
      ic: AdConfig.IC,
      is: AdConfig.IS
    })
  },
  beforeDestroy () {
    this._clearCheckTimer()
    this.$refs.container.innerHTML = ''
    if (this._shanhuAd) {
      delete this._shanhuAd
    }
  },
  methods: {
    _onhandle (e) {
      this._report(41)
    },
    _reset () {
      this._pd = {}
      this._pl = []
      this._pi = 0
      this._tuiaData = null
      this.customTuiaVisible = false
      this._clearCheckTimer()
      this.$refs.container.innerHTML = ''
      this._isReady = false
    },
    _loadData (adpid) {
      this._reset()
      const id = adpid || this.adpid
      const aid = (this._isWidescreen ? (this.adpidWidescreen || id) : id)
      this._currentAdpid = aid
      AdConfig.instance.get(aid, (b, a) => {
        this._ab = b
        this._pl = a
        this._renderAd()
      }, (err) => {
        this.$trigger('error', {}, err)
      })
    },
    _renderAd () {
      if (this._pi > this._pl.length - 1) {
        return
      }

      const data = this._pl[this._pi]
      if (!data) {
        this._renderNext()
        return
      }

      const providerId = String(data.a1)
      const providerConfig = this._ab && this._ab[providerId]
      if (!providerConfig) {
        console.error('Provider config not found for provider:', data.a1)
        this._renderNext()
        return
      }
      const script = providerConfig.script || providerConfig.s
      this._currentChannel = providerId

      var id = this._randomId()
      this._createView(id)

      if (providerId === AD_PROVIDER.GDT) {
        window.TencentGDT = window.TencentGDT || []
        AdScript.instance.load(
          { provider: providerId, script },
          () => {
            this._renderGdt(id, data)
          },
          (err) => {
            this.$trigger('error', {}, err)
            this._renderNext()
          }
        )
        return
      }

      if (providerId === AD_PROVIDER.TUIA) {
        AdScript.instance.load(
          { provider: providerId, script },
          () => {
            this._renderTuiaMaterial(id, data)
          },
          (err) => {
            this.$trigger('error', {}, err)
            this._renderNext()
          }
        )
        return
      }

      this._renderNext()
    },
    /** 优量汇原生模板：参数与 Vue3 一致使用 app_id */
    _renderGdt (id, data) {
      window.TencentGDT.push({
        placement_id: data.a3, // 广告位ID
        app_id: data.a2, // APP ID（与 Vue3 一致；旧版 appid 已弃用）
        type: 'native', // 原生模板广告
        count: 1, // 拉取广告数量
        onComplete: (res) => {
          // 原生模板广告返回数组
          if (res && res.constructor === Array && res.length > 0) {
            // 直接调用 renderAd 渲染模板广告
            window.TencentGDT.NATIVE.renderAd(res[0], id)
            this.$trigger('load', {}, {})
          } else {
            console.error('GDT no ad or failed:', res)
            this.$trigger('error', {}, res || { errMsg: 'No advertisement' })
            this._renderNext()
          }
        }
      })

      this._startCheckTimer()
    },
    _createView (id) {
      var adView = document.createElement('div')
      adView.setAttribute('id', id)
      adView.setAttribute('class', id)
      this.$refs.container.innerHTML = ''
      this.$refs.container.append(adView)
      return adView
    },
    // _renderScript (view, script) {
    //   var adScript = document.createElement('script')
    //   for (const var1 in script) {
    //     adScript.setAttribute(var1, script[var1])
    //   }
    //   view.appendChild(adScript)
    //   this._startCheckTimer()
    // },
    // _renderBaidu (id, adid) {
    //   (window.slotbydup = window.slotbydup || []).push({
    //     id: adid,
    //     container: id,
    //     async: true
    //   })
    //   this._startCheckTimer()
    // },
    // _renderAdView (id, script, data) {
    //   let bindThis = window
    //   script.split('.').reduce((total, currentValue) => {
    //     bindThis = total
    //     return total[currentValue]
    //   }, window).bind(bindThis)(data.a2, id, 2)
    //   this._startCheckTimer()
    // },
    // _renderShanhu (id, data) {
    //   const coral = new window.CoralAdv({
    //     app_id: data.a2,
    //     placement_id: data.a3,
    //     type: data.a4,
    //     display_type: data.a5,
    //     container_id: id,
    //     count: data.a6 || 1
    //   })
    //   coral.ready().then(async (res) => {
    //     if (res.ret === 0) {
    //       this.$trigger('load', {}, {})
    //     } else {
    //       this.$trigger('error', {}, res)
    //     }
    //   }).catch((err) => {
    //     this.$trigger('error', {}, err)
    //   })
    //   this._startCheckTimer()
    // },
    _renderNext () {
      if (this._pi >= this._pl.length - 1) {
        return
      }

      this._pi++
      this._renderAd()
    },
    _checkRender () {
      var hasContent = (this.$refs.container.children.length > 0 && this.$refs.container.clientHeight > 40)
      if (hasContent) {
        this._report(40, this._currentChannel)
      }
      return hasContent
    },
    _startCheckTimer () {
      this._clearCheckTimer()
      this._checkTimer = setInterval(() => {
        this._checkTimerCount++
        if (this._checkTimerCount >= CHECK_RENDER_RETRY) {
          this._clearCheckTimer()
          this._renderNext()
          return
        }

        if (this._checkRender()) {
          this._clearCheckTimer()
        }
      }, CHECK_RENDER_DELAY)
    },
    _clearCheckTimer () {
      this._checkTimerCount = 0
      if (this._checkTimer != null) {
        window.clearInterval(this._checkTimer)
        this._checkTimer = null
      }
    },
    /** 业务上报：a 使用当前实际请求的 adpid（与 Vue3 AdRender.report 一致） */
    _report (type, currentChannel) {
      const reportData = {
        h: __uniConfig.compilerVersion,
        a: this._currentAdpid,
        at: type
      }
      if (currentChannel) {
        reportData.t = currentChannel
      }
      AdReport.instance.get(reportData)
    },
    _randomId () {
      var result = ''
      for (let i = 0; i < 4; i++) {
        result += (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
      }
      return '_u' + result
    },

    /** 是否存在默认插槽（推啊自定义素材） */
    _hasCustomTuiaMaterial () {
      return Boolean(this.$slots.default && this.$slots.default.length)
    },

    _setCustomTuiaVisible (visible) {
      this.customTuiaVisible = visible
    },

    /** 自定义素材容器点击后执行推啊落地（对齐 Vue3 renderTuiaFromCustomMaterial） */
    renderTuiaFromCustomMaterial () {
      if (!this._tuiaData) {
        return
      }
      this._renderTuia(this._tuiaData)
    },

    /** 推啊：加载素材或展示自定义插槽 */
    _renderTuiaMaterial (id, data) {
      const adView = document.getElementById(id)
      if (!adView) {
        this.$trigger('error', {}, { errMsg: 'Invalid ad container' })
        this._renderNext()
        return
      }

      this._tuiaData = data

      if (this._hasCustomTuiaMaterial()) {
        adView.innerHTML = ''
        this._setCustomTuiaVisible(true)
        this._report(40, this._currentChannel)
        this.$trigger('load', {}, {})
        return
      }
      this._setCustomTuiaVisible(false)

      const materialSrc = this._getRandomTuiaMaterial(data.imgs, data.img)
      if (!materialSrc) {
        this.$trigger('error', {}, {
          errMsg: 'Invalid tuia material imgs/img'
        })
        this._renderNext()
        return
      }

      const img = document.createElement('img')
      img.src = materialSrc
      img.onerror = () => {
        this.$trigger('error', {}, { errMsg: 'Tuia material load fail' })
        this._renderNext()
      }
      img.alt = 'ad'
      img.setAttribute('draggable', 'false')
      img.style.width = '100%'
      img.style.height = 'auto'
      img.style.display = 'block'
      img.style.cursor = 'pointer'
      img.onclick = () => {
        this._renderTuia(data)
      }

      adView.innerHTML = ''
      adView.append(img)
      this._report(40, this._currentChannel)
      this.$trigger('load', {}, {})
    },

    _getRandomTuiaMaterial (imgs, img) {
      if (Array.isArray(imgs)) {
        const list = imgs.filter((item) => typeof item === 'string' && item)
        if (list.length) {
          const index = Math.floor(Math.random() * list.length)
          return list[index]
        }
      }

      if (typeof img === 'string') {
        return img
      }

      return ''
    },

    /** 调用 TuiaSDKLite.execute 打开落地页 */
    _renderTuia (data) {
      this._setCustomTuiaVisible(false)
      const tuia = window.TuiaSDKLite
      if (!tuia || typeof tuia.execute !== 'function') {
        this.$trigger('error', {}, { errMsg: 'Invalid TuiaSDKLite' })
        this._renderNext()
        return
      }

      tuia.execute({
        data: {
          pid: data.a3,
          fail_message: 'ad load fail',
          product_name: document.title || location.hostname
        },
        success: (res) => {
          this.$trigger('load', {}, res || {})
        },
        fail: (err) => {
          this.$trigger(
            'error',
            {},
            err || { errMsg: 'TuiaSDKLite execute fail' }
          )
          this._renderNext()
        }
      })
    }
  }
}
</script>

<style>
  uni-ad {
    display: block;
    overflow: hidden;
  }

  uni-ad[hidden] {
    display: none;
  }

  .uni-ad-custom-material {
    display: block;
  }
</style>
