# uni-clientdb

uni-clientdb组件是一个数据库查询组件，它是对uni-clientdb的js库的再封装。

前端可以以组件方式非常方便的获取uniCloud的云端数据库中的数据，并绑定在界面上进行渲染。

在传统开发中，开发者需要在前端定义data、通过request联网获取接口数据、然后赋值给data。同时后端还是写接口来查库和反馈数据。

有了uni-clientdb组件，**上述工作只需要1行代码**！写组件，设组件的属性，在组件中指定要查什么表、哪些字段、以及查询条件，就OK了！

尤其适用于列表、详情等展示类页面。开发效率可以大幅度的提升。

同时，它的查询写法也比sql语句和nosql语法更简洁、更符合js开发者的习惯。没学过sql或nosql的前端，也可以轻松掌握。

**平台差异及版本说明**

HBuilderX 2.9.5+ 暂不支持快应用


#### 属性

|属性|类型|描述|
|:-|:-|:-|
|v-slot:default||查询状态（失败、联网中）及结果（data）|
|ref|string|vue组件引用标记|
|collection|string|表名|
|field|string|查询字段，多个字段用 `,` 分割|
|where|string|查询条件，内容较多，另见文档：[详情](https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB?id=jsquery)|
|orderby|string|排序字段及正序倒叙设置|
|page-current|Number|当前页|
|page-size|Number|每页数据数量|
|need-total|Boolan|是否查询总数据条数，默认 `false`，需要分页模式时指定为 `true`|
|getone|Boolean|指定查询结果是否返回数组第一条数据，默认 false。在false情况下返回的是数组，即便只有一条结果，也需要[0]的方式获取。在true下，直接返回结果数据，少一层数组。应用场景：详情页|
|action|string|云端执行数据库查询的前或后，触发某个action函数操作，进行预处理或后处理，[详情](https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB?id=%e4%ba%91%e7%ab%af%e9%83%a8%e5%88%86)。场景：前端无权操作的数据，比如阅读数+1|
|manual|Boolean|是否手动加载数据，默认为 false，页面onready时自动联网加载数据。如果设为 true，则需要自行指定时机通过方法`this.$refs.udb.loadData()`来触发联网，其中的`udb`指组件的ref值|
|@load|EventHandle|成功回调。如联网返回结果后，想修改下数据再渲染界面，则在本方法里对data进行修改|
|@error|EventHandle|失败回调|

**提示：目前仅支持单表查询，后续会补充跨表查询、groupby等高级功能**


#### v-slot:default

```
<uni-clientdb v-slot:default="{data, pagination, loading, error, options}"></uni-clientdb>
```


|属性|类型|描述|
|:-|:-|:-|
|data|Array&#124;Object|查询结果，默认值为`Array`, 当 `getone` 指定为 `true` 时，值为数组中第一条数据，类型为 `Object`，减少了一层|
|pagination|Object|分页属性|
|loading|Boolean|查询中的状态。可根据此状态，在template中通过v-if显示等待内容，如`<view v-if="loading">加载中...</view>`|
|error|Object|查询错误。可根据此状态，在template中通过v-if显示等待内容，如`<view v-if="error">加载错误</view>`|
|options|Object|在小程序中，插槽不能访问外面的数据，需通过此参数传递, 不支持传递函数|

**提示：如果不指定分页模式， `data` 为多次查询的集合**


#### orderby

格式为 `字段名` 空格 `asc`(升序)/`desc`(降序)`，多个字段用 `,` 分割，优先级为字段顺序

示例代码
```
<uni-clientdb orderby="createTime desc"></uni-clientdb>
```


#### 事件

load事件在查询执行后、渲染前触发，一般用于查询数据的二次加工。比如查库结果不能直接渲染时，可以在load事件里先对data进行预处理。

```
@load
handleLoad(data, ended, pagination) {
  // `data` 当前查询结果
  // `ended` 是否有更多数据
  // `pagination` 分页信息
}
```

error事件在查询报错时触发

```
@error
handleError(e) {
  // {errorMessage}
}
```


#### 方法

当 uni-clientdb 组件的 manual 属性设为为 true 时，不会在页面初始化时联网查询数据，此时需要通过本方法手动加载数据

```js
this.$refs.udb.loadData() //udb为uni-clientdb组件的ref属性值
```


在列表的加载下一页场景下，使用ref方式访问组件方法，加载更多数据，每加载成功一次，当前页 +1

```js
this.$refs.udb.loadMore() //udb为uni-clientdb组件的ref属性值
```


#### 示例代码

**需要在 uniCloud 控制台对要查询的表增加 Schema 权限配置。至少配置读取权限，否则无权查询**，详情 [https://uniapp.dcloud.net.cn/uniCloud/schema](https://uniapp.dcloud.net.cn/uniCloud/schema)

比如云数据库有个user的表，里面有字段id、name，查询id=1的数据，那么写法如下：
```html
<template>
  <view>
    <uni-clientdb v-slot:default="{data, loading, error, options}" collection="user" field="name" :getone="true" where="id=='1'">
      <view>
          {{ data.name}}
      </view>
    </uni-clientdb>
  </view>
</template>

```


模式1：上拉加载上一页。下一页的查询结果会追加合并到data里

```html

<template>
  <view class="content">
    <uni-clientdb ref="udb" v-slot:default="{data, pagination, loading, error, options}"
      :options="options"
      :collection="collection"
      orderby="createTime desc"
      field="name,subType,createTime"
      :getone="false"
      :action="action"
      :where="where"
      @load="onqueryload" @error="onqueryerror">
      <view v-if="error" class="error">{{error.errMsg}}</view>
      <view v-else class="list">
        <view v-for="(item, index) in data" :key="index" class="list-item">
          {{ item.createTime }}
          <!-- 使用日期格式化组件，详情见插件 https://ext.dcloud.net.cn/search?q=date-format -->
          <uni-dateformat :date="item.createTime" />
        </view>
      </view>
      <view v-if="loading" class="loading">加载中...</view>
    </uni-clientdb>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        options: {}, // 插槽不能访问外面的数据，通过此参数传递, 不支持传递函数
        collection: 'table1',
        pagination: {
          current: 1,
          size: 20,
          total: true
        },
        action: '',
        where: {} // 类型为对象或字符串
      }
    },
    onReady() {
      // 当 uni-clientdb manual 属性设为为 true 时，手动加载数据
      // this.$refs.udb.loadData()
    },
    onPullDownRefresh() {
      this.$refs.udb.loadData({
        clear: true
      }, () => {
        uni.stopPullDownRefresh()
      })
    },
    onReachBottom() {
      this.$refs.udb.loadMore()
    },
    methods: {
      onqueryload(data, ended) {
        // 格式化数据
        // data.forEach((item) => {
        //   item.createTime = new Date(item.createTime).toLocaleString()
        // })

        // 模板中已使用格式化事件组件，不在需要上面的js处理

        if (ended) {
          // 没有更多数据了
        }
      },
      onqueryerror(e) {
        // 加载数据失败
      }
    }
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
  }

  .list-item {
    background-color: #fff;
    margin-bottom: 1px;
    padding: 30px 15px;
  }

  .loading {
    padding: 20px;
    text-align: center;
  }

  .error {
    color: #DD524D;
  }
</style>

```


模式2：使用分页控件，点击第二页则只显示第二页数据，第一页数据清空。data会重置为下一页的查询结果，上一页数据丢弃

```html
<template>
  <view class="content">
    <uni-clientdb ref="udb" v-slot:default="{data, pagination, loading, error, options}"
      :options="options"
      collection="unicloud-test"
      orderby="createTime desc"
      field="name,subType,createTime"
      :need-total="true"
      @load="onqueryload" @error="onqueryerror">
      <view>{{pagination}}</view>
      <view v-if="error" class="error">{{error.errMsg}}</view>
      <view v-else class="list">
        <view v-for="(item, index) in data" :key="index" class="list-item">
          {{ item.createTime }}
        </view>
      </view>
      <view class="loading" v-if="loading">加载中...</view>
      <!-- 分页组件 -->
      <uni-pagination show-icon :page-size="pagination.size" total="pagination.total" @change="onpagination" />
    </uni-clientdb>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        options: {}, // 插槽不能访问外面的数据，通过此参数传递, 不支持传递函数
      }
    },
    onPullDownRefresh() {
      this.$refs.udb.loadData({
        clear: true
      }, () => {
        uni.stopPullDownRefresh()
      })
    },
    methods: {
      onqueryload(data, ended) {
        data.forEach((item) => {
          item.createTime = new Date(item.createTime).toLocaleString()
        })
        // 上述时间格式化仅为演示，实际开发中推荐在组件里直接使用`<uni-dateformat>`组件，不用在load事件中通过js格式化数据
        if (ended) {
          // 没有更多数据了
        }
      },
      onqueryerror(e) {
        // 加载数据失败
      },
      onpagination(e) {
        this.$refs.udb.loadData({
          current: e.current
        })
      }
    }
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
  }

  .list-item {
    background-color: #fff;
    margin-bottom: 1px;
    padding: 30px 15px;
  }

  .loading {
    padding: 20px;
    text-align: center;
  }

  .error {
    color: #DD524D;
  }
</style>

```


组件嵌套示例，访问父组件 data


```
<uni-clientdb ref="dataQuery" v-slot:default="{data, pagination, loading, error, options}" :options="options" collection="unicloud-test"
    orderby="createTime desc" field="name,createTime"
    :where="where" @load="onqueryload" @error="onqueryerror">
    <view>{{pagination}}</view>
    <view v-if="error" class="error">{{error.errMsg}}</view>
    <view v-else class="list">
      <view v-for="(item, index) in data" :key="index" class="list-item">
        {{ item.name }}
        {{ item.createTime }}
      </view>
    </view>
    <view class="loading" v-if="loading">加载中...</view>
    <!-- 嵌套测试 -->
    <!--  :options="data",将 父组件返回的 data 通过 options 传递到组件，子组件通过 options 访问 -->
    <uni-clientdb ref="dataQuery1" v-slot:default="{loading, data, error, options}" :options="data" collection="unicloud-test"
      orderby="createTime desc" field="name,createTime" @load="onqueryload" @error="onqueryerror">
      <view v-if="options" class="error">{{options}}</view>
      <view v-if="error" class="error">{{error.errMsg}}</view>
      <view v-else class="list">
        <view v-for="(item, index) in data" :key="index" class="list-item">
          {{ item.name }}
        </view>
      </view>
    </uni-clientdb>
  </uni-clientdb>
```



**调试小技巧**

- H5平台，开发模式下浏览器控制台输入 `unidev.clientDB.data`，可查看组件内部数据，多个组件通过索引查看 `unidev.clientDB.data[0]`

**Tips**

- 时间显示，推荐使用`<uni-dateformat>`组件，可以避免在 load 事件中写代码对时间进行格式处理。
