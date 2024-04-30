import {
  API_GET_SYSTEM_SETTING,
  type API_TYPE_GET_SYSTEM_SETTING,
  defineSyncApi,
} from '@dcloudio/uni-api'

export const getSystemSetting = defineSyncApi<API_TYPE_GET_SYSTEM_SETTING>(
  API_GET_SYSTEM_SETTING,
  () => {
    const { getSystemSetting } = weex.requireModule('plus')
    let systemSetting =
      getSystemSetting() as ReturnType<API_TYPE_GET_SYSTEM_SETTING>
    try {
      if (typeof systemSetting === 'string')
        systemSetting = JSON.parse(systemSetting)
    } catch (error) {}

    return systemSetting
  }
)
