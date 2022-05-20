import { isPlainObject, isArray, hasOwn } from '@vue/shared'

import {
  addSafeAreaInsets,
  useDeviceId,
  populateParameters,
} from '@dcloudio/uni-mp-core'

import { getStorageSync } from './shims'

export { redirectTo, navigateTo } from '@dcloudio/uni-mp-core'

function handleNetworkInfo(
  fromRes: my.IGetNetworkTypeSuccessResult,
  toRes: UniApp.GetNetworkTypeSuccess
) {
  const nextworkType = fromRes.networkType
  switch (nextworkType) {
    case 'NOTREACHABLE':
      toRes.networkType = 'none'
      break
    case 'WWAN':
      // TODO ?
      toRes.networkType = '3g'
      break
    default:
      toRes.networkType = fromRes.networkType.toLowerCase() as any
      break
  }
}

function handleSystemInfo(
  fromRes: my.IGetSystemInfoSuccessResult,
  toRes: UniApp.GetSystemInfoResult
) {
  addSafeAreaInsets(fromRes, toRes)
  useDeviceId({
    getStorageSync,
  })(fromRes, toRes)
  populateParameters(fromRes, toRes)

  let platform = fromRes.platform ? fromRes.platform.toLowerCase() : 'devtools'
  if (!~['android', 'ios'].indexOf(platform)) {
    platform = 'devtools'
  }
  toRes.platform = platform
}

export function returnValue(methodName: string, res: Record<string, any> = {}) {
  // 通用 returnValue 解析
  if (res.error || res.errorMessage) {
    res.errMsg = `${methodName}:fail ${res.errorMessage || res.error}`
    delete res.error
    delete res.errorMessage
  } else {
    res.errMsg = `${methodName}:ok`
  }
  return res
}
export const request = {
  name: my.canIUse('request') ? 'request' : 'httpRequest',
  args(fromArgs: UniApp.RequestOptions) {
    const method = fromArgs.method || 'GET'
    if (!fromArgs.header) {
      // 默认增加 header 参数，方便格式化 content-type
      fromArgs.header = {}
    }
    const headers: Record<string, string> = {
      'content-type': 'application/json',
    }
    Object.keys(fromArgs.header).forEach((key) => {
      headers[key.toLocaleLowerCase()] = fromArgs.header[key]
    })
    return {
      header() {
        return {
          name: 'headers',
          value: headers,
        }
      },
      data(data: unknown) {
        // 钉钉小程序在content-type为application/json时需上传字符串形式data，使用my.dd在真机运行钉钉小程序时不能正确判断
        if (
          my.canIUse('saveFileToDingTalk') &&
          method.toUpperCase() === 'POST' &&
          headers['content-type'].indexOf('application/json') === 0 &&
          isPlainObject(data)
        ) {
          return {
            name: 'data',
            value: JSON.stringify(data),
          }
        }
        return {
          name: 'data',
          value: data,
        }
      },
      method: 'method', // TODO 支付宝小程序仅支持 get,post
      responseType: false,
    }
  },
  returnValue: {
    status: 'statusCode',
    headers: 'header',
  },
}
export const setNavigationBarColor = {
  name: 'setNavigationBar',
  args: {
    frontColor: false,
    animation: false,
  },
}
export const setNavigationBarTitle = {
  name: 'setNavigationBar',
}
export function showModal({ showCancel = true }: UniApp.ShowModalOptions = {}) {
  if (showCancel) {
    return {
      name: 'confirm',
      args: {
        cancelColor: false,
        confirmColor: false,
        cancelText: 'cancelButtonText',
        confirmText: 'confirmButtonText',
      },
      returnValue(
        fromRes: my.IConfirmSuccessResult,
        toRes: UniApp.ShowModalRes
      ) {
        toRes.confirm = fromRes.confirm
        toRes.cancel = !fromRes.confirm
      },
    }
  }
  return {
    name: 'alert',
    args: {
      confirmColor: false,
      confirmText: 'buttonText',
    },
    returnValue(fromRes: unknown, toRes: UniApp.ShowModalRes) {
      toRes.confirm = true
      toRes.cancel = false
    },
  }
}
export function showToast({ icon = 'success' }: UniApp.ShowToastOptions = {}) {
  const args = {
    title: 'content',
    icon: 'type',
    duration: false,
    image: false,
    mask: false,
  }
  if (icon === 'loading') {
    return {
      name: 'showLoading',
      args,
    }
  }
  return {
    name: 'showToast',
    args,
  }
}
export const showActionSheet = {
  name: 'showActionSheet',
  args: {
    itemList: 'items',
    itemColor: false,
  },
  returnValue: {
    index: 'tapIndex',
  },
}
export const showLoading = {
  args: {
    title: 'content',
    mask: false,
  },
}
export const uploadFile = {
  args: {
    name: 'fileName',
  },
  // 从测试结果看，是有返回对象的，文档上没有说明。
}
export const downloadFile = {
  returnValue: {
    apFilePath: 'tempFilePath',
  },
}
export const getFileInfo = {
  args: {
    filePath: 'apFilePath',
  },
}
export const compressImage = {
  args(
    fromArgs: UniApp.CompressImageOptions,
    toArgs: my.ICompressImageOptions
  ) {
    toArgs.compressLevel = 4
    if (fromArgs && fromArgs.quality) {
      toArgs.compressLevel = Math.floor(fromArgs.quality / 26) as any
    }
    if (fromArgs.src) {
      toArgs.apFilePaths = [fromArgs.src]
    }
  },
  returnValue(
    fromRes: my.ICompressImageSuccessResult,
    toRes: UniApp.CompressVideoSuccessData
  ) {
    const apFilePaths = fromRes.apFilePaths
    if (apFilePaths && apFilePaths.length) {
      toRes.tempFilePath = apFilePaths[0]
    }
  },
}
export const chooseVideo = {
  // 支付宝小程序文档中未找到（仅在getSetting处提及），但实际可用
  returnValue: {
    apFilePath: 'tempFilePath',
  },
}
export const connectSocket = {
  args: {
    method: false,
    protocols: false,
  },
  // TODO 有没有返回值还需要测试下
}
export const chooseImage = {
  returnValue(
    result: my.IChooseImageSuccessResult & {
      tempFilePaths?: string[]
      tempFiles?: Array<{ path: string }>
    }
  ) {
    const hasTempFilePaths =
      hasOwn(result, 'tempFilePaths') && result.tempFilePaths
    if (hasOwn(result, 'apFilePaths') && !hasTempFilePaths) {
      result.tempFilePaths = []
      result.apFilePaths?.forEach((apFilePath) =>
        result.tempFilePaths?.push(apFilePath)
      )
    }
    if (!hasOwn(result, 'tempFiles') && hasTempFilePaths) {
      result.tempFiles = []
      result.tempFilePaths?.forEach((tempFilePath) =>
        result.tempFiles?.push({ path: tempFilePath })
      )
    }
    return {}
  },
}
export const previewImage = {
  args(fromArgs: UniApp.PreviewImageOptions, toArgs: my.IPreviewImageOptions) {
    // 支付宝小程序的 current 是索引值，而非图片地址。
    const currentIndex = Number(fromArgs.current)
    if (isNaN(currentIndex)) {
      if (fromArgs.current && isArray(fromArgs.urls)) {
        const index = fromArgs.urls.indexOf(fromArgs.current as string)
        toArgs.current = ~index ? index : 0
      }
    } else {
      toArgs.current = currentIndex
    }
    return {
      indicator: false,
      loop: false,
    }
  },
}
export const saveFile = {
  args: {
    tempFilePath: 'apFilePath',
  },
  returnValue: {
    apFilePath: 'savedFilePath',
  },
}
export const getSavedFileInfo = {
  args: {
    filePath: 'apFilePath',
  },
}
export const getSavedFileList = {
  returnValue(
    fromRes: my.IGetSavedFileListSuccessResult,
    toRes: UniApp.GetSavedFileListSuccess
  ) {
    toRes.fileList = fromRes.fileList.map((file) => {
      return {
        filePath: (file as any).apFilePath, // mini-types file.d.ts 不正确
        createTime: file.createTime,
        size: file.size,
      }
    })
  },
}
export const removeSavedFile = {
  args: {
    filePath: 'apFilePath',
  },
}
export const getLocation = {
  args: {
    type: false,
    altitude: false,
  },
}
export const openLocation = {
  args: {
    // TODO address 参数在阿里上是必传的
  },
}
export const getNetworkType = {
  returnValue: handleNetworkInfo,
}
export const onNetworkStatusChange = {
  returnValue: handleNetworkInfo,
}
export const stopAccelerometer = {
  name: 'offAccelerometerChange',
}
export const stopCompass = {
  name: 'offCompassChange',
}
export const scanCode = {
  name: 'scan',
  args: {
    onlyFromCamera: 'hideAlbum',
  },
  returnValue: {
    code: 'result',
  },
}
export const setClipboardData = {
  name: 'setClipboard',
  args: {
    data: 'text',
  },
}
export const getClipboardData = {
  name: 'getClipboard',
  returnValue: {
    text: 'data',
  },
}
export const pageScrollTo = {
  args: {
    duration: false,
  },
}
export const login = {
  name: 'getAuthCode',
  returnValue: {
    authCode: 'code',
  },
}
export const getUserInfo = {
  name: my.canIUse('getOpenUserInfo') ? 'getOpenUserInfo' : 'getAuthUserInfo',
  returnValue(
    fromRes: my.IGetAuthUserInfoSuccessResult,
    toRes: UniApp.GetUserInfoRes
  ) {
    if (my.canIUse('getOpenUserInfo')) {
      let response
      try {
        response = JSON.parse((fromRes as any).response).response
      } catch (e) {}
      if (response) {
        toRes.userInfo = response as any
        toRes.userInfo.avatarUrl = response.avatar
        delete response.avatar
      }
    } else {
      toRes.userInfo = {
        openId: '',
        nickName: fromRes.nickName,
        avatarUrl: fromRes.avatar,
      }
    }
  },
}
export const requestPayment = {
  name: 'tradePay',
  args: {
    orderInfo: 'tradeNO',
  },
}
export const getBLEDeviceServices = {
  returnValue(
    fromRes: my.IGetBLEDeviceServicesSuccessResult,
    toRes: UniApp.GetBLEDeviceServicesSuccess
  ) {
    toRes.services = fromRes.services.map((item) => {
      return {
        uuid: item.serviceId,
        isPrimary: item.isPrimary,
      }
    })
  },
}
export const createBLEConnection = {
  name: 'connectBLEDevice',
  args: {
    timeout: false,
  },
}
export const closeBLEConnection = {
  name: 'disconnectBLEDevice',
}
export const onBLEConnectionStateChange = {
  name: 'onBLEConnectionStateChanged',
}
export const makePhoneCall = {
  args: {
    phoneNumber: 'number',
  },
}
export const stopGyroscope = {
  name: 'offGyroscopeChange',
}
export const getSystemInfo = {
  returnValue: handleSystemInfo,
}
export const getSystemInfoSync = {
  returnValue: handleSystemInfo,
}
// 文档没提到，但是实测可用。
export const canvasToTempFilePath = {
  returnValue(
    fromRes: Record<string, any>,
    toRes: UniApp.CanvasToTempFilePathRes
  ) {
    // 真机的情况下会有 tempFilePath 这个值，因此需要主动修改。
    toRes.tempFilePath = fromRes.apFilePath
  },
}
export const setScreenBrightness = {
  args: {
    value: 'brightness',
  },
}
export const getScreenBrightness = {
  returnValue: {
    brightness: 'value',
  },
}
export const showShareMenu = {
  name: 'showSharePanel',
}
export const hideHomeButton = {
  name: 'hideBackHome',
}
export const saveImageToPhotosAlbum = {
  name: 'saveImage',
  args: {
    filePath: 'url',
  },
}
export const saveVideoToPhotosAlbum = {
  args: {
    filePath: 'src',
  },
}
export const chooseAddress = {
  name: 'getAddress',
  returnValue(fromRes: Record<string, any>, toRes: UniApp.ChooseAddressRes) {
    const info = fromRes.result || {}
    toRes.userName = info.fullname
    toRes.countyName = info.country
    toRes.provinceName = info.prov
    toRes.cityName = info.city
    toRes.detailInfo = info.address
    toRes.telNumber = info.mobilePhone
    toRes.errMsg = toRes.errMsg + ' ' + fromRes.resultStatus
  },
}
