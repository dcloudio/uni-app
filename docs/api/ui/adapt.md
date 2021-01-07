### uni.setTopWindowStyle(OBJECT)

设置 topWindow 的样式

> 3.0.5 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**OBJECT 参数说明**

|参数|类型|说明|
|---|---|---|
|OBJECT|Object|css 样式对象，需写驼峰css属性 ，{height: '100px', backgroundColor: 'red'}|

**代码示例**

```javascript
uni.setTopWindowStyle({
    height: '100px', 
    backgroundColor: 'red'
})
```

### uni.setLeftWindowStyle(OBJECT)

设置 leftWindow 的样式

> 3.0.5 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**OBJECT 参数说明**

|参数|类型|说明|
|---|---|---|
|OBJECT|Object|css 样式对象，需写驼峰css属性 ，{width: '500px', backgroundColor: 'blue'}|

**代码示例**

```javascript
uni.setLeftWindowStyle({
    width: '500px', 
    backgroundColor: 'blue'
})
```


### uni.setRightWindowStyle(OBJECT)

设置 rightWindow 的样式

> 3.0.5 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**OBJECT 参数说明**

|参数|类型|说明|
|---|---|---|
|OBJECT|Object|css 样式对象，需写驼峰css属性 ，{width: '500px', backgroundColor: 'blue'}|

**代码示例**

```javascript
uni.setRightWindowStyle({
    width: '500px', 
    backgroundColor: 'blue'
})
```
