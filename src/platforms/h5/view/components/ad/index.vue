<template>
  <uni-ad
    v-bind="attrs"
    v-on="$listeners"
  >
    <div
      ref="container"
      class="uni-ad-container"
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

  constructor () {
    this._instance = null
    this._adConfig = null
    this._isLoading = false
    this._lastError = null
    this._callbacks = []
  }

  get (adpid, callback) {
    if (this._adConfig != null) {
      callback(this._adConfig.adpids[adpid])
      return
    }

    this._callbacks.push({ adpid: adpid, callback: callback })
    this._loadAdConfig()
  }

  _init () {
    var config = this._getConfig()
    if (config != null && config.last) {
      var td = Math.abs(Date.now() - config.last)
      if (td < this.CACHE_TIME) {
        this._adConfig = config.data
      }
    }
  }

  _loadAdConfig (adpid, callback) {
    if (this._isLoading === true) {
      return
    }

    this._isLoading = true

    uni.request({
      url: this.URL,
      timeout: 3000,
      method: 'GET',
      data: {
        appid: '__UNI__ADD1C32'
      },
      dataType: 'json',
      success: (res) => {
        const rd = res.data
        if (rd.ret === 0) {
          const data = rd.data
          this._adConfig = data
          this._setConfig(data)
          this._callbacks.forEach((i) => {
            i.callback(data.adpids[i.adpid])
          })
        }
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
  URL: '//stream.dcloud.net.cn/dcloud/H5Config',
  KEY: 'UNI_APP_AD',
  CACHE_TIME: 1000 * 60 * 10
})

const adProvider = {
  hx: 'hx',
  ky: 'ky'
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
  data () {
    return {
      hidden: false
    }
  },
  watch: {
    hidden (val) {
    },
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
    this._loadData()
    this._checkTimer = null
    this._checkTimerCount = 0
  },
  beforeDestroy () {
    this.$refs.container.innerHTML = ''
  },
  methods: {
    _loadData (adpid) {
      AdConfig.instance.get(adpid || this.adpid, (data) => {
        this._pd = data
        this._pl = data.psp.split(',')
        this._renderAd()
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
    _renderHX (data) {
      var ad = document.createElement('script')
      ad.src = data.src || data.url

      var adView = document.createElement('div')
      adView.setAttribute('id', this._randomId())
      adView.appendChild(ad)

      this.$refs.container.innerHTML = ''
      this.$refs.container.append(adView)

      // this._startCheckTimer()
    },
    _renderKY (data) {
      var ad = document.createElement('script')
      ad.src = data.src || data.url

      this.$refs.container.innerHTML = ''
      this.$refs.container.append(ad)

      // this._startCheckTimer()
    },
    _renderNext () {
      if (this._pi >= this._pl.length - 1) {
        return
      }

      this._pi++
      this._renderAd()
    },
    _checkRender () {
      var hasContent = this.$refs.container.querySelector('a') || this.$refs.container.querySelector('iframe')
      return hasContent
    },
    _startCheckTimer () {
      this._clearCheckTimer()
      this._checkTimer = setInterval(() => {
        if (this._checkRender()) {
          this._clearCheckTimer()
          return
        }
        this._checkTimerCount++
        if (this._checkTimerCount >= CHECK_RENDER_RETRY) {
          this._clearCheckTimer()
          this._renderNext()
        }
      }, CHECK_RENDER_DELAY)
    },
    _clearCheckTimer () {
      this._checkTimerCount = 0
      if (this._checkTimer != null) {
        window.clearInterval(this._checkTimer)
      }
    },
    _randomId () {
      return 'ad' + Date.now() + '' + parseInt(Math.random() * 1000)
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

  uni-ad .uni-ad-container {
    min-height: 1px;
  }
</style>
