<template>
  <uni-switch
    :disabled="disabled"
    v-bind="$attrs"
    @click="_onClick"
  >
    <div class="uni-switch-wrapper">
      <div
        v-show="type === 'switch'"
        :class="[switchChecked ? 'uni-switch-input-checked' : '']"
        :style="{backgroundColor: switchChecked ? color : '#DFDFDF',borderColor:switchChecked ? color : '#DFDFDF'}"
        class="uni-switch-input"
      />
      <div
        v-show="type === 'checkbox'"
        :class="[switchChecked ? 'uni-checkbox-input-checked' : '']"
        :style="{color: color}"
        class="uni-checkbox-input"
      />
    </div>
  </uni-switch>
</template>
<script>
import {
  emitter,
  listeners
} from '../../mixins'

export default {
  name: 'Switch',
  mixins: [emitter, listeners],
  props: {
    name: {
      type: String,
      default: ''
    },
    checked: {
      type: [Boolean, String],
      default: false
    },
    type: {
      type: String,
      default: 'switch'
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
    }
  },
  data () {
    return {
      switchChecked: this.checked
    }
  },
  watch: {
    checked (val) {
      this.switchChecked = val
    }
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
  listeners: {
    'label-click': '_onClick',
    '@label-click': '_onClick'
  },
  methods: {
    _onClick ($event) {
      if (this.disabled) {
        return
      }
      this.switchChecked = !this.switchChecked
      this.$trigger('change', $event, {
        value: this.switchChecked
      })
    },
    _resetFormData () {
      this.switchChecked = false
    },
    _getFormData () {
      const data = {}
      if (this.name !== '') {
        data.value = this.switchChecked
        data.key = this.name
      }
      return data
    }
  }
}
</script>