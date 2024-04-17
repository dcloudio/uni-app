import { showPage } from '@dcloudio/uni-core'
import {
  API_SCAN_CODE,
  type API_TYPE_SCAN_CODE,
  ScanCodeOptions,
  ScanCodeProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { initI18nScanCodeMsgsOnce, useI18n } from '@dcloudio/uni-core'
import { getStatusBarStyle } from '../../../helpers/statusBar'

export const scanCode = defineAsyncApi<API_TYPE_SCAN_CODE>(
  API_SCAN_CODE,
  (options, { resolve, reject }) => {
    initI18nScanCodeMsgsOnce()
    const { t } = useI18n()

    const statusBarStyle = getStatusBarStyle()
    const isDark = statusBarStyle !== 'light'

    let result: (UniApp.ScanCodeSuccessRes & { message?: string }) | undefined
    let success = false
    const page = showPage({
      url: '__uniappscan',
      data: Object.assign({}, options, {
        messages: {
          fail: t('uni.scanCode.fail'),
          'flash.on': t('uni.scanCode.flash.on'),
          'flash.off': t('uni.scanCode.flash.off'),
        },
      }),
      style: {
        // @ts-expect-error
        animationType: options.animationType || 'pop-in',
        titleNView: {
          autoBackButton: true,
          type: 'float',
          // @ts-expect-error
          titleText: options.titleText || t('uni.scanCode.title'),
          titleColor: '#ffffff',
          backgroundColor: 'rgba(0,0,0,0)',
          buttons: !options.onlyFromCamera
            ? [
                {
                  // @ts-expect-error
                  text: options.albumText || t('uni.scanCode.album'),
                  fontSize: '17px',
                  width: '60px',
                  onclick: () => {
                    page.sendMessage({
                      type: 'gallery',
                    })
                  },
                },
              ]
            : [],
        },
        popGesture: 'close',
        background: '#000000',
        backButtonAutoControl: 'close',
      },
      onMessage({
        event,
        detail,
      }: {
        event: string
        detail: UniApp.ScanCodeSuccessRes
      }) {
        result = detail
        success = event === 'marked'
      },
      onClose() {
        if (isDark) {
          plus.navigator.setStatusBarStyle('dark')
        }

        result
          ? success
            ? (delete result.message, resolve(result))
            : reject(result.message)
          : reject('cancel')
      },
    })

    if (isDark) {
      plus.navigator.setStatusBarStyle('light')
      page.webview.addEventListener('popGesture', ({ type, result }) => {
        if (type === 'start') {
          plus.navigator.setStatusBarStyle('dark')
        } else if (type === 'end' && !result) {
          plus.navigator.setStatusBarStyle('light')
        }
      })
    }
  },
  ScanCodeProtocol,
  ScanCodeOptions
)
