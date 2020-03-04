<template>
  <uni-cover-view
    v-on="$listeners">
    <div
      ref="container"
      class="uni-cover-view"
      v-text="coverContent"/>
  </uni-cover-view>
</template>
<script>
import native from '../../mixins/native'
import cover from '../../mixins/cover'

export default {
  name: 'CoverView',
  mixins: [native, cover],
  props: {},
  data () {
    return {
      coverType: 'text',
      coverContent: ''
    }
  },
  watch: {},
  mounted () {
    this._updateContent()
    this.$watch('$slot', this._updateContent)
  },
  methods: {
    _updateContent (val) {
      const $slots = this.$slots.default || []
      $slots.forEach(node => {
        if (!node.tag) {
          this.coverContent += node.text || ''
        }
      })
    }
  }
}
</script>
<style>
uni-cover-view {
  display: block;
  line-height: 1.2;
  overflow: hidden;
  white-space: nowrap;
  pointer-events: auto;
}

uni-cover-view[hidden] {
  display: none;
}

uni-cover-view .uni-cover-view {
  width: 100%;
  height: 100%;
}
</style>
