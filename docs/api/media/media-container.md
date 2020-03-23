### uni.createMediaContainer()
创建音视频处理容器，最终可将容器中的轨道合成一个视频 ，返回 `MediaContainer` 对象

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|2.9.0+|x|x|x|x|

#### MediaContainer.addTrack(track)
将音频或视频轨道添加到容器

**参数说明**

|参数|说明|
|:-|:-|
|track|要添加的音频或视频轨道|

#### MediaContainer.destroy()
将容器销毁，释放资源

#### MediaContainer.export()
将容器内的轨道合并并导出视频文件

#### MediaContainer.extractDataSource(object)
将容器内的轨道合并并导出视频文件 ,返回 `MediaTrack` 对象

**参数说明**

|属性|类型|必填	|说明|
|:-|:-|:-|:-|
|source|String|是|视频源地址，只支持本地文件|

#### MediaContainer.removeTrack(track)
将音频或视频轨道添加到容器

**参数说明**

|参数|说明|
|:-|:-|
|track|要移除的音频或视频轨道|


### MediaTrack 
可通过 `MediaContainer.extractDataSource` 返回。

 `MediaTrack` 音频或视频轨道，可以对轨道进行一些操作

**参数说明**

|属性|类型|说明|
|:-|:-|:-|
|kind|String|轨道类型，只读 ,audio:音频轨道;video:视频轨道	|
|duration|Number|轨道长度，只读	|
|volume|Number|音量，音频轨道下有效，可写	|