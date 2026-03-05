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
