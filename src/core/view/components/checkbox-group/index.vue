<template>
  <uni-checkbox-group v-on="$listeners">
    <slot />
  </uni-checkbox-group>
</template>

<script>
import {
  emitter,
  listeners
} from 'uni-mixins'
export default {
  name: 'CheckboxGroup',
  mixins: [emitter, listeners],
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      checkboxList: []
    }
  },
  listeners: {
    '@checkbox-change': '_changeHandler',
    '@checkbox-group-update': '_checkboxGroupUpdateHandler'
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
    _changeHandler ($event) {
      let value = []
      this.checkboxList.forEach(vm => {
        if (vm.checkboxChecked) {
          value.push(vm.value)
        }
      })
      this.$trigger('change', $event, {
        value: value
      })
    },
    _checkboxGroupUpdateHandler ($event) {
      if ($event.type === 'add') {
        this.checkboxList.push($event.vm)
      } else {
        let index = this.checkboxList.indexOf($event.vm)
        this.checkboxList.splice(index, 1)
      }
    },
    _getFormData () {
      let data = {}
      if (this.name !== '') {
        let value = []
        this.checkboxList.forEach(vm => {
          if (vm.checkboxChecked) {
            value.push(vm.value)
          }
        })
        data['value'] = value
        data['key'] = this.name
      }
      return data
    }
  }
}
</script>

<style>
    uni-checkbox-group[hidden] {
        display: none;
    }
</style>
