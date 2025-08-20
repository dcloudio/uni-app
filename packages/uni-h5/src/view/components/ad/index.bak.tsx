import { type Ref, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  type CustomEventTrigger,
  type EmitEvent,
  defineBuiltInComponent,
  useAttrs,
  useCustomEvent,
} from '@dcloudio/uni-components'

//#region ad
class AdConfig {
  private static _instance: AdConfig
  static get instance() {
    if (!AdConfig._instance) {
      AdConfig._instance = new AdConfig()
      AdConfig._instance._init()
    }
    return AdConfig._instance
  }

  static IC = 0
  static IS = 0

  private _adConfig: any | null = null
  private _isLoading: Boolean = false
  private _callbacks: any[] = []

  private static readonly URL: string = 'https://hac1.dcloud.net.cn/ah5'
  private static readonly KEY: string = 'uni_app_ad_config'
  private static readonly CACHE_TIME: number = 1000 * 60 * 10
  private static readonly ERROR_INVALID_ADPID: any = {
    '-5002': 'invalid adpid',
  }

  constructor() {}

  get adConfig() {
    return this._adConfig
  }

  get isExpired() {
    if (this._adConfig == null) {
      return true
    }
    return Math.abs(Date.now() - this._adConfig.last) > AdConfig.CACHE_TIME
  }

  _init() {
    var config = this._getConfig()
    if (config === null || !config.last) {
      return
    }

    if (!this.isExpired) {
      this._adConfig = config.data
    }
  }

  get(adpid: string, success: Function, fail: Function) {
    AdConfig.IC++
    if (this._adConfig != null) {
      this._doCallback(adpid, success, fail)
      if (this.isExpired) {
        this._loadAdConfig(adpid)
      }
      return
    }

    this._callbacks.push({
      adpid: adpid,
      success: success,
      fail: fail,
    })

    this._loadAdConfig(adpid)
  }

  _doCallback(adpid: string, success: Function, fail: Function) {
    AdConfig.IS++
    var { a, b } = this._adConfig
    if (a[adpid]) {
      success(b, a[adpid])
    } else {
      fail(AdConfig.ERROR_INVALID_ADPID)
    }
  }

  _loadAdConfig(adpid: string) {
    if (this._isLoading === true) {
      return
    }
    this._isLoading = true

    uni.request({
      url: AdConfig.URL,
      method: 'GET',
      timeout: 8000,
      data: {
        d: location.hostname,
        a: adpid,
      },
      dataType: 'json',
      success: (res: any) => {
        const rd = res.data
        if (rd.ret === 0) {
          const data = rd.data

          this._adConfig = data
          this._setConfig(data)

          this._callbacks.forEach(({ adpid, success, fail }) => {
            this._doCallback(adpid, success, fail)
          })
        } else {
          this._callbacks.forEach((i) => {
            i.fail({ errCode: rd.ret, errMsg: rd.msg })
          })
        }
        this._callbacks = []
      },
      fail: (err) => {
        this._callbacks.forEach((i) => {
          i.fail(err)
        })
        this._callbacks = []
      },
      complete: (c) => {
        this._isLoading = false
      },
    })
  }

  _getConfig() {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null
    }
    var data = localStorage.getItem(AdConfig.KEY)
    return data ? JSON.parse(data) : null
  }

  _setConfig(data: any) {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null
    }
    localStorage.setItem(
      AdConfig.KEY,
      JSON.stringify({
        last: Date.now(),
        data: data,
      })
    )
  }
}

class AdReport {
  private static _instance: AdReport
  static get instance() {
    if (!AdReport._instance) {
      AdReport._instance = new AdReport()
    }
    return AdReport._instance
  }

  private static readonly URL: string = 'https://has1.dcloud.net.cn/ahl'
  private static readonly KEY: string = 'uni_app_ad_guid'

  private _guid: string

  constructor() {
    var config = this._getConfig()
    if (config && config.guid) {
      this._guid = config.guid
      return
    }

    this._guid = this._newGUID()
    this._setConfig(this._guid)
  }

  get(data: any) {
    this._process(
      Object.assign(data, {
        d: location.hostname,
        i: this._guid,
      })
    )
  }

  _process(data: any) {
    uni.request({
      url: AdReport.URL,
      method: 'GET',
      data: data,
      dataType: 'json',
      success: () => {},
    })
  }

  _newGUID() {
    let guid = ''
    const format = 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'
    for (let i = 0; i < format.length; i++) {
      if (format[i] === 'x') {
        guid += ((Math.random() * 16) | 0).toString(16)
      } else {
        guid += format[i]
      }
    }
    return guid.toUpperCase()
  }

  _getConfig() {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null
    }
    var data = localStorage.getItem(AdReport.KEY)
    return data ? JSON.parse(data) : null
  }

  _setConfig(guid: string) {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null
    }
    localStorage.setItem(
      AdReport.KEY,
      JSON.stringify({
        last: Date.now(),
        guid: guid,
      })
    )
  }
}

class AdScript {
  private static _instance: AdScript
  static get instance() {
    if (!AdScript._instance) {
      AdScript._instance = new AdScript()
    }
    return AdScript._instance
  }

  private _callback: Record<string, Array<any>>
  private _cache: Record<string, any>

  constructor() {
    this._callback = {}
    this._cache = {}
  }

  load(data: any, success: Function, fail: Function) {
    const provider = data.provider
    if (this._cache[provider] === undefined) {
      this.loadScript(data)
    }

    if (this._cache[provider] === 1) {
      success()
    } else {
      if (!this._callback[provider]) {
        this._callback[provider] = []
      }
      this._callback[provider].push({
        success,
        fail,
      })
    }
  }

  loadScript(data: any) {
    const provider = data.provider
    this._cache[provider] = 0
    var ads = document.createElement('script')
    ads.setAttribute('id', 'uniad_provider' + provider)
    const script = data.script
    for (const var1 in script) {
      ads.setAttribute(var1, script[var1])
    }
    ads.onload = () => {
      this._cache[provider] = 1
      this._callback[provider].forEach(({ success }) => {
        success()
      })
      this._callback[provider].length = 0
    }
    ads.onerror = (err) => {
      this._cache[provider] = undefined
      this._callback[provider].forEach(({ fail }) => {
        fail(err)
      })
      this._callback[provider].length = 0
    }
    document.body.append(ads)
  }
}

const CHECK_RENDER_DELAY = 1000
const CHECK_RENDER_RETRY = 5

class AdRender {
  private _checkTimer: ReturnType<typeof setTimeout> | null
  private _pi: number = 0
  private _pl: any[] = []
  private _b: any = {}
  private _checkTimerCount: number = 0

  private _trigger: CustomEventTrigger

  private _adpid: string
  private _adpidWidescreen: string
  private _widescreenWidth: number
  private _currentAdpid: string

  private _rootRef: any

  constructor(
    props: { adpid: string; adpidWidescreen: string; widescreenWidth: number },
    trigger: CustomEventTrigger,
    rootRef: Ref<HTMLElement | null>
  ) {
    this._checkTimer = null
    this._adpid = props.adpid
    this._adpidWidescreen = props.adpidWidescreen
    this._widescreenWidth = props.widescreenWidth
    this._trigger = trigger
    this._rootRef = rootRef
    this._currentAdpid = this._adpid
  }

  get isWidescreen(): boolean {
    return this._rootRef.value.style.clientWidth > this._widescreenWidth
  }

  load(adpid: string | null) {
    this._currentAdpid =
      adpid || (this.isWidescreen ? this._adpidWidescreen : this._adpid)

    this._reset()

    AdConfig.instance.get(
      this._currentAdpid,
      (b: any, a: Array<any>) => {
        this._b = b
        this._pl = a
        this._renderAd()
      },
      (err: any) => {
        this._trigger('error', {} as Event, err)
      }
    )
  }

  dispose() {
    this._clearCheckTimer()
    this._rootRef.value.innerHTML = ''
  }

  _renderAd() {
    if (this._pi > this._pl.length - 1) {
      return
    }

    const data = this._pl[this._pi]
    const providerId = data.a1
    this._b[providerId].provider = providerId

    AdScript.instance.load(
      this._b[providerId],
      () => {
        this._renderAdView(this._b[providerId], data)
      },
      (err: any) => {
        this._trigger('error', {} as Event, err)
      }
    )
  }

  _renderAdView(provider: any, data: any) {
    var randomId = this._randomId()
    var adView = document.createElement('div')
    adView.setAttribute('class', randomId)
    this._rootRef.value.innerHTML = ''
    this._rootRef.value.append(adView)
    let bindThis = window
    provider.s
      .split('.')
      .reduce((total: any, currentValue: any) => {
        bindThis = total
        return total[currentValue]
      }, window)
      .bind(bindThis)(data.a2, randomId, 2)

    this._startCheckTimer()
  }

  _renderNext() {
    if (this._pi >= this._pl.length - 1) {
      return
    }

    this._pi++
    this._renderAd()
  }

  _checkRender(): boolean {
    var hasContent =
      this._rootRef.value.children.length > 0 &&
      this._rootRef.value.clientHeight > 40
    if (hasContent) {
      this.report(40)
    }
    return hasContent
  }

  _startCheckTimer() {
    this._clearCheckTimer()
    this._checkTimer = setInterval(() => {
      this._checkTimerCount++
      if (this._checkTimerCount >= CHECK_RENDER_RETRY) {
        this._clearCheckTimer()
        this._renderNext()
        return
      }

      if (this._checkRender()) {
        this._clearCheckTimer()
      }
    }, CHECK_RENDER_DELAY)
  }

  _clearCheckTimer() {
    this._checkTimerCount = 0
    if (this._checkTimer != null) {
      window.clearInterval(this._checkTimer)
      this._checkTimer = null
    }
  }

  report(type: number) {
    AdReport.instance.get({
      h: (__uniConfig as any).compilerVersion, // TODO
      a: this._currentAdpid,
      at: type,
    })
  }

  _randomId() {
    var result = ''
    for (let i = 0; i < 4; i++) {
      result += ((65536 * (1 + Math.random())) | 0).toString(16).substring(1)
    }
    return '_u' + result
  }

  _reset() {
    this._b = {}
    this._pl = []
    this._pi = 0
    this._clearCheckTimer()
    this._rootRef.value.innerHTML = ''
  }
}
//#endregion

const DEFAULT_WIDESCREEN_WIDTH: number = 750

export default /*#__PURE__*/ defineBuiltInComponent({
  inheritAttrs: false,
  name: 'Ad',
  props: {
    adpid: {
      type: String,
      default: '',
    },
    adpidWidescreen: {
      type: String,
      default: '',
    },
    widescreenWidth: {
      type: Number,
      default: DEFAULT_WIDESCREEN_WIDTH,
    },
  },
  setup(props, { emit }) {
    const rootRef = ref(null)
    const { $excludeAttrs, $listeners } = useAttrs({
      excludeListeners: true,
    })
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    const ad = new AdRender(props, trigger, rootRef)

    watch(
      () => props.adpid,
      (val) => {
        ad.load(val)
      }
    )

    onMounted(() => {
      ad.load(null)
    })

    onBeforeUnmount(() => {
      ad.dispose()
    })

    return () => {
      const { adpid, adpidWidescreen, widescreenWidth } = props
      return (
        <>
          <uni-ad
            {...$listeners.value}
            {...$excludeAttrs.value}
            ref={rootRef}
            adpid={adpid}
            adpidWidescreen={adpidWidescreen}
            widescreenWidth={widescreenWidth}
          ></uni-ad>
        </>
      )
    }
  },
})
