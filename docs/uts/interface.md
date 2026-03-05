# 接口（Interface）@interface

接口提供了一种约定，用于确保对象的属性和方法遵循特定的模式。接口只能包含抽象的声明，不能包含具体的实现。接口本身不能被实例化，它可以被类所采用，以提供具体的实现。

在 ts 中，经常把json数据转为 interface 或 type 。但在 uts 中，只适合转 type，不适合使用 interface。因为 interface 在 kotlin 和 swift 中另有不同。

<!-- TODO 这里需要补充和ts的interface的区别，编译到原生时都变成了什么 -->

接口使用关键字 `interface` 声明。

```ts
interface IPerson {
  name: string;
  printName(): void;
}
```

## 接口继承

接口可以继承一个或多个接口：

```ts
interface IPerson1 extends IPerson {}
```

## 实现接口

类可以实现一个或多个接口：

```ts
class Person implements IPerson {
  constructor(public name: string) {}
  printName() {
    console.log(this.name);
  }
}
```
