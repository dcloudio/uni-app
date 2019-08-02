
#### 生物认证

生物认证，又称活体检测。它包含指纹识别、人脸识别这两部分。即通过人体身体特征来进行身份认证识别。

各平台开发方式暂未统一，使用时需注意用[条件编译](https://uniapp.dcloud.io/platform)调用不同平台的代码。

##### 微信小程序
支持指纹和人脸识别两部分，[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/wx.startSoterAuthentication.html)

##### App平台
- 指纹：html5plus已经内置指纹API，[规范详情](http://www.html5plus.org/doc/zh_cn/fingerprint.html)。在插件市场有一个封装好的微信和App的指纹识别插件：[https://ext.dcloud.net.cn/plugin?id=358](https://ext.dcloud.net.cn/plugin?id=358)
- 人脸识别：app引擎未内置，需要安装原生插件，详见[插件市场人脸识别插件](https://ext.dcloud.net.cn/search?q=%E4%BA%BA%E8%84%B8%E8%AF%86%E5%88%AB)

##### 支付宝小程序
只支持人脸识别，[规范详情](https://docs.alipay.com/mini/api/alipay-face-verify)

##### 百度小程序
只支持人脸识别，[规范详情](https://smartprogram.baidu.com/docs/develop/api/ai_face/#swan-ai-faceDetect/)