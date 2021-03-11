import {
  TEMP_PATH
} from '../constants'

import {
  getStatusBarStyle
} from '../util'

import {
  invoke
} from '../../bridge'

import {
  ANI_SHOW,
  ANI_DURATION
} from '../../constants'

import {
  registerPlusMessage,
  consumePlusMessage
} from '../../framework/plus-message'

import {
  t,
  getLocale
} from 'uni-core/helpers/i18n'

export const SCAN_ID = '__UNIAPP_SCAN'
export const SCAN_PATH = '_www/__uniappscan.html'

const MESSAGE_TYPE = 'scanCode'

export function scanCode ({
  onlyFromCamera = false,
  scanType,
  autoDecodeCharSet
}, callbackId) {
  const barcode = plus.barcode
  const SCAN_TYPES = {
    qrCode: [
      barcode.QR,
      barcode.AZTEC,
      barcode.MAXICODE
    ],
    barCode: [
      barcode.EAN13,
      barcode.EAN8,
      barcode.UPCA,
      barcode.UPCE,
      barcode.CODABAR,
      barcode.CODE128,
      barcode.CODE39,
      barcode.CODE93,
      barcode.ITF,
      barcode.RSS14,
      barcode.RSSEXPANDED
    ],
    datamatrix: [barcode.DATAMATRIX],
    pdf417: [barcode.PDF417]
  }

  const SCAN_MAPS = {
    [barcode.QR]: 'QR_CODE',
    [barcode.EAN13]: 'EAN_13',
    [barcode.EAN8]: 'EAN_8',
    [barcode.DATAMATRIX]: 'DATA_MATRIX',
    [barcode.UPCA]: 'UPC_A',
    [barcode.UPCE]: 'UPC_E',
    [barcode.CODABAR]: 'CODABAR',
    [barcode.CODE39]: 'CODE_39',
    [barcode.CODE93]: 'CODE_93',
    [barcode.CODE128]: 'CODE_128',
    [barcode.ITF]: 'CODE_25',
    [barcode.PDF417]: 'PDF_417',
    [barcode.AZTEC]: 'AZTEC',
    [barcode.RSS14]: 'RSS_14',
    [barcode.RSSEXPANDED]: 'RSSEXPANDED'
  }

  const statusBarStyle = getStatusBarStyle()
  const isDark = statusBarStyle !== 'light'

  let result

  let filters = []
  if (Array.isArray(scanType) && scanType.length) {
    scanType.forEach(type => { // 暂不考虑去重
      const types = SCAN_TYPES[type]
      if (types) {
        filters = filters.concat(types)
      }
    })
  }
  if (!filters.length) {
    filters = filters.concat(SCAN_TYPES.qrCode).concat(SCAN_TYPES.barCode).concat(SCAN_TYPES.datamatrix).concat(
      SCAN_TYPES.pdf417)
  }

  const buttons = []
  if (!onlyFromCamera) {
    buttons.push({
      float: 'right',
      text: t('uni.scanCode.album'),
      fontSize: '17px',
      width: '60px',
      onclick: function () {
        plus.gallery.pick(file => {
          barcode.scan(file, (type, code, path, charSet) => {
            if (isDark) {
              plus.navigator.setStatusBarStyle('dark')
            }
            result = {
              type,
              code,
              charSet
            }
            webview.close('auto')
          }, () => {
            plus.nativeUI.toast(t('uni.scanCode.fail'))
          }, filters, autoDecodeCharSet)
        }, err => {
          // iOS {"code":-2,"message":"用户取消,https://ask.dcloud.net.cn/article/282"}
          // Android {"code":12,"message":"User cancelled"}
          if (err.code !== (plus.os.name === 'Android' ? 12 : -2)) {
            plus.nativeUI.toast(t('uni.scanCode.fail'))
          }
        }, {
          multiple: false,
          system: false,
          filename: TEMP_PATH + '/gallery/',
          permissionAlert: true
        })
      }
    })
  }

  const webview = plus.webview.create(SCAN_PATH, SCAN_ID, {
    titleNView: {
      autoBackButton: true,
      type: 'float',
      backgroundColor: 'rgba(0,0,0,0)',
      titleColor: '#ffffff',
      titleText: t('uni.scanCode.title'),
      titleSize: '17px',
      buttons
    },
    popGesture: 'close',
    backButtonAutoControl: 'close'
  }, {
    __uniapp_type: 'scan',
    __uniapp_dark: isDark,
    __uniapp_scan_type: filters,
    __uniapp_auto_decode_char_set: autoDecodeCharSet,
    __uniapp_locale: getLocale(),
    'uni-app': 'none'
  })
  const waiting = plus.nativeUI.showWaiting()
  webview.addEventListener('titleUpdate', () => {
    webview.show(ANI_SHOW, ANI_DURATION, () => {
      waiting.close()
    })
  })
  webview.addEventListener('close', () => {
    if (result) {
      invoke(callbackId, {
        result: result.code,
        scanType: SCAN_MAPS[result.type] || '',
        charSet: result.charSet || 'utf8',
        path: '',
        errMsg: 'scanCode:ok'
      })
    } else {
      invoke(callbackId, {
        errMsg: 'scanCode:fail cancel'
      })
    }
    consumePlusMessage(MESSAGE_TYPE)
  })
  if (isDark) { // 状态栏前景色
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

  registerPlusMessage(MESSAGE_TYPE, function (res) {
    if (res && 'code' in res) {
      result = res
    }
  }, false)
}
