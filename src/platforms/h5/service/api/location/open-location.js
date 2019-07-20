/**
 * 查看位置
 * @param {*} param0
 * @param {*} callbackId
 */
export function openLocation ({
  latitude,
  longitude,
  scale,
  name,
  address
}, callbackId) {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge

  getApp().$router.push({
    type: 'navigateTo',
    path: '/open-location',
    query: {
      latitude,
      longitude,
      scale,
      name,
      address
    }
  }, function () {
    invoke(callbackId, {
      errMsg: 'openLocation:ok'
    })
  }, function () {
    invoke(callbackId, {
      errMsg: 'openLocation:fail'
    })
  })
}
