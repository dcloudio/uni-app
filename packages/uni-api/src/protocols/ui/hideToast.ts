export const API_HIDE_TOAST = 'hideToast'

export interface HideToastOptions {
  allType?: boolean
  success?: (result: any) => void
  fail?: (result: any) => void
  complete?: (result: any) => void
}

export type API_TYPE_HIDE_TOAST = (options?: HideToastOptions) => void

export const HideToastProtocol: ApiProtocol<
  API_TYPE_HIDE_TOAST,
  Pick<HideToastOptions, 'allType'>
> = {
  allType: Boolean,
}

export const HideToastOptions: ApiOptions<
  API_TYPE_HIDE_TOAST,
  HideToastOptions
> = {
  formatArgs: {
    allType: false,
  },
}
