export function onWebviewPopGesture (webview) {
  // TODO 优化相关依赖性
  // webview.addEventListener('popGesture', e => {
  //   if (e.type === 'start') {
  //     // 开始拖拽,还原状态栏前景色
  //     this.restoreStatusBarStyle()
  //   } else if (e.type === 'end' && !e.result) {
  //     // 拖拽未完成,设置为当前状态栏前景色
  //     this.setStatusBarStyle()
  //   } else if (e.type === 'end' && e.result) {
  //     removeWebview(this.id)
  //     const lastWebview = getLastWebview()
  //     if (lastWebview) {
  //       publish('onAppRoute', {
  //         path: lastWebview.page.replace('.html', ''),
  //         query: {},
  //         openType: 'navigateBack',
  //         webviewId: lastWebview.id
  //       })
  //     }
  //   }
  // })
}
