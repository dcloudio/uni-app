## 本地运行云函数

自2.8.1版本起HBuilderX支持云函数本地运行，调试云函数更加方便快捷。此外还可以方便批量导入数据及文件，不再受云函数超时限制（云函数上传文件到云存储只有腾讯云支持）。

**目前只支持本地运行，本地调试还在开发中**

### 使用步骤

在要本地运行的云函数上右键选择本地运行

- 如果没有安装本地运行插件，按照提示安装即可
- 如需配置运行参数请参考[配置运行测试参数](https://uniapp.dcloud.net.cn/uniCloud/quickstart?id=runparam)

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/uniCloud-local-1.jpg)

### 注意事项

#### 时区问题

云函数内使用的时区是utc+0，本地运行时使用的是本机时间。在使用时间戳时两者没有差异，但如果要获取年、月、日、小时要注意时区的差异。

以下方式可以获取指定时区的年、月、日、小时，可以参考一下

```js
// 获取偏移后的Date对象，例如utc+x时offset就传x
function getOffsetDate (offset) {
  return new Date(
    Date.now() + (new Date().getTimezoneOffset() + (offset || 0) * 60) * 60000
  )
}

// 获取utc+8的小时数
const hour = getOffsetDate(8).getHours()

// 获取时间戳无需使用此方式utc+0时间戳是与utc+8时间戳一致的
```

#### 数据与存储

请务必注意云函数在本地运行时依然是连接的云端数据库与存储

#### Nodejs版本

服务空间所使用的nodejs版本为8.9，本地运行时使用的本地nodejs可能与服务空间的nodejs版本并不一致，在本地测试之后部署到云端也务必测试一下兼容性。
