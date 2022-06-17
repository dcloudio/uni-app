import { isString } from '@vue/shared'

import { getRealPath } from '@dcloudio/uni-platform'

export const API_PREVIEW_IMAGE = 'previewImage'
export type API_TYPE_PREVIEW_IMAGE = typeof uni.previewImage

export const PreviewImageOptions: ApiOptions<API_TYPE_PREVIEW_IMAGE> = {
  formatArgs: {
    urls(urls, params) {
      params.urls = urls.map((url) =>
        isString(url) && url ? getRealPath(url) : ''
      )
    },
    current(current, params) {
      if (typeof current === 'number') {
        params.current =
          current > 0 && current < params.urls.length ? current : 0
      } else if (isString(current) && current) {
        params.current = getRealPath(current)
      }
    },
  },
}

export const PreviewImageProtocol: ApiProtocol<API_TYPE_PREVIEW_IMAGE> = {
  urls: {
    type: Array,
    required: true,
  },
  current: {
    type: [Number, String],
  },
}

export const API_CLOSE_PREVIEW_IMAGE = 'closePreviewImage'
export type API_TYPE_CLOSE_PREVIEW_IMAGE = typeof uni.closePreviewImage
