import {
  invoke
} from '../../bridge'

import {
  showPage
} from '../../../helpers/page.js'

function getStatusBarStyle () {
  let style = plus.navigator.getStatusBarStyle()
  if (style === 'UIStatusBarStyleBlackTranslucent' || style === 'UIStatusBarStyleBlackOpaque' || style === 'null') {
    style = 'light'
  } else if (style === 'UIStatusBarStyleDefault') {
    style = 'dark'
  }
  return style
}

export function chooseLocation (options, callbackId) {
  const statusBarStyle = getStatusBarStyle()
  const isDark = statusBarStyle !== 'light'

  let result
  const page = showPage({
    url: '__uniappchooselocation',
    data: options,
    style: {
      animationType: options.animationType || 'slide-in-bottom',
      titleNView: false,
      popGesture: 'close',
      scrollIndicator: 'none'
    },
    onMessage ({
      event,
      detail
    }) {
      if (event === 'selected') {
        result = detail
        result.errMsg = 'chooseLocation:ok'
      }
    },
    onClose () {
      if (isDark) {
        plus.navigator.setStatusBarStyle('dark')
      }

      invoke(callbackId, result || {
        errMsg: 'chooseLocation:fail cancel'
      })
    }
  })

  if (isDark) {
    plus.navigator.setStatusBarStyle('light')
    page.webview.addEventListener('popGesture', ({
      type,
      result
    }) => {
      if (type === 'start') {
        plus.navigator.setStatusBarStyle('dark')
      } else if (type === 'end' && !result) {
        plus.navigator.setStatusBarStyle('light')
      }
    })
  }
}
