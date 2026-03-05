# Math

Math 是一个内置对象，它拥有一些数学常数属性和数学函数方法。

## 静态属性


### E

Math.E 属性表示自然对数的底数（或称为基数），e，约等于 2.718。





::: preview 

>UTS
```uts
      function getNapier(): number {
        return Math.E
      }
      console.log(getNapier());
      // expected output: 2.718281828459045
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### LN10

Math.LN10 属性表示 10 的自然对数，约为 2.302





::: preview 

>UTS
```uts
      function getNatLog10(): number {
        return Math.LN10;
      }
      console.log(getNatLog10());
      // expected output: 2.302585092994046
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### LN2

Math.LN2 属性表示 2 的自然对数，约为 0.693





::: preview 

>UTS
```uts
      function getNatLog2(): number {
        return Math.LN2;
      }
      console.log(getNatLog2());
      // expected output: 0.6931471805599453
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### LOG2E

Math.LOG2E 属性表示以 2 为底数，e 的对数，约为 1.442





::: preview 

>UTS
```uts
      function getLog2e(): number {
        return Math.LOG2E;
      }
      console.log(getLog2e());
      // expected output: 1.4426950408889634
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### LOG10E

Math.LOG10E 属性表示以 10 为底数，e 的对数，约为 0.434





::: preview 

>UTS
```uts
      function getLog10e(): number {
        return Math.LOG10E;
      }
      console.log(getLog10e());
      // expected output: 0.4342944819032518
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### PI

Math.PI 表示一个圆的周长与直径的比例，约为 3.14159





::: preview 

>UTS
```uts
      function calculateCircumference(radius: number): number {
        return 2 * Math.PI * radius;
      }
      console.log(calculateCircumference(1));
      // expected output: 6.283185307179586
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### SQRT1_2

Math.SQRT1_2 属性表示 1/2 的平方根，约为 0.707





::: preview 

>UTS
```uts
      function getRoot1_2(): number {
        return Math.SQRT1_2;
      }
      console.log(getRoot1_2());
      // expected output: 0.7071067811865476
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### SQRT2

Math.SQRT2 属性表示 2 的平方根，约为 1.414





::: preview 

>UTS
```uts
      function getRoot2(): number {
        return Math.SQRT2;
      }
      console.log(getRoot2());
      // expected output: 1.4142135623730951
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |



## 静态方法


### clz32(x)

Math.clz32() 函数返回一个数字在转换成 32 无符号整形数字的二进制形式后，开头的 0 的个数

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数字。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.clz32(1000));
      // expected output: 22
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### sign(x)

Math.sin() 函数返回一个数值的正弦值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数值（以弧度为单位）。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.sign(3));
      // expected output: 1

      console.log(Math.sign(-3));
      // expected output: -1

      console.log(Math.sign(0));
      // expected output: 0
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### log10(x)

Math.log10() 函数返回一个数字以 10 为底的对数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 任意数字。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.log10(10));
      // expected output: 1

      console.log(Math.log10(100));
      // expected output: 2

      console.log(Math.log10(1));
      // expected output: 0
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### log2(x)

Math.log2() 函数返回一个数字以 2 为底的对数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 任意数字。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.log2(2));
      // expected output: 1.0

      console.log(Math.log2(1024));
      // expected output: 10.0

      console.log(Math.log2(1));
      // expected output: 0.0
      // 解决精度问题
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### log1p(x)

Math.log1p() 函数返回一个数字加 1 后的自然对数 (底为 E), 既log(x+1).

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 任意数字。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.log1p(Math.E - 1));
      // expected output: 1.0

      console.log(Math.log1p(0));
      // expected output: 0.0
      // 解决精度问题
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### expm1(x)

Math.expm1() 函数返回 E^x - 1, 其中 x 是该函数的参数，E 是自然对数的底数 2.718281828459045。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 任意数字。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.expm1(1));
      // expected output: 1.718281828459045

      console.log(Math.expm1(-38));
      // expected output: -1
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### cosh(x)

Math.cosh() 函数返回数值的双曲余弦函数

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 数值。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.cosh(0));
      // expected output: 1.0

      console.log(Math.cosh(1));
      // expected output: 1.5430806348152437

      console.log(Math.cosh(-1));
      // expected output: 1.5430806348152437
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### sinh(x)

Math.sinh() 函数返回一个数字 (单位为角度) 的双曲正弦值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 任意数字 (单位为度). | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.sinh(0));
      // expected output: 0.0

      console.log(Math.sinh(1));
      // expected output: 1.1752011936438014
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### tanh(x)

Math.tanh() 函数将会返回一个数的双曲正切函数值

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 待计算的数字。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.tanh(-1));
      // expected output: -0.7615941559557649

      console.log(Math.tanh(0));
      // expected output: 0.0

      console.log(Math.tanh(1));
      // expected output: 0.7615941559557649
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### acosh(x)

Math.acosh() 函数返回一个数的反双曲余弦值

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数字。 | 


**返回值**
| 类型 |
| :- |
| number | 


<!-- UTSJSON.Math.acosh.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### asinh(x)

Math.asinh() 返回一个数值的反双曲正弦值

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数值。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      // #ifdef APP-ANDROID
      console.log(Math.asinh(NaN));
      // #endif
      // expected output: NaN

      console.log(Math.asinh(1));
      // expected output: 0.881373587019543

      console.log(Math.asinh(0));
      // expected output: 0

      console.log(Math.asinh(-1));
      // expected output: -0.881373587019543

      console.log(Math.asinh(2));
      // expected output: 1.4436354751788103
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### atanh(x)

Math.atanh() 函数返回一个数值反双曲正切值

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数值 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      // #ifdef APP-ANDROID
      console.log(Math.atanh(NaN));
      // #endif
      // expected output: NaN

      console.log(Math.atanh(0));
      // expected output: 0
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### trunc(x)

Math.trunc() 方法会将数字的小数部分去掉，只保留整数部分。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 任意数字 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.trunc(13.37));
      // expected output: 13

      console.log(Math.trunc(42.84));
      // expected output: 42

      console.log(Math.trunc(0.123));
      // expected output: 0
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### fround(x)

Math.fround() 可以将任意的数字转换为离它最近的单精度浮点数形式的数字。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个 Number。若参数为非数字类型，则会被转投成数字。无法转换时，设置成NaN。 | 


::: preview 

>UTS
```uts
      // #ifdef APP-ANDROID
      console.log(Math.fround(NaN));
      // #endif
      // expected output: NaN

      console.log(Math.fround(1.5));
      // expected output: 1.5

      console.log(Math.fround(1.337));
      // expected output: 1.3370000123977661
```

:::

**返回值**
| 类型 |
| :- |
| number | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 3.9 | √ |


### abs(x)

RMath.abs(x) 函数返回一个数字的绝对值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数字 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | x 的绝对值。如果 x 是负数（包括 -0），则返回 -x。否则，返回 x | 


::: preview 

>UTS
```uts
      function difference(a: number, b: number): number {
        return Math.abs(a - b);
      }

      console.log(difference(3, 5));
      // expected output: 2

      console.log(difference(5, 3));
      // expected output: 2

      console.log(difference(1.23456, 7.89012));
      // expected output: 6.6555599999999995
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### acos(x)

Math.acos() 返回一个数的反余弦值（单位为弧度）

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数值. | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.acos(-1));
      // expected output: 3.141592653589793
      // #ifdef APP-ANDROID
      console.log(Math.acos(NaN));
      // #endif
      // expected output: NaN

      console.log(Math.acos(0));
      // expected output: 1.5707963267948966

      console.log(Math.acos(1));
      // expected output: 0
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### asin(x)

Math.asin() 方法返回一个数值的反正弦（单位为弧度）

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数值 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      // #ifdef APP-ANDROID
      console.log(Math.asin(NaN));
      // #endif
      // expected output: NaN

      console.log(Math.asin(-1));
      // expected output: -1.5707963267948966

      console.log(Math.asin(0));
      // expected output: 0

      console.log(Math.asin(0.5));
      // expected output: 0.5235987755982989

      console.log(Math.asin(1));
      // expected output: 1.5707963267948966
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### atan(x)

Math.atan() 函数返回一个数值的反正切（以弧度为单位）

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数值 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      // #ifdef APP-ANDROID
      console.log(Math.atan(NaN));
      // #endif
      // expected output: NaN

      console.log(Math.atan(1));
      // expected output: 0.7853981633974483

      console.log(Math.atan(0));
      // expected output: 0
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### atan2(y, x)

Math.atan2() 返回从原点 (0,0) 到 (x,y) 点的线段与 x 轴正方向之间的平面角度 (弧度值)，也就是 Math.atan2(y,x)

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| y | number | 是 | - | - | 数值 |
| x | number | 是 | - | - | 数值 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.atan2(90, 15));
      // expected output: 1.4056476493802699

      console.log(Math.atan2(15, 90));
      // expected output: 0.16514867741462683
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### ceil(x)

Math.ceil() 函数总是四舍五入并返回大于等于给定数字的最小整数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数值 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.ceil(0.95));
      // expected output: 1
      // #ifdef APP-ANDROID
      console.log(Math.ceil(NaN));
      // #endif
      // expected output: NaN

      console.log(Math.ceil(4));
      // expected output: 4

      console.log(Math.ceil(7.004));
      // expected output: 8

      console.log(Math.ceil(-7.004));
      // expected output: -7

      console.log(Math.ceil(37110233000.223));
      // expected output: 37110233001

      console.log(Math.ceil(-37110233000.223));
      // expected output: -37110233000
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### cos(x)

Math.cos() 函数返回一个数值的余弦值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个以弧度为单位的数值。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.cos(0));
      // expected output: 1.0

      console.log(Math.cos(1));
      // expected output: 0.5403023058681398
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### exp(x)

Math.exp() 函数返回 e^x，x 表示参数，e 是欧拉常数（Euler's constant），自然对数的底数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数值 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.exp(-1));
      // expected output: 0.36787944117144233

      console.log(Math.exp(0));
      // expected output: 1.0

      console.log(Math.exp(1));
      // expected output: 2.718281828459045
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### floor(x)

Math.floor() 函数总是返回小于等于一个给定数字的最大整数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数字。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.floor(5.95));
      // expected output: 5

      console.log(Math.floor(5.05));
      // expected output: 5

      console.log(Math.floor(5));
      // expected output: 5

      console.log(Math.floor(-5.05));
      // expected output: -6

      console.log(Math.floor(37110233000.223));
      // expected output: 37110233000

      console.log(Math.floor(-37110233000.223));
      // expected output: -37110233001
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### log(x)

Math.log() 函数返回一个数的自然对数

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数字。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.log(1));
      // expected output: 0.0

      console.log(Math.log(10));
      // expected output: 2.302585092994046
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### max(...values)

Math.max() 函数返回作为输入参数的最大数字，如果没有参数，则返回 -Infinity

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| values | number[\] | 是 | - | - | 0 个或多个数字，将在其中选择，并返回最大的值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 给定数值中最大的数。如果任一参数不能转换为数值，则返回 NaN。如果没有提供参数，返回 -Infinity。 | 


::: preview 

>UTS
```uts
      console.log(Math.max(1, 3, 2));
      // expected output: 3

      console.log(Math.max(-1, -3, -2));
      // expected output: -1
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### min(...values)

Math.min() 函数返回作为输入参数的数字中最小的一个，如果没有参数，则返回 Infinity。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| values | number[\] | 是 | - | - | 0 个或多个数字，将在其中选择，并返回最小值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 给定数值中最小的数。如果任一参数不能转换为数值，则返回 NaN。如果没有提供参数，返回 Infinity。 | 


::: preview 

>UTS
```uts
      console.log(Math.min(2, 3, 1));
      // expected output: 1

      console.log(Math.min(-2, -3, -1));
      // expected output: -3
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### pow(x, y)

Math.pow() 函数返回基数（base）的指数（exponent）次幂，即 base^exponent。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 基数 |
| y | number | 是 | - | - | 指数 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.pow(7, 3));
      // expected output: 343

      console.log(Math.pow(4, 0.5));
      // expected output: 2
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### random()

Math.random() 函数返回一个浮点数，伪随机数在范围从0 到小于1，也就是说，从 0（包括 0）往上，但是不包括 1（排除 1），然后您可以缩放到所需的范围。实现将初始种子选择到随机数生成算法;它不能被用户选择或重置。



**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 一个浮点型伪随机数字，在0（包括 0）和1（不包括）之间。 | 


::: preview 

>UTS
```uts
      function getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
      }

      console.log(getRandomInt(getRandomInt(1)));
      // expected output: 0
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### round(x)

Math.round() 函数返回一个数字四舍五入后最接近的整数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 给定数字的值四舍五入到最接近的整数。 | 


::: preview 

>UTS
```uts
      console.log(Math.round(0.9)) // 1;
      console.log(Math.round(5.95)) // 6;
      console.log(Math.round(-5.05)) // -5;
      console.log(Math.round(37110233000.223)) // 37110233000;
      console.log(Math.round(-37110233000.223)) // -37110233000;
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### sin(x)

Math.sin() 函数返回一个数值的正弦值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数值（以弧度为单位）。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.sin(0));
      // expected output: 0.0

      console.log(Math.sin(1));
      // expected output: 0.8414709848078965
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### sqrt(x)

Math.sqrt() 函数返回一个数的平方根

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数值 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      function calcHypotenuse(a: number, b: number): number {
        return (Math.sqrt((a * a) + (b * b)));
      }
      console.log(calcHypotenuse(3, 4));
      // expected output: 5.0

      console.log(calcHypotenuse(5, 12));
      // expected output: 13.0

      console.log(calcHypotenuse(0, 0));
      // expected output: 0.0
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### tan(x)

Math.tan() 方法返回一个数值的正切值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | - | 一个数值，表示一个角（单位：弧度）。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      console.log(Math.tan(0));
      // expected output: 0.0

      console.log(Math.tan(1));
      // expected output: 1.5574077246549023
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |



### 参见
[相关 Bug](https://issues.dcloud.net.cn/?mid=uts.buildInObject.Math)

### hypot(...values)

Math.hypot() 函数返回所有参数的平方和的平方根

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| values | number[\] | 是 | - | - | 任意个数字。 | 


**返回值**
| 类型 |
| :- |
| number | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | - | √ |

