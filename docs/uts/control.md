## 条件

### If 语句@if

当一个逻辑条件为真，用 if 语句执行一个语句。当这个条件为假，使用可选择的 else 从句来执行这个语句。if 语句如下所示：

```ts
if (condition_1) {
    // statement_1;
} else if (condition_2) {
    // statement_2;
} else if (condition_n_1) {
    // statement_n;
} else {
    // statement_last;
}
```

> 注意：if 和 else if 中的条件表达式必须为布尔值

### switch 语句@switch

switch 语句允许一个程序求一个表达式的值并且尝试去匹配表达式的值到一个 case 标签。如果匹配成功，这个程序执行相关的语句。switch 语句如下所示：

```ts
switch (expression) {
   case label_1:
      // statements_1
      break;
   case label_2:
      // statements_2
      break;
   default:
      // statements_def
      break;
}
```

程序首先查找一个与 expression 匹配的 case 语句，然后将控制权转移到该子句，执行相关的语句。如果没有匹配值， 程序会去找 default 语句，如果找到了，控制权转移到该子句，执行相关的语句。如果没有找到 default，程序会继续执行 switch 语句后面的语句。default 语句通常出现在 switch 语句里的最后面，当然这不是必须的。

可选的 break 语句与每个 case 语句相关联， 保证在匹配的语句被执行后程序可以跳出 switch 并且继续执行 switch 后面的语句。如果 break 被忽略，则程序将继续执行 switch 语句中的下一条语句。

### 三元表达式@ternary

uts 支持使用三元表达式（也称三目运算）。它使用一行简短的语句，替代多行的if、else语句。

三元表达式由 condition ? 真返回值 : 假返回值 ，这3部分组成。

第一部分是condition验证条件，返回一个布尔值。与 if 括号里的内容一样。

问号（?）后面是2个候选返回结果，2个候选用冒号（:）分割，形如 A : B。

如果验证条件为 true ，则问号后面的第一个表达式 A 将会执行；如果条件为 false ，则冒号后面的表达式 B 将会执行。

三元表达式最终会返回 A 或 B 中的某一个。

```ts
// 使用if的写法，要写多行
let score = 61
let res : string
if (score >= 60) {
	res = "及格"
}
else {
	res = "不及格"
}

// 使用三元运算符，逻辑与上面的if相同，但简化了代码行数
let score = 61
let res = (score>=60) ? "及格" : "不及格"

```

其他例子：

```ts
function getFee(isMember: boolean): string {
    return isMember ? "$2.00" : "$10.00";
}

console.log(getFee(true));
// expected output: "$2.00"

console.log(getFee(false));
// expected output: "$10.00"

console.log(getFee(null));
// expected output: "$10.00"
```

三元操作符是右结合的，也就是说你可以像这样把它链接起来， 和 if … else if … else if … else 链类似:

```ts
function example(): string {
    return condition1
        ? value1
        : condition2
        ? value2
        : condition3
        ? value3
        : value4;
}

// Equivalent to:

function example(): string {
    if (condition1) {
        return value1;
    } else if (condition2) {
        return value2;
    } else if (condition3) {
        return value3;
    } else {
        return value4;
    }
}
```

## 循环

### for

一个 for 循环会一直重复执行，直到指定的循环条件为 false。 一个 for 语句是这个样子的：

```ts
for ([initialExpression]; [condition]; [incrementExpression]) {
    statement;
}
```

当一个 for 循环执行的时候，会发生以下过程：

1. 如果有初始化表达式 initialExpression，它将被执行。这个表达式通常会初始化一个或多个循环计数器。
2. 计算 condition 表达式的值。如果 condition 的值是 true，循环中的语句会被执行。如果 condition 的值是 false，for 循环终止。如果 condition 表达式整个都被省略掉了，3. condition 的值会被认为是 true。
3. 循环中的 statement 被执行。如果需要执行多条语句，可以使用块（{ ... }）来包裹这些语句。
4. 如果有更新表达式 incrementExpression，执行更新表达式。
5. 回到步骤 2。

举例：

```ts
for (let i = 0; i < 10; i++) {
    //...
}
```

部分对象，还支持forEach方法，可以更简单的遍历。详见：
- [数组的forEach](buildin-object-api/array.md#foreach)
- [set的forEach](buildin-object-api/set.md#foreach)

- 注意：数组遍历不推荐使用 for in 语句，因为在 ts 中 for in 遍历的是数组的下标，而在 Swift 和 Kottlin 中遍历的是数组的元素，存在行为不一致。

### for of

for...of 语句执行一个循环，该循环处理来自可迭代对象的值序列。可迭代对象包括内置对象的实例，例如 Array、String、Map、Set，还包括用户定义的[可迭代对象](iterable.md)

```ts
for (variable of iterable)
  statement
```

for...of 循环按顺序逐个处理从可迭代对象获取的值。循环对值的每次操作被称为一次迭代，而循环本身被称为迭代可迭代对象。每次迭代都会执行可能引用当前序列值的语句。

在 `HBuilderX 4.41` 之后，for..of `全端的执行效果与 web 标准一致`，下面列出具体的内置对象的支持情况：

#### Set / Array

类似Set/Array 这样的一维数据容器，会遍历内部属性值

```typescript
let u1 = new Set<any>()
u1.add("111")
u1.add("222")
for (item of u1) {
	console.log("item",item)
}
```

执行结果

```typescript
> item 111
> item 222
```

#### Map

Map 的遍历会将其key,value 封装为一个新的Array 数组

```typescript
let u1 = new Map<string,any>()
u1.put("aaa","111")
u1.put("bbb","222")
for (item of u1) {
	console.log("item",item)
}
```

执行结果

```typescript
> ‍[Array]‍ [ "aaa", "111" ]
> [Array]‍ [ "bbb", "222" ]
```

#### string

会遍历string 的每一个字符

```typescript
let a = "123456"
for(item of a ){
  console.log(item)
}
```

执行结果

```typescript
> "1"
> "2"
> "3"
> "4"
> "5"
> "6"
```


#### number / Date / RegExp / Error / UTSJSONObject / 自定义的type类型 / 自定义class

不支持，编译报错

```typescript
For-loop range must have an 'iterator()' method‌
```

需要特别说明的是一般情况下  自定义的type类型 / 自定义class  如果直接使用 for of 会运行报错，但有些场景我们需要赋予自定义class 循环访问自身的能力，甚至要定制迭代访问的内容，实现方式[详见](iterable.md).


### for in

UTS 语言目前并没有对 for..in 进行特殊处理，所以开发者在 UTS 中使用 for..in 语法时，会触发各个平台具体内置规则。可以运行，但执行效果与 web 存在一定的差异。
为了保持与 web 行为的一致性，针对 Array/Set/Map 等集合类型以及 String 的遍历建议使用 for...of， 不建议使用 for...in。

下面我们列出了UTS内置对象对for..in的支持情况

|类型			|Web	|Android	|ios		|
|:--			|:--	|:--		|:--		|
|Array			|返回索引|返回数值	|返回数值	|
|Set			|不可枚举|返回数值	|返回数值	|
|Map			|不可枚举|返回键值对	|返回键值对	|
|String			|返回索引|返回字符	|返回字符	|
|自定义type		|返回属性名|返回属性名|返回属性名	|
|UTSJSONObject	|返回属性名|返回属性名|返回属性名	|


### while

一个 while 语句只要指定的条件求值为真（true）就会一直执行它的语句块。一个 while 语句看起来像这样：

```ts
while (condition) {
    statement;
}
```

如果这个条件变为假，循环里的 statement 将会停止执行并把控制权交回给 while 语句后面的代码。

条件检测会在每次 statement 执行之前发生。如果条件返回为真， statement 会被执行并紧接着再次测试条件。如果条件返回为假，执行将停止并把控制权交回给 while 后面的语句。

要执行多条语句（语句块），要使用语句块 ({ ... }) 包括起来。

举例：

```ts
let n = 0;
let x = 0;
while (n < 3) {
    n++;
    x += n;
}
```

### do...while

do...while 语句一直重复直到指定的条件求值得到假值（false）。 一个 do...while 语句看起来像这样：

```ts
do {
    statement;
} while (condition);
```

statement 在检查条件之前会执行一次。要执行多条语句（语句块），要使用块语句（{ ... }）包括起来。 如果 condition 为真（true），statement 将再次执行。 在每个执行的结尾会进行条件的检查。当 condition 为假（false），执行会停止并且把控制权交回给 do...while 后面的语句。

举例：

```ts
let i = 0;
do {
    i += 1;
} while (i < 10);
```

### break

使用 break 语句来终止循环。在for、do、while等各种循环中，以及在switch中，都可以使用break跳出循环或switch的选择。

举例：

```ts
for (let i = 0; i < 10; i++) {
    if (i > 5) {
        console.log(i)
        break;
        // 如果这里有代码的话，也不会执行，因为break执行时已经跳出了for循环。
    }
}
// break后，跳出for循环，开始向下执行这里的代码。

// 输出 6

// 下面的示例和上面是类似的。
let x = 0;
while (true) {
    x++;
    if (x > 5) {
        break;
    }
}
```

### continue

使用 continue 语句来终止当前循环，但与 break 不同， continue 只是终止了这次循环，还会在下一次迭代时继续执行循环。continue 可以在for、do、while等各种循环中使用。

举例：

```ts
for (let i = 0; i < 10; i++) {
    if (i > 5) {
        console.log(i)
        continue; // continue 后，本次循环结束，i+1后开始下一次循环。
        // 这里的代码不会被执行，因为上一行 continue 了
    }
}
// 输出 6、7、8、9

// 下面的示例和上面是类似的。
let x = 0;
while (true) {
    x++;
    if (x > 5) {
        continue;
    }
}
```

## 异常

你可以用 throw 语句抛出一个异常并且用 try...catch 语句捕获处理它。

使用 throw 表达式来抛出异常：

```ts
throw new Error("Hi There!");
```

使用 try……catch 表达式来捕获异常：

```ts

try {
    // 一些代码
} catch (e: Error) {
    // 处理程序
} finally {
    // 可选的 finally 块
}

```

- 注意：在 iOS 平台由于 Swift 的特殊语法，无法直接使用 try...catch, 在 iOS 平台上使用 try 的语法[详见](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-ios.html#try)
