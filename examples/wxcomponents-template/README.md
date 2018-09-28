# 小程序自定义组件使用示例

## 注意事项
* 小程序自定义组件需放在wxcomponents目录
* 使用的组件需添加到pages.json文件内
* 原组件内事件名称需修改为驼峰命名，如：
```js
// wxcomponents/vant-weapp/dist/nav-bar/index.js
this.$emit('click-left');
// 改为
this.$emit('clickLeft');
```