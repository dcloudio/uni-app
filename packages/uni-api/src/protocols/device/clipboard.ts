import { initI18nSetClipboardDataMsgsOnce, useI18n } from '@dcloudio/uni-core'

export const API_GET_CLIPBOARD_DATA = 'getClipboardData'
export const API_SET_CLIPBOARD_DATA = 'setClipboardData'
export type API_TYPE_GET_CLIPBOARD_DATA = typeof uni.getClipboardData
export type API_TYPE_SET_CLIPBOARD_DATA = typeof uni.setClipboardData

export const SetClipboardDataOptions: ApiOptions<API_TYPE_SET_CLIPBOARD_DATA> =
  {
    formatArgs: {
      showToast: true,
    },
    beforeInvoke() {
      initI18nSetClipboardDataMsgsOnce()
    },
    beforeSuccess(res, params) {
      if (!params.showToast) return
      const { t } = useI18n()
      const title = t('uni.setClipboardData.success')
      if (title) {
        uni.showToast({
          title: title,
          icon: 'success',
          mask: false,
        })
      }
    },
  }

export const SetClipboardDataProtocol: ApiProtocol<API_TYPE_SET_CLIPBOARD_DATA> =
  {
    data: {
      type: String,
      required: true,
    },
    showToast: {
      type: Boolean,
    },
  }
