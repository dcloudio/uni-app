#### voice

voice 包括语言识别和语音朗读两部分。

仅百度小程序平台、App平台支持，各平台开发方式暂未统一，使用时需注意用[条件编译](https://uniapp.dcloud.io/platform)调用不同平台的代码。

百度小程序平台支持语音识别，参考：[规范详情](https://smartprogram.baidu.com/docs/develop/api/ai_voice/)

App 平台实现参考：

- 语音识别：支持科大讯飞语音识别和百度语音识别，云打包的话需要在manifest中勾选模块和App SDK配置，开发规范见：[https://www.html5plus.org/doc/zh_cn/speech.html](https://www.html5plus.org/doc/zh_cn/speech.html)，配置文档及讯飞百度的差别见：[https://ask.dcloud.net.cn/article/35059](https://ask.dcloud.net.cn/article/35059)
- 语音朗读：调用科大讯飞进行语音合成、tts朗读，参考[https://ask.dcloud.net.cn/article/1081](https://ask.dcloud.net.cn/article/1081)
