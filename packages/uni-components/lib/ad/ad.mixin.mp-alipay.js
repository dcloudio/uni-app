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
      this._refAdPlugin.show()
    },

    _handleAdRef(c) {
      this._refAdPlugin = c.detail
      if (this.preload && this._canCreateAd()) {
        this._startLoading()
      }
    },

    _onclick () {
      this.show()
    },

    _startLoading () {
      this.loading = true
      this.errorMessage = null
      this._refAdPlugin.load()
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
      this._dispatchEvent(EventType.Close, e)
    },

    _onmperror (e) {
      this.loading = false
      this.errorMessage = JSON.stringify(e)
      this._dispatchEvent(EventType.Error, e)
    },

    _dispatchEvent (type, data) {
      this.$emit(type, data)
    }
  }
}
