### 什么是datacom

`datacom`，全称是`data components`，数据驱动的组件。

这种组件也是vue组件，是一种子类，是基础组件的再封装。

相比于普通的vue组件，`datacom`组件的特点是，给它绑定一个data，data中包含**一组**候选数据，即可自动渲染出结果。

比如 [uni-data-checkbox](https://ext.dcloud.net.cn/plugin?id=3456) 组件，给它绑定一个data，即可直接生成一组选择框。

```html
<template>
    <!-- 传入符合 datacom 规范的数据，即可渲染出一组 checkbox -->
    <!-- 使用 v-model 双向绑定 checkbox 的选中值 -->
    <uni-data-checkbox v-model="value" :localdata="options" multiple></uni-data-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        value: ['sh'],
        options: [
          {value: 'bj',text: '北京'},
          {value: 'sh',text: '上海'},
          {value: 'gz',text: '广州'}
        ],
      };
    },
  };
</script>
```

而使用基础组件的写法，代码量则要增加很多，如下：

```html
<template>
    <view>
        <view class="uni-list">
            <checkbox-group @change="checkboxChange">
                <label class="uni-list-cell" v-for="item in items" :key="item.value">
                    <view>
                        <checkbox :value="item.value" :checked="item.checked" />
                    </view>
                    <view>{{item.name}}</view>
                </label>
            </checkbox-group>
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                items: [{
                        value: 'bj',
                        name: '北京'
                    },
                    {
                        value: 'sh',
                        name: '上海',
                        checked: 'true'
                    },
                    {
                        value: 'gz',
                        name: '广州'
                    }
                ]
            }
        },
        methods: {
            checkboxChange: function (e) {
                var items = this.items,
                    values = e.detail.value;
                for (var i = 0, lenI = items.length; i < lenI; ++i) {
                    const item = items[i]
                    if(values.includes(item.value)){
                        this.$set(item,'checked',true)
                    }else{
                        this.$set(item,'checked',false)
                    }
                }
            }
        }
    }
</script>

<style>
.uni-list-cell {
    justify-content: flex-start
}
</style>
```


图例：
![](https://img-cdn-aliyun.dcloud.net.cn/stream/plugin_screens/f5c64490-2994-11eb-a554-03adfa49bb37_0.jpg)

### 什么是datacom组件规范

显然，datacom组件不是只有一个`<uni-data-checkbox>`，radio、check、select、picker、segement、tree...还有很多组件都可以成为datacom组件，变成类似`<uni-data-picker>`。

那么“datacom组件规范”，就定义了什么是`datacom组件`，以及它们的互联互通标准。

所有的开发者，都可以在 [DCloud插件市场](https://ext.dcloud.net.cn) 提交自己制作的、符合`datacom组件规范`的组件。

详细的“datacom组件规范”见后文。

### datacom对于开发者的好处

datacom组件，对服务器数据规范、前端组件的数据输入和输出规范，做了定义。它提升了产业的标准化程度、细化了分工，提升了效率。

且不论产业影响，对开发者个人而言，显而易见的好处也很多：

- 更少的代码量。从前述的传统写法对比可见，使用datacom的前端页面，代码量可减少一半以上。
- 设计更加清晰。服务器端给符合规范的数据，然后接受选择的结果数据。中间的ui交互无需关心。
- 结合 [uni-forms](https://ext.dcloud.net.cn/plugin?id=2773) 组件，自动实现表单校验。
- 搭配 uniCloud 的[unicloud-db组件](https://uniapp.dcloud.io/uniCloud/clientdb)，数据库查询结果直接绑定给`datacom组件`，服务器代码直接就不用写了
- 搭配 uniCloud 的[schema2code页面生成系统](https://uniapp.dcloud.net.cn/uniCloud/schema?id=autocode)，数据库定义好schema，前端页面就不用写了，自动生成
- 互操作性。可以轻易的切换更好的组件

举个例子，假使我们想实现一个城市选择的业务。
1. 首先在uniCloud的数据库里，建一个城市表。
2. 然后前端写一个组件`<xx-data-citypicker>`
3. 最后用`unicloud-db组件`把数据库的城市表数据拉下来，绑定给`<xx-data-citypicker>`
4. 在传统开发里，这个功能要写很长的代码，现在变得特别轻松。
5. 额外的，开发者将可以在插件市场找到多个城市选择组件，它们都符合`datacom组件规范`，可能有的是全屏选择、有的是底部半屏选择，有的顶部有搜索框、有的右侧有索引字母....不管什么样的城市选择组件，你都可以随便的换，反正它们都符合一个数据规范。


### datacom组件规范

1. 命名以 -data- 为中间分隔符，前面为组件库名称，后面是组件功能表达
2. 组件可以通过属性赋值，绑定一个 data 数据。可以是本地的localdata，也可以直接指定uniCloud云数据库的查询结果。详见下文的《数据绑定规范》
3. data数据是一组候选json数据。数据可以是平铺的数组，也可以是嵌套的树形结构。详见下文的《数据结构规范》
4. 符合 `<uni-forms>` 组件的表单校验规范

#### 数据结构规范

datacom组件接受的数据结构，包含了“数组”和“树”两种数据结构规范。

1. 数组类型数据：

- 规范：

data数据是一组可循环的数据集合。数组中每条数据如下基本key：

|key		|描述						|
|--			|--							|
|value		|值。必填					|
|text		|显示文字。必填				|
|selected	|是否默认选中。默认值false	|
|disable	|是否禁用。默认值false		|
|group		|分组标记					|

如果熟悉html的`<select>`标签的话，其`<option>`标签的属性也是value、text、selected。

除了这些基本key，开发者也可以自由扩展key。比如电影票、机票、火车票的选座，都需要扩展额外的信息：行、列、单元格类型（座位或过道）等。

完整的 JSON Schema 定义详见：[https://gitee.com/dcloud/datacom/blob/master/array.schema.json](https://gitee.com/dcloud/datacom/blob/master/array.schema.json)

- 数据示例：
```json
[
{"value": "bj","text": "北京"},
{"value": "sh","text": "上海"}
]
```

- 组件示例：[uni-data-checkbox](https://ext.dcloud.net.cn/plugin?id=3456)

- 使用示例：
```html
	<template>
		<!-- 传入符合 datacom 规范的数据，即可渲染出一组 checkbox -->
		<!-- 使用 v-model 双向绑定 checkbox 的选中值 -->
		<uni-data-checkbox v-model="value" :localdata="options" multiple></uni-data-checkbox>
	</template>
	<script>
	  export default {
		data() {
		  return {
			value: ['bj'],
			options: [
			  { value: "bj", text: "北京" },
			  { value: "sh", text: "上海" },
			],
		  };
		},
	  };
	</script>
```

2. 树类型数据：

- 规范：

data数据是可遍历嵌套的数据集合。数组中每条数据如下基本key：

|key		|描述												|
|--			|--													|
|value		|值。必填											|
|text		|显示文字。必填										|
|selected	|是否默认选中。默认值false							|
|disable	|是否禁用。默认值false								|
|isleaf		|是否为叶子节点。默认值false，为true时会忽略children|
|children	|子节点。其值的格式与父节点相同						|

完整的 JSON Schema 定义详见：[https://gitee.com/dcloud/datacom/blob/master/tree.schema.json](https://gitee.com/dcloud/datacom/blob/master/tree.schema.json)


- 数据示例：
```json
[{
"value": "110000",
"text": "北京市",
"children": [{
	"value": "110105",
	"text": "朝阳区"
}, {
	"value": "110108",
	"text": "海淀区"
}]
}]
```

- 组件示例：[uni-data-picker](https://ext.dcloud.net.cn/plugin?id=3796)

- 使用示例：
```html
	<template>
	  <!-- 传入符合 datacom 规范的数据，即可渲染出一个选择器  -->
	  <!-- 使用 v-model 双向绑定 picker 的选中值 -->
	  <uni-data-picker v-model="value" :localdata="items"></uni-data-checkbox>
	</template>
	<script>
	  export default {
		data() {
		  return {
			value: ["110000","110105"],
			items: [{
				"value": "110000",
				"text": "北京市",
				"children": [{
					"value": "110105",
					"text": "朝阳区"
				}, {
					"value": "110108",
					"text": "海淀区"
				}]
			}],
		  };
		},
	  };
	</script>
```

#### 数据绑定规范

`datacom组件	`的data，可以来自页面本地，即localdata；也可以直接指定uniCloud的云数据库查询结果，即指定collection表名、field字段名、where条件，这些写法与`unicloud-db组件`的写法相同，如果localdata和collection同时存在，优先使用localdata。

localdata的示例上文已经举例，下面来看下直接指定uniCloud云数据库查询的写法。

```html
	<template>
		<!-- 传入符合 datacom 规范的数据，即可渲染出一组 checkbox -->
		<!-- 使用 v-model 双向绑定 checkbox 的选中值 -->
		<uni-data-checkbox v-model="value" collection="" where="" field="" multiple></uni-data-checkbox>
	</template>
	<script>
	  export default {
		data() {
		  return {
			
		  };
		},
	  };
	</script>
```

collection表名、field字段名、where条件的写法，详见[clientDB组件文档](https://uniapp.dcloud.net.cn/uniCloud/uni-clientdb-component?id=%e5%b1%9e%e6%80%a7)

当然，支持绑定uniCloud数据，对于datacom组件规范来说，是可选的。

更为常见的场景，是在整个页面组件外围套一个clientDB组件，一次性查库，把查询结果的data分拆赋值给不同的datacom组件。

datacom组件规范还要求支持绑定 value，且支持双向绑定，即：支持`v-model`指令。这同时也是为了uni-forms的表单校验。

#### 组件属性规范

##### 分步查询属性规范

当`datacom组件`的data来自uniCloud的云数据库或cdn等云端，且数据量较大时，我们通常可以选择分步查询来优化用户体验，如以下场景：

1. 树组件：点击父节点时，动态加载该父节点的子节点
2. 列表组件：点击下一页，动态加载下一页数据

`datacom组件`为分步查询云端数据，设计了以下组件属性、事件：

|属性名			|类型		|默认值	|说明																				|
|--				|--			|--		|--																					|
|step-searh		|Boolean	|true	|是否分步查询云端数据。常用于树，picker，分页列表等，参考：`uni-data-picker`		|
|step-search-url|String		|		|分步查询的云端数据请求地址。常用于树，picker，分页列表等，参考：`uni-data-picker`	|
|self-field	|String		|		|"树"结构的当前字段名称。常用于树，picker，参考：`uni-data-picker`					|
|parent-field	|String		|		|"树"结构的父字段名称。常用于树，picker，参考：`uni-data-picker`					|
|@stepsearch	|EventHandle|		|分步查询数据时触发。可用于自定义分步查询数据，参考：`uni-data-picker`				|

##### 弹出类属性规范

`datacom组件`为弹出类组件，设计了以下组件属性、事件：

|属性名			|类型		|默认值	|说明										|
|--				|--			|--		|--											|
|preload		|Boolean	|false	|是否预加载云端数据。参考：`uni-data-picker`|
|@popupopened	|EventHandle|		|组件弹出显示时触发。参考：`uni-data-picker`|
|@popupclosed	|EventHandle|		|组件弹出关闭时触发。参考：`uni-data-picker`|


### datacom的局限

- 与基础代码相比，datacom用起来简单，但封装一层后导致其灵活性不如基础组件。如有个性化逻辑则有可能需要改组件源码。
- datacom覆盖范围主要是选择类组件。按钮类、输入类组件并不适合做成datacom。

### 有哪些组件可做成datacom

选择类组件很多，基本逻辑都是在指定的数据范围内，选择其中的一个或多个。

根据不同维度可以划分为：

- 选择模式：单选、多选
- 数据结构：数组、树、数值范围
- 展现方式：平铺、弹出
- 使用场景：表单、展示

这里列一下常见的选择类组件，以及它们按不同维度的分类，有助于更透彻的理解它们的本质

|组件				|选择模式	|数据结构	|展现方式	|使用场景	|说明									|
|--					|--			|--			|--			|--			|--										|
|radio(单选框)		|单选		|数组		|平铺		|表单		|列表单选、按钮组单选、标签组单选		|
|checkbox(多选框)	|多选		|数组		|平铺		|表单		|列表多选、按钮组多选、标签组多选		|
|select(下拉列表)	|单选、多选	|数组		|弹出		|表单		|单选下拉列表、多选下拉列表				|
|picker(滚动选择器)	|单选		|数组、树	|弹出		|表单		|单列选择器（数组）、多列选择器（树）	|
|cascader(级联选择)	|单选、多选	|树			|弹出		|表单		|										|
|transfer(穿梭框)	|多选		|数组		|平铺		|表单		|										|
|slider(滑块)		|单选		|数字范围	|平铺		|表单		|										|
|rate(评分)			|单选		|数字范围	|平铺		|表单		|										|
|stepper(步进器)		|单选		|数字范围	|平铺		|表单		|										|
|表头筛选			|多选		|数组		|弹出		|表单		|										|
|城市选择			|单选		|树			|弹出、平铺	|表单		|										|
|segement(分段器)	|单选		|数组		|平铺		|展示		|										|
|侧边导航			|单选		|数组		|平铺		|展示		|										|
|tree(树状控件)		|单选、多选	|树			|平铺		|展示		|										|

欢迎开发者们开发这些`datacom组件`，后续插件市场将单列出datacom组件，给予更高的显示权重。
