import { hasOwn } from '@vue/shared'
import { PRIMARY_COLOR } from '@dcloudio/uni-shared'
import { initI18nShowModalMsgsOnce, useI18n } from '@dcloudio/uni-core'

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

export const ShowModalOptions: ApiOptions<API_TYPE_SHOW_MODAL> = {
  beforeInvoke() {
    // dynamic init (tree shaking)
    initI18nShowModalMsgsOnce()
  },
  formatArgs: {
    title: '',
    content: '',
    placeholderText: '',
    showCancel: true,
    editable: false,
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
    //#if !_X_
    confirmColor: PRIMARY_COLOR,
    //#endif
    //#if _X_
    //@ts-ignore
    confirmColor: '#576b95',
    //#endif
  },
}
