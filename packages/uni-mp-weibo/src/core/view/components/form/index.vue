<template>
  <uni-form v-on="$listeners">
    <span>
      <slot />
    </span>
  </uni-form>
</template>
<script>
import {
  listeners
} from 'uni-mixins'
export default {
  name: 'Form',
  mixins: [listeners],
  data () {
    return {
      childrenList: []
    }
  },
  listeners: {
    '@form-submit': '_onSubmit',
    '@form-reset': '_onReset',
    '@form-group-update': '_formGroupUpdateHandler'
  },
  methods: {
    _onSubmit ($event) {
      const data = {}
      this.childrenList.forEach(vm => {
        if (vm._getFormData && vm._getFormData().key) {
          data[vm._getFormData().key] = vm._getFormData().value
        }
      })
      this.$trigger('submit', $event, {
        value: data
      })
    },
    _onReset ($event) {
      this.$trigger('reset', $event, {})
      this.childrenList.forEach(vm => {
        vm._resetFormData && vm._resetFormData()
      })
    },
    _formGroupUpdateHandler ($event) {
      if ($event.type === 'add') {
        this.childrenList.push($event.vm)
      } else {
        const index = this.childrenList.indexOf($event.vm)
        this.childrenList.splice(index, 1)
      }
    }
  }
}
</script>
<style>
</style>
