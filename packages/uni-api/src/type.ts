type Data = Record<string, unknown>
type ProtocolConstructor<T = any> =
  | { new (...args: any[]): T & object }
  | { (): T }
  | ProtocolMethod<T>

type ProtocolMethod<T, TConstructor = any> = T extends (...args: any) => any
  ? { new (): TConstructor; (): T; readonly prototype: TConstructor }
  : never
type ProtocolType<T> = ProtocolConstructor<T> | ProtocolConstructor<T>[]

type ApiArgsValidator<T, P> = (value: T, params: P) => boolean | string | void

type ApiProtocol<T extends ApiLike, P = AsyncApiOptions<T>> = {
  [K in keyof P]: ProtocolType<P[K]> | ProtocolOptions<P[K]>
}

type ApiProtocols<T extends ApiLike> = ApiProtocol<T> | ProtocolOptions[]

interface ApiOptions<T extends ApiLike, P = AsyncApiOptions<T>> {
  beforeInvoke?: (args: unknown) => boolean | void | string
  beforeAll?: (res: unknown) => void
  beforeSuccess?: (res: unknown, args: P) => void
  formatArgs?: {
    [K in keyof P]?: ApiArgsValidator<P[K], P> | P[K]
  }
}

interface ProtocolOptions<T = any> {
  name?: string
  type?: ProtocolType<T>
  required?: boolean
  validator?(value: T): boolean | void | string
}

interface AsyncMethodOptionLike {
  success?: (...args: any[]) => void
}

type PromisifySuccessResult<P, R> = P extends {
  success: any
}
  ? void
  : P extends { fail: any }
  ? void
  : P extends { complete: any }
  ? void
  : Promise<R>
type ApiLike = (...args: any[]) => any

type TaskApiLike = ApiLike

type AsyncApiLike = (args: any) => Promise<unknown> | void

type AsyncApiOptions<T extends ApiLike> = Required<Parameters<T>>[0]

type AsyncApiRes<T extends AsyncMethodOptionLike> = Omit<
  Parameters<Exclude<T['success'], undefined>>[0],
  'errMsg' | 'errSubject'
>

type AsyncApiRequired<T extends AsyncMethodOptionLike> = <P extends T>(
  args: P
) => PromisifySuccessResult<P, AsyncApiRes<T>>

type AsyncApiOptional<T extends AsyncMethodOptionLike> = <P extends T>(
  args?: P
) => PromisifySuccessResult<P, AsyncApiRes<T>>

interface AsyncApiOptionalOptions {
  success?: any
  fail?: any
  complete?: any
}

type AsyncApi<T extends AsyncMethodOptionLike> =
  AsyncApiOptionalOptions extends T ? AsyncApiOptional<T> : AsyncApiRequired<T>
