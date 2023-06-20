import {
  invoke
} from '../../bridge'

import {
  showPage
} from '../../../helpers/page.js'

import {
  t
} from 'uni-core/helpers/i18n'

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
    data: Object.assign({}, options, {
      messages: {
        fail: t('uni.scanCode.fail'),
        'flash.on': t('uni.scanCode.flash.on'),
        'flash.off': t('uni.scanCode.flash.off')
      }
    }),
    style: {
      animationType: options.animationType || 'pop-in',
      titleNView: {
        autoBackButton: true,
        type: 'float',
        titleText: options.titleText || t('uni.scanCode.title'),
        titleColor: '#ffffff',
        backgroundColor: 'rgba(0,0,0,0)',
        buttons: !options.onlyFromCamera ? [{
          text: options.albumText || t('uni.scanCode.album'),
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
      background: '#000000',
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
