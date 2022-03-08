const {
  invokeCallbackHandler: invoke
} = UniServiceJSBridge

export function previewImage ({
  urls,
  current
}, callbackId) {
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

export function closePreviewImage (_, callbackId) {
  const $router = getApp().$router
  if ($router.history.current.path === '/preview-image') {
    $router.back()
    invoke(callbackId, {
      errMsg: 'closePreviewImage:ok'
    })
  } else {
    invoke(callbackId, {
      errMsg: 'closePreviewImage:fail'
    })
  }
}
