import { ProtocolOptions } from '../type'
export const AddInterceptorProtocol: ProtocolOptions<String | Object>[] = [
  {
    name: 'method',
    type: [String, Object],
    required: true
  }
]
export const RemoveInterceptorProtocol = AddInterceptorProtocol
