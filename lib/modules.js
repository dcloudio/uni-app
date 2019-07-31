module.exports = {
  base: {
    title: '基础',
    api: [
      'base64ToArrayBuffer',
      'arrayBufferToBase64'
    ]
  },
  network: {
    title: '网络',
    api: [
      'request'
      'connectSocket'
      'sendSocketMessage'
      'closeSocket'
      'onSocketOpen'
      'onSocketError'
      'onSocketMessage'
      'onSocketClose'
      'downloadFile'
      'uploadFile'
    ]
  },
  storage: {
    title: '数据缓存',
    api: [
      'setStorage'
      'setStorageSync'
      'getStorage'
      'getStorageSync'
      'removeStorage'
      'removeStorageSync'
      'clearStorage'
      'clearStorageSync'
      'getStorageInfo'
      'getStorageInfoSync'
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
  }
}
