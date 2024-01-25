<template>
  <uni-checkbox-element
    dataUncType="uni-checkbox"
    @click="_onClick"
    class="uni-checkbox"
    :style="styles['uni-checkbox']"
  >
    <view class="uni-checkbox-input" :style="checkInputStyle">
      <text v-if="checkboxChecked" class="uni-icon" :style="iconStyle">
        {{ icon }}
      </text>
    </view>
    <slot />
  </uni-checkbox-element>
</template>
<script lang="ts">
import { $dispatch } from '../../utils'
import {
  CHECKBOX_NAME,
  CHECKBOX_ROOT_ELEMENT,
  UniCheckboxElement,
  checkboxProps,
} from './model'
import { styles } from './style'

export default {
  name: CHECKBOX_NAME,
  rootElement: {
    name: CHECKBOX_ROOT_ELEMENT,
    class: UniCheckboxElement,
  },
  props: checkboxProps,
  watch: {
    checked(val) {
      this.checkboxChecked = val
    },
    value(val) {
      this.checkboxValue = val.toString()
    },
  },
  computed: {
    checkInputStyle() {
      return {
        ...styles['uni-checkbox-input'],
        ...(this.checkboxChecked ? this.checkedStyle : this.uncheckedStyle),
      }
    },
    checkedStyle() {
      if (this.disabled) {
        return {
          backgroundColor: '#e1e1e1',
          borderColor: '#d1d1d1',
        }
      }
      return {
        backgroundColor: this.activeBackgroundColor,
        borderColor: this.activeBorderColor,
      }
    },
    uncheckedStyle() {
      if (this.disabled) {
        return {
          backgroundColor: '#e1e1e1',
          borderColor: '#d1d1d1',
        }
      }
      return {
        backgroundColor: this.backgroundColor,
        borderColor: this.borderColor,
      }
    },
    iconStyle() {
      if (this.disabled) {
        return `color: #adadad;`
      }
      const color = this.iconColor.length > 0 ? this.iconColor : this.color
      return {
        ...styles['uni-icon'],
        color,
      }
    },
  },
  data() {
    return {
      icon: '\uEA08',
      checkboxChecked: this.checked as boolean,
      checkboxValue: '',
      styles,
    }
  },
  created() {
    this.checkboxValue = this.value.toString()
  },
  mounted() {
    $dispatch(this, 'CheckboxGroup', '_checkboxGroupUpdateHandler', this, 'add')
  },
  beforeUnmount() {
    $dispatch(
      this,
      'CheckboxGroup',
      '_checkboxGroupUpdateHandler',
      this,
      'remove'
    )
  },
  methods: {
    _onClick() {
      if (this.disabled) return
      this.checkboxChecked = !this.checkboxChecked
      $dispatch(this, 'CheckboxGroup', '_changeHandler')
    },
  },
}
</script>
