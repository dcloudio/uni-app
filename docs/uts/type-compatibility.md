# 类型兼容性

由于 UTS 语言最终会转换为 kotlin、swift 等语言，UTS 语言中的接口也更接近 kotlin 中的接口或 swift 中的协议，在类型兼容性判断时与 TS 语言的结构类型系统有着明显的区别：

- TS：如果两个类型的内部结构相似（具有相同的属性和方法），那么它们被认为是兼容的，即使它们的名称不同。
- UTS：依赖于类型的显式声明，必需是同一个类型或者存在显式的继承/实现关系。

```ts
interface IPerson {
    name: string
    printName(): void
}

class Person implements IPerson {
    constructor(public name: string) {}
    printName(): void {
        console.log(this.name)
    }
}

class Person1 {
    constructor(public name: string) {}
    printName(): void {
        console.log(this.name)
    }
}

type PersonObject = {
    name: string
    printName(): void
}

class Person2 extends Person {}

const person: IPerson = new Person('Tom') // 正确，Person 实现自 IPerson

const person1: Person = new Person1('Tom') // 错误，Person 与 Person1 无关只是结构相同

const person2: Person = new Person2('Tom') // 正确，Person2 继承自 Person

const person3: IPerson = {
    name: 'Tom',
    printName: function () {
        console.log(this.name)
    }
} as PersonObject // 错误，PersonObject 类型与 IPerson 无关只是结构相同
```

### 运行时类型保留

不同于ts编译后完全抹除类型，uts在运行时保留了部分类型信息。通常是定义type后，创建此type对应的实例时，会保留此实例的类型信息。

例如：

```ts
type Obj = {
  a: number
}
const obj = {
  a: 1
} as Obj 
// 此时obj的类型为Obj，运行时可以使用 obj instanceof Obj
console.log(obj instanceof Obj) // true

const result = JSON.parse<Obj>(`{"a": 1}`) // 此时返回的对象类型为Obj
console.log(result instanceof Obj) // true
```

**注意**

- 目前 web端`uni.request`传入泛型时不会创建对应类型的实例，会直接抹除类型信息，后续可能会调整为创建泛型类型对应的实例，请勿利用此特性。
- web端仅项目内定义的类型可以被实例化，uni-app-x内部定义的类型无法被实例化，例如`const options = { url: 'xxx' } as RequestOptions`，并不会将此对象转化为RequestOptions的实例，运行时也没有`RequestOptions`对应的类型信息。
- 鸿蒙uts编译为ArkTS时，type仅可作为类型使用，不会将此type作为class实例化，包括变量声明时的类型、JSON.parse泛型参数等等。

### any类型

4.18版本起，uts在编译到js时，any类型会包含null类型。编译为kotlin或swift时any类型包含null

4.18之前的版本uts中any类型不包含null类型。

开发者在定义包含null的any类型时如需同时兼容js产物和kotlin、swift产物需要注意定义为any|null

例如定义可选参数时应使用下面的写法：

```ts
function test(anything?: any | null) { // 注意带上问号
  console.log(anything)
}
```

**注意**
- uts编译为ArkTS时any类型存在如下两种情况，如果开发者希望使用ArkTS的any类型可以使用ESObject替代any
  + uts插件内开发者自行指定的any类型，会被编译为Object类型，此类型不含null、undefined
  + ArkTS编译器推断出的any类型（ArkTS内为ESObject），此类型包含所有类型，且其使用较为受限。详情参考ArkTS文档：[限制使用esobject类型](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/typescript-to-arkts-migration-guide#限制使用esobject类型?ha_source=Dcloud&ha_sourceId=89000448)

### 可选属性

如果属性在类型中是可选值需要使用下面的写法，不要省略问号和`| null`

```ts
type Options = {
  num?: number | null
}
```

### void/undefined类型

为保证多端统一应尽量避免使用undefined、void类型，可以使用null代替。如果需要判断是否为null建议使用两个等号，不要使用三个等号（此处使用了js的特性`undefined == null`结果为true）。

### String、Number、Boolean类型

ts内string、number、boolean类型与String、Number、Boolean类型并不相同。

```ts
let str1: String = '1'
let str2: string = '2'

str1 = str2 // 不报错
str2 = str1 // 报错 Type 'String' is not assignable to type 'string'
```

尽量使用string、number、boolean类型替代String、Number、Boolean类型。

### import type@import-type

> HBuilderX 4.41及之后版本已无此章节描述的限制，import type在uni-app-x项目中可以正常使用。

由于uts会为as为某些类型的对象字面量创建这个类型对应的实例，所以经常会存在一些类型引入后是作为值使用而不是作为类型使用。应尽量不要使用`import type`用法，避免编译结果出错。

```ts
import type { TypeA } from './type' // 避免使用
import { TypeA } from './type' // 推荐用法
```
