# Float32Array


## 构造函数


### new(length : number) : Float32Array;@Constructor(length)

初始化一个对象

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| length | number | 是 | - | - | 当使用非对象调用时，该参数将被视为指定类型化数组长度的数字。在内存中创建一个内部数组缓冲区，大小长度乘以 BYTES_PER_ELEMENT 字节，用 0 填充。省略所有参数，等同于使用 0 作为参数。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Float32Array | 实例对象 | 


<!-- UTSJSON.Float32Array.Constructor.test -->

<!-- UTSJSON.Float32Array.Constructor.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Float32Array.Constructor.tutorial -->

### new(array : ArrayLike\<number> \| ArrayBufferLike) : Float32Array;@Constructor(array)

初始化一个对象

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| array | ArrayLike\<number> \| ArrayBufferLike | 是 | - | - | 当使用 TypedArray 子类的实例调用时，typedArray 会被拷贝到一个新的类型数组中。对于非 bigint TypeedArray 构造函数，typedArray 参数仅可以是非 bigint 类型（例如 Int32Array）。同样，对于 bigint TypedArray 构造函数（BigInt64Array 或 BigUint64Array），typedArray 参数仅可以是 bigint 类型。typedArray 中的每个值在拷贝到新数组之前都转换为构造函数的相应类型。新的类型化数组的长度与 typedArray 参数的长度相同。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Float32Array | 实例对象 | 


<!-- UTSJSON.Float32Array.Constructor_1.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | √ | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Float32Array.Constructor_1.tutorial -->

### new(buffer : ArrayBufferLike, byteOffset ?: number, length ?: number) : Float32Array;@Constructor(buffer, byteOffset?, length?)

当使用 ArrayBuffer  实例以及可选的 byteOffset 和 length 参数调用时，将创建一个新的指定缓冲区的类型化数组视图。byteOffset 和 length 参数指定类型化数组视图将暴露的内存范围。如果忽略这两个参数，则是整个视图的所有 buffer；如果仅忽略 length，则是从 byteOffset 开始的 buffer 剩余部分的视图。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| buffer | [ArrayBufferLike](#arraybufferlike-values) | 是 | - | - | ArrayBuffer实例 |
| byteOffset | number | 否 | - | - | 可选，偏移量，单位字节 |
| length | number | 否 | - | - | 可选，长度 | 

#### buffer 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| byteLength | number | 是 | - | Web: √; Android: 4.25; iOS: 4.11; HarmonyOS: 4.61 | ArrayBuffer 实例的 byteLength 访问器属性返回该数组缓冲区的长度（以字节为单位）。 |

##### ArrayBufferLike 的方法 @arraybufferlike-values 

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
| Float32Array | 实例对象 | 


<!-- UTSJSON.Float32Array.Constructor_2.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Float32Array.Constructor_2.tutorial -->


## 静态属性


### BYTES_PER_ELEMENT

数组中每个元素的字节大小。





<!-- UTSJSON.Float32Array.BYTES_PER_ELEMENT.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Float32Array.BYTES_PER_ELEMENT.tutorial -->


## 静态方法


### of(...items)

从一组元素创建一个新数组。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| items | number[\] | 是 | - | - | 要包含在新数组对象中的一组元素。 | 


**返回值**
| 类型 |
| :- |
| Float32Array | 


::: preview 

>UTS
```uts
    var float32Array = Float32Array.of(1, 2, 3)
    console.log(float32Array.toString()); // '1,2,3'
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


<!-- UTSJSON.Float32Array.of.tutorial -->

### from(arrayLike,mapFn?)

从类似数组或可迭代对象创建数组。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arrayLike | [ArrayLike\<number>](#arraylike-values) | 是 | - | - | 要转换为数组的类似数组或可迭代对象。 |
| mapfn | (v: number, k: number) => number | 否 | - | - | 可选参数。如果指定了该参数，则最后生成的类型数组会经过该函数的加工处理后再返回。 | 

#### arrayLike 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| length | number | 是 | - | - | - |


**返回值**
| 类型 |
| :- |
| Float32Array | 


::: preview 

>UTS
```uts
    var float32Array = Float32Array.from([1, 2, 3], (v: number, _: number): number => v + v);
    console.log(float32Array.toString()); // '2,4,6'
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


<!-- UTSJSON.Float32Array.from.tutorial -->


## 实例属性


### BYTES_PER_ELEMENT

数组中每个元素的字节大小。





<!-- UTSJSON.Float32Array.BYTES_PER_ELEMENT.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Float32Array.BYTES_PER_ELEMENT.tutorial -->

### buffer

<!-- UTSJSON.Float32Array.buffer.description -->

<!-- UTSJSON.Float32Array.buffer.param -->

<!-- UTSJSON.Float32Array.buffer.returnValue -->

<!-- UTSJSON.Float32Array.buffer.test -->

<!-- UTSJSON.Float32Array.buffer.compatibility -->

<!-- UTSJSON.Float32Array.buffer.tutorial -->

### byteLength

<!-- UTSJSON.Float32Array.byteLength.description -->

<!-- UTSJSON.Float32Array.byteLength.param -->

<!-- UTSJSON.Float32Array.byteLength.returnValue -->

<!-- UTSJSON.Float32Array.byteLength.test -->

<!-- UTSJSON.Float32Array.byteLength.compatibility -->

<!-- UTSJSON.Float32Array.byteLength.tutorial -->

### byteOffset

<!-- UTSJSON.Float32Array.byteOffset.description -->

<!-- UTSJSON.Float32Array.byteOffset.param -->

<!-- UTSJSON.Float32Array.byteOffset.returnValue -->

<!-- UTSJSON.Float32Array.byteOffset.test -->

<!-- UTSJSON.Float32Array.byteOffset.compatibility -->

<!-- UTSJSON.Float32Array.byteOffset.tutorial -->

### length

<!-- UTSJSON.Float32Array.length.description -->

<!-- UTSJSON.Float32Array.length.param -->

<!-- UTSJSON.Float32Array.length.returnValue -->

<!-- UTSJSON.Float32Array.length.test -->

<!-- UTSJSON.Float32Array.length.compatibility -->

<!-- UTSJSON.Float32Array.length.tutorial -->


## 实例方法


### copyWithin(target, start, end?)

<!-- UTSJSON.Float32Array.copyWithin.description -->

<!-- UTSJSON.Float32Array.copyWithin.param -->

<!-- UTSJSON.Float32Array.copyWithin.returnValue -->

::: preview 

>UTS
```uts
    let float32 = new Float32Array(8);
    float32.set([1, 2, 3], 1);
    float32.copyWithin(3, 0, 3);
    console.log(float32.toString()); // 0,1,2,0,1,2,0,0
```

:::

<!-- UTSJSON.Float32Array.copyWithin.compatibility -->

<!-- UTSJSON.Float32Array.copyWithin.tutorial -->

### every(predicate)

<!-- UTSJSON.Float32Array.every.description -->

<!-- UTSJSON.Float32Array.every.param -->

<!-- UTSJSON.Float32Array.every.returnValue -->

::: preview 

>UTS
```uts
    let result = new Float32Array([12, 5, 8, 130, 44]).every((value: number, _: number, _a: Float32Array): boolean => value < 40);
    console.log(result); // false
```

:::

<!-- UTSJSON.Float32Array.every.compatibility -->

<!-- UTSJSON.Float32Array.every.tutorial -->

### fill(value, start?, end?)

<!-- UTSJSON.Float32Array.fill.description -->

<!-- UTSJSON.Float32Array.fill.param -->

<!-- UTSJSON.Float32Array.fill.returnValue -->

::: preview 

>UTS
```uts
    let float32_t1 = new Float32Array([1, 2, 3]).fill(4);
    console.log(float32_t1.toString()); // 4,4,4

    let float32_t2 = new Float32Array([1, 2, 3]).fill(4, 1);
    console.log(float32_t2.toString()); // 1,4,4


    let float32_t3 = new Float32Array([1, 2, 3]).fill(4, 1, 2);
    console.log(float32_t3.toString()); // 1,4,3

    let float32_t4 = new Float32Array([1, 2, 3]).fill(4, 1, 1);
    console.log(float32_t4.toString()); // 1,2,3

    let float32 = new Float32Array([1, 2, 3]).fill(4, -3, -2);
    console.log(float32.toString()); // 4,2,3
```

:::

<!-- UTSJSON.Float32Array.fill.compatibility -->

<!-- UTSJSON.Float32Array.fill.tutorial -->

### filter(predicate)

<!-- UTSJSON.Float32Array.filter.description -->

<!-- UTSJSON.Float32Array.filter.param -->

<!-- UTSJSON.Float32Array.filter.returnValue -->

::: preview 

>UTS
```uts
    let float32 = new Float32Array([12, 5, 8, 44]).filter((value: number, _: number, _a: Float32Array): boolean => value >= 10);
    console.log(float32.toString()); // 12,44
```

:::

<!-- UTSJSON.Float32Array.filter.compatibility -->

<!-- UTSJSON.Float32Array.filter.tutorial -->

### find(predicate)

<!-- UTSJSON.Float32Array.find.description -->

<!-- UTSJSON.Float32Array.find.param -->

<!-- UTSJSON.Float32Array.find.returnValue -->

::: preview 

>UTS
```uts
    let float32 = new Float32Array([4, 5, 8, 12]);
    let res = float32.find((value: number, _: number, _a: Float32Array): boolean => value > 5);
    console.log(res); // 8
```

:::

<!-- UTSJSON.Float32Array.find.compatibility -->

<!-- UTSJSON.Float32Array.find.tutorial -->

### findIndex(predicate)

<!-- UTSJSON.Float32Array.findIndex.description -->

<!-- UTSJSON.Float32Array.findIndex.param -->

<!-- UTSJSON.Float32Array.findIndex.returnValue -->

::: preview 

>UTS
```uts
    let float32 = new Float32Array([4, 6, 8, 12]);
    let res1 = float32.findIndex((value: number, _: number, _a: Float32Array): boolean => value > 100);
    console.log(res1); // -1

    let ufloat32 = new Float32Array([4, 6, 7, 120]);
    let res = ufloat32.findIndex((value: number, _: number, _a: Float32Array): boolean => value > 100);
    console.log(res); // 3
```

:::

<!-- UTSJSON.Float32Array.findIndex.compatibility -->

<!-- UTSJSON.Float32Array.findIndex.tutorial -->

### forEach(callbackfn)

<!-- UTSJSON.Float32Array.forEach.description -->

<!-- UTSJSON.Float32Array.forEach.param -->

<!-- UTSJSON.Float32Array.forEach.returnValue -->

::: preview 

>UTS
```uts
    new Float32Array([0, 1, 2, 3]).forEach((value: number, index: number, _: Float32Array) => {
      console.log(`a[${index}] = ${value}`);
    });
```

:::

<!-- UTSJSON.Float32Array.forEach.compatibility -->

<!-- UTSJSON.Float32Array.forEach.tutorial -->

### indexOf(searchElement, fromIndex?)

<!-- UTSJSON.Float32Array.indexOf.description -->

<!-- UTSJSON.Float32Array.indexOf.param -->

<!-- UTSJSON.Float32Array.indexOf.returnValue -->

::: preview 

>UTS
```uts
    let float32 = new Float32Array([2, 5, 9]);
    let res = float32.indexOf(2);
    console.log(res); // 0

    let res1 = float32.indexOf(7);
    console.log(res1); // -1


    let res2 = float32.indexOf(9, 2);
    console.log(res2); // 2


    let res3 = float32.indexOf(2, -1);
    console.log(res3); // -1


    let res4 = float32.indexOf(2, -3);
    console.log(res4); // 0
```

:::

<!-- UTSJSON.Float32Array.indexOf.compatibility -->

<!-- UTSJSON.Float32Array.indexOf.tutorial -->

### join(separator?)

<!-- UTSJSON.Float32Array.join.description -->

<!-- UTSJSON.Float32Array.join.param -->

<!-- UTSJSON.Float32Array.join.returnValue -->

::: preview 

>UTS
```uts
    let float32 = new Float32Array([1, 2, 3]);
    let res = float32.join();
    console.log(res); // 1,2,3

    let res1 = float32.join(" / ");
    console.log(res1); // 1 / 2 / 3

    let res2 = float32.join("");
    console.log(res2); // 123
```

:::

<!-- UTSJSON.Float32Array.join.compatibility -->

<!-- UTSJSON.Float32Array.join.tutorial -->

### map(callbackfn)

<!-- UTSJSON.Float32Array.map.description -->

<!-- UTSJSON.Float32Array.map.param -->

<!-- UTSJSON.Float32Array.map.returnValue -->

::: preview 

>UTS
```uts
    let numbers = new Float32Array([1, 4, 9]);
    let doubles = numbers.map((value: number, _: number, _a: Float32Array): number => value * 2);
    console.log(doubles.toString()); // 2,8,18
```

:::

<!-- UTSJSON.Float32Array.map.compatibility -->

<!-- UTSJSON.Float32Array.map.tutorial -->

### reduce(callbackfn)

<!-- UTSJSON.Float32Array.reduce.description -->

<!-- UTSJSON.Float32Array.reduce.param -->

<!-- UTSJSON.Float32Array.reduce.returnValue -->

::: preview 

>UTS
```uts
    let total = new Float32Array([0, 1, 2, 3]);
    let res1 = total.reduce((accumulator: number, currentValue: number, _: number, _a: Float32Array): number =>
      accumulator + currentValue
    );
    console.log(res1); // 6

    total = new Float32Array([0, 1, 2, 3]);
    let res2 = total.reduce((accumulator: number, currentValue: number, _: number, _a: Float32Array): number =>
      accumulator + currentValue, 8
    );
    console.log(res2); // 14
```

:::

<!-- UTSJSON.Float32Array.reduce.compatibility -->

<!-- UTSJSON.Float32Array.reduce.tutorial -->

### reduceRight(callbackfn)

<!-- UTSJSON.Float32Array.reduceRight.description -->

<!-- UTSJSON.Float32Array.reduceRight.param -->

<!-- UTSJSON.Float32Array.reduceRight.returnValue -->

::: preview 

>UTS
```uts
    let total = new Float32Array([0, 1, 2, 3]);
    let res = total.reduceRight((accumulator: number, currentValue: number, _: number, _a: Float32Array): number => accumulator + currentValue);
    console.log(res); // 6
```

:::

<!-- UTSJSON.Float32Array.reduceRight.compatibility -->

<!-- UTSJSON.Float32Array.reduceRight.tutorial -->

### reverse()

<!-- UTSJSON.Float32Array.reverse.description -->

<!-- UTSJSON.Float32Array.reverse.param -->

<!-- UTSJSON.Float32Array.reverse.returnValue -->

::: preview 

>UTS
```uts
    let float32 = new Float32Array([1, 2, 3]);
    float32.reverse();
    console.log(float32.toString()); // 3,2,1
```

:::

<!-- UTSJSON.Float32Array.reverse.compatibility -->

<!-- UTSJSON.Float32Array.reverse.tutorial -->

### set(array, offset?)

<!-- UTSJSON.Float32Array.set.description -->

<!-- UTSJSON.Float32Array.set.param -->

<!-- UTSJSON.Float32Array.set.returnValue -->

::: preview 

>UTS
```uts
    let float32 = new Float32Array(8);
    var array = [1, 2, 3];
    float32.set(array, 1);
    console.log(float32.toString()); // 0,1,2,3,0,0,0,0

    let src = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4];
    let typed_dest = new Float32Array(16);
    typed_dest.set(src);
    console.log(typed_dest.toString()); // 1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4
    // console.log(typed_dest.toString()) // "1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4";

    let typed_src = new Float32Array(src);
    typed_dest = new Float32Array(16);
    typed_dest.set(typed_src);
    console.log(typed_dest.toString()); // 1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4
```

:::

<!-- UTSJSON.Float32Array.set.compatibility -->

<!-- UTSJSON.Float32Array.set.tutorial -->

### slice(start?, end?)

<!-- UTSJSON.Float32Array.slice.description -->

<!-- UTSJSON.Float32Array.slice.param -->

<!-- UTSJSON.Float32Array.slice.returnValue -->

::: preview 

>UTS
```uts
    let float32 = new Float32Array([1, 2, 3]);
    let res = float32.slice(1);
    console.log(res.toString()); // 2,3

    let res1 = float32.slice(2);
    console.log(res1.toString()); // 3

    let res2 = float32.slice(-2);
    console.log(res2.toString()); // 2,3

    let res3 = float32.slice(0, 1);
    console.log(res3.toString()); // 1
```

:::

<!-- UTSJSON.Float32Array.slice.compatibility -->

<!-- UTSJSON.Float32Array.slice.tutorial -->

### some(predicate)

<!-- UTSJSON.Float32Array.some.description -->

<!-- UTSJSON.Float32Array.some.param -->

<!-- UTSJSON.Float32Array.some.returnValue -->

::: preview 

>UTS
```uts
    const float32 = new Float32Array([-10, 20, -30, 40, -50]);
    const positives = new Float32Array([10, 20, 30, 40, 50]);

    console.log(float32.some((element: number, index: number, array: Float32Array): boolean =>
      element < 0
    )); // true

    console.log(positives.some((element: number, index: number, array: Float32Array): boolean =>
      element < 0
    )); // false
```

:::

<!-- UTSJSON.Float32Array.some.compatibility -->

<!-- UTSJSON.Float32Array.some.tutorial -->

### sort(compareFn?)

<!-- UTSJSON.Float32Array.sort.description -->

<!-- UTSJSON.Float32Array.sort.param -->

<!-- UTSJSON.Float32Array.sort.returnValue -->

::: preview 

>UTS
```uts
    let numbers = new Float32Array([40, 1, 5]);
    numbers.sort();
    console.log(numbers.toString()); // 1,5,40

    let ret = numbers.toString()
    numbers.sort((a, b): number => a - b);
    console.log(numbers.toString()); // 1,5,40

```

:::

<!-- UTSJSON.Float32Array.sort.compatibility -->

<!-- UTSJSON.Float32Array.sort.tutorial -->

### subarray(begin?, end?)

<!-- UTSJSON.Float32Array.subarray.description -->

<!-- UTSJSON.Float32Array.subarray.param -->

<!-- UTSJSON.Float32Array.subarray.returnValue -->

::: preview 

>UTS
```uts
    let buffer = new ArrayBuffer(16);
    let float32 = new Float32Array(buffer);
    float32.set([1, 2, 3]);
    console.log(float32.toString()); // 1,2,3,0

    let sub = float32.subarray(0, 4);
    console.log(sub.toString()); // 1,2,3,0
```

:::

<!-- UTSJSON.Float32Array.subarray.compatibility -->

<!-- UTSJSON.Float32Array.subarray.tutorial -->

### toString()

<!-- UTSJSON.Float32Array.toString.description -->

<!-- UTSJSON.Float32Array.toString.param -->

<!-- UTSJSON.Float32Array.toString.returnValue -->

<!-- UTSJSON.Float32Array.toString.test -->

<!-- UTSJSON.Float32Array.toString.compatibility -->

<!-- UTSJSON.Float32Array.toString.tutorial -->

### values()

<!-- UTSJSON.Float32Array.values.description -->

<!-- UTSJSON.Float32Array.values.param -->

<!-- UTSJSON.Float32Array.values.returnValue -->

::: preview 

>UTS
```uts
    let arr = new Float32Array([1, 2, 3]);
    let values = arr.values().next().value;
    console.log(values); // 1
```

:::

<!-- UTSJSON.Float32Array.values.compatibility -->

<!-- UTSJSON.Float32Array.values.tutorial -->

### entries()

<!-- UTSJSON.Float32Array.entries.description -->

<!-- UTSJSON.Float32Array.entries.param -->

<!-- UTSJSON.Float32Array.entries.returnValue -->

::: preview 

>UTS
```uts
    let arr = new Float32Array([10, 20, 30, 40, 50]);
    let entries = arr.entries();
    // #ifndef APP-IOS
    let value1 = entries.next().value[1]
    let value2 = entries.next().value[1]
    // #endif
    // #ifdef APP-IOS
    let value1 = entries.next().value![1]
    let value2 = entries.next().value![1]
    // #endif

    console.log(value1); // 10
    console.log(value2); // 20
```

:::

<!-- UTSJSON.Float32Array.entries.compatibility -->

<!-- UTSJSON.Float32Array.entries.tutorial -->

### keys()

<!-- UTSJSON.Float32Array.keys.description -->

<!-- UTSJSON.Float32Array.keys.param -->

<!-- UTSJSON.Float32Array.keys.returnValue -->

::: preview 

>UTS
```uts
    let arr = new Float32Array([10, 20, 30, 40, 50]);
    let keys = arr.keys();
    let ret = keys.next().value
    console.log(ret); // 0
```

:::

<!-- UTSJSON.Float32Array.keys.compatibility -->

<!-- UTSJSON.Float32Array.keys.tutorial -->
