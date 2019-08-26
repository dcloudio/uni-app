const mpBase = require('./mp-base')
const mpWeixin = require('./mp-weixin')
const mpBaidu = require('./mp-baidu')
const mpAlipay = require('./mp-alipay')
const mpToutiao = require('./mp-toutiao')

module.exports = {
  'app-plus': Object.assign({
    name: 'app-plus'
  }, mpBase, mpWeixin),
  'mp-weixin': Object.assign({
    name: 'mp-weixin'
  }, mpBase, mpWeixin),
  'mp-qq': Object.assign({
    name: 'mp-qq'
  }, mpBase, mpWeixin),
  'mp-baidu': Object.assign({
    name: 'mp-baidu'
  }, mpBase, mpBaidu),
  'mp-alipay': Object.assign({
    name: 'mp-alipay'
  }, mpBase, mpAlipay),
  'mp-toutiao': Object.assign({
    name: 'mp-toutiao'
  }, mpBase, mpToutiao)
}
