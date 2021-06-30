export const API_CREATE_INTERACTIVE_AD = 'createInteractiveAd'
export type API_TYPE_CREATE_INTERACTIVE_AD = typeof uni.createInteractiveAd

export const CreateInteractiveAdOptions: ApiOptions<API_TYPE_CREATE_INTERACTIVE_AD> =
  {
    formatArgs: {
      adpid(value, params) {
        if (!value) {
          return 'adpid should not be empty.'
        }
        if (value) params.adpid = value
      },
      provider(value, params) {
        if (!value) {
          return 'provider should not be empty.'
        }
        if (value) params.provider = value
      },
    },
  }

export const CreateInteractiveAdProtocol: ApiProtocol<API_TYPE_CREATE_INTERACTIVE_AD> =
  {
    adpid: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
  }
