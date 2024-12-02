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
    unitId: {
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
      loading: false,
      errorMessage: null
    }
  },
  created () {
    this._ad = null
    setTimeout(() => {
      if (this.preload && this._canCreateAd()) {
        this.load()
      }
    }, 100)
  },
  methods: {
    load () {
      if (this.loading) {
        return
      }
      this._startLoading()
    },

    show () {
      this.errorMessage = null
      this._ad = this.selectComponent('.uniad-plugin')
      if (this._hasCallback()) {
        const userCryptoManager = wx.getUserCryptoManager()
        userCryptoManager.getLatestUserKey({
          success: ({
            encryptKey,
            iv,
            version,
            expireTime
          }) => {
            this._ad.show({
              userId: this.urlCallback.userId || '',
              extra: this.urlCallback.extra || '',
              encryptKey,
              iv,
              version,
              expireTime
            })
          },
          fail: (err) => {
            this._dispatchEvent(EventType.Error, err)
          }
        })
      } else {
        this._ad.show()
      }
    },

    _onclick () {
      this.show()
    },

    _startLoading () {
      this.loading = true
      this.errorMessage = null
    },

    _canCreateAd () {
      let result = false
      if (typeof this.adpid === 'string' && this.adpid.length > 0) {
        result = true
      } else if (typeof this.adpid === 'number') {
        result = true
      }
      return result
    },

    _hasCallback () {
      return (typeof this.urlCallback === 'object' && Object.keys(this.urlCallback).length > 0)
    },

    _onmpload (e) {
      this.loading = false
      this._dispatchEvent(EventType.Load, {})
    },

    _onmpclose (e) {
      this._dispatchEvent(EventType.Close, e.detail)
      if (e.detail.adsdata) {
        const adv = e.detail.adv
        const adsdata = e.detail.adsdata
        const version = e.detail.version

        /* eslint-disable no-undef */
        uniCloud.callFunction({
          name: 'uniAdCallback',
          data: {
            adv: adv,
            adsdata: adsdata,
            version: version
          },
          secretType: 'both',
          success: (res) => {
          },
          fail: (err) => {
            this._dispatchEvent(EventType.Error, err)
          }
        })

        delete e.detail.adv
        delete e.detail.adsdata
        delete e.detail.version
      }
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
