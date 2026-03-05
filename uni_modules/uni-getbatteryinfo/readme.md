# uni-getbatteryinfo

## 使用文档

```ts
 // 获取电量信息
uni.getBatteryInfo({
    success(res) {
        console.log(res);
        uni.showToast({
            title: "当前电量：" + res.level + '%',
            icon: 'none'
        });
    }
})
```



### 参数

Object object

|属性|类型|必填|说明|
|----|---|----|----|
|success|function|否|接口调用成功的回调函数|
|fail|function|否|接口调用失败的回调函数|
|complete|function|否|接口调用结束的回调函数（调用成功、失败都会执行）|



object.success 回调函数


|属性|类型|说明|
|----|---|----|
|level|number|设备电量，范围 1 - 100|
|isCharging|boolean|是否正在充电中|
