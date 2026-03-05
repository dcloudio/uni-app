## 学习资料

### JavaScript 开发者快速上手 uts

JavaScript 是一门非常灵活的编程语言：

- 没有类型约束，一个变量可能初始化时是字符串，然后又被赋值为数字。
- 因为隐式类型转换的存在，使得变量的类型很难在运行前就确定。
- 基于原型的面向对象编程，原型上的属性或方法可以在运行时被修改。

这种灵活性，一方面使得 JavaScript 蓬勃发展，另一方面也让它的代码质量参差不齐，维护成本高。

而 uts 的类型系统，可以在很大程度上弥补 JavaScript 的缺点。

**uts 是静态类型**

类型系统按照「类型检查的时机」来分类，可以分为动态类型和静态类型。

动态类型是指在运行时才会进行类型检查，这种语言的类型错误往往会导致运行时错误。JavaScript 是一门解释型语言，没有编译阶段，所以它是动态类型，以下这段代码在运行时才会报错：

```js
let foo = 1;
foo.split(' ');
// Uncaught TypeError: foo.split is not a function
// 运行时会报错（foo.split 不是一个函数），造成线上 bug
```

静态类型是指编译阶段就能确定每个变量的类型，这种语言的类型错误往往会导致语法错误。uts 在编译阶段就会进行类型检查，所以 uts 是静态类型，这段 uts 代码在编译阶段就会报错了：

```ts
let foo = 1;
foo.split(' ');
// Property 'split' does not exist on type 'number'.
// 编译时会报错（数字没有 split 方法），无法通过编译
```

大部分 JavaScript 代码只需要经过少量的修改，增加类型批注，就可以变成 uts 代码，这跟 ts 非常接近。

举例：

```js
// js 求和两个数字
function add(left, right) {
    return left + right;
}
```

补充类型批注后，即可变成 uts 代码

```ts
// uts 求和
function add(left: number, right: number): number {
    return left + right;
}
```

**hello uts**

目前我们可以通过[开发uts插件](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html#_3-%E5%BC%80%E5%8F%91uts%E5%8E%9F%E7%94%9F%E6%8F%92%E4%BB%B6)来学习 uts。


