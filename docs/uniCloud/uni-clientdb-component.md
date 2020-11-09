## uni-clientdb组件简介

`<uni-clientdb>` 组件是一个数据库查询组件，它是对`uni-clientdb`的js库的再封装。

前端通过组件方式直接获取uniCloud的云端数据库中的数据，并绑定在界面上进行渲染。

在传统开发中，开发者需要在前端定义data、通过request联网获取接口数据、然后赋值给data。同时后端还需要写接口来查库和反馈数据。

有了`<uni-clientdb>` 组件，**上述工作只需要1行代码**！写组件，设组件的属性，在属性中指定要查什么表、哪些字段、以及查询条件，就OK了！

敲下`udb`代码块，得到如下代码：

```html
<uni-clientdb v-slot:default="{data, loading, error, options}" collection="table1" field="field1" :getone="true" where="id=='1'">
  <view>
    {{ data.name}}
  </view>
</uni-clientdb>
```

`<uni-clientdb>` 组件尤其适用于列表、详情等展示类页面。开发效率可以大幅度的提升。

`<uni-clientdb>` 组件的查询语法是`jql`，这是一种比sql语句和nosql语法更简洁、更符合js开发者习惯的查询语法。没学过sql或nosql的前端，也可以轻松掌握。[jql详见](https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB?id=jsquery)

`<uni-clientdb>` 组件只支持查询。如果要对数据库进行新增修改删除操作，仍需使用clientDB的js API进行add、update、remove操作。另，`<uni-clientdb>` 组件自带了一个封装remove方法，见下文方法章节

`<uni-clientdb>` 组件没有预置到基础库，需单独下载插件到工程中。下载地址为：[https://ext.dcloud.net.cn/plugin?id=3256](https://ext.dcloud.net.cn/plugin?id=3256)

**平台差异及版本说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快应用|360小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√（2.9.5+）|√|√|√|√|√|√|x|√|

从HBuilderX 2.9.5+ 起支持`<uni-clientdb>`组件，与小程序基础库版本无关。

## 属性

|属性|类型|描述|
|:-|:-|:-|
|v-slot:default||查询状态（失败、联网中）及结果（data）|
|ref|string|vue组件引用标记|
|collection|string|表名。支持输入多个表名，用 `,` 分割|
|field|string|查询字段，多个字段用 `,` 分割|
|where|string|查询条件，内容较多，另见`jql`文档：[详情](https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB?id=jsquery)|
|orderby|string|排序字段及正序倒叙设置|
|page-data|String|分页策略选择。值为 `add` 代表下一页的数据追加到之前的数据中，常用于滚动到底加载下一页；值为 `replace` 时则替换当前data数据，常用于PC式交互，列表底部有页码分页按钮|
|page-current|Number|当前页|
|page-size|Number|每页数据数量|
|getcount|Boolean|是否查询总数据条数，默认 `false`，需要分页模式时指定为 `true`|
|getone|Boolean|指定查询结果是否仅返回数组第一条数据，默认 false。在false情况下返回的是数组，即便只有一条结果，也需要[0]的方式获取。在值为 true 时，直接返回结果数据，少一层数组。一般用于非列表页，比如详情页|
|action|string|云端执行数据库查询的前或后，触发某个action函数操作，进行预处理或后处理，[详情](https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB?id=%e4%ba%91%e7%ab%af%e9%83%a8%e5%88%86)。场景：前端无权操作的数据，比如阅读数+1|
|manual|Boolean|是否手动加载数据，默认为 false，页面onready时自动联网加载数据。如果设为 true，则需要自行指定时机通过方法`this.$refs.udb.loadData()`来触发联网，其中的`udb`指组件的ref值|
|@load|EventHandle|成功回调。联网返回结果后，若希望先修改下数据再渲染界面，则在本方法里对data进行修改|
|@error|EventHandle|失败回调|

TODO：暂不支持groupby、in子查询功能。后续会补充


**示例**

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

**注意：除非使用admin账户登录操作，否则需要在 uniCloud 控制台对要查询的表增加 Schema 权限配置。至少配置读取权限，否则无权查询**，详情 [https://uniapp.dcloud.net.cn/uniCloud/schema](https://uniapp.dcloud.net.cn/uniCloud/schema)

## v-slot:default

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


## orderby

格式为 `字段名` 空格 `asc`(升序)/`desc`(降序)`，多个字段用 `,` 分割，优先级为字段顺序

<!-- 升序可以不写，不写默认就是升序。 -->

示例代码
```
<uni-clientdb orderby="createTime desc"></uni-clientdb>
```

## 事件

- load事件

load事件在查询执行后、渲染前触发，一般用于查询数据的二次加工。比如查库结果不能直接渲染时，可以在load事件里先对data进行预处理。

``` html
...
<uni-clientdb @load="handleLoad" />
...

handleLoad(data, ended, pagination) {
  // `data` 当前查询结果
  // `ended` 是否有更多数据
  // `pagination` 分页信息
}
```

数据库里的时间一般是时间戳，不能直接渲染。虽然可以在load事件中对时间格式化，但简单的方式是使用[`<uni-dateformat>`组件](https://ext.dcloud.net.cn/plugin?id=3279)，无需写js处理。

- error事件

error事件在查询报错时触发

``` html
...
<uni-clientdb @error="handleError" />
...

handleError(e) {
  // {message}
}
```


## 方法

### loadData

当 `<uni-clientdb>` 组件的 manual 属性设为为 true 时，不会在页面初始化时联网查询数据，此时需要通过本方法手动加载数据

```js
this.$refs.udb.loadData() //udb为uni-clientdb组件的ref属性值
```

### loadMore

在列表的加载下一页场景下，使用ref方式访问组件方法，加载更多数据，每加载成功一次，当前页 +1

```js
this.$refs.udb.loadMore() //udb为uni-clientdb组件的ref属性值
```

### remove

在列表页面，如果想删除一个item，原本要做很多事：
1. 弹出删除确认框
2. 弹出loading
3. 调用clientDB的js api删除云端数据
4. 接收云端删除结果，如果成功则关闭loading
5. 进一步删除列表的data中对应的item，刷新页面

为减少重复开发，`clientDB`组件提供了remove方法，在列表渲染时绑定好index，直接调用remove方法即可一行代码完成上述5步。

首先在列表生成的时候给删除按钮绑定好id：

```html
<uni-clientdb ref="udb" :collection="collectionName" v-slot:default="{data,pagination,loading,error}">
	<uni-table :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe >
		<uni-tr>
			<uni-th>用户名</uni-th>
			<uni-th>操作</uni-th>
		</uni-tr>
		<uni-tr v-for="(item,index) in data" :key="index">
			<uni-th>{{item.username}}</uni-th>
			<uni-td>
				<view>
					<button @click="confirmDelete(item._id)" type="warn">删除</button>
				</view>
			</uni-td>
		</uni-tr>
	</uni-table>
</uni-clientdb>
```

然后confirmDelete方法里面只有一行代码：

```js
confirmDelete(id) {
	this.$refs.udb.remove(id)
}
```

`clientDB`组件的remove方法的参数只支持传入数据库的_id进行删除，不支持其他where条件删除。

参数传入的_id支持单个，也支持多个，即可以批量删除。多个id的格式是：

```js
this.$refs.udb.remove(["5f921826cf447a000151b16d", "5f9dee1ff10d2400016f01a4"])
```

在uniCloud的web控制台的`DB Schema`界面，可自助生成数据表的admin管理插件，其中有多行数据批选批删示例。


完整实例，第二个是可选参数

```js
var ids = ["5f921826cf447a000151b16d", "5f9dee1ff10d2400016f01a4"]
this.$refs.udb.remove(ids, {
  action: '', // 删除前后的动作
  confirmTitle: '提示', // 确认框标题
  confirmContent: '是否删除该数据',  // 确认框内容
  callback: (res) => { // 删除成功后的回调
    const { code, message } = res
  }
})
```

注意：
- 如果列表分页采取分页组件，即page-data值为`replace`，每页有固定数量，那么`clientDB`组件的remove方法删除数据后，会重新请求当前页面数据。
- 如果列表采取滚动加载方式，即page-data值为`add`，滚动加载下一页数据，那么`clientDB`组件的remove方法删除数据后，不会重新请求数据，而是从已有数据移除已删除项。(组件版本1.1.0+支持)



### dataList

在js中，可以打印`<uni-clientdb>` 组件的data

```js
console.log(this.$refs.udb.dataList);
```

但是在浏览器控制台里无法使用this来打印查看数据，为此特别新增了`unidev.clientDB.data`方法以优化调试体验。

H5平台，开发模式下浏览器控制台输入 `unidev.clientDB.data`，可查看组件内部数据，多个组件通过索引查看 `unidev.clientDB.data[0]`


## 联表查询

```html
// 注意 `collection` 属性需要传入所有用到的表名，用逗号分隔，主表需要放在第一位
// where 属性 查询order表内书名为“三国演义”的订单
// field 属性 查询book表返回book表内的title、book表内的author、order表内的quantity
<template>
  <view>
    <uni-clientdb v-slot:default="{data, loading, error, options}" collection="order,book" where="'book.title == "三国演义"'" field="book{title,author},quantity">
      <view>
		  <view v-for="(item, index) in data" :key="index" class="list-item">
		    {{ item.name}}
		  </view>
      </view>
    </uni-clientdb>
  </view>
</template>
```

联表查询详情参考 [https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=lookup](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=lookup)

## 列表分页@page
- 列表分页模式1：上拉加载上一页。下一页的查询结果会追加合并到data里

```html
<template>
  <view class="content">
    <uni-clientdb ref="udb" v-slot:default="{data, pagination, loading, error, options}"
      :options="options"
      collection="table1"
      orderby="createTime desc"
      field="name,subType,createTime"
      :getone="false"
      :action="action"
      :where="where"
      @load="onqueryload" @error="onqueryerror">
      <view v-if="error" class="error">{{error.message}}</view>
      <view v-else class="list">
        <view v-for="(item, index) in data" :key="index" class="list-item">
		  {{item.name}}
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
        action: '',
        where: {} // 类型为对象或字符串
      }
    },
    onPullDownRefresh() { //下拉刷新
      this.$refs.udb.loadData({
        clear: true
      }, () => {
        uni.stopPullDownRefresh()
      })
    },
    onReachBottom() { //滚动到底翻页
      this.$refs.udb.loadMore()
    },
    methods: {
      onqueryload(data, ended) {
		// 可在此处预处理数据，然后再渲染界面
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


- 列表分页模式2：使用分页控件，点击第二页则只显示第二页数据，第一页数据清空。data会重置为下一页的查询结果，上一页数据丢弃

```html
<template>
  <view class="content">
    <uni-clientdb ref="udb" v-slot:default="{data, pagination, loading, error, options}"
      :options="options"
      collection="table1"
      orderby="createTime desc"
      field="name,subType,createTime"
      :getcount="true"
      @load="onqueryload" @error="onqueryerror">
      <view>{{pagination}}</view>
      <view v-if="error" class="error">{{error.errMsg}}</view>
      <view v-else class="list">
        <view v-for="(item, index) in data" :key="index" class="list-item">
		  {{item.name}}
          <!-- 使用日期格式化组件，详情见插件 https://ext.dcloud.net.cn/search?q=date-format -->
          <uni-dateformat :date="item.createTime" />
        </view>
      </view>
      <view class="loading" v-if="loading">加载中...</view>
      <!-- 分页组件 -->
      <uni-pagination show-icon :page-size="pagination.size" total="pagination.count" @change="onpagination" />
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
    onPullDownRefresh() { //下拉刷新
      this.$refs.udb.loadData({
        clear: true
      }, () => {
        uni.stopPullDownRefresh()
      })
    },
    methods: {
      onqueryload(data, ended) {
		// 可在此处预处理数据，然后再渲染界面
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

使用分页控件，常见于PC端。在这个uniCloud Admin的[权限管理插件](https://ext.dcloud.net.cn/plugin?id=3269)插件中，有完整的分页展示数据、新增删除数据的示例代码。

## 组件嵌套

`<uni-clientdb>` 组件支持嵌套。

子组件中访问父组件 data 时，需options传递数据

如下示例演示了2个组件的嵌套，以及在子组件中如何访问父组件 data


``` html
<uni-clientdb v-slot:default="{data, loading, error, options}" :options="options" collection="table1"
    orderby="createTime desc" field="name,createTime">
    <view v-if="error" class="error">{{error.errMsg}}</view>
    <view v-else class="list">
      <!-- table1 返回的数据 -->
      <view v-for="(item, index) in options" :key="index" class="list-item">
        {{ item.name }}
      </view>
    </view>
    <!-- 嵌套 -->
    <!-- :options="data",将 父组件返回的 data 通过 options 传递到组件，子组件通过 options 访问 -->
    <uni-clientdb ref="dataQuery1" v-slot:default="{loading, data, error, options}" :options="data" collection="table2"
      orderby="createTime desc" field="name,createTime" @load="onqueryload" @error="onqueryerror">
      <!-- 父组件 table1 返回的数据 -->
      <view v-for="(item, index) in options" :key="index" class="list-item">
        {{ item.name }}
      </view>
      <!-- 子组件 table2 返回的数据 -->
      <view v-for="(item, index) in data" :key="index" class="list-item">
        {{ item.name }}
      </view>
    </uni-clientdb>
  </uni-clientdb>
```


完整项目示例见插件市场的示例项目: [https://ext.dcloud.net.cn/plugin?id=3256](https://ext.dcloud.net.cn/plugin?id=3256)


**调试小技巧**

- H5平台，开发模式下浏览器控制台输入 `unidev.clientDB.data`，可查看组件内部数据，多个组件通过索引查看 `unidev.clientDB.data[0]`

