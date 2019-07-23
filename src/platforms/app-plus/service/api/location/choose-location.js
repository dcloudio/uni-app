import {
  MAP_ID
} from '../constants'

import {
  invoke
} from '../../bridge'

import {
  ANI_DURATION
} from '../../constants'

import {
  registerPlusMessage
} from '../../framework/plus-message'

const CHOOSE_LOCATION_PATH = '_www/__uniappchooselocation.html'

export function chooseLocation (params, callbackId) {
  const statusBarStyle = plus.navigator.getStatusBarStyle()
  const webview = plus.webview.create(
    CHOOSE_LOCATION_PATH,
    MAP_ID, {
      titleNView: {
        autoBackButton: true,
        backgroundColor: '#000000',
        titleColor: '#ffffff',
        titleText: '选择位置',
        titleSize: '17px',
        buttons: [{
          float: 'right',
          text: '完成',
          fontSize: '17px',
          onclick: function () {
            webview.evalJS('__chooseLocationConfirm__()')
          }
        }]
      },
      popGesture: 'close',
      scrollIndicator: 'none'
    }, {
      __uniapp_type: 'map',
      __uniapp_statusbar_style: statusBarStyle,
      'uni-app': 'none'
    }
  )
  if (statusBarStyle === 'dark') {
    plus.navigator.setStatusBarStyle('light')
    webview.addEventListener('popGesture', ({
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

  webview.show('slide-in-bottom', ANI_DURATION, () => {
    webview.evalJS(`__chooseLocation__(${JSON.stringify(params)})`)
  })

  // fixed by hxy
  registerPlusMessage('chooseLocation', function (res) {
    if (res && !res.errMsg) {
      invoke(callbackId, {
        name: res.poiname,
        address: res.poiaddress,
        latitude: res.latlng.lat,
        longitude: res.latlng.lng,
        errMsg: 'chooseLocation:ok'
      })
    } else {
      const errMsg = res && res.errMsg ? ' ' + res.errMsg : ''
      invoke(callbackId, {
        errMsg: 'chooseLocation:fail' + errMsg
      })
    }
  }, false)
}
