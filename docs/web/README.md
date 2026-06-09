# 编译到web端

> 新增于4.0版本

uni-app x 编译到web平台时，并非是与uni-app js引擎版一致。而是基于uts的统一规范，和编译到安卓端的一致性较高。

与App版相比，web版有几个较大的差别：
1. web版是一个spa的单页应用，而app是多页的。
2. pages.json配置的导航栏和tabbar，在web端并非原生的，而是网页的一部分。虽然uvue页面仍然是在导航栏和tabbar之间的，但在web平台，开发者可以直接操作导航栏和tabbar的dom。
3. web版默认有页面滚动；app没有。

本文档会介绍与web和Android的差异及注意事项。

## web运行失败注意事项@faq

- 在比较早的HBuilderX版本中创建的uni-app x项目，特征是项目根目录是app.vue而不是app.uvue。这样的项目运行web会失败。需替换index.html和app.uvue这2个文件，可以新建项目从中复制，也可以从hello uni-app x示例项目复制。

## vue

### 特性支持情况

uni-app x编译到web端时遵循vue规范，目前有部分vue特性暂不支持。

不支持的特性如下

- 指令：`v-once`、`v-memo`
- render函数
- 不支持组件中监听页面 `onPageScroll`、`onReachBottom` 生命周期

部分支持的特性

- mixin：需要使用`defineMixin`函数定义mixin，不可直接使用对象字面量定义mixin

自4.11版本起支持如下特性

- 组合式API：`defineOptions`、`defineModel`、`toValue`、`toRef`、`toRefs`、`hasInjectionContext`

### refs@refs

使用refs获取内置组件实例时会获取到对应的Element，而不是vue组件实例。

```vue
<template>
  <view ref="view"></view>
</template>
<script>
export default {
  onReady() {
    console.log(this.$refs['view']) // 此时获取到的是UniViewElement
  }
}
</script>
```

### vue实例相关属性类型问题

为保证运行性能，app安卓端部分属性（如：$data、$refs）被转为了Map类型（安卓端map支持使用下标访问），而web端仍是普通对象或proxy。为保证多端代码一致，在使用这些属性时可以统一为下标访问。

```vue
<template>
  <view></view>
</template>
<script>
export default {
  data() {
    return {
      a: 1
    }
  },
  onReady() {
    console.log(this.$data['a']) // 1
  }
}
</script>
```

### ComponentPublicInstance类型

目前已知组件使用emits会导致this不能直接传递给ComponentPublicInstance类型，需要as一下。

```ts
function log(ins: ComponentPublicInstance) {
  console.log(ins);
}

export default {
  emits: ['change', 'input'],
  methods: {
    buttonClick() {
      log(this as ComponentPublicInstance)
    }
  }
}
```

如下为进阶说明，可以不看

我们在代码中用到的ComponentPublicInstance为省略泛型的写法，最终推导出的ComponentPublicInstance类型为：

```ts
// 此处为方便说明，省略了很多属性、简化了写法
type ComponentPublicInstance = {
  $emit: (event: string, ...args: any[]) => void
}
```

对于使用了emits的组件，最终推导出来的this对应的类型为：

```ts
// 此处为方便说明，省略了很多属性、简化了写法
type XxxComponentPublicInstance = {
  $emit: (event: 'change' | 'input', ...args: any[]) => void
}
```

在将XxxComponentPublicInstance类型的this值赋值给ComponentPublicInstance类型的参数时，由于$emit类型无法兼容导致编译报错。

下面我们只看$emit的类型

```ts
type ComponentPublicInstanceEmit = (event: string, ...args: any[]) => void
type XxxComponentPublicInstanceEmit = (event: 'change' | 'input', ...args: any[]) => void
```

对于ComponentPublicInstanceEmit类型的函数A来说，event参数可以接收任意字符串，如果将其赋值为只能接收'change' | 'input'作为event参数的函数B，这时候用户如果将event参数设为'click'则函数B无法处理，而函数A的类型定义又可以接收'click'，所以ts并不允许这种行为。

但是反过来则是可以的XxxComponentPublicInstanceEmit类型的函数A可以被重新赋值为ComponentPublicInstanceEmit类型的函数。

总结一下就是ts在比较函数参数是否兼容时使用逆变（contravariance）而非协变（covariance），这两个名词定义比较复杂，结合上述示例理解即可。

### 注意事项

- data内$开头的属性不可直接使用`this.$xxx`访问，需要使用`this.$data['$xxx']`，这是vue的规范。目前安卓端可以使用this.$xxx访问是Bug而非特性，请勿使用此特性。
- 安卓端由于kotlin特性组件内部使用组件data内定义的属性时this可以省略，请勿在web端使用此特性。
- web端由于是一个单页应用，使用`$root`会获取应用根组件，而不是页面根组件。而安卓端是多页应用，`$root`获取的是页面根组件。
- web端使用`$parent`会获取父组件（含内置组件），安卓端只会获取父级非内置组件，web端后续会调整，请勿利用此特性。
- web端切换页面后上一个页面的元素、组件会从dom树上移除，并触发组件及页面的`deactivate`生命周期，此时部分dom事件无法触发（如：transitionEnd）。可以视情况使用`activate`、`deactivate`生命周期重新触发dom相关操作。

## uts

参考：[类型兼容性](../uts/type-compatibility.md)

## css

### 默认样式

为保证多端统一，uni-app-x编译到web端时，内置组件根元素带有一些默认样式，详情参考：[uvue css使用](../css/README.md)。如果是使用`document.createElement`等方式自行创建的html元素不会有这些默认样式。

### 样式格式自动转化

通过element.style.xxx设置样式时，web端会自动将样式进行转化，具体取决于浏览器。

例如：

```ts
element.style.color = '##FF0000'
element.style.color === 'rgb(255, 0, 0)' // true
```

### fixed定位

position: fixed定位时，web端为相对于整个浏览器页面进行定位，app端为相对于页面（除导航栏、tabbar）定位。可以使用[css变量](../css/common/function.md)使两端表现一致

```css
.fixed {
  position: fixed;
  width: 100px;
  height: 100px;
  background-color: #FF0000;
  left: 10px;
  /* #ifdef WEB */
  top: calc(--window-top + 10px); // HBuilderX 4.52起推荐使用 --uni-safe-area-inset-top 替代 --window-top
  /* #endif */
  /* #ifdef APP */
  top: 10px;  /* App端暂不支持calc */
  /* #endif */
}
```

## api

uni相关的异步api在web端不传回调时会返回promise（详情参考：[API Promise 化](https://uniapp.dcloud.net.cn/api/#api-promise-%E5%8C%96)）。但是由于目前缺少此用法的类型定义，使用返回的Promise无法通过编译。另外安卓端暂未实现此功能，建议不要使用此特性。

## 特性支持

- [x] 宽屏适配
- [x] 暗黑模式
- [x] 国际化
- [x] 地图
- [x] uni-push2.0
- [x] 服务端渲染 新增于HBuilderX 4.18
- [ ] [接口Promise化](https://uniapp.dcloud.net.cn/api/#api-promise-%E5%8C%96)

## 运行与发行@dev-and-build

运行到web端时，uni-app-x编译器不会对语法进行转化来兼容低版本浏览器。发行时会对代码进行转化，以保证低版本浏览器能正常运行。

发行时支持的最低浏览器版本为：`chrome 64`、`safari 11.1`、`firefox 62`、`edge 79`、`safari on iOS 12`。

为优化开发体验减少运行时页面跳转等待时间，HBuilderX 4.28起，运行到web端浏览器打开后会自动触发剩余页面编译。

## 配置devServer允许跨域请求服务器@dev-server

开发web应用时，如果服务端未允许客户端请求的地址跨域，则客户端无法访问服务端接口。此时可以通过vite提供的代理功能实现正常访问服务器接口。详情参考：[vite server.proxy](https://cn.vitejs.dev/config/server-options#server-proxy)

如下为配置示例：

项目根目录下新增`vite.config.js`, 内容如下

```js
// vite.config.js
import {
  defineConfig
} from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
  plugins: [uni()],
  server: {
    proxy: {
      // 如下写法转化请求地址
      // http://localhost:5173/api/
      // -> https://httpbin.org/
      '/api': {
        target: 'https://httpbin.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  }
});
```

开发期间将请求地址修改为`/api/xxx`，示例如下

```js
let base = 'https://httpbin.org/'
if(process.env.NODE_ENV === 'development') {
  base = '/api/' // 开发期间请求/api/xxx为网页所在地址的同源地址，不存在跨域问题
}
uni.request({
  method: 'POST',
  url: base + 'post',
  success(res) {
    console.log(res)
  },
  fail(err) {
    console.error(err)
  }
})
```

## 配置开发 HTTPS@https

在 HBuilderX 中通过 `manifest.json` 启用 web 端 HTTPS 时，开发服务器使用的是仅用于调试的证书，浏览器通常不会将其识别为受信任证书，因此可能出现“连接不安全”之类的提示。该方式适合快速启动本地 HTTPS 调试，但不适用于需要指定证书文件、对接本地受信任证书链，或进行更严格联调验证的场景。

如果需要使用开发者自行生成的证书，请不要继续在 `manifest.json` 中配置 HTTPS，而应改为在项目根目录新增 `vite.config.js`，通过 Vite 的 `server.https` 进行显式配置。同时，请删除 `manifest.json` 中与 web 端 HTTPS 相关的配置，避免与 `vite.config.js` 中的设置重复或产生冲突。

示例配置如下：

```js
// vite.config.js
import fs from 'fs'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [uni()],
  server: {
    https: {
      key: fs.readFileSync('./cert/localhost-key.pem'),
      cert: fs.readFileSync('./cert/localhost.pem'),
    },
  },
})
```

证书文件路径请按项目实际情况调整。完成配置后，重新运行到 web 端即可使开发服务器使用指定证书。

## 其他注意事项

- 4.02之前的版本内置组件的tagName、nodeName与安卓端不同，web端和安卓端相比多了`UNI-`前缀，例如web端为`UNI-VIEW`、`UNI-IMAGE`，安卓端为`VIEW`、`IMAGE`。此问题已在HBuilderX 4.02版本修复，web端移除了UNI-前缀。
