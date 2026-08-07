import { isArray, isFunction, isObject } from '@vue/shared'

import {
  API_CREATE_DRAMA_AD,
  type API_TYPE_CREATE_DRAMA_AD,
  CreateDramaAdOptions,
  CreateDramaAdProtocol,
  type DramaAdContext,
  defineSyncApi,
} from '@dcloudio/uni-api'

const DRAMA_EVENT_TYPE = {
  load: 'load',
  error: 'error',
  adEvent: 'adEvent',
  unlockEvent: 'unlockEvent',
  play: 'play',
} as const

const DRAMA_CALLBACK_KEYS = ['success', 'fail', 'complete']

type DramaEventType = keyof typeof DRAMA_EVENT_TYPE
type DramaCallback = (result: any) => void
type DramaSuccessCallback = (result: any) => void
type DramaFailCallback = (error: any) => void
type DramaCompleteCallback = (result: any) => void

interface DramaResolvedCallbacks {
  success?: DramaSuccessCallback
  fail?: DramaFailCallback
  complete?: DramaCompleteCallback
}

/** 将原始错误码归一化为数字，兼容数字字符串。 */
function normalizeDramaErrorCode(code: unknown): number {
  if (typeof code === 'number' && Number.isFinite(code)) {
    return code
  }
  if (typeof code === 'string' && code.trim() !== '') {
    const parsed = Number(code)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }
  return -1
}

/** 统一判断可作为短剧 ID 的值。 */
function isValidDramaId(id: unknown): boolean {
  if (id === null || id === undefined) {
    return false
  }
  if (typeof id === 'number') {
    return !Number.isNaN(id)
  }
  if (typeof id === 'string') {
    return id.trim().length > 0
  }
  return false
}

/**
 * 将异常标准化为短剧错误对象。
 * 同时输出 `message` 与 uni 习惯的 `errMsg`，方便两种消费方式。
 */
function normalizeDramaError(error: unknown): Record<string, any> {
  if (isObject(error)) {
    const data = error as Record<string, any>
    const message = data.message || data.errMsg || 'drama ad error'
    return {
      code: normalizeDramaErrorCode(data.code),
      message,
      errMsg: message,
      detail: data.detail,
      event: data.event,
    }
  }
  if (typeof error === 'string') {
    return {
      code: -1,
      message: error,
      errMsg: error,
    }
  }
  return {
    code: -1,
    message: 'drama ad error',
    errMsg: 'drama ad error',
    detail: error,
  }
}

/** 从 options 或位置参数中解析出 success/fail/complete 回调。 */
function resolveDramaCallbacks(
  options: unknown,
  successCallback?: DramaSuccessCallback,
  failCallback?: DramaFailCallback
): DramaResolvedCallbacks {
  let success = successCallback
  let fail = failCallback
  let complete: DramaCompleteCallback | undefined
  if (isObject(options)) {
    const data = options as Record<string, any>
    if (!isFunction(success) && isFunction(data.success)) {
      success = data.success
    }
    if (!isFunction(fail) && isFunction(data.fail)) {
      fail = data.fail
    }
    if (isFunction(data.complete)) {
      complete = data.complete
    }
  }
  return { success, fail, complete }
}

/** 去掉传给原生的回调字段，避免污染原生参数。 */
function stripDramaCallbackKeys(
  data: Record<string, any>
): Record<string, any> {
  for (let i = 0; i < DRAMA_CALLBACK_KEYS.length; i++) {
    delete data[DRAMA_CALLBACK_KEYS[i]]
  }
  return data
}

/** 生成参数校验错误，确保错误结构稳定。 */
function createInvalidParamError(message: string): Record<string, any> {
  return {
    code: -1,
    message,
  }
}

/** 规范 getList 的参数并做边界校验。 */
function normalizeDramaListOptions(options?: unknown): Record<string, any> {
  if (options === undefined) {
    return {}
  }
  if (!isObject(options)) {
    throw createInvalidParamError('getList options should be an object')
  }
  const data = stripDramaCallbackKeys(
    Object.assign({}, options as Record<string, any>)
  )
  if (data.page !== undefined) {
    if (!Number.isInteger(data.page) || data.page < 1) {
      throw createInvalidParamError('page should be a positive integer')
    }
  }
  if (data.pageSize !== undefined) {
    if (!Number.isInteger(data.pageSize) || data.pageSize < 1) {
      throw createInvalidParamError('pageSize should be a positive integer')
    }
  }
  if (data.order !== undefined) {
    const validOrder =
      data.order === 'default' ||
      data.order === 'reverse' ||
      data.order === 0 ||
      data.order === 1
    if (!validOrder) {
      throw createInvalidParamError(
        'order should be "default" | "reverse" | 0 | 1'
      )
    }
  }
  return data
}

/** 规范 getInfo 参数，强制 dramaId/dramaIds 二选一。 */
function normalizeDramaInfoOptions(options?: unknown): Record<string, any> {
  if (options === undefined) {
    throw createInvalidParamError('getInfo options is required')
  }
  if (!isObject(options)) {
    throw createInvalidParamError('getInfo options should be an object')
  }
  const data = options as Record<string, any>
  const hasDramaId = isValidDramaId(data.dramaId)
  const hasDramaIds = isArray(data.dramaIds) && data.dramaIds.length > 0
  if (!hasDramaId && !hasDramaIds) {
    throw createInvalidParamError('dramaId or dramaIds is required')
  }
  if (hasDramaId && hasDramaIds) {
    throw createInvalidParamError(
      'dramaId and dramaIds cannot be used together'
    )
  }
  if (hasDramaIds) {
    const dramaIds = data.dramaIds as Array<unknown>
    if (!dramaIds.every((id) => isValidDramaId(id))) {
      throw createInvalidParamError('dramaIds should contain valid id values')
    }
  }
  return stripDramaCallbackKeys(Object.assign({}, data))
}

/** 校验整数范围，越界直接抛出错误。 */
function assertIntegerInRange(
  value: unknown,
  field: string,
  min: number,
  max: number
): void {
  if (!Number.isInteger(value as number)) {
    throw createInvalidParamError(`${field} should be an integer`)
  }
  const num = value as number
  if (num < min || num > max) {
    throw createInvalidParamError(
      `${field} should be between ${min} and ${max}`
    )
  }
}

/** 校验激励视频服务端回调透传参数。 */
function normalizeDramaUrlCallback(urlCallback: unknown): void {
  if (!isObject(urlCallback)) {
    throw createInvalidParamError('urlCallback should be an object')
  }
  const data = urlCallback as Record<string, any>
  if (data.userId !== undefined && typeof data.userId !== 'string') {
    throw createInvalidParamError('urlCallback.userId should be a string')
  }
  if (data.extra !== undefined && typeof data.extra !== 'string') {
    throw createInvalidParamError('urlCallback.extra should be a string')
  }
}

/** 规范 open 参数，保证必填字段合法。 */
function normalizeDramaOpenOptions(options?: unknown): Record<string, any> {
  if (!isObject(options)) {
    throw createInvalidParamError('open options should be an object')
  }
  const data = stripDramaCallbackKeys(
    Object.assign({}, options as Record<string, any>)
  )
  if (!isValidDramaId(data.dramaId)) {
    throw createInvalidParamError('dramaId is required')
  }
  if (data.episode !== undefined) {
    if (!Number.isInteger(data.episode) || data.episode < 1) {
      throw createInvalidParamError('episode should be a positive integer')
    }
  }
  if (data.lock !== undefined) {
    assertIntegerInRange(data.lock, 'lock', 1, 10)
  }
  if (data.free !== undefined) {
    assertIntegerInRange(data.free, 'free', 1, 20)
  }
  if (data.urlCallback !== undefined) {
    normalizeDramaUrlCallback(data.urlCallback)
  }
  return data
}

class DramaAd implements DramaAdContext {
  private _callbacks: Record<DramaEventType, Array<DramaCallback>>
  private _adInstance: any
  private _destroyed: boolean
  private _initError: Record<string, any> | null

  constructor(options: Record<string, any>) {
    this._callbacks = {
      load: [],
      error: [],
      adEvent: [],
      unlockEvent: [],
      play: [],
    }
    this._destroyed = false
    this._initError = null

    const plusAd = (plus as any).ad
    if (!plusAd || !isFunction(plusAd.createDramaAd)) {
      // 当前平台（如 Android / 旧基座）不支持短剧能力，
      // 不在构造期直接抛错，改为后续调用时通过 reject / error 事件暴露。
      this._initError = createInvalidParamError('drama ad unavailable')
      this._adInstance = null
      return
    }

    try {
      this._adInstance = plusAd.createDramaAd(options)
    } catch (error) {
      this._initError = normalizeDramaError(error)
      this._adInstance = null
      return
    }
    this._bindNativeEvents()
  }

  /** 绑定原生短剧事件并转发到 uni 侧监听。 */
  private _bindNativeEvents() {
    const ad = this._adInstance
    if (!ad) {
      return
    }
    ad.onLoad &&
      ad.onLoad((result: any) => {
        this._dispatchEvent(DRAMA_EVENT_TYPE.load, result || {})
      })
    ad.onError &&
      ad.onError((error: any) => {
        this._dispatchEvent(DRAMA_EVENT_TYPE.error, normalizeDramaError(error))
      })
    ad.onAdEvent &&
      ad.onAdEvent((result: any) => {
        this._dispatchEvent(DRAMA_EVENT_TYPE.adEvent, result || {})
      })
    ad.onUnlockEvent &&
      ad.onUnlockEvent((result: any) => {
        this._dispatchEvent(DRAMA_EVENT_TYPE.unlockEvent, result || {})
      })
    if (isFunction(ad.onPlayEvent)) {
      ad.onPlayEvent((result: any) => {
        this._dispatchEvent(DRAMA_EVENT_TYPE.play, result || {})
      })
    } else if (isFunction(ad.onPlay)) {
      ad.onPlay((result: any) => {
        this._dispatchEvent(DRAMA_EVENT_TYPE.play, result || {})
      })
    }
  }

  /** 执行原生异步方法，返回原始 Promise（不在此处触发业务回调）。 */
  private _invoke(
    method: 'getList' | 'getInfo' | 'open',
    options: Record<string, any>
  ): Promise<any> {
    if (this._destroyed) {
      return Promise.reject(
        normalizeDramaError(
          createInvalidParamError('drama ad instance has been destroyed')
        )
      )
    }
    if (this._initError || !this._adInstance) {
      return Promise.reject(
        normalizeDramaError(
          this._initError ||
            createInvalidParamError('drama adapter unavailable')
        )
      )
    }
    const invokeFn = this._adInstance[method]
    if (!isFunction(invokeFn)) {
      return Promise.reject(
        normalizeDramaError(
          createInvalidParamError(
            `drama ad method "${method}" is not supported`
          )
        )
      )
    }
    return new Promise((resolve, reject) => {
      invokeFn.call(
        this._adInstance,
        options,
        (result: any) => {
          resolve(result || {})
        },
        (error: any) => {
          reject(normalizeDramaError(error))
        }
      )
    })
  }

  /**
   * 双模适配：
   * - 传了 success/fail/complete 时走回调，并返回一个永不 reject 的 Promise，
   *   避免回调模式下产生 unhandledRejection；
   * - 未传回调时返回真正的 Promise，支持 await/then。
   */
  private _settle(
    promise: Promise<any>,
    callbacks: DramaResolvedCallbacks
  ): Promise<any> {
    const { success, fail, complete } = callbacks
    const hasCallback =
      isFunction(success) || isFunction(fail) || isFunction(complete)
    if (!hasCallback) {
      return promise
    }
    return promise.then(
      (result: any) => {
        if (isFunction(success)) {
          success!(result)
        }
        if (isFunction(complete)) {
          complete!(result)
        }
        return result
      },
      (error: any) => {
        if (isFunction(fail)) {
          fail!(error)
        }
        if (isFunction(complete)) {
          complete!(error)
        }
        return undefined
      }
    )
  }

  /** 拉取短剧列表。 */
  getList(
    options?: unknown,
    successCallback?: DramaSuccessCallback,
    failCallback?: DramaFailCallback
  ): Promise<any> {
    const callbacks = resolveDramaCallbacks(
      options,
      successCallback,
      failCallback
    )
    let params: Record<string, any>
    try {
      params = normalizeDramaListOptions(options)
    } catch (error) {
      return this._settle(Promise.reject(normalizeDramaError(error)), callbacks)
    }
    return this._settle(this._invoke('getList', params), callbacks)
  }

  /** 查询指定短剧信息。 */
  getInfo(
    options?: unknown,
    successCallback?: DramaSuccessCallback,
    failCallback?: DramaFailCallback
  ): Promise<any> {
    const callbacks = resolveDramaCallbacks(
      options,
      successCallback,
      failCallback
    )
    let params: Record<string, any>
    try {
      params = normalizeDramaInfoOptions(options)
    } catch (error) {
      return this._settle(Promise.reject(normalizeDramaError(error)), callbacks)
    }
    return this._settle(this._invoke('getInfo', params), callbacks)
  }

  /** 打开短剧播放详情页。 */
  open(
    options?: unknown,
    successCallback?: DramaSuccessCallback,
    failCallback?: DramaFailCallback
  ): Promise<any> {
    const callbacks = resolveDramaCallbacks(
      options,
      successCallback,
      failCallback
    )
    let params: Record<string, any>
    try {
      params = normalizeDramaOpenOptions(options)
    } catch (error) {
      return this._settle(Promise.reject(normalizeDramaError(error)), callbacks)
    }
    return this._settle(this._invoke('open', params), callbacks)
  }

  /** 销毁短剧广告实例并清理事件监听。 */
  destroy() {
    if (this._destroyed) {
      return
    }
    this._destroyed = true
    if (this._adInstance && isFunction(this._adInstance.destroy)) {
      this._adInstance.destroy()
    }
    this._callbacks.load.length = 0
    this._callbacks.error.length = 0
    this._callbacks.adEvent.length = 0
    this._callbacks.unlockEvent.length = 0
    this._callbacks.play.length = 0
  }

  /** 注册 load 事件。 */
  onLoad(callback: DramaCallback) {
    this._addEventListener(DRAMA_EVENT_TYPE.load, callback)
  }

  /** 移除 load 事件。 */
  offLoad(callback?: DramaCallback) {
    this._removeEventListener(DRAMA_EVENT_TYPE.load, callback)
  }

  /** 注册 error 事件。 */
  onError(callback: DramaCallback) {
    this._addEventListener(DRAMA_EVENT_TYPE.error, callback)
  }

  /** 移除 error 事件。 */
  offError(callback?: DramaCallback) {
    this._removeEventListener(DRAMA_EVENT_TYPE.error, callback)
  }

  /** 注册广告事件。 */
  onAdEvent(callback: DramaCallback) {
    this._addEventListener(DRAMA_EVENT_TYPE.adEvent, callback)
  }

  /** 移除广告事件。 */
  offAdEvent(callback?: DramaCallback) {
    this._removeEventListener(DRAMA_EVENT_TYPE.adEvent, callback)
  }

  /** 注册解锁事件。 */
  onUnlockEvent(callback: DramaCallback) {
    this._addEventListener(DRAMA_EVENT_TYPE.unlockEvent, callback)
  }

  /** 移除解锁事件。 */
  offUnlockEvent(callback?: DramaCallback) {
    this._removeEventListener(DRAMA_EVENT_TYPE.unlockEvent, callback)
  }

  /** 注册播放事件。 */
  onPlayEvent(callback: DramaCallback) {
    this._addEventListener(DRAMA_EVENT_TYPE.play, callback)
  }

  /** 移除播放事件。 */
  offPlayEvent(callback?: DramaCallback) {
    this._removeEventListener(DRAMA_EVENT_TYPE.play, callback)
  }

  /** 增加事件监听，已销毁或非函数监听会被忽略。 */
  private _addEventListener(type: DramaEventType, callback: DramaCallback) {
    if (this._destroyed || !isFunction(callback)) {
      return
    }
    this._callbacks[type].push(callback)
  }

  /** 移除事件监听，callback 为空时移除该类事件全部监听。 */
  private _removeEventListener(type: DramaEventType, callback?: DramaCallback) {
    const callbacks = this._callbacks[type]
    if (!isFunction(callback)) {
      callbacks.length = 0
      return
    }
    const index = callbacks.indexOf(callback)
    if (index > -1) {
      callbacks.splice(index, 1)
    }
  }

  /** 分发事件并做浅拷贝，避免监听器修改共享对象。 */
  private _dispatchEvent(type: DramaEventType, result: any) {
    const callbacks = this._callbacks[type]
    if (!callbacks.length) {
      return
    }
    const payload = isObject(result)
      ? Object.assign({}, result as Record<string, any>)
      : {}
    callbacks.slice().forEach((callback) => {
      try {
        callback(payload)
      } catch (e) {
        // 单个监听器异常不应阻断其它监听器
        console.error('drama ad event callback error', e)
      }
    })
  }
}

export const createDramaAd = defineSyncApi<API_TYPE_CREATE_DRAMA_AD>(
  API_CREATE_DRAMA_AD,
  (options) => {
    return new DramaAd(options)
  },
  CreateDramaAdProtocol,
  CreateDramaAdOptions
)
