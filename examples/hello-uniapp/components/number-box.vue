<template>
	<view class="uni-numbox">
		<view class="uni-numbox-minus" :class="{'uni-numbox-disabled': disableSubtract}" @click="_subtract">-</view>
		<input class="uni-numbox-value" type="number" :disabled="disabled" v-model="value" @blur="_handleBlur">
		<view class="uni-numbox-plus" :class="{'uni-numbox-disabled': disableAdd}" @click="_add">+</view>
	</view>
</template>
<script>
	export default {
		name: 'number-box',
		props: {
			value: {
				type: Number,
				default: 0
			},
			min: {
				type: Number,
				default: -Infinity
			},
			max: {
				type: Number,
				default: Infinity
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			disableSubtract() {
				return this.value <= this.min
			},
			disableAdd() {
				return this.value >= this.max
			}
		},
		onUnload() {
			// 目前为解决页面重新进入组件不更新的问题，这里主动重置下数据。
			this.value = 0;
			this.step = 1;
			this.max = Infinity;
			this.min = -Infinity;
		},
		methods: {
			_subtract(evt) {
				this._calcValue('subtract');
			},
			_add(evt) {
				this._calcValue('add');
			},
			_calcValue(type) {
				const scale = this._getDecimalScale();
				let value = this.value * scale;
				let step = this.step * scale;

				if (type === 'subtract') {
					value -= step
				} else if (type === 'add') {
					value += step
				}
				if (value < this.min || value > this.max) {
					return
				}
				console.log('value:' + value);
				this.value = value / scale;
			},
			_getDecimalScale() {
				let scale = 1;
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, (this.step + '').split('.')[1].length);
				}
				return scale;
			},
			_handleBlur(evt) {
				let value = evt.detail.value;
				if (!value) {
					this.value = 0;
					return
				}
				value = +value;
				if (value > this.max) {
					value = this.max;
				} else if (value < this.min) {
					value = this.min
				}
				this.value = value
			}
		},
		watch: {
			value(val) {
				this.$emit('update', val);
			}
		}
	}
</script>
<style>
	.uni-numbox {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		height: 70upx;
	}

	.uni-numbox-minus,
	.uni-numbox-plus {
		margin: 0;
		background-color: #f9f9f9;
		width: 80upx;
		height: 100%;
		line-height: 70upx;
		text-align: center;
		color: #555555;
	}

	.uni-numbox-minus {
		border: 2upx solid #cccccc;
		border-right: none;
		border-top-left-radius: 6upx;
		border-bottom-left-radius: 6upx;
	}

	.uni-numbox-plus {
		border: 2upx solid #cccccc;
		border-left: none;
		border-top-right-radius: 6upx;
		border-bottom-right-radius: 6upx;
	}

	.uni-numbox-value {
		border: 2upx solid #cccccc;
		background-color: #ffffff;
		width: 80upx;
		height: 100%;
		text-align: center;
	}

	.uni-numbox-disabled {
		color: #c0c0c0;
	}
</style>
