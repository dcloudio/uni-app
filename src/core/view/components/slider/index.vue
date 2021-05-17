<template>
  <uni-slider
    ref="uni-slider"
    v-on="$listeners"
    @click="_onClick"
  >
    <div class="uni-slider-wrapper">
      <div class="uni-slider-tap-area">
        <div
          :style="setBgColor"
          class="uni-slider-handle-wrapper"
        >
          <div
            ref="uni-slider-handle"
            :style="setBlockBg"
            class="uni-slider-handle"
          />
          <div
            :style="setBlockStyle"
            class="uni-slider-thumb"
          />
          <div
            :style="setActiveColor"
            class="uni-slider-track"
          />
        </div>
      </div>
      <span
        v-show="showValue"
        ref="uni-slider-value"
        class="uni-slider-value"
      >{{ sliderValue }}</span>
    </div>
    <slot />
  </uni-slider>
</template>
<script>
import {
  emitter,
  listeners
} from 'uni-mixins'
import touchtrack from 'uni-mixins/touchtrack'

// 处理js计算小数时的精度问题
var computeController = {
  add: function (arg) {
    var r1, r2, m
    try {
      // 获得小数位数
      r1 = this.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      // 获得小数位数
      r2 = arg.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (this * m + arg * m) / m
  },
  sub: function (arg) {
    return this.add(-arg)
  },
  mul: function (arg) {
    var m = 0; var s1 = this.toString(); var s2 = arg.toString()
    try {
      // 获得小数位数
      m += s1.split('.')[1].length
    } catch (e) { }
    try {
      // 获得小数位数
      m += s2.split('.')[1].length
    } catch (e) { }
    // 转为十进制计算后，要除以两个数的共同小数位数
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  },
  div: function (arg) {
    var t1 = 0; var t2 = 0; var r1; var r2
    try {
      // 获得小数位数
      t1 = this.toString().split('.')[1].length
    } catch (e) { }
    try {
      // 获得小数位数
      t2 = arg.toString().split('.')[1].length
    } catch (e) { }
    r1 = Number(this.toString().replace('.', ''))
    r2 = Number(arg.toString().replace('.', ''))
    // 转为十进制计算后，要乘以除数与被除数小数位数的差
    return (r1 / r2) * Math.pow(10, t2 - t1)
  },
  mod: function (arg) {
    var t1 = 0; var t2 = 0; var r1; var r2
    try {
      t1 = this.toString().split('.')[1].length
    } catch (e) { }
    try {
      t2 = arg.toString().split('.')[1].length
    } catch (e) { }
    // 小数位数
    var digit = Math.pow(10, Math.abs(t1 - t2))
    // eslint-disable-next-line eqeqeq
    if (digit == 1) { digit = Math.pow(10, t1) }
    // 计算余数
    r1 = (this * digit).toString().split('.')[0]
    r2 = arg * digit
    // 小数点后数字，直接拼接上即可
    var decimals = (this * digit).toString().split('.')[1] ? (this * digit).toString().split('.')[1] : ''
    return (r1 % r2 + decimals) / digit
  }
}

export default {
  name: 'Slider',
  mixins: [emitter, listeners, touchtrack],
  props: {
    name: {
      type: String,
      default: ''
    },
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    value: {
      type: [Number, String],
      default: 0
    },
    step: {
      type: [Number, String],
      default: 1
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: '#e9e9e9'
    },
    backgroundColor: {
      type: String,
      default: '#e9e9e9'
    },
    activeColor: {
      type: String,
      default: '#007aff'
    },
    selectedColor: {
      type: String,
      default: '#007aff'
    },
    blockColor: {
      type: String,
      default: '#ffffff'
    },
    blockSize: {
      type: [Number, String],
      default: 28
    },
    showValue: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      sliderValue: Number(this.value)
    }
  },
  computed: {
    setBlockStyle () {
      return {
        width: this.blockSize + 'px',
        height: this.blockSize + 'px',
        marginLeft: -this.blockSize / 2 + 'px',
        marginTop: -this.blockSize / 2 + 'px',
        left: this._getValueWidth(),
        backgroundColor: this.blockColor
      }
    },
    setBgColor () {
      return {
        backgroundColor: this._getBgColor()
      }
    },
    setBlockBg () {
      return {
        left: this._getValueWidth()
      }
    },
    setActiveColor () { // 有问题，设置最大值最小值是有问题
      return {
        backgroundColor: this._getActiveColor(),
        width: this._getValueWidth()
      }
    }
  },
  watch: {
    value (val) {
      this.sliderValue = Number(val)
    }
  },
  mounted () {
    this.touchtrack(this.$refs['uni-slider-handle'], '_onTrack')
  },
  created () {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    })
  },
  beforeDestroy () {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    })
  },
  methods: {
    _onUserChangedValue (e) {
      const sliderRightBox = this.$refs['uni-slider-value']
      const sliderRightBoxLeft = getComputedStyle(sliderRightBox, null).marginLeft
      let sliderRightBoxWidth = sliderRightBox.offsetWidth
      sliderRightBoxWidth = sliderRightBoxWidth + parseInt(sliderRightBoxLeft)
      const slider = this.$refs['uni-slider']
      const offsetWidth = slider.offsetWidth - (this.showValue ? sliderRightBoxWidth : 0)
      const boxLeft = slider.getBoundingClientRect().left
      const value = (e.x - boxLeft) * (this.max - this.min) / offsetWidth + Number(this.min)
      this.sliderValue = this._filterValue(value)
    },
    _filterValue (e) {
      const max = Number(this.max)
      const min = Number(this.min)
      return e < min ? min : e > max ? max : computeController.mul.call(Math.round((e - min) / this.step), this.step) + min
    },
    _getValueWidth () {
      return 100 * (this.sliderValue - this.min) / (this.max - this.min) + '%'
    },
    _getBgColor () {
      return this.backgroundColor !== '#e9e9e9' ? this.backgroundColor : (this.color !== '#007aff' ? this.color
        : '#007aff')
    },
    _getActiveColor () {
      return this.activeColor !== '#007aff' ? this.activeColor : (this.selectedColor !== '#e9e9e9' ? this.selectedColor
        : '#e9e9e9')
    },
    _onTrack: function (e) {
      if (!this.disabled) {
        return e.detail.state === 'move' ? (this._onUserChangedValue({
          x: e.detail.x
        }), this.$trigger('changing', e, {
          value: this.sliderValue
        }), !1) : (e.detail.state === 'end' && this.$trigger('change', e, {
          value: this.sliderValue
        }))
      }
    },
    _onClick ($event) {
      if (this.disabled) {
        return
      }
      this._onUserChangedValue($event)
      this.$trigger('change', $event, {
        value: this.sliderValue
      })
    },
    _resetFormData () {
      this.sliderValue = this.min
    },
    _getFormData () {
      const data = {}
      if (this.name !== '') {
        data.value = this.sliderValue
        data.key = this.name
      }
      return data
    }
  }
}
</script>
<style>
	uni-slider {
		margin: 10px 18px;
		padding: 0;
		display: block;
	}

	uni-slider[hidden] {
		display: none;
	}

	uni-slider .uni-slider-wrapper {
		display: -webkit-flex;
		display: flex;
		-webkit-align-items: center;
		align-items: center;
		min-height: 16px;
	}

	uni-slider .uni-slider-tap-area {
		-webkit-flex: 1;
		flex: 1;
		padding: 8px 0;
	}

	uni-slider .uni-slider-handle-wrapper {
		position: relative;
		height: 2px;
		border-radius: 5px;
		background-color: #e9e9e9;
		cursor: pointer;
		transition: background-color 0.3s ease;
		-webkit-tap-highlight-color: transparent;
	}

	uni-slider .uni-slider-track {
		height: 100%;
		border-radius: 6px;
		background-color: #007aff;
		transition: background-color 0.3s ease;
	}

	uni-slider .uni-slider-handle,
	uni-slider .uni-slider-thumb {
		position: absolute;
		left: 50%;
		top: 50%;
		cursor: pointer;
		border-radius: 50%;
		transition: border-color 0.3s ease;
	}

	uni-slider .uni-slider-handle {
		width: 28px;
		height: 28px;
		margin-top: -14px;
		margin-left: -14px;
		background-color: transparent;
		z-index: 3;
		cursor: grab;
	}

	uni-slider .uni-slider-thumb {
		z-index: 2;
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
	}

	uni-slider .uni-slider-step {
		position: absolute;
		width: 100%;
		height: 2px;
		background: transparent;
		z-index: 1;
	}

	uni-slider .uni-slider-value {
    width: 3ch;
		color: #888;
		font-size: 14px;
		margin-left: 1em;
	}

	uni-slider .uni-slider-disabled .uni-slider-track {
		background-color: #ccc;
	}

	uni-slider .uni-slider-disabled .uni-slider-thumb {
		background-color: #FFF;
		border-color: #ccc;
	}
</style>
