#### uni.setStorage(OBJECT)
将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|key|String|是|本地缓存中的指定的 key|
|data|Any|是|需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例**

```javascript
uni.setStorage({
	key: 'storage_key',
	data: 'hello',
	success: function () {
		console.log('success');
	}
});
```

#### uni.setStorageSync(KEY,DATA)
将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。

**参数说明**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|key|String|是|本地缓存中的指定的 key|
|data|Any|是|需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象|

```javascript
try {
	uni.setStorageSync('storage_key', 'hello');
} catch (e) {
	// error
}
```

#### uni.getStorage(OBJECT)
从本地缓存中异步获取指定 key 对应的内容。

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|key|String|是|本地缓存中的指定的 key|
|success|Function|是|接口调用的回调函数，res = {data: key对应的内容}|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明**

|参数|类型|说明|
|:-|:-|:-|
|data|Any|key 对应的内容|

**示例**

```javascript
uni.getStorage({
	key: 'storage_key',
	success: function (res) {
		console.log(res.data);
	}
});
```

#### uni.getStorageSync(KEY)
从本地缓存中同步获取指定 key 对应的内容。

**参数说明**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|key|String|是|本地缓存中的指定的 key|

**示例**

```javascript
try {
	const value = uni.getStorageSync('storage_key');
	if (value) {
		console.log(value);
	}
} catch (e) {
	// error
}
```

#### uni.getStorageInfo(OBJECT)
异步获取当前 storage 的相关信息。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|
|:-:|:-:|:-:|:-:|:-:|
|HBuilderX 2.0.3+|√|√|√|√|

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|success|Function|是|接口调用的回调函数，详见返回参数说明|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明**

|参数|类型|说明|
|:-|:-|:-|
|keys|Array＜String＞|当前 storage 中所有的 key|
|currentSize|Number|当前占用的空间大小, 单位：kb|
|limitSize|Number|限制的空间大小, 单位：kb|

**示例**

```javascript
uni.getStorageInfo({
	success: function (res) {
		console.log(res.keys);
		console.log(res.currentSize);
		console.log(res.limitSize);
	}
});
```

#### uni.getStorageInfoSync()
同步获取当前 storage 的相关信息。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|
|:-:|:-:|:-:|:-:|:-:|
|HBuilderX 2.0.3+|√|√|√|√|

**示例**

```javascript
try {
	const res = uni.getStorageInfoSync();
	console.log(res.keys);
	console.log(res.currentSize);
	console.log(res.limitSize);
} catch (e) {
	// error
}
```

#### uni.removeStorage(OBJECT)
从本地缓存中异步移除指定 key。

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|key|String|是|本地缓存中的指定的 key|
|success|Function|是|接口调用的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例**

```javascript
uni.removeStorage({
	key: 'storage_key',
	success: function (res) {
		console.log('success');
	}
});
```

#### uni.removeStorageSync(KEY)
从本地缓存中同步移除指定 key。

**参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|key|String|是|本地缓存中的指定的 key|

**示例**

```javascript
try {
	uni.removeStorageSync('storage_key');
} catch (e) {
	// error
}
```

#### uni.clearStorage()
清理本地数据缓存。

**示例**

```javascript
uni.clearStorage();
```

#### uni.clearStorageSync()
同步清理本地数据缓存。

**示例**

```javascript
try {
	uni.clearStorageSync();
} catch (e) {
	// error
}
```

**注意**

uni-app的Storage在不同端的实现不同：
- H5端为localStorage，浏览器限制5M大小，是缓存概念，可能会被清理
- App端为原生的plus.storage，无大小限制，不是缓存，持久化
- 各个小程序端为其自带的storage api，数据存储生命周期跟小程序本身一致，即除用户主动删除或超过一定时间被自动清理，否则数据都一直可用。
- 微信小程序单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。
- 支付宝小程序单条数据转换成字符串后，字符串长度最大200*1024。同一个支付宝用户，同一个小程序缓存总上限为10MB。
- 百度、头条小程序文档未说明大小限制

除此之外，H5端还支持websql、indexedDB、sessionStorage；App端还支持[SQLite](https://www.html5plus.org/doc/zh_cn/sqlite.html)、[IO文件](https://www.html5plus.org/doc/zh_cn/io.html)等本地存储方案。
