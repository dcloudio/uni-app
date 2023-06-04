import { appFuncCallBacks } from '@wbox/uni-weibo/dist/service'
/**
* @type WBXAppOption 
*/
const appOptions = {
  globalData: {
  },
  onShow() {
    const appShow = appFuncCallBacks.appShow
    if(appShow) {
      appShow.callBack(appShow.args)
    }
  },
  onHide() {
    const appHide = appFuncCallBacks.appHide
    if(appHide) {
      appHide.callBack(appHide.args)
    }
  }
}
export default appOptions;