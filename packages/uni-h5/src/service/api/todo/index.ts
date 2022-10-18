import {
  API_SAVE_IMAGE_TO_PHOTOS_ALBUM,
  API_SAVE_VIDEO_TO_PHOTOS_ALBUM,
  API_TYPE_SAVE_IMAGE_TO_PHOTOS_ALBUM,
  API_TYPE_SAVE_VIDEO_TO_PHOTOS_ALBUM,
  createUnsupportedAsyncApi,
  createUnsupportedOnApi,
  createUnsupportedSyncApi,
  defineAsyncApi,
  defineOnApi,
  defineSyncApi,
} from '@dcloudio/uni-api'

export const saveImageToPhotosAlbum =
  defineAsyncApi<API_TYPE_SAVE_IMAGE_TO_PHOTOS_ALBUM>(
    API_SAVE_IMAGE_TO_PHOTOS_ALBUM,
    createUnsupportedAsyncApi(API_SAVE_IMAGE_TO_PHOTOS_ALBUM)
  )
const API_GET_RECORDER_MANAGER = 'getRecorderManager'
export const getRecorderManager = defineSyncApi<typeof uni.getRecorderManager>(
  API_GET_RECORDER_MANAGER,
  createUnsupportedSyncApi(API_GET_RECORDER_MANAGER)
)

export const saveVideoToPhotosAlbum =
  defineAsyncApi<API_TYPE_SAVE_VIDEO_TO_PHOTOS_ALBUM>(
    API_SAVE_VIDEO_TO_PHOTOS_ALBUM,
    createUnsupportedAsyncApi(API_SAVE_VIDEO_TO_PHOTOS_ALBUM)
  )

const API_CREATE_CAMERA_CONTEXT = 'createCameraContext'
export const createCameraContext = defineSyncApi<
  typeof uni.createCameraContext
>(
  API_CREATE_CAMERA_CONTEXT,
  createUnsupportedSyncApi(API_CREATE_CAMERA_CONTEXT)
)

const API_CREATE_LIVE_PLAYER_CONTEXT = 'createLivePlayerContext'
export const createLivePlayerContext = defineSyncApi<
  typeof uni.createLivePlayerContext
>(
  API_CREATE_LIVE_PLAYER_CONTEXT,
  createUnsupportedSyncApi(API_CREATE_LIVE_PLAYER_CONTEXT)
)

const API_SAVE_FILE = 'saveFile'
export const saveFile = defineAsyncApi<typeof uni.saveFile>(
  API_SAVE_FILE,
  createUnsupportedAsyncApi(API_SAVE_FILE)
)
const API_GET_SAVED_FILE_LIST = 'getSavedFileList'
export const getSavedFileList = defineAsyncApi<typeof uni.getSavedFileList>(
  API_GET_SAVED_FILE_LIST,
  createUnsupportedAsyncApi(API_GET_SAVED_FILE_LIST)
)
const API_GET_SAVED_FILE_INFO = 'getSavedFileInfo'
export const getSavedFileInfo = defineAsyncApi<typeof uni.getSavedFileInfo>(
  API_GET_SAVED_FILE_INFO,
  createUnsupportedAsyncApi(API_GET_SAVED_FILE_INFO)
)
const API_REMOVE_SAVED_FILE = 'removeSavedFile'
export const removeSavedFile = defineAsyncApi<typeof uni.removeSavedFile>(
  API_REMOVE_SAVED_FILE,
  createUnsupportedAsyncApi(API_REMOVE_SAVED_FILE)
)

const API_ON_MEMORY_WARNING = 'onMemoryWarning'
export const onMemoryWarning = defineOnApi<typeof uni.onMemoryWarning>(
  API_ON_MEMORY_WARNING,
  createUnsupportedOnApi(API_ON_MEMORY_WARNING)
)
const API_ON_GYROSCOPE_CHANGE = 'onGyroscopeChange'
export const onGyroscopeChange = defineOnApi<typeof uni.onGyroscopeChange>(
  API_ON_GYROSCOPE_CHANGE,
  createUnsupportedOnApi(API_ON_GYROSCOPE_CHANGE)
)
const API_START_GYROSCOPE = 'startGyroscope'
export const startGyroscope = defineAsyncApi<typeof uni.startGyroscope>(
  API_START_GYROSCOPE,
  createUnsupportedAsyncApi(API_START_GYROSCOPE)
)
const API_STOP_GYROSCOPE = 'stopGyroscope'
export const stopGyroscope = defineAsyncApi<typeof uni.stopGyroscope>(
  API_STOP_GYROSCOPE,
  createUnsupportedAsyncApi(API_STOP_GYROSCOPE)
)

const API_SCAN_CODE = 'scanCode'
export const scanCode = defineAsyncApi<typeof uni.scanCode>(
  API_SCAN_CODE,
  createUnsupportedAsyncApi(API_SCAN_CODE)
)

const API_SET_SCREEN_BRIGHTNESS = 'setScreenBrightness'
export const setScreenBrightness = defineAsyncApi<
  typeof uni.setScreenBrightness
>(
  API_SET_SCREEN_BRIGHTNESS,
  createUnsupportedAsyncApi(API_SET_SCREEN_BRIGHTNESS)
)

const API_GET_SCREEN_BRIGHTNESS = 'getScreenBrightness'
export const getScreenBrightness = defineAsyncApi<
  typeof uni.getScreenBrightness
>(
  API_GET_SCREEN_BRIGHTNESS,
  createUnsupportedAsyncApi(API_GET_SCREEN_BRIGHTNESS)
)

const API_SET_KEEP_SCREEN_ON = 'setKeepScreenOn'
export const setKeepScreenOn = defineAsyncApi<typeof uni.setKeepScreenOn>(
  API_SET_KEEP_SCREEN_ON,
  createUnsupportedAsyncApi(API_SET_KEEP_SCREEN_ON)
)
const API_ON_USER_CAPTURE_SCREEN = 'onUserCaptureScreen'
export const onUserCaptureScreen = defineOnApi<typeof uni.onUserCaptureScreen>(
  API_ON_USER_CAPTURE_SCREEN,
  createUnsupportedOnApi(API_ON_USER_CAPTURE_SCREEN)
)
const API_ADD_PHONE_CONTACT = 'addPhoneContact'
export const addPhoneContact = defineAsyncApi<typeof uni.addPhoneContact>(
  API_ADD_PHONE_CONTACT,
  createUnsupportedAsyncApi(API_ADD_PHONE_CONTACT)
)

const API_LOGIN = 'login'
export const login = defineAsyncApi<typeof uni.login>(
  API_LOGIN,
  createUnsupportedAsyncApi(API_LOGIN)
)
const API_GET_PROVIDER = 'getProvider'
export const getProvider = defineAsyncApi<typeof uni.getProvider>(
  API_GET_PROVIDER,
  createUnsupportedAsyncApi(API_GET_PROVIDER)
)

// TODO...

//   'openBluetoothAdapter',
//   'startBluetoothDevicesDiscovery',
//   'onBluetoothDeviceFound',
//   'stopBluetoothDevicesDiscovery',
//   'onBluetoothAdapterStateChange',
//   'getConnectedBluetoothDevices',
//   'getBluetoothDevices',
//   'getBluetoothAdapterState',
//   'closeBluetoothAdapter',
//   'writeBLECharacteristicValue',
//   'readBLECharacteristicValue',
//   'onBLEConnectionStateChange',
//   'onBLECharacteristicValueChange',
//   'notifyBLECharacteristicValueChange',
//   'getBLEDeviceServices',
//   'getBLEDeviceCharacteristics',
//   'createBLEConnection',
//   'closeBLEConnection',
//   'onBeaconServiceChange',
//   'onBeaconUpdate',
//   'getBeacons',
//   'startBeaconDiscovery',
//   'stopBeaconDiscovery',
//   'setBackgroundColor',
//   'setBackgroundTextStyle',
//   'checkSession',
//   'getUserInfo',
//   'share',
//   'onShareAppMessage',
//   'showShareMenu',
//   'hideShareMenu',
//   'requestPayment',
//   'subscribePush',
//   'unsubscribePush',
//   'onPush',
//   'offPush'
