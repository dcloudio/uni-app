/**
 * 选择位置
 * @param {*} callbackId
 */
export function chooseLocation (options, callbackId) {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  getApp().$router.push({
    type: 'navigateTo',
    path: '/choose-location'
  }, function () {
    var fn = data => {
      UniServiceJSBridge.unsubscribe('onChooseLocation', fn)
      if (data) {
        invoke(callbackId, Object.assign(data, {
          errMsg: 'chooseLocation:ok'
        }))
      } else {
        invoke(callbackId, {
          errMsg: 'chooseLocation:fail'
        })
      }
    }
    UniServiceJSBridge.subscribe('onChooseLocation', fn)
  }, function () {
    invoke(callbackId, {
      errMsg: 'chooseLocation:fail'
    })
  })
}
