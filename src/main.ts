import App from './App.uvue'

import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  // app.mixin({
  //   onReady() {
  //     setTimeout(() => {
  //       console.log((this as BasePage).$nativePage!.getDomJson())
  //     }, 100)
  //   }
  // })
  return {
    app
  }
}
// 此注释必须放在此文件的最后一行，用于测试issue#18520
