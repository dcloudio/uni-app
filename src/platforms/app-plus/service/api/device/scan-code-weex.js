import {
  invoke
} from '../../bridge'

import {
  showPage
} from '../page.js'

function getStatusBarStyle () {
  let style = plus.navigator.getStatusBarStyle()
  if (style === 'UIStatusBarStyleBlackTranslucent' || style === 'UIStatusBarStyleBlackOpaque' || style === 'null') {
    style = 'light'
  } else if (style === 'UIStatusBarStyleDefault') {
    style = 'dark'
  }
  return style
}

export function scanCode (options, callbackId) {
  const statusBarStyle = getStatusBarStyle()
  const isDark = statusBarStyle !== 'light'

  let result
  const page = showPage({
    url: '__uniappscan',
    data: {
      scanType: options.scanType
    },
    style: {
      animationType: options.animationType || 'pop-in',
      titleNView: {
        autoBackButton: true,
        type: 'float',
        titleText: options.titleText || '扫码',
        titleColor: '#ffffff',
        backgroundColor: 'rgba(0,0,0,0)',
        buttons: !options.onlyFromCamera ? [{
          text: options.albumText || '相册',
          fontSize: '17px',
          width: '60px',
          onclick: () => {
            page.sendMessage({
              type: 'gallery'
            })
          }
        }] : []
      },
      popGesture: 'close',
      backButtonAutoControl: 'close'
    },
    onMessage ({
      event,
      detail
    }) {
      result = detail
      if (event === 'marked') {
        result.errMsg = 'scanCode:ok'
      } else {
        result.errMsg = 'scanCode:fail ' + detail.message
      }
    },
    onClose () {
      if (isDark) {
        plus.navigator.setStatusBarStyle('dark')
      }
      invoke(callbackId, result || {
        errMsg: 'scanCode:fail cancel'
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
