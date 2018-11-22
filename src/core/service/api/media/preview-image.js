export function previewImage ({
  urls,
  current
}, callbackId) {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge

  getApp().$router.push({
    type: 'navigateTo',
    path: '/preview-image',
    params: {
      urls,
      current
    }
  }, function () {
    invoke(callbackId, {
      errMsg: 'previewImage:ok'
    })
  }, function () {
    invoke(callbackId, {
      errMsg: 'previewImage:fail'
    })
  })
}
