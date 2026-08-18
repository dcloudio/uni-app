## Image

图片对象, 用于 canvas 绘制图片。

```mermaid
graph LR
  
Image -- Extends --> UniImageElement
  style UniImageElement color:#42b983
  click UniImageElement "https://doc.dcloud.net.cn/uni-app-x/api/dom/uniimageelement.html"
```


### Image 的属性值 @image-values
| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| src | [string.ImageURIString](/uts/data-type.md#ide-string) | 是 | Web: 4.0; 微信小程序: x; 支付宝小程序: x; Android: 4.25; iOS: 4.25; iOS(VDOM) UTS 插件: x; HarmonyOS: 4.61 | 图片url |




### Image 兼容性 <Help /> 
 | Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.25 | 4.25 | 4.61 |

<!-- CUSTOMTYPEJSON.Image.example -->

**提示**

鸿蒙平台、微信小程序不支持 `new Image()` 方式创建，需要通过跨平台写法 `CanvasContext.createImage()`, 示例如下:

```js
uni.createCanvasContextAsync({
  id: 'canvas',
  component: this, // setup模式使用 getCurrentInstance().proxy
  success: (context : CanvasContext) => {
    const renderingContext = context.getContext('2d')!;
    const image = context.createImage();
    image.src = "/static/logo.png";
    image.onload = () => {
      renderingContext.drawImage(image, 0, 0, 100, 100);
    }
  }
})
```
