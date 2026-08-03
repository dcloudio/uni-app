---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-time-format
---

::: sourceCode
## uni-time-format
:::

时间格式化展示组件

> 本 Component 是 uni ext component，需下载插件：[uni-time-format](https://ext.dcloud.net.cn/plugin?id=27851)


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



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.07 | 5.07 | 5.07 | 5.07 |


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| timestamp | number |   | 需要格式化的时间戳，支持秒级（10 位）或毫秒级（13 位），秒级会自动换算成毫秒 |
| format | string | "datetime" | 输出格式。"datetime" 输出 YYYY-MM-DD HH:mm；"date" 输出 YYYY-MM-DD；"time" 输出 HH:mm:ss；"relative" 输出相对时间（刚刚 / N 分钟前 / N 小时前 / 昨天 HH:mm / 完整日期） |

<!-- UTSCOMJSON.uni-time-format.fileFormates -->



<!-- UTSCOMJSON.uni-time-format.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/time-format/time-format.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/time-format/time-format.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/time-format/time-format

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/time-format/time-format

>示例
```vue
<template>
  <scroll-view class="page">
    <view class="section">
      <text class="section-title">当前时间不同格式</text>
      <view class="row">
        <text class="row-label">date</text>
        <uni-time-format :timestamp="data.currentTimestamp" format="date"></uni-time-format>
      </view>
      <view class="row">
        <text class="row-label">time</text>
        <uni-time-format :timestamp="data.currentTimestamp" format="time"></uni-time-format>
      </view>
      <view class="row">
        <text class="row-label">datetime</text>
        <uni-time-format :timestamp="data.currentTimestamp" format="datetime"></uni-time-format>
      </view>
    </view>

    <view class="section">
      <text class="section-title">输入时间动态计算相对时间</text>
      <view class="input-block">
        <text class="row-label">输入格式</text>
        <text class="tip-text">yyyy-mm-dd hh:mm:ss</text>
        <input
          class="datetime-input"
          v-model="data.relativeDateTimeText"
          placeholder="yyyy-mm-dd hh:mm:ss"
        />
      </view>
      <view class="row">
        <text class="row-label">输出相对时间</text>
        <uni-time-format :timestamp="inputRelativeTimestamp" format="relative"></uni-time-format>
      </view>
    </view>

    <view class="section">
      <text class="section-title">固定 5 分支示例（不随输入变化）</text>
      <view class="row">
        <text class="row-label">刚刚</text>
        <uni-time-format :timestamp="fixedJustNowTimestamp" format="relative"></uni-time-format>
      </view>
      <view class="row">
        <text class="row-label">分钟前</text>
        <uni-time-format :timestamp="fixedFiveMinutesAgoTimestamp" format="relative"></uni-time-format>
      </view>
      <view class="row">
        <text class="row-label">小时前</text>
        <uni-time-format :timestamp="fixedHourBranchTimestamp" format="relative"></uni-time-format>
      </view>
      <view class="row">
        <text class="row-label">昨天 HH:mm</text>
        <uni-time-format :timestamp="fixedYesterdayTimestamp" format="relative"></uni-time-format>
      </view>
      <view class="row">
        <text class="row-label">超过昨天</text>
        <uni-time-format :timestamp="fixedOlderThanYesterdayTimestamp" format="relative"></uni-time-format>
      </view>
      <text class="tip-text">固定示例基于页面打开时刻计算，不随输入变化。</text>
    </view>

    <view class="section">
      <text class="section-title">秒级时间戳自动换算</text>
      <view class="row">
        <text class="row-label">timestamp(s)</text>
        <uni-time-format :timestamp="secondTimestamp" format="datetime"></uni-time-format>
      </view>
    </view>

    <view class="section">
      <text class="section-title">非法时间戳</text>
      <view class="row">
        <uni-time-format :timestamp="data.invalidTimestamp" format="datetime"></uni-time-format>
      </view>
      <text class="tip-text">非法时间会显示为空字符串。</text>
    </view>
  </scroll-view>
</template>

<script setup lang="uts">
  type Data = {
    currentTimestamp: number
    invalidTimestamp: number
    relativeDateTimeText: string
  }

  const data = reactive<Data>({
    currentTimestamp: Date.now(),
    invalidTimestamp: NaN,
    relativeDateTimeText: ''
  })
  let timer : number | null = null

  const DAY_MS = 24 * 60 * 60 * 1000
  const pageOpenTimestamp = Date.now()
  const pageOpenDate = new Date(pageOpenTimestamp)

  function padZero(value : number) : string {
    return value < 10 ? `0${value}` : `${value}`
  }

  function formatDateTimeText(date : Date) : string {
    return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`
  }

  function toSafeInt(text : string) : number | null {
    const value = parseInt(text)
    if (isNaN(value)) {
      return null
    }
    return value
  }

  function parseDateTimeText(text : string) : number | null {
    if (text.length != 19) {
      return null
    }
    if (text.substring(4, 5) != '-' || text.substring(7, 8) != '-' || text.substring(10, 11) != ' ' || text.substring(13, 14) != ':' || text.substring(16, 17) != ':') {
      return null
    }

    const year = toSafeInt(text.substring(0, 4))
    const month = toSafeInt(text.substring(5, 7))
    const day = toSafeInt(text.substring(8, 10))
    const hours = toSafeInt(text.substring(11, 13))
    const minutes = toSafeInt(text.substring(14, 16))
    const seconds = toSafeInt(text.substring(17, 19))

    if (year == null || month == null || day == null || hours == null || minutes == null || seconds == null) {
      return null
    }

    const date = new Date(year, month - 1, day, hours, minutes, seconds)
    if (date.getFullYear() != year || date.getMonth() != month - 1 || date.getDate() != day || date.getHours() != hours || date.getMinutes() != minutes || date.getSeconds() != seconds) {
      return null
    }
    return date.getTime()
  }

  const pageOpenDateText = formatDateTimeText(pageOpenDate)
  data.relativeDateTimeText = pageOpenDateText

  const inputRelativeTimestamp = computed(() : number => {
    const parsed = parseDateTimeText(data.relativeDateTimeText)
    if (parsed != null) {
      return parsed
    }
    return NaN
  })

  const fixedDayStartTimestamp = new Date(
    pageOpenDate.getFullYear(),
    pageOpenDate.getMonth(),
    pageOpenDate.getDate()
  ).getTime()

  const fixedJustNowTimestamp = pageOpenTimestamp - 20 * 1000
  const fixedFiveMinutesAgoTimestamp = pageOpenTimestamp - 5 * 60 * 1000
  const fixedHourBranchTimestamp = (() : number => {
    const fiveHoursAgo = pageOpenTimestamp - 5 * 60 * 60 * 1000
    if (fiveHoursAgo >= fixedDayStartTimestamp) {
      return fiveHoursAgo
    }
    const oneHourAgo = pageOpenTimestamp - 60 * 60 * 1000
    if (oneHourAgo >= fixedDayStartTimestamp) {
      return oneHourAgo
    }
    return pageOpenTimestamp - 60 * 1000
  })()
  const fixedYesterdayTimestamp = fixedDayStartTimestamp - 50 * 60 * 1000
  const fixedOlderThanYesterdayTimestamp = fixedDayStartTimestamp - 2 * DAY_MS - 30 * 60 * 1000

  const secondTimestamp = computed(() : number => {
    return Math.floor(data.currentTimestamp / 1000)
  })

  onMounted(() => {
    timer = setInterval(() => {
      data.currentTimestamp = Date.now()
    }, 1000)
  })

  onUnmounted(() => {
    const currentTimer = timer
    if (currentTimer != null) {
      clearInterval(currentTimer)
      timer = null
    }
  })

  defineExpose({
    data,
    inputRelativeTimestamp,
    secondTimestamp
  })
</script>

<style>
  .page {
    flex: 1;
    padding: 12px;
  }

  .section {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 16px;
    color: var(--text-color, #333333);
  }

  .input-block {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .datetime-input {
    margin-top: 8px;
    margin-bottom: 6px;
    border-width: 1px;
    border-style: solid;
    border-color: var(--border-color, #dddddd);
    height: 38px;
    padding-left: 10px;
    padding-right: 10px;
    color: var(--text-color, #333333);
  }

  .row {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
  }

  .row-label {
    font-size: 14px;
    color: var(--text-color, #333333);
    opacity: 0.75;
  }

  .tip-text {
    margin-top: 4px;
    font-size: 12px;
    color: var(--text-color, #333333);
    opacity: 0.6;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-time-format)
