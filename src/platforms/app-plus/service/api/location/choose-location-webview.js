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
  registerPlusMessage,
  consumePlusMessage
} from '../../framework/plus-message'

const CHOOSE_LOCATION_PATH = '_www/__uniappchooselocation.html'

const MESSAGE_TYPE = 'chooseLocation'

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
          width: '60px',
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
  let index = 0
  const onShow = function () {
    index++
    if (index === 2) {
      webview.evalJS(`__chooseLocation__(${JSON.stringify(params)})`)
    }
  }
  webview.addEventListener('loaded', onShow)
  webview.show('slide-in-bottom', ANI_DURATION, onShow)

  let result

  webview.addEventListener('close', () => {
    if (result) {
      invoke(callbackId, {
        name: result.poiname,
        address: result.poiaddress,
        latitude: result.latlng.lat,
        longitude: result.latlng.lng,
        errMsg: 'chooseLocation:ok'
      })
    } else {
      consumePlusMessage(MESSAGE_TYPE)
      invoke(callbackId, {
        errMsg: 'chooseLocation:fail cancel'
      })
    }
  })

  registerPlusMessage(MESSAGE_TYPE, function (res) {
    if (res && 'latlng' in res) {
      result = res
    }
  }, false)
}
