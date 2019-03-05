<template>
  <uni-cover-image
    :src="src"
    v-on="$listeners">
    <div
      class="uni-cover-image">
      <img
        v-if="src"
        :src="$getRealPath(src)"
        @load="_load"
        @error="_error">
    </div>
  </uni-cover-image>
</template>
<script>
export default {
  name: 'CoverImage',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  methods: {
    _load ($event) {
      this.$trigger('load', $event)
    },
    _error ($event) {
      this.$trigger('error', $event)
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

uni-cover-image img {
  width: 100%;
  height: 100%;
}

uni-cover-image[hidden] {
  display: none;
}

uni-cover-image .uni-cover-image {
  width: 100%;
  height: 100%;
  text-overflow: inherit;
  overflow: inherit;
  white-space: nowrap;
  -webkit-align-items: inherit;
  align-items: inherit;
  -webkit-justify-content: inherit;
  justify-content: inherit;
  -webkit-flex-direction: inherit;
  flex-direction: inherit;
  font-size: 0;
  display: inherit;
}
</style>
