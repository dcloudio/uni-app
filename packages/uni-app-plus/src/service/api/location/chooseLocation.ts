import {
  API_CHOOSE_LOCATION,
  API_TYPE_CHOOSE_LOCATION,
  defineAsyncApi,
  ChooseLocationProtocol,
} from '@dcloudio/uni-api'
import { showPage } from '@dcloudio/uni-core'
import { getStatusBarStyle } from '../../../helpers/statusBar'

export const chooseLocation = <API_TYPE_CHOOSE_LOCATION>defineAsyncApi(
  API_CHOOSE_LOCATION,
  (options, { resolve, reject }) => {
    const statusBarStyle = getStatusBarStyle()
    const isDark = statusBarStyle !== 'light'

    let result: undefined | UniApp.ChooseLocationSuccess
    const page = showPage({
      url: '__uniappchooselocation',
      data: options,
      style: {
        // @ts-expect-error
        animationType: options.animationType || 'slide-in-bottom',
        // @ts-expect-error
        titleNView: false,
        popGesture: 'close',
        scrollIndicator: 'none',
      },
      onMessage({
        event,
        detail,
      }: {
        event: string
        detail: UniApp.ChooseLocationSuccess
      }) {
        if (event === 'selected') {
          result = detail
        }
      },
      onClose() {
        if (isDark) {
          plus.navigator.setStatusBarStyle('dark')
        }

        result ? resolve(result) : reject('cancel')
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
  ChooseLocationProtocol
)
