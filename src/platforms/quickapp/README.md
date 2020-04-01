### 快应用适配教程


#### 准备

1.安装 [快应用调试器](https://statres.quickapp.cn/quickapp/quickapp/201806/file/quickapp_debugger.apk)

2.打开快应用调试器，下载平台（快应用预览版：版本号1060）

3.安装 openssl(windows系统)


#### 搭建

1.创建 `hello uni-app` 测试工程
```
vue create -p dcloudio/uni-preset-vue#alpha my-qa-project -n
```
目前手动安装依赖库: 根目录执行
```
yarn add @dcloudio/uni-quickapp@alpha -D
```

2.生成证书 `certificate.pem` 和 `private.pem`：到目录 `src/sign/debug/`
```
openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem
```

3.编译快应用 `rpk`
```
npm run dev:quickapp
```

4.开启debug在线更新服务
```
npm run serve:quickapp
```

5.打开快应用调试器，扫码安装或右上角设置服务器地址(注意带上`http://`，关闭USB调试可看到扫码)

6.修改代码后，会主动通知调试器更新，或者手动点击在线更新（调试可以点击右下角开始调试）


#### 开发调试代码

1.Fork 仓库 `uni-app` [https://github.com/dcloudio/uni-app](https://github.com/dcloudio/uni-app)，切换到 dev 分支

2.编译 (输出目录`packages/uni-quickapp`)

```
npm run build:quickapp
```

3.手动替换编译输出目录 `packages/uni-quickapp` 到测试工程 `node_modules/@dcloudio/uni-quickapp`，也可以考虑自己npm link本地`uni-quickapp`包（需要考虑三方依赖）

4.使用 pull request 提交代码


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


#### 开发示例
- button 组件 [https://github.com/dcloudio/uni-app/tree/master/src/platforms/quickapp/view/components/button](https://github.com/dcloudio/uni-app/tree/master/src/platforms/quickapp/view/components/button)



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

注意：
hello uni-app使用了px单位，在快应用里等同于rpx，故页面显示异常，非调试ui阶段，
可以自己修改manifest.json->quickapp->config->designWidth=自己手头设备的逻辑像素，如360
