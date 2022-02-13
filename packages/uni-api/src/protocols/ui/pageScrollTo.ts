export const API_PAGE_SCROLL_TO = 'pageScrollTo'
export type API_TYPE_PAGE_SCROLL_TO = typeof uni.pageScrollTo
export const PageScrollToProtocol: ApiProtocol<API_TYPE_PAGE_SCROLL_TO> = {
  scrollTop: Number,
  selector: String,
  duration: Number,
}

export const PageScrollToOptions: ApiOptions<API_TYPE_PAGE_SCROLL_TO> = {
  formatArgs: {
    duration: 300,
  },
}
