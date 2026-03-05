# uts-openSchema

打开链接，支持：

1. 打开外部 App
2. 使用浏览器打开链接
3. 打开地图到指定地点
4. ...

## 使用

1. 安装此插件
2. 在要使用的地方 `import` 导入
  ```ts
  import { openSchema, canOpenURL } from '@/uni_modules/uts-openSchema'
  ```
3. 直接调用 `openSchema` 方法：
  ```ts
  // #ifdef UNI-APP-X
  // 使用外部浏览器打开指定URL
  openSchema('https://uniapp.dcloud.io/uni-app-x')

  // #ifdef APP-ANDROID
  // Android 使用应用商店打开指定App
  openSchema('market://details?id=com.tencent.mm')

  // Android 打开地图坐标
  // 可以先用canOpenURL判断是否安装了地图软件
  if (canOpenURL('androidamap://')) {
    openSchema('androidamap://viewMap?sourceApplication=Hello%20uni-app&poiname=DCloud&lat=39.9631018208&lon=116.3406135236&dev=0')
  } else {
    console.log('未安装高德地图')
  }
  // #endif -->

  // #ifdef APP-IOS
  // 打开 AppStore 到搜索页
  openSchema('itms-apps://search.itunes.apple.com//WebObjects//MZSearch.woa/wa/search?media=software&lterm=')

  // 打开 iOS 地图坐标
  openSchema('http://maps.apple.com/?q=Mexican+Restaurant&sll=50.894967,4.341626&z=10&t=s')
  // #endif -->

  // #endif -->
  ```

### 参数

- openSchema(url: string) // `url`：要打开的链接 `必填` `不为空字符串`

## 相关开发文档

[UTS 语法](https://uniapp.dcloud.net.cn/tutorial/syntax-uts.html)

[UTS API插件](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html)

[UTS 组件插件](https://uniapp.dcloud.net.cn/plugin/uts-component.html)

[Hello UTS](https://gitcode.net/dcloud/hello-uts)
