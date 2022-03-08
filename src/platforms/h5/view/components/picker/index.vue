<template>
  <uni-picker
    :disabled="disabled"
    @click="_show"
    v-on="$listeners"
  >
    <div
      ref="picker"
      class="uni-picker-container"
      :class="`uni-${mode}-${selectorTypeComputed}`"
      @wheel.prevent
      @touchmove.prevent
    >
      <transition name="uni-fade">
        <div
          v-show="visible"
          class="uni-mask uni-picker-mask"
          @click="_cancel"
          @mousemove="_fixInputPosition"
        />
      </transition>
      <div
        v-if="!system"
        :class="{ 'uni-picker-toggle': visible }"
        :style="popupStyle.content"
        class="uni-picker-custom"
      >
        <div
          class="uni-picker-header"
          @click.stop
        >
          <div
            class="uni-picker-action uni-picker-action-cancel"
            @click="_cancel"
          >
            {{ $$t("uni.picker.cancel") }}
          </div>
          <div
            class="uni-picker-action uni-picker-action-confirm"
            @click="_change"
          >
            {{ $$t("uni.picker.done") }}
          </div>
        </div>
        <v-uni-picker-view
          v-if="contentVisible"
          :value="_l10nColumn(valueArray)"
          class="uni-picker-content"
          @change="_pickerViewChange"
        >
          <v-uni-picker-view-column
            v-for="(rangeItem, index0) in _l10nColumn(rangeArray)"
            :key="index0"
          >
            <div
              v-for="(item, index) in rangeItem"
              :key="index"
              class="uni-picker-item"
            >
              {{
                typeof item === "object"
                  ? item[rangeKey] || ""
                  : _l10nItem(item, index0)
              }}
            </div>
          </v-uni-picker-view-column>
        </v-uni-picker-view>
        <div
          ref="select"
          class="uni-picker-select"
          @wheel.stop
          @touchmove.stop
        >
          <div
            v-for="(item, index) in rangeArray[0]"
            :key="index"
            class="uni-picker-item"
            :class="{ selected: valueArray[0] === index }"
            @click="
              valueArray[0] = index;
              _change();
            "
          >
            {{ typeof item === "object" ? item[rangeKey] || "" : item }}
          </div>
        </div>
        <div :style="popupStyle.triangle" />
      </div>
    </div>
    <div>
      <slot />
    </div>
    <div
      v-if="system"
      class="uni-picker-system"
      @mousemove="_fixInputPosition"
    >
      <input
        ref="input"
        :value="valueSync"
        :type="mode"
        tabindex="-1"
        :min="start"
        :max="end"
        :class="[system, popupStyle.dock]"
        @change.stop="_input"
      >
    </div>
    <keypress
      :disable="!visible"
      @esc="_cancel"
      @enter="_change"
    />
  </uni-picker>
</template>

<script>
import { emitter } from 'uni-mixins'
import { formatDateTime } from 'uni-shared'
import popup from '../../../components/app/popup/mixins/popup'
import keypress from '../../../helpers/keypress'
import {
  i18nMixin,
  getLocale
} from 'uni-core/helpers/i18n'

function getDefaultStartValue () {
  if (this.mode === mode.TIME) {
    return '00:00'
  }
  if (this.mode === mode.DATE) {
    const year = new Date().getFullYear() - 100
    switch (this.fields) {
      case fields.YEAR:
        return year.toString()
      case fields.MONTH:
        return year + '-01'
      default:
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
        return year.toString()
      case fields.MONTH:
        return year + '-12'
      default:
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
const selectorType = {
  PICKER: 'picker',
  SELECT: 'select'
}
export default {
  name: 'Picker',
  components: { keypress },
  mixins: [i18nMixin, emitter, popup],
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
        return Object.values(mode).includes(val)
      }
    },
    fields: {
      type: String,
      default: ''
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
    },
    selectorType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      valueSync: null,
      visible: false,
      contentVisible: false,
      popover: null,
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
            default:
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
    selectorTypeComputed () {
      const type = this.selectorType
      if (Object.values(selectorType).includes(type)) {
        return type
      }
      return String(navigator.vendor).indexOf('Apple') === 0 && navigator.maxTouchPoints > 0 ? selectorType.PICKER : selectorType.SELECT
    },
    system () {
      if (this.mode === mode.DATE && !Object.values(fields).includes(this.fields) && this.isDesktop && /win|mac/i.test(navigator.platform)) {
        if (navigator.vendor === 'Google Inc.') {
          return 'chrome'
        } else if (/Firefox/.test(navigator.userAgent)) {
          return 'firefox'
        }
      }
      return ''
    }
  },
  watch: {
    visible (val) {
      if (val) {
        clearTimeout(this.__contentVisibleDelay)
        this.contentVisible = val
        this._select()
      } else {
        this.__contentVisibleDelay = setTimeout(() => {
          this.contentVisible = val
        }, 300)
      }
    },
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
            `${dateArray[0][valueArray[0]]}/${dateArray[1][valueArray[1]]
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
    _show (event) {
      if (this.disabled) {
        return
      }
      this.valueChangeSource = ''
      var $picker = this.$refs.picker
      $picker.remove();
      (document.querySelector('uni-app') || document.body).appendChild($picker)
      $picker.style.display = 'block'
      const rect = event.currentTarget.getBoundingClientRect()
      this.popover = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      }
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
          this.valueSync = 0
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
      const DAY = 31
      return val[0] * DAY * 12 + (val[1] || 0) * DAY + (val[2] || 0)
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
              val = this.valueArray
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
              this.valueSync.splice(index, 1, (val2 < 0 || val2 > maxVal) ? 0 : val2)
            }
          }
          break
        case mode.TIME:
        case mode.DATE:
          this.valueSync = String(val)
          break
        default: {
          const valueSync = Number(val)
          this.valueSync = valueSync < 0 ? 0 : valueSync
          break
        }
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
    _cancel ($event) {
      if (this.system === 'firefox') {
        // Firefox 在 input 同位置区域点击无法隐藏控件
        const { top, left, width, height } = this.popover
        const { pageX, pageY } = $event
        if (pageX > left && pageX < left + width && pageY > top && pageY < top + height) {
          return
        }
      }
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
    },
    _select () {
      if (this.mode === mode.SELECTOR && this.selectorTypeComputed === selectorType.SELECT) {
        this.$refs.select.scrollTop = this.valueArray[0] * 34
      }
    },
    _input ($event) {
      this.valueSync = $event.target.value
      this.$nextTick(() => {
        this._change()
      })
    },
    _fixInputPosition ($event) {
      if (this.system === 'chrome') {
        const rect = this.$el.getBoundingClientRect()
        const style = this.$refs.input.style
        const fontSize = 32
        style.left = `${$event.clientX - rect.left - fontSize * 1.5}px`
        style.top = `${$event.clientY - rect.top - fontSize * 0.5}px`
      }
    },
    _pickerViewChange (event) {
      this.valueArray = this._l10nColumn(event.detail.value, true)
    },
    _l10nColumn (array, normalize) {
      if (this.mode === mode.DATE) {
        const locale = getLocale()
        if (!locale.startsWith('zh')) {
          switch (this.fields) {
            case fields.YEAR:
              return array
            case fields.MONTH:
              return [array[1], array[0]]
            default:
              switch (locale) {
                case 'es':
                case 'fr':
                  return [array[2], array[1], array[0]]
                // case 'en':
                default:
                  return normalize ? [array[2], array[0], array[1]] : [array[1], array[2], array[0]]
              }
          }
        }
      }
      return array
    },
    _l10nItem (item, index) {
      if (this.mode === mode.DATE) {
        const locale = getLocale()
        if (locale.startsWith('zh')) {
          const array = ['年', '月', '日']
          return item + array[index]
        } else if (this.fields !== fields.YEAR && index === (this.fields !== fields.MONTH && (locale === 'es' || locale === 'fr') ? 1 : 0)) {
          let array
          switch (locale) {
            case 'es':
              array = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', '​​julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
              break
            case 'fr':
              array = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
              break
            // case 'en':
            default:
              array = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
              break
          }
          return array[Number(item) - 1]
        }
      }
      return item
    }
  }
}
</script>

<style>
uni-picker {
  position: relative;
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

.uni-picker-container .uni-picker-custom * {
  box-sizing: border-box;
}

.uni-picker-container .uni-picker-custom {
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

.uni-picker-container .uni-picker-custom.uni-picker-toggle {
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
  cursor: pointer;
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

.uni-picker-container .uni-picker-select {
  display: none;
}

.uni-picker-system {
  position: absolute;
  display: none;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.uni-picker-system > input {
  position: absolute;
  border: none;
  height: 100%;
  opacity: 0;
  /* Chrome 无效 */
  cursor: pointer;
}

.uni-picker-system > input.firefox {
  top: 0;
  left: 0;
  width: 100%;
}

.uni-picker-system > input.chrome {
  /* 日历空白位置宽度 32px */
  top: 0;
  left: 0;
  width: 2em;
  font-size: 32px;
  height: 32px;
}

@media screen and (min-width: 500px) and (min-height: 500px) {
  .uni-mask.uni-picker-mask {
    background: none;
  }
  .uni-picker-container .uni-picker-custom {
    width: 300px;
    left: 50%;
    right: auto;
    top: 50%;
    bottom: auto;
    transform: translate(-50%, -50%);
    opacity: 0;
    border-radius: 5px;
    transition: opacity 0.3s, visibility 0.3s;
    box-shadow: 0px 0 20px 5px rgba(0, 0, 0, 0.3);
  }
  .uni-picker-container .uni-picker-header {
    border-radius: 5px 5px 0 0;
  }
  .uni-picker-container .uni-picker-content {
    /* transform 用于解决 Safari overflow 失效的问题 */
    transform: translate(0 0);
    overflow: hidden;
    border-radius: 0 0 5px 5px;
  }
  .uni-picker-container .uni-picker-custom.uni-picker-toggle {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  .uni-selector-select .uni-picker-header,
  .uni-selector-select .uni-picker-content {
    display: none;
  }
  .uni-selector-select .uni-picker-select {
    display: block;
    max-height: 300px;
    overflow: auto;
    background-color: white;
    border-radius: 5px;
    padding: 6px 0;
  }
  .uni-selector-select .uni-picker-item {
    padding: 0 10px;
    color: #555555;
  }
  .uni-selector-select .uni-picker-item:hover {
    background-color: #f6f6f6;
  }
  .uni-selector-select .uni-picker-item.selected {
    color: #007aff;
  }
}
</style>
