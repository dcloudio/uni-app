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

      setTimeout(() => {
        this.loading = false
      }, 3000)
    },

    show () {
      this.errorMessage = null
      this._ad = this.selectComponent('.uni-ad')
      this._ad.show()
    },

    _onclick () {
      this.show()
    },

    _startLoading () {
      this.loading = true
      this.errorMessage = null
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
