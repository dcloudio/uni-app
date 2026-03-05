
## 可迭代的多平台差异

参考[可迭代与可枚举的平台差异](./enumerability_iterable.md)

## 可迭代

在HBuilderX 4.41版本之前，UTS并未对 for ..of 做特殊处理：开发者调用 for..of 会编译报错，无法使用

从HBuilderX 4.41开始，UTS语言支持了[可迭代协议](https://issues.dcloud.net.cn/pages/issues/detail?id=6511). 以 [web的可迭代](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)为标准，保证了可迭代协议行为(即for..of)的的全端一致，并开放了可迭代协议的扩展能力。

也就是说，在HBuilderX 4.41之后版本，UTS内置的for..of 语法执行效果与web标准一致。

```ts
let a1 = [111,"222",false]

for(perItem of a1){
	console.log(perItem)
}
```

上面的代码在 HBuilderX 4.41 之前版本在 android /ios 会编译报错，在HBuilderX 4.41 之后，全端执行效果如下：

```ts
111
"222"
false
```

可迭代协议最直接的应用场景就是 for..of 运算符，UTS 中对 for..of 支持情况的具体介绍[详见](./loops.md#forof)


### 定制可迭代对象

在web开发中，可迭代协议并不仅仅是简单的对应了 for..of 语法。 还是对遍历对象内部元素的一种约定。UTS同样支持了这种能力。

在HBuilder X 4.41 之后版本，UTS语言内置了：  `UTSValueIterable` 接口，用来支持自定义对象的可迭代规则。

当开发者手动实现 `UTSValueIterable` 接口时，就可以实现定制其实例对象在 for..of 运算下的规则

举例：

```typescript
class TestClass  {
  holderArray: (any | null)[] = [11, 22, null, 33, 44, null]
}

let test = new TestClass()

for (item of test) {
  console.log("item",item)
}
```

该class对应的实例 并不支持 for..of 语法，如果使用下面的代码调用会触发报错：
 
>  ‌error: For-loop range must have an 'iterator()' method‌

如果我们想让这个对象的示例，支持for..of 语法，可以修改为如下代码:

```typescript
class TestClass implements UTSValueIterable<any | null> {

  holderArray: (any | null)[] = [11, 22, null, 33, 44, null]

  valueIterator(): UTSIterator<any | null> {
    let holderIndex = 0;
    let obj: UTSIterator<any | null> = {
      next: () : UTSIteratorResult<any | null> => {
        const done = holderIndex == this.holderArray.length
          return {
            done,
            value: done ? null : this.holderArray[holderIndex++],
          } as UTSIteratorResult<any | null>
      }
    }
    return obj
  }
  
}
```
执行结果:

```typescript
item ‍[number]‍ 11
item ‍[number]‍ 22
item null
item ‍[number]‍ 33
item ‍[number]‍ 44
item null
```

`UTSValueIterable` 接口 仅存在一个待实现函数`valueIterator`,该函数返回值是 `UTSIterator` 类型与web中[Iterator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator)类似。

开发者需要关心是`UTSIterator`中的 `next` 函数实现，`next`函数返回一个 `UTSIteratorResult` 该数据结构为done和value

与web的[迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%8D%8F%E8%AE%AE)一样，该数据结构中的 done 决定了是否可以继续迭代，value 对应当前迭代的具体数值。


如果我们希望在使用者for..of 时仅能遍历出非空的数值，我们可以这样实现


```typescript
class TestClass implements UTSValueIterable<any | null> {

  holderArray: (any | null)[] = [11, 22, null, 33, 44, null]

  valueIterator(): UTSIterator<any | null> {
    let holderIndex = 0;
    let arr = this.holderArray.filter((value) => { 
      return value != null
    })

    let obj: UTSIterator<any | null> = {
      next: () : UTSIteratorResult<any | null> => {
        const done = holderIndex == arr.length
        return {
          done,
          value: done ? null : arr[holderIndex++],
        } as UTSIteratorResult<any | null>
      }
    }
    return obj
  }
  
}
```

执行结果:
```typescript
item ‍[number]‍ 11
item ‍[number]‍ 22
item ‍[number]‍ 33
item ‍[number]‍ 44
```


## 可迭代和可枚举的关系

关于可枚举和for..in的相关内容 参考[可枚举协议](./enumerability.md)

单从访问对象内部属性的角度。我们认为，可迭代是一种更现代化语法，建议开发者通过 for..of 来实现对对象内部属性的遍历。








