<template>
  <uni-picker
    :disabled="disabled"
    @click.stop="_show"
    v-on="$listeners"
  >
    <div
      ref="picker"
      class="uni-picker-container"
      @touchmove.prevent
    >
      <transition name="uni-fade">
        <div
          v-show="visible"
          class="uni-mask"
          @click="_cancel"
        />
      </transition>
      <div
        :class="{'uni-picker-toggle':visible}"
        class="uni-picker"
      >
        <div
          class="uni-picker-header"
          @click.stop
        >
          <div
            class="uni-picker-action uni-picker-action-cancel"
            @click="_cancel"
          >
            取消
          </div>
          <div
            class="uni-picker-action uni-picker-action-confirm"
            @click="_change"
          >
            确定
          </div>
        </div>
        <v-uni-picker-view
          v-if="visible"
          :value.sync="valueArray"
          class="uni-picker-content"
        >
          <v-uni-picker-view-column
            v-for="(rangeItem,index0) in rangeArray"
            :key="index0"
          >
            <div
              v-for="(item,index) in rangeItem"
              :key="index"
              class="uni-picker-item"
            >
              {{ typeof item==='object'?item[rangeKey]||'':item }}{{ units[index0]||'' }}
            </div>
          </v-uni-picker-view-column>
        </v-uni-picker-view>
        <!-- 第二种时间单位展示方式-暂时不用这种 -->
        <!-- <div v-if="units.length" class="uni-picker-units">
        <div v-for="(item,index) in units" :key="index">{{item}}</div>
        </div>-->
      </div>
    </div>
    <div>
      <slot />
    </div>
  </uni-picker>
</template>

<script>
import { emitter } from 'uni-mixins'
import { formatDateTime } from 'uni-shared'

function getDefaultStartValue () {
  if (this.mode === mode.TIME) {
    return '00:00'
  }
  if (this.mode === mode.DATE) {
    const year = new Date().getFullYear() - 100
    switch (this.fields) {
      case fields.YEAR:
        return year
      case fields.MONTH:
        return year + '-01'
      case fields.DAY:
        return year + '-01-01'
    }
  }
  return ''
}

function getDefaultEndValue () {
  if (this.mode === mode.TIME) {
    return '23:59'
  }
  if (this.mode === mode.DATE) {
    const year = new Date().getFullYear() + 100
    switch (this.fields) {
      case fields.YEAR:
        return year
      case fields.MONTH:
        return year + '-12'
      case fields.DAY:
        return year + '-12-31'
    }
  }
  return ''
}

const mode = {
  SELECTOR: 'selector',
  MULTISELECTOR: 'multiSelector',
  TIME: 'time',
  DATE: 'date'
  // 暂不支持城市选择
  // REGION: 'region'
}
const fields = {
  YEAR: 'year',
  MONTH: 'month',
  DAY: 'day'
}
export default {
  name: 'Picker',
  mixins: [emitter],
  props: {
    name: {
      type: String,
      default: ''
    },
    range: {
      type: Array,
      default () {
        return []
      }
    },
    rangeKey: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String, Array],
      default: 0
    },
    mode: {
      type: String,
      default: mode.SELECTOR,
      validator (val) {
        return Object.values(mode).indexOf(val) >= 0
      }
    },
    fields: {
      type: String,
      default: 'day',
      validator (val) {
        return Object.values(fields).indexOf(val) >= 0
      }
    },
    start: {
      type: String,
      default: getDefaultStartValue
    },
    end: {
      type: String,
      default: getDefaultEndValue
    },
    disabled: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      valueSync: null,
      visible: false,
      valueChangeSource: '',
      timeArray: [],
      dateArray: [],
      valueArray: [],
      oldValueArray: []
    }
  },
  computed: {
    rangeArray () {
      var val = this.range
      switch (this.mode) {
        case mode.SELECTOR:
          return [val]
        case mode.MULTISELECTOR:
          return val
        case mode.TIME:
          return this.timeArray
        case mode.DATE:
        {
          const dateArray = this.dateArray
          switch (this.fields) {
            case fields.YEAR:
              return [dateArray[0]]
            case fields.MONTH:
              return [dateArray[0], dateArray[1]]
            case fields.DAY:
              return [dateArray[0], dateArray[1], dateArray[2]]
          }
        }
      }
      return []
    },
    startArray () {
      return this._getDateValueArray(this.start, getDefaultStartValue.bind(this)())
    },
    endArray () {
      return this._getDateValueArray(this.end, getDefaultEndValue.bind(this)())
    },
    units () {
      switch (this.mode) {
        case mode.DATE:
          return ['年', '月', '日']
        case mode.TIME:
          return ['时', '分']
        default:
          return []
      }
    }
  },
  watch: {
    value () {
      this._setValueSync()
    },
    mode () {
      this._setValueSync()
    },
    range () {
      this._setValueSync()
    },
    valueSync () {
      this._setValueArray()
    },
    valueArray (val) {
      if (this.mode === mode.TIME || this.mode === mode.DATE) {
        const getValue =
          this.mode === mode.TIME ? this._getTimeValue : this._getDateValue
        const valueArray = this.valueArray
        const startArray = this.startArray
        const endArray = this.endArray
        if (this.mode === mode.DATE) {
          const dateArray = this.dateArray
          const max = dateArray[2].length
          const day = Number(dateArray[2][valueArray[2]]) || 1
          const realDay = new Date(
            `${dateArray[0][valueArray[0]]}/${
              dateArray[1][valueArray[1]]
            }/${day}`
          ).getDate()
          if (realDay < day) {
            valueArray[2] -= realDay + max - day
          }
        }
        if (getValue(valueArray) < getValue(startArray)) {
          this._cloneArray(valueArray, startArray)
        } else if (getValue(valueArray) > getValue(endArray)) {
          this._cloneArray(valueArray, endArray)
        }
      }
      val.forEach((value, column) => {
        if (value !== this.oldValueArray[column]) {
          this.oldValueArray[column] = value
          if (this.mode === mode.MULTISELECTOR) {
            this.$trigger('columnchange', {}, {
              column,
              value
            }
            )
          }
        }
      })
    }
  },
  created () {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    })
    this._createTime()
    this._createDate()
    this._setValueSync()
  },
  beforeDestroy () {
    this.$refs.picker.remove()
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    })
  },
  methods: {
    _show () {
      if (this.disabled) {
        return
      }
      this.valueChangeSource = ''
      var $picker = this.$refs.picker
      $picker.remove();
      (document.querySelector('uni-app') || document.body).appendChild($picker)
      $picker.style.display = 'block'
      setTimeout(() => {
        this.visible = true
      }, 20)
    },
    _getFormData () {
      return {
        value: this.valueSync,
        key: this.name
      }
    },
    _resetFormData () {
      switch (this.mode) {
        case mode.SELECTOR:
          this.valueSync = -1
          break
        case mode.MULTISELECTOR:
          this.valueSync = this.value.map(val => 0)
          break
        case mode.DATE:
        case mode.TIME:
          this.valueSync = ''
          break
        default:
          break
      }
    },
    _createTime () {
      var hours = []
      var minutes = []
      hours.splice(0, hours.length)
      for (let i = 0; i < 24; i++) {
        hours.push((i < 10 ? '0' : '') + i)
      }
      minutes.splice(0, minutes.length)
      for (let i = 0; i < 60; i++) {
        minutes.push((i < 10 ? '0' : '') + i)
      }
      this.timeArray.push(hours, minutes)
    },
    _createDate () {
      var years = []
      var year = new Date().getFullYear()
      for (let i = year - 150, end = year + 150; i <= end; i++) {
        years.push(String(i))
      }
      var months = []
      for (let i = 1; i <= 12; i++) {
        months.push((i < 10 ? '0' : '') + i)
      }
      var days = []
      for (let i = 1; i <= 31; i++) {
        days.push((i < 10 ? '0' : '') + i)
      }
      this.dateArray.push(years, months, days)
    },
    _getTimeValue (val) {
      return val[0] * 60 + val[1]
    },
    _getDateValue (val) {
      return val[0] * 366 + (val[1] || 0) * 31 + (val[2] || 0)
    },
    /**
     * 将右侧数组值同步到左侧（交集部分）
     */
    _cloneArray (val1, val2) {
      for (let i = 0; i < val1.length && i < val2.length; i++) {
        val1[i] = val2[i]
      }
    },
    _setValueSync () {
      let val = this.value
      switch (this.mode) {
        case mode.MULTISELECTOR:
          {
            if (!Array.isArray(val)) {
              val = []
            }
            if (!Array.isArray(this.valueSync)) {
              this.valueSync = []
            }
            const length = this.valueSync.length = Math.max(val.length, this.range.length)
            for (let index = 0; index < length; index++) {
              const val0 = Number(val[index])
              const val1 = Number(this.valueSync[index])
              const val2 = isNaN(val0) ? (isNaN(val1) ? 0 : val1) : val0
              const maxVal = this.range[index] ? this.range[index].length - 1 : 0
              this.valueSync.splice(index, 1, val2 > maxVal ? 0 : val2)
            }
          }
          break
        case mode.TIME:
        case mode.DATE:
          this.valueSync = String(val)
          break
        default:
          this.valueSync = Number(val) || 0
          break
      }
    },
    _setValueArray () {
      var val = this.valueSync
      var valueArray
      switch (this.mode) {
        case mode.MULTISELECTOR:
          valueArray = [...val]
          break
        case mode.TIME:
          valueArray = this._getDateValueArray(val, formatDateTime({
            mode: mode.TIME
          }))
          break
        case mode.DATE:
          valueArray = this._getDateValueArray(val, formatDateTime({
            mode: mode.DATE
          }))
          break
        default:
          valueArray = [val]
          break
      }
      this.oldValueArray = [...valueArray]
      this.valueArray = [...valueArray]
    },
    _getValue () {
      var val = this.valueArray
      switch (this.mode) {
        case mode.SELECTOR:
          return val[0]
        case mode.MULTISELECTOR:
          return val.map(val => val)
        case mode.TIME:
          return this.valueArray
            .map((val, i) => this.timeArray[i][val])
            .join(':')
        case mode.DATE:
          return this.valueArray
            .map((val, i) => this.dateArray[i][val])
            .join('-')
      }
    },
    _getDateValueArray (valueStr, defaultValue) {
      const splitStr = this.mode === mode.DATE ? '-' : ':'
      const array = this.mode === mode.DATE ? this.dateArray : this.timeArray
      let max
      if (this.mode === mode.TIME) {
        max = 2
      } else {
        switch (this.fields) {
          case fields.YEAR:
            max = 1
            break
          case fields.MONTH:
            max = 2
            break
          default:
            max = 3
            break
        }
      }
      const inputArray = String(valueStr).split(splitStr)
      let value = []
      for (let i = 0; i < max; i++) {
        const val = inputArray[i]
        value.push(array[i].indexOf(val))
      }
      if (value.indexOf(-1) >= 0) {
        value = defaultValue ? this._getDateValueArray(defaultValue) : value.map(() => 0)
      }
      return value
    },
    _change () {
      this._close()
      this.valueChangeSource = 'click'
      const value = this._getValue()
      this.valueSync = Array.isArray(value) ? value.map(val => val) : value
      this.$trigger('change', {}, {
        value
      })
    },
    _cancel () {
      this._close()
      this.$trigger('cancel', {}, {})
    },
    _close () {
      this.visible = false
      setTimeout(() => {
        var $picker = this.$refs.picker
        $picker.remove()
        this.$el.prepend($picker)
        $picker.style.display = 'none'
      }, 260)
    }
  }
}
</script>

<style>
uni-picker {
  display: block;
  cursor: pointer;
}

uni-picker[hidden] {
  display: none;
}

uni-picker[disabled] {
  cursor: not-allowed;
}

.uni-picker-container {
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  z-index: 999;
  font-size: 16px;
}

.uni-picker-container .uni-picker * {
  box-sizing: border-box;
}

.uni-picker-container .uni-picker {
  position: fixed;
  left: 0;
  bottom: 0;
  transform: translate(0, 100%);
  backface-visibility: hidden;
  z-index: 999;
  width: 100%;
  background-color: #efeff4;
  visibility: hidden;
  transition: transform 0.3s, visibility 0.3s;
}

.uni-picker-container .uni-picker.uni-picker-toggle {
  visibility: visible;
  transform: translate(0, 0);
}

.uni-picker-container .uni-picker-content {
  position: relative;
  display: block;
  width: 100%;
  height: 238px;
  background-color: white;
}

.uni-picker-container .uni-picker-item {
  padding: 0;
  height: 34px;
  line-height: 34px;
  text-align: center;
  color: #000;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.uni-picker-container .uni-picker-header {
  display: block;
  position: relative;
  text-align: center;
  width: 100%;
  height: 45px;
  background-color: #fff;
}

.uni-picker-container .uni-picker-header:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  clear: both;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}

.uni-picker-container .uni-picker-action {
  display: block;
  max-width: 50%;
  top: 0;
  height: 100%;
  box-sizing: border-box;
  padding: 0 14px;
  font-size: 17px;
  line-height: 45px;
  overflow: hidden;
  cursor: pointer;
}

.uni-picker-container .uni-picker-action.uni-picker-action-cancel {
  float: left;
  color: #888;
}

.uni-picker-container .uni-picker-action.uni-picker-action-confirm {
  float: right;
  color: #007aff;
}

/* .uni-picker {
  position: relative;
}
.uni-picker-units {
  position: absolute;
  display: flex;
  width: 100%;
  line-height: 16px;
  font-size: 14px;
  top: 50%;
  margin-top: 22.5px;
  transform: translateY(-50%);
  overflow: hidden;
  color: #666666;
  pointer-events: none;
}
.uni-picker-units > div {
  flex: 1;
  text-align: center;
  transform: translateX(2em);
} */
</style>
