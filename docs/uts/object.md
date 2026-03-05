# 对象类型（Object Types）

UTS 语言支持使用对象字面量（Object Literal）声明类型，但不支持任意位置直接使用匿名对象类型，需要先为对象类型命名。

## 定义类型

使用 [type](./type-aliases.md) 关键字为对象类型命名，命名后可在其他位置使用此别名。

支持的用法：

```ts
type Person = {
    name: string
    fn: () => void
}
 
function greet(person: Person) {
    // ...
}
```

未支持的用法：

```ts
function greet(person: { name: string, fn: () => void }) {
    // ...
}
```

## 实例化

使用 [type](./type-aliases.md) 为对象类型命名实际上编译器会自动创建对应名称的 [Class](./class.md)，使用 `as` 关键字将对象字面量的值与类型相关联，编译器会自动创建对应类型的实例。

正确的用法：

```ts
greet({ name: 'Tom', fn: function () { } } as Person)
```

类型不匹配：

```ts
greet({ name: 'Tom', fn: function () { } })
```

## 嵌套限制

定义时对象字面量仅支持一层，嵌套多层的对象字面量需要手动分解为多个类型分别定义。

支持的用法：

```ts
type PersonInfo = {
    age: number
}

type Person = {
    name: string
    info: PersonInfo
}
```

未支持的用法：

```ts
type Person = {
    name: string
    info: {
        age: number
    }
}
```

 HBuilderX 3.9 版本之前实例化的时候也需要逐级绑定类型

支持的用法：

```ts
const person = {
    name: 'Tom',
    info: {
        age: 18
    } as PersonInfo
} as Person
```

HBuilderX 3.9 版本之前未支持的用法：

```ts
const person = {
    name: 'Tom',
    info: {
        age: 18
    }
} as Person
```

## 顺序限制

在函数作用域内定义时需要注意按顺序声明

支持的写法：

```ts
function test() {
    type PersonInfo = {
        age: number
    }

    type Person = {
        name: string
        info: PersonInfo
    }
}
```

不支持的写法：

```ts
function test() {
    type Person = {
        name: string
        info: PersonInfo
    }

    type PersonInfo = {
        age: number
    }
}
```

## 匿名对象（Anonymous Object）@anonymous-object

UTS 语言虽然不支持匿名对象类型声明，但是支持匿名的对象字面量作为值使用。匿名的对象字面量作为值使用时，编译器会自动将其初始化为 [UTSJSONObject](./buildin-object-api/utsjsonobject.md) 类型的实例。

>  仅支持UTSJSONObject 或者 type 定义的类型

```ts
const person: UTSJSONObject = {
    name: 'Tom',
    fn: () => {
      // ...
    }
}
```

```ts
function printName(obj: UTSJSONObject) {
    console.log(obj['name'])
}

printName({
    name: 'Tom'
})
```

