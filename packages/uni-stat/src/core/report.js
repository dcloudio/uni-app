import {
  get_first_visit_time,
  get_last_visit_time,
  get_page_residence_time,
  get_residence_time,
  get_time,
  get_total_visit_count,
  set_first_time,
  set_page_residence_time,
} from '../utils/pageTime.js'

import {
  calibration,
  get_channel,
  get_encodeURIComponent_options,
  get_odid,
  get_pack_name,
  get_page_name,
  get_page_route,
  get_page_vm,
  get_platform_name,
  get_report_Interval,
  get_route,
  get_scene,
  get_sgin,
  get_splicing,
  get_uuid,
  get_version,
  handle_data,
  is_debug,
  is_handle_device,
  is_report_data,
  log,
  stat_config,
} from '../utils/pageInfo.js'

import { sys } from '../utils/util.js'

import {
  OPERATING_TIME,
  STAT_H5_URL,
  STAT_URL,
  STAT_VERSION,
} from '../config.ts'

import { dbGet, dbRemove, dbSet } from '../utils/db.js'
import {
  ackPending,
  gateSend,
  initReportNetwork,
  persistPending,
  toWirePayload,
} from './reportNetwork.js'
const eport_Interval = get_report_Interval(OPERATING_TIME)

// 统计数据默认值
let statData = {
  uuid: get_uuid(), // 设备标识
  ak: stat_config.appid, // uni-app 应用 Appid
  p: '', // 手机系统，客户端平台
  ut: get_platform_name(), // 平台类型
  mpn: get_pack_name(), // 原生平台包名、小程序 appid
  usv: STAT_VERSION, // 统计 sdk 版本
  v: get_version(), // 应用版本，仅app
  ch: get_channel(), // 渠道信息
  cn: '', // 国家
  pn: '', // 省份
  ct: '', // 城市
  t: get_time(), // 上报数据时的时间戳
  tt: '',
  brand: sys.brand || '', // 手机品牌
  md: sys.model, // 手机型号
  sv: '', // 手机系统版本
  mpsdk: sys.SDKVersion || '', // x程序 sdk version
  mpv: sys.version || '', // 小程序平台版本 ，如微信、支付宝
  lang: sys.language, // 语言
  pr: sys.pixelRatio, // pixelRatio 设备像素比
  ww: sys.windowWidth, // windowWidth 可使用窗口宽度
  wh: sys.windowHeight, // windowHeight 可使用窗口高度
  sw: sys.screenWidth, // screenWidth 屏幕宽度
  sh: sys.screenHeight, // screenHeight 屏幕高度
}

// 客户端平台，只有app平台平台可以用到
if(sys.platform){
  switch (sys.platform) {
    case 'android':
      statData.p = 'a'
      break
    case 'ios':
      statData.p = 'i'
      break
    case 'harmonyos': 
      statData.p = 'h'
      break
  }
}

// 获取手机版本
if (sys.system){
  statData.sv = sys.system.replace(/(Android|iOS)\s/, '')
}
export default class Report {
  constructor() {
    // 页面实例
    this.self = ''
    // 进入应用标识
    this.__licationShow = false
    // 离开应用标识
    this.__licationHide = false
    // 统计默认值
    this.statData = statData
    // 标题默认值
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '',
    }

    // 页面参数
    this._query = {}
    // 页面最后停留页面的 url
    // this._lastPageRoute = ''

    // 注册拦截器
    let registerInterceptor = typeof uni.addInterceptor === 'function'
    if (registerInterceptor) {
      this.addInterceptorInit()
      this.interceptLogin()
      this.interceptShare(true)
      this.interceptRequestPayment()
    }

    // 私有版网络门闸：1.0/云函数共用同一模块，仅 sendFn 不同
    if (__STAT_VERSION__ === '1') {
      initReportNetwork((optionsData) => {
        this.dispatchSendRequestV1(optionsData)
      })
    }
    if (__STAT_VERSION__ === '2') {
      initReportNetwork(
        (optionsData) => {
          this.dispatchSendRequestV2(optionsData)
        },
        { flushOnInit: false }
      )
    }
  }

  addInterceptorInit() {
    let self = this
    uni.addInterceptor('setNavigationBarTitle', {
      invoke(args) {
        self._navigationBarTitle.page = args.title
      },
    })
  }

  interceptLogin() {
    let self = this
    uni.addInterceptor('login', {
      complete() {
        self._login()
      },
    })
  }

  interceptShare(type) {
    let self = this
    if (!type) {
      self._share()
      return
    }
    uni.addInterceptor('share', {
      success() {
        self._share()
      },
      fail() {
        self._share()
      },
    })
  }

  interceptRequestPayment() {
    let self = this
    uni.addInterceptor('requestPayment', {
      success() {
        self._payment('pay_success')
      },
      fail() {
        self._payment('pay_fail')
      },
    })
  }

  _login() {
    this.sendEventRequest(
      {
        key: 'login',
      },
      0
    )
  }

  _share() {
    this.sendEventRequest(
      {
        key: 'share',
      },
      0
    )
  }
  _payment(key) {
    this.sendEventRequest(
      {
        key,
      },
      0
    )
  }

  /**
   * 进入应用触发
   */
  applicationShow(appShowOptions = {}) {
    // 通过 __licationHide 判断保证是进入后台后在次进入应用，避免重复上报数据
    if (this.__licationHide) {
      const scene = get_scene(appShowOptions && appShowOptions.scene)
      const path = (appShowOptions && appShowOptions.path) || ''
      const time = get_residence_time('app')
      // 需要判断进入后台是否超过时限 ，默认是 30min ，是的话需要执行进入应用的上报
      if (time.overtime) {
        let lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE')
        let options = {
          path: path || lastPageRoute,
          scene: scene || this.statData.sc,
          cst: 2,
        }
        this.sendReportRequest(options)
      } else {
        // 在没有超过时限的时候 ，判断场景值 ，如果是场景值发生了变化，则需要上报应用启动数据
        if (scene && scene !== this.statData.sc) {
          let lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE')
          let options = {
            path: path || lastPageRoute,
            scene: scene,
            cst: 2,
          }
          this.sendReportRequest(options)
        }
      }
      // 状态重置
      this.__licationHide = false
    }
  }

  /**
   * 离开应用触发
   * @param {Object} self
   * @param {Object} type
   */
  applicationHide(self, type) {
    if (!self) {
      // 表示应用切换到后台 ，此时需要从页面栈获取页面实例
      self = get_page_vm()
    }
    // 进入应用后台保存状态，方便进入前台后判断是否上报应用数据
    this.__licationHide = true
    const time = get_residence_time()
    const route = get_page_route(self)
    uni.setStorageSync('_STAT_LAST_PAGE_ROUTE', route)
    this.sendHideRequest(
      {
        urlref: route,
        urlref_ts: time.residenceTime,
      },
      type
    )
    // 更新页面首次访问时间
    set_first_time()
  }

  /**
   * 进入页面触发
   */
  pageShow(self) {
    // 清空值 ，初始化 ，避免污染后面的上报数据
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '',
    }

    const route = get_page_route(self)
    const routepath = get_route(self)

    this._navigationBarTitle.config = get_page_name(routepath)
    // 表示应用触发 ，页面切换不触发之后的逻辑
    if (this.__licationShow) {
      // 更新页面首次访问时间
      set_first_time()
      // this._lastPageRoute = route
      uni.setStorageSync('_STAT_LAST_PAGE_ROUTE', route)
      this.__licationShow = false
      return
    }

    const time = get_residence_time('page')
    // 停留时间
    if (time.overtime) {
      let options = {
        path: route,
        scene: this.statData.sc,
        cst: 3,
      }
      this.sendReportRequest(options)
    }
    // 更新页面首次访问时间
    set_first_time()
  }

  /**
   * 离开页面触发
   */
  pageHide(self) {
    if (!this.__licationHide) {
      const time = get_residence_time('page')
      let route = get_page_route(self)
      let lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE')
      if (!lastPageRoute) {
        lastPageRoute = route
      }
      uni.setStorageSync('_STAT_LAST_PAGE_ROUTE', route)
      this.sendPageRequest({
        url: route,
        urlref: lastPageRoute,
        urlref_ts: time.residenceTime,
      })
      // this._lastPageRoute = route
      return
    }
  }

  /**
   * 发送应用维度启动日志（lt=1）。
   * visit 字段约定（修复 lvts=0 重复新增）：
   *   1. 先 get_last_visit_time()：读出本次要上报的 lvts，并立刻落库当前时间作基线；
   *   2. 再 get_first_visit_time()：只维护 fvts，且不得清空步骤 1 写入的 lvts；
   *   3. 首启上报 lvts=0，之后冷启动 / cst=2|3 续会话必须读到非 0。
   * odid 与 lvts 解耦：1.0 仅新用户附带；2.0 在尚未标记设备已处理时补发（不依赖 lvts）。
   * @param {Object} options 页面信息
   * @param {Boolean} type 是否立即上报
   */
  sendReportRequest(options, type) {
    this._navigationBarTitle.lt = '1'
    this._navigationBarTitle.config = get_page_name(options.path)
    let is_opt = options.query && JSON.stringify(options.query) !== '{}'
    let query = is_opt ? '?' + JSON.stringify(options.query) : ''
    // 必须先读 lvts 再写 fvts，保证首启仍上报 0，同时基线已落库
    const last_time = get_last_visit_time()
    const odid = get_odid()
    // 1.0：仅新用户（lvts=0）附带 odid
    if (__STAT_VERSION__ === '1') {
      if (last_time === 0) {
        this.statData.odid = odid
      }
    }
    // 2.0：未处理过设备信息则补发，与是否新用户无关（避免 lvts 基线落库后无法补 odid）
    if (__STAT_VERSION__ === '2') {
      const have_device = is_handle_device()
      if (!have_device) {
        this.statData.odid = odid
      }
    }

    Object.assign(this.statData, {
      lt: '1',
      url: options.path + query || '',
      t: get_time(),
      sc: get_scene(options.scene),
      fvts: get_first_visit_time(),
      lvts: last_time,
      tvc: get_total_visit_count(),
      // create session type  上报类型 ，1 应用进入 2.后台超时进入 3.页面超时进入
      cst: options.cst || 1,
    })
    if (get_platform_name() === 'n') {
      this.getProperty(type)
    } else {
      this.getNetworkInfo(type)
    }
  }

  /**
   * 发送请求,页面维度上报
   * @param {Object} opt
   */
  sendPageRequest(opt) {
    let { url, urlref, urlref_ts } = opt
    this._navigationBarTitle.lt = '11'
    let options = {
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      p: this.statData.p,
      lt: '11',
      ut: this.statData.ut,
      url,
      tt: this.statData.tt,
      urlref,
      urlref_ts,
      ch: this.statData.ch,
      usv: this.statData.usv,
      t: get_time(),
    }
    this.request(options)
  }

  /**
   * 进入后台上报数据
   * @param {Object} opt
   * @param {Object} type
   */
  sendHideRequest(opt, type) {
    let { urlref, urlref_ts } = opt
    let options = {
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      p: this.statData.p,
      lt: '3',
      ut: this.statData.ut,
      urlref,
      urlref_ts,
      ch: this.statData.ch,
      usv: this.statData.usv,
      t: get_time(),
    }
    this.request(options, type)
  }

  /**
   * 自定义事件上报
   */
  sendEventRequest({ key = '', value = '' } = {}) {
    let routepath = ''

    try {
      routepath = get_route()
    } catch (error) {
      const launch_options = dbGet('__launch_options')
      routepath = launch_options.path
    }

    this._navigationBarTitle.config = get_page_name(routepath)
    this._navigationBarTitle.lt = '21'
    let options = {
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      p: this.statData.p,
      lt: '21',
      ut: this.statData.ut,
      url: routepath,
      ch: this.statData.ch,
      e_n: key,
      e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
      usv: this.statData.usv,
      t: get_time(),
    }
    this.request(options)
  }

  sendPushRequest(options, cid) {
    let time = get_time()

    const statData = {
      lt: '101',
      cid: cid,
      t: time,
      ut: this.statData.ut,
    }

    // debug 打印打点信息
    if (is_debug) {
      log(statData)
    }

    const stat_data = handle_data({
      101: [statData],
    })
    let optionsData = {
      usv: STAT_VERSION, //统计 SDK 版本号
      t: time, //发送请求时的时间戮
      requests: stat_data,
    }

    if (__STAT_VERSION__ === '1') {
      if (statData.ut === 'h5') {
        gateSend(optionsData, (payload) => {
          this.imageRequest(payload)
        })
        return
      }
    }

    // XXX 安卓需要延迟上报 ，否则会有未知错误，需要验证处理
    if (get_platform_name() === 'n' && this.statData.p === 'a') {
      setTimeout(() => {
        this.sendRequest(optionsData)
      }, 200)
      return
    }

    this.sendRequest(optionsData)
  }

  /**
   * 获取wgt资源版本
   */
  getProperty(type) {
    plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
      this.statData.v = wgtinfo.version || ''
      this.getNetworkInfo(type)
    })
  }

  /**
   * 获取网络信息
   */
  getNetworkInfo(type) {
    uni.getNetworkType({
      success: (result) => {
        this.statData.net = result.networkType
        this.getLocation(type)
      },
    })
  }

  /**
   * 获取位置信息
   */
  getLocation(type) {
    if (stat_config.getLocation) {
      uni.getLocation({
        type: 'wgs84',
        geocode: true,
        success: (result) => {
          if (result.address) {
            this.statData.cn = result.address.country
            this.statData.pn = result.address.province
            this.statData.ct = result.address.city
          }

          this.statData.lat = result.latitude
          this.statData.lng = result.longitude
          this.request(this.statData, type)
        },
      })
    } else {
      this.statData.lat = 0
      this.statData.lng = 0
      this.request(this.statData, type)
    }
  }

  /**
   * 发送请求
   * @param {Object} data 上报数据
   * @param {Object} type 类型
   */
  request(data, type) {
    let time = get_time()
    const title = this._navigationBarTitle
    Object.assign(data, {
      ttn: title.page,
      ttpj: title.config,
      ttc: title.report,
    })

    let uniStatData = dbGet('__UNI__STAT__DATA') || {}
    if (!uniStatData[data.lt]) {
      uniStatData[data.lt] = []
    }
    // 加入队列
    uniStatData[data.lt].push(data)
    dbSet('__UNI__STAT__DATA', uniStatData)

    let page_residence_time = get_page_residence_time()
    // debug 打印打点信息
    if (is_debug) {
      log(data)
    }
    // 判断时候到达上报时间 ，默认 10 秒上报
    if (page_residence_time < eport_Interval && !type) return

    // 时间超过，重新获取时间戳
    set_page_residence_time()
    const stat_data = handle_data(uniStatData)
    let optionsData = {
      usv: STAT_VERSION, //统计 SDK 版本号
      t: time, //发送请求时的时间戮
      requests: stat_data,
    }

    // 重置队列
    dbRemove('__UNI__STAT__DATA')

    if (__STAT_VERSION__ === '1') {
      if (data.ut === 'h5') {
        // H5 1.0 同样走网络门闸，无网挂起
        gateSend(optionsData, (payload) => {
          this.imageRequest(payload)
        })
        return
      }
    }

    // XXX 安卓需要延迟上报 ，否则会有未知错误，需要验证处理
    if (get_platform_name() === 'n' && this.statData.p === 'a') {
      setTimeout(() => {
        this.sendRequest(optionsData)
      }, 200)
      return
    }

    this.sendRequest(optionsData)
  }

  getIsReportData() {
    return is_report_data()
  }

  /**
   * 数据上报入口：经私有版网络门闸后，再进入 1.0 HTTP / 2.0 云函数发送。
   * @param {Object} optionsData 需要上报的数据
   */
  sendRequest(optionsData) {
    if (__STAT_VERSION__ === '1') {
      gateSend(optionsData, (payload) => {
        this.dispatchSendRequestV1(payload)
      })
      return
    }
    if (__STAT_VERSION__ === '2') {
      gateSend(optionsData, (payload) => {
        this.dispatchSendRequestV2(payload)
      })
    }
  }

  /**
   * uni统计 1.0 实际 HTTP 发送（不含网络门闸）。
   * @param {Object} optionsData
   */
  dispatchSendRequestV1(optionsData) {
    this.getIsReportData().then(() => {
      const wire = toWirePayload(optionsData)
      const retry = optionsData._httpRetry || 0
      uni.request({
        url: STAT_URL,
        method: 'POST',
        data: wire,
        success: () => {
          optionsData._httpRetry = 0
          ackPending(optionsData)
          if (is_debug) {
            log(optionsData, true)
          }
        },
        fail: (e) => {
          if (retry + 1 < 3) {
            optionsData._httpRetry = retry + 1
            if (is_debug) {
              console.warn('=== 统计上报错误，尝试重新上报！')
              console.error(e)
            }
            setTimeout(() => {
              this.dispatchSendRequestV1(optionsData)
            }, 1000)
          } else {
            optionsData._httpRetry = 0
            // 快重试耗尽后持久化，待网络恢复 / 冷启再发
            persistPending(optionsData)
            if (is_debug) {
              console.warn('=== uni统计1.0 上报失败，已转入待发队列 ===')
              console.error(e)
            }
          }
        },
      })
    })
  }

  /**
   * uni统计 2.0 实际云函数发送（不含网络门闸）。
   * 未关联服务空间视为统计不可用，不做挂起兜底。
   * @param {Object} optionsData
   */
  dispatchSendRequestV2(optionsData) {
    if (!uni.__stat_uniCloud_space) {
      console.error(
        '应用未关联服务空间，统计上报失败，请在uniCloud目录右键关联服务空间.'
      )
      return
    }

    const uniCloudObj = uni.__stat_uniCloud_space.importObject(
      'uni-stat-receiver',
      {
        customUI: true,
      }
    )
    const wire = toWirePayload(optionsData)
    uniCloudObj
      .report(wire)
      .then(() => {
        ackPending(optionsData)
        if (is_debug) {
          log(optionsData, true)
        }
      })
      .catch((err) => {
        persistPending(optionsData)
        if (is_debug) {
          console.warn('=== uni统计2.0 上报错误，已转入待发队列 ===')
          console.error(err)
        }
      })
  }

  /**
   * h5 1.0 图片通道请求（由门闸放行后调用）。
   */
  imageRequest(data) {
    this.getIsReportData().then(() => {
      let image = new Image()
      let options = get_sgin(get_encodeURIComponent_options(toWirePayload(data))).options
      image.src = STAT_H5_URL + '?' + options
      // 图片通道无法可靠感知失败，发送即 best-effort ack
      ackPending(data)
      if (is_debug) {
        log(data, true)
      }
    })
  }

  sendEvent(key, value) {
    // 校验 type 参数
    if (calibration(key, value)) return

    if (key === 'title') {
      this._navigationBarTitle.report = value
      return
    }
    this.sendEventRequest(
      {
        key,
        value: typeof value === 'object' ? JSON.stringify(value) : value,
      },
      1
    )
  }
}
