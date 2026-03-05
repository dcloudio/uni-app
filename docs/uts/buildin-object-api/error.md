## Error

当运行时错误产生时，Error 对象会被抛出。Error 对象也可用于用户自定义的异常的基础对象。

### 实例属性

#### message
错误消息。对于用户创建的 Error 对象，这是构造函数的第一个参数提供的字符串。

#### cause
导致该错误的具体原始原因。在捕获错误时，我们可能会使用更具体或更加实用的信息对错误进行包装，再将其重新抛出。cause 属性就用于这一场景，以便仍然可以访问原始的错误。


### 创建 Error
可通过以下方式创建 Error: 

```ts
// 直接创建
let error = new Error();

// 指定 message: 
let err = new Error('Whoops!');

// 指定 message 和 cause:
let otherError = new Error("Connecting to database failed.", { cause: err });

```

## Bug & Tips@tips

* 目前 Error 类型编译到 kotlin 为 io.dcloud.uts.UTSError
