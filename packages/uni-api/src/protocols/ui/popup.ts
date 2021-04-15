import { hasOwn } from '@vue/shared'
import { useI18n, initI18nShowModalMsgs } from '@dcloudio/uni-core'
import { PRIMARY_COLOR } from '@dcloudio//uni-shared'
import { getRealPath } from '@dcloudio/uni-platform'
export const API_SHOW_MODAL = 'showModal'
export type API_TYPE_SHOW_MODAL = typeof uni.showModal

export const ShowModalProtocol: ApiProtocol<API_TYPE_SHOW_MODAL> = {
  title: String,
  content: String,
  showCancel: Boolean,
  cancelText: String,
  cancelColor: String,
  confirmText: String,
  confirmColor: String,
}
let isInitI18nShowModalMsgs = false
export const ShowModalOptions: ApiOptions<API_TYPE_SHOW_MODAL> = {
  beforeInvoke() {
    // dynamic init (tree shaking)
    if (isInitI18nShowModalMsgs) {
      return
    }
    isInitI18nShowModalMsgs = true
    initI18nShowModalMsgs()
  },
  formatArgs: {
    title: '',
    content: '',
    showCancel: true,
    cancelText(_value, params) {
      if (!hasOwn(params, 'cancelText')) {
        const { t } = useI18n()
        params.cancelText = t('uni.showModal.cancel')
      }
    },
    cancelColor: '#000',
    confirmText(_value, params) {
      if (!hasOwn(params, 'confirmText')) {
        const { t } = useI18n()
        params.confirmText = t('uni.showModal.confirm')
      }
    },
    confirmColor: PRIMARY_COLOR,
  },
}
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
export const API_SHOW_LOADING = 'showLoading'
export type API_TYPE_SHOW_LOADING = typeof uni.showLoading
export const ShowLoadingProtocol: ApiProtocol<API_TYPE_SHOW_LOADING> = {
  title: String,
  mask: Boolean,
}
export const ShowLoadingOptions: ApiOptions<API_TYPE_SHOW_LOADING> = {
  formatArgs: {
    title: '',
    mask: false,
  },
}

export const API_SHOW_ACTION_SHEET = 'showActionSheet'
export type API_TYPE_SHOW_ACTION_SHEET = typeof uni.showActionSheet
export const ShowActionSheetProtocol: ApiProtocol<API_TYPE_SHOW_ACTION_SHEET> = {
  itemList: {
    type: Array,
    required: true,
  },
  itemColor: String,
}
export const ShowActionSheetOptions: ApiOptions<API_TYPE_SHOW_ACTION_SHEET> = {
  formatArgs: {
    itemColor: '#000',
  },
}

export const API_HIDE_TOAST = 'hideToast'
export type API_TYPE_HIDE_TOAST = typeof uni.hideToast
export const API_HIDE_LOADING = 'hideLoading'
export type API_TYPE_HIDE_LOADING = typeof uni.hideLoading
