### uni.getUpdateManager()

本API返回**全局唯一**的版本更新管理器对象： updateManager，用于管理小程序更新。

App的更新不使用本API，另见文档：
- 整包更新：[https://ask.dcloud.net.cn/article/34972](https://ask.dcloud.net.cn/article/34972)
- 资源文件热更新(wgt升级)：[https://ask.dcloud.net.cn/article/35667](https://ask.dcloud.net.cn/article/35667)

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|√|

**updateManager 对象的方法列表：**

|方法				|参数		|说明															|
|---|---|---|
|onCheckForUpdate	|callback	|当向小程序后台请求完新版本信息，会进行回调						|
|onUpdateReady		|callback	|当新版本下载完成，会进行回调									|
|onUpdateFailed		|callback	|当新版本下载失败，会进行回调									|
|applyUpdate		|			|当新版本下载完成，调用该方法会强制当前小程序应用上新版本并重启	|

**onCheckForUpdate(callback) 回调结果说明：**

|属性|类型|说明|
|---|---|---|
|hasUpdate|Boolean|是否有新的版本	|

**代码示例**

```javascript
const updateManager = uni.getUpdateManager();

updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log(res.hasUpdate);
});

updateManager.onUpdateReady(function (res) {
  uni.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success(res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate();
      }
    }
  });

});

updateManager.onUpdateFailed(function (res) {
  // 新的版本下载失败
});
```