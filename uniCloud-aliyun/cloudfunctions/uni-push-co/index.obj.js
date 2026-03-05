module.exports = {
	async sendPushMessage(cid) {
    // 防止非法调用
    if (!cid) {
      throw new Error('请传入推送客户端ID')
    }
    if (typeof cid !== 'string') {
      throw new Error('推送客户端ID必须为字符串')
    }
    const pushManager = uniCloud.getPushManager({appId: '__UNI__HelloUniAppX'})
    const res = await pushManager.sendMessage({
      push_clientid: cid,
      title: '测试推送标题',
      content: '测试推送内容',
      payload: {
        data: '测试推送数据'
      }
    })
    return res
  }
}
