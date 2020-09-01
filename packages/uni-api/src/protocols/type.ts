export type Data = Record<string, unknown>
type DefaultFactory<T> = (protocols: Data) => T | null | undefined
type ProtocolConstructor<T = any> =
  | { new (...args: any[]): T & object }
  | { (): T }
  | ProtocolMethod<T>

type ProtocolMethod<T, TConstructor = any> = T extends (...args: any) => any
  ? { new (): TConstructor; (): T; readonly prototype: TConstructor }
  : never
type ProtocolType<T> = ProtocolConstructor<T> | ProtocolConstructor<T>[]

export interface ApiProtocol {
  [name: string]: ProtocolOptions
}

export interface ApiOptions {
  beforeAll?: () => void
  beforeSuccess?: () => void
  formatArgs?: {
    [name: string]: (value: any, params: Record<string, any>) => void
  }
}

export interface ProtocolOptions<T = any, D = T> {
  name?: string
  type?: ProtocolType<T> | true | null
  required?: boolean
  default?: D | DefaultFactory<D> | null | undefined | object
  validator?(value: unknown): boolean | undefined | string
}
