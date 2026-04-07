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
  private _configLast: number = 0

  // 生产环境地址
  private static readonly URL: string = 'https://hac1.dcloud.net.cn/ah5'
  // 测试环境地址
  // private static readonly URL: string = 'http://t-ac1.dcloud.net.cn/ah5'
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
    if (!this._configLast) {
      return true
    }
    return Math.abs(Date.now() - this._configLast) > AdConfig.CACHE_TIME
  }

  _init() {
    var config = this._getConfig()
    if (config === null || !config.last) {
      return
    }

    if (Math.abs(Date.now() - config.last) <= AdConfig.CACHE_TIME) {
      this._adConfig = config.data
      this._configLast = config.last
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
    const adData = a[adpid]
    if (adData) {
      success(b, Array.isArray(adData) ? adData : [adData])
    } else {
      fail(AdConfig.ERROR_INVALID_ADPID)
    }
  }

  _loadAdConfig(adpid: string) {
    if (this._isLoading === true) {
      return
    }
    this._isLoading = true

    const appid =
      typeof __uniConfig !== 'undefined' ? (__uniConfig as any).appId ?? '' : ''

    uni.request({
      url: AdConfig.URL,
      method: 'GET',
      timeout: 8000,
      data: {
        d: location.hostname,
        a: adpid,
        appid,
      },
      dataType: 'json',
      success: (res: any) => {
        const rd = res.data
        if (rd.ret === 0) {
          const data = rd.data

          this._adConfig = data
          this._configLast = Date.now()
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
    const domid = 'uniad_provider' + provider
    // 判断是否已经加载平台sdk
    const adScriptDom = document.getElementById(domid)
    const src = adScriptDom && adScriptDom.getAttribute('src')
    if (src) {
      this._cache[provider] = 1
      return
    }
    var ads = document.createElement('script')
    ads.setAttribute('id', domid)
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
  private _currentChannel: string | null = null

  private _rootRef: any
  private _tuiaData: any | null = null
  private _hasCustomTuiaMaterial: () => boolean
  private _setCustomTuiaVisible: (visible: boolean) => void

  constructor(
    props: { adpid: string; adpidWidescreen: string; widescreenWidth: number },
    trigger: CustomEventTrigger,
    rootRef: Ref<HTMLElement | null>,
    options: {
      hasCustomTuiaMaterial: () => boolean
      setCustomTuiaVisible: (visible: boolean) => void
    }
  ) {
    this._checkTimer = null
    this._adpid = props.adpid
    this._adpidWidescreen = props.adpidWidescreen
    this._widescreenWidth = props.widescreenWidth
    this._trigger = trigger
    this._rootRef = rootRef
    this._currentAdpid = this._adpid
    this._hasCustomTuiaMaterial = options.hasCustomTuiaMaterial
    this._setCustomTuiaVisible = options.setCustomTuiaVisible
  }

  renderTuiaFromCustomMaterial() {
    if (!this._tuiaData) {
      return
    }
    this._renderTuia(this._tuiaData)
  }

  get isWidescreen(): boolean {
    return (
      this._rootRef.value &&
      this._rootRef.value.clientWidth > this._widescreenWidth
    )
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
    if (this._rootRef.value) {
      this._rootRef.value.innerHTML = ''
    }
  }

  _renderAd() {
    if (this._pi > this._pl.length - 1) {
      return
    }

    const data = this._pl[this._pi]
    if (!data) {
      this._renderNext()
      return
    }
    const providerId = String(data.a1)
    const providerConfig = this._b[providerId]
    if (!providerConfig) {
      this._renderNext()
      return
    }

    const script = providerConfig.script || providerConfig.s
    this._currentChannel = providerId
    // create container view
    const id = this._randomId()
    this._createView(id)

    // 优量汇 / 广点通 h5
    if (providerId === '2') {
      ;(window as any).TencentGDT = (window as any).TencentGDT || []
      AdScript.instance.load(
        { provider: providerId, script },
        () => {
          this._renderGdt(id, data)
        },
        (err: any) => {
          this._trigger('error', {} as Event, err)
          this._renderNext()
        }
      )
      return
    }

    // 推啊 H5
    if (providerId === '4') {
      AdScript.instance.load(
        { provider: providerId, script },
        () => {
          this._renderTuiaMaterial(id, data)
        },
        (err: any) => {
          this._trigger('error', {} as Event, err)
          this._renderNext()
        }
      )
      return
    }

    this._renderNext()

    // // generic provider path (call provider sdk method)
    // this._b[providerId].provider = providerId
    // AdScript.instance.load(
    //   this._b[providerId],
    //   () => {
    //     this._renderAdView(this._b[providerId], data)
    //   },
    //   (err: any) => {
    //     this._trigger('error', {} as Event, err)
    //   }
    // )
  }

  _createView(id: string) {
    if (!this._rootRef.value) {
      return null
    }
    var adView = document.createElement('div')
    adView.setAttribute('id', id)
    adView.setAttribute('class', id)
    this._rootRef.value.innerHTML = ''
    this._rootRef.value.append(adView)
    return adView
  }

  _renderGdt(id: string, data: any) {
    ;(window as any).TencentGDT.push({
      placement_id: data.a3,
      app_id: data.a2,
      type: 'native',
      count: 1,
      onComplete: (res: any) => {
        if (res && res.constructor === Array && res.length > 0) {
          ;(window as any).TencentGDT.NATIVE.renderAd(res[0], id)
          this._trigger('load', {} as Event, {})
        } else {
          this._trigger(
            'error',
            {} as Event,
            res || { errMsg: 'No advertisement' }
          )
          this._renderNext()
        }
      },
    })

    this._startCheckTimer()
  }

  _renderTuiaMaterial(id: string, data: any) {
    const adView = document.getElementById(id)
    if (!adView) {
      this._trigger('error', {} as Event, { errMsg: 'Invalid ad container' })
      this._renderNext()
      return
    }

    this._tuiaData = data

    if (this._hasCustomTuiaMaterial()) {
      adView.innerHTML = ''
      this._setCustomTuiaVisible(true)
      this.report(40, this._currentChannel || undefined)
      this._trigger('load', {} as Event, {})
      return
    }
    this._setCustomTuiaVisible(false)

    const materialSrc = this._getRandomTuiaMaterial(data?.imgs, data?.img)
    if (!materialSrc) {
      this._trigger('error', {} as Event, {
        errMsg: 'Invalid tuia material imgs/img',
      })
      this._renderNext()
      return
    }

    const img = document.createElement('img')
    img.src = materialSrc
    img.onerror = () => {
      this._trigger('error', {} as Event, { errMsg: 'Tuia material load fail' })
      this._renderNext()
    }
    img.alt = 'ad'
    img.setAttribute('draggable', 'false')
    img.style.width = '100%'
    img.style.height = 'auto'
    img.style.display = 'block'
    img.style.cursor = 'pointer'
    img.onclick = () => {
      this._renderTuia(data)
    }

    adView.innerHTML = ''
    adView.append(img)
    this.report(40, this._currentChannel || undefined)
    this._trigger('load', {} as Event, {})
  }

  _getRandomTuiaMaterial(imgs: any, img: any): string {
    if (Array.isArray(imgs)) {
      const list = imgs.filter((item) => typeof item === 'string' && item)
      if (list.length) {
        const index = Math.floor(Math.random() * list.length)
        return list[index]
      }
    }

    if (typeof img === 'string') {
      return img
    }

    return ''
  }

  _renderTuia(data: any) {
    this._setCustomTuiaVisible(false)
    const tuia = (window as any).TuiaSDKLite
    if (!tuia || typeof tuia.execute !== 'function') {
      this._trigger('error', {} as Event, { errMsg: 'Invalid TuiaSDKLite' })
      this._renderNext()
      return
    }

    tuia.execute({
      data: {
        pid: data.a3,
        fail_message: 'ad load fail',
        product_name: document.title || location.hostname,
      },
      success: (res: any) => {
        this._trigger('load', {} as Event, res || {})
      },
      fail: (err: any) => {
        this._trigger(
          'error',
          {} as Event,
          err || { errMsg: 'TuiaSDKLite execute fail' }
        )
        this._renderNext()
      },
    })
  }

  _renderAdView(provider: any, data: any) {
    var randomId = this._randomId()
    var adView = document.createElement('div')
    adView.setAttribute('class', randomId)
    this._rootRef.value.innerHTML = ''
    this._rootRef.value.append(adView)
    const scriptPath = provider.s || provider.script
    if (!scriptPath || typeof scriptPath !== 'string') {
      this._trigger('error', {} as Event, { errMsg: 'Invalid provider script' })
      this._renderNext()
      return
    }

    try {
      let bindThis = window as any
      const fn = scriptPath
        .split('.')
        .reduce((total: any, currentValue: any) => {
          bindThis = total
          return total[currentValue]
        }, window)
      fn.bind(bindThis)(data.a2, randomId, 2)
    } catch (err: any) {
      this._trigger('error', {} as Event, err)
      this._renderNext()
      return
    }

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
    if (!this._rootRef.value) {
      return false
    }
    var hasContent =
      this._rootRef.value.children.length > 0 &&
      this._rootRef.value.clientHeight > 40
    if (hasContent) {
      this.report(40, this._currentChannel || undefined)
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

  report(type: number, currentChannel?: string) {
    const compilerVersion =
      typeof __uniConfig !== 'undefined'
        ? (__uniConfig as any).compilerVersion ?? ''
        : ''
    const reportData: any = {
      h: compilerVersion,
      a: this._currentAdpid,
      at: type,
    }
    if (currentChannel) {
      reportData.t = currentChannel
    }
    AdReport.instance.get(reportData)
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
    this._tuiaData = null
    this._setCustomTuiaVisible(false)
    this._clearCheckTimer()
    if (this._rootRef.value) {
      this._rootRef.value.innerHTML = ''
    }
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
  setup(props, { emit, slots }) {
    const rootRef = ref(null)
    const customTuiaVisible = ref(false)
    const { $excludeAttrs, $listeners } = useAttrs({
      excludeListeners: true,
    })
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    const ad = new AdRender(props, trigger, rootRef, {
      hasCustomTuiaMaterial: () =>
        Boolean(slots.default && slots.default().length),
      setCustomTuiaVisible: (visible) => {
        customTuiaVisible.value = visible
      },
    })

    watch(
      () => props.adpid,
      (val) => {
        ad.load(val)
      }
    )
    watch(
      () => props.adpidWidescreen,
      (val) => {
        ad.load(val)
      }
    )

    onMounted(() => {
      const compilerVersion =
        typeof __uniConfig !== 'undefined'
          ? (__uniConfig as any).compilerVersion ?? ''
          : ''
      ad.load(null)
      AdReport.instance.get({
        h: compilerVersion,
        a: props.adpid,
        at: -3,
        ic: AdConfig.IC,
        is: AdConfig.IS,
      })
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
            adpid={adpid}
            adpidWidescreen={adpidWidescreen}
            widescreenWidth={widescreenWidth}
          >
            <div
              ref={rootRef}
              class="uni-ad-container"
              onClick={() => ad.report(41)}
            />
            {customTuiaVisible.value && slots.default ? (
              <div
                class="uni-ad-custom-material"
                onClick={() => ad.renderTuiaFromCustomMaterial()}
              >
                {slots.default()}
              </div>
            ) : null}
          </uni-ad>
        </>
      )
    }
  },
})
