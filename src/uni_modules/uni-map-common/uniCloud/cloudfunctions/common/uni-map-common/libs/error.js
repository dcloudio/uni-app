const errSubject = "uni-map-common";

class UniCloudError {
  constructor(options = {}) {
    this.errCode = options.errCode || options.code;
    this.errMsg = options.errMsg || options.msg || options.message || "";
    this.errSubject = options.subject || errSubject;
    if ((this.errCode === 110 && this.errMsg.indexOf("来源域名未被授权") > -1) || (this.errCode === 112 && this.errMsg.indexOf("INVALID_USER_IP") > -1)) {
      this.errMsg = `来源域名未被授权, 解决方法见：https://doc.dcloud.net.cn/uniCloud/uni-map-common.html#permission`;
    }
  }
}

module.exports = {
  UniCloudError
}
