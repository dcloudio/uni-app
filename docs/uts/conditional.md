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

#### app-android / app-ios 平台说明

在 `app-android` 和 `app-ios` 平台，UTS 最终会编译为 Kotlin / Swift，原生条件判断只接受 `boolean`。  
也就是说，从语言规则上说，`if`、`while`、`do...while`、`for` 的条件部分，以及三元表达式的 `condition`，都应该是布尔表达式。

HBuilderX 5.07+开始, 为了降低从 js / ts 迁移到 UTS 的成本，编译器目前对一部分常见的“truthy / falsy”写法做了优化：当表达式可以被安全地改写为布尔判断时，会在编译阶段自动补全显式判断。因此下面这些写法在 `app-android` / `app-ios` 平台也可以正常编译：

```ts
const str: string = 'hello'
const num: number = 0

if (str) {
  console.log('str is truthy')
}

while (num) {
  break
}

const result = str ? 'true' : 'false'

if (!num) {
  console.log('num is falsy')
}
```

当前已优化的常见场景包括：

- 基础类型参与条件判断：`string`、`number`、对象类型
- 条件位置：`if` / `while` / `do...while` / `for` / 三元表达式 / `!expr`
- 函数返回值参与条件判断
- `any`、非纯布尔联合类型、泛型、`void`、交叉类型
- 可选属性判断，如 `if (obj.msg) {}`
- 算术、位运算、赋值表达式结果作为条件
- 条件中的逻辑运算，如 `if (str && num) {}`、`if (a || b) {}`
- 简单表达式场景下的 `&&` / `||` / `&&=` / `||=` 链式写法

例如：

```ts
type Msg = {
  text?: string
}

const msg: Msg = {}
if (msg.text) {
  console.log(msg.text.length)
}

const a = ''
const b = 'hello'
const c = a || b

let count = 0
count ||= 1
```

但如果表达式本身已经是 `boolean`，或者属于无法安全复用的复杂表达式，编译器不会额外改写，开发者仍应显式写出布尔判断。典型场景包括：

- 本身就是 `boolean` 或纯布尔联合类型
- `&&` / `||` / `&&=` / `||=` 的左侧包含函数调用、成员链、下标访问等复杂表达式
- 链式逻辑表达式中包含函数调用等不可安全复用的复杂操作数

例如，下面这种写法为了避免重复求值，编译器会保持原样，不会自动展开：

```ts
function getNumber(): number {
  return 10
}

const value = getNumber() || 0
```

因此在编写全端兼容代码时，仍然推荐优先使用显式布尔表达式，这样可读性更好，平台行为也更清晰：

```ts
if (str.length > 0) {
}

if (obj != null) {
}

const value = arr != null ? arr : []
```


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

其中 condition 表达式必须为布尔值。

在 `app-android` / `app-ios` 平台，三元表达式的 `condition` 与 `if` 条件遵循相同规则：底层只接受布尔值；对于可安全转换的常见 truthy / falsy 写法，编译器会自动做优化；遇到复杂表达式时，仍建议手动写成显式布尔判断。

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

