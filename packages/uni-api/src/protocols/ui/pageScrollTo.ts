import { hasOwn } from '@vue/shared'

export const API_PAGE_SCROLL_TO = 'pageScrollTo'
export type API_TYPE_PAGE_SCROLL_TO = typeof uni.pageScrollTo
export const PageScrollToProtocol: ApiProtocol<API_TYPE_PAGE_SCROLL_TO> = {
  scrollTop: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
  },
}
const DEFAULT_DURATION = 400
export const PageScrollToOptions: ApiOptions<API_TYPE_PAGE_SCROLL_TO> = {
  formatArgs: {
    duration(value, params) {
      if (!hasOwn(params, 'duration')) {
        return (params.duration = DEFAULT_DURATION)
      }
      value = parseInt(value + '')
      if (isNaN(value)) {
        value = DEFAULT_DURATION
      } else {
        value = Math.max(0, value)
      }
      params.duration = value
    },
  },
}
