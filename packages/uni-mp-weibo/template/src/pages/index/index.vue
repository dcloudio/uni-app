<template>
  <view style="height: 100vh; width: 100vw;"> 
    <wbx-web-view 
      :src="herf"
      height="100%" 
      width="100%" 
      :data="data" 
      style="border: none" 
      @message="message"
    ></wbx-web-view>
  </view>
</template>

<script>
import { callWbxApi } from '@wbox_developer/uni-weibo/dist/service'
const baseHerf = "res/h5/index.html"

/**
* @type WBXAppOption 
*/
const pageOptions = {
  data() {
    return {
      data: null,
      globalData: getApp().globalData,
      herf: baseHerf,
      shareAppMessage: null
    }
  },
  wbox: {
    onLoad(options) {
      const pageInfo = wbx.getCurrentPagesSync()
      const queryParams = options && (options.queryParams || options.query)
      // if (queryParams && queryParams.uniappWebviewHerf) {
      //   this.herf = `${baseHerf}#${decodeURIComponent(queryParams.uniappWebviewHerf)}`
      // } else
      if (queryParams && queryParams.page) {
        this.herf = queryParams.page
      } else if (pageInfo && pageInfo.data && pageInfo.data.currentPages && pageInfo.data.currentPages.length) {
        const len = pageInfo.data.currentPages.length
        const pageName = pageInfo.data.currentPages[len - 1].pageName
        if (pageName) {
          this.herf = `${baseHerf}#${decodeURIComponent(pageName)}`
        }
      }
    },
    onShareAppMessage(){
      return this.shareAppMessage
    }
  },
  methods: {
    message(e){
      const { id, eventName, data } = e.detail.data
      callWbxApi({ vm: this, id, eventName, data })
    }
  }
}
export default pageOptions;
</script>
