<template>
  <uni-label
    :class="{'uni-label-pointer':pointer}"
    v-on="$listeners"
    @click="_onClick">
    <slot />
  </uni-label>
</template>
<script>
import {
  emitter
} from 'uni-mixins'
export default {
  name: 'Label',
  mixins: [emitter],
  props: {
    for: {
      type: String,
      default: ''
    }
  },
  computed: {
    pointer () {
      return this.for || (this.$slots.default && this.$slots.default.length)
    }
  },
  methods: {
    _onClick ($event) {
      let stopPropagation = /^uni-(checkbox|radio|switch)-/.test($event.target.className)
      if (!stopPropagation) {
        stopPropagation = /^uni-(checkbox|radio|switch|button)$/i.test($event.target.tagName)
      }
      if (stopPropagation) {
        return
      }

      if (this.for) {
        UniViewJSBridge.emit('uni-label-click-' + this.$page.id + '-' + this.for, $event, true)
      } else {
        this.$broadcast(['Checkbox', 'Radio', 'Switch', 'Button'], 'uni-label-click', $event, true)
      }
    }
  }
}
</script>
<style>
.uni-label-pointer {
  cursor: pointer;
}
</style>
