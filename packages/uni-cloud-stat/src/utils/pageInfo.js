import pagesTitle from 'uni-pages?{"type":"style"}'
let pagesData = pagesTitle.pages
let titleJsons = {}
for (let i in pagesData) {
  titleJsons[i] = pagesData[i].navigationBarTitleText || ''
}

import {
  sys
} from './util.js'


import {
  STAT_URL,
  STAT_VERSION,
  DIFF_TIME
} from '../config.js';

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
    'app': 'n',
    'app-plus': 'n',
    h5: 'h5',
    'mp-weixin': 'wx',
    [aliArr.reverse().join('')]: 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq',
    'quickapp-native': 'qn',
    'mp-kuaishou': 'ks',
    'mp-lark': 'lark',
    'quickapp-webview': 'qw'
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
  let _self = pageVm || get_page_vm();
  if (get_platform_name() === 'bd') {
    let mp_route = _self.$mp && _self.$mp.page && _self.$mp.page.is;
    let scope_route = _self.$scope && _self.$scope.is;
    return mp_route || scope_route || ''
  } else {
    return _self.route || (_self.$scope && _self.$scope.route) || (_self.$mp && _self.$mp.page.route)
  }
};

/**
 * 获取页面url, 包含参数
 */
export const get_page_route = (pageVm) => {
  // 从 app 进入应用 ，没有 $page ,获取不到路由 ，需要获取页面 尝试从 getCurrentPages 获取也页面实例
  // FIXME 尽量不使用 getCurrentPages ，大部分获取路由是从 onHide 获取 ，这时可以获取到，如果是 onload ,则可能获取不到，比如 百度

  let page = pageVm.$page || (pageVm.$scope && pageVm.$scope.$page)
  let lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE');
  if (!page) return lastPageRoute || ''
  return page.fullPath === '/' ? page.route : page.fullPath
};

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
  if (self.mpType === 'page' || self.$mpType === 'page' || (self.$mp && self.$mp.mpType === 'page') || self
    .$options.mpType === 'page') {
    return 'page';
  }
  if (self.mpType === 'app' || self.$mpType === 'app' || (self.$mp && self.$mp.mpType === 'app') || self.$options
    .mpType === 'app') {
    return 'app'
  }
  return null;
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
      const newData = get_splicing(elm)
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
    console.error(`uni.report Missing [eventName] parameter`);
    return true
  }
  if (typeof eventName !== 'string') {
    console.error(`uni.report [eventName] Parameter type error, it can only be of type String`);
    return true
  }
  if (eventName.length > 255) {
    console.error(`uni.report [eventName] Parameter length cannot be greater than 255`);
    return true
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error('uni.report [options] Parameter type error, Only supports String or Object type');
    return true
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error(`uni.report [options] Parameter length cannot be greater than 255`);
    return true
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error(
      `uni.report [eventName] When the parameter is title, the [options] parameter can only be of type String`
    );
    return true
  }
}

export const get_page_name = (routepath) => {
  return (titleJsons && titleJsons[routepath]) || ''
}
