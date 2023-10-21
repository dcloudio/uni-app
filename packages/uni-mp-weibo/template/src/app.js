import { appFuncCallBacks } from '@wbox_developer/uni-weibo-vue2/dist/service'
// import { appFuncCallBacks } from './pages/index/service'

/**
* @type WBXAppOption 
*/
const appOptions = {
  globalData: {
    testWboxColorScheme: 'light',
  },
  onThemeChange(options){
    this.globalData.testWboxColorScheme = options.wboxColorScheme
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