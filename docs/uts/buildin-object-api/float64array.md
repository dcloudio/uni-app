# Float64Array

### new(length : number) : Float64Array;@Constructor(length)

初始化一个对象

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| length | number | 是 | - | - | 当使用非对象调用时，该参数将被视为指定类型化数组长度的数字。在内存中创建一个内部数组缓冲区，大小长度乘以 BYTES_PER_ELEMENT 字节，用 0 填充。省略所有参数，等同于使用 0 作为参数。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Float64Array | 实例对象 | 


<!-- UTSJSON.Float64Array.Constructor.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Float64Array.Constructor.tutorial -->

### new(array : ArrayLike\<number> \| ArrayBufferLike) : Float64Array;@Constructor(array)

初始化一个对象

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| array | ArrayLike\<number> \| ArrayBufferLike | 是 | - | - | 当使用 TypedArray 子类的实例调用时，typedArray 会被拷贝到一个新的类型数组中。对于非 bigint TypeedArray 构造函数，typedArray 参数仅可以是非 bigint 类型（例如 Int32Array）。同样，对于 bigint TypedArray 构造函数（BigInt64Array 或 BigUint64Array），typedArray 参数仅可以是 bigint 类型。typedArray 中的每个值在拷贝到新数组之前都转换为构造函数的相应类型。新的类型化数组的长度与 typedArray 参数的长度相同。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Float64Array | 实例对象 | 


<!-- UTSJSON.Float64Array.Constructor_1.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Float64Array.Constructor_1.tutorial -->

### new(buffer : ArrayBufferLike, byteOffset ?: number, length ?: number) : Float64Array;@Constructor(buffer, byteOffset?, length?)

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
| Float64Array | 实例对象 | 


<!-- UTSJSON.Float64Array.Constructor_2.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Float64Array.Constructor_2.tutorial -->

## 静态属性

### BYTES_PER_ELEMENT

数组中每个元素的字节大小。





<!-- UTSJSON.Float64Array.BYTES_PER_ELEMENT.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Float64Array.BYTES_PER_ELEMENT.tutorial -->

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
| Float64Array | 


::: preview 

>UTS
```uts
    var float64Array = Float64Array.of(1, 2, 3)
    console.log(float64Array.toString()); // '1,2,3'
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


<!-- UTSJSON.Float64Array.of.tutorial -->

### from(arrayLike, mapFn?)

从类似数组或可迭代对象创建数组。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arrayLike | [ArrayLike\<number>](#arraylike-values) | 是 | - | - | 要转换为数组的类似数组或可迭代对象。 |
| mapfn | (v: number, k: number) => number | 否 | - | - | 可选参数。如果指定了该参数，则最后生成的类型数组会经过该函数的加工处理后再返回。 | 


**返回值**
| 类型 |
| :- |
| Float64Array | 


::: preview 

>UTS
```uts
    var float64Array = Float64Array.from([1, 2, 3], (v : number, _ : number) : number => v + v);
    console.log(float64Array.toString()); // '2,4,6'
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


<!-- UTSJSON.Float64Array.from.tutorial -->

## 实例属性

### BYTES_PER_ELEMENT

数组中每个元素的字节大小。





<!-- UTSJSON.Float64Array.BYTES_PER_ELEMENT.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.11 | 4.61 | 4.25 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 4.51 | √ |


<!-- UTSJSON.Float64Array.BYTES_PER_ELEMENT.tutorial -->

### buffer

<!-- UTSJSON.Float64Array.buffer.description -->

<!-- UTSJSON.Float64Array.buffer.param -->

<!-- UTSJSON.Float64Array.buffer.returnValue -->

<!-- UTSJSON.Float64Array.buffer.test -->

<!-- UTSJSON.Float64Array.buffer.compatibility -->

<!-- UTSJSON.Float64Array.buffer.tutorial -->

### byteLength

<!-- UTSJSON.Float64Array.byteLength.description -->

<!-- UTSJSON.Float64Array.byteLength.param -->

<!-- UTSJSON.Float64Array.byteLength.returnValue -->

<!-- UTSJSON.Float64Array.byteLength.test -->

<!-- UTSJSON.Float64Array.byteLength.compatibility -->

<!-- UTSJSON.Float64Array.byteLength.tutorial -->

### byteOffset

<!-- UTSJSON.Float64Array.byteOffset.description -->

<!-- UTSJSON.Float64Array.byteOffset.param -->

<!-- UTSJSON.Float64Array.byteOffset.returnValue -->

<!-- UTSJSON.Float64Array.byteOffset.test -->

<!-- UTSJSON.Float64Array.byteOffset.compatibility -->

<!-- UTSJSON.Float64Array.byteOffset.tutorial -->

### length

<!-- UTSJSON.Float64Array.length.description -->

<!-- UTSJSON.Float64Array.length.param -->

<!-- UTSJSON.Float64Array.length.returnValue -->

<!-- UTSJSON.Float64Array.length.test -->

<!-- UTSJSON.Float64Array.length.compatibility -->

<!-- UTSJSON.Float64Array.length.tutorial -->

## 实例方法

### copyWithin(target, start, end?)

<!-- UTSJSON.Float64Array.copyWithin.description -->

<!-- UTSJSON.Float64Array.copyWithin.param -->

<!-- UTSJSON.Float64Array.copyWithin.returnValue -->

::: preview 

>UTS
```uts
    let float64 = new Float64Array(8);
    float64.set([1, 2, 3], 1);
    float64.copyWithin(3, 0, 3);
    console.log(float64.toString()); // 0,1,2,0,1,2,0,0
```

:::

<!-- UTSJSON.Float64Array.copyWithin.compatibility -->

<!-- UTSJSON.Float64Array.copyWithin.tutorial -->

### every(predicate)

<!-- UTSJSON.Float64Array.every.description -->

<!-- UTSJSON.Float64Array.every.param -->

<!-- UTSJSON.Float64Array.every.returnValue -->

::: preview 

>UTS
```uts
    let result = new Float64Array([-10, -20, -30, -40, -50]).every((value : number, _ : number, _a : Float64Array) : boolean => value < 0);
    console.log(result); // true
```

:::

<!-- UTSJSON.Float64Array.every.compatibility -->

<!-- UTSJSON.Float64Array.every.tutorial -->

### fill(value, start?, end?)

<!-- UTSJSON.Float64Array.fill.description -->

<!-- UTSJSON.Float64Array.fill.param -->

<!-- UTSJSON.Float64Array.fill.returnValue -->

::: preview 

>UTS
```uts
    let float64_t1 = new Float64Array([1, 2, 3]).fill(4);
    console.log(float64_t1.toString()); // 4,4,4   

    let float64_t2 = new Float64Array([1, 2, 3]).fill(4, 1);
    console.log(float64_t2.toString()); // 1,4,4   

    let float64_t3 = new Float64Array([1, 2, 3]).fill(4, 1, 2);
    console.log(float64_t3.toString()); // 1,4,3    

    let float64_t4 = new Float64Array([1, 2, 3]).fill(4, 1, 1);
    console.log(float64_t4.toString()); // 1,2,3    

    let float64_t5 = new Float64Array([1, 2, 3]).fill(4, -3, -2);
    console.log(float64_t5.toString()); // 4,2,3
```

:::

<!-- UTSJSON.Float64Array.fill.compatibility -->

<!-- UTSJSON.Float64Array.fill.tutorial -->

### filter(predicate)

<!-- UTSJSON.Float64Array.filter.description -->

<!-- UTSJSON.Float64Array.filter.param -->

<!-- UTSJSON.Float64Array.filter.returnValue -->

::: preview 

>UTS
```uts
    let float64 = new Float64Array([12, 5, 8, 44]).filter((value : number, _ : number, _a : Float64Array) : boolean => value >= 10);
    console.log(float64.toString()); // 12,44
```

:::

<!-- UTSJSON.Float64Array.filter.compatibility -->

<!-- UTSJSON.Float64Array.filter.tutorial -->

### find(predicate)

<!-- UTSJSON.Float64Array.find.description -->

<!-- UTSJSON.Float64Array.find.param -->

<!-- UTSJSON.Float64Array.find.returnValue -->

::: preview 

>UTS
```uts
    let float64 = new Float64Array([4, 5, 8, 12]);
    let res = float64.find((value : number, _ : number, _a : Float64Array) : boolean => value > 5);
    console.log(res); // 8
```

:::

<!-- UTSJSON.Float64Array.find.compatibility -->

<!-- UTSJSON.Float64Array.find.tutorial -->

### findIndex(predicate)

<!-- UTSJSON.Float64Array.findIndex.description -->

<!-- UTSJSON.Float64Array.findIndex.param -->

<!-- UTSJSON.Float64Array.findIndex.returnValue -->

::: preview 

>UTS
```uts
    let float64 = new Float64Array([4, 6, 8, 12]);
    let res = float64.findIndex((value : number, _ : number, _a : Float64Array) : boolean => value > 100);
    console.log(res); // -1

    let ufloat64 = new Float64Array([4, 6, 7, 120]);
    res = ufloat64.findIndex((value : number, _ : number, _a : Float64Array) : boolean => value > 100);
    console.log(res); // 3

```

:::

<!-- UTSJSON.Float64Array.findIndex.compatibility -->

<!-- UTSJSON.Float64Array.findIndex.tutorial -->

### forEach(callbackfn)

<!-- UTSJSON.Float64Array.forEach.description -->

<!-- UTSJSON.Float64Array.forEach.param -->

<!-- UTSJSON.Float64Array.forEach.returnValue -->

::: preview 

>UTS
```uts
    new Float64Array([0, 1, 2, 3]).forEach((value : number, index : number, _ : Float64Array) => {
      console.log(`a[${index}] = ${value}`);
    });
```

:::

<!-- UTSJSON.Float64Array.forEach.compatibility -->

<!-- UTSJSON.Float64Array.forEach.tutorial -->

### indexOf(searchElement, fromIndex?)

<!-- UTSJSON.Float64Array.indexOf.description -->

<!-- UTSJSON.Float64Array.indexOf.param -->

<!-- UTSJSON.Float64Array.indexOf.returnValue -->

::: preview 

>UTS
```uts
    let float64 = new Float64Array([2, 5, 9]);
    let res = float64.indexOf(2);
    console.log(res); // 0


    let res1 = float64.indexOf(7);
    console.log(res1); // -1

    let res2 = float64.indexOf(9, 2);
    console.log(res2); // 2


    let res3 = float64.indexOf(2, -1);
    console.log(res3); // -1


    let res4 = float64.indexOf(2, -3);
    console.log(res4); // 0
```

:::

<!-- UTSJSON.Float64Array.indexOf.compatibility -->

<!-- UTSJSON.Float64Array.indexOf.tutorial -->

### join(separator?)

<!-- UTSJSON.Float64Array.join.description -->

<!-- UTSJSON.Float64Array.join.param -->

<!-- UTSJSON.Float64Array.join.returnValue -->

::: preview 

>UTS
```uts
    let float64 = new Float64Array([1, 2, 3]);
    let res = float64.join();
    console.log(res); // 1,2,3


    let res1 = float64.join(" / ");
    console.log(res1); // 1 / 2 / 3


    let res2 = float64.join("");
    console.log(res2); // 123
```

:::

<!-- UTSJSON.Float64Array.join.compatibility -->

<!-- UTSJSON.Float64Array.join.tutorial -->

### map(callbackfn)

<!-- UTSJSON.Float64Array.map.description -->

<!-- UTSJSON.Float64Array.map.param -->

<!-- UTSJSON.Float64Array.map.returnValue -->

::: preview 

>UTS
```uts
    let numbers = new Float64Array([1, 4, 9]);
    let doubles = numbers.map((value : number, _ : number, _a : Float64Array) : number => value * 2);
    console.log(numbers.toString()); // 1,4,9
    console.log(doubles.toString()); // 2,8,18
```

:::

<!-- UTSJSON.Float64Array.map.compatibility -->

<!-- UTSJSON.Float64Array.map.tutorial -->

### reduce(callbackfn)

<!-- UTSJSON.Float64Array.reduce.description -->

<!-- UTSJSON.Float64Array.reduce.param -->

<!-- UTSJSON.Float64Array.reduce.returnValue -->

::: preview 

>UTS
```uts
    let total = new Float64Array([0, 1, 2, 3]);
    let res = total.reduce((accumulator : number, currentValue : number, _ : number, _a : Float64Array) : number => accumulator + currentValue);
    console.log(res); // 6


    total = new Float64Array([0, 1, 2, 3]);
    let res1 = total.reduce((accumulator : number, currentValue : number, _ : number, _a : Float64Array) : number => accumulator + currentValue, 8);
    console.log(res1); // 14
```

:::

<!-- UTSJSON.Float64Array.reduce.compatibility -->

<!-- UTSJSON.Float64Array.reduce.tutorial -->

### reduceRight(callbackfn)

<!-- UTSJSON.Float64Array.reduceRight.description -->

<!-- UTSJSON.Float64Array.reduceRight.param -->

<!-- UTSJSON.Float64Array.reduceRight.returnValue -->

::: preview 

>UTS
```uts
    let total = new Float64Array([0, 1, 2, 3]);
    let res = total.reduceRight((accumulator : number, currentValue : number, _ : number, _a : Float64Array) : number => accumulator + currentValue);
    console.log(res); // 6


    total = new Float64Array([0, 1, 2, 3]);
    let res1 = total.reduceRight((accumulator : number, currentValue : number, _ : number, _a : Float64Array) : number => accumulator + currentValue, 8);
    console.log(res1); // 14
```

:::

<!-- UTSJSON.Float64Array.reduceRight.compatibility -->

<!-- UTSJSON.Float64Array.reduceRight.tutorial -->

### reverse()

<!-- UTSJSON.Float64Array.reverse.description -->

<!-- UTSJSON.Float64Array.reverse.param -->

<!-- UTSJSON.Float64Array.reverse.returnValue -->

::: preview 

>UTS
```uts
    let float64 = new Float64Array([1, 2, 3]);
    float64.reverse();
    console.log(float64.toString()); // 3,2,1
```

:::

<!-- UTSJSON.Float64Array.reverse.compatibility -->

<!-- UTSJSON.Float64Array.reverse.tutorial -->

### set(array, offset?)

<!-- UTSJSON.Float64Array.set.description -->

<!-- UTSJSON.Float64Array.set.param -->

<!-- UTSJSON.Float64Array.set.returnValue -->

::: preview 

>UTS
```uts
    let float64 = new Float64Array(8);
    var array = [1, 2, 3];
    float64.set(array, 1);
    console.log(float64.toString()); // 0,1,2,3,0,0,0,0
```

:::

<!-- UTSJSON.Float64Array.set.compatibility -->

<!-- UTSJSON.Float64Array.set.tutorial -->

### slice(start?, end?)

<!-- UTSJSON.Float64Array.slice.description -->

<!-- UTSJSON.Float64Array.slice.param -->

<!-- UTSJSON.Float64Array.slice.returnValue -->

::: preview 

>UTS
```uts
    let float64 = new Float64Array([1, 2, 3]);
    let res = float64.slice(1);
    let ret1 = res.toString()
    console.log(ret1); // 2,3


    res = float64.slice(2);
    let ret2 = res.toString()
    console.log(ret2); // 3

    res = float64.slice(-2);
    let ret3 = res.toString()
    console.log(ret3); // 2,3   

    res = float64.slice(0, 1);
    let ret4 = res.toString()
    console.log(ret4); // 1

    const size = 1000;
    const initialFloat64Array = new Float64Array(size);
    for (let i = 0; i < size; ++i) {
      initialFloat64Array[i] = Math.random();
    }

    let arr : Float64Array;
    let new_arr : Float64Array;
    arr = new Float64Array(initialFloat64Array);
    new_arr = arr.slice(1, -1);
    let ret5 = true
    for (let i = 1; i < size - 1; ++i) {
      if (arr[i] !== new_arr[i - 1]) {
        ret5 = false
        break;
      }
    }
    console.log(ret5); //  true;

```

:::

<!-- UTSJSON.Float64Array.slice.compatibility -->

<!-- UTSJSON.Float64Array.slice.tutorial -->

### some(predicate)

<!-- UTSJSON.Float64Array.some.description -->

<!-- UTSJSON.Float64Array.some.param -->

<!-- UTSJSON.Float64Array.some.returnValue -->

::: preview 

>UTS
```uts
    const float64 = new Float64Array([-10, 20, -30, 40, -50]);
    const positives = new Float64Array([10, 20, 30, 40, 50]);

    console.log(float64.some((element : number, index : number, array : Float64Array) : boolean =>
      element < 0
    )); // true

    console.log(positives.some((element : number, index : number, array : Float64Array) : boolean =>
      element < 0
    )); // false
```

:::

<!-- UTSJSON.Float64Array.some.compatibility -->

<!-- UTSJSON.Float64Array.some.tutorial -->

### sort(compareFn?)

<!-- UTSJSON.Float64Array.sort

.description -->

<!-- UTSJSON.Float64Array.sort.param -->

<!-- UTSJSON.Float64Array.sort.returnValue -->

::: preview 

>UTS
```uts
    let numbers = new Float64Array([40, 1, 5]);
    numbers.sort();
    let ret = numbers.toString()
    console.log(ret); // 1,5,40

    numbers.sort((a, b) : number => a - b);
    console.log(numbers.toString()); // 1,5,40
```

:::

<!-- UTSJSON.Float64Array.sort.compatibility -->

<!-- UTSJSON.Float64Array.sort.tutorial -->

### subarray(begin?, end?)

<!-- UTSJSON.Float64Array.subarray.description -->

<!-- UTSJSON.Float64Array.subarray.param -->

<!-- UTSJSON.Float64Array.subarray.returnValue -->

::: preview 

>UTS
```uts
    let buffer = new ArrayBuffer(32);
    let float64 = new Float64Array(buffer);
    float64.set([1, 2, 3]);
    console.log(float64.toString()); // 1,2,3,0

    let sub = float64.subarray(0, 4);
    console.log(sub.toString()); // 1,2,3,0

    const size = 1000;
    const initialFloat64Array = new Float64Array(size);
    for (let i = 0; i < size; ++i) {
      initialFloat64Array[i] = Math.random();
    }
    let arr = new Float64Array(initialFloat64Array);
    let new_arr = arr.subarray(1, size - 1);
    let ret = true
    for (let i = 1; i < size - 1; ++i) {
      if (arr[i] !== new_arr[i - 1]) {
        ret = false
        break
      }
    }
```

:::

<!-- UTSJSON.Float64Array.subarray.compatibility -->

<!-- UTSJSON.Float64Array.subarray.tutorial -->

### toString()

<!-- UTSJSON.Float64Array.toString.description -->

<!-- UTSJSON.Float64Array.toString.param -->

<!-- UTSJSON.Float64Array.toString.returnValue -->

<!-- UTSJSON.Float64Array.toString.test -->

<!-- UTSJSON.Float64Array.toString.compatibility -->

<!-- UTSJSON.Float64Array.toString.tutorial -->

### values()

<!-- UTSJSON.Float64Array.values.description -->

<!-- UTSJSON.Float64Array.values.param -->

<!-- UTSJSON.Float64Array.values.returnValue -->

::: preview 

>UTS
```uts
    let arr = new Float64Array([1, 2, 3]);
    let values = arr.values();
    let value = values.next().value
    console.log(value); // 1
    console.log(values.next().value); // 2
    console.log(values.next().value); // 3
```

:::

<!-- UTSJSON.Float64Array.values.compatibility -->

<!-- UTSJSON.Float64Array.values.tutorial -->

### entries()

<!-- UTSJSON.Float64Array.entries.description -->

<!-- UTSJSON.Float64Array.entries.param -->

<!-- UTSJSON.Float64Array.entries.returnValue -->

::: preview 

>UTS
```uts
    let arr = new Float64Array([10, 20, 30, 40, 50]);
    let entries = arr.entries();
    
    // #ifndef APP-IOS
    let value1 = entries.next().value[1] // 10
    let value2 = entries.next().value[1] // 20
    console.log(value1) // 10;
    console.log(value2) // 20;
    // #endif
    // #ifdef APP-IOS
    let value1 = entries.next().value![1] //10
    let value2 = entries.next().value![1] //20
    console.log(value1) // 10;
    console.log(value2) // 20;
    // #endif
    
    // #ifndef APP-IOS
    console.log(entries.next().value[1]) // 30;
    console.log(entries.next().value[1]) // 40;
    // #endif
    // #ifdef APP-IOS
    console.log(entries.next().value![1]) // 30;
    console.log(entries.next().value![1]) // 40;
    // #endif
```

:::

<!-- UTSJSON.Float64Array.entries.compatibility -->

<!-- UTSJSON.Float64Array.entries.tutorial -->

### keys()

<!-- UTSJSON.Float64Array.keys.description -->

<!-- UTSJSON.Float64Array.keys.param -->

<!-- UTSJSON.Float64Array.keys.returnValue -->

::: preview 

>UTS
```uts
    let arr = new Float64Array([10, 20, 30, 40, 50]);
    let keys = arr.keys();
    let value = keys.next().value
    console.log(value); // 0
    console.log(keys.next().value); // 1
    console.log(keys.next().value); // 2
    console.log(keys.next().value); // 3
    console.log(keys.next().value); // 4
```

:::

<!-- UTSJSON.Float64Array.keys.compatibility -->

<!-- UTSJSON.Float64Array.keys.tutorial -->
