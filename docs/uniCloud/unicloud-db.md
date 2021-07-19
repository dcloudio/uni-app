## unicloud-db组件简介

`<unicloud-db>` 组件是一个数据库查询组件，它是对`clientDB`的js库的再封装。

前端通过组件方式直接获取uniCloud的云端数据库中的数据，并绑定在界面上进行渲染。

在传统开发中，开发者需要在前端定义data、通过request联网获取接口数据、然后赋值给data。同时后端还需要写接口来查库和反馈数据。

有了`<unicloud-db>` 组件，**上述工作只需要1行代码**！写组件，设组件的属性，在属性中指定要查什么表、哪些字段、以及查询条件，就OK了！

HBuilderX中敲下`udb`代码块，得到如下代码，然后通过collection属性指定要查询表“table1”，通过field属性指定要查询字段“field1”，并且在where属性中指定查询id为1的数据。查询结果data就可以直接渲染在界面上。

```html
<unicloud-db v-slot:default="{data, loading, error, options}" collection="table1" field="field1" :getone="true" where="id=='1'">
  <view>
    {{ data}}
  </view>
</unicloud-db>
```

`<unicloud-db>` 组件尤其适用于列表、详情等展示类页面。开发效率可以大幅度的提升。

`<unicloud-db>` 组件的查询语法是`jql`，这是一种比sql语句和nosql语法更简洁、更符合js开发者习惯的查询语法。没学过sql或nosql的前端，也可以轻松掌握。[jql详见](https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB?id=jsquery)

`<unicloud-db>` 组件不仅支持查询。还自带了add、remove、update方法，见下文方法章节

**平台差异及版本说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快应用|360小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|x|√|

需 HBuilderX 3.0+

`<unicloud-db>` 由原 `<uni-clientdb>插件` 升级而来，从 HBuilderX 3.0 起`<unicloud-db>`内置到框架，与小程序基础库版本无关。

如果需要 HBuilderX3.0 以下版本使用clientDB组件，则需要从插件市场单独下载`<uni-clientdb>插件`，下载地址为：[https://ext.dcloud.net.cn/plugin?id=3256](https://ext.dcloud.net.cn/plugin?id=3256)。但仍然推荐升级HBuilderX 3.0+。


## 属性@props

|属性|类型|描述|
|:-|:-|:-|
|v-slot:default||查询状态（失败、联网中）及结果（data）|
|ref|string|vue组件引用标记|
|collection|string|表名。支持输入多个表名，用 `,` 分割|
|field|string|指定要查询的字段，多个字段用 `,` 分割。不写本属性，即表示查询所有字段。支持用 oldname as newname方式对返回字段重命名|
|where|string|查询条件，对记录进行过滤。[见下](/uniCloud/unicloud-db?id=where)|
|orderby|string|排序字段及正序倒序设置|
|foreign-key|String|手动指定使用的关联关系，HBuilderX 3.1.10+ [详情](/uniCloud/clientdb?id=lookup-foreign-key)|
|page-data|String|分页策略选择。值为 `add` 代表下一页的数据追加到之前的数据中，常用于滚动到底加载下一页；值为 `replace` 时则替换当前data数据，常用于PC式交互，列表底部有页码分页按钮，默认值为`add`|
|page-current|Number|当前页|
|page-size|Number|每页数据数量|
|getcount|Boolean|是否查询总数据条数，默认 `false`，需要分页模式时指定为 `true`|
|getone|Boolean|指定查询结果是否仅返回数组第一条数据，默认 false。在false情况下返回的是数组，即便只有一条结果，也需要[0]的方式获取。在值为 true 时，直接返回结果数据，少一层数组，一般用于非列表页，比如详情页|
|action|string|云端执行数据库查询的前或后，触发某个action函数操作，进行预处理或后处理，[详情](/uniCloud/uni-clientDB?id=%e4%ba%91%e7%ab%af%e9%83%a8%e5%88%86)。场景：前端无权操作的数据，比如阅读数+1|
|manual|Boolean|**已过时，使用 `loadtime` 替代** 是否手动加载数据，默认为 false，页面onready时自动联网加载数据。如果设为 true，则需要自行指定时机通过方法`this.$refs.udb.loadData()`来触发联网，其中的`udb`指组件的ref值。一般onLoad因时机太早取不到this.$refs.udb，在onReady里可以取到|
|gettree|Boolean|是否查询树状结构数据，HBuilderX 3.0.5+ [详情](/uniCloud/clientdb?id=gettree)|
|startwith|String|gettree的第一层级条件，此初始条件可以省略，不传startWith时默认从最顶级开始查询，HBuilderX 3.0.5+|
|limitlevel|Number|gettree查询返回的树的最大层级。超过设定层级的节点不会返回。默认10级，最大15，最小1，HBuilderX 3.0.5+|
|groupby|String|对数据进行分组，HBuilderX 3.1.0+|
|group-field|String|对数据进行分组统计|
|distinct|Boolean|是否对数据查询结果中重复的记录进行去重，默认值false，HBuilderX 3.1.0+|
|loadtime|String|加载数据时机，默认auto，可选值 auto&#124;onready&#124;manual,[详情](/uniCloud/unicloud-db?id=loadtime) HBuilderX3.1.10+|
|@load|EventHandle|成功回调。联网返回结果后，若希望先修改下数据再渲染界面，则在本方法里对data进行修改|
|@error|EventHandle|失败回调|

TODO：暂不支持in子查询功能。后续会补充

注意：`page-current/page-size` 改变不重置数据(`page-data="replace"`) 和 (`loadtime="manual"`) 除外，`collection/action/field/getcount/orderby/where` 改变后清空已有数据


**示例**

比如云数据库有个user的表，里面有字段id、name，查询id=1的数据，那么写法如下：

**注意下面示例使用了getone会返回一条对象形式的data，如不使用getone，data将会是数组形式，即多一层**

```html
<template>
  <view>
    <unicloud-db v-slot:default="{data, loading, error, options}" collection="user" field="name" :getone="true" where="id=='1'">
      <view>
          {{ data.name}}
      </view>
    </unicloud-db>
  </view>
</template>

```

**注意：除非使用admin账户登录操作，否则需要在 uniCloud 控制台对要查询的表增加 Schema 权限配置。至少配置读取权限，否则无权在前端查询**，详见 [DB Schema](/uniCloud/schema)

## v-slot:default

```html
<unicloud-db v-slot:default="{data, pagination, loading, hasMore, error, options}"></unicloud-db>
```


|属性|类型|描述|
|:-|:-|:-|
|data|Array&#124;Object|查询结果，默认值为`Array`, 当 `getone` 指定为 `true` 时，值为数组中第一条数据，类型为 `Object`，减少了一层|
|pagination|Object|分页属性|
|loading|Boolean|查询中的状态。可根据此状态，在template中通过v-if显示等待内容，如`<view v-if="loading">加载中...</view>`|
|hasMore|Boolean|是否有更多数据。可根据此状态，在template中通过v-if显示没有更多数据了，如`<uni-load-more v-if="!hasMore" status="noMore"></uni-load-more>`, `<uni-load-more>`详情 [https://ext.dcloud.net.cn/plugin?id=29](https://ext.dcloud.net.cn/plugin?id=29)|
|error|Object|查询错误。可根据此状态，在template中通过v-if显示等待内容，如`<view v-if="error">加载错误</view>`|
|options|Object|在小程序中，插槽不能访问外面的数据，需通过此参数传递, 不支持传递函数|

**提示：如果不指定分页模式， `data` 为多次查询的集合**

状态示例：
```html
<unicloud-db v-slot:default="{data, loading, error, options}" collection="user">
	<view v-if="error">{{error.message}}</view>
	<view v-else-if="loading">正在加载...</view>
	<view v-else>
		{{data}}
	</view>
</unicloud-db>

```

## where@where

where中指定要查询的条件。比如只查询某个字段的值符合一定条件的记录。

组件的where属性，与clientDB的JS API是一致的，且内容较多，所以详见js API中相关`jql`文档：[详情](/uniCloud/uni-clientDB?id=jsquery)

但组件与js API有一个差别，就是组件的属性中若使用js中的变量，需额外注意。

例如查询uni-id-users表，字段username的值由js变量指定，有如下几种方式：

方式1. 使用模板字符串，用${}包裹变量
```html
<template>
	<view>
		<unicloud-db collection="uni-id-users" :where="`username=='${tempstr}'`"></unicloud-db>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				tempstr: '123'
			}
		}
	}
</script>
```

**注意**

- 此方式目前在微信小程序会报错，近期会进行修复

方式2. 不在属性中写，而在js中拼接字符串
```html
<template>
	<view>
		<unicloud-db ref="udb" collection="uni-id-users" :where="sWhere" loadtime="manual"></unicloud-db>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				tempstr: '123',
				sWhere: ''
			}
		}
		onLoad() {
			this.sWhere = "id=='" + this.tempstr + "'"
			// 组件上配置了 loadtime = "manual", 这里需要手动加载数据
			this.$nextTick(() => {
			  this.$refs.udb.loadData()
			})

			// 多条件示例

			// id = this.tempstr 且 create_time > 1613960340000
			// this.sWhere = "id=='" + this.tempstr + "' && create_time > 1613960340000"

			// id = this.tempstr 或 name != null
			// this.sWhere = "id=='" + this.tempstr + "' || name != null"
		}
	}
</script>
```

上述示例使用的是==比较符，如需进行模糊搜索，则使用正则表达式。插件市场提供了完整的云端一体搜索模板，搜索类页面无需自行开发，可直接使用。[详见](https://ext.dcloud.net.cn/plugin?id=3851)

再次强调，where条件内容较多，组件和api用法相同，完整的where条件文档在api文档中，另见：[JQL文档](/uniCloud/uni-clientDB?id=jsquery)

## orderby

格式为 `字段名` 空格 `asc`(升序)/`desc`(降序)，多个字段用 `,` 分割，优先级为字段顺序

<!-- 升序可以不写，不写默认就是升序。 -->

单字段排序，示例代码
```html
<unicloud-db orderby="createTime desc"></unicloud-db>
```

多字段排序，示例代码
```html
<unicloud-db orderby="createTime1 asc,createTime2 desc"></unicloud-db>
```


## loadtime@loadtime

|值|类型|描述|
|:-|:-|:-|
|auto|String|页面就绪后或属性变化后加载数据，默认为auto|
|onready|String|页面就绪后不自动加载数据，属性变化后加载。适合在onready中接收上个页面的参数作为where条件时。|
|manual|String|手动模式，不自动加载数据。如果涉及到分页，需要先手动修改当前页，在调用加载数据|



## 事件@loadevent

- load事件

load事件在查询执行后、渲染前触发，一般用于查询数据的二次加工。比如查库结果不能直接渲染时，可以在load事件里先对data进行预处理。

``` html
...
<unicloud-db @load="handleLoad" />
...

handleLoad(data, ended, pagination) {
  // `data` 当前查询结果
  // `ended` 是否有更多数据
  // `pagination` 分页信息 HBuilderX 3.1.5+ 支持
}
```

数据库里的时间一般是时间戳，不能直接渲染。虽然可以在load事件中对时间格式化，但更简单的方式是使用[`<uni-dateformat>`组件](https://ext.dcloud.net.cn/plugin?id=3279)，无需写js处理。

- error事件

error事件在查询报错时触发，比如联网失败。

``` html
...
<unicloud-db @error="handleError" />
...

handleError(e) {
  // {message}
}
```


## 方法

### loadData

当 `<unicloud-db>` 组件的 manual 属性设为 true 时，不会在页面初始化时联网查询数据，此时需要通过本方法在需要的时候手动加载数据。

```js
this.$refs.udb.loadData() //udb为unicloud-db组件的ref属性值
```

一般onLoad因时机太早取不到this.$refs.udb，在onReady里可以取到。

举例常见场景，页面pagea在url中获取参数id，然后加载数据

请求地址：/pages/pagea?id=123

pagea.vue源码：

```html
<template>
	<view>
		<unicloud-db ref="udb" collection="table1" :where="where" v-slot:default="{data,pagination,loading,error,options}" :options="options" manual>
			{{data}}
		</unicloud-db>
	</view>
</template>
<script>
export default {
	data() {
		return {
			_id:'',
			where: ''
		}
	},
	onLoad(e) {
		const id = e.id
		if (id) {
			this._id = id
			this.where = "_id == '" + this._id + "'"
		}
		else {
			uni.showModal({
				content:"页面参数错误",
				showCancel:false
			})
		}
	},
	onReady() {
		if (this._id) {
			this.$refs.udb.loadData()
		}
	}
}
</script>
```

下拉刷新示例

`this.$refs.udb.loadData({clear: true}, callback)`，

可选参数 `clear: true`，是否清空数据和分页信息，`true`表示清空，默认`false`

`callback` 是回调函数，加载数据完成后触发（即使加载失败）

```
<script>
	export default {
		data() {
			return {
			}
		},
		// 页面生命周期，下拉刷新后触发
		onPullDownRefresh() {
			this.$refs.udb.loadData({
				clear: true
			}, () => {
				// 停止下拉刷新
				uni.stopPullDownRefresh()
			})
		}
	}
</script>
```


### loadMore

在列表的加载下一页场景下，使用ref方式访问组件方法，加载更多数据，每加载成功一次，当前页 +1

```js
this.$refs.udb.loadMore() //udb为unicloud-db组件的ref属性值
```

### clear

清空已加载的数据，但不会重置当前分页信息

```js
this.$refs.udb.clear() //udb为unicloud-db组件的ref属性值
```

### reset

重置当前分页信息，但不会清空已加载的数据

```js
this.$refs.udb.reset() //udb为unicloud-db组件的ref属性值
```


### remove

语法

`this.$refs.udb.remove(id, options)`

udb为unicloud-db组件的ref属性值


必选参数 id

|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|id|string&#124;Array||传入数据库的_id|


可选参数 options

|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|action|string||云端执行数据库查询的前或后，触发某个action函数操作，进行预处理或后处理，详情。场景：前端无权操作的数据，比如阅读数+1|
|confirmTitle|string|提示|删除确认框标题|
|confirmContent|string|是否删除该数据|删除确认框提示|
|needConfirm|boolean|true|控制是否有弹出框，HBuilderX 3.1.5+|
|needLoading|boolean|true|是否显示Loading，HBuilderX 3.1.5+|
|loadingTitle|string|''|显示loading的标题，HBuilderX 3.1.5+|
|success|function||删除成功后的回调|
|fail|function||删除失败后的回调|
|complete|function||完成后的回调|


在列表页面，如果想删除一个item，原本要做很多事：
1. 弹出删除确认框
2. 弹出loading
3. 调用clientDB的js api删除云端数据
4. 接收云端删除结果，如果成功则关闭loading
5. 进一步删除列表的data中对应的item，自动刷新页面

为减少重复开发，`unicloud-db组件`提供了remove方法，在列表渲染时绑定好index，直接调用remove方法即可一行代码完成上述5步。

首先在列表生成的时候给删除按钮绑定好id：

```html
<unicloud-db ref="udb" :collection="collectionName" v-slot:default="{data,pagination,loading,error}">
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
</unicloud-db>
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


完整实例，第二个是可选参数。

```js
var ids = ["5f921826cf447a000151b16d", "5f9dee1ff10d2400016f01a4"]
this.$refs.udb.remove(ids, {
  action: '', // 删除前后的动作
  confirmTitle: '提示', // 确认框标题
  confirmContent: '是否删除该数据',  // 确认框内容
  success: (res) => { // 删除成功后的回调
    const { code, message } = res
  },
  fail: (err) => { // 删除失败后的回调
    const { message } = err
  },
  complete: () => { // 完成后的回调
  }
})
```

### add

语法

`this.$refs.udb.add(value, options)`

udb为unicloud-db组件的ref属性值


必选参数 value

|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|value|Object||新增数据|


可选参数 options

|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|action|string||云端执行数据库查询的前或后，触发某个action函数操作，进行预处理或后处理，详情。HBuilder 3.1.0+|
|showToast|boolean|true|是否显示更新成功后的提示框|
|toastTitle|string|新增成功|新增成功后的toast提示|
|needLoading|boolean|true|是否显示Loading，HBuilderX 3.1.5+|
|loadingTitle|string|''|显示loading的标题，HBuilderX 3.1.5+|
|success|function||新增成功后的回调|
|fail|function||新增失败后的回调|
|complete|function||完成后的回调|


```html
<unicloud-db ref="udb" :collection="collectionName" v-slot:default="{data,pagination,loading,error}">
</unicloud-db>
```

```js
this.$refs.udb.add(value)
```


完整实例

```js
this.$refs.udb.add(value, {
  toastTitle: '新增成功', // toast提示语
  success: (res) => { // 新增成功后的回调
    const { code, message } = res
  },
  fail: (err) => { // 新增失败后的回调
    const { message } = err
  },
  complete: () => { // 完成后的回调
  }
})
```

### update

语法

`this.$refs.udb.update(id, value, options)`

udb为unicloud-db组件的ref属性值


必选参数 id

|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|id|string||数据的唯一标识|


必选参数 value

|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|value|Object||需要修改的新数据|


可选参数 options

|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|action|string||云端执行数据库查询的前或后，触发某个action函数操作，进行预处理或后处理，详情。HBuilder 3.1.0+|
|showToast|boolean|true|是否显示更新成功后的提示框|
|toastTitle|string|修改成功|修改成功后的toast提示|
|needConfirm|boolean|true|控制是否有弹出框，HBuilderX 3.1.5+|
|needLoading|boolean|true|是否显示Loading，HBuilderX 3.1.5+|
|loadingTitle|string|''|显示loading的标题，HBuilderX 3.1.5+|
|success|function||更新成功后的回调|
|fail|function||更新失败后的回调|
|complete|function||完成后的回调|


使用unicloud-db组件的update方法，除了更新云数据库中的数据外，也会同时更新当前页面的unicloud-db组件中的data数据，自然也会自动差量更新页面渲染的内容。同时update方法还封装了修改成功的toast提示。

```html
<unicloud-db ref="udb" :collection="collectionName" v-slot:default="{data,pagination,loading,error}" :getone="true">
</unicloud-db>
```

第一个参数 `id` 是数据的唯一标识，第二个参数 `value` 是需要修改的新数据
```js
this.$refs.udb.update(id, value)
```

完整实例，第三个是可选参数

```js
this.$refs.udb.update(id, value, {
  toastTitle: '修改成功', // toast提示语
  success: (res) => { // 更新成功后的回调
    const { code, message } = res
  },
  fail: (err) => { // 更新失败后的回调
    const { message } = err
  },
  complete: () => { // 完成后的回调
  }
})
```

注意：
- 如果列表分页采取分页组件，即page-data值为`replace`，每页有固定数量，那么`clientDB`组件的remove方法删除数据后，会重新请求当前页面数据。
- 如果列表采取滚动加载方式，即page-data值为`add`，滚动加载下一页数据，那么`clientDB`组件的remove方法删除数据后，不会重新请求数据，而是从已有数据移除已删除项。(组件版本1.1.0+支持)



### dataList

在js中，获取`<unicloud-db>` 组件的data的方法如下：

```js
console.log(this.$refs.udb.dataList);
```

如果修改了dataList的值，组件渲染的界面也会同步变化。

但是在浏览器控制台里无法使用this来打印查看数据，为此特别新增了`unidev.clientDB.data`方法以优化调试体验。

H5平台，开发模式下浏览器控制台输入 `unidev.clientDB.data`，可查看组件内部数据，多个组件通过索引查看 `unidev.clientDB.data[0]`


## 联表查询

```html
// 注意 `collection` 属性需要传入所有用到的表名，用逗号分隔，主表需要放在第一位
// where 属性 查询order表内书名为“三国演义”的订单
// field 属性 查询book表返回book表内的title、book表内的author、order表内的quantity
<template>
  <view>
    <unicloud-db v-slot:default="{data, loading, error, options}" collection="order,book" where="'book_id.title == "三国演义"'" field="book_id{title,author},quantity">
      <view>
		  <view v-for="(item, index) in data" :key="index" class="list-item">
		    {{ item.name}}
		  </view>
      </view>
    </unicloud-db>
  </view>
</template>
```

联表查询详情参考 [https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=lookup](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=lookup)

## 列表分页@page

unicloud-db组件简化了列表分页的写法，只需简单的配置每页需要多少数据（默认是20条），不管是数据库的分页查询还是前端的列表分页展示，都自动封装了。

列表分页有2种模式，一种是手机上常见的拉到底部加载下一页，另一种是pc常见的底部列出页码，点击页码跳转页面。

- 列表分页模式1：拉到底部加载下一页。此时下一页的查询结果会追加合并到data里，列表一直在增长。

下面的示例代码没有使用uList组件，实际开发时建议使用uList组件来避免长列表的性能问题。

```html
<template>
  <view class="content">
    <unicloud-db ref="udb" v-slot:default="{data, pagination, loading, error, options}"
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
    </unicloud-db>
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
        clear: true //可选参数，是否清空数据
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
    <unicloud-db ref="udb" v-slot:default="{data, pagination, loading, error, options}"
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
    </unicloud-db>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        options: {}, // 插槽不能访问外面的数据，通过此参数传递, 不支持传递函数
      }
    },
    onPullDownRefresh() { //下拉刷新（一般此场景下不使用下拉刷新）
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

使用分页控件，常见于PC端。在[uniCloud Admin](https://uniapp.dcloud.net.cn/uniCloud/admin)中，有完整的分页展示数据、新增删除数据的示例代码。

## 组件嵌套

`<unicloud-db>` 组件支持嵌套。

子组件中访问父组件 data 时，需options传递数据

如下示例演示了2个组件的嵌套，以及在子组件中如何访问父组件 data


``` html
<unicloud-db v-slot:default="{data, loading, error, options}" :options="options" collection="table1"
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
    <unicloud-db ref="dataQuery1" v-slot:default="{loading, data, error, options}" :options="data" collection="table2"
      orderby="createTime desc" field="name,createTime" @load="onqueryload" @error="onqueryerror">
      <!-- 父组件 table1 返回的数据 -->
      <view v-for="(item, index) in options" :key="index" class="list-item">
        {{ item.name }}
      </view>
      <!-- 子组件 table2 返回的数据 -->
      <view v-for="(item, index) in data" :key="index" class="list-item">
        {{ item.name }}
      </view>
    </unicloud-db>
  </unicloud-db>
```


完整项目示例见插件市场的示例项目: [https://ext.dcloud.net.cn/plugin?id=2574](https://ext.dcloud.net.cn/plugin?id=2574)


**调试小技巧**

- H5平台，开发模式下浏览器控制台输入 `unidev.clientDB.data`，可查看组件内部数据，多个组件通过索引查看 `unidev.clientDB.data[0]`

