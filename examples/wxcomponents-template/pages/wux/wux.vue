<template>
	<view>
		<view class="title">日历组件</view>
		<wux-calendar id="wux-calendar" />

		<wux-cell-group title="Calendar">
			<wux-cell title="单选" :extra="value1" @click="openCalendar1"></wux-cell>
			<wux-cell title="多选" :extra="value2" @click="openCalendar2"></wux-cell>
			<wux-cell title="Direction = Vertical" :extra="value3" @click="openCalendar3"></wux-cell>
			<wux-cell title="MinDate & MaxDate" :extra="value4" @click="openCalendar4"></wux-cell>
		</wux-cell-group>
	</view>
</template>

<script>
	import {
		$wuxCalendar
	} from '@/wxcomponents/wux-weapp/dist/index.js'

	export default {
		data() {
			return {
				value1: [],
				value2: [],
				value3: [],
				value4: [],
			}
		},
		methods: {
			openCalendar1() {
				$wuxCalendar().open({
					value: this.value1,
					onChange: (values, displayValues) => {
						console.log('onChange', values, displayValues)
						this.value1 = displayValues
					},
				})
			},
			openCalendar2() {
				$wuxCalendar().open({
					value: this.value2,
					multiple: true,
					onChange: (values, displayValues) => {
						console.log('onChange', values, displayValues)
						this.value2 = displayValues
					},
				})
			},
			openCalendar3() {
				$wuxCalendar().open({
					value: this.value3,
					direction: 'vertical',
					onChange: (values, displayValues) => {
						console.log('onChange', values, displayValues)
						this.value3 = displayValues
					},
				})
			},
			openCalendar4() {
				const now = new Date()
				const minDate = now.getTime()
				const maxDate = now.setDate(now.getDate() + 7)

				$wuxCalendar().open({
					value: this.value4,
					minDate,
					maxDate,
					onChange: (values, displayValues) => {
						console.log('onChange', values, displayValues)
						this.value4 = displayValues
					},
				})
			}
		}
	}
</script>

<style>

</style>
