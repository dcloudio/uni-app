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

export function chooseLocation (options, callbackId) {
  const statusBarStyle = getStatusBarStyle()
  const isDark = statusBarStyle !== 'light'

  let result
  const page = showPage({
    url: '__uniappchooselocation',
    data: {
      keyword: options.keyword
    },
    style: {
      animationType: options.animationType || 'slide-in-bottom',
      titleNView: {
        autoBackButton: false,
        titleText: options.titleText || '选择位置',
        titleColor: '#ffffff',
        backgroundColor: 'rgba(0,0,0,1)',
        buttons: [{
          // text: options.cancelText || "取消",
          // fontSize: "17px",
          type: 'close',
          float: 'left',
          onclick: () => {
            page.close()
          }
        }, {
          text: options.doneText || '完成',
          fontSize: '17px',
          onclick: () => {
            page.sendMessage({
              type: 'done'
            })
          }
        }]
      },
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
