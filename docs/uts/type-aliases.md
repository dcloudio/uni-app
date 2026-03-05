# 类型别名（Type Aliases）

使用类型别名可以为任何类型命名。类型别名不支持在局部作用域内定义。

## 一般用法

使用 `type` 关键字来定义类型别名。

```ts
type Str = string
type Fn = () => void

const str: Str = 'test'
const fn: Fn = () => {}
```

使用类型别名不会创建类型的副本，他和原始类型保持同一份引用。

```ts
class Person {

}
type P = Person

const p: P = new Person('Tom')
```

和 TS 语言中不同的是：UTS 语言中类型别名和原始类型一样也可以作为值使用。

```ts
const p: Person = new P('Tom')
```

## 特殊处理

当使用类型别名为对象类型（类型为对象字面量表达式）创建别名的时候，编译器会进行特殊处理编译为同名的 Class，此时也支持在局部作用域内定义。具体参考：[对象类型](./object.md)

```ts
type Person = {
    name: string
    fn: () => void
}
```