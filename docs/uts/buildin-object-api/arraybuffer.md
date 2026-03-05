# ArrayBuffer

ArrayBuffer 对象用来表示通用的原始二进制数据缓冲区。

它是一个字节数组，通常在其他语言中称为“byte array”。你不能直接操作 ArrayBuffer 中的内容；而是要通过类型化数组对象

[Float32Array](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/float32array.html)

[Float64Array](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/float64array.html)

[Int8Array](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/int8array.html)

[Int16Array](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/int16array.html)

[Int32Array](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/int32array.html)

[Uint8Array](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/uint8array.html)

[Uint8ClampedArray](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/uint8clampedarray.html)

[Uint16Array](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/uint16array.html)

[Uint32Array](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/uint32array.html)

或 [DataView](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/dataview.html) 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。


## 构造函数


### new(byteLength : number) : ArrayBuffer;@Constructor(byteLength)

构造函数创建一个以字节为单位的给定长度的新 ArrayBuffer

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteLength | number | 是 | - | - | 长度，单位字节 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| ArrayBuffer | ArrayBuffer | 


<!-- UTSJSON.ArrayBuffer.Constructor.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | √ | 4.61 | 4.25 | 4.51 | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | - |


<!-- UTSJSON.ArrayBuffer.Constructor.tutorial -->


## 静态方法


### isView(arg)

ArrayBuffer.isView() 静态方法用于确定传递的值是否是 ArrayBuffer 视图之一。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arg | any | 是 | - | - | 需要检测的值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 如果 arg 是 ArrayBuffer 视图之一，则返回 true，例如类型化数组对象或者 DataView。否则返回 false。 | 


::: preview 

>UTS
```uts
      var arrayBuffer = new ArrayBuffer(16)
      var float64 = new Float64Array(arrayBuffer);
      var isView = ArrayBuffer.isView(float64)
      console.log(isView)//true

      var a = 1
      var isViewA = ArrayBuffer.isView(a)
      console.log(isViewA)//false
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | √ | 4.61 | 4.25 | 4.51 | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | - |


<!-- UTSJSON.ArrayBuffer.isView.tutorial -->

### fromByteBuffer(byteBuffer: ByteBuffer)

ArrayBuffer.fromByteBuffer() 静态方法用于将android 原生的ByteBuffer对象转换为ArrayBuffer

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteBuffer | ByteBuffer | 是 | - | - | android原生bytebuffer对象 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| ArrayBuffer | ArrayBuffer | 


::: preview 

>UTS
```uts
      var byteBuffer = ByteBuffer.allocate(100)
      byteBuffer.put(1)
      byteBuffer.put(2)
      var buffer = ArrayBuffer.fromByteBuffer(byteBuffer)
      console.log('arraybuffer_toByteBuffer', buffer)
      var int8 = new Int8Array(buffer)
      console.log(int8[0])//1
      console.log(int8[1])//2

      byteBuffer = buffer.toByteBuffer()
      console.log('arraybuffer_toByteBuffer', byteBuffer)

      byteBuffer.rewind()
      console.log(byteBuffer[0])//1
      console.log(byteBuffer[1])//2
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 4.25 | x | 4.61 | 4.25 | x | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | x | - |


<!-- UTSJSON.ArrayBuffer.fromByteBuffer.tutorial -->

### fromData(data: Data)

ArrayBuffer.fromData() 静态方法用于将 iOS 原生的 Data 对象转换为 ArrayBuffer

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | Data | 是 | - | - | iOS 原生 Data 对象 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| ArrayBuffer | ArrayBuffer | 


::: preview 

>UTS
```uts
      let str = 'hello world';
      let data = str.data(using = String.Encoding.utf8)!
      let arrayBuffer = ArrayBuffer.fromData(data)
      let uint8Array = new Uint8Array(arrayBuffer)
      console.log(uint8Array)
      
      let td = arrayBuffer.toData()
      let content = new String(decoding = td, as = UTF8.self)
      console.log(content)
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | x | x | 4.61 | x | 4.51 | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| - | 4.51 | - |


<!-- UTSJSON.ArrayBuffer.fromData.tutorial -->

## 实例属性


### byteLength

ArrayBuffer 实例的 byteLength 访问器属性返回该数组缓冲区的长度（以字节为单位）。





**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | - |


<!-- UTSJSON.ArrayBuffer.byteLength.tutorial -->


## 实例方法


### slice(begin?, end?)

ArrayBuffer 实例的 slice() 方法返回一个新的 ArrayBuffer 实例，其包含原 ArrayBuffer 实例中从 begin 开始（包含）到 end 结束（不含）的所有字节的副本。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| begin | number | 否 | - | - | 可选，要开始提取的位置索引（从 0 开始），将被转换为整数。负数索引将会从缓冲区末尾开始计算——如果 start \< 0，那么将会使用 start + buffer.length。 如果 start \< -buffer.length 或省略了 start，则会使用 0。 如果 start >= buffer.length，则不会提取任何内容。 |
| end | number | 否 | - | - | 可选，要结束提取的位置索引（从 0 开始），将被转换为整数。slice() 提取到但不包括 end。 负数索引将会从缓冲区末尾开始计算——如果 end \< 0，那么将会使用 end + buffer.length。 如果 end \< -buffer.length，则会使用 0。 如果 end >= buffer.length 或省略了 end，则会使用 buffer.length，则会导致直到末尾的所有元素都被提取。 如果标准化后的 end 位置在 start 位置之前，则不会提取任何内容。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| ArrayBuffer | 一个新的 ArrayBuffer 对象。 | 


::: preview 

>UTS
```uts
    let buffer = new ArrayBuffer(16);
    let float32 = new Float32Array(buffer);
    float32[3] = 42;
    console.log(float32.toString()); // 0,0,0,42
    let res = buffer.slice(8);
    let sliced = new Float32Array(res);
    console.log(sliced[1]); // 42

    let buffer = new ArrayBuffer(16);
    let float64 = new Float64Array(buffer);
    float64[1] = 42;
    console.log(float64.toString()); // 0,42

    let res = buffer.slice(8);
    let sliced = new Float64Array(res);
    console.log(sliced[0]); // 42

    let buffer = new ArrayBuffer(16);
    let int32 = new Int32Array(buffer);
    int32[3] = 42;
    console.log(int32.toString()); // "0,0,0,42"

    let res = buffer.slice(8);
    let sliced = new Int32Array(res);
    console.log(sliced[1]); // 42

    let buffer = new ArrayBuffer(16);
    let int8 = new Int8Array(buffer);
    int8[4] = 42;
    console.log(int8.toString()); // Output: "0,0,0,0,42,0,0,0,0,0,0,0,0,0,0,0"

    let res = buffer.slice(4, 5);
    let sliced = new Int8Array(res);
    console.log(sliced[0]); // Output: 42

    let buffer = new ArrayBuffer(16);
    let uint8 = new Uint8Array(buffer);
    uint8[4] = 42;
    console.log(uint8.toString()); // "0,0,0,0,42,0,0,0,0,0,0,0,0,0,0,0"

    let res = buffer.slice(4, 12);
    let sliced = new Uint8Array(res);
    console.log(sliced[0]); // 42

    let buffer = new ArrayBuffer(16);
    let uint8Clamped = new Uint8ClampedArray(buffer);
    uint8Clamped[4] = 42;
    console.log(uint8Clamped.toString()); // "0,0,0,0,42,0,0,0,0,0,0,0,0,0,0,0"

    let res = buffer.slice(4, 12);
    let sliced = new Uint8ClampedArray(res);
    console.log(sliced[0]); // 42

    let buffer = new ArrayBuffer(16);
    let uint32 = new Uint32Array(buffer);
    uint32[3] = 42;
    console.log(uint32.toString()); // "0,0,0,42"

    let res = buffer.slice(8);
    let sliced = new Uint32Array(res);
    console.log(sliced[1]); // 42
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | - |


<!-- UTSJSON.ArrayBuffer.slice.tutorial -->

### toByteBuffer()

ArrayBuffer 实例的 toByteBuffer() 方法返回一个android原生ByteBuffer对象。



**返回值**
| 类型 | 描述 |
| :- | :- |
| ByteBuffer | android 原生ByteBuffer对象。 | 


::: preview 

>UTS
```uts
      var byteBuffer = ByteBuffer.allocate(100)
      byteBuffer.put(1)
      byteBuffer.put(2)
      var buffer = ArrayBuffer.fromByteBuffer(byteBuffer)
      console.log('arraybuffer_toByteBuffer', buffer)
      var int8 = new Int8Array(buffer)
      console.log(int8[0])//1
      console.log(int8[1])//2

      byteBuffer = buffer.toByteBuffer()
      console.log('arraybuffer_toByteBuffer', byteBuffer)

      byteBuffer.rewind()
      console.log(byteBuffer[0])//1
      console.log(byteBuffer[1])//2
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 4.25 | x | 4.61 | 4.25 | x | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | x | - |


<!-- UTSJSON.ArrayBuffer.toByteBuffer.tutorial -->

### toData()

ArrayBuffer 实例的 toData() 方法返回一个 iOS 原生 Data 对象。



**返回值**
| 类型 | 描述 |
| :- | :- |
| Data | iOS 原生 Data 对象。 | 


::: preview 

>UTS
```uts
      let str = 'hello world';
      let data = str.data(using = String.Encoding.utf8)!
      let arrayBuffer = ArrayBuffer.fromData(data)
      let uint8Array = new Uint8Array(arrayBuffer)
      console.log(uint8Array)
      
      let td = arrayBuffer.toData()
      let content = new String(decoding = td, as = UTF8.self)
      console.log(content)
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | x | x | 4.61 | x | 4.51 | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | 4.51 | - |


<!-- UTSJSON.ArrayBuffer.toData.tutorial -->


## 注意事项

- 默认是以大端序存储数据

- iOS的uvue页面编译成js时，可以使用ArrayBuffer，iOS 的 uts 插件对 ArrayBuffer 支持 从 HBuilder X 4.51 版本开始。

- Android平台，在uni-app上不支持将Arraybuffer当作参数从vue传到插件里面，但是可以在vue或者插件里面使用


## js 和 swift 基于 ArrayBuffer 的内存共享

iOS 平台 uts 插件中的 ArrayBuffer 可以和 JS 中的 ArrayBuffer 实现内存共享。即无论从 uvue 页面传递给 uts 插件的 ArrayBuffer, 还是从 uts 插件中返回给 js 的 ArrayBuffer, 都是指向同一个内存区域，而不是拷贝一份后传递。这个特性在传递大内存的内容时比较有用。

> 注意：该特性在 Uni-app 和 Uni-app x 平台均支持。目前仅支持 js 和 Swift 之间的通过 ArrayBuffer 的内存共享。

下面以在 iOS 平台 uts 插件中读取大文件，然后使用 ArrayBuffer 传递给 uvue 页面的场景为例，演示 ArrayBuffer 内存共享的特性。
示例代码如下：

- swift 文件中实现读取大文件函数（混编示例）

```swift
import DCloudUTSFoundation
// 注意：如果你想在 uni-app 环境下运行此代码，请将下面这行代码注释掉
import DCloudUniappRuntime

class ReadFile {
	public static func readFile(
	    _ path: String,
	    _ completionHandler: ((ArrayBuffer?, NSNumber) -> Void)? = nil
	) {
		// 转换路径
	    let absolutePath = UTSiOS.convert2AbsFullPath(path)
	
		// 判断文件是否存在 
	    if FileManager.default.fileExists(atPath: absolutePath) == false {
	        completionHandler?(nil, 1)
	        return
	    }
	    
		// 将字符串路径转成 file url
	    let fileUrl = URL(fileURLWithPath: absolutePath)
	    
	    do {
			// 读取文件内容，生成 swift 原生 Data
	        let fileData = try Data(contentsOf: fileUrl)
			// 将 Data 转成 ArrayBuffer, 注意：ArrayBuffer 与 Data 的内存也是共享的，内容的传递过程中也不存在内存复制。
	        let result = ArrayBuffer.fromData(fileData)
	        if result == nil {
	            completionHandler?(nil, 2)
	            return
	        }
			// 将 ArrayBuffer 回调出去
	        completionHandler?(result, 0)
	    } catch {
	        completionHandler?(nil, 1)
	    }
	}
}

```

- 在 uts 代码中定义读取文件的函数，并对外暴露。函数的实现中调用上述 swift 文件中实现的方法。

```uts

// #ifdef APP-IOS
export type ReadFileOptions = {
	url: string,
	success: (res: ArrayBuffer) => void,
	fail:(code: number) => void
}

export function testBigArrayBuffer(option: ReadFileOptions) {
	// 调用 swift 实现，读取指定路径的大文件，并将生成的 ArrayBuffer 传递给 uvue 页面 (js环境)
	ReadFile.readFile(option.url, (res: ArrayBuffer | null, code: number) => {
		if (code == 0 && res != null) {
			option.success(res!)  
		}else {
			option.fail(code)
		}
	})  
}
// #endif

```

- 在 uvue 页面中调用上述 uts 插件的 api, 并操作 ArrayBuffer:

```js

testBigArrayBuffer({
	url: "/static/test.txt",
	success: (res) => {
		console.log("读取成功")
		// 本示例中读取的是一个 1.4M 大小的.txt文件，输出的长度是：1391217
		console.log("ArrayBuffer 长度：",res.byteLength)
	},
	fail: (code) => {
		console.log(code)
	}
})

```

上述示例的完整代码在 `hello-uts` 的 `SyntaxCase` 插件中。 
