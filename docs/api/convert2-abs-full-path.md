::: sourceCode
## uni.convert2AbsFullPath(inputPath) @convert2absfullpath

> issues: https://issues.dcloud.net.cn/?mid=api.file.convert2AbsFullPath


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-convert2AbsFullPath

:::

将文件的项目相对地址转换为 运行期对应的绝对地址

### convert2AbsFullPath 兼容性 <Help /> 
Android: 5.32; iOS: 5.32; HarmonyOS: 5.32


### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| inputPath | string | 是 | 




### 返回值 

| 类型 |
| :- |
| string |
 


<!-- UTSAPIJSON.convert2AbsFullPath.example -->

以下为转换结果示例，实际路径因平台、系统版本不同而有所差异

```js
uni.convert2AbsFullPath('/static/logo.png')
```

返回值为绝对路径，各平台结果如下：

| 平台 | 返回值 |
| --- | --- |
| Android | `/data/data/<package-name>/apps/<appid>/www/static/logo.png` |
| iOS | `/var/mobile/Containers/.../Documents/uni-app-x/apps/<appid>/www/static/logo.png` |
| Harmony | `/data/storage/el1/bundle/.../resfile/uni-app-x/apps/<appid>/www/static/logo.png` |

当入参路径不是使用 `uni.env.`（如 `uni.env.USER_DATA_PATH`、`uni.env.CACHE_PATH` 等）拼接的路径时，转换后返回的是应用 www 目录下的路径，该目录为只读目录，不可写入。



## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

