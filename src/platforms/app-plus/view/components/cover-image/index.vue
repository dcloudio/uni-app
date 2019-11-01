<template>
  <uni-cover-image
    :src="src"
    v-on="$listeners">
    <div
      ref="container"
      class="uni-cover-image" />
  </uni-cover-image>
</template>
<script>
import native from '../../mixins/native'
import cover from '../../mixins/cover'

export default {
  name: 'CoverImage',
  mixins: [native, cover],
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      coverType: 'image'
    }
  },
  computed: {
    coverContent () {
      return this.$getRealPath(this.src)
    }
  }
}
</script>

<style>
uni-cover-image {
  display: block;
  line-height: 1.2;
  overflow: hidden;
  height: 100%;
  width: 100%;
  pointer-events: auto;
}

uni-cover-image[hidden] {
  display: none;
}

uni-cover-image .uni-cover-image {
  width: 100%;
  height: 100%;
}
</style>
