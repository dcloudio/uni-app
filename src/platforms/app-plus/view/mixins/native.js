export default {
  name: 'Native',
  data () {
    return {
      position: {
        top: '0px',
        left: '0px',
        width: '0px',
        height: '0px',
        position: 'static'
      },
      hidden: false
    }
  },
  created () {
    this.isNative = true
    this.onCanInsertCallbacks = []
  },
  mounted () {
    this._updatePosition()
    this.$nextTick(() => {
      this.onCanInsertCallbacks.forEach(callback => callback())
    })
    this.$on('uni-view-update', this._requestPositionUpdate)
  },
  methods: {
    _updatePosition () {
      const rect = (this.$refs.container || this.$el).getBoundingClientRect()
      this.hidden = rect.width === 0 || rect.height === 0
      if (!this.hidden) {
        ['top', 'left', 'width', 'height'].forEach(key => {
          let val = rect[key]
          val = key === 'top' ? val + (document.documentElement.scrollTop || document.body.scrollTop || 0) : val
          this.position[key] = val + 'px'
        })
      }
    },
    _requestPositionUpdate () {
      if (this._positionUpdateRequest) {
        cancelAnimationFrame(this._positionUpdateRequest)
      }
      this._positionUpdateRequest = requestAnimationFrame(() => {
        delete this._positionUpdateRequest
        this._updatePosition()
      })
    }
  }
}
