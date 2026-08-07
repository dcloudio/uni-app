export const API_CREATE_DRAMA_AD = 'createDramaAd'

/** 单部短剧信息，未列出的原始字段可从 rawInfo 取。 */
export interface DramaInfo {
  dramaId: number
  title: string
  coverUrl: string
  desc: string
  categoryId: number
  categoryName: string
  currentEpisode: number
  totalEpisodes: number
  groupId: number
  unlockIndex: number
  styleType: number
  duration: number
  rawInfo: Record<string, any>
}

/** getList / getInfo 的返回结构。 */
export interface DramaListResult {
  dramas: DramaInfo[]
  extra: Record<string, any>
}

/** 短剧异步方法 / 错误事件的错误结构。 */
export interface DramaError {
  code: number
  message: string
  errMsg: string
  detail?: any
  event?: string
}

/** 原生短剧事件（广告 / 解锁 / 播放）回调结构。 */
export interface DramaNativeEvent {
  event: string
  info: Record<string, any>
  code: number
  message: string
}

/** 短剧列表查询参数。 */
export interface DramaListOptions {
  page?: number
  pageSize?: number
  order?: 'default' | 'reverse' | 0 | 1
  success?: (result: DramaListResult) => void
  fail?: (error: DramaError) => void
  complete?: (result: DramaListResult | DramaError) => void
}

/** 短剧信息查询参数，dramaId 与 dramaIds 二选一。 */
export interface DramaInfoOptions {
  dramaId?: number | string
  dramaIds?: Array<number | string>
  success?: (result: DramaListResult) => void
  fail?: (error: DramaError) => void
  complete?: (result: DramaListResult | DramaError) => void
}

/** 激励视频服务端回调(SSV)透传参数，对齐 <ad-drama url-callback>。 */
export interface DramaUrlCallback {
  /** 服务端回调中的用户标识，不传默认为空。请勿放敏感 PII。 */
  userId?: string
  /** 服务端回调透传参数（字符串，如 'scene=xxx&orderId=yyy'），不传默认为空。 */
  extra?: string
}

/** 打开短剧播放页参数。 */
export interface DramaOpenOptions {
  dramaId: number | string
  episode?: number
  /** 看一次激励广告解锁的集数，默认 1，取值范围 1-10。 */
  lock?: number
  /** 前置免费观看集数，默认 1，取值范围 1-20。 */
  free?: number
  /** 激励视频服务端回调透传参数。 */
  urlCallback?: DramaUrlCallback
  success?: (result: Record<string, any>) => void
  fail?: (error: DramaError) => void
  complete?: (result: Record<string, any> | DramaError) => void
}

type DramaSuccessCallback<T> = (result: T) => void
type DramaFailCallback = (error: DramaError) => void

/**
 * 短剧广告实例上下文。
 * `getList / getInfo / open` 同时支持 Promise（await/then）与回调两种用法：
 * - 传入 success/fail（位置参数或 options 内）走回调；
 * - 未传回调时返回真正的 Promise。
 */
export interface DramaAdContext {
  /**
   * 获取短剧列表，支持 Promise 与回调双模。
   */
  getList(
    options?: DramaListOptions,
    successCallback?: DramaSuccessCallback<DramaListResult>,
    failCallback?: DramaFailCallback
  ): Promise<DramaListResult>
  /**
   * 获取短剧信息，支持 Promise 与回调双模。
   */
  getInfo(
    options?: DramaInfoOptions,
    successCallback?: DramaSuccessCallback<DramaListResult>,
    failCallback?: DramaFailCallback
  ): Promise<DramaListResult>
  /**
   * 打开短剧页，支持 Promise 与回调双模。
   */
  open(
    options?: DramaOpenOptions,
    successCallback?: DramaSuccessCallback<Record<string, any>>,
    failCallback?: DramaFailCallback
  ): Promise<Record<string, any>>
  /**
   * 销毁短剧实例。
   */
  destroy(): void
  onLoad(callback: (result: Record<string, any>) => void): void
  offLoad(callback?: (result: Record<string, any>) => void): void
  onError(callback: (error: DramaError) => void): void
  offError(callback?: (error: DramaError) => void): void
  onAdEvent(callback: (result: DramaNativeEvent) => void): void
  offAdEvent(callback?: (result: DramaNativeEvent) => void): void
  onUnlockEvent(callback: (result: DramaNativeEvent) => void): void
  offUnlockEvent(callback?: (result: DramaNativeEvent) => void): void
  onPlayEvent(callback: (result: DramaNativeEvent) => void): void
  offPlayEvent(callback?: (result: DramaNativeEvent) => void): void
}

export type API_TYPE_CREATE_DRAMA_AD = (options: {
  adpid: string
}) => DramaAdContext

export const CreateDramaAdOptions: ApiOptions<API_TYPE_CREATE_DRAMA_AD> = {
  formatArgs: {
    adpid(value, params) {
      if (!value) {
        return 'adpid should not be empty.'
      }
      params.adpid = value
    },
  },
}

export const CreateDramaAdProtocol: ApiProtocol<API_TYPE_CREATE_DRAMA_AD> = {
  adpid: {
    type: String,
    required: true,
  },
}
