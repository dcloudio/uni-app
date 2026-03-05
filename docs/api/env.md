## uni.env

环境变量

uni.env提供了一些环境变量，主要是App和小程序文件系统相关的。理解这些环境需要参考文档：[文件系统](./file-system-spec.md)



### env 的属性值 @env-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| USER_DATA_PATH | string | 是 | - | Web: x; 微信小程序: 4.41; Android: 3.99; iOS: 4.11; HarmonyOS: 4.61 | 文件系统中的用户文件目录路径 |
| CACHE_PATH | string | 是 | - | Web: x; 微信小程序: x; Android: 3.99; iOS: 4.11; HarmonyOS: 4.61 | 文件系统中的缓存文件目录路径 |
| SANDBOX_PATH | string | 是 | - | Web: x; 微信小程序: x; Android: 3.99; iOS: 4.11; HarmonyOS: 4.61 | 文件系统中的应用沙盒目录路径 |
| TEMP_PATH | string | 是 | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.62 | 文件系统中的应用临时目录路径，应用退出自动清理 |
| ANDROID_INTERNAL_SANDBOX_PATH | string | 是 | - | Web: x; 微信小程序: x; Android: 3.99; iOS: x; HarmonyOS: x | 文件系统中的应用内置沙盒目录路径（仅app-android平台支持） |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.env)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=env&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=env&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=env&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=env&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=env&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=env)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=env&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/env/env.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/env/env.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/env/env
```uvue
<template>
  <view style="margin:12px">
    <page-head title="环境变量 - 文件系统"></page-head>
    <button class="button" type="primary" @tap="getDirInfo(uni.env.USER_DATA_PATH)">USER_DATA_PATH</button>
    <button class="button" type="primary" @tap="getDirInfo(data.cachePath)">CACHE_PATH</button>
    <button class="button" type="primary" @tap="getDirInfo(data.sandboxPath)">SANDBOX_PATH</button>
    <!-- #ifdef APP-HARMONY -->
    <button class="button" type="primary" @tap="getDirInfo(data.tempPath)">TEMP_PATH</button>
    <!-- #endif -->
    <!-- #ifdef APP-ANDROID -->
   <button class="button" type="primary" @tap="getDirInfo(data.androidInternalSandboxPath)">ANDROID_INTERNAL_SANDBOX_PATH</button>
    <!-- #endif -->
    <boolean-data :defaultValue="false" title="是否递归获取" @change="switchRecursive"></boolean-data>
  </view>
  <scroll-view style="flex: 1; padding: 16px 0px;">
    <text class="result">{{data.result}}</text>
    <text class="error">{{data.error}}</text>
    <view class="stat" v-for="(stat,index) in data.list" :key="index" >
      <text class="path">{{stat.path}}</text>
      <text class="size">{{stat.size}}</text>
    </view>
  </scroll-view>
</template>

<script setup lang="uts">
  type StatInfo = {
    path : string;
    size : string;
  };

  type DataType = {
    result: string;
    error: string;
    list: Array<StatInfo>;
    recursive: boolean;
    cachePath: string;
    sandboxPath: string;
    // #ifdef APP-HARMONY
    tempPath: string;
    // #endif
    // #ifdef APP-ANDROID
    androidInternalSandboxPath: string;
    // #endif
  }

  const data = reactive({
    result: '',
    error: '',
    list: [],
    recursive: false,
    cachePath: uni.env.CACHE_PATH,
    sandboxPath: uni.env.SANDBOX_PATH,
    // #ifdef APP-HARMONY
    tempPath: uni.env.TEMP_PATH,
    // #endif
    // #ifdef APP-ANDROID
    androidInternalSandboxPath: uni.env.ANDROID_INTERNAL_SANDBOX_PATH,
    // #endif
  } as DataType)

  const switchRecursive = () => {
    data.recursive = !data.recursive
  }

  const getDirInfo = (dirPath: string) => {
    const fm = uni.getFileSystemManager()
    data.list = [];
    fm.stat({
      path: dirPath,
      recursive: data.recursive,
      success: (res: StatSuccessResult) => {
        data.result = `获取 "${dirPath}" 成功(success)`
        console.log(data.result)
        res.stats.forEach((item)=>{
          data.list.push({
            path: item.path,
            size: `${item.stats.size} Bytes`
          } as StatInfo)
        })
      },
      fail: (err) => {
        data.result = `获取 "${dirPath}" 失败(fail)`
        console.log(data.result)
        data.error = JSON.stringify(err)
        console.log(data.error)
      }
    })
  }

</script>

<style>
  .button {
    margin-bottom: 4px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .result {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    width: 100%;
  }
  .error {
    color: firebrick;
  }
  .stat {
    padding: 8px 16px;
  }
  .path {
    color: darkgray;
  }
  .size {
    color: darkgrey;
  }
</style>

```
:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

