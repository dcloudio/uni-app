'use strict';

/**
 * 获取系统信息
 */
const sys = uni.getSystemInfoSync();

// 访问开始即启动小程序，访问结束结分为：进入后台超过5min、在前台无任何操作超过30min、在新的来源打开小程序；
const STAT_VERSION = process.env.UNI_COMPILER_VERSION;
const STAT_URL = 'https://tongji.dcloud.io/uni/stat';
const STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
const PAGE_PVER_TIME = 1800; // 页面在前台无操作结束访问时间 单位s
const APP_PVER_TIME = 300; // 应用在后台结束访问时间 单位s
const OPERATING_TIME = 10; // 数据上报时间 单位s
const DIFF_TIME = 60 * 1000 * 60 * 24;

const appid = process.env.UNI_APP_ID; // 做应用隔离
const dbSet = (name, value) => {
  let data = uni.getStorageSync('$$STAT__DBDATA:'+appid) || {};

  if (!data) {
    data = {};
  }
  data[name] = value;
  uni.setStorageSync('$$STAT__DBDATA:'+appid, data);
};

const dbGet = (name) => {
  let data = uni.getStorageSync('$$STAT__DBDATA:'+appid) || {};
  if (!data[name]) {
    let dbdata = uni.getStorageSync('$$STAT__DBDATA:'+appid);
    if (!dbdata) {
      dbdata = {};
    }
    if (!dbdata[name]) {
      return undefined
    }
    data[name] = dbdata[name];
  }
  return data[name]
};

const dbRemove = (name) => {
  let data = uni.getStorageSync('$$STAT__DBDATA:'+appid) || {};
  if (data[name]) {
    delete data[name];
    uni.setStorageSync('$$STAT__DBDATA:'+appid, data);
  } else {
    data = uni.getStorageSync('$$STAT__DBDATA:'+appid);
    if (data[name]) {
      delete data[name];
      uni.setStorageSync('$$STAT__DBDATA:'+appid, data);
    }
  }
};

// 获取 manifest.json 中统计配置
const uniStatisticsConfig = process.env.UNI_STATISTICS_CONFIG;
let statConfig = {
  appid: process.env.UNI_APP_ID,
};
let titleJsons = {};
let debug = !!process.env.UNI_STAT_DEBUG || false;
// #ifdef VUE3
titleJsons = process.env.UNI_STAT_TITLE_JSON;
// #endif

// #ifndef VUE3

// eslint-disable-next-line no-restricted-globals
const pagesTitle = require('uni-pages?{"type":"style"}').default;
let pagesData = pagesTitle.pages;
for (let i in pagesData) {
  const style = pagesData[i];
  const titleText =
    // MP
    style.navigationBarTitleText ||
    // ali
    style.defaultTitle ||
    // H5 || App
    style.navigationBar?.titleText ||
    '';
  if (titleText) {
    titleJsons[i] = titleText;
  }
}
// #endif

// TODO 在云函数中获取，暂时注释
const UUID_KEY = '__DC_STAT_UUID';
const UUID_VALUE = '__DC_UUID_VALUE';
function getUuid() {
  let uuid = '';
  if (get_platform_name() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid
}

const get_uuid = (statData) => {
  // 有可能不存在 deviceId（一般不存在就是出bug了），就自己生成一个
  return sys.deviceId || getUuid()
};

/**
 * 获取老版的 deviceid ,兼容以前的错误 deviceid
 * @param {*} statData 
 * @returns 
 */
const get_odid = (statData) => {
  let odid  = '';
  if (get_platform_name() === 'n') {
    try {
      odid = plus.device.uuid;
    } catch (e) {
      odid = '';
    }
    return odid
  }
  return sys.deviceId || getUuid()
};

/**
 * 获取配置信息 如 appid
 */
const stat_config = statConfig;

const get_sgin = (statData) => {
  let arr = Object.keys(statData);
  let sortArr = arr.sort();
  let sgin = {};
  let sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }

  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1),
  }
};

const get_encodeURIComponent_options = (statData) => {
  let data = {};
  for (let prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data
};

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
const get_platform_name = () => {
  // 苹果审核代码中禁止出现 alipay 字样 ，需要特殊处理一下
  const aliArr = ['y', 'a', 'p', 'mp-ali'];
  const platformList = {
    app: 'n',
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
    'quickapp-webview': 'qw',
  };
  if (platformList[process.env.VUE_APP_PLATFORM] === 'ali') {
    if (my && my.env) {
      const clientName = my.env.clientName;
      if (clientName === 'ap') return 'ali'
      if (clientName === 'dingtalk') return 'dt'
      // TODO 缺少 ali 下的其他平台
    }
  }
  return platformList[process.env.VUE_APP_PLATFORM]
};

/**
 * 获取小程序 appid
 */
const get_pack_name = () => {
  let packName = '';
  if (get_platform_name() === 'wx' || get_platform_name() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  if (get_platform_name() === 'n') ;
  return packName
};

/**
 * 应用版本
 */
const get_version = () => {
  return get_platform_name() === 'n' ? plus.runtime.version : ''
};

/**
 * 获取渠道
 */
const get_channel = () => {
  const platformName = get_platform_name();
  let channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel
};

/**
 * 获取小程序场景值
 * @param {Object} options 页面信息
 */
const get_scene = (options) => {
  const platformName = get_platform_name();
  let scene = '';
  if (options) {
    return options
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene
};

/**
 * 获取页面url，不包含参数
 */
const get_route$1 = (pageVm) => {
  let _self = pageVm || get_page_vm();
  if (get_platform_name() === 'bd') {
    let mp_route = _self.$mp && _self.$mp.page && _self.$mp.page.is;
    let scope_route = _self.$scope && _self.$scope.is;
    return mp_route || scope_route || ''
  } else {
    return (
      _self.route ||
      (_self.$scope && _self.$scope.route) ||
      (_self.$mp && _self.$mp.page.route)
    )
  }
};

/**
 * 获取页面url, 包含参数
 */
const get_page_route = (pageVm) => {
  // 从 app 进入应用 ，没有 $page ,获取不到路由 ，需要获取页面 尝试从 getCurrentPages 获取也页面实例
  // FIXME 尽量不使用 getCurrentPages ，大部分获取路由是从 onHide 获取 ，这时可以获取到，如果是 onload ,则可能获取不到，比如 百度

  let page = pageVm && (pageVm.$page || (pageVm.$scope && pageVm.$scope.$page));
  let lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE');
  if (!page) return lastPageRoute || ''
  // 如果找不到 fullPath 就取 route 的值
  return page.fullPath === '/' ? page.route : page.fullPath || page.route
};

/**
 * 获取页面实例
 */
const get_page_vm = () => {
  let pages = getCurrentPages();
  let $page = pages[pages.length - 1];
  if (!$page) return null
  return $page.$vm
};

/**
 * 获取页面类型
 */
const get_page_types = (self) => {
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
};

/**
 * 处理上报参数
 * @param {Object}  需要处理的数据
 */
const handle_data = (statData) => {
  let firstArr = [];
  let contentArr = [];
  let lastArr = [];
  for (let i in statData) {
    const rd = statData[i];
    rd.forEach((elm) => {
      let newData = '';
      {
        newData = elm;
      }
      if (i === 0) {
        firstArr.push(newData);
      } else if (i === 3) {
        lastArr.push(newData);
      } else {
        contentArr.push(newData);
      }
    });
  }

  firstArr.push(...contentArr, ...lastArr);
  // 参数需要处理成字符串，方便上传
  return JSON.stringify(firstArr)
};

/**
 * 自定义事件参数校验
 */
const calibration = (eventName, options) => {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error(`uni.report Missing [eventName] parameter`);
    return true
  }
  if (typeof eventName !== 'string') {
    console.error(
      `uni.report [eventName] Parameter type error, it can only be of type String`
    );
    return true
  }
  if (eventName.length > 255) {
    console.error(
      `uni.report [eventName] Parameter length cannot be greater than 255`
    );
    return true
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error(
      'uni.report [options] Parameter type error, Only supports String or Object type'
    );
    return true
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error(
      `uni.report [options] Parameter length cannot be greater than 255`
    );
    return true
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error(
      `uni.report [eventName] When the parameter is title, the [options] parameter can only be of type String`
    );
    return true
  }
};

const get_page_name = (routepath) => {
  return (titleJsons && titleJsons[routepath]) || ''
};

const Report_Data_Time = 'Report_Data_Time';
const Report_Status = 'Report_Status';
const is_report_data = () => {
  return new Promise((resolve, reject) => {
    let start_time = '';
    let end_time = new Date().getTime();
    let diff_time = DIFF_TIME;
    let report_status = 1;
    try {
      start_time = uni.getStorageSync(Report_Data_Time);
      report_status = uni.getStorageSync(Report_Status);
    } catch (e) {
      start_time = '';
      report_status = 1;
    }

    if (report_status === '') {
      requestData(({ enable }) => {
        uni.setStorageSync(Report_Data_Time, end_time);
        uni.setStorageSync(Report_Status, enable);
        if (enable === 1) {
          resolve();
        }
      });
      return
    }

    if (report_status === 1) {
      resolve();
    }

    if (!start_time) {
      uni.setStorageSync(Report_Data_Time, end_time);
      start_time = end_time;
    }

    if (end_time - start_time > diff_time) {
      requestData(({ enable }) => {
        uni.setStorageSync(Report_Data_Time, end_time);
        uni.setStorageSync(Report_Status, enable);
      });
    }
  })
};

const requestData = (done) => {
  const appid = process.env.UNI_APP_ID;
  let formData = {
    usv: STAT_VERSION,
    conf: JSON.stringify({
      ak: appid,
    }),
  };
  uni.request({
    url: STAT_URL,
    method: 'GET',
    data: formData,
    success: (res) => {
      const { data } = res;
      if (data.ret === 0) {
        typeof done === 'function' &&
          done({
            enable: data.enable,
          });
      }
    },
    fail: (e) => {
      let report_status_code = 1;
      try {
        report_status_code = uni.getStorageSync(Report_Status);
      } catch (e) {
        report_status_code = 1;
      }
      if (report_status_code === '') {
        report_status_code = 1;
      }
      typeof done === 'function' &&
        done({
          enable: report_status_code,
        });
    },
  });
};

/**
 * 获取uniCloud服务空间配置
 * @returns {Object}
 */
const uni_cloud_config = () => {
  return process.env.UNI_STAT_UNI_CLOUD || {}
};

/**
 * 获取服务空间
 * @param {*} config
 * @returns
 */
const get_space = (config) => {
  const uniCloudConfig = uni_cloud_config();
  const { spaceId, provider, clientSecret ,secretKey,secretId} = uniCloudConfig;
  const space_type = ['tcb', 'tencent', 'aliyun','alipay'];
  const is_provider = space_type.indexOf(provider) !== -1;
  const is_aliyun = provider === 'aliyun' && spaceId && clientSecret;
  const is_tcb = (provider === 'tcb' || provider === 'tencent') && spaceId;
  const is_alipay = provider === 'alipay' && spaceId && secretKey && secretId;

  if (is_provider && (is_aliyun || is_tcb || is_alipay)) {
    return uniCloudConfig
  } else {
    if (config && config.spaceId) {
      return config
    }
  }

  return null
};

/**
 * 是否开启 debug 模式
 */
const is_debug = debug;

/**
 * 日志输出
 * @param {*} data
 */
const log = (data, type) => {
  let msg_type = '';
  switch (data.lt) {
    case '1':
      msg_type = '应用启动';
      break
    case '3':
      msg_type = '应用进入后台';
      break

    case '11':
      msg_type = '页面切换';
      break
    case '21':
      msg_type = '事件触发';
      break
    case '31':
      msg_type = '应用错误';
      break
    case '101':
      msg_type = 'PUSH';
      break
  }

  // #ifdef APP
  // 在 app 中，日志转为 字符串
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }
  // #endif

  if (type) {
    console.log(`=== 统计队列数据上报 ===`);
    console.log(data);
    console.log(`=== 上报结束 ===`);
    return
  }

  if (msg_type) {
    console.log(`=== 统计数据采集：${msg_type} ===`);
    console.log(data);
    console.log(`=== 采集结束 ===`);
  }
};

/**
 * 获取上报时间间隔
 * @param {*} defaultTime 默认上报间隔时间 单位s
 */
const get_report_Interval = (defaultTime) => {
  let time = uniStatisticsConfig.reportInterval;
  // 如果上报时间配置为0 相当于立即上报
  if (Number(time) === 0) return 0
  time = time || defaultTime;
  let reg = /(^[1-9]\d*$)/;
  // 如果不是整数，则默认为上报间隔时间
  if (!reg.test(time)) return defaultTime
  return Number(time)
};

/**
 * 获取隐私协议配置
 */
const is_push_clientid = () => {
  if (uniStatisticsConfig.collectItems) {
    const ClientID = uniStatisticsConfig.collectItems.uniPushClientID;
    return typeof ClientID === 'boolean' ? ClientID : false
  }
  return false
};

/**
 * 是否上报页面数据
 * @returns 
 */
const is_page_report = ()=>{
  if(uniStatisticsConfig.collectItems){
    const statPageLog = uniStatisticsConfig.collectItems.uniStatPageLog;
    // 如果字段不存在返回 true , 如果是boolean 值按原值返回，如果是其他类型 返回false
    if(statPageLog === undefined) return true
    return typeof statPageLog === 'boolean' ? statPageLog : true
  }
  return true
};

/**
 * 是否已处理设备 DeviceId
 * 如果值为 1 则表示已处理
 */
const IS_HANDLE_DEVECE_ID = 'is_handle_device_id';
const is_handle_device = () => {
  let isHandleDevice = dbGet(IS_HANDLE_DEVECE_ID) || '';
	dbSet(IS_HANDLE_DEVECE_ID, '1');
  return isHandleDevice === '1'
};

// 首次访问时间
const FIRST_VISIT_TIME_KEY = '__first__visit__time';
// 最后访问时间
const LAST_VISIT_TIME_KEY = '__last__visit__time';
/**
 * 获取当前时间
 */
const get_time = () => {
	return parseInt(new Date().getTime() / 1000)
};

/**
 * 获取首次访问时间
 */
const get_first_visit_time = () => {
	const timeStorge = dbGet(FIRST_VISIT_TIME_KEY);
	let time = 0;
	if (timeStorge) {
		time = timeStorge;
	} else {
		time = get_time();
		dbSet(FIRST_VISIT_TIME_KEY, time);
		// 首次访问需要 将最后访问时间置 0
		dbRemove(LAST_VISIT_TIME_KEY);
	}
	return time
};

/**
 * 最后访问时间
 */
const get_last_visit_time = () => {
	const timeStorge = dbGet(LAST_VISIT_TIME_KEY);
	let time = 0;
	if (timeStorge) {
		time = timeStorge;
	}
	dbSet(LAST_VISIT_TIME_KEY, get_time());
	return time
};

// 页面停留时间记录key
const PAGE_RESIDENCE_TIME = '__page__residence__time';
let First_Page_Residence_Time = 0;
let Last_Page_Residence_Time = 0;

/**
 * 设置页面停留时间
 */
const set_page_residence_time = () => {
	First_Page_Residence_Time = get_time();
	dbSet(PAGE_RESIDENCE_TIME, First_Page_Residence_Time);
	return First_Page_Residence_Time
};

/**
 * 获取页面停留时间
 */
const get_page_residence_time = () => {
	Last_Page_Residence_Time = get_time();
	First_Page_Residence_Time = dbGet(PAGE_RESIDENCE_TIME);
	return Last_Page_Residence_Time - First_Page_Residence_Time
};

/**
 * 获取总访问次数
 */
const TOTAL_VISIT_COUNT = '__total__visit__count';
const get_total_visit_count = () => {
	const timeStorge = dbGet(TOTAL_VISIT_COUNT);
	let count = 1;
	if (timeStorge) {
		count = timeStorge;
		count++;
	}
	dbSet(TOTAL_VISIT_COUNT, count);
	return count
};


const FIRST_TIME = '__first_time';
/**
 * 设置页面首次访问时间，用户获取页面/应用停留时常
 */
const set_first_time = () => {
	// 获取当前时间 ，以下代码获取到是毫秒级时间戳 ，实际上用到是秒级时间戳，所以需要除以1000
	// const time = new Date().getTime()
	let time = get_time();
	const timeStorge = dbSet(FIRST_TIME,time);
	return timeStorge
};

/**
 * 获取最后一次时间 ，暂时用不到，直接获取当前时间即可
 */
// export const get_last_time = () => {
// 	let time = new Date().getTime()
// 	Set__Last__Time = time
// 	return time
// }

/**
 * 获取页面 \ 应用停留时间
 */
const get_residence_time = (type) => {
	let residenceTime = 0;
	const first_time = dbGet(FIRST_TIME);
	const last_time = get_time();
	if (first_time !== 0) {
		residenceTime = last_time - first_time;
	}
	// 将毫秒级时间戳转换为秒级时间戳，因为直接获取的是秒级时间戳，所以不需要转换
	// residenceTime = parseInt(residenceTime / 1000)
	residenceTime = residenceTime < 1 ? 1 : residenceTime;
	if (type === 'app') {
		let overtime = residenceTime > APP_PVER_TIME ? true : false;
		return {
			residenceTime,
			overtime,
		}
	}
	if (type === 'page') {
		let overtime = residenceTime > PAGE_PVER_TIME ? true : false;
		return {
			residenceTime,
			overtime,
		}
	}
	return {
		residenceTime,
	}
};

const eport_Interval = get_report_Interval(OPERATING_TIME);
// 统计数据默认值
let statData = {
  uuid: get_uuid(), // 设备标识
  ak: stat_config.appid, // uni-app 应用 Appid
  p: sys.platform === 'android' ? 'a' : 'i', // 手机系统
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
  sv: sys.system.replace(/(Android|iOS)\s/, ''), // 手机系统版本
  mpsdk: sys.SDKVersion || '', // x程序 sdk version
  mpv: sys.version || '', // 小程序平台版本 ，如微信、支付宝
  lang: sys.language, // 语言
  pr: sys.pixelRatio, // pixelRatio 设备像素比
  ww: sys.windowWidth, // windowWidth 可使用窗口宽度
  wh: sys.windowHeight, // windowHeight 可使用窗口高度
  sw: sys.screenWidth, // screenWidth 屏幕宽度
  sh: sys.screenHeight, // screenHeight 屏幕高度
};
class Report {
  constructor() {
    // 页面实例
    this.self = '';
    // 进入应用标识
    this.__licationShow = false;
    // 离开应用标识
    this.__licationHide = false;
    // 统计默认值
    this.statData = statData;
    // 标题默认值
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '',
    };

    // 页面参数
    this._query = {};
    // 页面最后停留页面的 url
    // this._lastPageRoute = ''

    // 注册拦截器
    let registerInterceptor = typeof uni.addInterceptor === 'function';
    if (registerInterceptor) {
      this.addInterceptorInit();
      this.interceptLogin();
      this.interceptShare(true);
      this.interceptRequestPayment();
    }
  }

  addInterceptorInit() {
    let self = this;
    uni.addInterceptor('setNavigationBarTitle', {
      invoke(args) {
        self._navigationBarTitle.page = args.title;
      },
    });
  }

  interceptLogin() {
    let self = this;
    uni.addInterceptor('login', {
      complete() {
        self._login();
      },
    });
  }

  interceptShare(type) {
    let self = this;
    if (!type) {
      self._share();
      return
    }
    uni.addInterceptor('share', {
      success() {
        self._share();
      },
      fail() {
        self._share();
      },
    });
  }

  interceptRequestPayment() {
    let self = this;
    uni.addInterceptor('requestPayment', {
      success() {
        self._payment('pay_success');
      },
      fail() {
        self._payment('pay_fail');
      },
    });
  }

  _login() {
    this.sendEventRequest(
      {
        key: 'login',
      },
      0
    );
  }

  _share() {
    this.sendEventRequest(
      {
        key: 'share',
      },
      0
    );
  }
  _payment(key) {
    this.sendEventRequest(
      {
        key,
      },
      0
    );
  }

  /**
   * 进入应用触发
   */
  applicationShow() {
    // 通过 __licationHide 判断保证是进入后台后在次进入应用，避免重复上报数据
    if (this.__licationHide) {
      const time = get_residence_time('app');
      // 需要判断进入后台是否超过时限 ，默认是 30min ，是的话需要执行进入应用的上报
      if (time.overtime) {
        let lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE');
        let options = {
          path: lastPageRoute,
          scene: this.statData.sc,
          cst: 2,
        };
        this.sendReportRequest(options);
      }
      // 状态重置
      this.__licationHide = false;
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
      self = get_page_vm();
    }
    // 进入应用后台保存状态，方便进入前台后判断是否上报应用数据
    this.__licationHide = true;
    const time = get_residence_time();
    const route = get_page_route(self);
    uni.setStorageSync('_STAT_LAST_PAGE_ROUTE', route);
    this.sendHideRequest(
      {
        urlref: route,
        urlref_ts: time.residenceTime,
      },
      type
    );
    // 更新页面首次访问时间
    set_first_time();
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
    };

    const route = get_page_route(self);
    const routepath = get_route$1(self);

    this._navigationBarTitle.config = get_page_name(routepath);
    // 表示应用触发 ，页面切换不触发之后的逻辑
    if (this.__licationShow) {
      // 更新页面首次访问时间
      set_first_time();
      // this._lastPageRoute = route
      uni.setStorageSync('_STAT_LAST_PAGE_ROUTE', route);
      this.__licationShow = false;
      return
    }

    const time = get_residence_time('page');
    // 停留时间
    if (time.overtime) {
      let options = {
        path: route,
        scene: this.statData.sc,
        cst: 3,
      };
      this.sendReportRequest(options);
    }
    // 更新页面首次访问时间
    set_first_time();
  }

  /**
   * 离开页面触发
   */
  pageHide(self) {
    if (!this.__licationHide) {
      const time = get_residence_time('page');
      let route = get_page_route(self);
      let lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE');
      if (!lastPageRoute) {
        lastPageRoute = route;
      }
      uni.setStorageSync('_STAT_LAST_PAGE_ROUTE', route);
      this.sendPageRequest({
        url: route,
        urlref: lastPageRoute,
        urlref_ts: time.residenceTime,
      });
      // this._lastPageRoute = route
      return
    }
  }

  /**
   * 发送请求,应用维度上报
   * @param {Object} options 页面信息
   * @param {Boolean} type 是否立即上报
   */
  sendReportRequest(options, type) {
    this._navigationBarTitle.lt = '1';
    this._navigationBarTitle.config = get_page_name(options.path);
    let is_opt = options.query && JSON.stringify(options.query) !== '{}';
    let query = is_opt ? '?' + JSON.stringify(options.query) : '';
    const last_time = get_last_visit_time();
    // 非老用户
    if(last_time !== 0 || !last_time){
      const odid = get_odid();

      // 2.0 处理规则
      {
        const have_device = is_handle_device();
        // 如果没有上报过设备信息 ，则需要上报设备信息
        if(!have_device) {
          this.statData.odid = odid;
        }
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
      // create session type  上报类型 ，1 应用进入 2.后台30min进入 3.页面30min进入
      cst: options.cst || 1,
    });
    if (get_platform_name() === 'n') {
      this.getProperty(type);
    } else {
      this.getNetworkInfo(type);
    }
  }

  /**
   * 发送请求,页面维度上报
   * @param {Object} opt
   */
  sendPageRequest(opt) {
    let { url, urlref, urlref_ts } = opt;
    this._navigationBarTitle.lt = '11';
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
    };
    this.request(options);
  }

  /**
   * 进入后台上报数据
   * @param {Object} opt
   * @param {Object} type
   */
  sendHideRequest(opt, type) {
    let { urlref, urlref_ts } = opt;
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
    };
    this.request(options, type);
  }

  /**
   * 自定义事件上报
   */
  sendEventRequest({ key = '', value = '' } = {}) {
    let routepath = '';

    try {
      routepath = get_route$1();
    } catch (error) {
      const launch_options = dbGet('__launch_options');
      routepath = launch_options.path;
    }

    this._navigationBarTitle.config = get_page_name(routepath);
    this._navigationBarTitle.lt = '21';
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
    };
    this.request(options);
  }

  sendPushRequest(options, cid) {
    let time = get_time();

    const statData = {
      lt: '101',
      cid: cid,
      t: time,
      ut: this.statData.ut,
    };

    // debug 打印打点信息
    if (is_debug) {
      log(statData);
    }

    const stat_data = handle_data({
      101: [statData],
    });
    let optionsData = {
      usv: STAT_VERSION, //统计 SDK 版本号
      t: time, //发送请求时的时间戮
      requests: stat_data,
    };

    // XXX 安卓需要延迟上报 ，否则会有未知错误，需要验证处理
    if (get_platform_name() === 'n' && this.statData.p === 'a') {
      setTimeout(() => {
        this.sendRequest(optionsData);
      }, 200);
      return
    }

    this.sendRequest(optionsData);
  }

  /**
   * 获取wgt资源版本
   */
  getProperty(type) {
    plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
      this.statData.v = wgtinfo.version || '';
      this.getNetworkInfo(type);
    });
  }

  /**
   * 获取网络信息
   */
  getNetworkInfo(type) {
    uni.getNetworkType({
      success: (result) => {
        this.statData.net = result.networkType;
        this.getLocation(type);
      },
    });
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
            this.statData.cn = result.address.country;
            this.statData.pn = result.address.province;
            this.statData.ct = result.address.city;
          }

          this.statData.lat = result.latitude;
          this.statData.lng = result.longitude;
          this.request(this.statData, type);
        },
      });
    } else {
      this.statData.lat = 0;
      this.statData.lng = 0;
      this.request(this.statData, type);
    }
  }

  /**
   * 发送请求
   * @param {Object} data 上报数据
   * @param {Object} type 类型
   */
  request(data, type) {
    let time = get_time();
    const title = this._navigationBarTitle;
    Object.assign(data, {
      ttn: title.page,
      ttpj: title.config,
      ttc: title.report,
    });

    let uniStatData = dbGet('__UNI__STAT__DATA') || {};
    if (!uniStatData[data.lt]) {
      uniStatData[data.lt] = [];
    }
    // 加入队列
    uniStatData[data.lt].push(data);
    dbSet('__UNI__STAT__DATA', uniStatData);

    let page_residence_time = get_page_residence_time();
    // debug 打印打点信息
    if (is_debug) {
      log(data);
    }
    // 判断时候到达上报时间 ，默认 10 秒上报
    if (page_residence_time < eport_Interval && !type) return

    // 时间超过，重新获取时间戳
    set_page_residence_time();
    const stat_data = handle_data(uniStatData);
    let optionsData = {
      usv: STAT_VERSION, //统计 SDK 版本号
      t: time, //发送请求时的时间戮
      requests: stat_data,
    };

    // 重置队列
    dbRemove('__UNI__STAT__DATA');

    // XXX 安卓需要延迟上报 ，否则会有未知错误，需要验证处理
    if (get_platform_name() === 'n' && this.statData.p === 'a') {
      setTimeout(() => {
        this.sendRequest(optionsData);
      }, 200);
      return
    }

    this.sendRequest(optionsData);
  }

  getIsReportData() {
    return is_report_data()
  }

  /**
   * 数据上报
   * @param {Object} optionsData 需要上报的数据
   */
  sendRequest(optionsData) {
    {
      if (!uni.__stat_uniCloud_space) {
        console.error(
          '应用未关联服务空间，统计上报失败，请在uniCloud目录右键关联服务空间.'
        );
        return
      }

      const uniCloudObj = uni.__stat_uniCloud_space.importObject(
        'uni-stat-receiver',
        {
          customUI: true,
        }
      );
      uniCloudObj
        .report(optionsData)
        .then(() => {
          if (is_debug) {
            log(optionsData, true);
          }
        })
        .catch((err) => {
          if (is_debug) {
            console.warn('=== 统计上报错误');
            console.error(err);
          }
        });
    }
  }

  /**
   * h5 请求
   */
  imageRequest(data) {
    this.getIsReportData().then(() => {
      let image = new Image();
      let options = get_sgin(get_encodeURIComponent_options(data)).options;
      image.src = STAT_H5_URL + '?' + options;
      if (is_debug) {
        log(data, true);
      }
    });
  }

  sendEvent(key, value) {
    // 校验 type 参数
    if (calibration(key, value)) return

    if (key === 'title') {
      this._navigationBarTitle.report = value;
      return
    }
    this.sendEventRequest(
      {
        key,
        value: typeof value === 'object' ? JSON.stringify(value) : value,
      },
      1
    );
  }
}

class Stat extends Report {
  static getInstance() {
    if (!uni.__stat_instance) {
      uni.__stat_instance = new Stat();
    }

    // 2.0 init 服务空间
    {
      let space = get_space(uniCloud.config);
      if (!uni.__stat_uniCloud_space) {
        //   判断不为空对象
        if (space && Object.keys(space).length !== 0) {
          let spaceData = {
            provider: space.provider,
            spaceId: space.spaceId,
            clientSecret: space.clientSecret,
          };
          
          if (space.endpoint) {
            spaceData.endpoint = space.endpoint;
          }

          if(space.provider === 'alipay'){
            spaceData.secretKey = space.secretKey;
            spaceData.accessKey = space.accessKey || space.secretId;
            spaceData.spaceAppId = space.spaceAppId || space.appId;
          }

          uni.__stat_uniCloud_space = uniCloud.init(spaceData);
          // console.log(
          //   '=== 当前绑定的统计服务空间spaceId：' +
          //     uni.__stat_uniCloud_space.config.spaceId
          // )
        } else {
          console.error('应用未关联服务空间，请在uniCloud目录右键关联服务空间');
        }
      }
    }

    return uni.__stat_instance
  }
  constructor() {
    super();
  }

  /**
   * 获取推送id
   */
  pushEvent(options) {
    const ClientID = is_push_clientid();
    if (uni.getPushClientId && ClientID) {
      uni.getPushClientId({
        success: (res) => {
          const cid = res.cid || false;
          //  只有获取到才会上传
          if (cid) {
            this.sendPushRequest(options, cid);
          }
        },
      });
    }
  }

  /**
   * 进入应用
   * @param {Object} options 页面参数
   * @param {Object} self	当前页面实例
   */
  launch(options, self) {
    // 初始化页面停留时间  start
    set_page_residence_time();
    this.__licationShow = true;
    dbSet('__launch_options', options);
    // 应用初始上报参数为1
    options.cst = 1;
    this.sendReportRequest(options, true);
  }
  load(options, self) {
    this.self = self;
    this._query = options;
  }

  appHide(self) {
    this.applicationHide(self, true);
  }

  appShow(self) {
    this.applicationShow(self);
  }

  show(self) {
    this.self = self;
    if (get_page_types(self) === 'page') {
      const isPageReport = is_page_report();
      if (isPageReport) {
        this.pageShow(self);
      }
    }

    // #ifdef VUE3
    if (get_platform_name() === 'h5' || get_platform_name() === 'n') {
      if (get_page_types(self) === 'app') {
        this.appShow();
      }
    }
    // #endif

    // #ifndef VUE3
    if (get_page_types(self) === 'app') {
      this.appShow();
    }
    // #endif
  }

  hide(self) {
    this.self = self;
    if (get_page_types(self) === 'page') {
      const isPageReport = is_page_report();
      if (isPageReport) {
        this.pageHide(self);
      }
    }

    // #ifdef VUE3
    if (get_platform_name() === 'h5' || get_platform_name() === 'n') {
      if (get_page_types(self) === 'app') {
        this.appHide();
      }
    }
    // #endif

    // #ifndef VUE3
    if (get_page_types(self) === 'app') {
      this.appHide();
    }
    // #endif
  }

  error(em) {
    // 开发工具内不上报错误
    // if (this._platform === 'devtools') {
    //   if (process.env.NODE_ENV === 'development') {
    //     console.info('当前运行环境为开发者工具，不上报数据。')
    //     return
    //   }
    // }
    let emVal = '';
    if (!em.message) {
      emVal = JSON.stringify(em);
    } else {
      emVal = em.stack;
    }

    let route = '';
    try {
      route = get_route();
    } catch (e) {
      // 未获取到页面路径
      route = '';
    }

    let options = {
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      p: this.statData.p,
      lt: '31',
      url: route,
      ut: this.statData.ut,
      ch: this.statData.ch,
      mpsdk: this.statData.mpsdk,
      mpv: this.statData.mpv,
      v: this.statData.v,
      em: emVal,
      usv: this.statData.usv,
      t: parseInt(new Date().getTime() / 1000),
    };
    this.request(options);
  }
}
var Stat$1 = Stat;

const stat = Stat$1.getInstance();

// 用于判断是隐藏页面还是卸载页面
let isHide = false;

const lifecycle = {
  onLaunch(options) {
    // 进入应用上报数据
    stat.launch(options, this);
    // 上报push推送id
    stat.pushEvent(options);
  },
  onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      let oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options)
      };
    }
  },
  onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload() {
    if (isHide) {
      isHide = false;
      return
    }
    stat.hide(this);
  },
  onError(e) {
    stat.error(e);
  },
};

// 加载统计代码
function load_stat() {
  // #ifdef VUE3
  uni.onCreateVueApp((app) => {
    app.mixin(lifecycle);
    uni.report = function (type, options) {
      stat.sendEvent(type, options);
    };
  });

  if (get_platform_name() !== 'h5' && get_platform_name() !== 'n') {
    uni.onAppHide(() => {
      stat.appHide(get_page_vm());
    });
    uni.onAppShow(() => {
      stat.appShow(get_page_vm());
    });
  }
  // #endif

  // #ifndef VUE3
  // eslint-disable-next-line no-restricted-globals
  const Vue = require('vue')
  ;(Vue.default || Vue).mixin(lifecycle);
  uni.report = function (type, options) {
    stat.sendEvent(type, options);
  };
  // #endif
}

function main() {
  if (is_debug) {
    {
      // #ifndef APP-NVUE
      console.log('=== uni统计开启,version:2.0 ===');
      // #endif
    }
    load_stat();
  } else {
    if (process.env.NODE_ENV === 'development') {
      uni.report = function (type, options) {};
    } else {
      load_stat();
    }
  }
}

main();
