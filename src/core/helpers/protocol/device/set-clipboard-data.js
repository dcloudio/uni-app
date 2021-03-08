import {
  t
} from 'uni-core/helpers/i18n'

export const setClipboardData = {
  beforeSuccess () {
    const title = t('uni.setClipboardData.success')
    if (title) {
      uni.showToast({
        title: t('uni.setClipboardData.success'),
        icon: 'success',
        mask: false,
        style: {
          width: undefined
        }
      })
    }
  }
}
