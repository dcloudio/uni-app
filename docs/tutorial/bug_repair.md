# AI 修复功能说明

`AI 修复` 是 HBuilderX 提供的一项辅助能力，用于在 `uni-app` 或 `uni-app x` 项目编译、运行报错时，快速发起智能修复流程，帮助开发者定位并处理常见问题。

> `HBuilderX 4.71+` 已开始支持 `AI 修复`，建议从 `4.72+` 版本开始使用，以获得更稳定的体验。

## 适用场景

当项目在编译或运行过程中出现错误时，控制台会提供 `AI 修复` 入口。开发者可基于当前错误信息，快速发起自动修复。

## 使用流程

### 1. 编译或运行报错后，打开 AI 修复入口

在 `uni-app` 或 `uni-app x` 项目编译、运行出现错误时，控制台会显示可点击的 `AI 修复` 按钮。

![](https://web-ext-storage.dcloud.net.cn/hx/debug/ai-repair5.png)

### 2. 发起修复

点击控制台中的 `AI 修复` 按钮后，会自动打开 `uni-agent`。确认内容后点击发送，即可开始自动修复当前问题。

![](https://web-ext-storage.dcloud.net.cn/hx/debug/ai-repair2.png)

### 3. 查看修复结果

修复完成后，界面会展示本次涉及修改的文件，便于开发者快速了解变更范围。

![](https://web-ext-storage.dcloud.net.cn/hx/debug/ai-repair4.png)

### 4. 逐项确认是否接受修改

开发者可以逐个查看具体文件内容，并根据实际情况决定是否接受本次修改。

![](https://web-ext-storage.dcloud.net.cn/hx/debug/ai-repair3.png)

## 补充说明

- `AI 修复` 适合作为排查和处理问题的辅助工具，最终修改结果建议由开发者确认后再纳入项目。
- 如需了解 `uni-agent` 的更多界面说明与使用技巧，可参考[官方文档](https://uniapp.dcloud.net.cn/ai/uni-agent.html#uni-agent-%E7%95%8C%E9%9D%A2%E4%B8%8E%E6%A0%B8%E5%BF%83%E5%8A%9F%E8%83%BD)。
