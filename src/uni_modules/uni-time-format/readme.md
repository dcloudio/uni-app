时间格式化展示组件，支持绝对时间与相对时间。

### 基本用法

```html
<uni-time-format :timestamp="Date.now()" format="datetime"></uni-time-format>
```

### relative 规则

`format=relative` 按自然日输出：
- 今天内：
`< 1 分钟` 输出“刚刚”
`< 60 分钟` 输出“n分钟前”
`>= 60 分钟` 输出“n小时前”
- 昨天内：输出“昨天 HH:mm”
- 超过昨天：输出“YYYY-MM-DD HH:mm”
- 未来时间：直接输出“YYYY-MM-DD HH:mm”

### 相对时间国际化

根据 `uni.getAppBaseInfo().appLanguage` 自动匹配：
- 简体中文（`zh`）
- 繁体中文（`zh-hant` / `zh-tw` / `zh-hk` / `zh-mo`）
- 英文（默认）
- 法文（`fr`）
- 拉丁文（`la`）

法文、拉丁文使用短文案，避免长文本占位。

### 非法时间

当 `timestamp` 非法时，组件返回空字符串。

### 示例页面

`/pages/uni-ui/time-format/time-format`
示例页面包含两组相对时间演示：
- 输入框动态演示：输入 `yyyy-mm-dd hh:mm:ss`，实时展示对应相对时间
- 固定分支演示：展示“刚刚 / 分钟前 / 小时前 / 昨天 HH:mm / 超过昨天”五种分支，且不随输入变化
