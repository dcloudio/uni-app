# uni-app x iOS原生SDK

## 正式版

注意：蒸汽模式的离线sdk还未发版，请关注更新。

### 5.23.2026080626

**[下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/iOS/UniAppX-iOS%405.23.zip)**

### uni-app x
* 新增 组件 rich-text css 样式 支持 color 设置文字默认颜色 [文档](https://doc.dcloud.net.cn/uni-app-x/component/rich-text.html#tips) <https://issues.dcloud.net.cn/pages/issues/detail?id=29909>
* 修复 组件 内监听应用生命周期异常问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30238)
* 修复 组件 editor min-height 样式不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30794)
* 修复 CSS var自定义变量 从 rgba 切换到非 rgba 颜色值（hex / hsl / 关键字）失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30250)
* 修复 组件 video 视频播放时会静音音频播放 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=29338)
* 修复 组件 video object-fit 未对视频封面图片生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=29588)
* 修复 vue useComputedStyle properties 参数类型错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30726)
* 修复 组件 video 请求全屏忽略 direction 参数时没有根据视频宽高比自动判断 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=28449)
* 新增 API uni.login 支持苹果登录（Sign in with Apple） [文档](https://doc.dcloud.net.cn/uni-app-x/api/sign-in.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=30182>
* 修复 组件 canvas 在部分设备（如iPhone 6s plus）显示尺寸异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30657)
* 修复 组件 video 播放时异步加载的 poster 覆盖播放器 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31255)
* 修复 组件 web-view 销毁时 web 音频依旧播放 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=29161)
* 修复 支持 UIScene 生命周期规范 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30699)
* 修复 CSS var(--status-bar-height)部分情况下未生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31352)
* 修复 API requestAnimationFrame 在高刷设备上无法按 120Hz 回调 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31124)

### uts插件
* 新增 支持 interceptor.js 用于在调用 utssdk 内的插件前进行额外操作 [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#interceptorjs) <https://issues.dcloud.net.cn/pages/issues/detail?id=30803>
* 修复 iOS UTS 中 JSON.parse<T>() 后 JSON.stringify() 会把 number 的 0/1 序列化成 false/true [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30567)

**[历史版本](https://pan.baidu.com/s/1PVLzui3QRkG5brzTxSYJlg?pwd=amqt)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.15.2026070915.html)**

## alpha版

### 5.23.2026080313-alpha

**[下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/iOS/UniAppX-iOS%405.23.zip)**

### uni-app x
 

**[历史版本](https://pan.baidu.com/s/130Rvlh2jdsp3aJ4YtigoJQ?pwd=xy7s)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.22.2026072503-alpha.html)**
