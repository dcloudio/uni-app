import { sys } from './util.js'

import { DIFF_TIME, STAT_URL, STAT_VERSION } from '../config.ts'
import {
	dbGet,
	dbSet,
} from './db.js'
// 获取 manifest.json 中统计配置
const uniStatisticsConfig = process.env.UNI_STATISTICS_CONFIG
let statConfig = {
  appid: process.env.UNI_APP_ID,
}
let titleJsons = {}
let debug = !!process.env.UNI_STAT_DEBUG || false
// #ifdef VUE3
titleJsons = process.env.UNI_STAT_TITLE_JSON
// #endif

// #ifndef VUE3

// eslint-disable-next-line no-restricted-globals
const pagesTitle = require('uni-pages?{"type":"style"}').default
let pagesData = pagesTitle.pages
for (let i in pagesData) {
  const style = pagesData[i]
  const titleText =
    // MP
    style.navigationBarTitleText ||
    // ali
    style.defaultTitle ||
    // H5 || App
    style.navigationBar?.titleText ||
    ''
  if (titleText) {
    titleJsons[i] = titleText
  }
}
// #endif

// TODO 在云函数中获取，暂时注释
const UUID_KEY = '__DC_STAT_UUID'
const UUID_VALUE = '__DC_UUID_VALUE'
function getUuid() {
  let uuid = ''
  if (get_platform_name() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId()
    } catch (e) {
      uuid = ''
    }
    return uuid
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY)
  } catch (e) {
    uuid = UUID_VALUE
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7)
    try {
      uni.setStorageSync(UUID_KEY, uuid)
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE)
    }
  }
  return uuid
}

export const get_uuid = (statData) => {
  // 有可能不存在 deviceId（一般不存在就是出bug了），就自己生成一个
  return sys.deviceId || getUuid()
}

/**
 * 获取老版的 deviceid ,兼容以前的错误 deviceid
 * @param {*} statData 
 * @returns 
 */
export const get_odid = (statData) => {
  let odid  = ''
  if (get_platform_name() === 'n') {
    try {
      odid = plus.device.uuid
    } catch (e) {
      odid = ''
    }
    return odid
  }
  return sys.deviceId || getUuid()
}

/**
 * 获取配置信息 如 appid
 */
export const stat_config = statConfig

export const get_sgin = (statData) => {
  let arr = Object.keys(statData)
  let sortArr = arr.sort()
  let sgin = {}
  let sginStr = ''
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]]
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&'
  }

  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1),
  }
}

export const get_encodeURIComponent_options = (statData) => {
  let data = {}
  for (let prop in statData) {
    data[prop] = encodeURIComponent(statData[prop])
  }
  return data
}

/**
 * 获取当前平台
 * 移动端  : 'n',
 * h5	  : 'h5',
 * 微信	  : 'wx',
 * 阿里	  : 'ali',
 * 百度	  : 'bd',
 * 头条	  : 'tt',
 * qq	  : 'qq',
 * 快应用  : 'qn',
 * 快手	  : 'ks',
 * 飞书	  : 'lark',
 * 快应用  : 'qw',
 * 钉钉	  : 'dt'
 */
export const get_platform_name = () => {
  // 苹果审核代码中禁止出现 alipay 字样 ，需要特殊处理一下
  const aliArr = ['y', 'a', 'p', 'mp-ali']
  const platformList = {
    app: 'n',
    'app-plus': 'n',
    'app-harmony':'n',
    'mp-harmony':'mhm',
    h5: 'h5',
    'mp-weixin': 'wx',
    [aliArr.reverse().join('')]: 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq',
    'quickapp-native': 'qn',
    'mp-kuaishou': 'ks',
    'mp-lark': 'lark',
    'quickapp-webview': 'qw',
  }
  if (platformList[process.env.VUE_APP_PLATFORM] === 'ali') {
    if (my && my.env) {
      const clientName = my.env.clientName
      if (clientName === 'ap') return 'ali'
      if (clientName === 'dingtalk') return 'dt'
      // TODO 缺少 ali 下的其他平台
    }
  }
  return platformList[process.env.VUE_APP_PLATFORM]
}

/**
 * 获取小程序 appid
 */
export const get_pack_name = () => {
  let packName = ''
  if (get_platform_name() === 'wx' || get_platform_name() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || ''
    }
  }
  if (get_platform_name() === 'n') {
    // TODO APP 获取包名
  }
  return packName
}

/**
 * 应用版本
 */
export const get_version = () => {
  return get_platform_name() === 'n' ? plus.runtime.version : ''
}

/**
 * 获取渠道
 */
export const get_channel = () => {
  const platformName = get_platform_name()
  let channel = ''
  if (platformName === 'n') {
    channel = plus.runtime.channel
  }
  if (platformName === 'wx') {
    // TODO 需要调研小程序二维码渠道如何获取;
  }
  return channel
}

/**
 * 获取小程序场景值
 * @param {Object} options 页面信息
 */
export const get_scene = (options) => {
  const platformName = get_platform_name()
  let scene = ''
  if (options) {
    return options
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene
  }
  return scene
}

/**
 * 获取拼接参数
 */
export const get_splicing = (data) => {
  let str = ''
  for (var i in data) {
    str += i + '=' + data[i] + '&'
  }
  return str.substr(0, str.length - 1)
}

/**
 * 获取页面url，不包含参数
 */
export const get_route = (pageVm) => {
  let _self = pageVm || get_page_vm()
  if (get_platform_name() === 'bd') {
    let mp_route = _self.$mp && _self.$mp.page && _self.$mp.page.is
    let scope_route = _self.$scope && _self.$scope.is
    return mp_route || scope_route || ''
  } else {
    return (
      _self.route ||
      (_self.$scope && _self.$scope.route) ||
      (_self.$mp && _self.$mp.page.route)
    )
  }
}

/**
 * 获取页面url, 包含参数
 */
export const get_page_route = (pageVm) => {
  // 从 app 进入应用 ，没有 $page ,获取不到路由 ，需要获取页面 尝试从 getCurrentPages 获取也页面实例
  // FIXME 尽量不使用 getCurrentPages ，大部分获取路由是从 onHide 获取 ，这时可以获取到，如果是 onload ,则可能获取不到，比如 百度

  let page = pageVm && (pageVm.$page || (pageVm.$scope && pageVm.$scope.$page))
  let lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE')
  if (!page) return lastPageRoute || ''
  // 如果找不到 fullPath 就取 route 的值
  return page.fullPath === '/' ? page.route : page.fullPath || page.route
}

/**
 * 获取页面实例
 */
export const get_page_vm = () => {
  let pages = getCurrentPages()
  let $page = pages[pages.length - 1]
  if (!$page) return null
  return $page.$vm
}

/**
 * 获取页面类型
 */
export const get_page_types = (self) => {
  // XXX 百度有问题 ，获取的都是 componet ,等待修复
  if (
    self.mpType === 'page' ||
    self.$mpType === 'page' ||
    (self.$mp && self.$mp.mpType === 'page') ||
    self.$options.mpType === 'page'
  ) {
    return 'page'
  }
  if (
    self.mpType === 'app' ||
    self.$mpType === 'app' ||
    (self.$mp && self.$mp.mpType === 'app') ||
    self.$options.mpType === 'app'
  ) {
    return 'app'
  }
  return null
}

/**
 * 处理上报参数
 * @param {Object}  需要处理的数据
 */
export const handle_data = (statData) => {
  let firstArr = []
  let contentArr = []
  let lastArr = []
  for (let i in statData) {
    const rd = statData[i]
    rd.forEach((elm) => {
      let newData = ''
      if (__STAT_VERSION__ === '1') {
        newData = get_splicing(elm)
      }
      if (__STAT_VERSION__ === '2') {
        newData = elm
      }
      if (i === 0) {
        firstArr.push(newData)
      } else if (i === 3) {
        lastArr.push(newData)
      } else {
        contentArr.push(newData)
      }
    })
  }

  firstArr.push(...contentArr, ...lastArr)
  // 参数需要处理成字符串，方便上传
  return JSON.stringify(firstArr)
}

/**
 * 自定义事件参数校验
 */
export const calibration = (eventName, options) => {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error(`uni.report Missing [eventName] parameter`)
    return true
  }
  if (typeof eventName !== 'string') {
    console.error(
      `uni.report [eventName] Parameter type error, it can only be of type String`
    )
    return true
  }
  if (eventName.length > 255) {
    console.error(
      `uni.report [eventName] Parameter length cannot be greater than 255`
    )
    return true
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error(
      'uni.report [options] Parameter type error, Only supports String or Object type'
    )
    return true
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error(
      `uni.report [options] Parameter length cannot be greater than 255`
    )
    return true
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error(
      `uni.report [eventName] When the parameter is title, the [options] parameter can only be of type String`
    )
    return true
  }
}

export const get_page_name = (routepath) => {
  return (titleJsons && titleJsons[routepath]) || ''
}

const Report_Data_Time = 'Report_Data_Time'
const Report_Status = 'Report_Status'
export const is_report_data = () => {
  return new Promise((resolve, reject) => {
    let start_time = ''
    let end_time = new Date().getTime()
    let diff_time = DIFF_TIME
    let report_status = 1
    try {
      start_time = uni.getStorageSync(Report_Data_Time)
      report_status = uni.getStorageSync(Report_Status)
    } catch (e) {
      start_time = ''
      report_status = 1
    }

    if (report_status === '') {
      requestData(({ enable }) => {
        uni.setStorageSync(Report_Data_Time, end_time)
        uni.setStorageSync(Report_Status, enable)
        if (enable === 1) {
          resolve()
        }
      })
      return
    }

    if (report_status === 1) {
      resolve()
    }

    if (!start_time) {
      uni.setStorageSync(Report_Data_Time, end_time)
      start_time = end_time
    }

    if (end_time - start_time > diff_time) {
      requestData(({ enable }) => {
        uni.setStorageSync(Report_Data_Time, end_time)
        uni.setStorageSync(Report_Status, enable)
      })
    }
  })
}

const requestData = (done) => {
  const appid = process.env.UNI_APP_ID
  let formData = {
    usv: STAT_VERSION,
    conf: JSON.stringify({
      ak: appid,
    }),
  }
  uni.request({
    url: STAT_URL,
    method: 'GET',
    data: formData,
    success: (res) => {
      const { data } = res
      if (data.ret === 0) {
        typeof done === 'function' &&
          done({
            enable: data.enable,
          })
      }
    },
    fail: (e) => {
      let report_status_code = 1
      try {
        report_status_code = uni.getStorageSync(Report_Status)
      } catch (e) {
        report_status_code = 1
      }
      if (report_status_code === '') {
        report_status_code = 1
      }
      typeof done === 'function' &&
        done({
          enable: report_status_code,
        })
    },
  })
}

/**
 * 获取uniCloud服务空间配置
 * @returns {Object}
 */
export const uni_cloud_config = () => {
  return process.env.UNI_STAT_UNI_CLOUD || {}
}

/**
 * 获取服务空间
 * @param {*} config
 * @returns
 */
export const get_space = (config) => {
  const uniCloudConfig = uni_cloud_config()
  const { spaceId, provider, clientSecret ,secretKey,secretId} = uniCloudConfig
  const space_type = ['tcb', 'tencent', 'aliyun','alipay','private','dcloud']
  const is_provider = space_type.indexOf(provider) !== -1
  const is_aliyun = provider === 'aliyun' && spaceId && clientSecret
  const is_tcb = (provider === 'tcb' || provider === 'tencent') && spaceId
  const is_alipay = provider === 'alipay' && spaceId && secretKey && secretId

  const is_private = provider === 'private' && spaceId && clientSecret
  const is_dcloud = provider === 'dcloud' && spaceId && clientSecret

  if (is_provider && (is_aliyun || is_tcb || is_alipay || is_private || is_dcloud)) {
    return uniCloudConfig
  } else {
    if (config && config.spaceId) {
      return config
    }
  }

  return null
}

/**
 * 是否开启 debug 模式
 */
export const is_debug = debug

/**
 * 日志输出
 * @param {*} data
 */
export const log = (data, type) => {
  let msg_type = ''
  switch (data.lt) {
    case '1':
      msg_type = '应用启动'
      break
    case '3':
      msg_type = '应用进入后台'
      break

    case '11':
      msg_type = '页面切换'
      break
    case '21':
      msg_type = '事件触发'
      break
    case '31':
      msg_type = '应用错误'
      break
    case '101':
      msg_type = 'PUSH'
      break
  }

  // #ifdef APP
  // 在 app 中，日志转为 字符串
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  // #endif

  if (type) {
    console.log(`=== 统计队列数据上报 ===`)
    console.log(data)
    console.log(`=== 上报结束 ===`)
    return
  }

  if (msg_type) {
    console.log(`=== 统计数据采集：${msg_type} ===`)
    console.log(data)
    console.log(`=== 采集结束 ===`)
  }
}

/**
 * 获取上报时间间隔
 * @param {*} defaultTime 默认上报间隔时间 单位s
 */
export const get_report_Interval = (defaultTime) => {
  let time = uniStatisticsConfig.reportInterval
  // 如果上报时间配置为0 相当于立即上报
  if (Number(time) === 0) return 0
  time = time || defaultTime
  let reg = /(^[1-9]\d*$)/
  // 如果不是整数，则默认为上报间隔时间
  if (!reg.test(time)) return defaultTime
  return Number(time)
}

/**
 * 获取隐私协议配置
 */
export const is_push_clientid = () => {
  if (uniStatisticsConfig.collectItems) {
    const ClientID = uniStatisticsConfig.collectItems.uniPushClientID
    return typeof ClientID === 'boolean' ? ClientID : false
  }
  return false
}

/**
 * 是否上报页面数据
 * @returns 
 */
export const is_page_report = ()=>{
  if(uniStatisticsConfig.collectItems){
    const statPageLog = uniStatisticsConfig.collectItems.uniStatPageLog
    // 如果字段不存在返回 true , 如果是boolean 值按原值返回，如果是其他类型 返回false
    if(statPageLog === undefined) return true
    return typeof statPageLog === 'boolean' ? statPageLog : true
  }
  return true
}

/**
 * 是否已处理设备 DeviceId
 * 如果值为 1 则表示已处理
 */
const IS_HANDLE_DEVECE_ID = 'is_handle_device_id'
export const is_handle_device = () => {
  let isHandleDevice = dbGet(IS_HANDLE_DEVECE_ID) || ''
	dbSet(IS_HANDLE_DEVECE_ID, '1')
  return isHandleDevice === '1'
}