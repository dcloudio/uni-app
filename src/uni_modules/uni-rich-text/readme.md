# uni-richtext
实现 rich-text 组件功能，详细需求参考[rich-text文档](https://doc.dcloud.net.cn/uni-app-x/component/rich-text.html)  

## 开发说明  
使用 web-view 组件和内置 rich-text-native 组件封装，mode 为 web 时使用 web-view 组件，mode 为 native 时使用 rich-text-native 组件封装。  
web-view 组件style不支持 border、padding，ri

### 开发文档
[UTS 语法](https://uniapp.dcloud.net.cn/tutorial/syntax-uts.html)
[UTS API插件](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html)
[UTS uni-app兼容模式组件](https://uniapp.dcloud.net.cn/plugin/uts-component.html)
[UTS 标准模式组件](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-vue-component.html)
[Hello UTS](https://gitcode.net/dcloud/hello-uts)


## 注意事项  
- 通过id获取UniElement，应该使用`getCurrentInstance()?.proxy?.$page?.querySelector`，不要使用 `uni.getElementById`  
  获取组件内部某个子组件的UniElement时，使用 uni.getElementById 是从栈顶页面查找，有可能不是预期的页面，如组件放到 DialogPage 或 内置页面 时，还无法通过 uni.getElementById 获取  
  应该通过 getCurrentInstance()?.proxy?.$page 获取页面对象，再调用其 querySelector 方法，如下示例：  
  ```uts
  const currentPage = getCurrentInstance()?.proxy?.$page
  
  //如下在页面中获取web-view组件的UniWebViewElement
  function getWebViewElement(id: string) : UniWebViewElement | null {
    return currentPage?.querySelector('#' + id) as UniWebViewElement | null
  }
  ```


- `mode` 为 web 时，统一通过 `load` 事件来加载 html 内容  
  减少平台差异，去掉不必要的条件编译  
  后续可优化为加载模板 html 内容，更新内容时通过 evalJS 方法进行操作  


- Android平台web-view组件 `src` 属性值不支持 'about:blank'
  暂时通过条件编译将 src 初始值设置为 ''
  Todo: Android平台 web-view 组件兼容支持  


- Android/iOS平台在较早时机获取到UniWebViewElement后，调用 `loadData` 无法加载页面内容  
  原因：蒸汽模式中使用了多线程机制，获取UniWebViewElement后并不一定创建系统 WebView 成功  
  目前解决方案是根据 `load` 事件来记录 webviewLoaded 状态，确保在系统 WebView 创建后加载内容  

  后续优化方案：
  1. web-view 组件的 `src` 属性支持 data: 格式数据
  2. 使用加载模板 html 来解决


- 鸿蒙平台 `mode` 为 web 时使用 `web-view` 组件加载数据做了base64转换  
  此问题已确认是内容中包含特殊转义字符时，在鸿蒙平台可能无法在web-view组件中加载，参考[issues28962](https://issues.dcloud.net.cn/pages/issues/detail?id=28962)  
  解决方案：应该鸿蒙平台web-view组件兼容处理，rich-text组件不应该通过条件编译来处理


- 鸿蒙平台蒸汽模式 watch nodes 立即执行的回调再触发 nextTick 中无法通过页面 querySelector 获取 UniWebViewElement  
  解决方案：统一`load` 事件来记录 webviewLoaded 状态，加载页面，不依赖通过页面查找 UniWebViewElement


- 重构后 `rich-text-native` 外层不再嵌套 `view` 组件，发现存在问题  
  + Andorid平台如此进入mode=native后动态更新内容导致渲染不出内容，动态切换mode后不存在此问题  // 原生层排查  
  + useComputedStyle后，样式（background/border/font-size等）无法传递到 rich-text-native 组件  // vue框架排查  



## 遗留问题  
- Android平台 `mode` 切换为 web 时会触发两次高度变化，导致动态切换 mode 时会闪一下
  后续优化方案：web-view 组件的 `src` 属性支持 data: 格式数据可解决
- rich-text 加载内容中不能直接使用项目下 static 目录中的资源（如图片或视频）  
  后续优化方案：设置 web-view 的 hosturl 为项目路径

