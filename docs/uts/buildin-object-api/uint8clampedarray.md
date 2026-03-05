# Uint8ClampedArray


## 构造函数


### new(length : number) : Uint8ClampedArray;@Constructor(length)

初始化一个对象

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| length | number | 是 | - | - | 当使用非对象调用时，该参数将被视为指定类型化数组长度的数字。在内存中创建一个内部数组缓冲区，大小长度乘以 BYTES_PER_ELEMENT 字节，用 0 填充。省略所有参数，等同于使用 0 作为参数。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Uint8ClampedArray | 实例对象 | 


<!-- UTSJSON.Uint8ClampedArray.Constructor.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Uint8ClampedArray.Constructor.tutorial -->

### new(array : ArrayLike\<number> \| ArrayBufferLike) : Uint8ClampedArray;@Constructor(array)

初始化一个对象

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| array | ArrayLike\<number> \| ArrayBufferLike | 是 | - | - | 当使用 TypedArray 子类的实例调用时，typedArray 会被拷贝到一个新的类型数组中。对于非 bigint TypeedArray 构造函数，typedArray 参数仅可以是非 bigint 类型（例如 Int32Array）。同样，对于 bigint TypedArray 构造函数（BigInt64Array 或 BigUint64Array），typedArray 参数仅可以是 bigint 类型。typedArray 中的每个值在拷贝到新数组之前都转换为构造函数的相应类型。新的类型化数组的长度与 typedArray 参数的长度相同。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Uint8ClampedArray | 实例对象 | 


<!-- UTSJSON.Uint8ClampedArray.Constructor_1.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Uint8ClampedArray.Constructor_1.tutorial -->

### new(buffer : ArrayBufferLike, byteOffset ?: number, length ?: number) : Uint8ClampedArray;@Constructor(buffer, byteOffset?, length?)

当使用 ArrayBuffer  实例以及可选的 byteOffset 和 length 参数调用时，将创建一个新的指定缓冲区的类型化数组视图。byteOffset 和 length 参数指定类型化数组视图将暴露的内存范围。如果忽略这两个参数，则是整个视图的所有 buffer；如果仅忽略 length，则是从 byteOffset 开始的 buffer 剩余部分的视图。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| buffer | [ArrayBufferLike](#arraybufferlike-values) | 是 | - | - | ArrayBuffer实例 |
| byteOffset | number | 否 | - | - | 可选，偏移量，单位字节 |
| length | number | 否 | - | - | 可选，长度 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Uint8ClampedArray | 实例对象 | 


<!-- UTSJSON.Uint8ClampedArray.Constructor_2.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Uint8ClampedArray.Constructor_2.tutorial -->


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
| Uint8ClampedArray | 


::: preview 

>UTS
```uts
    var array = Uint8ClampedArray.of(1, 2, 3)
    console.log(array.toString()); // '1,2,3'
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


<!-- UTSJSON.Uint8ClampedArray.of.tutorial -->

### from(arrayLike,mapFn?)

从类似数组或可迭代对象创建数组。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arrayLike | [ArrayLike\<number>](#arraylike-values) | 是 | - | - | 要转换为数组的类似数组或可迭代对象。 |
| mapfn | (v: number, k: number) => number | 否 | - | - | 可选参数。如果指定了该参数，则最后生成的类型数组会经过该函数的加工处理后再返回。 | 


**返回值**
| 类型 |
| :- |
| Uint8ClampedArray | 


::: preview 

>UTS
```uts
    var array = Uint8ClampedArray.from([1, 2, 3], (v : number, _ : number) : number => v + v);
    console.log(array.toString()); // '2,4,6'
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


<!-- UTSJSON.Uint8ClampedArray.from.tutorial -->


## 静态属性


### BYTES_PER_ELEMENT

数组中每个元素的字节大小。





<!-- UTSJSON.Uint8ClampedArray.BYTES_PER_ELEMENT.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Uint8ClampedArray.BYTES_PER_ELEMENT.tutorial -->


## 实例属性


### BYTES_PER_ELEMENT

数组中每个元素的字节大小。





<!-- UTSJSON.Uint8ClampedArray.BYTES_PER_ELEMENT.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Uint8ClampedArray.BYTES_PER_ELEMENT.tutorial -->

### buffer

数组引用的ArrayBuffer实例。





<!-- UTSJSON.Uint8ClampedArray.buffer.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Uint8ClampedArray.buffer.tutorial -->

### byteLength

数组的字节长度。





<!-- UTSJSON.Uint8ClampedArray.byteLength.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Uint8ClampedArray.byteLength.tutorial -->

### byteOffset

数组的字节偏移量。





<!-- UTSJSON.Uint8ClampedArray.byteOffset.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Uint8ClampedArray.byteOffset.tutorial -->

### length

数组的长度





<!-- UTSJSON.Uint8ClampedArray.length.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Uint8ClampedArray.length.tutorial -->


## 实例方法


### copyWithin(target, start, end?)

返回this对象，将数组中由start和end标识的部分复制到从位置target开始的相同数组。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| target | number | 是 | - | - | 如果target为负数，则视为length+target，其中length为数组的长度。 |
| start | number | 是 | - | - | 如果start为负数，则视为length+start。如果省略end，则使用this对象的长度作为其默认值。 |
| end | number | 否 | - | - | 如果未指定，默认使用this对象的长度。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| this | 修改后的类型化数组。 | 


::: preview 

>UTS
```uts
    console.log("testCopyWith 1");
    let uint8Clamped = new Uint8ClampedArray(8);
    uint8Clamped.set([1, 2, 3], 1);
    uint8Clamped.copyWithin(3, 0, 3);
    console.log(uint8Clamped.toString()); // "0,1,2,0,1,2,0,0"
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


<!-- UTSJSON.Uint8ClampedArray.copyWithin.tutorial -->

### every(predicate)

确定数组的所有成员是否满足指定的测试。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| predicate | (value: number, index: number, array: [Uint8ClampedArray](/uts/buildin-object-api/uint8clampedarray.md)) => boolean | 是 | - | - | 一个最多接受三个参数的函数。every方法对数组中的每个元素调用predicate函数，直到predicate返回一个可转换为布尔值false的值，或者直到数组结束。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 返回 true，除非 callbackFn 对类型化数组中的某个元素返回了假值（在这种情况下，立即返回 false）。 | 


::: preview 

>UTS
```uts
    // const isBelowThreshold = (currentValue: number, index: number, array:Uint8ClampedArray): boolean => currentValue < 40;    
    let result = new Uint8ClampedArray([12, 5, 8, 130, 44]).every((value : number, _ : number, _a :
      Uint8ClampedArray) : boolean => value < 40);
    console.log(result); // false
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


<!-- UTSJSON.Uint8ClampedArray.every.tutorial -->

### fill(value, start?, end?)

将数组中的所有元素更改为静态值value，并返回修改后的数组。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| value | number | 是 | - | - | 用于填充数组部分的值。 |
| start | number | 否 | - | - | 开始填充数组的索引。如果start为负数，则视为length+start，其中length为数组的长度。 |
| end | number | 否 | - | - | 停止填充数组的索引。如果end为负数，则视为length+end。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| this | 修改后的类型化数组。 | 


::: preview 

>UTS
```uts
    let uint8Clamped_t1 = new Uint8ClampedArray([1, 2, 3]).fill(4);
    console.log(uint8Clamped_t1.toString()); // "4,4,4"

    let uint8Clamped_t2 = new Uint8ClampedArray([1, 2, 3]).fill(4, 1);
    console.log(uint8Clamped_t2.toString()); // "1,4,4"

    let uint8Clamped_t3 = new Uint8ClampedArray([1, 2, 3]).fill(4, 1, 2);
    console.log(uint8Clamped_t3.toString()); // "1,4,3"

    let uint8Clamped_t4 = new Uint8ClampedArray([1, 2, 3]).fill(4, 1, 1);
    console.log(uint8Clamped_t4.toString()); // "1,2,3"

    let uint8Clamped_t5 = new Uint8ClampedArray([1, 2, 3]).fill(4, -3, -2);
    console.log(uint8Clamped_t5.toString()); // "4,2,3"

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


<!-- UTSJSON.Uint8ClampedArray.fill.tutorial -->

### filter(predicate)

返回满足回调函数中指定条件的数组元素。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| predicate | (value: number, index: number, array: [Uint8ClampedArray](/uts/buildin-object-api/uint8clampedarray.md)) => any | 是 | - | - | 一个最多接受三个参数的函数。filter方法对数组中的每个元素调用predicate函数。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Uint8ClampedArray | 新的类型化数组，含有通过测试的元素 | 


::: preview 

>UTS
```uts
    // const isBelowThreshold = (currentValue: number, index: number, _): boolean => currentValue >= 10;

    let uint8Clamped = new Uint8ClampedArray([12, 5, 8, 44]).filter((value : number, _ : number, _a :
      Uint8ClampedArray) : boolean => value >= 10);
    console.log(uint8Clamped.toString()); // "12,44"
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


<!-- UTSJSON.Uint8ClampedArray.filter.tutorial -->

### find(predicate)

返回数组中第一个满足条件的元素的值，否则返回undefined。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| predicate | (value: number, index: number, obj: [Uint8ClampedArray](/uts/buildin-object-api/uint8clampedarray.md)) => boolean | 是 | - | - | 对数组中的每个元素调用一次predicate，直到找到一个使predicate返回true的元素为止。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number \| null | 如果元素通过了测试，则为该元素，否则为undefined。 | 


::: preview 

>UTS
```uts
    let uint8Clamped = new Uint8ClampedArray([4, 5, 8, 12]);
    let res = uint8Clamped.find((value : number, _ : number, _a : Uint8ClampedArray) : boolean => value > 5);
    console.log(res); // 8
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


<!-- UTSJSON.Uint8ClampedArray.find.tutorial -->

### findIndex(predicate)

返回数组中第一个满足条件的元素的索引，否则返回-1。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| predicate | (value: number, index: number, obj: [Uint8ClampedArray](/uts/buildin-object-api/uint8clampedarray.md)) => boolean | 是 | - | - | 对数组中的每个元素调用一次predicate，直到找到一个使predicate返回true的元素为止。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 如果元素通过了测试，则为数组下标，否则为 -1。 | 


::: preview 

>UTS
```uts
    let uint8Clamped_t1 = new Uint8ClampedArray([4, 6, 8, 12]);
    let res1 = uint8Clamped_t1.findIndex((value : number, _ : number, _a : Uint8ClampedArray) : boolean => value > 100);
    console.log(res1); // -1

    let uint8Clamped_t2 = new Uint8ClampedArray([4, 6, 7, 120]);
    let res2 = uint8Clamped_t2.findIndex((value : number, _ : number, _a : Uint8ClampedArray) : boolean => value > 100);
    console.log(res2); // 3

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


<!-- UTSJSON.Uint8ClampedArray.findIndex.tutorial -->

### forEach(callbackfn)

对数组的每个元素执行指定的操作。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackfn | (value: number, index: number, array: [Uint8ClampedArray](/uts/buildin-object-api/uint8clampedarray.md)) => void | 是 | - | - | 一个最多接受三个参数的函数。forEach方法对数组中的每个元素调用callbackfn函数。 | 


**返回值**
| 类型 |
| :- |
| void | 


::: preview 

>UTS
```uts
    new Uint8ClampedArray([0, 1, 2, 3]).forEach((value : number, index : number, _ : Uint8ClampedArray) => {
      console.log(`a[${index}] = ${value}`);
    });
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


<!-- UTSJSON.Uint8ClampedArray.forEach.tutorial -->

### indexOf(searchElement, fromIndex?)

返回数组中第一个出现的指定值的索引，如果不存在则返回-1。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| searchElement | number | 是 | - | - | 要在数组中查找的值。 |
| fromIndex | number | 否 | - | - | 开始搜索的数组索引。如果省略，则从索引0开始搜索。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 数组中元素的第一个下标；没有找到则返回**-1** 。 | 


::: preview 

>UTS
```uts
    let uint8Clamped_t1 = new Uint8ClampedArray([2, 5, 9]);
    let res1 = uint8Clamped_t1.indexOf(2);
    console.log(res1); // 0

    let uint8Clamped_t2 = new Uint8ClampedArray([2, 5, 9]);
    let res2 = uint8Clamped_t2.indexOf(7);
    console.log(res2); // -1

    let uint8Clamped_t3 = new Uint8ClampedArray([2, 5, 9]);
    let res3 = uint8Clamped_t3.indexOf(9, 2);
    console.log(res3); // 2

    let uint8Clamped_t4 = new Uint8ClampedArray([2, 5, 9]);
    let res4 = uint8Clamped_t4.indexOf(2, -1);
    console.log(res4); // -1

    let uint8Clamped_t5 = new Uint8ClampedArray([2, 5, 9]);
    let res5 = uint8Clamped_t5.indexOf(2, -3);
    console.log(res5); // 0

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


<!-- UTSJSON.Uint8ClampedArray.indexOf.tutorial -->

### join(separator?)

将数组中所有元素连接成一个字符串。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| separator | string | 否 | - | - | 用于分隔数组元素的字符串。如果省略，则使用逗号分隔数组元素。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 所有元素连接后的字符串。 | 


::: preview 

>UTS
```uts
    let uint8Clamped_t1 = new Uint8ClampedArray([1, 2, 3]);
    let res1 = uint8Clamped_t1.join();
    console.log(res1); // "1,2,3"

    let uint8Clamped_t2 = new Uint8ClampedArray([1, 2, 3]);
    let res2 = uint8Clamped_t2.join(" / ");
    console.log(res2); // "1 / 2 / 3"

    let uint8Clamped_t3 = new Uint8ClampedArray([1, 2, 3]);
    let res3 = uint8Clamped_t3.join("");
    console.log(res3); // "123"

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


<!-- UTSJSON.Uint8ClampedArray.join.tutorial -->

### map(callbackfn)

对数组的每个元素执行指定的操作，并返回包含执行结果的数组。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackfn | (value: number, index: number, array: [Uint8ClampedArray](/uts/buildin-object-api/uint8clampedarray.md)) => number | 是 | - | - | 一个最多接受三个参数的函数。map方法对数组中的每个元素调用callbackfn函数。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Uint8ClampedArray | 新的类型化数组 | 


::: preview 

>UTS
```uts
    let numbers = new Uint8ClampedArray([1, 4, 9]);
    let doubles = numbers.map((value : number, _ : number, _a : Uint8ClampedArray) : number => value * 2);
    console.log(numbers.toString()); // "1,4,9"
    console.log(doubles.toString()); // "2,8,18"
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


<!-- UTSJSON.Uint8ClampedArray.map.tutorial -->

### reduce(callbackfn)

对数组的每个元素执行指定的累加操作。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackfn | (previousValue: number, currentValue: number, currentIndex: number, array: [Uint8ClampedArray](/uts/buildin-object-api/uint8clampedarray.md)) => number | 是 | - | - | 一个最多接受四个参数的函数。reduce方法对数组中的每个元素调用callbackfn函数。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 由归约返回的结果。 | 


::: preview 

>UTS
```uts
    let total_t1 = new Uint8ClampedArray([0, 1, 2, 3]);
    let res1 = total_t1.reduce((accumulator : number, currentValue : number, _ : number, _a : Uint8ClampedArray) : number =>
      accumulator + currentValue);
    console.log(res1); // 6

    let total_t2 = new Uint8ClampedArray([0, 1, 2, 3]);
    let res2 = total_t2.reduce((accumulator : number, currentValue : number, _ : number, _a : Uint8ClampedArray) : number =>
      accumulator + currentValue, 8);
    console.log(res2); // 14

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


<!-- UTSJSON.Uint8ClampedArray.reduce.tutorial -->

### reduceRight(callbackfn)

对数组的每个元素执行指定的累加操作，从右向左处理。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackfn | (previousValue: number, currentValue: number, currentIndex: number, array: [Uint8ClampedArray](/uts/buildin-object-api/uint8clampedarray.md)) => number | 是 | - | - | 一个最多接受四个参数的函数。reduceRight方法从数组的最后一个元素向第一个元素逐个调用callbackfn函数。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 由归约返回的结果。 | 


::: preview 

>UTS
```uts
    let total_t1 = new Uint8ClampedArray([0, 1, 2, 3]);
    let res1 = total_t1.reduceRight((accumulator : number, currentValue : number, _ : number, _a : Uint8ClampedArray) : number =>
      accumulator + currentValue);
    console.log(res1); // 6

    let total_t2 = new Uint8ClampedArray([0, 1, 2, 3]);
    let res2 = total_t2.reduceRight((accumulator : number, currentValue : number, _ : number, _a : Uint8ClampedArray) : number =>
      accumulator + currentValue, 8);
    console.log(res2); // 14

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


<!-- UTSJSON.Uint8ClampedArray.reduceRight.tutorial -->

### reverse()

反转数组中的元素。



**返回值**
| 类型 | 描述 |
| :- | :- |
| Uint8ClampedArray | 翻转的数组。 | 


::: preview 

>UTS
```uts
    let uint8Clamped = new Uint8ClampedArray([1, 2, 3]);
    uint8Clamped.reverse();
    console.log(uint8Clamped.toString()); // "3,2,1"
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


<!-- UTSJSON.Uint8ClampedArray.reverse.tutorial -->

### set(array, offset?)

设置一个值或数组的值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| array | [ArrayLike\<number>](#arraylike-values) | 是 | - | - | 要设置的值或数组。 |
| offset | number | 否 | - | - | 要写入值的当前数组中的索引。 | 


**返回值**
| 类型 |
| :- |
| void | 


::: preview 

>UTS
```uts
    let uint8Clamped = new Uint8ClampedArray(8);
    var array = [1, 2, 3];
    uint8Clamped.set(array, 1);
    console.log(uint8Clamped.toString()); // "0,1,2,3,0,0,0,0"
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


<!-- UTSJSON.Uint8ClampedArray.set.tutorial -->

### slice(start?, end?)

返回数组的一部分。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| start | number | 否 | - | - | 指定部分的起始索引。 |
| end | number | 否 | - | - | 指定部分的结束索引。不包括索引'end'处的元素。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Uint8ClampedArray | 包含取出元素的新 typed array。 | 


::: preview 

>UTS
```uts
    let uint8Clamped_t1 = new Uint8ClampedArray([1, 2, 3]);
    let res1 = uint8Clamped_t1.slice(1);
    console.log(res1.toString()); // "2,3"

    let res2 = uint8Clamped_t1.slice(2);
    console.log(res2.toString()); // "3"

    let res3 = uint8Clamped_t1.slice(-2);
    console.log(res3.toString()); // "2,3"

    let res4 = uint8Clamped_t1.slice(0, 1);
    console.log(res4.toString()); // "1"
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


<!-- UTSJSON.Uint8ClampedArray.slice.tutorial -->

### some(predicate)

确定数组的任何元素是否满足指定的测试。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| predicate | (value: number, index: number, array: [Uint8ClampedArray](/uts/buildin-object-api/uint8clampedarray.md)) => boolean | 是 | - | - | 一个最多接受三个参数的函数。some方法对数组中的每个元素调用predicate函数，直到predicate返回一个可转换为布尔值true的值，或者直到数组结束。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | true 如果 callback 函数以任一数组元素为参数调用时，返回 true; 否则，false. | 


<!-- UTSJSON.Uint8ClampedArray.Constructor.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Uint8ClampedArray.some.tutorial -->

### sort(compareFn?)

对数组进行排序。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| compareFn | (a: number, b: number) => number | 否 | - | - | 用于确定元素顺序的函数。如果省略，则元素按升序排序。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| this | 排序后的类型化数组。 | 


::: preview 

>UTS
```uts
    let uint8Clamped_t1 = new Uint8ClampedArray([40, 1, 5]);
    uint8Clamped_t1.sort();
    let res1 = uint8Clamped_t1.toString();
    console.log(res1); // "1,5,40"

    uint8Clamped_t1.sort((a, b) : number => a - b);
    let res2 = uint8Clamped_t1.toString();
    console.log(res2); // "1,5,40"
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


<!-- UTSJSON.Uint8ClampedArray.sort.tutorial -->

### subarray(begin?, end?)

获取此数组的ArrayBuffer存储的新的Uint8ClampedArray视图，引用从begin（包括）到end（不包括）的元素。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| begin | number | 否 | - | - | 开始数组的索引。 |
| end | number | 否 | - | - | 结束数组的索引。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Uint8ClampedArray | 一个新的 TypedArray 对象。 | 


::: preview 

>UTS
```uts
    let buffer = new ArrayBuffer(16);
    let uint8Clamped_t1 = new Uint8ClampedArray(buffer);
    uint8Clamped_t1.set([1, 2, 3]);
    let res1 = uint8Clamped_t1.toString();
    console.log(res1); // "1,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0"

    let sub = uint8Clamped_t1.subarray(0, 4);
    let res2 = sub.toString();
    console.log(res2); // "1,2,3,0"
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


<!-- UTSJSON.Uint8ClampedArray.subarray.tutorial -->

### toString()

返回数组的字符串表示形式。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 一个字符串，表示类型数组 (typed array) 的元素。 | 


<!-- UTSJSON.Uint8ClampedArray.toString.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Uint8ClampedArray.toString.tutorial -->

### values()

返回数组中的值列表



**返回值**
| 类型 | 描述 |
| :- | :- |
| IterableIterator\<number> | 数组值的迭代器 | 


::: preview 

>UTS
```uts
    let arr = new Uint8ClampedArray([1, 2, 3]);
    let values = arr.values();
    let value = values.next().value
    console.log(value); // 1
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


<!-- UTSJSON.Uint8ClampedArray.values.tutorial -->

### entries()

为数组中的每个条目返回一个键值对数组



**返回值**
| 类型 | 描述 |
| :- | :- |
| IterableIterator\<\[number, number] | 数组条目的键值对迭代器 | 


::: preview 

>UTS
```uts
    let arr = new Uint8ClampedArray([10, 20, 30, 40, 50]);
    let entries = arr.entries();
    let entry = entries.next().value;
    // #ifndef APP-IOS
    console.log(entry[1]); // 10
    // #endif
    // #ifdef APP-IOS
    console.log(entry![1]); // 10
    // #endif
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


<!-- UTSJSON.Uint8ClampedArray.entries.tutorial -->

### keys()

返回数组中的键列表



**返回值**
| 类型 | 描述 |
| :- | :- |
| IterableIterator\<number> | 数组键的迭代器 | 


::: preview 

>UTS
```uts
    let arr = new Uint8ClampedArray([10, 20, 30, 40, 50]);
    let keys = arr.keys();
    let value = keys.next().value
    console.log(value); // 0
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


<!-- UTSJSON.Uint8ClampedArray.keys.tutorial -->
