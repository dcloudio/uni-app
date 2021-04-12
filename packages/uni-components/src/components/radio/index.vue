<template>
  <uni-radio
    :disabled="disabled"
    v-bind="$attrs"
    @click="_onClick"
  >
    <div class="uni-radio-wrapper">
      <div
        :class="radioChecked ? 'uni-radio-input-checked' : ''"
        :style="radioChecked ? checkedStyle : ''"
        class="uni-radio-input"
      />
      <slot />
    </div>
  </uni-radio>
</template>
<script>
import {
  emitter,
  listeners
} from '../../mixins'
export default {
  name: 'Radio',
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
      default: '#007AFF'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      radioChecked: this.checked,
      radioValue: this.value
    }
  },
  computed: {
    checkedStyle () {
      return `background-color: ${this.color};border-color: ${this.color};`
    }
  },
  watch: {
    checked (val) {
      this.radioChecked = val
    },
    value (val) {
      this.radioValue = val
    }
  },
  listeners: {
    'label-click': '_onClick',
    '@label-click': '_onClick'
  },
  created () {
    this.$dispatch('RadioGroup', 'uni-radio-group-update', {
      type: 'add',
      vm: this
    })
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    })
  },
  beforeDestroy () {
    this.$dispatch('RadioGroup', 'uni-radio-group-update', {
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
      if (this.disabled || this.radioChecked) {
        return
      }
      this.radioChecked = true
      this.$dispatch('RadioGroup', 'uni-radio-change', $event, this)
    },
    _resetFormData () {
      this.radioChecked = this.min
    }
  }
}
</script>