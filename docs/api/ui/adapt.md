### uni.setTopWindowStyle(OPTIONS)

设置 topWindow 的样式

> 3.0.5 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**OPTIONS 说明**

|属性|类型|说明|
|---|---|---|
|OPTIONS|Object|css 样式对象，需写驼峰css属性 ，{height: '100px', backgroundColor: 'red'}|

**代码示例**

```javascript
uni.setTopWindowStyle({
    height: '100px', 
    backgroundColor: 'red'
})
```

### uni.setLeftWindowStyle(OPTIONS)

设置 leftWindow 的样式

> 3.0.5 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**OPTIONS 说明**

|属性|类型|说明|
|---|---|---|
|OPTIONS|Object|css 样式对象，需写驼峰css属性 ，{width: '500px', backgroundColor: 'blue'}|

**代码示例**

```javascript
uni.setLeftWindowStyle({
    width: '500px', 
    backgroundColor: 'blue'
})
```


### uni.setRightWindowStyle(OPTIONS)

设置 rightWindow 的样式

> 3.0.5 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**OPTIONS 说明**

|属性|类型|说明|
|---|---|---|
|OPTIONS|Object|css 样式对象，需写驼峰css属性 ，{width: '500px', backgroundColor: 'blue'}|

**代码示例**

```javascript
uni.setRightWindowStyle({
    width: '500px', 
    backgroundColor: 'blue'
})
```
