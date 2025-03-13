# @dcloudio/uni-nvue-styler

跨平台 css 解析。 css 字符串转对象，css 缩写展开，不支持特性告警、容错。

## 项目结构

`src/index.ts` 里导出的 parse 是完整流程，可供编译。

- 自定义了两个 postcss 插件 `expand` 和 `normalize`，交给 postcss 进行处理。
- 得到的结果交给 `objectifier` 转为客户端接受的对象类型

`lib/css.json` 文件来自 syntax 自动生成，无需修改。