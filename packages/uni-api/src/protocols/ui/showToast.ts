import { getRealPath } from '@dcloudio/uni-platform'
import { elemInArray } from '../../helpers/protocol'

export const API_SHOW_TOAST = 'showToast'
export type API_TYPE_SHOW_TOAST = typeof uni.showToast
export type API_TYPE_SHOW_TOAST_ICON = 'success' | 'loading' | 'none' | 'error'
export const SHOW_TOAST_ICON: API_TYPE_SHOW_TOAST_ICON[] = [
  'success',
  'loading',
  'none',
  'error',
]

export const ShowToastProtocol: ApiProtocol<API_TYPE_SHOW_TOAST> = {
  title: String,
  icon: String as any,
  image: String,
  duration: Number,
  mask: Boolean,
}
export const ShowToastOptions: ApiOptions<API_TYPE_SHOW_TOAST> = {
  formatArgs: {
    title: '',
    icon(type, params) {
      params.icon = elemInArray(type, SHOW_TOAST_ICON)
    },
    image(value, params) {
      if (value) {
        params.image = getRealPath(value)
      } else {
        params.image = ''
      }
    },
    duration: 1500,
    mask: false,
  },
}
