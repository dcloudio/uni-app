## 使用ssr

> 新增于 HBuilderX 4.18

uni-app 默认情况下，是在客户端中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，也可以将同一个组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。

服务器渲染的 uni-app 应用程序也可以被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行。

uni-app以ssr模式编译项目最终会生成两部分产物，server部分和client部分。其中server部分可以部署在云函数或其他服务器上，这部分代码的作用是返回html内容，html内容会引用client部分的静态资源（css、js、字体、图片等）。

### 配置

项目根目录增加`vite.config.js`，内容如下

```js
import {
	defineConfig
} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
	base: 'https://static-xxxx.bspapp.com/', // uniCloud 前端网页托管资源地址（主要是应用编译后的js，图片等静态资源，可以配置为二级目录），或其他最终部署静态资源的路径。server部分会依赖此配置引用静态资源
	plugins: [
		uni(),
	]
})
```

### 编写ssr相关代码

在服务器端渲染(SSR)期间，我们本质上是在渲染我们应用程序的"快照"，所以如果应用程序依赖于一些异步数据，那么在开始渲染过程之前，需要先预取和解析好这些数据。

另一个需要关注的问题是在客户端，在挂载 (mount) 到客户端应用程序之前，需要获取到与服务器端应用程序完全相同的数据 - 否则，客户端应用程序会因为使用与服务器端应用程序不同的状态，然后导致混合失败。

为了解决这个问题，获取的数据需要位于视图组件之外，即放置在专门的数据预取存储容器(data store)或"状态容器(state container)"中。首先，在服务器端，我们可以在渲染之前预取数据，并将数据填充到 store 中。此外，我们将在 HTML 中序列化(serialize)和内联预置(inline)状态。这样，在挂载(mount)到客户端应用程序之前，可以直接从 store 获取到内联预置(inline)状态。


#### serverPrefetch生命周期

当组件实例在服务器上被渲染之前要完成的异步函数。如果这个钩子返回了一个 Promise，服务端渲染会在渲染该组件前等待该 Promise 完成。

这个钩子仅会在服务端渲染中执行，可以用于执行一些仅在服务端才有的数据抓取过程。

**示例**

```ts
<template>
  <text v-if="item">{{ item.title }}</text>
  <text v-else>...</text>
</template>

<script>
  const id = 1;// 模拟ID
  export default {
    computed: {
      item() {
        return this.$store.state.items[id]
      }
    },
    mounted() { // 仅客户端执行的生命周期
      if (!this.item) { // 判断服务端是否已正常获取，若未获取，重新调用加载数据
        this.fetchItem()
      }
    },
    async serverPrefetch() { // 服务端预取数据的生命周期
      await this.fetchItem()
    },
    methods: {
      fetchItem() {
        return this.$store.dispatch('fetchItem', id)
      }
    }
  }
</script>
```

#### ssrRef、shallowSsrRef

对于简单的需要云端客户端保持一致的数据可以使用uni-app提供的ssrRef及shallowSsrRef实现

```ts
const categories = ssrRef(['c1', 'c2'], 'categories');
export default {
  data() {
    return {
      categories
    }
  }
}
```

#### vuex

对于复杂的数据，如需保持云端客户端一致，建议使用vuex进行存储。下面是一个简单的示例：

**main.uts**

```ts
import { createSSRApp } from 'vue'
import App from './App.uvue'
import createStore from './store'
export function createApp() {
  const app = createSSRApp(App)

  const store = createStore() // 创建 store
  app.use(store)

  return {
    app,
    store,// 必须返回 store
  }
}
```

**store/index.uts**

```ts
import { createStore } from 'vuex'

// 模拟接口获取数据
function fetchItem(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        title: 'title' + id,
      })
    }, 300)
  })
}

export default () => {
  return createStore({
    state() {
      return {
        items: {},
      }
    },
    actions: {
      fetchItem({ commit }, id) {
        return fetchItem(id).then((item) => {
          commit('setItem', { id, item })
        })
      },
    },
    mutations: {
      setItem(state, { id, item }) {
        state.items[id] = item
      },
    },
  })
}
```

**pages/index/index.uvue**

```vue
<template>
  <text v-if="item">{{ item.title }}</text>
  <text v-else>...</text>
  <text>{{ JSON.stringify(categories) }}</text>
</template>

<script>
  import { ssrRef } from '@dcloudio/uni-app'
  const categories = ssrRef(['c1', 'c2'], 'categories');
  const id = 1;// 模拟ID
  export default {
    data() {
      return {
        categories
      }
    },
    computed: {
      item() {
        return this.$store.state.items[id]
      }
    },
    mounted() { // 仅客户端执行的生命周期
      if (!this.item) { // 判断服务端是否已正常获取，若未获取，重新调用加载数据
        this.fetchItem()
      }
    },
    async serverPrefetch() { // 服务端预取数据的生命周期
      await this.fetchItem()
    },
    methods: {
      fetchItem() {
        return this.$store.dispatch('fetchItem', id)
      }
    }
  }
</script>
```

#### page-meta

uni-app-x内page-meta仅保留了存放head的功能，page-meta内的head节点在最终渲染时会传送到html的head内，可用于存放keyword、description等信息

```vue
<template>
  <page-meta>
    <head>
      <meta name="keywords" content="uni-app ssr" />
    </head>
  </page-meta>
</template>
```

**注意**

使用此功能需要确保项目`index.html`内head下有head-meta注释。如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script>
      var coverSupport = 'CSS' in window && typeof CSS.supports === 'function' && (CSS.supports('top: env(a)') ||
        CSS.supports('top: constant(a)'))
      document.write(
        '<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' +
        (coverSupport ? ', viewport-fit=cover' : '') + '" />')
    </script>
    <title></title>
    <!--head-meta-->
    <!--preload-links-->
    <!--app-context-->
  </head>
  <body>
    <div id="app"><!--app-html--></div>
    <script type="module" src="/main"></script>
  </body>
</html>
```


### 部署

上文讲到uni-app以ssr方式发行会生成server、client两部分资源。其中server部分需要部署在服务器或云函数内每次用户访问时返回html文件，client部分一般部署在对象存储+cdn内。

需要注意的是服务端渲染的html引用js文件使用的是`type="module"`方式，需要配置在client部分部署位置允许server部分对应的域名进行跨域访问。

#### 部署到uniCloud

前置步骤

1. 开通[uniCloud](https://unicloud.dcloud.net.cn)以及[前端网页托管](https://doc.dcloud.net.cn/uniCloud/hosting)
2. 云函数绑定自定义url化域名，参考文档：[云函数Url化](https://doc.dcloud.net.cn/uniCloud/http)，阿里云未绑定自定义域名会直接下载云函数返回的html页面无法在浏览器中展示
3. 前端网页托管绑定自定义域名，参考文档：[前端网页托管配置域名](https://doc.dcloud.net.cn/uniCloud/hosting?id=domain)
4. 将前两步部署的域名都配置在跨域配置内，即允许云函数跨域访问前端网页托管内的资源，也允许前端网页托管跨域访问云函数。参考文档：[H5中使用uniCloud的跨域处理](https://doc.dcloud.net.cn/uniCloud/quickstart?id=useinh5)
5. 从插件市场导入[uni-ssr](https://ext.dcloud.net.cn/plugin?id=5338)到项目内
6. 修改`cloudfunctions/uni-ssr/package.json`内容

    - 将_moduleAliases部分替换为如下内容
    
    ```json
    "_moduleAliases": {
      "vue": "node_modules/@dcloudio/uni-h5-vue/dist-x/vue.runtime.cjs.js",
      "@dcloudio/uni-h5": "node_modules/@dcloudio/uni-h5/dist-x/uni-h5.cjs.js",
      "vue/server-renderer": "node_modules/@vue/server-renderer"
    },
    ```
    - 将uni-app相关依赖的版本调整为发行项目是的依赖版本

##### 自动部署

1. 通过`HBuilderX`的`发行菜单->网站 PC-Web或手机H5`、勾选`ssr`、勾选`将编译后的资源部署在uniCloud前端网页托管`

	![自动部署](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/ssr-img-02.png)

2. 配置`uni-ssr`的云函数URL化路径，请参考文档：[云函数URL化](https://doc.dcloud.net.cn/uniCloud/http)

##### 手动部署

1. 编译：

  cli工程：`npm run build:h5:ssr`或通过`HBuilderX 4.18及以上版本`的`发行菜单->网站 PC-Web或手机H5`、勾选`ssr`

  非cli工程：通过`HBuilderX 4.18及以上版本`的`发行菜单->网站 PC-Web或手机H5`、勾选`ssr`

  ![以ssr模式发行](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/ssr-publish.jpg)

2. 部署静态资源到[前端网页托管](https://doc.dcloud.net.cn/uniCloud/hosting)

  将编译后的`dist/build/h5/client`中的资源上传至前端网页托管，推荐使用免费的阿里云服务空间

3. 部署`uni-ssr`云函数

  将编译后的`dist/build/h5/server`目录拷贝至`uni-ssr`云函数根目录，并上传。

4. 配置`uni-ssr`的云函数URL化路径，请参考文档：[云函数URL化](https://doc.dcloud.net.cn/uniCloud/http)

### 注意事项

- 浏览器控制台提示如下警告，说明服务器和客户端渲染的结果不一致，检查模板绑定的属性是否使用了 `ssrRef`

```
[Vue warn]: Hydration node mismatch:
- Client ***
- Server ***
```

- 若路由模式配置为history之后，浏览器控制台显示如下报错，则需要根据文档检查有无准备好history相关配置。[配置文档](https://zh.uniapp.dcloud.io/quickstart-hx.html#%E5%8F%91%E5%B8%83%E4%B8%BAweb%E7%BD%91%E7%AB%99)
  - `Hydration completed but contains mismatches`