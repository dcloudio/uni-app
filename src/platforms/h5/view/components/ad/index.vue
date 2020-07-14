<template>
  <uni-ad
    v-bind="attrs"
    v-on="$listeners"
  >
    <div
      ref="container"
      class="uni-ad-container"
      @click="onhandle"
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

  get adConfig () {
    return this._adConfig
  }

  _init () {
    var config = this._getConfig()
    if (config === null || !config.last) {
      return
    }

    var td = Math.abs(Date.now() - config.last)
    if (td < this.CACHE_TIME) {
      this._adConfig = config.data
    }
  }

  get (adpid, success, fail) {
    if (this._adConfig != null) {
      this._doCallback(adpid, success, fail)
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
    var data = this._adConfig
    if (data.adpids[adpid]) {
      success(data.adpids[adpid])
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
      timeout: 3000,
      data: {
        adpid: adpid
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
            i.fail(rd.message)
          })
        }
        this._callbacks = []
      },
      fail: (err) => {
        this._callbacks.forEach((i) => {
          i.fail(err.errMsg)
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
  URL: '//stream.dcloud.net.cn/dcloud/H5Config',
  KEY: 'uni_app_ad_config',
  CACHE_TIME: 1000 * 60 * 10,
  ERROR_INVALID_ADPID: {
    '-5002': '无效adpid'
  }
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
  },
  beforeDestroy () {
    this.$refs.container.innerHTML = ''
  },
  methods: {
    onhandle (e) {
      console.log('onhandle')
    },
    _loadData (adpid) {
      AdConfig.instance.get(adpid || this.adpid, (data) => {
        this._pd = data
        this._pl = data.psp.split(',')
        this._renderAd()
      }, (err) => {
        this.$trigger('error', {}, { message: err })
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

      this.$refs.container.innerHTML = ''
      this.$refs.container.append(ad)

      this._startCheckTimer()
    },
    _renderKY (data) {
      var ad = document.createElement('script')
      ad.src = data.src || data.url

      this.$refs.container.innerHTML = ''
      this.$refs.container.append(ad)

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
      var hasContent = (this.$refs.container.clientHeight > 40)
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
        this._checkTimer = null
      }
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
