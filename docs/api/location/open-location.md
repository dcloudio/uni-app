### uni.openLocation(OBJECT)
使用应用内置地图查看位置。

**OBJECT 参数说明**

|参数名|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|latitude|Float|是|纬度，范围为-90~90，负数表示南纬，使用 gcj02 国测局坐标系||
|longitude|Float|是|经度，范围为-180~180，负数表示西经，使用 gcj02 国测局坐标系||
|scale|Int|否|缩放比例，范围5~18，默认为18|微信小程序|
|name|String|否|位置名||
|address|String|否|地址的详细说明||
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**示例**

```javascript
uni.getLocation({
	type: 'gcj02', //返回可以用于uni.openLocation的经纬度
	success: function (res) {
		const latitude = res.latitude;
		const longitude = res.longitude;
		uni.openLocation({
			latitude: latitude,
			longitude: longitude,
			success: function () {
				console.log('success');
			}
		});
	}
});
```

**Tips**

- 本API是一个非原子的封装界面，开发者如有定制需求，可自己做页面实现类似功能。
- H5 端获取定位信息，需要部署在 **https** 服务上，本地预览（localhost）仍然可以使用 http 协议。
- 无 GPS 模块的 PC 设备使用 Chrome 浏览器的时候，位置信息是连接谷歌服务器获取的，国内用户可能获取位置信息失败。
- ``<map>`` 组件默认为国测局坐标，调用 ``uni.getLocation`` 返回结果传递给 ``<map>`` 组件时，需指定 type 为 gcj02。
- App 端使用地图组件需要向高德或百度等三方服务商申请SDK资质，获取AppKey，打包时需要在manifest的SDK配置中填写Appkey。在manifest可视化界面有详细申请指南。
- iOS端 如需使用第三方地图进行导航，需要在 manifest.json 文件内增加 ``urlschemewhitelist`` 节点，在线打包即可
```json
{  
    "app-plus": {  
        "distribute": {  
            "ios": {  
                "urlschemewhitelist": [  
                    "baidumap",  
                    "iosamap",  
                    "qqmap"  
                ]  
            }  
        }  
    }  
}  
```

- 点击返回也会进入 `fail` 回调中