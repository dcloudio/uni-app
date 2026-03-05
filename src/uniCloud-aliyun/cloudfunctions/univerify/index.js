'use strict';
exports.main = async function(event, context) {
  const res = await uniCloud.getPhoneNumber({
    appid: context.appId, // 替换成自己开通一键登录的应用的DCloud appid
    provider: 'univerify',
    access_token: event.access_token,
    openid: event.openid
  })
  // 执行入库等操作，正常情况下不要把完整手机号返回给前端
  return {
    errCode: 0,
    errMsg: '获取手机号成功',
    res: res
  }
}
