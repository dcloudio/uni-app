## callFunction(object)

调用云函数

#### 请求参数

|字段	|类型	|必填	|说明		|
|:-:	|:-:	|:-:	|:-:		|
|name	|String	|是		|云函数名称|
|data	|Object	|否		|云函数参数|

#### 响应参数

|字段		|类型	|说明						|
|:-:		|:-:	|:-:						|
|result		|Object	|云函数执行结果				|
|requestId	|String	|请求序列号，用于错误排查	|

#### 示例代码

```javascript
// promise
uniCloud.callFunction({
    name: 'test',
    data: { a: 1 }
  })
  .then(res => {});

// callback
uniCloud.callFunction({
	name: 'test',
	data: { a: 1 },
	success(){},
	fail(){},
	complete(){}
});
```
