<template>
  <v-uni-movable-area
    class="image-view-area"
    @touchstart.native="onTouchStart"
    @touchmove.native="checkDirection"
    @touchend.native="onTouchEnd"
  >
    <v-uni-movable-view
      class="image-view-view"
      :direction="direction"
      inertia
      scale
      scale-min="1"
      scale-max="4"
      @scale="onScale"
    >
      <img
        :src="src"
        class="image-view-img"
        @load="onImgLoad"
      >
    </v-uni-movable-view>
  </v-uni-movable-area>
</template>

<script>
export default {
  name: 'ImageView',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      direction: 'none'
    }
  },
  created () {
    this.scale = 1
    this.imgWidth = 0
    this.imgHeight = 0
    this.width = 0
    this.height = 0
  },
  methods: {
    onScale ({ detail: { scale } }) {
      this.scale = scale
    },
    onImgLoad (event) {
      const target = event.target
      const rect = target.getBoundingClientRect()
      this.imgWidth = rect.width
      this.imgHeight = rect.height
    },
    onTouchStart (event) {
      const $el = this.$el
      const rect = $el.getBoundingClientRect()
      this.width = rect.width
      this.height = rect.height
      this.checkDirection(event)
    },
    onTouchEnd (event) {
      const scale = this.scale
      const horizontal = scale * this.imgWidth > this.width
      const vertical = scale * this.imgHeight > this.height
      if (horizontal && vertical) {
        this.direction = 'all'
      } else if (horizontal) {
        this.direction = 'horizontal'
      } else if (vertical) {
        this.direction = 'vertical'
      } else {
        this.direction = 'none'
      }
      this.checkDirection(event)
    },
    checkDirection (event) {
      // 避免水平滑动和 swiper 冲突
      const direction = this.direction
      if (direction === 'all' || direction === 'horizontal') {
        event.stopPropagation()
      }
    }
  }
}
</script>

<style>
.image-view-area,
.image-view-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.image-view-img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 100%;
  max-width: 100%;
}
</style>
