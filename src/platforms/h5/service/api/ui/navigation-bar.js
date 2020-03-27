function setNavigationBar (type, args) {
  const pages = getCurrentPages()
  if (pages.length) {
    const page = pages[pages.length - 1].$holder

    switch (type) {
      case 'setNavigationBarColor':
        const {
          frontColor,
          backgroundColor,
          animation
        } = args

        const {
          duration,
          timingFunc
        } = animation

        if (frontColor) {
          page.navigationBar.textColor = frontColor === '#000000' ? 'black' : 'white'
          UniServiceJSBridge.emit('onNavigationBarChange', {
            textColor: frontColor === '#000000' ? '#000' : '#fff'
          })
        }
        if (backgroundColor) {
          page.navigationBar.backgroundColor = backgroundColor
          UniServiceJSBridge.emit('onNavigationBarChange', {
            backgroundColor
          })
        }
        page.navigationBar.duration = duration + 'ms'
        page.navigationBar.timingFunc = timingFunc
        break
      case 'showNavigationBarLoading':
        page.navigationBar.loading = true
        break
      case 'hideNavigationBarLoading':
        page.navigationBar.loading = false
        break
      case 'setNavigationBarTitle':
        const {
          title
        } = args
        page.navigationBar.titleText = title
        document.title = title
        UniServiceJSBridge.emit('onNavigationBarChange', {
          titleText: title
        })
        break
    }
  }
  return {}
}

export function setNavigationBarColor (args) {
  return setNavigationBar('setNavigationBarColor', args)
}

export function showNavigationBarLoading () {
  return setNavigationBar('showNavigationBarLoading')
}

export function hideNavigationBarLoading () {
  return setNavigationBar('hideNavigationBarLoading')
}

export function setNavigationBarTitle (args) {
  return setNavigationBar('setNavigationBarTitle', args)
}
