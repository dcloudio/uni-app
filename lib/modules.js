module.exports = {
  base: {
    title: '基础',
    api: [
      'upx2px',
      'base64ToArrayBuffer',
      'arrayBufferToBase64'
    ]
  },
  network: {
    title: '网络',
    api: [
      'request',
      'connectSocket',
      'sendSocketMessage',
      'closeSocket',
      'onSocketOpen',
      'onSocketError',
      'onSocketMessage',
      'onSocketClose',
      'downloadFile',
      'uploadFile'
    ]
  },
  route: {
    title: '路由',
    api: [
      'navigateTo',
      'redirectTo',
      'reLaunch',
      'switchTab',
      'navigateBack'
    ]
  },
  storage: {
    title: '数据缓存',
    api: [
      'setStorage',
      'setStorageSync',
      'getStorage',
      'getStorageSync',
      'removeStorage',
      'removeStorageSync',
      'clearStorage',
      'clearStorageSync',
      'getStorageInfo',
      'getStorageInfoSync',
    ]
  },
  location: {
    title: '位置',
    api: [
      'getLocation',
      'openLocation',
      'chooseLocation'
    ]
  },
  media: {
    title: '媒体',
    api: [
      'chooseImage',
      'previewImage',
      'getImageInfo',
      'saveImageToPhotosAlbum',
      'compressImage',
      'getRecorderManager',
      'getBackgroundAudioManager',
      'createInnerAudioContext',
      'chooseVideo',
      'saveVideoToPhotosAlbum',
      'createVideoContext',
      'createCameraContext',
      'createLivePlayerContext'
    ]
  },
  device: {
    title: '设备',
    api: [
      'getSystemInfo',
      'getSystemInfoSync',
      'canIUse',
      'onMemoryWarning',
      'getNetworkType',
      'onNetworkStatusChange',
      'onAccelerometerChange',
      'startAccelerometer',
      'stopAccelerometer',
      'onCompassChange',
      'startCompass',
      'stopCompass',
      'onGyroscopeChange',
      'startGyroscope',
      'stopGyroscope',
      'makePhoneCall',
      'scanCode',
      'setClipboardData',
      'getClipboardData',
      'setScreenBrightness',
      'getScreenBrightness',
      'setKeepScreenOn',
      'onUserCaptureScreen',
      'vibrateLong',
      'vibrateShort',
      'addPhoneContact',
      'openBluetoothAdapter',
      'startBluetoothDevicesDiscovery',
      'onBluetoothDeviceFound',
      'stopBluetoothDevicesDiscovery',
      'onBluetoothAdapterStateChange',
      'getConnectedBluetoothDevices',
      'getBluetoothDevices',
      'getBluetoothAdapterState',
      'closeBluetoothAdapter',
      'writeBLECharacteristicValue',
      'readBLECharacteristicValue',
      'onBLEConnectionStateChange',
      'onBLECharacteristicValueChange',
      'notifyBLECharacteristicValueChange',
      'getBLEDeviceServices',
      'getBLEDeviceCharacteristics',
      'createBLEConnection',
      'closeBLEConnection',
      'onBeaconServiceChange',
      'onBeaconUpdate',
      'getBeacons',
      'startBeaconDiscovery',
      'stopBeaconDiscovery'
    ]
  },
  ui: {
    title: '界面',
    api: [
      'showToast',
      'hideToast',
      'showLoading',
      'hideLoading',
      'showModal',
      'showActionSheet',
      'setNavigationBarTitle',
      'setNavigationBarColor',
      'showNavigationBarLoading',
      'hideNavigationBarLoading',
      'setTabBarItem',
      'setTabBarStyle',
      'hideTabBar',
      'showTabBar',
      'setTabBarBadge',
      'removeTabBarBadge',
      'showTabBarRedDot',
      'hideTabBarRedDot',
      'setBackgroundColor',
      'setBackgroundTextStyle',
      'createAnimation',
      'pageScrollTo',
      'onWindowResize',
      'offWindowResize',
      'loadFontFace',
      'startPullDownRefresh',
      'stopPullDownRefresh',
      'createSelectorQuery',
      'createIntersectionObserver',
      'hideKeyboard'
    ]
  },
  event: {
    title: '页面通讯',
    api: [
      '$emit',
      '$on',
      '$once',
      '$off'
    ]
  },
  file: {
    title: '文件',
    api: [
      'saveFile',
      'getSavedFileList',
      'getSavedFileInfo',
      'removeSavedFile',
      'getFileInfo',
      'openDocument',
      'getFileSystemManager'
    ]
  },
  canvas: {
    title: '绘画',
    api: [
      'createOffscreenCanvas',
      'createCanvasContext',
      'canvasToTempFilePath',
      'canvasPutImageData',
      'canvasGetImageData'
    ]
  },
  third: {
    title: '第三方服务',
    api: [
      'getProvider',
      'login',
      'checkSession',
      'getUserInfo',
      'share',
      'showShareMenu',
      'hideShareMenu',
      'requestPayment',
      'subscribePush',
      'unsubscribePush',
      'onPush',
      'offPush',
      'requireNativePlugin'
    ]
  }
}
