const {
  invokeCallbackHandler: invoke
} = UniServiceJSBridge

export function base64ToTempFilePath ({
  base64Data,
  x,
  y,
  width,
  height,
  destWidth,
  destHeight,
  canvasId,
  fileType,
  quality
} = {}, callbackId) {
  invoke(callbackId, {
    errMsg: 'canvasToTempFilePath:ok',
    tempFilePath: base64Data
  })
}
