<template>
  <uni-checkbox
    :disabled="disabled"
    v-bind="$attrs"
    @click="_onClick"
  >
    <div class="uni-checkbox-wrapper">
      <div
        :class="[checkboxChecked ? 'uni-checkbox-input-checked' : '']"
        :style="{color:color}"
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
} from '../../mixins'
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
    color: {
      type: String,
      default: '#007aff'
    },
    value: {
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