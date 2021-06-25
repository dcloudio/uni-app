export const API_GET_CLIPBOARD_DATA = 'getClipboardData'
export const API_SET_CLIPBOARD_DATA = 'setClipboardData'
export type API_TYPE_GET_CLIPBOARD_DATA = typeof uni.getClipboardData
export type API_TYPE_SET_CLIPBOARD_DATA = typeof uni.setClipboardData
export const SetClipboardDataOptions: ApiOptions<API_TYPE_SET_CLIPBOARD_DATA> =
  {
    beforeSuccess() {
      uni.showToast({
        title: '内容已复制',
        icon: 'success',
        mask: false,
      })
    },
  }
