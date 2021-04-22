export const API_SHOW_LOADING = 'showLoading'
export type API_TYPE_SHOW_LOADING = typeof uni.showLoading
export const ShowLoadingProtocol: ApiProtocol<API_TYPE_SHOW_LOADING> = {
  title: String,
  mask: Boolean,
}
export const ShowLoadingOptions: ApiOptions<API_TYPE_SHOW_LOADING> = {
  formatArgs: {
    title: '',
    mask: false,
  },
}
