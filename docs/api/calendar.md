::: sourceCode
## uni.addPhoneRepeatCalendar(options) @addphonerepeatcalendar

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-calendar


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-calendar

:::

向系统日历添加重复事件

### addPhoneRepeatCalendar 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 5.08 | 5.08 | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **AddPhoneRepeatCalendarOptions** | 是 | Web: x | 向系统日历添加重复事件的参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| title | string | 是 |  | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 日历事件标题 |
| startTime | number | 是 |  | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 开始时间的 unix 时间戳 (1970年1月1日开始所经过的秒数) |
| allDay | boolean | 否 | false | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 是否全天事件，默认 false |
| notes | string | 否 |  | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 事件说明 |
| location | string | 否 |  | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 事件位置 |
| endTime | number | 否 |  | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 结束时间的 unix 时间戳，默认与开始时间相同 |
| alarm | boolean | 否 |  | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 是否提醒，默认 true |
| alarmOffset | number | 否 | 0 | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 提醒提前量，单位秒，默认 0 表示开始时提醒 |
| path | string | 否 |  | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 跳转小程序路径，必须要和 signature 一起使用，填入后会自动生成跳转链接拼接在事件说明中 |
| signature | string | 否 |  | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 仅微信小程序支持，App 平台保留该字段但不会使用，跳转小程序路径签名，必须要和 path 一起使用，用 session_key 对 path 签名得到的结果，即 hmac_sha256(session_key, path)。 |
| repeatInterval | string | 是 | month | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 重复周期，默认 month 每月重复 |
| repeatEndTime | number | 否 |  | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 重复周期结束时间的 unix 时间戳，不填表示一直重复 |
| success | (res: [AddPhoneRepeatCalendarSuccess](#addphonerepeatcalendarsuccess-values)) => void | 否 |  | Web: x | 接口调用成功的回调函数 |
| fail | (res: [AddPhoneRepeatCalendarFail](#addphonerepeatcalendarfail-values)) => void | 否 |  | Web: x | 接口调用失败的回调函数 |
| complete | (res: [AddPhoneRepeatCalendarSuccess](#addphonerepeatcalendarsuccess-values) \| [AddPhoneRepeatCalendarFail](#addphonerepeatcalendarfail-values)) => void | 否 |  | Web: x | 接口调用结束的回调函数（调用成功、失败都会执行） |
| description | string | 否 |  | Web: x; 微信小程序: 4.41 | 事件说明<br/> | 

##### repeatInterval 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 'day' | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 每天重复 |
| week | Web: x | 每周重复 |
| month | Web: x | 每月重复。该模式日期不能大于 28 日 |
| year | Web: x | 每年重复 |

#### AddPhoneRepeatCalendarSuccess 的属性值 @addphonerepeatcalendarsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errMsg | string | 否 | Web: x |

#### AddPhoneRepeatCalendarFail 的属性值 @addphonerepeatcalendarfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 601 | Web: x | title is required |
| 602 | Web: x | startTime is invalid |
| 603 | Web: x | endTime is invalid |
| 604 | Web: x | alarmOffset requires alarm |
| 606 | Web: x | repeat rule is invalid |
| 607 | Web: x | calendar service is unavailable |
| 608 | Web: x | add calendar event failed |
| 609 | Web: x | calendar creation canceled |






<!-- UTSAPIJSON.addPhoneRepeatCalendar.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.calendar.addPhoneRepeatCalendar)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/calendar.html#addphonerepeatcalendar)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/calendar/wx.addPhoneRepeatCalendar.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=addPhoneRepeatCalendar&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=addPhoneRepeatCalendar&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=addPhoneRepeatCalendar&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=addPhoneRepeatCalendar&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=addPhoneRepeatCalendar)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=addPhoneRepeatCalendar&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

::: sourceCode
## uni.addPhoneCalendar(options) @addphonecalendar

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-calendar


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-calendar

:::

向系统日历添加事件

### addPhoneCalendar 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 5.08 | 5.08 | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **AddPhoneCalendarOptions** | 是 | Web: x | 向系统日历添加事件的参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| title | string | 是 |  | Web: x; 微信小程序: √; Android: 5.08; iOS: 5.08; HarmonyOS: 5.08 | 日历事件标题 |
| startTime | number | 是 |  | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 开始时间的 unix 时间戳 |
| allDay | boolean | 否 | false | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 是否全天事件，默认 false |
| notes | string | 否 |  | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 事件说明 |
| location | string | 否 |  | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 事件位置 |
| endTime | number | 否 |  | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 结束时间的 unix 时间戳，默认与开始时间相同 |
| alarm | boolean | 否 |  | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 结束时间的 unix 时间戳，默认与开始时间相同 |
| alarmOffset | number | 否 | 0 | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 提醒提前量，单位秒，默认 0 表示开始时提醒 |
| path | string | 否 |  | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 跳转小程序路径，必须要和 signature 一起使用，填入后会自动生成跳转链接拼接在事件说明中 |
| signature | string | 否 |  | Web: x; 微信小程序: √; Android: 5.09; iOS: 5.09; HarmonyOS: 5.09 | 仅微信小程序支持，App 平台保留该字段但不会使用，跳转小程序路径签名，必须要和 path 一起使用，用 session_key 对 path 签名得到的结果，即 hmac_sha256(session_key, path)。 |
| success | (res: [AddPhoneCalendarSuccess](#addphonecalendarsuccess-values)) => void | 否 |  | Web: x | 接口调用成功的回调函数 |
| fail | (res: [AddPhoneCalendarFail](#addphonecalendarfail-values)) => void | 否 |  | Web: x | 接口调用失败的回调函数 |
| complete | (res: [AddPhoneCalendarSuccess](#addphonecalendarsuccess-values) \| [AddPhoneCalendarFail](#addphonecalendarfail-values)) => void | 否 |  | Web: x | 接口调用结束的回调函数（调用成功、失败都会执行） |
| description | string | 否 |  | Web: x; 微信小程序: 4.41 | 事件说明<br/> | 

#### AddPhoneCalendarSuccess 的属性值 @addphonecalendarsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errMsg | string | 否 | Web: x |

#### AddPhoneCalendarFail 的属性值 @addphonecalendarfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 601 | Web: x | title is required |
| 602 | Web: x | startTime is invalid |
| 603 | Web: x | endTime is invalid |
| 604 | Web: x | alarmOffset requires alarm |
| 606 | Web: x | repeat rule is invalid |
| 607 | Web: x | calendar service is unavailable |
| 608 | Web: x | add calendar event failed |
| 609 | Web: x | calendar creation canceled |






<!-- UTSAPIJSON.addPhoneCalendar.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.calendar.addPhoneCalendar)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/calendar.html#addphonecalendar)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/calendar/wx.addPhoneCalendar.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=addPhoneCalendar&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=addPhoneCalendar&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=addPhoneCalendar&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=addPhoneCalendar&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=addPhoneCalendar)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=addPhoneCalendar&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/calendar/calendar.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/calendar/calendar.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/calendar/calendar
```uvue
<template>
	<!-- #ifdef APP -->
	<scroll-view style="flex: 1;padding: 6px;">
	<!-- #endif -->
		<text class="uni-h2">日历 API</text>
		<text class="notice">本页将 `uni.addPhoneCalendar` 和 `uni.addPhoneRepeatCalendar` 合并为一个可直接提交的表单，覆盖 API 的全部可填参数。在有权限的情况下可直接写入系统日历，在无权限的情况下会打开系统的日历新建页面</text>
		<text class="margin-v">开始时间默认是当前时间的下一个整点，结束时间默认顺延一小时；保留预填数据即可直接添加日历。</text>

		<text class="uni-h3">当前结果</text>
		<view class="log-list">
			<text class="log-item">最近动作：{{ lastAction }}</text>
			<text class="log-item">执行状态：{{ lastStatus }}</text>
			<text class="log-item">返回信息：{{ lastPayload }}</text>
		</view>

		<text class="uni-h3">添加日历</text>
		<text class="margin-v">`repeatInterval` 选为“不重复”时调用单次事件 API，其余选项调用重复事件 API。</text>

			<view class="field-group">
				<text class="field-label">标题 title</text>
				<input class="field-input" v-model="title" placeholder="请输入日历标题" />
			</view>

			<view class="field-group">
				<text class="field-label">开始时间 startTime</text>
				<view class="picker-row">
					<picker class="picker-field" mode="date" :value="startDate" :start="dateRangeStart" :end="dateRangeEnd" @change="handleStartDateChange">
						<view class="picker-box">
							<text class="picker-text">{{ startDate }}</text>
						</view>
					</picker>
					<picker v-if="!allDay" class="picker-field picker-field-space" mode="time" :value="startClock" @change="handleStartClockChange">
						<view class="picker-box">
							<text class="picker-text">{{ startClock }}</text>
						</view>
					</picker>
				</view>
			</view>

			<view class="field-group">
				<view class="switch-row">
					<text class="field-label">全天 allDay</text>
					<switch :checked="allDay" @change="handleAllDayChange" />
				</view>
			</view>

			<view class="field-group">
				<text class="field-label">备注 notes</text>
				<textarea class="field-textarea" v-model="notesText" placeholder="请输入事件备注" :maxlength="-1" />
			</view>

			<view class="field-group">
				<text class="field-label">地点 location</text>
				<input class="field-input" v-model="location" placeholder="请输入地点" />
			</view>

			<view class="field-group">
				<text class="field-label">结束时间 endTime</text>
				<view class="picker-row">
					<picker class="picker-field" mode="date" :value="endDate" :start="dateRangeStart" :end="dateRangeEnd" @change="handleEndDateChange">
						<view class="picker-box">
							<text class="picker-text">{{ endDate }}</text>
						</view>
					</picker>
					<picker v-if="!allDay" class="picker-field picker-field-space" mode="time" :value="endClock" @change="handleEndClockChange">
						<view class="picker-box">
							<text class="picker-text">{{ endClock }}</text>
						</view>
					</picker>
				</view>
			</view>

			<view class="field-group">
				<view class="switch-row">
					<text class="field-label">提醒 alarm</text>
					<switch :checked="alarm" @change="handleAlarmChange" />
				</view>
			</view>

			<view class="field-group">
				<text class="field-label">提醒提前量 alarmOffset（秒）</text>
				<input class="field-input" v-model="alarmOffsetSeconds" type="number" placeholder="例如 900" :disabled="!alarm" />
			</view>

			<view class="field-group">
				<text class="field-label">点击日程的激活URL path（微信小程序下填path时必须填signature）</text>
				<input class="field-input" v-model="path" placeholder="请输入页面路径" />
			</view>

			<view class="field-group">
				<text class="field-label">签名 signature（仅微信小程序生效）</text>
				<input class="field-input" v-model="signature" placeholder="请输入签名" />
			</view>

			<view class="field-group">
				<text class="field-label">重复周期 repeatInterval</text>
				<picker class="picker-field picker-full" :value="repeatIntervalIndex" :range="repeatIntervalLabels" @change="handleRepeatIntervalChange">
					<view class="picker-box">
						<text class="picker-text">{{ repeatIntervalText }}</text>
					</view>
				</picker>
			</view>

			<view class="field-group">
				<text class="field-label">重复截止时间 repeatEndTime</text>
				<view class="picker-row">
					<picker class="picker-field" mode="date" :value="repeatEndDate" :start="dateRangeStart" :end="dateRangeEnd" :disabled="isRepeatEndDisabled" @change="handleRepeatEndDateChange">
						<view class="picker-box">
							<text class="picker-text">{{ repeatEndDate }}</text>
						</view>
					</picker>
					<picker v-if="!allDay" class="picker-field picker-field-space" mode="time" :value="repeatEndClock" :disabled="isRepeatEndDisabled" @change="handleRepeatEndClockChange">
						<view class="picker-box">
							<text class="picker-text">{{ repeatEndClock }}</text>
						</view>
					</picker>
				</view>
			</view>

			<button class="submit-button" type="primary" @tap="submitCalendar">添加日历</button>

		<text class="uni-h3">调用日志</text>
		<view class="log-list">
			<text class="log-item" v-for="item in logItems" :key="item">{{ item }}</text>
		</view>
	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
</template>

<script setup lang="uts">
	type RepeatOptionValue = 'none' | CalendarRepeatInterval

	const lastAction = ref<string>('等待调用')
	const lastStatus = ref<string>('未执行')
	const lastPayload = ref<string>('点击下方按钮开始体验')
	const logItems = ref<Array<string>>([])

	const title = ref<string>('uni-calendar 表单示例')
	const allDay = ref<boolean>(false)
	const notesText = ref<string>('通过单个表单覆盖日历 API 全量可填参数。')
	const location = ref<string>('会议室 A')
	const alarm = ref<boolean>(true)
	const alarmOffsetSeconds = ref<string>('900')
	// #ifndef MP-WEIXIN
	const path = ref<string>('https://uniappx.dcloud.net.cn/ulink')
	// #endif
	// #ifdef MP-WEIXIN
	const path = ref<string>('') //微信小程序填path必须签名，默认不填
	// #endif
	const signature = ref<string>('')

	const repeatIntervalLabels : Array<string> = ['不重复', '每天', '每周', '每月', '每年']
	const repeatIntervalValues : Array<RepeatOptionValue> = ['none', 'day', 'week', 'month', 'year']
	const repeatIntervalIndex = ref<number>(0)

	const dateRangeStart = ref<string>('')
	const dateRangeEnd = ref<string>('')
	const startDate = ref<string>('')
	const startClock = ref<string>('')
	const endDate = ref<string>('')
	const endClock = ref<string>('')
	const repeatEndDate = ref<string>('')
	const repeatEndClock = ref<string>('')

	function pad2(value : number) : string {
		return value > 9 ? value.toString() : `0${value}`
	}

	function formatDateValue(timestamp : number) : string {
		const date = new Date(timestamp)
		return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
	}

	function formatTimeValue(timestamp : number) : string {
		const date = new Date(timestamp)
		return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`
	}

	function createNextHourTimestamp() : number {
		const date = new Date()
		date.setMinutes(0)
		date.setSeconds(0)
		date.setMilliseconds(0)
		date.setHours(date.getHours() + 1)
		return date.getTime()
	}

	function createTimestampAfterDays(baseTimestamp : number, dayOffset : number) : number {
		const date = new Date(baseTimestamp)
		date.setDate(date.getDate() + dayOffset)
		return date.getTime()
	}

	function buildTimestamp(dateValue : string, timeValue : string) : number {
		const dateParts = dateValue.split('-')
		const timeParts = timeValue.split(':')
		if (dateParts.length != 3 || timeParts.length != 2) {
			return 0
		}
		const year = parseInt(dateParts[0])
		const month = parseInt(dateParts[1]) - 1
		const day = parseInt(dateParts[2])
		const hour = parseInt(timeParts[0])
		const minute = parseInt(timeParts[1])
		const date = new Date()
		date.setFullYear(year)
		date.setMonth(month)
		date.setDate(day)
		date.setHours(hour)
		date.setMinutes(minute)
		date.setSeconds(0)
		date.setMilliseconds(0)
		return date.getTime()
	}

	function buildDateTimestamp(dateValue : string) : number {
		const dateParts = dateValue.split('-')
		if (dateParts.length != 3) {
			return 0
		}
		const year = parseInt(dateParts[0])
		const month = parseInt(dateParts[1]) - 1
		const day = parseInt(dateParts[2])
		const date = new Date()
		date.setFullYear(year)
		date.setMonth(month)
		date.setDate(day)
		date.setHours(0)
		date.setMinutes(0)
		date.setSeconds(0)
		date.setMilliseconds(0)
		return date.getTime()
	}

	function parseOffsetSeconds(value : string) : number | null {
		if (value.length == 0) {
			return null
		}
		const seconds = parseInt(value)
		if (seconds <= 0) {
			return 0
		}
		return seconds
	}

	function describeCalendarError(errCode : number) : string {
		switch (errCode) {
			case 601:
				return '标题不能为空'
			case 602:
				return '开始时间无效'
			case 603:
				return '结束时间不能早于开始时间'
			case 604:
				return '设置提醒提前量前需要先开启提醒'
			case 606:
				return '重复规则无效'
			case 607:
				return '当前设备的日历服务不可用'
			case 608:
				return '写入日历失败'
			case 609:
				return '用户取消了系统日历创建'
			default:
				return '未知错误'
		}
	}
  
	function pushLog(line : string) : void {
		logItems.value.unshift(line)
		if (logItems.value.length > 8) {
			logItems.value.splice(8)
		}
	}

	function updateResult(action : string, status : string, payload : string) : void {
		lastAction.value = action
		lastStatus.value = status
		lastPayload.value = payload
		pushLog(`${action} -> ${status}`)
	}

	function handleCalendarSuccessResult(action : string, errMsg : string | null) : void {
		const resultMessage = errMsg != null ? errMsg : `${action}:ok`
		updateResult(action, '成功', resultMessage)
	}

	function handleAddPhoneCalendarSuccess(action : string, res : AddPhoneCalendarSuccess) : void {
		handleCalendarSuccessResult(action, res.errMsg)
	}

	function handleAddPhoneRepeatCalendarSuccess(action : string, res : AddPhoneRepeatCalendarSuccess) : void {
		handleCalendarSuccessResult(action, res.errMsg)
	}

	function handleCalendarFailResult(action : string, errSubject : string | null, errCode : number, errMsg : string | null) : void {
		const subject = errSubject != null ? errSubject : 'uni-calendar'
		const message = errMsg != null ? errMsg : ''
		const errorDescription = describeCalendarError(errCode)
		updateResult(action, `失败 (${errCode})`, `${errorDescription}; errSubject=${subject}; errCode=${errCode}; errMsg=${message}`)
	}

	function handleAddPhoneCalendarFail(action : string, error : AddPhoneCalendarFail) : void {
		handleCalendarFailResult(action, error.errSubject, error.errCode, error.errMsg)
	}

	function handleAddPhoneRepeatCalendarFail(action : string, error : AddPhoneRepeatCalendarFail) : void {
		handleCalendarFailResult(action, error.errSubject, error.errCode, error.errMsg)
	}

	function fillDefaultForm() : void {
		const startTimestamp = createNextHourTimestamp()
		const endTimestamp = startTimestamp + 60 * 60 * 1000
		const repeatEndTimestamp = createTimestampAfterDays(startTimestamp, 30)
		const rangeStartTimestamp = createTimestampAfterDays(startTimestamp, -365)
		const rangeEndTimestamp = createTimestampAfterDays(startTimestamp, 365 * 5)

		dateRangeStart.value = formatDateValue(rangeStartTimestamp)
		dateRangeEnd.value = formatDateValue(rangeEndTimestamp)
		startDate.value = formatDateValue(startTimestamp)
		startClock.value = formatTimeValue(startTimestamp)
		endDate.value = formatDateValue(endTimestamp)
		endClock.value = formatTimeValue(endTimestamp)
		repeatEndDate.value = formatDateValue(repeatEndTimestamp)
		repeatEndClock.value = formatTimeValue(startTimestamp)
	}

	function handleStartDateChange(event : UniPickerChangeEvent) : void {
		startDate.value = event.detail.value as string
	}

	function handleStartClockChange(event : UniPickerChangeEvent) : void {
		startClock.value = event.detail.value as string
	}

	function handleEndDateChange(event : UniPickerChangeEvent) : void {
		endDate.value = event.detail.value as string
	}

	function handleEndClockChange(event : UniPickerChangeEvent) : void {
		endClock.value = event.detail.value as string
	}

	function handleRepeatEndDateChange(event : UniPickerChangeEvent) : void {
		repeatEndDate.value = event.detail.value as string
	}

	function handleRepeatEndClockChange(event : UniPickerChangeEvent) : void {
		repeatEndClock.value = event.detail.value as string
	}

	function handleRepeatIntervalChange(event : UniPickerChangeEvent) : void {
		repeatIntervalIndex.value = event.detail.value as number
	}

	function handleAllDayChange(event : UniSwitchChangeEvent) : void {
		allDay.value = event.detail.value
	}

	function handleAlarmChange(event : UniSwitchChangeEvent) : void {
		alarm.value = event.detail.value
	}

	const repeatIntervalText = computed(() : string => {
		return repeatIntervalLabels[repeatIntervalIndex.value]
	})

	const isRepeatEndDisabled = computed(() : boolean => {
		return repeatIntervalValues[repeatIntervalIndex.value] == 'none'
	})

	function buildStartTimeForSubmit() : number {
		if (allDay.value) {
			return buildDateTimestamp(startDate.value)
		}
		return buildTimestamp(startDate.value, startClock.value)
	}

	function buildEndTimeForSubmit() : number {
		if (allDay.value) {
			const endDateTimestamp = buildDateTimestamp(endDate.value)
			if (endDateTimestamp <= 0) {
				return 0
			}
			return createTimestampAfterDays(endDateTimestamp, 1)
		}
		return buildTimestamp(endDate.value, endClock.value)
	}

	function buildRepeatEndTimeForSubmit() : number {
		if (allDay.value) {
			const repeatEndDateTimestamp = buildDateTimestamp(repeatEndDate.value)
			if (repeatEndDateTimestamp <= 0) {
				return 0
			}
			return createTimestampAfterDays(repeatEndDateTimestamp, 1)
		}
		return buildTimestamp(repeatEndDate.value, repeatEndClock.value)
	}

	function submitCalendar() : void {
		const startTime = buildStartTimeForSubmit()
		const endTime = buildEndTimeForSubmit()
		const alarmOffset = parseOffsetSeconds(alarmOffsetSeconds.value)
		const repeatValue = repeatIntervalValues[repeatIntervalIndex.value]

		const baseOptions : AddPhoneCalendarOptions = {
			title: title.value,
			startTime: startTime,
			allDay: allDay.value,
			notes: notesText.value,
			location: location.value,
			endTime: endTime,
			alarm: alarm.value,
			alarmOffset: alarmOffset,
			path: path.value,
			signature: signature.value,
			success: (res) => {
				handleAddPhoneCalendarSuccess('addPhoneCalendar', res)
			},
			fail: (error) => {
				handleAddPhoneCalendarFail('addPhoneCalendar', error)
			}
		}

		if (repeatValue == 'none') {
			uni.addPhoneCalendar(baseOptions)
			return
		}

		const repeatCalendarValue = repeatValue as CalendarRepeatInterval
		const repeatEndTime = buildRepeatEndTimeForSubmit()

		const repeatOptions : AddPhoneRepeatCalendarOptions = {
			title: baseOptions.title,
			startTime: baseOptions.startTime,
			allDay: baseOptions.allDay,
			notes: baseOptions.notes,
			location: baseOptions.location,
			endTime: baseOptions.endTime,
			alarm: baseOptions.alarm,
			alarmOffset: baseOptions.alarmOffset,
			path: baseOptions.path,
			signature: baseOptions.signature,
			repeatInterval: repeatCalendarValue,
			repeatEndTime: repeatEndTime,
			success: (res) => {
				handleAddPhoneRepeatCalendarSuccess('addPhoneRepeatCalendar', res)
			},
			fail: (error) => {
				handleAddPhoneRepeatCalendarFail('addPhoneRepeatCalendar', error)
			}
		}

		uni.addPhoneRepeatCalendar(repeatOptions)
	}

	fillDefaultForm()
</script>

<style>
	.margin-v {
		margin: 5px 0;
	}

	.notice {
		color: #550000;
		font-size: 14px;
		font-style: italic;
	}

	.field-group {
		margin: 8px 0;
		display: flex;
		flex-direction: column;
	}

	.field-label {
		font-size: 14px;
	}

	.field-input {
		height: 42px;
		margin-top: 5px;
		padding-left: 12px;
		padding-right: 12px;
		border: 1px solid #ccc;
	}

	.field-textarea {
		min-height: 96px;
		margin-top: 5px;
		padding: 12px;
		border: 1px solid #ccc;
	}

	.picker-row {
		margin-top: 5px;
		display: flex;
		flex-direction: row;
	}

	.picker-field {
		flex: 1;
	}

	.picker-field-space {
		margin-left: 10px;
	}

	.picker-full {
		margin-top: 8px;
	}

	.picker-box {
		min-height: 42px;
		padding-left: 12px;
		padding-right: 12px;
		border: 1px solid #ccc;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.picker-text {
		font-size: 14px;
	}

	.switch-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.submit-button {
		margin: 10px 0;
	}

	.log-list {
		margin: 5px 0;
		padding: 10px;
		border: 1px solid #ccc;
		display: flex;
		flex-direction: column;
	}

	.log-item {
		font-size: 14px;
		margin: 4px 0;
	}
</style>

```
:::

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |


### tips
- iOS平台因为系统权限问题，需要`iOS 17及以上`系统才能正常工作，`5.08` 版本 iOS17以下的系统如果需要使用，需要先获取日历访问权限。`5.09+` 版本会对iOS 17 以下的系统做出兼容支持。