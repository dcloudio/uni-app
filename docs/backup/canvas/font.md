### font
canvasContext.font

**定义**

设置当前字体样式的属性

**语法**

```javascript
canvasContext.font = value
```


**参数**

|参数	|类型	|说明																							|
|---	|---	|---																							|
|value	|String	|符合 CSS font 语法的 DOMString 字符串，至少需要提供字体大小和字体族名。默认值为 10px sans-serif|

value 支持的属性有：

|属性	|说明										|
|---|---|
|style	|字体样式。仅支持 italic, oblique, normal	|
|weight	|字体粗细。仅支持 normal, bold				|
|size	|字体大小									|
|family	|字体族名。注意确认各平台所支持的字体		|