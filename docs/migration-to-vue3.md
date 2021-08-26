#### vue2 项目迁移 vue3，必须适配的部分

以下列举迁移到 vue3，必须适配的几个点，vue2 项目才能正常运行在 vue3 上。更多查看完整的[非兼容特性列表](https://github.com/vuejs/vue-next/tree/master/packages/vue-compat#incompatible)

- main.js

  - 创建应用实例

    ```JS
    // 之前 - Vue 2
    import Vue from 'vue'
    import App from './App'
    Vue.config.productionTip = false    // vue3 不再需要
    App.mpType = 'app'    // vue3 不再需要
    const app = new Vue({
    ...App
    })
    app.$mount()

    // 之后 - Vue 3
    import App from './App'
    import { createSSRApp } from 'vue'
    export function createApp() {
       const app = createSSRApp(App)
       return {
          app
       }
    }
    ```

  - 全局属性，例如：全局网络请求

  ```js
  // 之前 - Vue 2
  Vue.prototype.$http = () => {};

  // 之后 - Vue 3
  const app = createApp({});
  app.config.globalProperties.$http = () => {};
  ```

  - 插件使用，例如：使用 vuex 的 store

  ```js
  // 之前 - Vue 2
  import store from "./store";
  Vue.prototype.$store = store;

  // 之后 - Vue 3
  import store from "./store";
  const app = createApp(App);
  app.use(store);
  ```

- 项目根目录必需创建 index.html 文件，粘贴复制如下内容：

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
      <title></title>
      <!--preload-links-->
      <!--app-context-->
    </head>
    <body>
      <div id="app"><!--app-html--></div>
      <script type="module" src="/main.js"></script>
    </body>
  </html>
  ```

- 只支持使用 ES6 模块规范，commonJS 需改为 ES6 模块规范

  - 导入模块, 例如：

    ```js
    // 之前 - Vue 2, 使用 commonJS
    var utils = require("../../../common/util.js");

    // 之后 - Vue 3， 只支持 ES6 模块
    import utils from "../../../common/util.js";
    ```

  - 模块导出，例如：

    ```js
    // 之前 - Vue 2, 依赖如使用 commonJS 方式导出
    module.exports.X = X;

    // 之后 - Vue 3， 可手动改为 ES6 导出
    export default { X };
    ```

- vuex 用法

  ```js
  // 之前 - Vue 2
    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)
    const store = new Vuex.Store({
        state: {}
    })
    export default store

  // 之后 - Vue 3
    import { createStore } from 'vuex'
    const store = createStore({
        state: {}
    })
    export default store
  ```

- 避免在同一元素上同时使用 v-if 与 v-for

  > 而 Vue3 中，v-if 总是优先于 v-for 生效。以上写法将会在 Vue3 中与预期不符合，由于语法上存在歧义，建议避免在同一元素上同时使用两者（[更多](https://v3.cn.vuejs.org/guide/migration/v-if-v-for.html#%E6%A6%82%E8%A7%88)）。

- 生命周期的适配
  
  在Vue3中组件卸载的生命周期被重新命名
  
  - `destroyed` 修改为 `unmounted`
  - `beforeDestroy` 修改为 `beforeUnmount`

- 事件的适配

  Vue3 现在提供了一个`emits`选项，类似于现有`props`选项。此选项可用于定义组件可以向其父对象发出的事件， [更多](https://v3.cn.vuejs.org/guide/migration/emits-option.html#overview)

  **强烈建议使用`emits`记录每个组件发出的所有事件。**


  这一点特别重要，因为去除了`.native`修饰符。`emits` 现在在未使用声明的事件的所有侦听器都将包含在组件的中`$attrs`，默认情况下，该侦听器将绑定到组件的根节点。

  ```html
  <template>
    <button @click="onClick">OK</button>
  </template>
  <script>
  export default {
    emits: ['click'],
    methods:{
      onClick(){
        this.$emit('click', 'OK')
      }
    }
  }
  </script>
  ```

- v-model 的适配
  Vue3 的 v-model 相对 Vue2 来说 ，有了较大的改变。可以使用多 `model`,相应语法也有变化。[更多](https://v3.cn.vuejs.org/guide/migration/v-model.html#%E6%A6%82%E8%A7%88)

  - 修改 modelValue
    用于自定义组件时，Vue3 v-model prop 和事件默认名称已更改 `props.value` 修改为 `props.modelValue` ,`event.value` 修改为 `update:modelValue`

    ```javascript
    export default {
      props: {
        // value:String,
        // 替换 value 为 modelValue
        modelValue:String
      }
    }
    ```

- 事件返回
  将之前的 `this.$emit('input')` 修改为 `this.$emit('update:modelValue')`  ，vue3 中将省略这一步骤

  自定义组件上的 v-model 相当于传递了 modelValue prop 并接收抛出的 update:modelValue 事件：

  ```html
    <ChildComponent v-model="pageTitle" />
    
    <!-- 是以下的简写: -->
    
    <ChildComponent
      :modelValue="pageTitle"
      @update:modelValue="pageTitle = $event"
    />
  ```


  若需要更改 model 名称，作为组件内 model 选项的替代，现在我们可以将一个 argument 传递给 v-model：

  ```html
    <ChildComponent v-model:title="pageTitle" />
    
    <!-- 是以下的简写: -->
    
    <ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
  ```

- 插槽的适配

  Vue3 将不支持 `slot="xxx"` 的用法 ，请使用 `v-slot:xxx` 用法。[更多](https://v3.cn.vuejs.org/guide/component-slots.html#%E5%85%B7%E5%90%8D%E6%8F%92%E6%A7%BD)

  ```html
  <!--  Vue2 支持的用法 -->
  <uni-nav-bar>
    <view slot="left" class="city">
      <!-- ... -->
    </view>
  </uni-nav-bar>
  ```

  ```html
  <!--  Vue3 支持的用法 -->
  <uni-nav-bar>
    <template v-slot:left>
      <view class="city">
        <!-- ... -->
      </view>
    </template>
  </uni-nav-bar>
  ```

- 从 Vue 3.0 开始，过滤器已删除，不再支持，建议用方法调用或计算属性替换它们。[更多](https://v3.cn.vuejs.org/guide/migration/filters.html#%E6%A6%82%E8%A7%88)