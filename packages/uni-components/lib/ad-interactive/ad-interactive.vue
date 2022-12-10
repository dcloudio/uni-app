<template>
  <view @click="onclick">
    <slot :options="options" :data="adData" :loading="loading" :error="errorMessage" />
  </view>
</template>

<script>
  const AD_URL = 'https://wxac1.dcloud.net.cn/openPage/acs'
  const AD_REPORT_URL = 'https://wxac1.dcloud.net.cn/openPage/acs'
  //const WEBVIEW_PATH = '/uni_modules/uni-ad-interactive/pages/uni-ad-interactive/uni-ad-interactive'

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
      disabled: {
        type: [Boolean, String],
        default: false
      },
      adpid: {
        type: [Number, String],
        default: ''
      },
      openType: {
        type: String,
        default: 'interactive'
      },
      openPagePath: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        adData: null,
        loading: false,
        errorMessage: ""
      }
    },
    created() {
      this._interactiveUrl = null
      if (this.openPagePath) {
        this.getAdData()
      }
    },
    methods: {
      getAdData() {
        if (!this.adpid) {
          this.$emit(events.error, {
            code: -5002,
            message: 'invalid adpid'
          })
          return
        }

        this.loading = true

        uni.request({
          url: AD_URL,
          method: 'POST',
          data: {
            adpid: this.adpid
          },
          timeout: 5000,
          dataType: 'json',
          success: (res) => {
            if (res.statusCode !== 200) {
              this.$emit(events.error, {
                errCode: res.statusCode,
                errMsg: res.statusCode
              })
              return
            }

            const responseData = res.data
            if (responseData.ret === 0) {
              this._interactiveUrl = responseData.data.adp_url
              this.adData = {
                imgUrl: responseData.data.icon_url,
                openPath: this.openPagePath + '?url=' + encodeURIComponent(this._interactiveUrl)
              }
              this.$emit(events.load, this.adData)
            } else {
              const errMsg = {
                errCode: responseData.ret,
                errMsg: responseData.msg
              }
              this.errorMessage = errMsg
              this.$emit(events.error, errMsg)
            }
          },
          fail: (err) => {
            this.$emit(events.error, {
              errCode: '',
              errMsg: err.errMsg
            })
          },
          complete: () => {
            this.loading = false
          }
        })
      },
      onclick() {
        if (this.disabled) {
          return
        }
        if (!this._interactiveUrl) {
          return
        }

        uni.navigateTo({
          url: this.adData.openPath
        })

        this._report()
      },
      _report() {
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
