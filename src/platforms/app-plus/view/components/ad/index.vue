<template>
  <uni-ad
    v-bind="attrs"
    v-on="$listeners">
    <div
      ref="container"
      class="uni-ad-container" />
  </uni-ad>
</template>
<script>
import {
  subscriber
} from 'uni-mixins'
import native from '../../mixins/native'

const _adDataCache = {}
function getAdData (adpid, adWidth, onsuccess, onerror) {
  const key = adpid + '-' + adWidth
  const adDataList = _adDataCache[key]
  if (adDataList && adDataList.length > 0) {
    onsuccess(adDataList.splice(0, 1)[0])
    return
  }

  plus.ad.getAds(
    {
      adpid: adpid,
      count: 10,
      width: adWidth
    },
    (res) => {
      const list = res.ads
      onsuccess(list.splice(0, 1)[0])
      _adDataCache[key] = adDataList ? adDataList.concat(list) : list
    },
    (err) => {
      onerror({
        errCode: err.code,
        errMsg: err.message
      })
    }
  )
}

const methods = [
  'draw'
]

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
    let adStyle = Object.assign({
      id: 'AdView' + Date.now()
    }, this.position)
    let adView = this.adView = plus.ad.createAdView(adStyle)
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
    // 仅 Android 下载类广告
    adView.setDownloadListener && adView.setDownloadListener((data) => {
      this.$trigger('downloadchange', {}, data)
    })
    this._request()
  },
  beforeDestroy () {
    delete this.adView
  },
  methods: {
    _handleSubscribe ({
      type,
      data = {}
    }) {
      if (methods.includes(type)) {
        this.adView && this.adView[type](data)
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
      getAdData(adpid || this.adpid, this.position.width, (data) => {
        this._fillData(data)
      }, (err) => {
        this.$trigger('error', err)
      })
    },
    _fillData (data) {
      this.adView.renderingBind(data)

      // const height = plus.ad.measureAdHeight(this.position.width.replace('px', ''), data)
      // this.$refs.container.style.height = height + 'px'

      this.$trigger('load', {}, {})
    },
    _updateView () {
      window.dispatchEvent(new CustomEvent('updateview'))
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
