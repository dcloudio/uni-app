import { extend } from '@vue/shared'
import {
  initI18nStartSoterAuthenticationMsgsOnce,
  useI18n,
} from '@dcloudio/uni-core'
import {
  API_CHECK_IS_SOTER_ENROLLED_IN_DEVICE,
  API_CHECK_IS_SUPPORT_SOTER_AUTHENTICATION,
  API_START_SOTER_AUTHENTICATION,
  type API_TYPE_CHECK_IS_SOTER_ENROLLED_IN_DEVICE,
  type API_TYPE_CHECK_IS_SUPPORT_SOTER_AUTHENTICATION,
  type API_TYPE_START_SOTER_AUTHENTICATION,
  type CheckIsSoterEnrolledInDeviceCheckAuthMode,
  CheckIsSoterEnrolledInDeviceOptions,
  CheckIsSoterEnrolledInDeviceProtocols,
  StartSoterAuthenticationOptions,
  StartSoterAuthenticationProtocols,
  defineAsyncApi,
} from '@dcloudio/uni-api'

import { requireNativePlugin } from '../plugin/requireNativePlugin'

function checkIsSupportFaceID() {
  const platform = plus.os.name!.toLowerCase()
  if (platform !== 'ios') {
    return false
  }
  const faceID = requireNativePlugin('faceID')
  return !!(faceID && faceID.isSupport())
}

function checkIsSupportFingerPrint() {
  return !!(plus.fingerprint && plus.fingerprint.isSupport())
}

const baseCheckIsSupportSoterAuthentication = (
  resolve?: (...args: any) => void
) => {
  const supportMode: UniApp.SoterAuthModes[] = []
  if (checkIsSupportFingerPrint()) {
    supportMode.push('fingerPrint')
  }
  if (checkIsSupportFaceID()) {
    supportMode.push('facial')
  }
  resolve &&
    resolve({
      supportMode,
    })
  return {
    supportMode,
    errMsg: 'checkIsSupportSoterAuthentication:ok',
  }
}
export const checkIsSupportSoterAuthentication =
  defineAsyncApi<API_TYPE_CHECK_IS_SUPPORT_SOTER_AUTHENTICATION>(
    API_CHECK_IS_SUPPORT_SOTER_AUTHENTICATION,
    (_, { resolve, reject }) => {
      baseCheckIsSupportSoterAuthentication(resolve)
    }
  )

const basecheckIsSoterEnrolledInDevice = ({
  checkAuthMode,
  resolve,
  reject,
}: {
  checkAuthMode: CheckIsSoterEnrolledInDeviceCheckAuthMode
  resolve?: (...args: any) => void
  reject?: (errMsg: string, errRes?: any) => void
}) => {
  const wrapReject = (errMsg: string, errRes?: any) =>
    reject && reject(errMsg, errRes)
  const wrapResolve = (res?: any) => resolve && resolve(res)
  if (checkAuthMode === 'fingerPrint') {
    if (checkIsSupportFingerPrint()) {
      const isEnrolled =
        plus.fingerprint.isKeyguardSecure() &&
        plus.fingerprint.isEnrolledFingerprints()
      wrapResolve({ isEnrolled })
      return {
        isEnrolled,
        errMsg: 'checkIsSoterEnrolledInDevice:ok',
      }
    }
    wrapReject('not support', { isEnrolled: false })
    return {
      isEnrolled: false,
      errMsg: 'checkIsSoterEnrolledInDevice:fail not support',
    }
  } else if (checkAuthMode === 'facial') {
    if (checkIsSupportFaceID()) {
      const faceID = requireNativePlugin('faceID')
      const isEnrolled =
        faceID && faceID.isKeyguardSecure() && faceID.isEnrolledFaceID()
      wrapResolve({ isEnrolled })
      return {
        isEnrolled,
        errMsg: 'checkIsSoterEnrolledInDevice:ok',
      }
    }
    wrapReject('not support', { isEnrolled: false })
    return {
      isEnrolled: false,
      errMsg: 'checkIsSoterEnrolledInDevice:fail not support',
    }
  }
  wrapReject('not support', { isEnrolled: false })
  return {
    isEnrolled: false,
    errMsg: 'checkIsSoterEnrolledInDevice:fail not support',
  }
}
export const checkIsSoterEnrolledInDevice =
  defineAsyncApi<API_TYPE_CHECK_IS_SOTER_ENROLLED_IN_DEVICE>(
    API_CHECK_IS_SOTER_ENROLLED_IN_DEVICE,
    ({ checkAuthMode }, { resolve, reject }) => {
      basecheckIsSoterEnrolledInDevice({ checkAuthMode, resolve, reject })
    },
    CheckIsSoterEnrolledInDeviceProtocols,
    CheckIsSoterEnrolledInDeviceOptions
  )

export const startSoterAuthentication =
  defineAsyncApi<API_TYPE_START_SOTER_AUTHENTICATION>(
    API_START_SOTER_AUTHENTICATION,
    (
      { requestAuthModes, challenge = false, authContent },
      { resolve, reject }
    ) => {
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
      initI18nStartSoterAuthenticationMsgsOnce()
      const { t } = useI18n()

      const { supportMode } = baseCheckIsSupportSoterAuthentication()
      if (!supportMode.length) {
        return reject('not support', {
          authMode: 'fingerPrint',
          errCode: 90001,
        })
      }

      const supportRequestAuthMode: UniApp.SoterAuthModes[] = []
      requestAuthModes.forEach((item) => {
        if (supportMode.indexOf(item) > -1) {
          supportRequestAuthMode.push(item)
        }
      })
      if (!supportRequestAuthMode.length) {
        return reject('startSoterAuthentication:fail no corresponding mode', {
          authMode: 'fingerPrint',
          errCode: 90003,
        })
      }

      const enrolledRequestAuthMode: UniApp.SoterAuthModes[] = []
      supportRequestAuthMode.forEach((item) => {
        const checked = basecheckIsSoterEnrolledInDevice({
          checkAuthMode: item,
        }).isEnrolled
        if (checked) {
          enrolledRequestAuthMode.push(item)
        }
      })

      if (!enrolledRequestAuthMode.length) {
        return reject(
          `startSoterAuthentication:fail no ${supportRequestAuthMode[0]} enrolled`,
          {
            authMode: supportRequestAuthMode[0],
            errCode: 90011,
          }
        )
      }

      const realAuthMode = enrolledRequestAuthMode[0]

      let waiting: PlusNativeUIWaitingObj | null = null
      let waitingTimer: ReturnType<typeof setTimeout>
      const authenticateMessage =
        authContent || t('uni.startSoterAuthentication.authContent')

      const errorCB = (err: PlusFingerprintFingerprintError) => {
        const { code } = err
        const res = {
          authMode: realAuthMode,
        }
        const handler: Record<number, Function> = {
          // AUTHENTICATE_MISMATCH
          4: () => {
            if (waiting) {
              clearTimeout(waitingTimer)
              waiting.setTitle(t('uni.startSoterAuthentication.waitingContent'))
              waitingTimer = setTimeout(() => {
                waiting && waiting.setTitle(authenticateMessage)
              }, 1000)
            } else {
              reject(
                '',
                extend(res, {
                  errCode: 90009,
                })
              )
            }
          },
          // AUTHENTICATE_OVERLIMIT
          5: () => {
            // 微信小程序在第一次重试次数超限时安卓IOS返回不一致
            // 安卓端会返回次数超过限制（errCode: 90010）
            // IOS端会返回认证失败（errCode: 90009）
            // APP-IOS实际运行时不会次数超限，超过指定次数之后会弹出输入密码的界面
            plus.nativeUI.closeWaiting()
            reject(
              'authenticate freeze. please try again later',
              extend(res, {
                errCode: 90010,
              })
            )
          },
          // CANCEL
          6: () => {
            plus.nativeUI.closeWaiting()
            reject(
              'cancel',
              extend(res, {
                errCode: 90008,
              })
            )
          },
        }

        if (code && handler[code]) {
          handler[code]()
        } else {
          plus.nativeUI.closeWaiting()
          reject(
            '',
            extend(res, {
              errCode: 90007,
            })
          )
        }
      }

      if (realAuthMode === 'fingerPrint') {
        if (plus.os.name!.toLowerCase() === 'android') {
          waiting = plus.nativeUI.showWaiting(authenticateMessage)
          waiting.onclose = function () {
            plus.fingerprint.cancel()
          }
        }
        plus.fingerprint.authenticate(
          () => {
            plus.nativeUI.closeWaiting()
            resolve({
              authMode: realAuthMode,
              errCode: 0,
            })
          },
          errorCB,
          {
            message: authenticateMessage,
          }
        )
      } else if (realAuthMode === 'facial') {
        const faceID = requireNativePlugin('faceID')
        faceID.authenticate(
          {
            message: authenticateMessage,
          },
          (e: PlusFingerprintFingerprintError & { type: string }) => {
            if (e.type === 'success' && e.code === 0) {
              resolve({
                authMode: realAuthMode,
                errCode: 0,
              })
            } else {
              errorCB(e)
            }
          }
        )
      }
    },
    StartSoterAuthenticationProtocols,
    StartSoterAuthenticationOptions
  )
