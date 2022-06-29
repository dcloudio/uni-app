<template>
  <view @click="onclick">
    <slot
      :options="options"
      :data="adData"
    />
  </view>
</template>

<script>
const AD_URL = 'https://wxac1.dcloud.net.cn/tuiaApplet/acs'
const AD_REPORT_URL = 'https://wxac1.dcloud.net.cn/tuiaApplet/acs'
const WEBVIEW_PATH = '/uni_modules/uni-ad-interactive/pages/uni-ad-interactive/uni-ad-interactive'

const events = {
  load: 'load',
  close: 'close',
  error: 'error'
}

const OpenTypes = {
  Interactive: 'interactive'
}

export default {
  name: 'AdInteractive',
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
    openUrl: {
      type: String,
      default: WEBVIEW_PATH
    }
  },
  data () {
    return {
      adData: {}
    }
  },
  created () {
    this._uniAdPlugin = null
    this._interactiveUrl = null
    if (this.openType === OpenTypes.Interactive) {
      this.getAdData()
    }
  },
  methods: {
    show () {
      if (this._uniAdPlugin === null) {
        this._uniAdPlugin = this.selectComponent('.uni-ad-plugin')
      }
      this._uniAdPlugin.show()
    },
    getAdData () {
      if (!this.adpid) {
        this.$emit(events.error, {
          code: -5002,
          message: 'invalid adpid'
        })
        return
      }

      uni.request({
        url: AD_URL,
        method: 'POST',
        data: {
          adpid: this.adpid
        },
        timeout: 5000,
        dataType: 'json',
        success: (res) => {
          console.log(res.data)

          if (res.statusCode !== 200) {
            this.$emit(events.error, {
              code: res.statusCode,
              message: res.statusCode
            })
            return
          }

          const responseData = res.data
          if (responseData.ret === 0) {
            this._interactiveUrl = responseData.data.adp_url
            this.adData.imgUrl = responseData.data.icon_url
            this.adData.openUrl = this.openUrl + '?url=' + encodeURIComponent(this._interactiveUrl)
            this.$emit(events.load, {})
          } else {
            this.$emit(events.error, {
              code: responseData.ret,
              message: responseData.msg
            })
          }
        },
        fail: (err) => {
          this.$emit(events.error, {
            code: '',
            message: err.errMsg
          })
        }
      })
    },
    onclick () {
      if (this.openType !== OpenTypes.Interactive || !this._interactiveUrl) {
        return
      }

      uni.navigateTo({
        url: this.adData.openUrl
      })

      this._report()
    },
    _report () {
      uni.request({
        url: AD_REPORT_URL,
        data: {
          adpid: this.adpid,
          t: '10019'
        },
        timeout: 5000,
        dataType: 'json'
      })
    }
  }
}
</script>

<style>
  view {
    display: block;
  }
</style>
