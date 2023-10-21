/**
 * 打开文档
 * @param {*} param0
 * @param {*} callbackId
 */
export function openDocument ({
  filePath
}, callbackId) {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  window.open(filePath)
  invoke(callbackId, {
    errMsg: 'openDocument:ok'
  })
}
