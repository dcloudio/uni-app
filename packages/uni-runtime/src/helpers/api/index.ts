import {
  defineAsyncApi as originalDefineAsyncApi,
  defineOffApi as originalDefineOffApi,
  defineOnApi as originalDefineOnApi,
  defineSyncApi as originalDefineSyncApi,
  defineTaskApi as originalDefineTaskApi,
} from '@dcloudio/uni-runtime'

type Anything = Object | null | undefined
type NullType = null | undefined
type FormatArgsValueType = Function | string | number | boolean

export interface AsyncApiSuccessResult {}

export interface AsyncApiResult {}

export interface ApiError {
  errMsg?: string | null
  errCode?: number | null
}
export interface ApiExecutor<K> {
  resolve: (res?: K | void) => void
  reject: (errMsg?: string, errRes?: ApiError) => void
}
export interface ProtocolOptions {
  name?: string | null
  type?: string | null
  required?: boolean | null
  validator?: (value: Object) => boolean | undefined | string
}
export interface ApiOptions<T> {
  beforeInvoke?: (args: Object) => boolean | void | string
  beforeAll?: (res: Object) => void
  beforeSuccess?: (res: Object, args: T) => void
  formatArgs?: Map<string, FormatArgsValueType>
}
interface AsyncMethodOptionLike {
  success?: Function | null
}

const TYPE_MAP = new Map<string, Object>([
  ['string', String],
  ['number', Number],
  ['boolean', Boolean],
  ['array', Array],
  ['object', Object],
])
function getPropType(type: string | NullType): Anything {
  if (!type) {
    return
  }
  return TYPE_MAP.get(type)
}

function buildProtocol(protocol?: Map<string, ProtocolOptions>) {
  const originalProtocol = {} as Record<string, Object>
  protocol?.forEach((value, key) => {
    const protocol = (originalProtocol[key] = {} as Record<string, Anything>)
    protocol.name = value.name
    protocol.type = getPropType(value.type)
    protocol.required = value.required
    protocol.validator = value.validator
  })
  return originalProtocol
}

function buildOptions(options?: ApiOptions<AsyncMethodOptionLike>) {
  const originalFormatArgs = {} as Record<string, FormatArgsValueType>
  const originalOptions = {} as Record<string, Anything>
  if (options) {
    if (options.formatArgs) {
      options.formatArgs.forEach((value, key) => {
        originalFormatArgs[key] = value
      })
    }
    originalOptions.beforeInvoke = options.beforeInvoke
    originalOptions.beforeAll = options.beforeAll
    originalOptions.beforeSuccess = options.beforeSuccess
    originalOptions.formatArgs = originalFormatArgs
  }
  return originalOptions
}

export function defineAsyncApi<T extends AsyncMethodOptionLike, K>(
  name: string,
  fn: (options: T, res: ApiExecutor<K>) => void,
  protocol?: Map<string, ProtocolOptions>,
  options?: ApiOptions<T>
): Function {
  const originalProtocol = buildProtocol(protocol)
  const originalOptions = buildOptions(
    options as ApiOptions<AsyncMethodOptionLike>
  )
  return originalDefineAsyncApi(
    name,
    // @ts-expect-error
    fn,
    originalProtocol,
    originalOptions
  )
}

export function defineTaskApi<T, K, TASK>(
  name: string,
  fn: (options: T, res: ApiExecutor<K>) => TASK,
  protocol: Map<string, ProtocolOptions>,
  options: ApiOptions<T>
): Object {
  const originalProtocol = buildProtocol(protocol)
  const originalOptions = buildOptions(
    options as ApiOptions<AsyncMethodOptionLike>
  )
  return originalDefineTaskApi(
    name,
    // @ts-expect-error
    fn,
    originalProtocol,
    originalOptions
  )
}

export function defineSyncApi<K>(
  name: string,
  fn: Function, // devEco内将参数类型定义为(...args: Object[]) => Object时，(key: string) => Object类型的function无法赋值给此参数。
  protocol?: Map<string, ProtocolOptions>,
  options?: ApiOptions<Object>
): (...args: any[]) => K {
  const originalProtocol = buildProtocol(protocol)
  const originalOptions = buildOptions(
    options as ApiOptions<AsyncMethodOptionLike>
  )
  return originalDefineSyncApi(
    name,
    // @ts-expect-error
    fn,
    originalProtocol,
    originalOptions
  )
}

export function defineOnApi<T>(
  name: string,
  fn: () => void,
  options?: ApiOptions<T>
): Function {
  const originalOptions = buildOptions(
    options as ApiOptions<AsyncMethodOptionLike>
  )
  return originalDefineOnApi(name, fn, originalOptions)
}

export function defineOffApi<T>(
  name: string,
  fn: () => void,
  options?: ApiOptions<T>
): Function {
  const originalOptions = buildOptions(
    options as ApiOptions<AsyncMethodOptionLike>
  )
  return originalDefineOffApi(name, fn, originalOptions)
}

export {
  UniProvider,
  getUniProvider,
  getUniProviders,
  registerUniProvider,
} from './provider'
