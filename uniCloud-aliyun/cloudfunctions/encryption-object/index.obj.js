// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
  _before() {
    const clientInfo = this.getClientInfo()
    const secretType = clientInfo.secretType
    const methodName = this.getMethodName()
    const clientInfos = uniCloud.getClientInfos()
    // methodName 是客户端调用的方法名
    // secretType 是客户端调用 uniCloud.importObject 传递的参数 secretMethods
    if (methodName === 'secureTest' && secretType !== 'both') {
      const error = new Error('客户端指定的secretType不为both，拒绝此次请求')
      error.code = 'INVALID_SECRET_TYPE'
      throw error // 拒绝本次请求
    }
  },
  secureTest() {
    return {
      returnBy: "encryption-object.secureTest"
    }
  }
}
