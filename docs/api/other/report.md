#### 统计

各平台开发方式暂未统一，使用时需注意用[条件编译](https://uniapp.dcloud.io/platform)调用不同平台的代码。

##### 微信小程序平台：
- 数据上报：[wx.reportMonitor](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/report/wx.reportMonitor.html)
- 数据分析：[wx.reportAnalytics](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/data-analysis/wx.reportAnalytics.html)

##### 支付宝小程序平台：
- 自定义分析数据的上报接口：[my.reportAnalytics](https://docs.alipay.com/mini/api/report)

##### 百度小程序平台：
- 数据分析：[swan.reportAnalytics](https://smartprogram.baidu.com/docs/develop/api/data/#swan-reportAnalytics/)

##### App平台：
App平台有DCloud统计服务和友盟统计这两种。
- DCloud统计：[https://dcloud.io/unistat.html](https://dcloud.io/unistat.html)
- 友盟统计：[开发规范](http://www.html5plus.org/doc/zh_cn/statistic.html)，[配置文档](https://ask.dcloud.net.cn/article/74)