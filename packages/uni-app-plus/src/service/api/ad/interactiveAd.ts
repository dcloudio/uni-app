import {
  API_CREATE_INTERACTIVE_AD,
  type API_TYPE_CREATE_INTERACTIVE_AD,
  CreateInteractiveAdOptions,
  CreateInteractiveAdProtocol,
  defineSyncApi,
} from '@dcloudio/uni-api'

import { requireNativePlugin } from '../plugin/requireNativePlugin'

import { AdEventHandler, EventType } from './adBase'

const sdkCache: Record<string, any> = {}
const sdkQueue: Record<string, Array<any>> = {}

function initSDK(options: any) {
  const provider = options.provider
  if (!sdkCache[provider]) {
    sdkCache[provider] = {}
  }
  if (typeof sdkCache[provider].plugin === 'object') {
    options.success(sdkCache[provider].plugin)
    return
  }

  if (!sdkQueue[provider]) {
    sdkQueue[provider] = []
  }
  sdkQueue[provider].push(options)

  if (sdkCache[provider].status === true) {
    options.__plugin = sdkCache[provider].plugin
    return
  }
  sdkCache[provider].status = true

  const plugin = requireNativePlugin(provider)
  if (!plugin || !plugin.initSDK) {
    sdkQueue[provider].forEach((item) => {
      item.fail({
        code: -1,
        message: 'provider [' + provider + '] invalid',
      })
    })
    sdkQueue[provider].length = 0
    sdkCache[provider].status = false
    return
  }

  // TODO
  sdkCache[provider].plugin = plugin
  options.__plugin = plugin
  plugin.initSDK((res: any) => {
    const isSuccess = res.code === 1 || res.code === '1'
    if (isSuccess) {
      sdkCache[provider].plugin = plugin
    } else {
      sdkCache[provider].status = false
    }

    sdkQueue[provider].forEach((item) => {
      if (isSuccess) {
        item.success(item.__plugin)
      } else {
        item.fail(res)
      }
    })
    sdkQueue[provider].length = 0
  })
}

class InteractiveAd
  extends AdEventHandler
  implements UniApp.InteractiveAdContext
{
  private _adpid: string = ''
  private _provider: string = ''
  private _userData: any = null

  private _isLoaded: boolean = false
  private _isLoading: boolean = false
  private _loadPromiseResolve: Function | null = null
  private _loadPromiseReject: Function | null = null
  private _showPromiseResolve: Function | null = null
  private _showPromiseReject: Function | null = null

  private _adInstance: any = null
  private _adError: any = ''

  constructor(options: any) {
    super()

    this._adpid = options.adpid
    this._provider = options.provider
    this._userData = options.userData

    setTimeout(() => {
      this._init()
    })
  }

  _init() {
    this._adError = ''
    initSDK({
      provider: this._provider,
      success: (res: any) => {
        this._adInstance = res
        if (this._userData) {
          this.bindUserData(this._userData)
        }
        this._loadAd()
      },
      fail: (err: any) => {
        this._adError = err
        if (this._loadPromiseReject != null) {
          this._loadPromiseReject(this._createError(err))
          this._loadPromiseReject = null
        }
        this._dispatchEvent(EventType.error, err)
      },
    })
  }

  getProvider() {
    return this._provider
  }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._loadPromiseResolve = resolve
      this._loadPromiseReject = reject
      if (this._isLoading) {
        return
      }

      if (this._adError) {
        this._init()
        return
      }

      if (this._isLoaded) {
        resolve('')
      } else {
        this._loadAd()
      }
    })
  }

  show(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._showPromiseResolve = resolve
      this._showPromiseReject = reject

      if (this._isLoading) {
        return
      }

      if (this._adError) {
        this._init()
        return
      }

      if (this._isLoaded) {
        this._showAd()
        resolve('')
      } else {
        this._loadAd()
      }
    })
  }

  reportExposure(): void {
    if (this._adInstance !== null) {
      this._adInstance.reportExposure()
    }
  }

  bindUserData(data: any) {
    if (this._adInstance !== null) {
      this._adInstance.bindUserData(data)
    }
  }

  destroy() {
    if (this._adInstance !== null && this._adInstance.destroy) {
      this._adInstance.destroy({
        adpid: this._adpid,
      })
    }
  }

  _loadAd() {
    if (this._adInstance !== null) {
      if (this._isLoading === true) {
        return
      }
      this._isLoading = true

      this._adInstance.loadData(
        {
          adpid: this._adpid,
        },
        (res: any) => {
          this._isLoaded = true
          this._isLoading = false

          if (this._loadPromiseResolve != null) {
            this._loadPromiseResolve()
            this._loadPromiseResolve = null
          }
          if (this._showPromiseResolve != null) {
            this._showPromiseResolve()
            this._showPromiseResolve = null
            this._showAd()
          }

          this._dispatchEvent(EventType.load, res)
        },
        (err: any) => {
          this._isLoading = false

          if (this._showPromiseReject != null) {
            this._showPromiseReject(this._createError(err))
            this._showPromiseReject = null
          }

          this._dispatchEvent(EventType.error, err)
        }
      )
    }
  }

  _showAd() {
    if (this._adInstance !== null && this._isLoaded === true) {
      this._adInstance.show(
        {
          adpid: this._adpid,
        },
        () => {
          this._isLoaded = false
        },
        (err: any) => {
          this._isLoaded = false

          if (this._showPromiseReject != null) {
            this._showPromiseReject(this._createError(err))
            this._showPromiseReject = null
          }

          this._dispatchEvent(EventType.error, err)
        }
      )
    }
  }

  _createError(err: any): Error {
    return new Error(JSON.stringify(err))
  }
}

export const createInteractiveAd =
  defineSyncApi<API_TYPE_CREATE_INTERACTIVE_AD>(
    API_CREATE_INTERACTIVE_AD,
    (options) => {
      return new InteractiveAd(options)
    },
    CreateInteractiveAdProtocol,
    CreateInteractiveAdOptions
  )
