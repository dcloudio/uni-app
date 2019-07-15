function getWebviewStyle () {
  return {
    titleNView: {
      autoBackButton: true,
      titleText: 'titleText'
    }
  }
}
export default class Router {
  constructor (routes, plus) {
    this.routes = routes
    this.plus = plus
    this.id = 0

    this.aniShow = plus.os.name === 'Android' ? 'slide-in-right' : 'pop-in'
    this.aniClose = 'pop-out'
    this.aniDuration = 300
  }

  push ({
    type,
    path
  } = {}) {
    this.plus.webview.open(
      '',
      String(this.id++),
      getWebviewStyle(),
      this.aniShow,
      this.aniDuration,
      () => {
        console.log('show.callback')
      })
  }

  replace ({
    type,
    path
  } = {}) {

  }

  go (delta) {

  }
}
