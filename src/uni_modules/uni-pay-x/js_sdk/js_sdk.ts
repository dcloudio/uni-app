function checkPlatform() {
  // #ifdef WEB
  type SystemInfo = {
    win : boolean,
    mac : boolean,
    x11 : boolean
  };
  let system = {
    win: false,
    mac: false,
    x11: false
  } as SystemInfo;
  let p = navigator.platform;
  let ua = navigator.userAgent.toLowerCase();
  system.win = p.indexOf("Win") == 0;
  system.mac = p.indexOf("Mac") == 0;
  system.x11 = p == "X11" || p.indexOf("Linux") == 0;
  if (system.win || system.mac || system.x11) {
    return 'pc';
  } else {
    if (p.indexOf("iPhone") > -1 || p.indexOf("iPad") > -1) {
      return "ios";
    } else if (ua.indexOf('harmonyos') > -1) {
      return 'harmonyos';
    } else {
      return "android";
    }
  }
  // #endif
}

/**
 * 获取当前WEB所在的环境
 */
function getH5Env() {
  // #ifdef WEB
  const ua = window.navigator.userAgent.toLowerCase();
  const isWeixin = /micromessenger/i.test(ua);
  const isAlipay = /alipay/i.test(ua);
  const isMiniProgram = /miniprogram/i.test(ua);
  if (isWeixin) {
    if (isMiniProgram) {
      return "mp-weixin";
    } else {
      return "h5-weixin";
    }
  } else if (isAlipay) {
    if (isMiniProgram) {
      return "mp-alipay";
    } else {
      return "h5-alipay";
    }
  }
  return "h5";
  // #endif
}

// json2的属性全部赋值给json1
function objectAssign(json1 : UTSJSONObject, json2 : UTSJSONObject) : UTSJSONObject {
  for (let key in json2) {
    json1[key] = json2[key];
  }
  return json1;
}

function getWeixinCode() : Promise<string> {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    uni.login({
      provider: 'weixin',
      success(res) {
        resolve(res.code)
      },
      fail(err) {
        reject(new Error('获取微信code失败'))
      }
    })
    // #endif
    // #ifndef MP-WEIXIN
    resolve('')
    // #endif
  })
};

function getAlipayCode() : Promise<string> {
  return new Promise((resolve, reject) => {
    // #ifdef MP-ALIPAY
    uni.login({
      provider: 'alipay',
      success(res) {
        resolve(res.code);
      },
      fail(err) {
        reject(new Error('获取支付宝code失败，可能是没有关联appid或你的支付宝开发者工具还没有登录'));
      }
    });
    // #endif
    // #ifndef MP-ALIPAY
    resolve('');
    // #endif
  });

};

export {
  checkPlatform,
  getH5Env,
  objectAssign,
  getWeixinCode,
  getAlipayCode
};
