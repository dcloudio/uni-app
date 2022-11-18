export const API_CHECK_IS_SUPPORT_SOTER_AUTHENTICATION =
  'checkIsSupportSoterAuthentication'
export type API_TYPE_CHECK_IS_SUPPORT_SOTER_AUTHENTICATION =
  typeof uni.checkIsSupportSoterAuthentication

export const API_CHECK_IS_SOTER_ENROLLED_IN_DEVICE =
  'checkIsSoterEnrolledInDevice'
export type API_TYPE_CHECK_IS_SOTER_ENROLLED_IN_DEVICE =
  typeof uni.checkIsSoterEnrolledInDevice
export type CheckIsSoterEnrolledInDeviceCheckAuthMode =
  Parameters<API_TYPE_CHECK_IS_SOTER_ENROLLED_IN_DEVICE>[0]['checkAuthMode']
const CheckAuthModes: CheckIsSoterEnrolledInDeviceCheckAuthMode[] = [
  'fingerPrint',
  'facial',
  'speech',
]
export const CheckIsSoterEnrolledInDeviceOptions: ApiOptions<API_TYPE_CHECK_IS_SOTER_ENROLLED_IN_DEVICE> =
  {
    formatArgs: {
      checkAuthMode(value, params) {
        if (!value || !CheckAuthModes.includes(value))
          return 'checkAuthMode 填写错误'
      },
    },
  }
export const CheckIsSoterEnrolledInDeviceProtocols: ApiProtocol<API_TYPE_CHECK_IS_SOTER_ENROLLED_IN_DEVICE> =
  {
    checkAuthMode: String as any,
  }

export const API_START_SOTER_AUTHENTICATION = 'startSoterAuthentication'
export type API_TYPE_START_SOTER_AUTHENTICATION =
  typeof uni.startSoterAuthentication
export const StartSoterAuthenticationOptions: ApiOptions<API_TYPE_START_SOTER_AUTHENTICATION> =
  {
    formatArgs: {
      requestAuthModes(value, params) {
        if (!value.includes('fingerPrint') && !value.includes('facial'))
          return 'requestAuthModes 填写错误'
      },
    },
  }
export const StartSoterAuthenticationProtocols: ApiProtocol<API_TYPE_START_SOTER_AUTHENTICATION> =
  {
    requestAuthModes: {
      type: Array,
      required: true,
    },
    challenge: String,
    authContent: String,
  }
