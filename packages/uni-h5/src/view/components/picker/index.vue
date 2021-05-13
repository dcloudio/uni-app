<template>
  <uni-picker ref="root" v-bind="booleanAttrs" @click="(() => withWebEvent(_show))()">
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
          @click="(() => withWebEvent(_cancel))()"
          @mousemove="_fixInputPosition"
        />
      </transition>
      <div
        v-if="!system"
        :class="{ 'uni-picker-toggle': visible }"
        :style="popupStyle.content"
        class="uni-picker-custom"
      >
        <div class="uni-picker-header" @click.stop>
          <div
            class="uni-picker-action uni-picker-action-cancel"
            @click="(() => withWebEvent(_cancel))()"
          >
            {{ $$t("uni.picker.cancel") }}
          </div>
          <div class="uni-picker-action uni-picker-action-confirm" @click="_change">
            {{ $$t("uni.picker.done") }}
          </div>
        </div>
        <PickerView
          v-if="contentVisible"
          :value="_l10nColumn(valueArray)"
          class="uni-picker-content"
          @change="(() => withWebEvent(_pickerViewChange))()"
        >
          <PickerViewColumn
            v-for="(rangeItem, index0) in _l10nColumn(rangeArray)"
            :key="index0"
          >
            <div v-for="(item, index) in rangeItem" :key="index" class="uni-picker-item">
              {{
                typeof item === "object" ? item[rangeKey] || "" : _l10nItem(item, index0)
              }}
            </div>
          </PickerViewColumn>
        </PickerView>
        <div ref="select" class="uni-picker-select" @wheel.stop @touchmove.stop>
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
      @mousemove="(() => withWebEvent(_fixInputPosition))()"
    >
      <input
        ref="input"
        :value="valueSync"
        :type="mode"
        tabindex="-1"
        :min="start"
        :max="end"
        :class="[system, popupStyle.dock]"
        @change.stop="(() => withWebEvent(_input))()"
      />
    </div>
  </uni-picker>
</template>

<script lang="ts">
import { watch, watchEffect, onBeforeUnmount, inject } from "vue";
import { useKeyboard } from "../../../helpers/useKeyboard";
import {
  useBooleanAttr,
  useCustomEvent,
  withWebEvent,
  Form,
  PickerView,
  PickerViewColumn,
} from "@dcloudio/uni-components";
import { formatDateTime } from "@dcloudio/uni-shared";
import { usePopupStyle } from "../../../helpers/usePopupStyle";
import { initI18nPickerMsgsOnce, useI18n } from "@dcloudio/uni-core";
const { UniFormCtx, uniFormKey } = Form;
const { t, getLocale } = useI18n();

function getDefaultStartValue() {
  if (this.mode === mode.TIME) {
    return "00:00";
  }
  if (this.mode === mode.DATE) {
    const year = new Date().getFullYear() - 100;
    switch (this.fields) {
      case fields.YEAR:
        return year.toString();
      case fields.MONTH:
        return year + "-01";
      default:
        return year + "-01-01";
    }
  }
  return "";
}

function getDefaultEndValue() {
  if (this.mode === mode.TIME) {
    return "23:59";
  }
  if (this.mode === mode.DATE) {
    const year = new Date().getFullYear() + 100;
    switch (this.fields) {
      case fields.YEAR:
        return year.toString();
      case fields.MONTH:
        return year + "-12";
      default:
        return year + "-12-31";
    }
  }
  return "";
}

const mode = {
  SELECTOR: "selector",
  MULTISELECTOR: "multiSelector",
  TIME: "time",
  DATE: "date",
  // 暂不支持城市选择
  // REGION: 'region'
};
const fields = {
  YEAR: "year",
  MONTH: "month",
  DAY: "day",
};
const selectorType = {
  PICKER: "picker",
  SELECT: "select",
};
export default {
  name: "Picker",
  components: { PickerView, PickerViewColumn },
  props: {
    name: {
      type: String,
      default: "",
    },
    range: {
      type: Array,
      default() {
        return [];
      },
    },
    rangeKey: {
      type: String,
      default: "",
    },
    value: {
      type: [Number, String, Array],
      default: 0,
    },
    mode: {
      type: String,
      default: mode.SELECTOR,
      validator(val) {
        return Object.values(mode).includes(val);
      },
    },
    fields: {
      type: String,
      default: "",
    },
    start: {
      type: String,
      default: (props) => {
        return getDefaultStartValue.call(props);
      },
    },
    end: {
      type: String,
      default: (props) => {
        return getDefaultEndValue.call(props);
      },
    },
    disabled: {
      type: [Boolean, String],
      default: false,
    },
    selectorType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      valueSync: null,
      visible: false,
      contentVisible: false,
      popover: null,
      valueChangeSource: "",
      timeArray: [],
      dateArray: [],
      valueArray: [],
      oldValueArray: [],
      isDesktop: false,
      popupStyle: {
        content: {},
        triangle: {},
      },
    };
  },
  computed: {
    rangeArray() {
      var val = this.range;
      switch (this.mode) {
        case mode.SELECTOR:
          return [val];
        case mode.MULTISELECTOR:
          return val;
        case mode.TIME:
          return this.timeArray;
        case mode.DATE: {
          const dateArray = this.dateArray;
          switch (this.fields) {
            case fields.YEAR:
              return [dateArray[0]];
            case fields.MONTH:
              return [dateArray[0], dateArray[1]];
            default:
              return [dateArray[0], dateArray[1], dateArray[2]];
          }
        }
      }
      return [];
    },
    startArray() {
      return this._getDateValueArray(this.start, getDefaultStartValue.bind(this)());
    },
    endArray() {
      return this._getDateValueArray(this.end, getDefaultEndValue.bind(this)());
    },
    selectorTypeComputed() {
      const type = this.selectorType;
      if (Object.values(selectorType).includes(type)) {
        return type;
      }
      return String(navigator.vendor).indexOf("Apple") === 0 &&
        navigator.maxTouchPoints > 0
        ? selectorType.PICKER
        : selectorType.SELECT;
    },
    system() {
      if (
        this.mode === mode.DATE &&
        !Object.values(fields).includes(this.fields) &&
        this.isDesktop &&
        /win|mac/i.test(navigator.platform)
      ) {
        if (navigator.vendor === "Google Inc.") {
          return "chrome";
        } else if (/Firefox/.test(navigator.userAgent)) {
          return "firefox";
        }
      }
      return "";
    },
  },
  watch: {
    visible(val) {
      if (val) {
        clearTimeout(this.__contentVisibleDelay);
        this.contentVisible = val;
        this._select();
      } else {
        this.__contentVisibleDelay = setTimeout(() => {
          this.contentVisible = val;
        }, 300);
      }
    },
    value() {
      this._setValueSync();
    },
    mode() {
      this._setValueSync();
    },
    range() {
      this._setValueSync();
    },
    valueSync() {
      this._setValueArray();
    },
    valueArray(val) {
      if (this.mode === mode.TIME || this.mode === mode.DATE) {
        const getValue =
          this.mode === mode.TIME ? this._getTimeValue : this._getDateValue;
        const valueArray = this.valueArray;
        const startArray = this.startArray;
        const endArray = this.endArray;
        if (this.mode === mode.DATE) {
          const dateArray = this.dateArray;
          const max = dateArray[2].length;
          const day = Number(dateArray[2][valueArray[2]]) || 1;
          const realDay = new Date(
            `${dateArray[0][valueArray[0]]}/${dateArray[1][valueArray[1]]}/${day}`
          ).getDate();
          if (realDay < day) {
            valueArray[2] -= realDay + max - day;
          }
        }
        if (getValue(valueArray) < getValue(startArray)) {
          this._cloneArray(valueArray, startArray);
        } else if (getValue(valueArray) > getValue(endArray)) {
          this._cloneArray(valueArray, endArray);
        }
      }
      val.forEach((value, column) => {
        if (value !== this.oldValueArray[column]) {
          this.oldValueArray[column] = value;
          if (this.mode === mode.MULTISELECTOR) {
            this.$trigger(
              "columnchange",
              {},
              {
                column,
                value,
              }
            );
          }
        }
      });
    },
  },
  created() {
    initI18nPickerMsgsOnce();

    this._createTime();
    this._createDate();
    this._setValueSync();

    usePickerWatch.call(this);
    usePickerForm.call(this);

    const popup = usePopupStyle(this);
    this.isDesktop = popup.isDesktop;
    this.popupStyle = popup.popupStyle;
  },
  mounted() {
    this.$trigger = useCustomEvent({ value: this.$refs.root }, this.$emit);
  },
  beforeUnmount() {
    this.$refs.picker.remove();
  },
  methods: {
    withWebEvent,
    $$t: t,
    _show(event) {
      if (this.disabled) {
        return;
      }
      this.valueChangeSource = "";
      var $picker = this.$refs.picker;
      $picker.remove();
      (document.querySelector("uni-app") || document.body).appendChild($picker);
      $picker.style.display = "block";
      const rect = event.currentTarget.getBoundingClientRect();
      this.popover = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      };
      setTimeout(() => {
        this.visible = true;
      }, 20);
    },
    _getFormData() {
      return {
        value: this.valueSync,
        key: this.name,
      };
    },
    _resetFormData() {
      switch (this.mode) {
        case mode.SELECTOR:
          this.valueSync = 0;
          break;
        case mode.MULTISELECTOR:
          this.valueSync = this.value.map((val) => 0);
          break;
        case mode.DATE:
        case mode.TIME:
          this.valueSync = "";
          break;
        default:
          break;
      }
    },
    _createTime() {
      var hours = [];
      var minutes = [];
      hours.splice(0, hours.length);
      for (let i = 0; i < 24; i++) {
        hours.push((i < 10 ? "0" : "") + i);
      }
      minutes.splice(0, minutes.length);
      for (let i = 0; i < 60; i++) {
        minutes.push((i < 10 ? "0" : "") + i);
      }
      this.timeArray.push(hours, minutes);
    },
    _createDate() {
      var years = [];
      var year = new Date().getFullYear();
      for (let i = year - 150, end = year + 150; i <= end; i++) {
        years.push(String(i));
      }
      var months = [];
      for (let i = 1; i <= 12; i++) {
        months.push((i < 10 ? "0" : "") + i);
      }
      var days = [];
      for (let i = 1; i <= 31; i++) {
        days.push((i < 10 ? "0" : "") + i);
      }
      this.dateArray.push(years, months, days);
    },
    _getTimeValue(val) {
      return val[0] * 60 + val[1];
    },
    _getDateValue(val) {
      const DAY = 31;
      return val[0] * DAY * 12 + (val[1] || 0) * DAY + (val[2] || 0);
    },
    /**
     * 将右侧数组值同步到左侧（交集部分）
     */
    _cloneArray(val1, val2) {
      for (let i = 0; i < val1.length && i < val2.length; i++) {
        val1[i] = val2[i];
      }
    },
    _setValueSync() {
      let val = this.value;
      switch (this.mode) {
        case mode.MULTISELECTOR:
          {
            if (!Array.isArray(val)) {
              val = [];
            }
            if (!Array.isArray(this.valueSync)) {
              this.valueSync = [];
            }
            const length = (this.valueSync.length = Math.max(
              val.length,
              this.range.length
            ));
            for (let index = 0; index < length; index++) {
              const val0 = Number(val[index]);
              const val1 = Number(this.valueSync[index]);
              const val2 = isNaN(val0) ? (isNaN(val1) ? 0 : val1) : val0;
              const maxVal = this.range[index] ? this.range[index].length - 1 : 0;
              this.valueSync.splice(index, 1, val2 < 0 || val2 > maxVal ? 0 : val2);
            }
          }
          break;
        case mode.TIME:
        case mode.DATE:
          this.valueSync = String(val);
          break;
        default: {
          const valueSync = Number(val);
          this.valueSync = valueSync < 0 ? 0 : valueSync;
          break;
        }
      }
    },
    _setValueArray() {
      var val = this.valueSync;
      var valueArray;
      switch (this.mode) {
        case mode.MULTISELECTOR:
          valueArray = [...val];
          break;
        case mode.TIME:
          valueArray = this._getDateValueArray(
            val,
            formatDateTime({
              mode: mode.TIME,
            })
          );
          break;
        case mode.DATE:
          valueArray = this._getDateValueArray(
            val,
            formatDateTime({
              mode: mode.DATE,
            })
          );
          break;
        default:
          valueArray = [val];
          break;
      }
      this.oldValueArray = [...valueArray];
      this.valueArray = [...valueArray];
    },
    _getValue() {
      var val = this.valueArray;
      switch (this.mode) {
        case mode.SELECTOR:
          return val[0];
        case mode.MULTISELECTOR:
          return val.map((val) => val);
        case mode.TIME:
          return this.valueArray.map((val, i) => this.timeArray[i][val]).join(":");
        case mode.DATE:
          return this.valueArray.map((val, i) => this.dateArray[i][val]).join("-");
      }
    },
    _getDateValueArray(valueStr, defaultValue) {
      const splitStr = this.mode === mode.DATE ? "-" : ":";
      const array = this.mode === mode.DATE ? this.dateArray : this.timeArray;
      let max;
      if (this.mode === mode.TIME) {
        max = 2;
      } else {
        switch (this.fields) {
          case fields.YEAR:
            max = 1;
            break;
          case fields.MONTH:
            max = 2;
            break;
          default:
            max = 3;
            break;
        }
      }
      const inputArray = String(valueStr).split(splitStr);
      let value = [];
      for (let i = 0; i < max; i++) {
        const val = inputArray[i];
        value.push(array[i].indexOf(val));
      }
      if (value.indexOf(-1) >= 0) {
        value = defaultValue ? this._getDateValueArray(defaultValue) : value.map(() => 0);
      }
      return value;
    },
    _change() {
      this._close();
      this.valueChangeSource = "click";
      const value = this._getValue();
      this.valueSync = Array.isArray(value) ? value.map((val) => val) : value;
      this.$trigger(
        "change",
        {},
        {
          value,
        }
      );
    },
    _cancel($event) {
      if (this.system === "firefox") {
        // Firefox 在 input 同位置区域点击无法隐藏控件
        const { top, left, width, height } = this.popover;
        const { pageX, pageY } = $event;
        if (pageX > left && pageX < left + width && pageY > top && pageY < top + height) {
          return;
        }
      }
      this._close();
      this.$trigger("cancel", {}, {});
    },
    _close() {
      this.visible = false;
      setTimeout(() => {
        var $picker = this.$refs.picker;
        $picker.remove();
        this.$el.prepend($picker);
        $picker.style.display = "none";
      }, 260);
    },
    _select() {
      if (
        this.mode === mode.SELECTOR &&
        this.selectorTypeComputed === selectorType.SELECT
      ) {
        this.$refs.select.scrollTop = this.valueArray[0] * 34;
      }
    },
    _input($event) {
      this.valueSync = $event.target.value;
      this.$nextTick(() => {
        this._change();
      });
    },
    _fixInputPosition($event) {
      if (this.system === "chrome") {
        const rect = this.$el.getBoundingClientRect();
        const style = this.$refs.input.style;
        const fontSize = 32;
        style.left = `${$event.clientX - rect.left - fontSize * 1.5}px`;
        style.top = `${$event.clientY - rect.top - fontSize * 0.5}px`;
      }
    },
    _pickerViewChange(event) {
      this.valueArray = this._l10nColumn(event.detail.value, true);
    },
    _l10nColumn(array, normalize) {
      if (this.mode === mode.DATE) {
        const locale = getLocale();
        if (!locale.startsWith("zh")) {
          switch (this.fields) {
            case fields.YEAR:
              return array;
            case fields.MONTH:
              return [array[1], array[0]];
            default:
              switch (locale) {
                case "es":
                case "fr":
                  return [array[2], array[1], array[0]];
                // case 'en':
                default:
                  return normalize
                    ? [array[2], array[0], array[1]]
                    : [array[1], array[2], array[0]];
              }
          }
        }
      }
      return array;
    },
    _l10nItem(item, index) {
      if (this.mode === mode.DATE) {
        const locale = getLocale();
        if (locale.startsWith("zh")) {
          const array = ["年", "月", "日"];
          return item + array[index];
        } else if (
          this.fields !== fields.YEAR &&
          index ===
            (this.fields !== fields.MONTH && (locale === "es" || locale === "fr") ? 1 : 0)
        ) {
          let array;
          switch (locale) {
            case "es":
              array = [
                "enero",
                "febrero",
                "marzo",
                "abril",
                "mayo",
                "junio",
                "​​julio",
                "agosto",
                "septiembre",
                "octubre",
                "noviembre",
                "diciembre",
              ];
              break;
            case "fr":
              array = [
                "janvier",
                "février",
                "mars",
                "avril",
                "mai",
                "juin",
                "juillet",
                "août",
                "septembre",
                "octobre",
                "novembre",
                "décembre",
              ];
              break;
            // case 'en':
            default:
              array = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ];
              break;
          }
          return array[Number(item) - 1];
        }
      }
      return item;
    },
  },
  setup(props) {
    const booleanAttrs = useBooleanAttr(props, "disabled");
    return {
      booleanAttrs,
    };
  },
};

function usePickerWatch() {
  const { key, disable } = useKeyboard();
  watch(
    () => this.visible,
    (value) => (disable.value = !value)
  );
  watchEffect(() => {
    const { value } = key;
    if (value === "esc") {
      this._cancel && this._cancel();
    } else if (value === "enter") {
      this._change && this._change();
    }
  });
}

function usePickerForm() {
  const uniForm = inject<UniFormCtx>(uniFormKey, (false as unknown) as UniFormCtx);
  if (!!uniForm) {
    const field = {
      reset: this._resetFormData,
      submit: () => {
        const data: [string, any] = ["", null];
        const { key, value } = this._getFormData();
        if (key !== "") {
          data[0] = key;
          data[1] = value;
        }
        return data;
      },
    };
    uniForm.addField(field);
    onBeforeUnmount(() => {
      uniForm.removeField(field);
    });
  }
}
</script>
