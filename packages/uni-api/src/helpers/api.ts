import { ApiOptions, ApiProtocol, ProtocolOptions } from '../protocols/type'

export function createApi<T extends Function>(
  fn: T,
  protocol?: ApiProtocol | ProtocolOptions[],
  options?: ApiOptions
) {
  if (__DEV__ && protocol) {
  }
  if (options) {
    console.log(options)
  }
  return fn
}
