# uni-clientdb

uni-clientdb是一个数据库查询组件

HBuilderX 2.9.5+ 支持

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|√|√|


#### 属性

|属性|类型|描述|
|:-|:-|:-|
|v-slot:default||查询状态及结果|
|collection|string|表名|
|orderby|string|排序|
|field|string|查询字段，多个字段用 `,` 分割|
|where|string|查询条件，[详情](https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB?id=jsquery)|
|getone|Boolean|指定查询结果是否返回数组第一条数据，默认位 false，应用场景：详情页|
|action|string|调用数据库查询前后执行的操作，[详情](https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB?id=%e4%ba%91%e7%ab%af%e9%83%a8%e5%88%86)|
|manual|Boolean|是否手动加载数据，默认位 false，自动加载数据|
|@load|EventHandle|成功回调|
|@error|EventHandle|失败回调|

**提示：目前仅支持单表查询**


#### v-slot:default

```
<uni-clientdb v-slot:default="{data, pagination, loading, error, options}"></uni-clientdb>
```


|属性|类型|描述|
|:-|:-|:-|
|data|Array&#124;Object|查询结果，默认值为`Array`, 当 `getone` 指定为 `true` 时，值为数组中第一条数据，类型为 `Object`|
|pagination|Object|分页属性|
|loading|Boolean|查询状态|
|error|Object|查询错误|
|options|Object|插槽不能访问外面的数据，通过此参数传递, 不支持传递函数|

**提示：如果不指定分页模式， `data` 为多次查询的集合**


#### orderby

格式为 `字段名` 空格 `asc`(升序)/`desc`(降序)`，多个字段用 `,` 分割，优先级为字段顺序

示例代码
```
<uni-clientdb orderby="createTime desc"></uni-clientdb>
```



#### pagination属性

|属性|类型|描述|
|:-|:-|:-|
|current|Number|当前页|
|size|Number|每页多少条数据|
|total|Boolean|分页模式，默认 `false`，需要分页模式时指定为 `true`|


#### 事件

```
@load
handleLoad(data, ended, pagination) {
  // `data` 当前查询结果
  // `ended` 是否有更多数据
  // `pagination` 分页信息
}
```

```
@error
handleError(e) {
  // {errorMessage}
}
```


#### 方法

```
// loadMore
// 使用ref方式访问组件方法加载更过数据，每加载成功一次，当前页 +1
this.$refs.dataQuery.loadMore()
```


#### 示例代码


**需要在 uniCloud 控制台增加 Schema 权限配置**，详情 [https://uniapp.dcloud.net.cn/uniCloud/schema](https://uniapp.dcloud.net.cn/uniCloud/schema)


滚动模式

```

<template>
  <view class="content">
    <uni-clientdb ref="dataQuery" v-slot:default="{data, pagination, loading, error, options}"
      :options="options"
      :collection="collection"
      orderby="createTime desc"
      field="name,subType,createTime"
      :getone="false"
      :action="action"
      :where="where"
      :pagination="pagination" @load="onqueryload" @error="onqueryerror">
      <view>{{pagination}}</view>
      <view v-if="error" class="error">{{error.errMsg}}</view>
      <view v-else class="list">
        <view v-for="(item, index) in data" :key="index" class="list-item">
          {{ item.createTime }}
          <!-- 使用日期格式化组件，详情见插件 https://ext.dcloud.net.cn/search?q=date-format -->
          <!-- <uni-date-format :date="item.createTime" /> -->
        </view>
      </view>
      <view class="loading" v-if="loading">加载中...</view>
    </uni-clientdb>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        options: {}, // 插槽不能访问外面的数据，通过此参数传递, 不支持传递函数
        collection: 'unicloud-test',
        pagination: {
          current: 1,
          size: 10,
          total: true
        },
        action: '',
        where: {} // 类型为对象或字符串
      }
    },
    onReady() {
      // 当 uni-clientdb manual 属性设为为 true 时，手动加载数据
      // this.$refs.dataQuery.loadData()
    },
    onPullDownRefresh() {
      this.$refs.dataQuery.loadData({
        clear: true
      }, () => {
        uni.stopPullDownRefresh()
      })
    },
    onReachBottom() {
      this.$refs.dataQuery.loadMore()
    },
    methods: {
      onqueryload(data, ended) {
        // 格式化数据
        data.forEach((item) => {
          item.createTime = new Date(item.createTime).toLocaleString()
        })

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


分页模式

```
<template>
  <view class="content">
    <uni-clientdb ref="dataQuery" v-slot:default="{data, pagination, loading, error, options}"
      :options="options"
      :collection="collection"
      orderby="createTime desc"
      field="name,subType,createTime"
      :getone="false"
      :action="action"
      :pagination="pagination" @load="onqueryload" @error="onqueryerror">
      <view>{{pagination}}</view>
      <view v-if="error" class="error">{{error.errMsg}}</view>
      <view v-else class="list">
        <view v-for="(item, index) in data" :key="index" class="list-item">
          {{ item.createTime }}
        </view>
      </view>
      <view class="loading" v-if="loading">加载中...</view>
      <!-- 分页组件 -->
      <uni-pagination show-icon :page-size="pagination.size" v-model="options.current" total="pagination.total" @change="onpagination" />
    </uni-clientdb>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        options: {}, // 插槽不能访问外面的数据，通过此参数传递, 不支持传递函数
        collection: 'unicloud-test',
        pagination: {
          current: 1,
          size: 10,
          total: true
        },
        action: '',
        where: {} // 类型为对象或字符串
      }
    },
    onPullDownRefresh() {
      this.$refs.dataQuery.loadData({
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

        if (ended) {
          // 没有更多数据了
        }
      },
      onqueryerror(e) {
        // 加载数据失败
      },
      onpagination(e) {
        this.$refs.dataQuery.loadData({
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


**调试小技巧**

- H5平台，开发模式下浏览器控制台输入 `unidev.clientDB.data`，可查看组件内部数据，多个组件通过索引查看 `unidev.clientDB.data[0]`
