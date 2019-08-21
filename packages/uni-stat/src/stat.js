const PagesJson = require('uni-pages?{"type":"style"}').default
const statConfig = require('uni-stat-config').default || require('uni-stat-config');
import {
  getUuid,
  getSgin,
  getSplicing,
  getPackName,
  getPlatformName,
  getVersion,
  getChannel,
  getScene,
  getTime,
  getFirstVisitTime,
  getLastVisitTime,
  setPageResidenceTime,
  getPageResidenceTime,
  getTotalVisitCount,
  GetEncodeURIComponentOptions,
  getFirstTime,
  getLastTime,
  getResidenceTime,
  getPageRoute,
  getRoute,
  getPageTypes,
  calibration
} from './parameter';

import {
  STAT_URL,
  STAT_VERSION,
  STAT_H5_URL,
  OPERATING_TIME
} from './config';

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
      lt: ''
    }
    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': []
    };
    this.__prevent_triggering = false

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
      sh: resultOptions.screenHeight
    }

  }

  _applicationShow() {
    if (this.__licationHide) {
      getLastTime();
      const time = getResidenceTime('app');
      if (time.overtime) {
        let options = {
          path: this._lastPageRoute,
          scene: this.statData.sc
        }
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
    this._sendHideRequest({
      urlref: this._lastPageRoute,
      urlref_ts: time.residenceTime
    }, type)
  }

  _pageShow() {
    const route = getPageRoute(this);
    const routepath = getRoute(this);
    this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

    if (this.__licationShow) {
      getFirstTime();
      this.__licationShow = false;
      // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
      this._lastPageRoute = route;
      return;
    }

    getLastTime();
    this._lastPageRoute = route
    const time = getResidenceTime('page');
    if (time.overtime) {
      let options = {
        path: this._lastPageRoute,
        scene: this.statData.sc
      };
      this._sendReportRequest(options);
    }
    getFirstTime();
  }

  _pageHide() {
    if (!this.__licationHide) {
      getLastTime();
      const time = getResidenceTime('page');
      this._sendPageRequest({
        url: this._lastPageRoute,
        urlref: this._lastPageRoute,
        urlref_ts: time.residenceTime
      });
      this._navigationBarTitle = {
        config: '',
        page: '',
        report: '',
        lt: ''
      };
      return;
    }
  }

  _login() {
    this._sendEventRequest({
      key: 'login'
    }, 0)
  }

  _share() {
    this._sendEventRequest({
      key: 'share'
    }, 0)
  }
  _payment(key) {
    this._sendEventRequest({
      key
    }, 0)
  }
  _sendReportRequest(options) {
    this._navigationBarTitle.lt = '1';
    let query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
    this.statData.lt = '1';
    this.statData.url = options.path + query;
    this.statData.t = getTime();
    this.statData.sc = getScene(options.scene);
    this.statData.fvts = getFirstVisitTime();
    this.statData.lvts = getLastVisitTime();
    this.statData.tvc = getTotalVisitCount();
    this.getNetworkInfo();
  }

  _sendPageRequest(opt) {
    let {
      url,
      urlref,
      urlref_ts
    } = opt;
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
      p: this.statData.p
    }
    this.request(options);
  }

  _sendHideRequest(opt, type) {
    let {
      urlref,
      urlref_ts
    } = opt;
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
      p: this.statData.p
    }
    this.request(options, type)
  }
  _sendEventRequest({
    key = '',
    value = ""
  } = {}) {
    const route = this._lastPageRoute;
    let options = {
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      lt: '21',
      ut: this.statData.ut,
      url: route,
      ch: this.statData.ch,
      e_n: key,
      e_v: typeof(value) === 'object' ? JSON.stringify(value) : value.toString(),
      usv: this.statData.usv,
      t: getTime(),
      p: this.statData.p
    }
    this.request(options);
  }

  getNetworkInfo() {
    uni.getNetworkType({
      success: (result) => {
        this.statData.net = result.networkType;
        this.getLocation();
      }
    });
  }

  getLocation() {
    if (statConfig.getLocation) {
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
          this.request(this.statData);
        }
      });
    } else {
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
    if (!requestData[data.lt]) {
      this._reportingRequestData[data.lt] = [];
    }
    this._reportingRequestData[data.lt].push(data);
    if (getPageResidenceTime() < OPERATING_TIME && !type) {
      return
    }
    // 时间超过，重新获取时间戳
    setPageResidenceTime();
    let firstArr = []
    let contentArr = []
    let lastArr = []
    for (let i in this._reportingRequestData) {
      const rd = this._reportingRequestData[i]
      rd.forEach((elm) => {
        const newData = getSplicing(elm)
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
    let optionsData = {
      usv: STAT_VERSION, //统计 SDK 版本号
      t: time, //发送请求时的时间戮
      requests: JSON.stringify(firstArr),
    }
    this._reportingRequestData = {}

    if (data.ut === 'h5') {
      this.imageRequest(optionsData)
      return
    }
    uni.request({
      url: STAT_URL,
      method: 'POST',
      data: optionsData,
      success: () => {
        if (process.env.NODE_ENV === 'development') {
          console.log('stat request success');
        }
      },
      fail: (e) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('stat request fail', e);
        }
        if (++this._retry < 3) {
          setTimeout(() => {
            this.request(data);
          }, 1000);
        }
      }
    });
  }
  /**
   * h5 请求
   */
  imageRequest(data) {
    let image = new Image();
    let options = getSgin(GetEncodeURIComponentOptions(data)).options;
    image.src = STAT_H5_URL + '?' + options
  }

  sendEvent(key, value) {
    // 校验 type 参数
    if (calibration(key, value)) return

    if (key === 'title') {
      this._navigationBarTitle.report = value;
      return
    }
    this._sendEventRequest({
      key,
      value: typeof(value) === 'object' ? JSON.stringify(value) : value
    }, 1);
  }
}


class Stat extends Util {
  static getInstance() {
    if (!this.instance) {
      this.instance = new Stat();
    }
    return this.instance;
  }
  constructor() {
    super()
    this.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function') {
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
        self._navigationBarTitle.page = args.title
      }
    })
  }

  interceptLogin() {
    let self = this;
    uni.addInterceptor('login', {
      complete() {
        self._login();
      }
    })
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
      }
    })
  }

  interceptRequestPayment() {
    let self = this;
    uni.addInterceptor('requestPayment', {
      success() {
        self._payment('pay_success');
      },
      fail() {
        self._payment('pay_fail');
      }
    })
  }

  report(options, self) {
    this.self = self;
    if (process.env.NODE_ENV === 'development') {
      console.log('report init');
    }
    setPageResidenceTime()
    this.__licationShow = true;
    this._sendReportRequest(options, true);
  }

  load(options, self) {
    this.self = self;
    this._query = options;
  }

  show(self) {
    this.self = self;
    if (!getPageTypes(self)) {
      this._applicationShow(self);
    }
  }

  ready(self) {
    this.self = self;
    if (getPageTypes(self)) {
      this._pageShow(self);
    }
  }
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
      // return;
    }
    let emVal = ''
    if (!em.message) {
      emVal = JSON.stringify(em)
    } else {
      emVal = em.stack
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
      p: this.statData.p
    }
    this.request(options);
  }
}
export default Stat
