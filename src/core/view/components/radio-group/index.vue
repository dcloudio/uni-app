<template>
  <uni-radio-group v-on="$listeners">
    <slot />
  </uni-radio-group>
</template>

<script>
import {
  emitter,
  listeners
} from 'uni-mixins'
export default {
  name: 'RadioGroup',
  mixins: [emitter, listeners],
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      radioList: []
    }
  },
  listeners: {
    '@radio-change': '_changeHandler',
    '@radio-group-update': '_radioGroupUpdateHandler'
  },
  mounted () {
    this._resetRadioGroupValue(this.radioList.length - 1)
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
    _changeHandler ($event, vm) {
      const index = this.radioList.indexOf(vm)
      this._resetRadioGroupValue(index, true)
      this.$trigger('change', $event, {
        value: vm.radioValue
      })
    },
    _radioGroupUpdateHandler ($event) {
      if ($event.type === 'add') {
        this.radioList.push($event.vm)
      } else {
        const index = this.radioList.indexOf($event.vm)
        this.radioList.splice(index, 1)
      }
    },
    _resetRadioGroupValue (key, change) {
      this.radioList.forEach((value, index) => {
        if (index === key) {
          return
        }
        if (change) {
          this.radioList[index].radioChecked = false
        } else {
          this.radioList.forEach((v, i) => {
            if (index >= i) {
              return
            }
            if (this.radioList[i].radioChecked) {
              this.radioList[index].radioChecked = false
            }
          })
        }
      })
    },
    _getFormData () {
      const data = {}
      if (this.name !== '') {
        let value = ''
        this.radioList.forEach(vm => {
          if (vm.radioChecked) {
            value = vm.value
          }
        })
        data.value = value
        data.key = this.name
      }
      return data
    }
  }
}
</script>

<style>
	uni-radio-group[hidden] {
		display: none;
	}
</style>
