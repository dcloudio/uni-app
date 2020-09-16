import { ApiOptions, ApiProtocol, ProtocolOptions } from '../protocols/type'

type ApiProtocols = ApiProtocol | ProtocolOptions[]

interface CreateApiOptions {
  type: API_TYPES
  name?: string
  options?: ApiOptions
}

export const API_TYPE_ON = 0
export const API_TYPE_SYNC = 1
export const API_TYPE_ASYNC = 2
export const API_TYPE_RETURN = 3

type API_TYPES =
  | typeof API_TYPE_ON
  | typeof API_TYPE_SYNC
  | typeof API_TYPE_ASYNC
  | typeof API_TYPE_RETURN

function validateProtocol(name: string, args: any[], protocol: ApiProtocols) {
  console.log(name, args, protocol)
  return true
}

function formatApiArgs(args: any[], options?: ApiOptions) {
  if (!options) {
    return args
  }
}

export function createApi<T extends Function>(
  { type, name, options }: CreateApiOptions,
  fn: T,
  protocol?: ApiProtocols
) {
  return function(...args: any[]) {
    if (type === API_TYPE_SYNC) {
      if (!(__DEV__ && protocol && !validateProtocol(name!, args, protocol))) {
        return fn.apply(null, formatApiArgs(args, options))
      }
    }
  }
}
