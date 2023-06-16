const AD_SERVER_URL = 'https://hac1.dcloud.net.cn/h5/gs'

const EventType = {
  Load: 'load',
  Close: 'close',
  Error: 'error'
}

const ProviderType = 'wm'

class Process {
  static Start (cmd, args) {
    return new Process().openScheme(cmd)
  }

  constructor () {
    this._a = null
  }

  openScheme (url) {
    if (this._a == null) {
      this._a = document.createElement('a')
    }
    this._a.href = url
    this._a.click()
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
      adData: null,
      loading: false,
      showModel: false,
      errorMessage: null
    }
  },
  created () {
    this._loading = false
    this.adConfigData = null
  },
  methods: {
    load () {
      setTimeout(() => {
        this._onmpload()
      }, 200)
    },

    show (options) {
      if (!this._isMobile()) {
        this._dispatchEvent(EventType.Error, {
          errCode: -1,
          errMsg: '当前设备环境无效'
        })
        return
      }

      this.errorMessage = null
      if (this._loading) {
        return
      }
      this._loading = true

      this._requestScheme(options)
    },

    getProvider () {
      return ProviderType
    },

    _onclick () {
      if (this.disabled) {
        return
      }

      this.show()
    },

    _requestScheme (options = {}) {
      const urlCallback = options.urlCallback || this.urlCallback
      uni.request({
        url: AD_SERVER_URL,
        method: 'POST',
        data: {
          adpid: this.adpid,
          userId: urlCallback.userId,
          extra: urlCallback.extra
        },
        timeout: 5000,
        dataType: 'json',
        success: (res) => {
          if (res.statusCode !== 200) {
            this._dispatchEvent(EventType.Error, {
              errCode: res.statusCode,
              errMsg: res.statusCode
            })
            return
          }

          const responseData = res.data
          if (responseData.ret === 0) {
            Process.Start(responseData.data.openlink)
          } else {
            this._dispatchEvent(EventType.Error, {
              errCode: responseData.ret,
              errMsg: responseData.msg
            })
          }
        },
        fail: (err) => {
          this.$emit(EventType.Error, {
            errCode: '',
            errMsg: err.errMsg
          })
        },
        complete: () => {
          this.loading = false
        }
      })
    },

    _isMobile () {
      return /android|iphone/i.test(navigator.userAgent.toLowerCase())
    },

    _onmpload (e) {
      this.loading = false
      this._dispatchEvent(EventType.Load, {})
    },

    _onmpclose (e) {
      this._dispatchEvent(EventType.Close, e.detail)
    },

    _onmperror (e) {
      this.loading = false
      this.errorMessage = JSON.stringify(e.detail)
      this._dispatchEvent(EventType.Error, e.detail)
    },

    _dispatchEvent (type, data) {
      this.$emit(type, {
        detail: data
      })
    }
  }
}
