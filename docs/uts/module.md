# 模块

uts 支持将程序拆分为可按需导入的单独模块，模块中可以导入和导出各种类型的变量，如函数，字符串，数字，布尔值，类等。

## 导出

export 语句可以将一个文件中的函数，类等导出。比如：

```ts
export const name: string = "square";
export function draw() {}
export default class Canvas {} // default 关键词支持默认导出
```

- 导出的函数声明与类声明必须要有名称。
- export 命令可以出现在模块的任何位置，但必需处于模块顶层。
- 在一个文件中，export、import 可以有多个，export default 仅有一个。
- 通过 export 方式导出，在导入时要加{ }，export default 则不需要。

## 导入

import 语句可以将另一个文件中的函数，类等导入到当前文件。比如：

```ts
import { name as name1, draw } from "./canvas.uts" // 支持 as 语法做别名导入
import * as Utils from "./utils.uts" // Utils 包含所有 export 的导出
import Canvas from "./canvas.uts" // 对应 export default 的导出
```

示例

```ts
/*-----export [test.js]-----*/
export const name = 'test'
export function test(){
    console.log('test')
}
export default class Test{
    test(){
        console.log('Test.test')
    }
}
```

```ts
import { name } from './test.uts'
import * as testModule from './test.uts'
import Test from './test.uts'
console.log(name)
testModule.test()
const test = new Test()
test.test()
```

### 指定别名

使用 `as` 关键字可以为导入的值指定别名

```ts
import { name as testName } from './test.uts'
import * as testModule from './test.uts'
```

## 数据共享和复用

可以使用 export 语句将变量或函数导出，以便其他模块可以访问和使用它们。导出的变量可以在模块内共享，并在其他模块中导入和复用。

示例

```ts
/*-----export [global.uts]-----*/
// 导出变量
export let count = 1
// 导出函数
export function addCount() {
    count++
}
```

```ts
// module1.uts
import { count, addCount } from './global.uts'
console.log(count) // 1
addCount()
console.log(count) // 2

// module2.uts
import { count, addCount } from './global.uts'
console.log(count) // 2
```

- 如果只想在不同模块中复用变量而不共享其引用，可以使用函数包装变量来创建独立的作用域。
