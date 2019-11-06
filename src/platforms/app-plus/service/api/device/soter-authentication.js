import {
  invoke,
  requireNativePlugin
} from '../../bridge'

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
  let supportMode = []
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
      if (isEnrolled) {
        return {
          isEnrolled,
          errMsg: 'checkIsSoterEnrolledInDevice:ok'
        }
      } else {
        return {
          isEnrolled,
          errMsg: 'checkIsSoterEnrolledInDevice:ok'
        }
      }
    } else {
      return {
        isEnrolled: false,
        errMsg: 'checkIsSoterEnrolledInDevice:fail not support'
      }
    }
  } else if (checkAuthMode === 'facial') {
    if (checkIsSupportFaceID()) {
      const faceID = requireNativePlugin('faceID')
      const isEnrolled = faceID && faceID.isKeyguardSecure() && faceID.isEnrolledFaceID()
      if (isEnrolled) {
        return {
          isEnrolled,
          errMsg: 'checkIsSoterEnrolledInDevice:ok'
        }
      } else {
        return {
          isEnrolled,
          errMsg: 'checkIsSoterEnrolledInDevice:ok'
        }
      }
    } else {
      return {
        isEnrolled: false,
        errMsg: 'checkIsSoterEnrolledInDevice:fail not support'
      }
    }
  } else {
    return {
      isEnrolled: false,
      errMsg: 'checkIsSoterEnrolledInDevice:fail not support'
    }
  }
}

export function startSoterAuthentication ({
  requestAuthModes,
  challenge = false,
  authContent
} = {}, callbackId) {
  const supportMode = checkIsSupportSoterAuthentication().supportMode
  if (supportMode.length === 0) {
    return {
      authMode: supportMode[0] || 'fingerPrint',
      errCode: 90001,
      errMsg: 'startSoterAuthentication:fail'
    }
  }
  let supportRequestAuthMode = []
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
  let enrolledRequestAuthMode = []
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
      plus.nativeUI.showWaiting(authContent || '指纹识别中...').onclose = function () {
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
      if (e.type === 'success' && e.code === 1) {
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
