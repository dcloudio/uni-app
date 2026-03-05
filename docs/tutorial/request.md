# 联网

在js环境中，服务器下发的字符串，通过uni.request获取后，会默认转成json对象，开发者可以通过`.操作符`获取对象的属性，绑定到界面上。

```js
// js写法
// 假使服务器返回的json数据是：{code:0,data:[{"plugin_name":"插件名称A"}]}
// 这是一个对象，拥有code、data这2个子属性，data属性的值是一个数组，该数组内又有若干子对象，子对象有属性`plugin_name`。
uni.request({
	url: "https://ext.dcloud.net.cn/plugin/uniappx-plugin-list",
	success: (res) => {
		let resData = res.data.data
		console.log(resData[0].plugin_name) // resData是一个js对象数组，通过下标拿到第一个对象，然后通过.来访问对象的plugin_name属性
	}
})
```

但在uts等强类型语言中无法这样，会报resData[0]无法安全访问、没有plugin_name属性，因为resData是个可为空的any类型，你确实没有为它定义过任何属性。

在uts中，提供了2种方案：
1. 使用[UTSJSONObject](../uts/data-type.md#utsjsonobject)，不需要提前为json数据定义类型，运行时动态as转换类型
2. 使用[type](../uts/data-type.md#type)，提前定义json数据类型，在request时通过泛型传入类型，拿到的就是一个有类型的对象，之后的用法和js一样

其实在原生或标准的ts里，都是type（ts也有用interface的）。强类型里不能存在json对象这种可以用`.操作符`操作但又不提前定义属性的行为。

UTSJSONObject 是 uni-app x 给原生生态引入了 js生态的一种 json数据处理方案。

## 方式1：UTSJSONObject
UTSJSONObject是uts的内置对象，可以用`.操作符`、下标和keypath来访问json数据。

由于未提前定义类型，使用.或下标，都需要通过as来声明具体的类型，才能进一步使用。
uni-app x 4.41起也支持`.操作符`，其实是把`.操作符`转成了下标。返回值类型为any。再次使用时需 as 为具体的类型。
### UTSJSONObject下标方式
```ts
// uts写法
// 假使服务器返回的json数据是：{code:0,data:[{"plugin_name":"插件名称A"}]}
uni.request({
	url: "https://ext.dcloud.net.cn/plugin/uniappx-plugin-list",
	success: (res) => {
		console.log(res.data) // 这是一个any类型，不能直接使用
		console.log(res.data as UTSJSONObject) // 需要把这个any类型，as成UTSJSONObject类型
		console.log(res.data as UTSJSONObject["data"]) //UTSJSONObject支持通过下标访问属性data，但返回的仍然是any类型
		let resData = (res.data as UTSJSONObject)["data"] as UTSJSONObject[] // as成UTSJSONObject数组
		if (resData!=null) {
			console.log(resData[0]) // 访问数组的第一个数组项目，仍然是any类型，仍然需要转换
			console.log((resData[0] as UTSJSONObject)["plugin_name"]) // 转为UTSJSONObject后通过下标访问plugin_name属性
		}
	}
})
```

上面代码中打印日志部分是为了方便初学者理解，实际开发时代码行数不会多几行，主要是多几次as做类型转换。

### UTSJSONObject keypath方式
上面的写法是每层数据都as，通过下标来访问。UTSJSONObject还支持keypath，这是一种可穿透多层数据访问的写法，传入一个path字符串，返回相应数据。
```ts
// uts写法
// 假使服务器返回的json数据是：{code:0,data:[{"plugin_name":"插件名称A"}]}
uni.request({
	url: "https://ext.dcloud.net.cn/plugin/uniappx-plugin-list",
	success: (res) => {
		let resData = res.data as UTSJSONObject
		if (resData!=null) {
			console.log(resData.getString("data[0].plugin_name")) //直接访问data属性的第一个数组项目里的plugin_name属性
		}
	}
})
```

除了getString，还有getNumber、getBoolean、getJSON、getArray、getAny。只要keypath的路径输入正确、类型正确，就可以取得值。当然path没有代码提示。

更多详见[UTSJSONObject](../uts/data-type.md#utsjsonobject)

## 方式2：type和泛型

为json数据定义一个type的自定义类型，明确好对象的属性名称及类型，然后把这个type通过泛型传给request方法，res拿出来的就是转换好的类型，就可以直接`.操作符`获取属性了。。

- 第一步：用HBuilderX自带的工具，给服务器数据定义类型
把服务器端返回的data里的json数据，复制黏贴到HBuilderX的json编辑器里，点右键，转type。
![](../static/json2type.png)

> 转换功能需要HBuilderX 3.9+、安装了uni-app x真机运行插件、且打开的标签卡是json编辑器。（在ctrl+t新建空白md标签卡，粘贴json数据，会自动切换成json编辑器）

上面的截图是复用了其他图片，如果我们使用`https://ext.dcloud.net.cn/plugin/uniappx-plugin-list`这个服务器接口，服务器返回的数据内容，也就是`res.data`的数据是这样：
```json
{code:200,desc:"",data:[{"plugin_name":"插件名称A","plugin_id":123}]}
```

**注意：** 不要把res和res.data搞错了，要看`res.data`的数据格式，而不是`res`的格式。`res`的格式是不变的。

观察返回的数据，`res.data`返回一个对象，拥有code、desc、data这3个子属性，code是number类型，desc是string类型，而data的类型又是一个数组。
该数组内又是若干子对象，子对象有属性`plugin_id`和`plugin_name`等。

那么使用转换工具，生成的类型定义是这样：
```ts
type Data = {
	plugin_id: number;
	plugin_name: string;
}
type IRootType = {
	code: number;
	desc: string;
	data: Data[];
}
```

因type不可嵌套，生成了2个type。注意顺序，Data这个type需写在前面，因为后面要引用它。引用代码执行时如未定义该类型，会报错。

- 第二步：把这段类型定义，放在`<script>`根下，如果是选项式要放在export default{}之前。然后给uni.request传入泛型参数`<IRootType>`，返回的res.data自动转换好了类型，可以直接`.`属性了。

**注意：** 因为`res.data`是对象，所以泛型那里直接使用`<IRootType>`。有的服务器接口返回的`res.data`是数组，就需要在泛型那里写成`<IRootType[]>`

```vue
<script>
	type Data = {
		plugin_id : number;
		plugin_name : string;
	}
	type IRootType = {
		code : number;
		desc : string;
		data : Data[];
	}
	export default {
		onLoad() {
			uni.request<IRootType>({ // 通过<IRootType>要求request方法的返回值转为IRootType类型
				url: "https://ext.dcloud.net.cn/plugin/uniappx-plugin-list",
				success: (res) => {
					console.log(res.data)
					console.log(res.data instanceof IRootType) //true res.data已经被转换为type了
					console.log(res.data?.data) //因为联网数据不可控，转换可能失败，所以这里需要用?.的方式做安全访问
					let resData = res.data?.data
					if(resData!=null && resData.length>0){ //判断一下数组不为空
						console.log(resData[0])
						console.log(resData[0].plugin_name)
					}
			}})
		},
	}
</script>
```

与UTSJSONObject方式相比，type方式在使用数据时可以使用`.操作符`，有代码提示。虽然需要定义type，但也有工具可以自动生成type。

type+泛型这个方式，也是ts开发者惯用的方式。

但不熟悉ts的开发者，可能不了解type和泛型。下面讲解下。

### type和泛型详解

- 什么是type和泛型？

type就是自定义一个类型。下面定义了一个数据类型DataType，该类型有2个属性，`plugin_id`和`plugin_name`，这2个属性的类型分别是number和string。
```ts
type DataType = {
	plugin_id : number,
	plugin_name : string
}
```

有了这个类型，再给它json数据进行实例化，就达到了给json数据定义类型的目标。给json数据定义好类型，就可以自由的使用`.操作符`获取属性了。

详见[type](../uts/data-type.md#type)

而泛型，是一个对方法参数进行通用的类型描述。它告诉一个支持泛型的方法，给方法传入什么类型，方法就会返回什么类型。

不过uts的泛型支持还没有达到ts的泛型完善度，详见[泛型](../uts/generics.md)

uni.request方法是支持泛型的，这意味着返回结果可以有很多种类型。

所以可以把你定义的DataType类型通过`<T>`的方式传给uni.request方法，尖括号要写在方法名和左圆括号中间。
这个方法就会把返回的`res.data`转换为你传入的DataType类型。

- 为何type要定义在export default{}之前？

其实如果type不用于vue data数据的类型，那么type只需要定义在执行前就可以。

但实际开发中，type大多用于data的类型定义，而想给data定义类型，那就得写在data的前面，也就是export default{}之前了。

- 网络数据缺少一些属性怎么办？

网络返回的数据，有可能缺少某些属性，导致报错。测试需要把可为空的属性类型声明为"或null"，或者使用`?:`
```ts
type DataType = {
	plugin_id : number,
	plugin_name : string,
	age : number | null, //属性可为null
}
```

如您不了解null的安全使用，[详见](../uts/data-type.md#null)

- 务必注意res.data返回的是对象还是数组

如果res.data返回的是对象，那么泛型调用时直接`uni.request<IRootType>(`

如果res.data返回的是数组，那么传泛型时必须传入数组格式`uni.request<IRootType[]>(`，注意多了一个`[]`

- type的敏感词转义

服务器返回的json数据，其属性键名有可能存在一些type不支持的字符。

比如`{"a:b":"123","a-b":"456"}`，这些键名对于type来讲都是非法的。转换type就会失败。

HBuilderX的json转type工具，会对一些敏感符合和关键字自动转义。但也有无法转移的符号和词，详见：[type](../uts/data-type.md#json-field)

如果你的服务器数据涉及这类问题且数据格式不可改，那只能改用UTSJSONObject方式。

### 完整实例

再举一个实际中更常见的例子。联网获取插件市场的插件列表数据，并绑定在模板上，还可以翻页。

翻页需要用到[...展开操作符](../uts/operator.md#展开语法)

```vue
<template>
	<list-view style="flex: 1;background-color: #ffffff;" @scrolltolower="loadData">
		<template v-for="(item, index) in dataList" :key="index">
			<list-item style="flex-direction: row; margin-top: 10px; padding: 10px; height: 100px;">
				<image :src="item.plugin_img_link" style="width: 120px;"></image>
				<text style="flex: 1;">{{item.plugin_name}}</text>
			</list-item>
			<list-item key="loading" v-if="index==dataList.length-1">
				<text style="padding: 10px; text-align: center; background-color: #f8f8f8; margin-bottom: 1px;">{{loadingText}}</text>
			</list-item>
		</template>
	</list-view>
</template>

<script>
	type Data = {
		plugin_id : number;
		plugin_name : string;
		plugin_img_link : string;
		plugin_intro : string;
		is_paid : number;
		collection_count : number;
		support_count : number;
		buy_count : number;
		download_count : number;
		score : number;
		rater_count : number;
		tags : string[];
		category_level1_name : string;
		category_level2_name : string;
		update_date : string;
		author_avatar_link : string;
		author_name : string;
	}

	type IRootType = {
		code : number;
		desc : string;
		data : Data[];
	}

	export default {
		data() {
			return {
				dataList: [] as Data[],
				loading: false,
				isEnded: false,
				loadingError: '',
				$currentPage: 1
			}
		},
		computed: {
			loadingText() : string {
				if (this.loading) {
					return "加载中..."
				} else if (this.isEnded) {
					return "没有更多了"
				} else if (this.loadingError.length > 0) {
					return this.loadingError
				} else {
					return ""
				}
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData() {
				if (this.loading || this.isEnded) {
					return
				}
				this.loading = true

				uni.request<IRootType>({
					url: "https://ext.dcloud.net.cn/plugin/uniappx-plugin-list",
					data: {
						page: this.$currentPage, //当前页码
						page_size: 10 //每页列表项目数量
					},
					success: (res) => {
						const responseData = res.data
						if (responseData == null) {
							return
						}

						//...是展开运算符，本句用于把联网获取的数组合并到data数组里。当第一次执行时，dataList为空，push进去了第一页的数据，后续页面也同理
						this.dataList.push(...responseData.data)

						if (responseData.data.length == 0) {
							this.isEnded = true
						} else {
							this.$currentPage++
						}
					},
					fail: (err) => {
						this.loadingError = err.errMsg
					},
					complete: () => {
						this.loading = false
					}
				})
			},
		}
	}
</script>

```

## 注意事项

* request 接口内部通过[特殊方式读取了范型类型](../uts/generics.md#使用限制)，不支持传入动态的范型：比如将外层方法的普通范型参数传入 request。所以目前尽量直接使用uni.request而不是封装。如确需封装，可不使用type，改用UTSJSONObject。
* 4.01及之后版本web端request接口在dataType为`json`时返回UTSJSONObject，此前为普通js对象。
* web端request接口目前不支持创建传入的泛型的实例，即泛型仅作为类型校验使用。
