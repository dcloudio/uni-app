# image

```<image>``` 用于在界面中显示单个图片


#### 基本用法

**注意：** 必须指定样式中的宽度和高度，否则无法工作。

```html
<image style="width:500px;height:500px" src="https://vuejs.org/images/logo.png"></image>
```

#### 属性


|属性名			|类型		|值												|默认值	|描述|
|---|---|---|---|---|
|placeholder|String	|{URL / Base64}						|-			|占位图的 URL，当由 src 表示的图片下载完成并展示后将被删除|
|resize			|String	|cover / contain / stretch|stretch|图片在image容器里面的填充类型|
|src				|String	|{URL / Base64 }					|-			|要显示图片的 URL，该属性是 ```<image>``` 组件的必填属性|

**resize：**

![uniapp](https://uni.apache.org/references/images/image-resize-property.png)
 * contain：缩放图片以完全装入```<image>```区域，可能背景区部分空白。 
 * cover：缩放图片以完全覆盖```<image>```区域，可能图片部分看不见。
 * stretch：默认值. 按照```<image>```区域的宽高比例缩放图片。

#### 样式

 支持通用样式。
 
#### 支持的图片格式

支持像 JPEG、PNG、GIF、WebP 等图片格式。

#### Component 方法

##### save 

保存图片内容到本地文件或相册，此操作可能需要设备相关权限。

**参数:**

* callback：{Function} 在图片被写入到本地文件或相册后的回调，回调参数：
  - result：{Object} 回调结果对象，属性列表：
    + success：{Boolean} 标记图片是否已写入完成。
    * errorDesc：{String} 如果图像没有成功写入，该字符串包含了详细的错误描述。

**返回值:** null

##### 使用save方法：

在 ```<image>```标签上增加 ```ref``` 属性

```html
<image ref="poster" src="path/to/image.png"></image>
```

获取组件引用并使用 save 方法:

```javascript
const $image = this.$refs.poster
$image.save(result => {
  if (result.success) {
    // Do something to hanlde success
  } else {
    console.log(result.errorDesc)
    // Do something to hanlde failure
  }
})
```

#### 事件

支持 通用事件。

##### load

当加载完成 ```src``` 指定的图片时，```load```事件将被触发。

**事件对象:**

* success: {Boolean} 标记图片是否成功加载。
* size: {Object} 加载的图片大小对象，属性列表：
  * naturalWidth: {Number} 图片宽度，如果图片加载失败则为0。
  * naturalHeight: {Number} 图片高度，如果图片加载失败则为0。

**处理 load 事件**
  
在 ```<image>``` 标签上绑定 load 事件：
  
```html
<image @load="onImageLoad" src="path/to/image.png"></image>
```
  
增加事件处理函数：

```javascript
export default {
  methods: {
    onImageLoad (event) {
      if (event.success) {
        // Do something to hanlde success
      }
    }
  }
}
```

#### 使用说明

* ```<image>``` 必须指定样式中的宽度和高度。
* ```<image>``` 不支持内嵌子组件。

#### 示例

```html
<template>
  <div >
      <image style="postiion:absolute;width:750px;height:800px"  src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/e3816b57938395.59e93cbfe8886.jpg"></image>
      <image style="position:absolute;left:75px;top:100px;width:600px;height:600px" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c5b9e057933719.59e90fa2ba2db.jpg"></image>
  </div>
</template>
```