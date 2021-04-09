export type Data = Record<string, unknown>
type DefaultFactory<T> = (protocols: Data) => T | null | undefined
export type ProtocolConstructor<T = any> =
  | { new (...args: any[]): T & object }
  | { (): T }
  | ProtocolMethod<T>

type ProtocolMethod<T, TConstructor = any> = T extends (...args: any) => any
  ? { new (): TConstructor; (): T; readonly prototype: TConstructor }
  : never
type ProtocolType<T> = ProtocolConstructor<T> | ProtocolConstructor<T>[]

type ApiArgsValidator = (value: any, params: Record<string, any>) => void
export interface ApiProtocol {
  [name: string]: ProtocolOptions
}

export type ApiProtocols = ApiProtocol | ProtocolOptions[]
export interface ApiOptions {
  beforeInvoke?: (args: unknown) => boolean | void | string
  beforeAll?: (res: unknown) => void
  beforeSuccess?: (res: unknown) => void
  formatArgs?: {
    [name: string]: ApiArgsValidator
  }
}

export interface ProtocolOptions<T = any, D = T> {
  name?: string
  type?: ProtocolType<T> | true | null
  required?: boolean
  default?: D | DefaultFactory<D> | null | undefined | object
  validator?(value: any): boolean | undefined | string
}
