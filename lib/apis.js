const base = [
  'base64ToArrayBuffer',
  'arrayBufferToBase64',
  'addInterceptor',
  'removeInterceptor',
  'interceptors'
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
  'onSocketClose',
  'getUpdateManager',
  'configMTLS'
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
  'chooseFile',
  'previewImage',
  'closePreviewImage',
  'getImageInfo',
  'getVideoInfo',
  'saveImageToPhotosAlbum',
  'compressImage',
  'compressVideo',
  'getRecorderManager',
  'getBackgroundAudioManager',
  'createAudioContext',
  'createInnerAudioContext',
  'chooseVideo',
  'saveVideoToPhotosAlbum',
  'createVideoContext',
  'createCameraContext',
  'createLivePlayerContext',
  'createLivePusherContext'
]

const device = [
  'getSystemInfo',
  'getSystemInfoSync',
  'canIUse',
  'onMemoryWarning',
  'getNetworkType',
  'onNetworkStatusChange',
  'offNetworkStatusChange',
  'onAccelerometerChange',
  'offAccelerometerChange',
  'startAccelerometer',
  'stopAccelerometer',
  'onCompassChange',
  'offCompassChange',
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
  'setBLEMTU',
  'getBLEDeviceRSSI',
  'onBeaconServiceChange',
  'onBeaconUpdate',
  'getBeacons',
  'startBeaconDiscovery',
  'stopBeaconDiscovery',
  'checkIsSupportSoterAuthentication',
  'checkIsSoterEnrolledInDevice',
  'startSoterAuthentication',
  'onThemeChange',
  'onUIStyleChange'
]

const keyboard = [
  'hideKeyboard',
  'onKeyboardHeightChange',
  'offKeyboardHeightChange',
  'getSelectedTextRange'
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
  'createIntersectionObserver',
  'createMediaQueryObserver',
  'getMenuButtonBoundingClientRect',
  'showTopWindow',
  'showLeftWindow',
  'showRightWindow',
  'hideTopWindow',
  'hideLeftWindow',
  'hideRightWindow',
  'getTopWindowStyle',
  'getLeftWindowStyle',
  'getRightWindowStyle',
  'setTopWindowStyle',
  'setLeftWindowStyle',
  'setRightWindowStyle',
  'getLocale',
  'setLocale',
  'onLocaleChange'
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
  'getUserProfile',
  'preLogin',
  'closeAuthView',
  'getCheckBoxState',
  'getUniverifyManager',
  'share',
  'shareWithSystem',
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
  'requireGlobal',
  'getSubNVueById',
  'getCurrentSubNVue',
  'setPageMeta',
  'onHostEventReceive',
  'onNativeEventReceive',
  'sendNativeEvent',
  'preloadPage',
  'unPreloadPage',
  'loadSubPackage',
  'sendHostEvent',
  'navigateToMiniProgram'
]

const ad = [
  'createRewardedVideoAd',
  'createFullScreenVideoAd',
  'createInterstitialAd',
  'createInteractiveAd'
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
  ...third,
  ...ad
]

module.exports = apis
