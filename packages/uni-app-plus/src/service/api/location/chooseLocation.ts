import {
  API_CHOOSE_LOCATION,
  type API_TYPE_CHOOSE_LOCATION,
  ChooseLocationProtocol,
  defineAsyncApi,
  getLocale,
} from '@dcloudio/uni-api'
import { showPage } from '@dcloudio/uni-core'
import { getStatusBarStyle } from '../../../helpers/statusBar'
import { extend } from '@vue/shared'
import {
  ROUTE_LOCATION_PICKER_PAGE,
  initLocationPickerPageOnce,
} from './LoctaionPickerPage'

export const chooseLocation = defineAsyncApi<API_TYPE_CHOOSE_LOCATION>(
  API_CHOOSE_LOCATION,
  (options, { resolve, reject }) => {
    if (__uniConfig.qqMapKey) {
      initLocationPickerPageOnce()
      const {
        keyword = '',
        latitude = '',
        longitude = '',
        // @ts-expect-error TODO 新增useSecureNetwork参数，类型定义更新后移除此行
        useSecureNetwork = false,
      } = options || {}
      uni.navigateTo({
        url:
          '/' +
          ROUTE_LOCATION_PICKER_PAGE +
          '?keyword=' +
          keyword +
          '&latitude=' +
          latitude +
          '&longitude=' +
          longitude +
          '&useSecureNetwork=' +
          useSecureNetwork,
        events: {
          close: (res) => {
            if (res && res.latitude) {
              resolve(res)
            } else {
              reject('cancel')
            }
          },
        },
        fail: (err) => {
          reject(err.errMsg || 'cancel')
        },
      })
      return
    }
    const statusBarStyle = getStatusBarStyle()
    const isDark = statusBarStyle !== 'light'

    let result: undefined | UniApp.ChooseLocationSuccess
    const page = showPage({
      url: '__uniappchooselocation',
      data: extend({}, options, {
        locale: getLocale(),
      }),
      style: {
        // @ts-expect-error
        animationType: options.animationType || 'slide-in-bottom',
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
