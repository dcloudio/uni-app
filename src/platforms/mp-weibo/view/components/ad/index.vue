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

  _doCallback (adpid, success, fail) {
    AdConfig.IS++
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

class AdReport {
  static get instance () {
    if (this._instance == null) {
      this._instance = new AdReport()
      this._instance._init()
    }
    return this._instance
  }

  constructor () {
    this._instance = null
    this._adConfig = null
    this._guid = null
  }

  _init () {
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
    var ads = document.createElement('script')
    ads.setAttribute('id', 'uniad_provider' + provider)
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

class AdTencent {
  static get instance () {
    if (this._instance == null) {
      this._instance = new AdTencent()
    }
    return this._instance
  }

  constructor () {
    this._instance = null
    this._callback = {}
    this._cache = {}
    window.TencentGDT = window.TencentGDT || []
  }

  load (appid, placementid, success, fail) {
    if (!this._callback[placementid]) {
      this._callback[placementid] = []
    }
    this._callback[placementid].push({
      success,
      fail
    })

    if (!this._cache[placementid]) {
      this._cache[placementid] = {
        isReady: false
      }
      window.TencentGDT.push({
        app_id: appid,
        placement_id: placementid,
        type: 'native',
        count: 1,
        onComplete: (res) => {
          this._cache[placementid].isReady = true
          this._callback[placementid].forEach(({ success, fail }) => {
            if (res && Array.isArray(res) && res.length) {
              success(res[0])
            } else {
              fail(res)
            }
            this._callback[placementid].length = 0
          })
        }
      })
    }

    if (this._cache[placementid].isReady === true) {
      window.TencentGDT.NATIVE.loadAd(placementid)
    }
  }
}

const CHECK_RENDER_DELAY = 1000
const CHECK_RENDER_RETRY = 5
const DEFAULT_WIDESCREEN_WIDTH = 750

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
    this._p = {}
    this._pl = []
    this._pi = 0
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
      this._p = {}
      this._pl = []
      this._pi = 0
      this._clearCheckTimer()
      this.$refs.container.innerHTML = ''
      this._isReady = false
    },
    _loadData (adpid) {
      this._reset()
      const id = adpid || this.adpid
      const aid = (this._isWidescreen ? (this.adpidWidescreen || id) : id)
      AdConfig.instance.get(aid, (b, a) => {
        this._b = b
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
      const providerConfig = this._b[data.a1][data.t]
      const script = providerConfig.script
      this._currentChannel = data.a1

      var id = this._randomId()
      var view = this._createView(id)

      if (data.a1 === '10010') {
        AdScript.instance.load(data.t, script, () => {
          this._renderBaidu(id, data.a2)
        }, (err) => {
          this.$trigger('error', {}, err)
        })
      } else if (data.a1 === '10011') {
        AdTencent.instance.load(data.a3, data.a2, (res) => {
          window.TencentGDT.NATIVE.renderAd(res, id)
        })
        this._startCheckTimer()
      } else if (data.a1 === '10012') {
        this._renderScript(view, script)
      } else if (data.a1 === '10014') {
        AdScript.instance.load(data.t, script, () => {
          this._renderShanhu(id, data.tt, data.tar)
        }, (err) => {
          this.$trigger('error', {}, err)
        })
      } else {
        AdScript.instance.load(data.t, script, () => {
          this._renderAdView(id, script.s, data)
        }, (err) => {
          this.$trigger('error', {}, err)
        })
      }
    },
    _createView (id) {
      var adView = document.createElement('div')
      adView.setAttribute('id', id)
      adView.setAttribute('class', id)
      this.$refs.container.innerHTML = ''
      this.$refs.container.append(adView)
      return adView
    },
    _renderScript (view, script) {
      var adScript = document.createElement('script')
      for (const var1 in script) {
        adScript.setAttribute(var1, script[var1])
      }
      view.appendChild(adScript)
      this._startCheckTimer()
    },
    _renderBaidu (id, adid) {
      (window.slotbydup = window.slotbydup || []).push({
        id: adid,
        container: id,
        async: true
      })
      this._startCheckTimer()
    },
    _renderAdView (id, script, data) {
      let bindThis = window
      script.split('.').reduce((total, currentValue) => {
        bindThis = total
        return total[currentValue]
      }, window).bind(bindThis)(data.a2, id, 2)
      this._startCheckTimer()
    },
    _renderShanhu (id, type, target) {
      this._shanhuAd = new window.CoralTBSAdv(id, {
        type: type,
        target: target,
        advShowCb: () => {
          this._report(42)
          this.$trigger('load', {}, {})
        },
        advClickCb: () => {
          this._report(43)
          this.$trigger('adclicked', {}, {})
        },
        advCloseCb: () => {
          this.$trigger('close', {}, {})
        },
        advErrorCb: (errorno) => {
          this.$trigger('error', {}, errorno)
        }
      })
      this._startCheckTimer()
    },
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
    _report (type, currentChannel) {
      const reportData = {
        h: __uniConfig.compilerVersion,
        a: this.adpid,
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
</style>
