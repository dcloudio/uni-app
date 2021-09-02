### uni.addInterceptor(STRING, OBJECT)
添加拦截器

**STRING 参数说明**

需要拦截的`api`名称，如：`uni.addInterceptor('request', OBJECT)` ，将拦截 `uni.request()`

**OBJECT 参数说明**

|参数名		|类型			|必填	|默认值	|说明					|平台差异说明	|
|:-				|:-				|:-		|:-			|:-						|:-						|
|invoke		|Function	|否		|				|拦截前触发		|							|
|success	|Function	|否		|				|成功回调拦截	|							|
|fail			|Function	|否		|				|失败回调拦截	|							|
|complete	|Function	|否		|				|完成回调拦截	|							|


**示例**

```javascript
uni.request({
    url: 'request/login', //仅为示例，并非真实接口地址。
    success: (res) => {
        console.log(res.data);
        // 打印： {code:1,...}
    }
});


uni.addInterceptor('request', {
  invoke(args) {
    // request 触发前拼接 url 
    args.url = 'https://www.example.com/'+args.url
  },
  success(args) {
    // 请求成功后，修改code值为1
    args.data.code = 1
  }, 
  fail(err) {
    console.log('interceptor-fail',err)
  }, 
  complete(res) {
    console.log('interceptor-complete',res)
  }
})

```

### uni.removeInterceptor(STRING)
删除拦截器

**STRING 参数说明**

需要删除拦截器的`api`名称

**示例**

```javascript

uni.removeInterceptor('request')

```

##### 拦截器的适用场景非常多，比如路由拦截，权限引导等。
> 你可以参考插件市场,拦截器应用示例：图片选择api时无权限，引导用户快捷打开系统设置：[https://ext.dcloud.net.cn/plugin?id=5095](https://ext.dcloud.net.cn/plugin?id=5095)