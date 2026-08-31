# uni-app x DevTools

> `HBuilderX 5.25+` 支持。

> uni-app x DevTools 目前支持 App 平台的蒸汽模式项目。

uni-app x DevTools 是 HBuilderX 内置的 uni-app x 蒸汽模式运行时检查工具，界面和使用习惯与 Chrome DevTools 相近。它用于检查运行中 App 的元素、网络请求和存储。

目前提供以下功能：

1. 在 Elements 中查看页面、Element 和自定义组件组成的节点树，以及属性、组件 props、计算样式和盒模型。
2. 在 Network 中查看通过 `uni.request`、`uni.uploadFile` 和 `uni.downloadFile` 发起的请求。
3. 在 Storage 中查看和维护应用通过 uni Storage API 保存的数据。

## 打开 DevTools

使用 HBuilderX 将蒸汽模式项目运行到 Android、iOS 或鸿蒙设备。在运行控制台的右上角，点击 uni-app x DevTools 按钮。

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/devtools/devtools-control-panel-icon.png)

HBuilderX 会打开独立的 DevTools 窗口。应用尚未连接时，窗口会显示等待连接状态；应用启动并建立连接后，窗口会自动进入检查界面。DevTools 窗口和应用没有固定的启动先后顺序。

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/devtools/devtools-waiting-connect.png)

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/devtools/devtools-connected.png)

关闭 DevTools 窗口会同时结束本次检查会话。需要继续检查时，再次点击运行控制台中的 DevTools 按钮即可。

## 查看页面和组件

打开 **Elements** 标签，可以查看应用中当前可见页面的节点树。普通页面和用户打开的 `dialogPage` 都可以被检查；切换页面或打开、关闭 `dialogPage` 后，DevTools 会切换到当前可见页面。

节点树会同时显示：

- `<page>` 页面根节点。
- `view`、`text`、`image` 等 Element。
- 自定义组件。

选择 Element 后，可以在右侧查看 Element 属性、计算样式和盒模型。选择自定义组件后，可以查看组件接收到的 props。`<page>` 节点的路由和页面配置也会显示在属性中。

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/devtools/devtools-elements.png)

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/devtools/devtools-component-props.png)

右键点击节点可以使用以下操作：

- **展开所有子节点**：递归展开该节点下的所有内容。
- **收起子级**：收起该节点下已经展开的内容。
- **在 HBuilderX 中打开**：打开页面或自定义组件对应的源码文件。该菜单只在能定位源码的页面和自定义组件节点上显示。

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/devtools/devtools-elements-context-menu.png)

::: warning 当前限制
Elements 当前使用页面快照，页面内新增、删除或修改节点后不会自动同步。请点击窗口左上角的刷新按钮查看最新内容。切换页面不需要手动刷新。

Android、iOS 平台的 `view`、`text`、`image` 和 `scroll-view`，目前仅显示已设置的 `id` 和 `class` 属性，其他属性将在后续版本中完善。
:::

刷新后 DevTools 会按照节点路径恢复此前展开的内容。节点结构发生较大变化时，无法匹配的节点需要重新展开。

Elements 当前仅用于查看，不支持修改 Element 属性、样式、文字或组件 props。

## 查看网络请求

打开 **Network** 标签后，在应用中执行网络请求，请求会出现在列表中。选择一条请求，可以查看 Headers、Payload、Preview、Response 和 Timing 等信息。

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/devtools/devtools-network.jpg)

当前 Network 记录以下公开 uni API 发起的请求：

- `uni.request`
- `uni.uploadFile`
- `uni.downloadFile`

Network 展示的是调用公开 uni API 时可见的参数和结果，不是平台网络栈最终发出的完整报文。例如，GET 请求的 `data` 会显示在 Payload 中，不会由 DevTools 模拟平台规则拼接到 URL；平台自动补充的 Header、Cookie、重定向等信息也可能不在当前数据中。

请求和响应正文仅在 Runtime 可以读取且未超过缓存限制时显示。二进制请求体、流式内容、超限内容或已经被释放的内容可能无法查看，但请求 URL、状态和基础耗时仍会保留。

::: warning 当前限制
Network 暂不支持 UTS 插件内部或平台原生代码绕过公开 uni API 发起的请求，也不会补录 DevTools 建立连接前已经完成的请求。
:::

## 查看和修改 Storage

打开 **Storage** 标签，可以查看应用通过 uni Storage API 保存的数据。列表会显示 Key、Value 和 Type，其中 Type 可能为：

- `string`
- `number`
- `boolean`
- `null`
- `array`
- `object`

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/devtools/devtools-storage.jpg)

通过公开 uni Storage API 新增、修改、删除或清空数据后，列表会自动更新。也可以点击窗口左上角的刷新按钮，重新读取完整 Storage 数据。

Storage 支持以下操作：

- 修改已有 Key 的 Value，数据类型保持不变。
- 删除选中的数据。
- 清空全部数据。

编辑 `number`、`boolean`、`null`、`array` 或 `object` 时，输入内容必须符合原数据类型。输入无效时不会写入 Storage，界面会恢复平台实际保存的值。

::: warning 当前限制
Storage 暂不支持新建数据或修改 Key。UTS 插件内调用存储 API 后，列表不会实时更新，请点击左上角的刷新按钮手动刷新。插件使用的原生私有存储不属于 uni Storage，无法在此查看。
:::

## 常见问题

### DevTools 一直显示等待应用连接

请依次确认：

1. 当前项目使用蒸汽模式，并运行到 Android、iOS 或鸿蒙 App。
2. 使用标准基座或自定义调试基座运行应用，发行包不支持。
3. 当前运行任务没有被停止，设备上的应用已经启动。
4. HBuilderX 和设备连接正常。

应用重新启动、热重载或从后台恢复后，DevTools 会自动重新连接。若仍未连接，可以关闭 DevTools 窗口后重新点击运行控制台中的 DevTools 按钮。

### 页面内容变化后 Elements 没有更新

页面内的 Element 变化目前不会自动同步，请切换到 Elements 标签，然后点击左上角的刷新按钮。页面路由切换和 `dialogPage` 显隐会自动更新，不需要手动刷新。

### Network 中没有请求

Network 只记录 DevTools 建立连接后，通过 `uni.request`、`uni.uploadFile` 或 `uni.downloadFile` 发起的请求。UTS 插件和原生代码发起的请求当前不会显示。

### Storage 中没有最新数据

公开 uni Storage API 产生的变化会自动同步。UTS 插件绕过公开 API 包装器写入数据时，请切换到 Storage 标签并点击左上角的刷新按钮。

### 节点右键菜单中没有“在 HBuilderX 中打开”

该菜单只对能够定位源码的页面和自定义组件显示，Element 不显示此菜单。
