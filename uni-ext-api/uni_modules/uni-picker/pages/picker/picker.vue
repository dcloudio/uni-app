<template>
	<view class="uni-picker__container" :class="['uni-picker-theme--'+theme]">
		<view class="uni-picer__mask" :class="{'picker__ani-show': show}" @click="close"></view>
		<view class="uni-picker__inner-box" :class="{'picker__ani-box-show':show}">
			<view class="uni-picker__header-btn">
				<text class="uni-picker__header-btn-cannel" @click="close">{{ cancelText }}</text>
				<text class="uni-picker__header-btn-ok" @click="confirm">{{ confirmText }}</text>
			</view>
			<view class="uni-picker__view">
				<!-- <view class="uni-picker__inner-mask picker-top"></view>
				<view class="uni-picker__inner-mask picker-bottom"></view> -->
				<picker-view style="flex:1" @change="handleChange" :mask-top-style="maskTopStyle" :mask-bottom-style="maskBottomStyle" :indicatorStyle="indicatorStyle" :value="value">
					<template v-if="mode == 'selector'">
						<picker-view-column>
							<template v-for="(item,selectorIdx) in range" :key="selectorIdx">
								<text class="uni-picker__view-item" v-if="rangeKey">{{item[rangeKey]}}</text>
								<text class="uni-picker__view-item" v-else>{{item}}</text>
							</template>
						</picker-view-column>
					</template>
					<template v-if="mode == 'multiSelector'">
						<template v-for="(item,multiIdx) in range" :key="multiIdx">
							<picker-view-column>
								<template v-for="(column,colIdx) in item" :key="colIdx">
									<text class="uni-picker__view-item" v-if="rangeKey">{{column[rangeKey]}}</text>
									<text class="uni-picker__view-item" v-else>{{column}}</text>
								</template>
							</picker-view-column>
						</template>
					</template>
					<template v-if="mode == 'time'">
						<picker-view-column>
							<template v-for="(h,hIdx) in hours" :key="hIdx">
								<text class="uni-picker__view-item">{{h}}</text>
							</template>
						</picker-view-column>
						<picker-view-column>
							<template v-for="(m,mIdx) in minutes" :key="mIdx">
								<text class="uni-picker__view-item">{{m}}</text>
							</template>
						</picker-view-column>
					</template>
					<template v-if="mode == 'date'">
						<picker-view-column>
							<text v-for="year in years" :key="year" class="uni-picker__view-item">{{year}}{{yearText}}</text>
							<!-- <text class="uni-picker__view-item">{{year_str}}</text> -->
						</picker-view-column>
						<picker-view-column v-if="fields != 'year'">
							<text v-for="month in monthsText" :key="month" class="uni-picker__view-item">{{formatSingle(month)}}{{monthText}}</text>
							<!-- <text class="uni-picker__view-item">{{month_str}}</text> -->
						</picker-view-column>
						<picker-view-column v-if="fields == 'day'">
							<text v-for="day in days" :key="day" class="uni-picker__view-item">{{formatSingle(day)}}{{dayText}}</text>
							<!-- <text class="uni-picker__view-item">{{day_str}}</text> -->
						</picker-view-column>
					</template>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script lang='ts'>
	type SelectedData = {
		year: number,
		month: number,
		day: number
	};

	export default {
		data() {
			return {
				show: false,
				readyEventName: '',
				optionsEventName: '',
				cancelEventName: '',
				selectorChangeEventName: '',
				multiSelectorChangeEventName: '',
				timeChangeEventName: '',
				columnChangeEventName: '',
				headerText: '',
				mode: 'selector',
				disabled: false,
				range: [],
				rangeKey: '',
				value: [] as number[],
				eventValue: [] as number[],
				time: [] as string[],
				prevMultiValue: [] as number[],
				selected: {
					year: new Date().getFullYear(),
					month: new Date().getMonth() + 1,
					day: new Date().getDate()
				},
				years: [] as number[],
				months: Array.from({ length: 12 }, (_, i) => i + 1),
				days: [] as number[],
				hours: [] as string[],
				minutes: [] as string[],
				fields: 'day',
				start: [] as string[],
				end: [] as string[],
				yearRange: [] as number[],
				monthRange: [] as number[],
				dayRange: [] as number[],
				timer: 0,
				// 主题模式
				theme: 'light',
				maskTopStyle: "background-image: linear-gradient(to bottom, rgba(255,255,255,1), rgba(255, 255, 255, 0));",
				maskBottomStyle: "background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255, 255, 255, 1));",
				i18nText: {
					// 国际化
					"en": {
						"cancel": "Cancel",
						"confirm": "OK",
						"year": "",
						"month": "",
						"day": "",
						"months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", 'Aug', "Sept", "Oct", "Nov", "Dec"]
					},
					"es": {
						"cancel": "Cancelar",
						"confirm": "Aceptar",
						"year": "",
						"month": "",
						"day": "",
						"months": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
					},
					"fr": {
						"cancel": "Annuler",
						"confirm": "Valider",
						"year": "",
						"month": "",
						"day": "",
						"months": ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"]
					},
					"zh-Hans": {
						"cancel": "取消",
						"confirm": "确定",
						"year": "年",
						"month": "月",
						"day": "日",
						"months": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
					},
					"zh-Hant": {
						"cancel": "取消",
						"confirm": "確定",
						"year": "年",
						"month": "月",
						"day": "日",
						"months": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
					}
				},
				language: 'zh-Hans'
			}
		},
		onLoad(options) {
			this.readyEventName = options['readyEventName'] !;
			this.optionsEventName = options['optionsEventName'] !;
			this.cancelEventName = options['cancelEventName'] !;
			this.selectorChangeEventName = options['selectorChangeEventName'] !;
			this.multiSelectorChangeEventName = options['multiSelectorChangeEventName'] !;
			this.timeChangeEventName = options['timeChangeEventName'] !;
			this.columnChangeEventName = options['columnChangeEventName'] !;

			uni.$on(this.optionsEventName, (data: UTSJSONObject) => {
				if (data['headerText'] != null) {
					this.headerText = data['headerText']
				}
				if (data['mode'] != null) {
					this.mode = data['mode']
				}
				if (data['range'] != null) {
					this.range = data['range']
				}
				if (data['rangeKey'] != null) {
					this.rangeKey = data['rangeKey']
				}
				if (data['selectorValue'] != null) {
					this.value = [data['selectorValue']]
				}
				if (data['multiSelectorValue'] != null) {
					const multiSelectorValue = data['multiSelectorValue']
					const len = this.range.length
					let arr = Array.from({ length: len }, () => 0);
					arr.forEach((_, index) => {
						let val = multiSelectorValue[index] ?? 0
						this.value.push(val)
					})
					this.prevMultiValue = this.value.slice()
				}
				if (data['timeValue'] != null) {
					const time = data['timeValue']
					this.start = data['start'] as string[]
					this.end = data['end'] as string[]
					this.updateTimeColumns()
					this.value = this.initTimeValue(time);
				}

				if (data['dateValue'] != null) {
					const dateValue = data['dateValue'] 
					const year = dateValue[0]
					const month = dateValue[1]
					const day = dateValue[2]
					this.fields = data['fields'] as string
					// 解析起止日期
					this.start = (data['start'] ?? ['1970', '01', '01']) as string[]
					this.end = (data['end'] ?? ['2099', '12', '31']) as string[]
					
					this.selected = {
						year: parseInt(year) ?? new Date().getFullYear(),
						month: parseInt(month) ?? 1,
						day: parseInt(day) ?? 1
					}

					// 调整日期到合法范围
					this.selected.year = Math.max(
						parseInt(this.start[0]),
						Math.min(parseInt(this.end[0]), this.selected.year)
					)
					this.selected.month = Math.max(1, Math.min(12, this.selected.month))
					this.selected.day = Math.max(1, Math.min(
						new Date(this.selected.year, this.selected.month, 0).getDate(),
						this.selected.day
					))

					// 初始化动态列
					this.updateDateColumns()

					// 查找索引
					const yIdx = this.years.findIndex(y => y == this.selected.year)
					const mIdx = this.months.findIndex(m => m == this.selected.month)
					const dIdx = this.days.findIndex(d => d == this.selected.day)

					// 根据字段粒度设置值
					switch (this.fields) {
						case 'year':
							this.value = [yIdx]
							break
						case 'month':
							this.value = [yIdx, mIdx]
							break
						case 'day':
							this.value = [yIdx, mIdx, dIdx]
							break
					}

				}
				this.eventValue = this.value
				this.calculateRanges();
			})
			// 页面打开后通知picker传值
			uni.$emit(this.readyEventName)

			const systemInfo = uni.getDeviceInfo()
			const appBaseInfo = uni.getAppBaseInfo()
			const appLanguage = appBaseInfo.appLanguage
			const osLanguage = systemInfo.osLanguage


			if (appLanguage != null) {
				this.language = appLanguage
			} else if (osLanguage != null) {
				this.language = osLanguage
			}
			// TODO 暂不支持 ，会阻塞进程
			// const locale = uni.getLocale()
			// this.language = locale
			// uni.onLocaleChange((res) => {
			// 	if (res.locale) {
			// 		this.language = res.locale
			// 	}
			// })

			const osTheme = systemInfo.osTheme
			// const appTheme = appBaseInfo.appTheme
			// TODO appTheme 鸿蒙没实现，强制 light
			// if (appTheme != null) {
			// 	this.theme = appTheme
			// } else if (osTheme != null) {
			// 	this.theme = osTheme
			// }
			if (osTheme != null) {
				this.theme = osTheme
			}
			if (this.theme == 'light') {
				this.maskTopStyle = "background-image: linear-gradient(to bottom, rgba(255,255,255,1), rgba(255, 255, 255, 0));"
				this.maskBottomStyle = "background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255, 255, 255, 1));"
			} else {
				this.maskTopStyle = "background-image: linear-gradient(to bottom, rgba(44, 44, 43, 1), rgba(44, 44, 43, 0));"
				this.maskBottomStyle = "background-image: linear-gradient(to bottom, rgba(44, 44, 43, 0), rgba(44, 44, 43, 1));"
			}

			// TODO 鸿蒙暂不支持
			// uni.onAppThemeChange((res: AppThemeChangeResult) => {
			// 	this.theme = res.appTheme
			// })
			// uni.onOsThemeChange((res: OsThemeChangeResult) => {
			// 	this.theme = res.osTheme
			// })
		},
		computed: {

			selectedDate(): string {
				const { year, month, day } = this.selected
				if (this.fields == 'year') {
					return `${year}`
				}
				if (this.fields == 'month') {
					return `${year}-${this.formatSingle(month)}`
				}
				if (this.fields == 'day') {
					return `${year}-${this.formatSingle(month)}-${this.formatSingle(day)}`
				}
				return `${year}-${this.formatSingle(month)}-${this.formatSingle(day)}`
			},
			year_str() {
				let years: string[] = []
				this.years.forEach((v: number) => {
					years.push(this.formatSingle(v) + '年')
				})
				return years.join('\n');
			},
			month_str() {
				let months: string[] = []
				this.months.forEach((v: number) => {
					months.push(this.formatSingle(v) + '月')
				})

				return months.join('\n');
			},
			day_str() {
				let days: string[] = []
				this.days.forEach((v: number) => {
					days.push(this.formatSingle(v) + '日')
				})
				return days.join('\n');
			},
			indicatorStyle() {
				let basestyle = 'height:50px;background:rgba(255,255,255,0);'
				let color = '#F5F5F5'
				if (this.theme == 'dark') {
					color = '#3B3B3B'
				}
				return basestyle + `border-top:1px ${color} solid;border-bottom:1px ${color} solid;`
			},
			// 取消文字
			cancelText(): string {
				return this.i18nHandle('cancel', '取消') as string
			},
			confirmText(): string {
				return this.i18nHandle('confirm', '确定') as string
			},
			yearText(): string {
				return this.i18nHandle('year', '年') as string
			},
			monthText(): string {
				return this.i18nHandle('month', '月') as string
			},
			dayText(): string {
				return this.i18nHandle('day', '日') as string
			},
			monthsText(): string[] {
				let months = this.months
				let i18months = this.i18nHandle('months', this.i18nText['zh-Hans']['months']) as string[]
				let arr: string[] = []
				months.forEach(v => {
					let index = v - 1
					arr.push(i18months[index].toString().padStart(2, '0'))
				})
				return arr
			}
		},
		onReady() {
			setTimeout(() => {
				this.show = true
			}, 10)
		},
		onResize() {},
		onUnload() {
			uni.$off(this.optionsEventName, null)
			uni.$off(this.cancelEventName, null)
		},

		methods: {
			/**
			 * picker确定事件
			 */
			confirm() {
				const value = this.eventValue
				const mode = this.mode
				switch (mode) {
					case 'selector':
						uni.$emit(this.selectorChangeEventName, value[0])
						break
					case 'multiSelector':
						uni.$emit(this.multiSelectorChangeEventName, value)
						break
					case 'time':
						const h = this.hours[value[0]]
						const m = this.minutes[value[1]]
						uni.$emit(this.timeChangeEventName, `${h}:${m}`)
						break
					case 'date':
						uni.$emit(this.timeChangeEventName, this.selectedDate)
						break
				}

				this.closeDialog()
			},

			/**
			 * picker关闭
			 */
			close() {
				uni.$emit(this.cancelEventName)
				this.closeDialog()
			},
			closeDialog() {
				this.show = false
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					const dialogPages = this.$page
					uni.closeDialogPage({
						dialogPage: dialogPages
					})
				}, 300)
			},

			/**
			 * 处理列滚动
			 */
			handleChange(e: { detail: { value: number[] } }) {
				const value = e.detail.value
				if (this.mode == 'date') {
					let yIdx = value[0]
					let mIdx = value[1] ?? 0;
					let dIdx = value[2] ?? 0;

					// 年份限制
					yIdx = Math.max(this.yearRange[0], Math.min(this.yearRange[1], yIdx));
					const currentYear = this.years[yIdx];

					let sy = parseInt(this.start[0])
					let sm = parseInt(this.start[1])

					let ey = parseInt(this.end[0])
					let em = parseInt(this.end[1])

					if (currentYear == sy || currentYear == ey) {
						let newMonths = this.getMonths(currentYear);
						if (this.months.length !== newMonths.length) {
							this.calculateRanges();
							// 获取原月份数值并查找在新数组中的索引
							const originalMonth = this.months[mIdx];
							mIdx = newMonths.findIndex(month => month === originalMonth);
							mIdx = Math.max(0, mIdx);
							this.months = newMonths;
						}

					} else {
						if (this.months.length != 12) {
							const nowMonth = this.months[mIdx]
							this.months = this.getMonths(currentYear)
							this.calculateRanges()
							mIdx = nowMonth - 1
						}
					}

					const months = this.months[mIdx];

					if ((currentYear == sy && months == sm) || (currentYear == ey && months == em)) {
						let newDays = this.getDays(currentYear, months)

						if (this.days.length != newDays.length) {
							this.calculateRanges()
							let dayIdx = newDays.length - 1
							if (currentYear == sy && months == sm) {
								dIdx = Math.max(0, dIdx - dayIdx);
							}
							if (currentYear == ey && months == em) {
								dIdx = Math.max(0, dayIdx);
							}
							this.days = newDays
						}
					} else {
						const nowDay = this.days[dIdx];
						this.days = this.getDays(currentYear, months);
						this.calculateRanges();
						dIdx = this.days.findIndex(day => day === nowDay);
						// 如果找不到，默认第一个
						dIdx = Math.max(0, dIdx);
					}

					// 更新最终索引
					this.value = [yIdx, mIdx, dIdx];

					this.selected.year = this.years[yIdx];
					this.selected.month = this.months[mIdx];
					this.selected.day = this.days[dIdx];

					this.eventValue = [...this.value];
					// 初始化动态列
				} else if (this.mode == 'time') {
					// 处理时间选择
					let h_idx = value[0];
					let m_idx = value[1];

					// 转换为数值
					let h = parseInt(this.hours[h_idx]);
					let m = parseInt(this.minutes[m_idx]);
					let sh = parseInt(this.start[0])
					let eh = parseInt(this.end[0])
					// 调整到合法时间
					const adjusted = this.adjustTime(h, m);
					h = adjusted.h;
					m = adjusted.m;

					// 补零并查找新索引
					const hStr = h.toString().padStart(2, '0');
					const mStr = m.toString().padStart(2, '0');
					const newHIdx = this.hours.findIndex(e => e == hStr);
					let newMIdx = this.minutes.findIndex(e => e == mStr);

					if (h == sh || h == eh) {
						const newMinutes = this.getMinutes(h);
						if (this.minutes.length !== newMinutes.length) {
							// 获取原分钟数值并查找新索引
							const originalMinute = this.minutes[newMIdx];
							newMIdx = newMinutes.findIndex(m => m === originalMinute);
							newMIdx = Math.max(0, newMIdx);
							this.minutes = newMinutes; // 修正拼写错误
						}
					} else {
						if (this.minutes.length != 60) {
							const nowMinutes = this.minutes[newMIdx]
							this.minutes = this.getMinutes(h)
							newMIdx = parseInt(nowMinutes) 
						}
					}

					// 更新value触发滚动
					if (newHIdx != h_idx || newMIdx != m_idx) {
						this.value = [newHIdx, newMIdx];
						this.eventValue = this.value.slice();
					} else {
						this.eventValue = value;
					}
				} else if (this.mode == 'multiSelector') {
					// 处理多列选择器变化
					const newValue = value
					const oldValue = this.prevMultiValue
					// 遍历比较每个列的变化
					newValue.forEach((val, column) => {
						if (oldValue[column] !== val) {
							uni.$emit(this.columnChangeEventName, column, val)
						}
					})
					// 更新历史值
					this.prevMultiValue = [...newValue]
					this.eventValue = [...newValue]
				} else {
					this.eventValue = value;
				}
			},

			/**
			 * 计算范围的方法
			 */
			calculateRanges() {
				const startYear = parseInt(this.start[0]);
				const endYear = parseInt(this.end[0]);
				this.yearRange = [
					this.years.findIndex(y => y >= startYear),
					this.years.findIndex(y => y >= endYear)
				];

				const startMonth = parseInt(this.start[1]);
				const endMonth = parseInt(this.end[1]);
				this.monthRange = [startMonth - 1, endMonth - 1]; // 转换为索引

				const startDay = parseInt(this.start[2]);
				const endDay = parseInt(this.end[2]);
				this.dayRange = [startDay - 1, endDay - 1]; // 转换为索引
			},

			/**
			 * 生成动态年份范围（根据 start/end）
			 */
			getYears() {
				// TODO 年份限制，注释内容会删除限制前后内容
				const startYear = parseInt(this.start[0] || '1970')
				const endYear = parseInt(this.end[0] || '2099')
				// const startYear = parseInt('1970')
				// const endYear = parseInt('2100')
				return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
			},

			/**
			 * 生成动态月份范围（根据当前年份和 start/end）
			 */
			getMonths(year: number) {
				let startMonth = 1;
				let endMonth = 12;

				// 当年份等于起始/结束年时限制月份范围
				if (year == parseInt(this.start[0])) {
					startMonth = parseInt(this.start[1]) ?? 1;
				}
				if (year == parseInt(this.end[0])) {
					endMonth = parseInt(this.end[1]) ?? 12;
				}
				return Array.from({ length: endMonth - startMonth + 1 }, (_, i) => startMonth + i)
			},

			/**
			 * 生成动态日期范围（根据当前年月和 start/end）
			 */
			getDays(currentYear: number, currentMonth: number) {

				let startDay = 1;
				let endDay = new Date(currentYear, currentMonth, 0).getDate();

				// 当年月等于起始/结束年月时限制日期范围
				if (currentYear == parseInt(this.start[0]) && currentMonth == parseInt(this.start[1])) {
					startDay = parseInt(this.start[2]) || 1;
				}
				if (currentYear == parseInt(this.end[0]) && currentMonth == parseInt(this.end[1])) {
					endDay = Math.min(endDay, parseInt(this.end[2]) || endDay);
				}

				return Array.from({ length: endDay - startDay + 1 }, (_, i) => startDay + i)
			},

			/**
			 * 更新日期列 级联更新
			 */
			updateDateColumns() {
				this.years = this.getYears()
				this.months = this.getMonths(this.selected.year)
				this.days = this.getDays(this.selected.year, this.selected.month)
			},

			// 日期合法性校验（核心）
			adjustDate(year: number, month: number, day: number) {
				const startDate = this.start.map(Number)
				let sy = startDate[0]
				let sm = startDate[1]
				let sd = startDate[2]
				const endDate = this.end.map(Number)
				let ey = endDate[0]
				let em = endDate[1]
				let ed = endDate[2]

				// 年份越界处理
				if (year < sy) return { year: sy, month: sm, day: sd }
				if (year > ey) return { year: ey, month: em, day: ed }

				// 月份越界处理（同年）
				if (year === sy && month < sm) return { year, month: sm, day: sd }
				if (year === ey && month > em) return { year, month: em, day: ed }

				// 日期越界处理（同年月）
				const daysInMonth = new Date(year, month, 0).getDate()
				if (year === sy && month === sm && day < sd) return { year, month, day: sd }
				if (year === ey && month === em && day > ed) return { year, month, day: ed }

				// 正常日期处理
				day = Math.max(1, Math.min(day, daysInMonth))
				return { year, month, day }
			},
			getHours() {
				const sH = parseInt(this.start[0] || '1')
				const eH = parseInt(this.end[0] || '12')
				return Array.from({ length: eH - sH + 1 }, (_, i) => String(sH + i).padStart(2, '0'))
			},
			getMinutes(hour: number) {
				let startMinute = 0;
				let endMinute = 59;

				// 当年份等于起始/结束年时限制月份范围
				if (hour == parseInt(this.start[0])) {
					startMinute = parseInt(this.start[1]) ?? 1;
				}
				if (hour == parseInt(this.end[0])) {
					endMinute = parseInt(this.end[1]) ?? 12;
				}
				return Array.from({ length: endMinute - startMinute + 1 }, (_, i) => String(startMinute + i).padStart(2, '0'))
			},

			updateTimeColumns() {
				this.hours = this.getHours()
				const now = new Date();
				const minutes = now.getHours()
				this.minutes = this.getMinutes(minutes)
			},

			/**
			 * 调整时间到允许范围内
			 */
			adjustTime(h: number, m: number): { h: number, m: number } {
				if (!this.start?.length || !this.end?.length) return { h, m };

				const startHour = parseInt(this.start[0]);
				const startMinute = parseInt(this.start[1]);
				const endHour = parseInt(this.end[0]);
				const endMinute = parseInt(this.end[1]);

				// 转换为总分钟比较
				const current = h * 60 + m;
				const startTotal = startHour * 60 + startMinute;
				const endTotal = endHour * 60 + endMinute;

				if (current < startTotal) {
					return { h: startHour, m: startMinute }; // 早于开始时间
				} else if (current > endTotal) {
					return { h: endHour, m: endMinute }; // 晚于结束时间
				} else {
					// 检查分钟边界
					if (h == startHour && m < startMinute) return { h, m: startMinute };
					if (h == endHour && m > endMinute) return { h, m: endMinute };
					return { h, m };
				}
			},

			/**
			 * 初始化时处理默认时间
			 */
			initTimeValue(time: string[]) {
				let h = parseInt(time[0]);
				let m = parseInt(time[1]);
				const adjusted = this.adjustTime(h, m);
				const hStr = adjusted.h.toString().padStart(2, '0');
				const mStr = adjusted.m.toString().padStart(2, '0');
				return [
					this.hours.findIndex(e => e == hStr),
					this.minutes.findIndex(e => e == mStr)
				];
			},

			/**
			 * 更新当月天数
			 */
			updateDays() {
				const daysInMonth = new Date(this.selected.year, this.selected.month, 0).getDate()
				this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
			},

			/**
			 *  补零函数（1 → "01"）
			 */
			formatSingle(num: number): string {
				return num.toString().padStart(2, '0')
			},
			/**
			 * i18n 处理
			 */
			i18nHandle(key: string, defaultVal: any): any {
				if (this.language.startsWith('en')) {
					return this.i18nText['en'][key] as string
				}
				if (this.language.startsWith('es')) {
					return this.i18nText['es'][key] as string
				}
				if (this.language.startsWith('fr')) {
					return this.i18nText['fr'][key] as string
				}
				if (this.language.startsWith('zh-Hans')) {
					return this.i18nText['zh-Hans'][key] as string
				}
				if (this.language.startsWith('zh-Hant')) {
					return this.i18nText['zh-Hant'][key] as string
				}
				return defaultVal
			}
		}
	}
</script>

<style>
	.uni-picker__container {
		flex: 1;
	}

	.uni-picer__mask {
		flex: 1;
		background-color: rgba(0, 0, 0, .3);
		opacity: 0;
		transition-property: opacity;
		transition-duration: 0.3s;
	}

	.picker__ani-show {
		opacity: 1;
	}

	.uni-picker__inner-box {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 350px;

		transform: translateY(100%);
		transition-property: transform;
		transition-duration: 0.2s;

	}



	.picker__ani-box-show {
		transform: translateY(0%);
	}

	.uni-picker__header-btn {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 15px;
		border-bottom: 1px #f7f7f7 solid;
	}

	.uni-picker__header-btn-cannel {
		font-size: 14px;
		background-color: transparent;
	}

	.uni-picker__header-btn-ok {
		font-size: 14px;
		color: #007aff;
	}

	.uni-picker__view {
		position: relative;
		flex: 1;
	}

	.uni-picker__inner-mask {
		position: absolute;
		left: 0;
		right: 0;
		width: 100%;
		height: 40%;
		/* background-color: red; */
		z-index: 2;
		pointer-events: none;
	}



	.uni-picker__view-item {
		width: 100%;
		text-align: center;
		height: 50px;
		line-height: 50px;
	}

	/* 更改主题 */
	.uni-picker-theme--light .uni-picker__inner-box {
		background-color: #fff;
	}

	.uni-picker-theme--light .uni-picker__header-btn-cannel {
		color: #000;
	}


	.uni-picker-theme--light .picker-top {
		top: 0;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
	}

	.uni-picker-theme--light .picker-bottom {
		bottom: 0;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
	}

	.uni-picker-theme--dark .uni-picker__inner-box {
		background-color: #2C2C2B;
	}

	.uni-picker-theme--dark .uni-picker__header-btn-cannel {
		color: #fff;
	}

	.uni-picker-theme--dark .picker-top {
		top: 0;
		background: linear-gradient(to bottom, rgba(44, 44, 43, 1), rgba(0, 0, 0, 0));
	}

	.uni-picker-theme--dark .picker-bottom {
		bottom: 0;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(44, 44, 43, 1));
	}

	.uni-picker-theme--dark .uni-picker__view-item {
		color: #fff;
	}

	.uni-picker-theme--dark .uni-picker__header-btn {
		border-color: #3B3B3B;
	}
</style>