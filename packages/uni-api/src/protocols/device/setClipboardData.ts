import { ApiOptions } from '../type'

export const SetClipboardDataOptions: ApiOptions = {
  beforeSuccess() {
    uni.showToast({
      title: '内容已复制',
      icon: 'success',
      mask: false,
    })
  },
}
