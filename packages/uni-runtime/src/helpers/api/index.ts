import {
  defineAsyncApi as originalDefineAsyncApi,
  // defineOffApi as originalDefineOffApi,
  // defineOnApi as originalDefineOnApi,
  // defineSyncApi as originalDefineSyncApi,
  // defineTaskApi as originalDefineTaskApi,
} from '@dcloudio/uni-runtime'

type Anything = Object | null | undefined
type NullType = null | undefined

export interface ErrRes {
  errMsg?: string | null
  errCode?: number | null
}
export interface ApiExcutor<K> {
  resolve: (res: K | void) => void
  reject: (errMsg?: string, errRes?: ErrRes) => void
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
  formatArgs?: Map<string, Function>
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
  return TYPE_MAP[type]
}
export function defineAsyncApi<T extends AsyncMethodOptionLike, K>(
  name: string,
  fn: (options: T, res: ApiExcutor<K>) => void,
  protocol: Map<string, ProtocolOptions>,
  options: ApiOptions<T>
): Function {
  const originalProtocol = {} as Record<string, Object>
  protocol.forEach((value, key) => {
    const protocol = (originalProtocol[key] = {} as Record<string, Anything>)
    protocol.name = value.name
    protocol.type = getPropType(value.type)
    protocol.required = value.required
    protocol.validator = value.validator
  })
  const originalFormatArgs = {} as Record<string, Function>
  if (options.formatArgs) {
    options.formatArgs.forEach((value, key) => {
      originalFormatArgs[key] = value
    })
  }
  const originalOptions = {} as Record<string, Anything>
  originalOptions.beforeInvoke = options.beforeInvoke
  originalOptions.beforeAll = options.beforeAll
  originalOptions.beforeSuccess = options.beforeSuccess
  originalOptions.formatArgs = originalFormatArgs
  return originalDefineAsyncApi<(options: T) => Promise<K>>(
    name,
    // @ts-expect-error
    fn,
    originalProtocol,
    originalOptions
  )
}
