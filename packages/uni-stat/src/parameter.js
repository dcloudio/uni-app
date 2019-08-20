import {
  PAGE_PVER_TIME,
  APP_PVER_TIME
} from './config';

const UUID_KEY = '__DC_STAT_UUID';
const UUID_VALUE = '__DC_UUID_VALUE';

export function getUuid() {
  let uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId()
    } catch (e) {
      uuid = '';
    }
    uni.setStorageSync(UUID_KEY, uuid);
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
  return uuid;
}

export const getSgin = (statData) => {
  let arr = Object.keys(statData)
  let sortArr = arr.sort();
  let sgin = {};
  let sginStr = ''
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&'
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1)
  };
}

export const getSplicing = (data) => {
  let str = ''
  for (var i in data) {
    str += i + '=' + data[i] + '&'
  }
  return str.substr(0, str.length - 1)
}

export const getTime = () => {
  return parseInt(new Date().getTime() / 1000);
}

export const getPlatformName = () => {
  const platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq'
  }
  return platformList[process.env.VUE_APP_PLATFORM];
}

export const getPackName = () => {
  let packName = ''
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    packName = uni.getAccountInfoSync().miniProgram.appId || ''
  }
  return packName
}

export const getVersion = () => {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
}

export const getChannel = () => {
  const platformName = getPlatformName();
  let channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  if (platformName === 'wx') {
    // TODO;
  }
  return channel;
}

export const getScene = (options) => {
  const platformName = getPlatformName();
  let scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
}
const First__Visit__Time__KEY = 'First__Visit__Time'
const Last__Visit__Time__KEY = 'Last__Visit__Time'

export const getFirstVisitTime = () => {
  const timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  let time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
}

export const getLastVisitTime = () => {
  const timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  let time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
}


const PAGE_RESIDENCE_TIME = '__page__residence__time'
let First_Page_residence_time = 0;
let Last_Page_residence_time = 0;


export const setPageResidenceTime = () => {
  First_Page_residence_time = getTime()
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time
}

export const getPageResidenceTime = () => {
  Last_Page_residence_time = getTime()
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time
}
const TOTAL__VISIT__COUNT = 'Total__Visit__Count'
export const getTotalVisitCount = () => {
  const timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  let count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
}

export const GetEncodeURIComponentOptions = (statData) => {
  let data = {};
  for (let prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
}

let Set__First__Time = 0;
let Set__Last__Time = 0;

export const getFirstTime = () => {
  let time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
}


export const getLastTime = () => {
  let time = new Date().getTime();
  Set__Last__Time = time;
  return time;
}


export const getResidenceTime = (type) => {
  let residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    let overtime = residenceTime > APP_PVER_TIME ? true : false
    return {
      residenceTime,
      overtime
    };
  }
  if (type === 'page') {
    let overtime = residenceTime > PAGE_PVER_TIME ? true : false
    return {
      residenceTime,
      overtime
    };
  }

  return {
    residenceTime
  };

}

export const getRoute = () => {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  let _self = page.$vm

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

export const getPageRoute = (self) => {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  let _self = page.$vm
  let query = self._query;
  let str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

export const getPageTypes = (self) => {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page') {
    return true;
  }
  return false;
}

export const calibration = (eventName, options) => {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if(!eventName){
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
    console.error(`uni.report [options] 参数类型错误,只能为 String 或 Object 类型`);
    return true
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error(`uni.report [options] 参数长度不能大于 255`);
    return true
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true
  }
}
