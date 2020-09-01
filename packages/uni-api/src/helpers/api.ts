import { ProtocolOptions } from '../protocols/type'

export function createApi<T extends Function = () => any>(
  fn: T,
  validate?: ProtocolOptions | ProtocolOptions[]
) {
  if (__DEV__ && validate) {
  }
  return fn
}
