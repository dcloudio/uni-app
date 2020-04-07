## 快应用适配教程

使用 uni-app 规范适配快应用

- uni-app文档 [https://uniapp.dcloud.io/](https://uniapp.dcloud.io/)
- 快应用文档 [https://doc.quickapp.cn/](https://doc.quickapp.cn/)


### 开发

1.Fork 仓库 `uni-app` [https://github.com/dcloudio/uni-app](https://github.com/dcloudio/uni-app)，切换到 dev 分支

2.使用 Vue 规范开发组件，参考 `Button` 组件及 `clipboard` 示例
```
- button `src/platforms/quickapp/view/components/button`
- clipboard `src/platforms/quickapp/service/api/device/clipboard`
```

2.编译 (输出目录`packages/uni-quickapp`)
```
npm run build:quickapp
```

#### `uni-app` 目录说明

```
packages
 ├─uni-quickapp
 │  └─lib
 │      ├─compiler-module (编译阶段标签转换之类逻辑)
 │      ├─polyfill.css (全局样式差异代码)
 │      └─manifest (manifest.json的生成逻辑)
src
 ├─platforms
 │  └─quickapp
 │      ├─...
 │      ├─service
 │      │   └─api 平台的接口实现（方案同h5，app-plus）
 │      └─view
 │          └─components 平台的组件实现（easycom格式，目录名与文件名一致）
 │              └─button
```

### 测试

#### 搭建测试环境

1.安装 [快应用调试器](https://statres.quickapp.cn/quickapp/quickapp/201806/file/quickapp_debugger.apk)

2.打开快应用调试器，下载平台（快应用预览版：版本号1060）

#### 搭建测试工程

1.创建测试工程 (推荐使用空项目，可选 `hello uni-app` 工程，包含组件及API示例，工程较复杂编译比较耗时)
```
vue create -p dcloudio/uni-preset-vue#alpha my-qa-project -n
```
```
<!--button 示例-->
<template>
  <view>
    <button>Button</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    onLoad() {
    },
    methods: {
    }
  }
</script>

<style>
</style>
```

2.编译快应用 `rpk`
```
npm run dev:quickapp
```

3.开启debug在线更新服务
```
npm run serve:quickapp
```

4.打开快应用调试器，扫码安装或右上角设置服务器地址(注意带上`http://`，关闭USB调试可看到扫码)

5.修改代码后，会主动通知调试器更新，或者手动点击在线更新（调试可以点击右下角开始调试）

6.手动替换编译输出目录 `packages/uni-quickapp` 到测试工程 `node_modules/@dcloudio/uni-quickapp`, 可以考虑 `npm link`

### 提交代码
使用 `pull request` 提交代码



#### 包名配置
```
项目 manifest.json
{
  "quickapp" : {
    "config": {
      "package": "com.example.demo",
      "designWidth": 360
    }
  }
}
```


### 生成证书 `certificate.pem` 和 `private.pem`
安装 openssl(windows系统)
```
openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem
```
- 发布快应用时需要使用自己的证书，开发期间为debug证书

注意：
hello uni-app使用了px单位，在快应用里等同于rpx，故页面显示异常，非调试ui阶段，
可以自己修改manifest.json->quickapp->config->designWidth=自己手头设备的逻辑像素，如360
