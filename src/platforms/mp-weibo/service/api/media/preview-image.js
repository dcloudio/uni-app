const {
  emit,
  invokeCallbackHandler: invoke
} = UniServiceJSBridge

export function previewImage (args, callbackId) {
  emit('onShowPreviewImage', args, function (res) {
    invoke(callbackId, {
      errMsg: 'previewImage:ok'
    })
  })
}

export function closePreviewImage (_, callbackId) {
  emit('onClosePreviewImage', function () {
    invoke(callbackId, {
      errMsg: 'closePreviewImage:ok'
    })
  })
}
