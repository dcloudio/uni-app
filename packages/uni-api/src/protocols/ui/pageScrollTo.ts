export const API_PAGE_SCROLL_TO = 'pageScrollTo'
export type API_TYPE_PAGE_SCROLL_TO = typeof uni.pageScrollTo
export const PageScrollToProtocol: ApiProtocol<API_TYPE_PAGE_SCROLL_TO> = {
  scrollTop: Number,
  selector: String,
  duration: Number,
}
const DEFAULT_DURATION = 300
export const PageScrollToOptions: ApiOptions<API_TYPE_PAGE_SCROLL_TO> = {
  formatArgs: {
    duration(value, params) {
      params.duration = Math.max(0, parseInt(value + '') || DEFAULT_DURATION)
    },
  },
}
