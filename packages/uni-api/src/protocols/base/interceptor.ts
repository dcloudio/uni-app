export const API_ADD_INTERCEPTOR = 'addInterceptor'
export const API_REMOVE_INTERCEPTOR = 'removeInterceptor'
export const AddInterceptorProtocol: ProtocolOptions<String | Object>[] = [
  {
    name: 'method',
    type: [String, Object],
    required: true,
  },
]
export const RemoveInterceptorProtocol = AddInterceptorProtocol
