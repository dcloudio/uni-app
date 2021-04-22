import { getRealPath } from '@dcloudio/uni-platform'

export const API_SHOW_TOAST = 'showToast'
export type API_TYPE_SHOW_TOAST = typeof uni.showToast
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
    icon(value, params) {
      if (['success', 'loading', 'none'].indexOf(value!) === -1) {
        params.icon = 'success'
      }
    },
    image(value, params) {
      if (value) {
        params.image = getRealPath(value)
      }
    },
    duration: 1500,
    mask: false,
  },
}
