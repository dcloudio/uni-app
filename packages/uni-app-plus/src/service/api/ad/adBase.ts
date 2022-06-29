import { isFunction } from '@vue/shared'
const EventType = {
  load: 'load',
  close: 'close',
  error: 'error',
  adClicked: 'adClicked',
}

type PlusError = {
  code: Number
  message: String
}

class AdEventHandler {
  private _callbacks: Record<string, Array<Function>>

  constructor() {
    this._callbacks = {}
  }

  onLoad(callback: (result: any) => void) {
    this._addEventListener(EventType.load, callback)
  }

  onClose(callback: (result: any) => void) {
    this._addEventListener(EventType.close, callback)
  }

  onError(callback: (result: any) => void) {
    this._addEventListener(EventType.error, callback)
  }

  offLoad(callback: (result: any) => void) {
    this._removeEventListener(EventType.load, callback)
  }

  offClose(callback: (result: any) => void) {
    this._removeEventListener(EventType.close, callback)
  }

  offError(callback: (result: any) => void) {
    this._removeEventListener(EventType.error, callback)
  }

  _addEventListener(type: string, callback: Function) {
    if (!isFunction(callback)) {
      return
    }
    if (!this._callbacks[type]) {
      this._callbacks[type] = []
    }
    this._callbacks[type].push(callback)
  }

  _removeEventListener(type: string, callback: Function) {
    const arrayFunction: Array<Function> = this._callbacks[type]
    const index = arrayFunction.indexOf(callback)
    if (index > -1) {
      arrayFunction.splice(index, 1)
    }
  }

  _dispatchEvent(name: string, data: object) {
    this._callbacks[name].forEach((callback) => {
      callback(data || {})
    })
  }
}

class AdBase extends AdEventHandler {
  preload: boolean = true

  private _isLoaded: boolean = false
  private _isLoading: boolean = false
  private _loadPromiseResolve: Function | null = null
  private _loadPromiseReject: Function | null = null
  private _showPromiseResolve: Function | null = null
  private _showPromiseReject: Function | null = null
  private _adInstance: any

  constructor(adInstance: any, options: any) {
    super()

    this.preload = options.preload !== undefined ? options.preload : false

    const ad = (this._adInstance = adInstance)

    ad.onLoad(() => {
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

      this._dispatchEvent(EventType.load, {})
    })
    ad.onClose((e: any) => {
      this._isLoaded = false
      this._isLoading = false
      this._dispatchEvent(EventType.close, e)

      if (this.preload === true) {
        this._loadAd()
      }
    })
    ad.onError((e: PlusError) => {
      this._isLoading = false

      const data = {
        code: e.code,
        errMsg: e.message,
      }

      this._dispatchEvent(EventType.error, data)

      const error = new Error(JSON.stringify(data))

      if (this._loadPromiseReject != null) {
        this._loadPromiseReject(error)
        this._loadPromiseReject = null
      }

      if (this._showPromiseReject != null) {
        this._showPromiseReject(error)
        this._showPromiseReject = null
      }
    })
    ad.onAdClicked &&
      ad.onAdClicked(() => {
        this._dispatchEvent(EventType.adClicked, {})
      })
  }

  getProvider() {
    return this._adInstance.getProvider()
  }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._loadPromiseResolve = resolve
      this._loadPromiseReject = reject

      if (this._isLoading) {
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

      if (this._isLoaded) {
        this._showAd()
        resolve('')
      } else {
        this._loadAd()
      }
    })
  }

  destroy() {
    this._adInstance.destroy()
  }

  _loadAd() {
    this._isLoaded = false
    this._isLoading = true
    this._adInstance.load()
  }

  _showAd() {
    this._adInstance.show()
  }
}

export { AdBase, AdEventHandler, EventType }
