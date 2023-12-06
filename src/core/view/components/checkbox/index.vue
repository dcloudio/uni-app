<template>
  <uni-checkbox
    :disabled="disabled"
    v-on="$listeners"
    @click="_onClick"
  >
    <div
      class="uni-checkbox-wrapper"
      :style="{
        '--HOVER-BD-COLOR': activeBorderColor
      }"
    >
      <div
        :class="{ 'uni-checkbox-input-checked' : checkboxChecked, 'uni-checkbox-input-disabled' : disabled }"
        :style="checkboxStyle"
        class="uni-checkbox-input"
      />
      <slot />
    </div>
  </uni-checkbox>
</template>
<script>
import {
  emitter,
  listeners
} from 'uni-mixins'
export default {
  name: 'Checkbox',
  mixins: [emitter, listeners],
  props: {
    checked: {
      type: [Boolean, String],
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#007aff'
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    borderColor: {
      type: String,
      default: ''
    },
    activeBackgroundColor: {
      type: String,
      default: ''
    },
    activeBorderColor: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      checkboxChecked: this.checked,
      checkboxValue: this.value
    }
  },
  computed: {
    checkboxStyle () {
      if (this.disabled) {
        return {
          backgroundColor: '#E1E1E1',
          borderColor: '#D1D1D1'
        }
      }
      const style = {}
      // 兼容旧版本样式
      if (this.checkboxChecked) {
        style.color = this.iconColor || this.color
        if (this.activeBorderColor) style.borderColor = this.activeBorderColor
        if (this.activeBackgroundColor) style.backgroundColor = this.activeBackgroundColor
      } else {
        if (this.borderColor) style.borderColor = this.borderColor
        if (this.backgroundColor) style.backgroundColor = this.backgroundColor
      }
      return style
    }
  },
  watch: {
    checked (val) {
      this.checkboxChecked = val
    },
    value (val) {
      this.checkboxValue = val
    }
  },
  listeners: {
    'label-click': '_onClick',
    '@label-click': '_onClick'
  },
  created () {
    this.$dispatch('CheckboxGroup', 'uni-checkbox-group-update', {
      type: 'add',
      vm: this
    })
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    })
  },
  beforeDestroy () {
    this.$dispatch('CheckboxGroup', 'uni-checkbox-group-update', {
      type: 'remove',
      vm: this
    })
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    })
  },
  methods: {
    _onClick ($event) {
      if (this.disabled) {
        return
      }
      this.checkboxChecked = !this.checkboxChecked
      this.$dispatch('CheckboxGroup', 'uni-checkbox-change', $event)
    },
    _resetFormData () {
      this.checkboxChecked = false
    }
  }
}
</script>
<style>
	uni-checkbox {
		-webkit-tap-highlight-color: transparent;
		display: inline-block;
    cursor: pointer;
	}

	uni-checkbox[hidden] {
		display: none;
	}

	uni-checkbox[disabled] {
		cursor: not-allowed;
	}

	uni-checkbox .uni-checkbox-wrapper {
		display: -webkit-inline-flex;
		display: inline-flex;
		-webkit-align-items: center;
		align-items: center;
		vertical-align: middle;
	}

	uni-checkbox .uni-checkbox-input {
		margin-right: 5px;
		-webkit-appearance: none;
		appearance: none;
		outline: 0;
		border: 1px solid #D1D1D1;
		background-color: #FFFFFF;
		border-radius: 3px;
		width: 22px;
		height: 22px;
		position: relative;
	}

  @media (hover: hover) {
    uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
      border-color: var(--HOVER-BD-COLOR, #007aff) !important;
    }
  }

	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		color: #007aff;
	}

	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
		font: normal normal normal 14px/1 "uni";
		content: "\EA08";
		font-size: 22px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -48%) scale(0.73);
		-webkit-transform: translate(-50%, -48%) scale(0.73);
	}

	uni-checkbox .uni-checkbox-input.uni-checkbox-input-disabled {
		background-color: #E1E1E1;
	}

	uni-checkbox .uni-checkbox-input.uni-checkbox-input-disabled:before {
		color: #ADADAD;
	}

	uni-checkbox-group {
		display: block;
	}
</style>
