<template>
  <uni-progress
    class="uni-progress"
    v-on="$listeners"
  >
    <div
      :style="outerBarStyle"
      class="uni-progress-bar"
    >
      <div
        :style="innerBarStyle"
        class="uni-progress-inner-bar"
      />
    </div>
    <template v-if="showInfo">
      <p class="uni-progress-info">
        {{ currentPercent }}%
      </p>
    </template>
  </uni-progress>
</template>
<script>
const VALUES = {
  activeColor: '#007AFF',
  backgroundColor: '#EBEBEB',
  activeMode: 'backwards'
}
export default {
  name: 'Progress',
  props: {
    percent: {
      type: [Number, String],
      default: 0,
      validator (value) {
        return !isNaN(parseFloat(value, 10))
      }
    },
    showInfo: {
      type: [Boolean, String],
      default: false
    },
    strokeWidth: {
      type: [Number, String],
      default: 6,
      validator (value) {
        return !isNaN(parseFloat(value, 10))
      }
    },
    color: {
      type: String,
      default: VALUES.activeColor
    },
    activeColor: {
      type: String,
      default: VALUES.activeColor
    },
    backgroundColor: {
      type: String,
      default: VALUES.backgroundColor
    },
    active: {
      type: [Boolean, String],
      default: false
    },
    activeMode: {
      type: String,
      default: VALUES.activeMode
    }
  },
  data () {
    return {
      currentPercent: 0,
      strokeTimer: 0,
      lastPercent: 0
    }
  },
  computed: {
    outerBarStyle () {
      return `background-color: ${this.backgroundColor}; height: ${this.strokeWidth}px;`
    },
    innerBarStyle () {
      // 兼容下不推荐的属性，activeColor 优先级高于 color。
      let backgroundColor = ''
      if (this.color !== VALUES.activeColor && this.activeColor === VALUES.activeColor) {
        backgroundColor = this.color
      } else {
        backgroundColor = this.activeColor
      }
      return `width: ${this.currentPercent}%;background-color: ${backgroundColor}`
    },
    realPercent () {
      // 确保最终计算时使用的是 Number 类型的值，并且在有效范围内。
      let realValue = parseFloat(this.percent, 10)
      realValue < 0 && (realValue = 0)
      realValue > 100 && (realValue = 100)
      return realValue
    }
  },
  watch: {
    realPercent (newValue, oldValue) {
      this.strokeTimer && clearInterval(this.strokeTimer)
      this.lastPercent = oldValue || 0
      this._activeAnimation()
    }
  },
  created () {
    this._activeAnimation()
  },
  methods: {
    _activeAnimation () {
      if (this.active) {
        this.currentPercent = this.activeMode === VALUES.activeMode ? 0 : this.lastPercent
        this.strokeTimer = setInterval(() => {
          if (this.currentPercent + 1 > this.realPercent) {
            this.currentPercent = this.realPercent
            this.strokeTimer && clearInterval(this.strokeTimer)
          } else {
            this.currentPercent += 1
          }
        }, 30)
      } else {
        this.currentPercent = this.realPercent
      }
    }
  }
}
</script>
<style>
	uni-progress {
		display: -webkit-flex;
		display: flex;
		-webkit-align-items: center;
		align-items: center;
	}

	uni-progress[hidden] {
		display: none;
	}

	.uni-progress-bar {
		-webkit-flex: 1;
		flex: 1;
	}

	.uni-progress-inner-bar {
		width: 0;
		height: 100%;
	}

	.uni-progress-info {
		margin-top: 0;
		margin-bottom: 0;
		min-width: 2em;
		margin-left: 15px;
		font-size: 16px;
	}
</style>
