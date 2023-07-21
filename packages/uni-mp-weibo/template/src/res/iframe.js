
 /**
  * Callbacks
  */
 class Callbacks {
  constructor () {
    this.uid = 1
    this.callbacks = {}
  }
  /**
   * 添加回调
   * @param fn - 回调函数
   * @param ctx - this绑定
   */
  add (callback) {
    const id = String(this.uid++)
    this.callbacks[id] = callback
    return id
  }
  get (id) {
   return this.callbacks[id]
  }
  /**
   * 移除回调函数通过id
   * @param id - add返回的回调id
   */
 remove (id) {
    const callback = this.callbacks[id]
    if (callback) {
      delete this.callbacks[id]
    }
  }
  /** 
   * 移除所有的回调 
   * */
  destroy () {
    this.callbacks = {}
  }
  /** 
   * 调用回调函数通过id和参数
   * */
  call (id, data, type) {
    const callback = this.callbacks[id]
    if (callback) {
     if (callback[type] && typeof callback[type] === 'function') {
       try {
         return callback[type](data)
       } catch (e) {
         console.error(e, 'call callback error')
       }
     }
    } else {
     console.error(`callback Id(${id}) not found, args is ${JSON.stringify(data)}`)
    }
  }   

  /** 
   * 判断当前callback类型  true : 回调函数类型  false :  Promise / async await类型 
   * */
  isCallback (id) {
    const callback = this.callbacks[id]
    return callback.success || callback.fail || callback.complete
  }
}
  const callback = new Callbacks()
  const STORAGE_KEYS = 'uni-storage-keys'
  let service_storageInfo = ""
  const callErrorrCallBackFunc = (e) => {
    if(errorCallBackFunc && typeof errorCallBackFunc === 'function') {
      errorCallBackFunc(e.error)
    }
   }
 /**
  * 处理异步调用方法 
  * a. 回调函数模式 
  * b. Promise / async await 模式 (区分Vue2 Vue3)
 */
 const postMessage = (eventName, data) => {
   let id;
   if (data && typeof data === 'object') {
    if(data.fail && typeof data.fail === 'function') {
      const originalFail = data.fail
      data.fail = (err) => {
        originalFail(err)
        callErrorrCallBackFunc(err)
      }
    } else {
      data.fail = callErrorrCallBackFunc
    }
    if (data.success || data.fail || data.complete) {
       const {success, fail, complete} = { ...data }
       delete data.success
       delete data.fail
       delete data.complete
       const callbacks = {success, fail, complete}
       id = callback.add(callbacks)
       window.parent.postMessage({ eventName, id, data }, '*');
     } else {
       // if Vue3
       return new Promise((resolve, reject) => {
         const callbacks = {"success": resolve, "fail": reject}
         id = callback.add(callbacks)
         window.parent.postMessage({ eventName, id, data }, '*');  
       })
 
       // if Vue2
      //  return new Promise((resolve) => {
      //    const callbacks = { "resolve": resolve }
      //    id = callback.add(callbacks)
      //    window.parent.postMessage({ eventName, id, data }, '*');  
      //  })
     }
   } else if (data && typeof data === 'function') {
     id = callback.add({ 'success': data })
     window.parent.postMessage({ eventName, id }, '*');
   } else {
    window.parent.postMessage({ eventName, id, data }, '*');
   }
 }
 
 // 执行不同异步类型callback
 const callCallbackFun = (item) => {
   const {id, data, type} = item
   let isCallback = callback.isCallback(id)
   if (isCallback) {
     callback.call(id, data, type)
  } else {
    // if Vue3
    callback.call(id, data, type)

    // if Vue2
    //  if (type !== 'complete') {
    //    let res = [null, null]
    //    if (type === 'success') {
    //      res[1] = data
    //    } else {
    //      res[0] = data
    //    }
    //    callback.call(id, res, 'resolve')
    //  }
  }
}
// 处理ios弹性问题 
document.documentElement.style.overflow = "auto"

/**
* Hook uniapp api 
* */
//基础
window.uni.canIUse = function (data) {
  console.log('1 拦截 uni api', data)
  if(window.uni[data]) {
    return true
  } else {
    return false
  }
}
// 
window.uni.getDeviceInfo = function (data) {
  return deviceInfo
}

// 网络
window.uni.request = function (data) {
console.log('1 拦截 uni api', data)
return postMessage('request', data)
}
window.uni.uploadFile = function (data) {
console.log('1 拦截 uni api', data)
return postMessage('uploadFile', data)
}
window.uni.downloadFile = function (data) {
if (!data.filePath) {
  data.filePath = `image${parseInt(Math.random()*6000)}.jpg`
}
data.filePath = `res/h5/${data.filePath}`
console.log('1 拦截 uni api', data)
return postMessage('downloadFile', data)
}
window.uni.connectSocket = function (data) {
console.log('1 拦截 uni api', data)
return postMessage('connectSocket', data)
}

// 路由
window.uni.navigateTo = function (data) {
 console.log('1 拦截 uni api', data)
 return postMessage('navigateTo', data)
}
window.uni.redirectTo = function (data) {
 console.log('1 拦截 uni api', data)
 return postMessage('redirectTo', data)
}
// setTimeout(() => {
// window.uni = {}
// window.uni.redirectTo = function (data) {
//   console.log('1 拦截 uni api', data)
//   return postMessage('redirectTo', data)
// }
// }, 50)
 window.uni.reLaunch = function (data) {
   console.log('1 拦截 uni api', data)
   return postMessage('reLaunch', data)
 }
 window.weibo = {}
 window.weibo.switchTab = function (data) {
  if(data && data.detail && data.detail.text) {
    return postMessage('setNavigationBarTitle', {
      title: data.detail.text
    })
  }
 }
 window.uni.navigateBack = function (data) {
   console.log('1 拦截 uni api', data)
   return postMessage('navigateBack', data)
 }
 
 //数据缓存
window.uni.setStorage = function (data) {
  console.log('1 拦截 uni api', data)
  localStorage.setItem(data.key, data.data)
  getStorageInfo()
  return postMessage('setStorage', data)
}
window.uni.setStorageSync = function (data) {
  console.log('1 拦截 uni api', data)
  let [key, val] = data
  localStorage.setItem(key, val)
  getStorageInfo()
  postMessage('setStorage', {key, data: val})
}

window.uni.getStorage = function (data) {
  console.log('1 拦截 uni api', data)
  return postMessage('getStorage', data)
}
window.uni.getStorageSync = function (key) {
  console.log('1 拦截 uni api', key)
  return localStorage.setItem(key)
}

window.uni.getStorageInfo = function (data) {
  console.log('1 拦截 uni api', data)
  return postMessage('getStorageInfo', data)
}

window.uni.getStorageInfoSync = function () {
  console.log('1 拦截 uni api')
  return service_storageInfo
}

window.uni.removeStorage = function (data) {
  console.log('1 拦截 uni api removeStorage', data)
  localStorage.remove(data.key)
  getStorageInfo()
  return postMessage('removeStorage', data)
}
window.uni.removeStorageSync = function (data) {
  console.log('1 拦截 uni api removeStorageSync', key)
  let [key] = data
  localStorage.remove(key)
  getStorageInfo()
  postMessage('removeStorage', { key })
}

window.uni.clearStorage = function () {
  console.log('1 拦截 uni api')
  localStorage.clear()
  getStorageInfo()
  return postMessage('clearStorage')
}
window.uni.clearStorageSync = function () {
  console.log('1 拦截 uni api')
  localStorage.clear()
  getStorageInfo()
  postMessage('clearStorage')
}
 
 // 位置
 window.uni.getLocation = function (data) {
   console.log('1 拦截 uni api', data)
   return postMessage('getLocation', data)
 }
 
 // 媒体
window.uni = {
...window.uni, 
'chooseImage': function (data) {
  console.log('1 拦截 uni api', 'chooseImage', data)
  return postMessage('chooseImage', data)
}
}
window.uni.previewImage = function (data) {
console.log('1 拦截 uni api', 'previewImage', data)
return postMessage('previewImage', data)
}
window.uni.getImageInfo = function (data) {
console.log('1 拦截 uni api', 'getImageInfo', data)
return postMessage('getImageInfo', data)
}
window.uni.saveImageToPhotosAlbum = function (data) {
console.log('1 拦截 uni api', 'saveImageToPhotosAlbum', data)
return postMessage('saveImageToPhotosAlbum', data)
}

//设备 - 系统
window.uni.getSystemInfo = function (data) {
 console.log('1 拦截 uni api', 'getSystemInfo', data)
 return postMessage('getSystemInfo', data)
}
window.uni.getSystemInfoSync = function() {
  return systemInfo
}
window.uni.openAppAuthorizeSetting = function (data) {
 console.log('1 拦截 uni api', 'openAppAuthorizeSetting', data)
 return postMessage('openAppAuthorizeSetting', data)
}

// 网络状态
window.uni.onNetworkStatusChange = function (data) {
 console.log('1 拦截 uni api', 'onNetworkStatusChange', data)
 return postMessage('onNetworkStatusChange', data)
}

// 加速度计
window.uni.startAccelerometer = function (data) {
console.log('1 拦截 uni api', 'startAccelerometer', data)
return postMessage('startAccelerometer', data)
}
window.uni.stopAccelerometer = function (data) {
console.log('1 拦截 uni api', 'stopAccelerometer', data)
return postMessage('stopAccelerometer', data)
}

// 键盘
const wbxKeyboardHeightChangeListeners = {}
window.uni.onKeyboardHeightChange = function (listener) {
  console.log('1 拦截 uni api', 'onKeyboardHeightChange', listener)
  const wbxListener = e => listener(e.detail)
  wbxKeyboardHeightChangeListeners[listener] = wbxListener
  window.parent.document.body.addEventListener('keyboardheightchange', wbxListener)
}
window.uni.offKeyboardHeightChange = function (listener) {
  console.log('1 拦截 uni api', 'offKeyboardHeightChange', listener)
  const wbxListener = wbxKeyboardHeightChangeListeners[listener]
  window.parent.document.body.removeEventListener('keyboardheightchange', wbxListener)
}

// 拨打电话
window.uni.makePhoneCall = function (data) {
console.log('1 拦截 uni api', 'makePhoneCall', data)
return postMessage('makePhoneCall', data)
}


// 扫码
window.uni.scanCode = function (data) {
console.log('1 拦截 uni api', 'scanCode',  data)
return postMessage('scanCode', data)
}
// 剪贴板
window.uni.setClipboardData = function (data) {
console.log('1 拦截 uni api', 'setClipboardData', data)
return postMessage('setClipboardData',  data)
}
window.uni.getClipboardData = function (data) {
console.log('1 拦截 uni api', 'getClipboardData',  data)
return postMessage('getClipboardData', data)
}

// 震动
window.uni.vibrateShort = function (data) {
console.log('1 拦截 uni api', 'vibrateShort', data)
return postMessage('vibrateShort', data)
}
window.uni.vibrateLong = function (data) {
console.log('1 拦截 uni api', 'vibrateLong', data)
return postMessage('vibrateLong', data)
}

// 界面-交互反馈
window.uni.showToast = function (data) {
 console.log('1 拦截 uni api', 'showToast', data)
 return postMessage('showToast', data)
}
window.uni.hideToast = function (data) {
 console.log('1 拦截 uni api', 'hideToast', data)
 return postMessage('hideToast', data)
}
window.uni.showLoading = function (data) {
 console.log('1 拦截 uni api', 'showLoading', data)
 return postMessage('showLoading', data)
}
window.uni.hideLoading = function (data) {
 console.log('1 拦截 uni api', 'hideLoading', data)
 return postMessage('hideLoading', data)
}
window.uni.showModal = function (data) {
 console.log('1 拦截 uni api', 'showModal', data)
 return postMessage('showModal', data)
}
window.uni.showActionSheet = function (data) {
 console.log('1 拦截 uni api', 'showActionSheet', data)
 return postMessage('showActionSheet', data)
}

// 设置导航条
window.uni.setNavigationBarTitle = function (data) {
 console.log('1 拦截 uni api', 'setNavigationBarTitle', data)
 return postMessage('setNavigationBarTitle', data)
}
window.uni.setNavigationBarColor = function (data) {
console.log('1 拦截 uni api', 'setNavigationBarColor', data)
return postMessage('setNavigationBarColor', data)
}

// 背景
window.uni.setBackgroundColor = function (data) {
console.log('1 拦截 uni api', 'setBackgroundColor', data)
return postMessage('setBackgroundColor', data)
}

// 滚动
//  window.uni.pageScrollTo = function (data) {
//   console.log('1 拦截 uni api', 'pageScrollTo', data)
//   return postMessage('pageScrollTo', data)
//  }

// 文件
window.uni.saveFile = function (data) {
console.log('1 拦截 uni api', 'saveFile', data)
return postMessage('saveFile', data)
}
window.uni.getSavedFileList = function (data) {
console.log('1 拦截 uni api', 'getSavedFileList', data)
return postMessage('getSavedFileList', data)
}
window.uni.getSavedFileInfo = function (data) {
console.log('1 拦截 uni api', 'getSavedFileInfo', data)
return postMessage('getSavedFileInfo', data)
}
window.uni.removeSavedFile = function (data) {
console.log('1 拦截 uni api', 'removeSavedFile',  data)
return postMessage('removeSavedFile', data)
}
window.uni.getFileInfo = function (data) {
console.log('1 拦截 uni api', 'getFileInfo', data)
return postMessage('getFileInfo', data)
}    
// 登录
window.uni.login = function (data) {
console.log('1 拦截 uni api', 'login', data)
return postMessage('login', data)
} 
window.uni.checkSession = function (data) {
console.log('1 拦截 uni api', 'checkSession', data)
return postMessage('checkSession', data)
}
window.uni.getUserInfo = function (data) {
console.log('1 拦截 uni api', 'getUserInfo', data)
return postMessage('getUserInfo', data)
}

// 分享
window.uni.share = function (data) {
console.log('1 拦截 uni api', 'share', data)
return postMessage('share', data)
}
window.uni.sendShareMessage = function (data){
console.log('1 拦截 uni api', 'sendShareMessage', data)
return postMessage('sendShareMessage', data)
}
// 应用级事件
window.uni.onAppShow = function(data) {
  return postMessage('onAppShow', data)
}
window.uni.onAppHide = function(data) {
  return postMessage('onAppHide', data)
}
window.uni.offAppShow = function(data) {
  return postMessage('offAppShow', data)
}
window.uni.offAppHide = function(data) {
  return postMessage('offAppHide', data)
}

// 监听错误
let errorCallBackFunc
window.uni.onError = function(data) {
  errorCallBackFunc = data
}
window.uni.offError = function(data) {
  errorCallBackFunc = null
  data()
}


const listener = (e) => {
  console.log('3 执行uni api 回调', e)
  let data = e.data
  switch (data.eventName) {
    // 基础
    case 'caniuse': 
    // 网络
    case 'request':
    case 'uploadFile':
    case 'downloadFile':
    case 'connectSocket':
    // 路由
    case 'navigateTo':
    case 'redirectTo':
    case 'reLaunch':
    case 'switchTab':
    case 'navigateBack':
    // 数据缓存
    case 'setStorage':
    case 'getStorage':
    case 'getStorageInfo':
    case 'removeStorage':
    case 'clearStorage':
    // 位置
    case 'getLocation':
    // 媒体
    case 'chooseImage':
    case 'previewImage':
    case 'getImageInfo':
    case 'saveImageToPhotosAlbum':
    // 系统
    case 'getSystemInfo':
    case 'openAppAuthorizeSetting':
    // 网络状态
    case 'onNetworkStatusChange':
    // 加速度计
    case 'startAccelerometer':
    case 'stopAccelerometer':
    // 拨打电话
    case 'makePhoneCall':
    // 键盘
    case 'onKeyboardHeightChange':
    case 'offKeyboardHeightChange':
    // 扫码
    case 'scanCode':
    // 剪贴板
    case 'setClipboardData':
    case 'getClipboardData':
    // 震动
    case 'vibrateShort':
    case 'vibrateLong':
    // 界面-交互反馈
    case 'showToast':
    case 'hideToast':
    case 'showLoading':
    case 'hideLoading':
    case 'showModal':
    case 'showActionSheet':
    // 设置导航条
    case 'setNavigationBarTitle':
    case 'setNavigationBarColor':
    // 背景
    case 'setBackgroundColor':
    // 滚动
    case 'pageScrollTo':
    // 文件
    case 'saveFile':
    case 'getSavedFileList':
    case 'getSavedFileInfo':
    case 'removeSavedFile':
    case 'getFileInfo':
    // 登录
    case 'login':
    case 'checkSession':
    // 获取用户信息
    case 'getUserInfo':
    case 'getDeviceInfo':
    case 'getSystemInfoSync':

    case 'onAppShow':
    case 'onAppHide':
    case 'offAppShow': 
    case 'offAppHide': 
      callCallbackFun(data)
      break;
  }
}

let deviceInfo = {}
let systemInfo = {}
postMessage('getSystemInfoSync', {
  success: (res)=> {
    systemInfo = res
  }
});
// 当StorageInfo改变后获取 StorageInfo
const getStorageInfo = () => {
  postMessage('getStorageInfoSync', {
    success: (res)=> {
      service_storageInfo = res
    }
  })
}
getStorageInfo()
postMessage('getDeviceInfo', {
  success: (res)=> {
    deviceInfo = res
  }
})
/**
* 接收小程序发送的data消息
* */
window.addEventListener('message', listener)
window.addEventListener('error', callErrorrCallBackFunc)
