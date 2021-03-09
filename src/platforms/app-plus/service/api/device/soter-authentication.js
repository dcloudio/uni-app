import {
  invoke,
  requireNativePlugin
} from '../../bridge'
import {
  t
} from 'uni-core/helpers/i18n'

function checkIsSupportFaceID () {
  const platform = plus.os.name.toLowerCase()
  if (platform !== 'ios') {
    return false
  }
  const faceID = requireNativePlugin('faceID')
  return !!(faceID && faceID.isSupport())
}

function checkIsSupportFingerPrint () {
  return !!(plus.fingerprint && plus.fingerprint.isSupport())
}

export function checkIsSupportSoterAuthentication () {
  const supportMode = []
  if (checkIsSupportFingerPrint()) {
    supportMode.push('fingerPrint')
  }
  if (checkIsSupportFaceID()) {
    supportMode.push('facial')
  }
  return {
    supportMode,
    errMsg: 'checkIsSupportSoterAuthentication:ok'
  }
}

export function checkIsSoterEnrolledInDevice ({
  checkAuthMode
} = {}) {
  if (checkAuthMode === 'fingerPrint') {
    if (checkIsSupportFingerPrint()) {
      const isEnrolled = plus.fingerprint.isKeyguardSecure() && plus.fingerprint.isEnrolledFingerprints()
      return {
        isEnrolled,
        errMsg: 'checkIsSoterEnrolledInDevice:ok'
      }
    }
    return {
      isEnrolled: false,
      errMsg: 'checkIsSoterEnrolledInDevice:fail not support'
    }
  } else if (checkAuthMode === 'facial') {
    if (checkIsSupportFaceID()) {
      const faceID = requireNativePlugin('faceID')
      const isEnrolled = faceID && faceID.isKeyguardSecure() && faceID.isEnrolledFaceID()
      return {
        isEnrolled,
        errMsg: 'checkIsSoterEnrolledInDevice:ok'
      }
    }
    return {
      isEnrolled: false,
      errMsg: 'checkIsSoterEnrolledInDevice:fail not support'
    }
  }
  return {
    isEnrolled: false,
    errMsg: 'checkIsSoterEnrolledInDevice:fail not support'
  }
}

export function startSoterAuthentication ({
  requestAuthModes,
  challenge = false,
  authContent
} = {}, callbackId) {
  /*
  以手机不支持facial未录入fingerPrint为例
  requestAuthModes:['facial','fingerPrint']时，微信小程序返回值里的authMode为"fingerPrint"
  requestAuthModes:['fingerPrint','facial']时，微信小程序返回值里的authMode为"fingerPrint"
  即先过滤不支持的方式之后再判断是否录入
  微信小程序errCode（从企业号开发者中心查到如下文档）：
  0：识别成功  'startSoterAuthentication:ok'
  90001：本设备不支持SOTER  'startSoterAuthentication:fail not support soter'
  90002：用户未授权微信使用该生物认证接口  注：APP端暂不支持
  90003：请求使用的生物认证方式不支持  'startSoterAuthentication:fail no corresponding mode'
  90004：未传入challenge或challenge长度过长（最长512字符）注：APP端暂不支持
  90005：auth_content长度超过限制（最长42个字符）注：微信小程序auth_content指纹识别时无效果，faceID暂未测试
  90007：内部错误  'startSoterAuthentication:fail auth key update error'
  90008：用户取消授权  'startSoterAuthentication:fail cancel'
  90009：识别失败  'startSoterAuthentication:fail'
  90010：重试次数过多被冻结  'startSoterAuthentication:fail authenticate freeze. please try again later'
  90011：用户未录入所选识别方式  'startSoterAuthentication:fail no fingerprint enrolled'
  */
  const supportMode = checkIsSupportSoterAuthentication().supportMode
  if (supportMode.length === 0) {
    return {
      authMode: supportMode[0] || 'fingerPrint',
      errCode: 90001,
      errMsg: 'startSoterAuthentication:fail'
    }
  }
  const supportRequestAuthMode = []
  requestAuthModes.map((item, index) => {
    if (supportMode.indexOf(item) > -1) {
      supportRequestAuthMode.push(item)
    }
  })
  if (supportRequestAuthMode.length === 0) {
    return {
      authMode: supportRequestAuthMode[0] || 'fingerPrint',
      errCode: 90003,
      errMsg: 'startSoterAuthentication:fail no corresponding mode'
    }
  }
  const enrolledRequestAuthMode = []
  supportRequestAuthMode.map((item, index) => {
    const checked = checkIsSoterEnrolledInDevice({
      checkAuthMode: item
    }).isEnrolled
    if (checked) {
      enrolledRequestAuthMode.push(item)
    }
  })
  if (enrolledRequestAuthMode.length === 0) {
    return {
      authMode: supportRequestAuthMode[0],
      errCode: 90011,
      errMsg: `startSoterAuthentication:fail no ${supportRequestAuthMode[0]} enrolled`
    }
  }
  const realAuthMode = enrolledRequestAuthMode[0]
  if (realAuthMode === 'fingerPrint') {
    if (plus.os.name.toLowerCase() === 'android') {
      plus.nativeUI.showWaiting(authContent || t('uni.startSoterAuthentication.authContent')).onclose = function () {
        plus.fingerprint.cancel()
      }
    }
    plus.fingerprint.authenticate(() => {
      plus.nativeUI.closeWaiting()
      invoke(callbackId, {
        authMode: realAuthMode,
        errCode: 0,
        errMsg: 'startSoterAuthentication:ok'
      })
    }, (e) => {
      switch (e.code) {
        case e.AUTHENTICATE_MISMATCH:
          // 微信小程序没有这个回调，如果要实现此处回调需要多次触发需要用事件publish实现
          // invoke(callbackId, {
          //   authMode: realAuthMode,
          //   errCode: 90009,
          //   errMsg: 'startSoterAuthentication:fail'
          // })
          break
        case e.AUTHENTICATE_OVERLIMIT:
          // 微信小程序在第一次重试次数超限时安卓IOS返回不一致，安卓端会返回次数超过限制（errCode: 90010），IOS端会返回认证失败（errCode: 90009）。APP-IOS实际运行时不会次数超限，超过指定次数之后会弹出输入密码的界面
          plus.nativeUI.closeWaiting()
          invoke(callbackId, {
            authMode: realAuthMode,
            errCode: 90010,
            errMsg: 'startSoterAuthentication:fail authenticate freeze. please try again later'
          })
          break
        case e.CANCEL:
          plus.nativeUI.closeWaiting()
          invoke(callbackId, {
            authMode: realAuthMode,
            errCode: 90008,
            errMsg: 'startSoterAuthentication:fail cancel'
          })
          break
        default:
          plus.nativeUI.closeWaiting()
          invoke(callbackId, {
            authMode: realAuthMode,
            errCode: 90007,
            errMsg: 'startSoterAuthentication:fail'
          })
          break
      }
    }, {
      message: authContent
    })
  } else if (realAuthMode === 'facial') {
    const faceID = requireNativePlugin('faceID')
    faceID.authenticate({
      message: authContent
    }, (e) => {
      if (e.type === 'success' && e.code === 0) {
        invoke(callbackId, {
          authMode: realAuthMode,
          errCode: 0,
          errMsg: 'startSoterAuthentication:ok'
        })
      } else {
        switch (e.code) {
          case 4:
            invoke(callbackId, {
              authMode: realAuthMode,
              errCode: 90009,
              errMsg: 'startSoterAuthentication:fail'
            })
            break
          case 5:
            invoke(callbackId, {
              authMode: realAuthMode,
              errCode: 90010,
              errMsg: 'startSoterAuthentication:fail authenticate freeze. please try again later'
            })
            break
          case 6:
            invoke(callbackId, {
              authMode: realAuthMode,
              errCode: 90008,
              errMsg: 'startSoterAuthentication:fail cancel'
            })
            break
          default:
            invoke(callbackId, {
              authMode: realAuthMode,
              errCode: 90007,
              errMsg: 'startSoterAuthentication:fail'
            })
            break
        }
      }
    })
  }
}
