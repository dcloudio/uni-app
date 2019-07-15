uni.navigateTo(plus.webview.open)
旧页面通过 viewdisappear 触发 onHide
新页面通过 beforeCreate  触发 onShow

uni.redirectTo(page.webview.close,plus.webview.show)
旧页面通过 beforeDestroy 触发 onUnload
新页面通过 beforeCreate  触发 onShow

uni.switchTab
旧非 Tab 页面通过 beforeDestroy 触发 onUnload
旧 Tab 页面通过 viewdisappear 触发 onHide

新创建 Tab 页面通过 beforeCreate 触发 onShow
新显示 Tab 页面通过 viewdisappear 触发 onShow

uni.reLaunch
旧页面通过 beforeDestroy 触发 onUnload
新页面通过 beforeCreate  触发 onShow