const base = [
  'base64ToArrayBuffer',
  'arrayBufferToBase64',
  'addInterceptor',
  'removeInterceptor'
]

const network = [
  'request',
  'uploadFile',
  'downloadFile',
  'connectSocket',
  'onSocketOpen',
  'onSocketError',
  'sendSocketMessage',
  'onSocketMessage',
  'closeSocket',
  'onSocketClose'
]

const route = [
  'navigateTo',
  'redirectTo',
  'reLaunch',
  'switchTab',
  'navigateBack'
]

const storage = [
  'setStorage',
  'setStorageSync',
  'getStorage',
  'getStorageSync',
  'getStorageInfo',
  'getStorageInfoSync',
  'removeStorage',
  'removeStorageSync',
  'clearStorage',
  'clearStorageSync'
]

const location = [
  'getLocation',
  'chooseLocation',
  'openLocation',
  'createMapContext'
]

const media = [
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

const device = [
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
  'stopBeaconDiscovery',
  'checkIsSupportSoterAuthentication',
  'checkIsSoterEnrolledInDevice',
  'startSoterAuthentication'
]

const keyboard = [
  'hideKeyboard',
  'onKeyboardHeightChange'
]

const ui = [
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
  'onTabBarMidButtonTap',
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
  'createIntersectionObserver'
]

const event = [
  '$emit',
  '$on',
  '$once',
  '$off'
]

const file = [
  'saveFile',
  'getSavedFileList',
  'getSavedFileInfo',
  'removeSavedFile',
  'getFileInfo',
  'openDocument',
  'getFileSystemManager'
]

const canvas = [
  'createOffscreenCanvas',
  'createCanvasContext',
  'canvasToTempFilePath',
  'canvasPutImageData',
  'canvasGetImageData'
]

const third = [
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
  'requireNativePlugin',
  'upx2px',
  'restoreGlobal',
  'getSubNVueById',
  'getCurrentSubNVue'
]

const apis = [
  ...base,
  ...network,
  ...route,
  ...storage,
  ...location,
  ...media,
  ...device,
  ...keyboard,
  ...ui,
  ...event,
  ...file,
  ...canvas,
  ...third
]

module.exports = apis
