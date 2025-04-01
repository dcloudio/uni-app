<template>
	<view class="uni-picker__container">
		<view class="uni-picer__mask" :class="{'picker__ani-show': show}" @click="close"></view>
		<view class="uni-picker__inner-box" :class="{'picker__ani-box-show':show}">
			<view class="uni-picker__header-btn">
				<text class="uni-picker__header-btn-cannel" @click="close">取消</text>
				<text class="uni-picker__header-btn-ok" @click="confirm">确定</text>
			</view>
			<view class="uni-picker__view">
				<picker-view style="flex:1" @change="handleChange" :indicatorStyle="indicatorStyle" :value="value">
					<template v-if="mode == 'selector'">
						<picker-view-column>
							<template v-for="(item,selectorIdx) in range" :key="selectorIdx">
								<view class="uni-picker__view-item">
									<text v-if="rangeKey">{{item[rangeKey]}}</text>
									<text v-else>{{item}}</text>
								</view>
							</template>
						</picker-view-column>
					</template>
					<template v-if="mode == 'multiSelector'">
						<template v-for="(item,multiIdx) in range" :key="multiIdx">
							<picker-view-column>
								<template v-for="(column,colIdx) in item" :key="colIdx">
									<view class="uni-picker__view-item">
										<text v-if="rangeKey">{{column[rangeKey]}}</text>
										<text v-else>{{column}}</text>
									</view>
								</template>
							</picker-view-column>
						</template>
					</template>
					<template v-if="mode == 'time'">
						<picker-view-column>
							<template v-for="(h,hIdx) in hours" :key="hIdx">
								<view class="uni-picker__view-item">
									<text>{{h}}</text>
								</view>
							</template>
						</picker-view-column>
						<picker-view-column>
							<template v-for="(m,mIdx) in minutes" :key="mIdx">
								<view class="uni-picker__view-item">
									<text>{{m}}</text>
								</view>
							</template>
						</picker-view-column>
					</template>
					<template v-if="mode == 'date'">
						<picker-view-column>
							<view v-for="year in years" :key="year" class="uni-picker__view-item">
								<text>{{year}}年</text>
							</view>
						</picker-view-column>
						<picker-view-column v-if="fields != 'year'">
							<view v-for="month in months" :key="month" class="uni-picker__view-item">{{formatSingle(month)}}月</view>
						</picker-view-column>
						<picker-view-column v-if="fields == 'day'">
							<view v-for="day in days" :key="day" class="uni-picker__view-item">{{formatSingle(day)}}日</view>
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
	}

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
				fields: 'day',
				start: [] as string[],
				end: [] as string[],
				yearRange: [] as number[],
				monthRange: [] as number[],
				dayRange: [] as number[],
				indicatorStyle: "border-top:1px #f5f5f5 solid;border-bottom:1px #f5f5f5 solid;background:rgba(255,255,255,0);"
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
					this.start = data['start']
					this.end = data['end']

					this.value = this.initTimeValue(time);
				}

				if (data['dateValue'] != null) {
					const dateValue = data['dateValue']
					const year = dateValue[0]
					const month = dateValue[1]
					const day = dateValue[2]
					this.fields = data['fields']
					// 解析起止日期
					this.start = data['start'] || ['1970', '01', '01']
					this.end = data['end'] || ['2099', '12', '31']

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
		},
		computed: {
			hours() {
				return Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
			},
			minutes() {
				return Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))
			},
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

				const dialogPages = this.$page
				uni.closeDialogPage({
					dialogPage: dialogPages
				})
			},

			/**
			 * picker关闭
			 */
			close() {
				const dialogPages = this.$page
				uni.$emit(this.cancelEventName)
				uni.closeDialogPage({
					dialogPage: dialogPages
				})
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
					const year = this.years[yIdx];

					// 月份联动限制
					if (year === parseInt(this.start[0])) {
						mIdx = Math.max(this.monthRange[0], mIdx);
					}
					if (year === parseInt(this.end[0])) {
						mIdx = Math.min(this.monthRange[1], mIdx);
					}
					const month = this.months[mIdx];

					// 日期联动限制
					const maxDay = new Date(year, month, 0).getDate();
					dIdx = Math.min(dIdx, maxDay - 1);

					if (year === parseInt(this.start[0]) && month === parseInt(this.start[1])) {
						dIdx = Math.max(this.dayRange[0], dIdx);
					}
					if (year === parseInt(this.end[0]) && month === parseInt(this.end[1])) {
						dIdx = Math.min(this.dayRange[1], dIdx);
					}

					// 更新最终索引
					this.value = [yIdx, mIdx, dIdx];

					this.selected.year = this.years[yIdx];
					this.selected.month = this.months[mIdx];
					this.selected.day = this.days[dIdx];

					this.eventValue = [...this.value];
				} else if (this.mode == 'time') {
					// 处理时间选择
					let h_idx = value[0];
					let m_idx = value[1];

					// 转换为数值
					let h = parseInt(this.hours[h_idx]);
					let m = parseInt(this.minutes[m_idx]);

					// 调整到合法时间
					const adjusted = this.adjustTime(h, m);
					h = adjusted.h;
					m = adjusted.m;

					// 补零并查找新索引
					const hStr = h.toString().padStart(2, '0');
					const mStr = m.toString().padStart(2, '0');
					const newHIdx = this.hours.findIndex(e => e == hStr);
					const newMIdx = this.minutes.findIndex(e => e == mStr);

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
				// const startYear = parseInt(this.start[0] || '1970')
				// const endYear = parseInt(this.end[0] || '2099')
				const startYear = parseInt('1900')
				const endYear = parseInt('2100')
				return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
			},

			/**
			 * 生成动态月份范围（根据当前年份和 start/end）
			 */
			getMonths() {
				let startMonth = 1
				let endMonth = 12

				return Array.from({ length: endMonth - startMonth + 1 }, (_, i) => startMonth + i)
			},

			/**
			 * 生成动态日期范围（根据当前年月和 start/end）
			 */
			getDays(currentYear: number, currentMonth: number) {
				let startDay = 1
				let endDay = new Date(currentYear, currentMonth, 0).getDate()
				return Array.from({ length: endDay - startDay + 1 }, (_, i) => startDay + i)
			},

			/**
			 * 更新日期列 级联更新
			 */
			updateDateColumns() {
				this.years = this.getYears()
				this.months = this.getMonths()
				this.days = this.getDays(this.selected.year, this.selected.month)
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
		background-color: #fff;
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
	}

	.uni-picker__header-btn-ok {
		font-size: 14px;
		color: #007aff;
	}

	.uni-picker__view {
		flex: 1;
	}

	.uni-picker__view-item {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
	}
</style>