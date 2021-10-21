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
import native from '../../mixins/native'

const attrs = [
  'adpid',
  'data'
]

export default {
  name: 'Ad',
  mixins: [subscriber, native],
  props: {
    adpid: {
      type: [Number, String],
      default: ''
    },
    data: {
      type: Object,
      default: null
    },
    dataCount: {
      type: Number,
      default: 5
    },
    channel: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      hidden: false
    }
  },
  computed: {
    attrs () {
      const obj = {}
      attrs.forEach(key => {
        let val = this.$props[key]
        val = key === 'src' ? this.$getRealPath(val) : val
        obj[key.replace(/[A-Z]/g, str => '-' + str.toLowerCase())] = val
      })
      return obj
    }
  },
  watch: {
    hidden (val) {
      this.adView && this.adView[val ? 'hide' : 'show']()
    },
    adpid (val) {
      if (val) {
        this._loadData(val)
      }
    },
    data (val) {
      if (val) {
        this._fillData(val)
      }
    }
  },
  mounted () {
    this._onParentReady(() => {
      this._adId = 'AdView-' + this._newGUID()
      const adStyle = Object.assign({
        id: this._adId
      }, this.position)
      const adView = this.adView = plus.ad.createAdView(adStyle)
      adView.interceptTouchEvent(false)
      plus.webview.currentWebview().append(adView)
      if (this.hidden) {
        adView.hide()
      }
      this.$watch('attrs', () => {
        this._request()
      }, {
        deep: true
      })
      this.$watch('position', () => {
        this.adView && this.adView.setStyle(this.position)
      }, {
        deep: true
      })
      // 模板渲染有效
      adView.setDislikeListener && adView.setDislikeListener((data) => {
        this.adView && this.adView.close()
        this.$refs.container.style.height = '0px'

        this._updateView()

        this.$trigger('close', {}, data)
      })
      adView.setRenderingListener && adView.setRenderingListener((data) => {
        if (data.result === 0) {
          this.$refs.container.style.height = data.height + 'px'
          this._updateView()
        } else {
          this.$trigger('error', {}, {
            errCode: data.result
          })
        }
      })
      adView.setAdClickedListener((data) => {
        this.$trigger('adclicked', {}, data)
      })

      this._callbackId = this.$page.id + this._adId
      UniViewJSBridge.subscribe(this._callbackId, this._handleAdData.bind(this))

      this._request()
    })
  },
  beforeDestroy () {
    this.adView && this.adView.close()
    delete this.adView
  },
  methods: {
    _handleAdData ({
      type,
      data = {}
    }) {
      switch (type) {
        case 'success':
          this._fillData(data)
          break
        case 'fail':
          this.$trigger('error', {}, data)
          break
      }
    },
    _request () {
      if (!this.adView) {
        return
      }

      if (this.data) {
        this._fillData(this.data)
      } else if (this.adpid) {
        this._loadData()
      }
    },
    _loadData (adpid) {
      const data = {
        adpid: adpid || this.adpid,
        width: this.position.width,
        count: this.dataCount,
        ext: {
          channel: this.channel
        }
      }
      UniViewJSBridge.publishHandler('onAdMethodCallback', {
        callbackId: this._callbackId,
        data
      }, this.$page.id)
    },
    _fillData (data) {
      this.adView.renderingBind(data)
      this.$trigger('load', {}, {})
    },
    _updateView () {
      window.dispatchEvent(new CustomEvent('updateview'))
    },
    _newGUID () {
      let guid = ''
      const format = 'xxxxxxxx-xxxx'
      for (let i = 0; i < format.length; i++) {
        if (format[i] === 'x') {
          guid += (Math.random() * 16 | 0).toString(16)
        } else {
          guid += format[i]
        }
      }
      return guid.toUpperCase()
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
    width: 100%;
    min-height: 1px;
  }
</style>
