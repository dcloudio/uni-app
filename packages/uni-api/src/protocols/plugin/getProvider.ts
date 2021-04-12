export const API_GET_PROVIDER = 'getProvider'
export type API_TYPE_GET_PROVIDER = typeof uni.getProvider
export const GetProviderProtocol: ApiProtocol<API_TYPE_GET_PROVIDER> = {
  service: {
    type: String as any,
    required: true,
  },
}
