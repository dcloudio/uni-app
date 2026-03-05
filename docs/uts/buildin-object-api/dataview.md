# DataView

## 构造函数

### new(buffer : ArrayBufferLike & { BYTES_PER_ELEMENT ?: never; }, byteOffset ?: number, byteLength ?: number) : DataView;@Constructor(buffer, byteOffset?, byteLength?)

当使用 ArrayBuffer  实例以及可选的 byteOffset 和 length 参数调用时，将创建一个新的指定缓冲区的DataView视图。byteOffset 和 length 参数指定视图将暴露的内存范围。如果忽略这两个参数，则是整个视图的所有 buffer；如果仅忽略 length，则是从 byteOffset 开始的 buffer 剩余部分的视图。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| buffer | [ArrayBufferLike & { BYTES_PER_ELEMENT ?: never; }](#arraybufferlike-values) | 是 | - | - | ArrayBuffer实例 |
| byteOffset | number | 否 | - | - | 可选，偏移量，单位字节 |
| byteLength | number | 否 | - | - | 长度 | 

#### buffer 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteLength | number | 是 | - | Web: √; Android: 4.25; iOS: 4.11; HarmonyOS: 4.61 | ArrayBuffer 实例的 byteLength 访问器属性返回该数组缓冲区的长度（以字节为单位）。 |
| BYTES_PER_ELEMENT | any | 否 | - | - | - |

##### ArrayBufferLike & { BYTES_PER_ELEMENT ?: never; } 的方法 @arraybufferlike-values 

##### slice(begin ?: number, end ?: number) : ArrayBuffer; @slice
slice
ArrayBuffer 实例的 slice() 方法返回一个新的 ArrayBuffer 实例，其包含原 ArrayBuffer 实例中从 begin 开始（包含）到 end 结束（不含）的所有字节的副本。
###### slice 兼容性 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| begin | number | 否 | - | - | 可选，要开始提取的位置索引（从 0 开始），将被转换为整数。负数索引将会从缓冲区末尾开始计算——如果 start \< 0，那么将会使用 start + buffer.length。 如果 start \< -buffer.length 或省略了 start，则会使用 0。 如果 start >= buffer.length，则不会提取任何内容。 |
| end | number | 否 | - | - | 可选，要结束提取的位置索引（从 0 开始），将被转换为整数。slice() 提取到但不包括 end。 负数索引将会从缓冲区末尾开始计算——如果 end \< 0，那么将会使用 end + buffer.length。 如果 end \< -buffer.length，则会使用 0。 如果 end >= buffer.length 或省略了 end，则会使用 buffer.length，则会导致直到末尾的所有元素都被提取。 如果标准化后的 end 位置在 start 位置之前，则不会提取任何内容。 | 

###### 返回值 

| 类型 | 描述 |
| :- | :- |
| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 一个新的 ArrayBuffer 对象。 |
 

##### toByteBuffer() : ByteBuffer; @tobytebuffer
toByteBuffer
ArrayBuffer 实例的 toByteBuffer() 方法返回一个android原生ByteBuffer对象。
###### toByteBuffer 兼容性 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| x | 4.25 | x | 4.61 |


###### 返回值 

| 类型 | 描述 |
| :- | :- |
| ByteBuffer | android 原生ByteBuffer对象。 |
 

##### toData() : Data; @todata
toData
ArrayBuffer 实例的 toData() 方法返回一个 iOS 原生 Data 对象。
###### toData 兼容性 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| x | x | x | 4.61 |


###### 返回值 

| 类型 | 描述 |
| :- | :- |
| Data | iOS 原生 Data 对象。 |
 


**返回值**
| 类型 | 描述 |
| :- | :- |
| DataView | 实例对象 | 


<!-- UTSJSON.DataView.Constructor.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.Constructor.tutorial -->

## 实例属性


### buffer

ArrayBuffer 是引用该缓冲区的视图。在构造时会被固定，因此该属性只读。





<!-- UTSJSON.DataView.buffer.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.buffer.tutorial -->

### byteLength

视图的长度（以字节为单位）。在构造时会被固定，因此该属性只读。





<!-- UTSJSON.DataView.byteLength.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.byteLength.tutorial -->

### byteOffset

至 ArrayBuffer 的视图开始位置的字节偏移量。在构造时会被固定，因此该属性只读。





<!-- UTSJSON.DataView.byteOffset.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.byteOffset.tutorial -->


## 实例方法


### getFloat32(byteOffset, littleEndian?)

获取指定字节偏移处的 Float32 值。没有对齐约束；多字节值可以从任何偏移处获取。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteOffset | number | 是 | - | - | 从视图开始检索值的位置。 |
| littleEndian | boolean | 否 | - | - | 如果为 false 或未定义，则读取大端值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回指定位置的 Float32 值。 | 


::: preview 

>UTS
```uts
    // Create an ArrayBuffer with a size in bytes
    let buffer = new ArrayBuffer(16);
    let view = new DataView(buffer);
    view.setFloat32(1, 3);
    let ret = view.getFloat32(1);
    console.log(ret); // 3
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.getFloat32.tutorial -->

### getFloat64(byteOffset, littleEndian?)

获取指定字节偏移处的 Float64 值。没有对齐约束；多字节值可以从任何偏移处获取。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteOffset | number | 是 | - | - | 从视图开始检索值的位置。 |
| littleEndian | boolean | 否 | - | - | 如果为 false 或未定义，则读取大端值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回指定位置的 Float64 值。 | 


::: preview 

>UTS
```uts
    // Create an ArrayBuffer with a size in bytes
    let buffer = new ArrayBuffer(16);
    let view = new DataView(buffer);
    view.setFloat64(1, Math.PI);
    let ret = view.getFloat64(1);
    console.log(ret); // 3.141592653589793
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.getFloat64.tutorial -->

### getInt8(byteOffset)

获取指定字节偏移处的 Int8 值。没有对齐约束；多字节值可以从任何偏移处获取。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteOffset | number | 是 | - | - | 从视图开始检索值的位置。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回指定位置的 Int8 值。 | 


::: preview 

>UTS
```uts
    // Create an ArrayBuffer with a size in bytes
    let buffer = new ArrayBuffer(16);
    let view = new DataView(buffer);
    view.setInt8(1, 127); // Max signed 8-bit integer
    let ret = view.getInt8(1)
    console.log(ret)//127
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.getInt8.tutorial -->

### getInt16(byteOffset, littleEndian?)

获取指定字节偏移处的 Int16 值。没有对齐约束；多字节值可以从任何偏移处获取。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteOffset | number | 是 | - | - | 从视图开始检索值的位置。 |
| littleEndian | boolean | 否 | - | - | 如果为 false 或未定义，则读取大端值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回指定位置的 Int16 值。 | 


::: preview 

>UTS
```uts
    // Create an ArrayBuffer with a size in bytes
    let buffer = new ArrayBuffer(16);
    let view = new DataView(buffer);
    view.setInt16(1, 32767); // Max signed 16-bit integer
    let ret = view.getInt16(1);
    console.log(ret); // 32767
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.getInt16.tutorial -->

### getInt32(byteOffset, littleEndian?)

获取指定字节偏移处的 Int32 值。没有对齐约束；多字节值可以从任何偏移处获取。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteOffset | number | 是 | - | - | 从视图开始检索值的位置。 |
| littleEndian | boolean | 否 | - | - | 如果为 false 或未定义，则读取大端值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回指定位置的 Int32 值。 | 


::: preview 

>UTS
```uts
    // Create an ArrayBuffer with a size in bytes
    let buffer = new ArrayBuffer(16);
    let view = new DataView(buffer);
    view.setInt32(1, 2147483647); // Max signed 32-bit integer
    let ret = view.getInt32(1);
    console.log(ret); // 2147483647
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.getInt32.tutorial -->

### getUint8(byteOffset)

获取指定字节偏移处的 Uint8 值。没有对齐约束；多字节值可以从任何偏移处获取。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteOffset | number | 是 | - | - | 从视图开始检索值的位置。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回指定位置的 Uint8 值。 | 


::: preview 

>UTS
```uts
    // Create an ArrayBuffer with a size in bytes
    let buffer = new ArrayBuffer(16);
    let view = new DataView(buffer);
    view.setUint8(1, 255); // Max unsigned 8-bit integer
    let ret = view.getUint8(1);
    console.log(ret); // 255
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.getUint8.tutorial -->

### getUint16(byteOffset, littleEndian?)

获取指定字节偏移处的 Uint16 值。没有对齐约束；多字节值可以从任何偏移处获取。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteOffset | number | 是 | - | - | 从视图开始检索值的位置。 |
| littleEndian | boolean | 否 | - | - | 如果为 false 或未定义，则读取大端值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回指定位置的 Uint16 值。 | 


::: preview 

>UTS
```uts
    // Create an ArrayBuffer with a size in bytes
    let buffer = new ArrayBuffer(16);
    let view = new DataView(buffer);
    view.setUint16(1, 65535); // Max unsigned 16-bit integer
    let ret = view.getUint16(1);
    console.log(ret); // 65535
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.getUint16.tutorial -->

### getUint32(byteOffset, littleEndian?)

获取指定字节偏移处的 Uint32 值。没有对齐约束；多字节值可以从任何偏移处获取。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteOffset | number | 是 | - | - | 从视图开始检索值的位置。 |
| littleEndian | boolean | 否 | - | - | 如果为 false 或未定义，则读取大端值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回指定位置的 Uint32 值。 | 


::: preview 

>UTS
```uts
    // Create an ArrayBuffer with a size in bytes
    let buffer = new ArrayBuffer(16);
    let view = new DataView(buffer);
    view.setUint32(1, 4294967295); // Max unsigned 32-bit integer
    let ret = view.getUint32(1);
    console.log(ret); // 4294967295
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.getUint32.tutorial -->

### setFloat32(byteOffset, value, littleEndian?)

在指定的字节偏移处存储一个 Float32 值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteOffset | number | 是 | - | - | 从视图开始设置值的位置。 |
| value | number | 是 | - | - | 要设置的值。 |
| littleEndian | boolean | 否 | - | - | 如果为 false 或未定义，则写入大端值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| void | 无返回值。 | 


::: preview 

>UTS
```uts
    // Create an ArrayBuffer with a size in bytes
    let buffer = new ArrayBuffer(16);
    let view = new DataView(buffer);
    view.setFloat32(1, 3);
    let ret = view.getFloat32(1);
    console.log(ret); // 3
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.setFloat32.tutorial -->

### setFloat64(byteOffset, value, littleEndian?)

在指定的字节偏移处存储一个 Float64 值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteOffset | number | 是 | - | - | 从视图开始设置值的位置。 |
| value | number | 是 | - | - | 要设置的值。 |
| littleEndian | boolean | 否 | - | - | 如果为 false 或未定义，则写入大端值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| void | 无返回值。 | 


::: preview 

>UTS
```uts
    // Create an ArrayBuffer with a size in bytes
    let buffer = new ArrayBuffer(16);
    let view = new DataView(buffer);
    view.setFloat64(1, Math.PI);
    let ret = view.getFloat64(1);
    console.log(ret); // 3.141592653589793
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.setFloat64.tutorial -->

### setInt8(byteOffset, value)

在指定的字节偏移处存储一个 Int8 值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteOffset | number | 是 | - | - | 从视图开始设置值的位置。 |
| value | number | 是 | - | - | 要设置的值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| void | 无返回值。 | 


::: preview 

>UTS
```uts
    // Create an ArrayBuffer with a size in bytes
    let buffer = new ArrayBuffer(16);
    let view = new DataView(buffer);
    view.setInt8(1, 127); // Max signed 8-bit integer
    let ret = view.getInt8(1)
    console.log(ret)//127
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.setInt8.tutorial -->

### setInt16(byteOffset, value, littleEndian?)

在指定的字节偏移处存储一个 Int16 值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteOffset | number | 是 | - | - | 从视图开始设置值的位置。 |
| value | number | 是 | - | - | 要设置的值。 |
| littleEndian | boolean | 否 | - | - | 如果为 false 或未定义，则写入大端值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| void | 无返回值。 | 


::: preview 

>UTS
```uts
    // Create an ArrayBuffer with a size in bytes
    let buffer = new ArrayBuffer(16);
    let view = new DataView(buffer);
    view.setInt16(1, 32767); // Max signed 16-bit integer
    let ret = view.getInt16(1);
    console.log(ret); // 32767
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.setInt16.tutorial -->

### setInt32(byteOffset, value, littleEndian?)

在指定的字节偏移处存储一个 Int32 值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteOffset | number | 是 | - | - | 从视图开始设置值的位置。 |
| value | number | 是 | - | - | 要设置的值。 |
| littleEndian | boolean | 否 | - | - | 如果为 false 或未定义，则写入大端值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| void | 无返回值。 | 


::: preview 

>UTS
```uts
    // Create an ArrayBuffer with a size in bytes
    let buffer = new ArrayBuffer(16);
    let view = new DataView(buffer);
    view.setInt32(1, 2147483647); // Max signed 32-bit integer
    let ret = view.getInt32(1);
    console.log(ret); // 2147483647
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.setInt32.tutorial -->

### setUint8(byteOffset, value)

在指定的字节偏移处存储一个 Uint8 值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteOffset | number | 是 | - | - | 从视图开始设置值的位置。 |
| value | number | 是 | - | - | 要设置的值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| void | 无返回值。 | 


::: preview 

>UTS
```uts
    // Create an ArrayBuffer with a size in bytes
    let buffer = new ArrayBuffer(16);
    let view = new DataView(buffer);
    view.setUint8(1, 255); // Max unsigned 8-bit integer
    let ret = view.getUint8(1);
    console.log(ret); // 255
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.setUint8.tutorial -->

### setUint16(byteOffset, value, littleEndian?)

在指定的字节偏移处存储一个 Uint16 值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteOffset | number | 是 | - | - | 从视图开始设置值的位置。 |
| value | number | 是 | - | - | 要设置的值。 |
| littleEndian | boolean | 否 | - | - | 如果为 false 或未定义，则写入大端值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| void | 无返回值。 | 


::: preview 

>UTS
```uts
    // Create an ArrayBuffer with a size in bytes
    let buffer = new ArrayBuffer(16);
    let view = new DataView(buffer);
    view.setUint16(1, 65535); // Max unsigned 16-bit integer
    let ret = view.getUint16(1);
    console.log(ret); // 65535
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.setUint16.tutorial -->

### setUint32(byteOffset, value, littleEndian?)

在指定的字节偏移处存储一个 Uint32 值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteOffset | number | 是 | - | - | 从视图开始设置值的位置。 |
| value | number | 是 | - | - | 要设置的值。 |
| littleEndian | boolean | 否 | - | - | 如果为 false 或未定义，则写入大端值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| void | 无返回值。 | 


::: preview 

>UTS
```uts
    // Create an ArrayBuffer with a size in bytes
    let buffer = new ArrayBuffer(16);
    let view = new DataView(buffer);
    view.setUint32(1, 4294967295); // Max unsigned 32-bit integer
    let ret = view.getUint32(1);
    console.log(ret); // 4294967295
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.setUint32.tutorial -->

### Constructor(buffer, byteOffset?, byteLength?)

当使用 ArrayBuffer  实例以及可选的 byteOffset 和 length 参数调用时，将创建一个新的指定缓冲区的DataView视图。byteOffset 和 length 参数指定视图将暴露的内存范围。如果忽略这两个参数，则是整个视图的所有 buffer；如果仅忽略 length，则是从 byteOffset 开始的 buffer 剩余部分的视图。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| buffer | [ArrayBufferLike & { BYTES_PER_ELEMENT ?: never; }](#arraybufferlike-values) | 是 | - | - | ArrayBuffer实例 |
| byteOffset | number | 否 | - | - | 可选，偏移量，单位字节 |
| byteLength | number | 否 | - | - | 长度 | 

#### buffer 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteLength | number | 是 | - | Web: √; Android: 4.25; iOS: 4.11; HarmonyOS: 4.61 | ArrayBuffer 实例的 byteLength 访问器属性返回该数组缓冲区的长度（以字节为单位）。 |
| BYTES_PER_ELEMENT | any | 否 | - | - | - |

##### ArrayBufferLike & { BYTES_PER_ELEMENT ?: never; } 的方法 @arraybufferlike-values 

##### slice(begin ?: number, end ?: number) : ArrayBuffer; @slice
slice
ArrayBuffer 实例的 slice() 方法返回一个新的 ArrayBuffer 实例，其包含原 ArrayBuffer 实例中从 begin 开始（包含）到 end 结束（不含）的所有字节的副本。
###### slice 兼容性 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| begin | number | 否 | - | - | 可选，要开始提取的位置索引（从 0 开始），将被转换为整数。负数索引将会从缓冲区末尾开始计算——如果 start \< 0，那么将会使用 start + buffer.length。 如果 start \< -buffer.length 或省略了 start，则会使用 0。 如果 start >= buffer.length，则不会提取任何内容。 |
| end | number | 否 | - | - | 可选，要结束提取的位置索引（从 0 开始），将被转换为整数。slice() 提取到但不包括 end。 负数索引将会从缓冲区末尾开始计算——如果 end \< 0，那么将会使用 end + buffer.length。 如果 end \< -buffer.length，则会使用 0。 如果 end >= buffer.length 或省略了 end，则会使用 buffer.length，则会导致直到末尾的所有元素都被提取。 如果标准化后的 end 位置在 start 位置之前，则不会提取任何内容。 | 

###### 返回值 

| 类型 | 描述 |
| :- | :- |
| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 一个新的 ArrayBuffer 对象。 |
 

##### toByteBuffer() : ByteBuffer; @tobytebuffer
toByteBuffer
ArrayBuffer 实例的 toByteBuffer() 方法返回一个android原生ByteBuffer对象。
###### toByteBuffer 兼容性 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| x | 4.25 | x | 4.61 |


###### 返回值 

| 类型 | 描述 |
| :- | :- |
| ByteBuffer | android 原生ByteBuffer对象。 |
 

##### toData() : Data; @todata
toData
ArrayBuffer 实例的 toData() 方法返回一个 iOS 原生 Data 对象。
###### toData 兼容性 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| x | x | x | 4.61 |


###### 返回值 

| 类型 | 描述 |
| :- | :- |
| Data | iOS 原生 Data 对象。 |
 


**返回值**
| 类型 | 描述 |
| :- | :- |
| DataView | 实例对象 | 


<!-- UTSJSON.DataView.Constructor.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.DataView.Constructor.tutorial -->
