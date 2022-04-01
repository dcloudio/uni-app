'use strict';

var version = "3.0.0-alpha-3000020210813002";

const STAT_VERSION = version;
const STAT_URL = 'https://tongji.dcloud.io/uni/stat';
const STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
const PAGE_PVER_TIME = 1800;
const APP_PVER_TIME = 300;
const OPERATING_TIME = 10;
const DIFF_TIME = 60 * 1000 * 60 * 24;

const statConfig$1 = {
  appid: process.env.UNI_APP_ID,
};
const UUID_KEY = '__DC_STAT_UUID';
const UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  let uuid = '';
  if (getPlatformName() === 'n') {
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

const getSgin = (statData) => {
  let arr = Object.keys(statData);
  let sortArr = arr.sort();
  let sgin = {};
  let sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1),
  }
};

const getSplicing = (data) => {
  let str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1)
};

const getTime = () => {
  return parseInt(new Date().getTime() / 1000)
};

const getPlatformName = () => {
  const aliArr = ['y', 'a', 'p', 'mp-ali'];
  const platformList = {
    'app-plus': 'n',
    h5: 'h5',
    'mp-weixin': 'wx',
    [aliArr.reverse().join('')]: 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq',
    'mp-jd': 'jd',
    'mp-xhs': 'xhs',
    'quickapp-native': 'qn',
    'mp-kuaishou': 'ks',
  };
  return platformList[process.env.VUE_APP_PLATFORM]
};

const getPackName = () => {
  let packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName
};

const getVersion = () => {
  return getPlatformName() === 'n' ? plus.runtime.version : ''
};

const getChannel = () => {
  const platformName = getPlatformName();
  let channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel
};

const getScene = (options) => {
  const platformName = getPlatformName();
  let scene = '';
  if (options) {
    return options
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene
};
const First__Visit__Time__KEY = 'First__Visit__Time';
const Last__Visit__Time__KEY = 'Last__Visit__Time';

const getFirstVisitTime = () => {
  const timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  let time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time
};

const getLastVisitTime = () => {
  const timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  let time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time
};

const PAGE_RESIDENCE_TIME = '__page__residence__time';
let First_Page_residence_time = 0;
let Last_Page_residence_time = 0;

const setPageResidenceTime = () => {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time
};

const getPageResidenceTime = () => {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time
};
const TOTAL__VISIT__COUNT = 'Total__Visit__Count';
const getTotalVisitCount = () => {
  const timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  let count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count
};

const GetEncodeURIComponentOptions = (statData) => {
  let data = {};
  for (let prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data
};

let Set__First__Time = 0;
let Set__Last__Time = 0;

const getFirstTime = () => {
  let time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time
};

const getLastTime = () => {
  let time = new Date().getTime();
  Set__Last__Time = time;
  return time
};

const getResidenceTime = (type) => {
  let residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
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

const getRoute = () => {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  if (!page) return ''
  // TODO 需要确认如果不用 $vm ,其他平台会不会出错
  let _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is
  } else {
    return _self.route || (_self.$scope && _self.$scope.route)
  }
};

const getPageRoute = (_this) => {
  let pageVm = _this.self;
  let page = pageVm.$page || pageVm.$scope.$page;
  return page.fullPath === '/' ? page.route : page.fullPath
};

const getPageTypes = (self) => {
  if (
    self.$mpType === 'page' ||
    (self.$mp && self.$mp.mpType === 'page') ||
    self.$options.mpType === 'page'
  ) {
    return true
  }
  return false
};

const calibration = (eventName, options) => {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error(`uni.report 缺少 [eventName] 参数`);
    return true
  }
  if (typeof eventName !== 'string') {
    console.error(`uni.report [eventName] 参数类型错误,只能为 String 类型`);
    return true
  }
  if (eventName.length > 255) {
    console.error(`uni.report [eventName] 参数长度不能大于 255`);
    return true
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error(
      `uni.report [options] 参数类型错误,只能为 String 或 Object 类型`
    );
    return true
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error(`uni.report [options] 参数长度不能大于 255`);
    return true
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error(
      'uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型'
    );
    return true
  }
};

const Report_Data_Time = 'Report_Data_Time';
const Report_Status = 'Report_Status';
const isReportData = () => {
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
  let formData = {
    usv: STAT_VERSION,
    conf: JSON.stringify({
      ak: statConfig$1.appid,
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

let titleJsons = {};
// #ifdef MP
let pagesTitle = require('uni-pages?{"type":"style"}').default;
pagesTitle = pagesTitle.pages;
for (let i in pagesTitle) {
  titleJsons[i] = pagesTitle[i].navigationBarTitleText || '';
}
// #endif
// #ifndef MP
titleJsons = process.env.UNI_STAT_TITLE_JSON;
// #endif

const statConfig = {
  appid: process.env.UNI_APP_ID,
};
const resultOptions = uni.getSystemInfoSync();

class Util {
  constructor() {
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '',
    };
    this._operatingTime = 0;
    this._reportingRequestData = {
      1: [],
      11: [],
    };
    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight,
    };
    // 注册拦截器
    let registerInterceptor =
      typeof uni.addInterceptor === 'function' &&
      process.env.NODE_ENV !== 'development';
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

  getIsReportData() {
    return isReportData()
  }

  _applicationShow() {
    if (this.__licationHide) {
      getLastTime();
      const time = getResidenceTime('app');
      if (time.overtime) {
        let options = {
          path: this._lastPageRoute,
          scene: this.statData.sc,
        };
        this._sendReportRequest(options);
      }
      this.__licationHide = false;
    }
  }

  _applicationHide(self, type) {
    this.__licationHide = true;
    getLastTime();
    const time = getResidenceTime();
    getFirstTime();
    const route = getPageRoute(this);
    this._sendHideRequest(
      {
        urlref: route,
        urlref_ts: time.residenceTime,
      },
      type
    );
  }

  _pageShow() {
    const route = getPageRoute(this);
    const routepath = getRoute();
    this._navigationBarTitle.config =
      (titleJsons && titleJsons[routepath]) || '';
    if (this.__licationShow) {
      getFirstTime();
      this.__licationShow = false;
      this._lastPageRoute = route;
      return
    }

    getLastTime();
    const time = getResidenceTime('page');
    // 停留时间
    if (time.overtime) {
      let options = {
        path: route,
        scene: this.statData.sc,
      };
      this._sendReportRequest(options);
    }
    getFirstTime();
  }

  _pageHide() {
    if (!this.__licationHide) {
      getLastTime();
      const time = getResidenceTime('page');
      let route = getPageRoute(this);
      if (!this._lastPageRoute) {
        this._lastPageRoute = route;
      }
      this._sendPageRequest({
        url: route,
        urlref: this._lastPageRoute,
        urlref_ts: time.residenceTime,
      });
      this._lastPageRoute = route;
      this._navigationBarTitle = {
        config: '',
        page: '',
        report: '',
        lt: '',
      };
      return
    }
  }

  _login() {
    this._sendEventRequest(
      {
        key: 'login',
      },
      0
    );
  }

  _share() {
    this._sendEventRequest(
      {
        key: 'share',
      },
      0
    );
  }
  _payment(key) {
    this._sendEventRequest(
      {
        key,
      },
      0
    );
  }
  _sendReportRequest(options) {
    this._navigationBarTitle.lt = '1';
    this._navigationBarTitle.config =
      (titleJsons && titleJsons[options.path]) || '';
    let query =
      options.query && JSON.stringify(options.query) !== '{}'
        ? '?' + JSON.stringify(options.query)
        : '';
    this.statData.lt = '1';
    this.statData.url = options.path + query || '';
    this.statData.t = getTime();
    this.statData.sc = getScene(options.scene);
    this.statData.fvts = getFirstVisitTime();
    this.statData.lvts = getLastVisitTime();
    this.statData.tvc = getTotalVisitCount();
    if (getPlatformName() === 'n') {
      this.getProperty();
    } else {
      this.getNetworkInfo();
    }
  }

  _sendPageRequest(opt) {
    let { url, urlref, urlref_ts } = opt;
    this._navigationBarTitle.lt = '11';
    let options = {
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      lt: '11',
      ut: this.statData.ut,
      url,
      tt: this.statData.tt,
      urlref,
      urlref_ts,
      ch: this.statData.ch,
      usv: this.statData.usv,
      t: getTime(),
      p: this.statData.p,
    };
    this.request(options);
  }

  _sendHideRequest(opt, type) {
    let { urlref, urlref_ts } = opt;
    let options = {
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      lt: '3',
      ut: this.statData.ut,
      urlref,
      urlref_ts,
      ch: this.statData.ch,
      usv: this.statData.usv,
      t: getTime(),
      p: this.statData.p,
    };
    this.request(options, type);
  }
  _sendEventRequest({ key = '', value = '' } = {}) {
    const route = this._lastPageRoute;
    let options = {
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      lt: '21',
      ut: this.statData.ut,
      url: route,
      ch: this.statData.ch,
      e_n: key,
      e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
      usv: this.statData.usv,
      t: getTime(),
      p: this.statData.p,
    };
    this.request(options);
  }

  getNetworkInfo() {
    uni.getNetworkType({
      success: (result) => {
        this.statData.net = result.networkType;
        this.getLocation();
      },
    });
  }

  getProperty() {
    plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
      this.statData.v = wgtinfo.version || '';
      this.getNetworkInfo();
    });
  }

  getLocation() {
    {
      this.statData.lat = 0;
      this.statData.lng = 0;
      this.request(this.statData);
    }
  }

  request(data, type) {
    let time = getTime();
    const title = this._navigationBarTitle;
    data.ttn = title.page;
    data.ttpj = title.config;
    data.ttc = title.report;
    let requestData = this._reportingRequestData;
    if (getPlatformName() === 'n') {
      requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
    }
    if (!requestData[data.lt]) {
      requestData[data.lt] = [];
    }
    requestData[data.lt].push(data);
    if (getPlatformName() === 'n') {
      uni.setStorageSync('__UNI__STAT__DATA', requestData);
    }
    if (getPageResidenceTime() < OPERATING_TIME && !type) {
      return
    }
    let uniStatData = this._reportingRequestData;
    if (getPlatformName() === 'n') {
      uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
    }
    // 时间超过，重新获取时间戳
    setPageResidenceTime();
    let firstArr = [];
    let contentArr = [];
    let lastArr = [];

    for (let i in uniStatData) {
      const rd = uniStatData[i];
      rd.forEach((elm) => {
        const newData = getSplicing(elm);
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
    let optionsData = {
      usv: STAT_VERSION, //统计 SDK 版本号
      t: time, //发送请求时的时间戮
      requests: JSON.stringify(firstArr),
    };

    this._reportingRequestData = {};
    if (getPlatformName() === 'n') {
      uni.removeStorageSync('__UNI__STAT__DATA');
    }

    if (data.ut === 'h5') {
      this.imageRequest(optionsData);
      return
    }

    if (getPlatformName() === 'n' && this.statData.p === 'a') {
      setTimeout(() => {
        this._sendRequest(optionsData);
      }, 200);
      return
    }
    this._sendRequest(optionsData);
  }
  _sendRequest(optionsData) {
    this.getIsReportData().then(() => {
      uni.request({
        url: STAT_URL,
        method: 'POST',
        data: optionsData,
        success: () => {},
        fail: (e) => {
          if (++this._retry < 3) {
            setTimeout(() => {
              this._sendRequest(optionsData);
            }, 1000);
          }
        },
      });
    });
  }
  /**
   * h5 请求
   */
  imageRequest(data) {
    this.getIsReportData().then(() => {
      let image = new Image();
      let options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    });
  }

  sendEvent(key, value) {
    // 校验 type 参数
    if (calibration(key, value)) return

    if (key === 'title') {
      this._navigationBarTitle.report = value;
      return
    }
    this._sendEventRequest(
      {
        key,
        value: typeof value === 'object' ? JSON.stringify(value) : value,
      },
      1
    );
  }
}

class Stat extends Util {
  static getInstance() {
    if (!this.instance) {
      this.instance = new Stat();
    }
    return this.instance
  }
  constructor() {
    super();
    this.instance = null;
  }

  report(options, self) {
    // TODO 需要确认如果不用 $vm ,其他平台会不会出错
    setPageResidenceTime();
    this.__licationShow = true;
    this._sendReportRequest(options, true);
  }

  load(options, self) {
    this.self = self;
    this._query = options;
  }

  show(self) {
    this.self = self;
    if (getPageTypes(self)) {
      this._pageShow(self);
    } else {
      this._applicationShow(self);
    }
  }
  ready(self) {}
  hide(self) {
    this.self = self;
    if (getPageTypes(self)) {
      this._pageHide(self);
    } else {
      this._applicationHide(self, true);
    }
  }
  error(em) {
    if (this._platform === 'devtools') {
      if (process.env.NODE_ENV === 'development') {
        console.info('当前运行环境为开发者工具，不上报数据。');
      }
    }
    let emVal = '';
    if (!em.message) {
      emVal = JSON.stringify(em);
    } else {
      emVal = em.stack;
    }
    let options = {
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      lt: '31',
      ut: this.statData.ut,
      ch: this.statData.ch,
      mpsdk: this.statData.mpsdk,
      mpv: this.statData.mpv,
      v: this.statData.v,
      em: emVal,
      usv: this.statData.usv,
      t: getTime(),
      p: this.statData.p,
    };
    this.request(options);
  }
}
var Stat$1 = Stat;

const stat = Stat$1.getInstance();
let isHide = false;
const lifecycle = {
  onLaunch(options) {
    stat.report(options, this);
  },
  onReady() {
    stat.ready(this);
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

function main() {
  if (process.env.NODE_ENV === 'development') {
    uni.report = function (type, options) {};
  } else {
    uni.onAppLaunch((options) => {
      stat.report(options);
      // 小程序平台此时也无法获取getApp，统一在options中传递一个app对象
      options.app.$vm.$.appContext.app.mixin(lifecycle);
      uni.report = function (type, options) {
        stat.sendEvent(type, options);
      };
    });
  }
}

main();
