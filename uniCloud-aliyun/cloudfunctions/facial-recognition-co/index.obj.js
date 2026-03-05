// 注意本文件为实人认证API示例代码，如需在业务中使用需补充业务逻辑，比如用户需要登录才能使用实人认证、限制每个用户每天能实人认证的次数等
module.exports = {
  _before() {
    this.frvManager = uniCloud.getFacialRecognitionVerifyManager({
      requestId: this.getUniCloudRequestId()
    })
  },
  async getCertifyId({
    realName,
    idCard,
    metaInfo
  } = {}) {
    const result = await this.frvManager.getCertifyId({
      realName,
      idCard,
      metaInfo
    })
    return result
  },
  async getAuthResult(certifyId) {
    const result = await this.frvManager.getAuthResult({
      certifyId
    })
    return result
  }
}