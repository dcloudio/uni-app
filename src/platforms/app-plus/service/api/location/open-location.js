import {
  MAP_ID
} from '../constants'

import {
  ANI_SHOW,
  ANI_DURATION
} from '../../constants'

const OPEN_LOCATION_PATH = '_www/__uniappopenlocation.html'

export function openLocation (params) {
  const statusBarStyle = plus.navigator.getStatusBarStyle()
  const webview = plus.webview.create(
    OPEN_LOCATION_PATH,
    MAP_ID, {
      titleNView: {
        autoBackButton: true,
        titleColor: '#ffffff',
        titleText: '',
        titleSize: '17px',
        type: 'transparent'
      },
      popGesture: 'close',
      scrollIndicator: 'none'
    }, {
      __uniapp_type: 'map',
      __uniapp_statusbar_style: statusBarStyle,
      'uni-app': 'none'
    }
  )
  if (statusBarStyle === 'light') {
    plus.navigator.setStatusBarStyle('dark')
    webview.addEventListener('popGesture', ({
      type,
      result
    }) => {
      if (type === 'start') {
        plus.navigator.setStatusBarStyle('light')
      } else if (type === 'end' && !result) {
        plus.navigator.setStatusBarStyle('dark')
      }
    })
  }
  webview.show(ANI_SHOW, ANI_DURATION, () => {
    webview.evalJS(`__openLocation__(${JSON.stringify(params)})`)
  })

  return {
    errMsg: 'openLocation:ok'
  }
}
