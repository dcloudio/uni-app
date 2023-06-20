import {
  t
} from 'uni-core/helpers/i18n'

export const setClipboardData = {
  data: {
    type: String,
    required: true
  },
  showToast: {
    type: Boolean,
    default: true
  },
  beforeSuccess (res, params) {
    if (!params.showToast) return
    const title = t('uni.setClipboardData.success')
    if (title) {
      uni.showToast({
        title,
        icon: 'success',
        mask: false,
        style: {
          width: undefined
        }
      })
    }
  }
}
