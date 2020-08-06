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
    var data = this._adConfig
    if (data[adpid]) {
      success(data[adpid])
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
      timeout: 5000,
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
  URL: '//qy5y9ee9ch8r87pg72w5.dcloud.net.cn/hcs',
  KEY: 'uni_app_ad_config',
  CACHE_TIME: 1000 * 60 * 10,
  ERROR_INVALID_ADPID: {
    '-5002': '无效adpid'
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
  URL: '//hp66hwpyev7yx2hfughh.dcloud.net.cn/ahl',
  KEY: 'uni_app_ad_guid'
})

const adProvider = {
  hx: 'zswx_hx',
  ky: 'zswx_ky'
}

const CHECK_RENDER_DELAY = 1000
const CHECK_RENDER_RETRY = 3

export default {
  name: 'Ad',
  mixins: [subscriber],
  props: {
    adpid: {
      type: [Number, String],
      default: ''
    }
  },
  watch: {
    adpid (val) {
      if (val) {
        this._loadData(val)
      }
    }
  },
  mounted () {
    this._pl = []
    this._pd = {}
    this._pi = 0
    this._checkTimer = null
    this._checkTimerCount = 0
    this._loadData()
    AdReport.instance.get({
      h: __uniConfig.compilerVersion,
      a: this.adpid,
      at: 30,
      ic: AdConfig.IC,
      is: AdConfig.IS
    })
  },
  beforeDestroy () {
    this._clearCheckTimer()
    this.$refs.container.innerHTML = ''
  },
  methods: {
    _onhandle (e) {
      this._report(41)
    },
    _reset () {
      this._pl = []
      this._pd = {}
      this._pi = 0
      this._clearCheckTimer()
      this.$refs.container.innerHTML = ''
    },
    _loadData (adpid) {
      this._reset()
      AdConfig.instance.get(adpid || this.adpid, (data) => {
        this._pd = data
        this._pl = data.psp.split(',')
        this._renderAd()
      }, (err) => {
        this.$trigger('error', {}, err)
      })
    },
    _renderAd () {
      if (this._pi > this._pl.length - 1) {
        return
      }

      var ap = this._pl[this._pi]
      var data = this._pd[ap]
      switch (ap) {
        case adProvider.hx:
          this._renderHX(data)
          break
        case adProvider.ky:
          this._renderKY(data)
          break
      }
    },
    _renderNext () {
      if (this._pi >= this._pl.length - 1) {
        return
      }

      this._pi++
      this._renderAd()
    },
    _renderHX (data) {
      if (document.querySelector('#' + adProvider.hx)) {
        this._renderNext()
        return
      }

      var ad = document.createElement('script')
      ad.src = data.src || data.url

      var adView = document.createElement('div')
      adView.setAttribute('id', adProvider.hx)
      adView.appendChild(ad)

      this.$refs.container.innerHTML = ''
      this.$refs.container.append(adView)

      this._startCheckTimer()
    },
    _renderKY (data) {
      var randomId = this._randomId()
      var ad = document.createElement('script')
      ad.src = (data.src || data.url) + '&_ct=' + randomId

      var adView = document.createElement('div')
      adView.setAttribute('id', randomId)
      adView.appendChild(ad)

      this.$refs.container.innerHTML = ''
      this.$refs.container.append(adView)

      this._startCheckTimer()
    },
    _checkRender () {
      var hasContent = (this.$refs.container.children.length > 0 && this.$refs.container.clientHeight > 40)
      if (hasContent) {
        this._report(40)
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
    _report (type) {
      var taskId = ''
      if (this._pl.length > 0 && this._pi < this._pl.length) {
        var data = this._pd[this._pl[this._pi]]
        if (data) {
          taskId = data.task_id
        }
      }

      AdReport.instance.get({
        h: __uniConfig.compilerVersion,
        a: this.adpid,
        t: taskId,
        at: type
      })
    },
    _randomId () {
      var result = ''
      for (let i = 0; i < 2; i++) {
        result += (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
      }
      return result
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
