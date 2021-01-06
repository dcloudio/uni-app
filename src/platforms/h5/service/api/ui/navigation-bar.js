import {
  isCurrentPage,
  getPageHolder
} from '../util.js'

function setNavigationBar (type, args = {}) {
  const page = getPageHolder(args.__page__)
  if (page) {
    switch (type) {
      case 'setNavigationBarColor':
        {
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
          UniServiceJSBridge.emit('onNavigationBarChange', {
            textColor: frontColor === '#000000' ? '#000' : '#fff',
            backgroundColor: page.navigationBar.backgroundColor
          })
          page.navigationBar.duration = duration + 'ms'
          page.navigationBar.timingFunc = timingFunc
        }
        break
      case 'showNavigationBarLoading':
        page.navigationBar.loading = true
        break
      case 'hideNavigationBarLoading':
        page.navigationBar.loading = false
        break
      case 'setNavigationBarTitle':
        {
          const {
            title
          } = args
          page.navigationBar.titleText = title
          if (isCurrentPage(page)) { // 仅当前页面
            document.title = title
          }
          UniServiceJSBridge.emit('onNavigationBarChange', {
            titleText: title
          })
        }
        break
    }
  }
  return {}
}

export function setNavigationBarColor (args) {
  return setNavigationBar('setNavigationBarColor', args)
}

export function showNavigationBarLoading (args) {
  return setNavigationBar('showNavigationBarLoading', args)
}

export function hideNavigationBarLoading (args) {
  return setNavigationBar('hideNavigationBarLoading', args)
}

export function setNavigationBarTitle (args) {
  return setNavigationBar('setNavigationBarTitle', args)
}
