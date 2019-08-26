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
        }
        if (backgroundColor) {
          page.navigationBar.backgroundColor = backgroundColor
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
        if (__PLATFORM__ === 'h5') {
          document.title = title
        }
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
