#### Worker

目前需分平台编写

- 微信小程序：[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/worker/wx.createWorker.html)
- 字节跳动小程序：[规范详情](https://developer.toutiao.com/docs/game/worker/tt.createWorker.html)
- QQ小程序：[规范详情](https://q.qq.com/wiki/develop/miniprogram/API/worker/worker.html)
- H5：标准H5的worker仍然可以使用
- App：App的js是在独立的jscore运行的，如果需要在另一个线程运行js，可以使用web-view组件或renderjs，这样的js运行在webview里，和jscore里的js是两个线程。但注意多个webview之间的js是一个进程，使用webview里的js时注意会影响视图层的渲染。
