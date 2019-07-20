export function createHolder (webview, {
  navigationBar
}, {
  Vue
}) {
  const navigationBarState = Vue.observable(navigationBar)

  /* eslint-disable no-new */
  new Vue({
    created () {
      this.$watch(() => navigationBarState.titleText, (val, oldVal) => {
        webview.setStyle({
          titleNView: {
            titleText: val || ''
          }
        })
      })
      this.$watch(() => [navigationBarState.textColor, navigationBarState.backgroundColor], (val) => {
        webview.setStyle({
          titleNView: {
            titleColor: val[0],
            backgroundColor: val[1]
          }
        })
      })
    }
  })

  return {
    navigationBar: navigationBarState
  }
}
