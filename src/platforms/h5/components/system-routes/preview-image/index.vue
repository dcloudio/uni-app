<template>
  <div
    class="uni-system-preview-image"
    @click="_click"
  >
    <v-uni-swiper
      :current.sync="index"
      :indicator-dots="false"
      :autoplay="false"
      class="uni-system-preview-image-swiper"
    >
      <v-uni-swiper-item
        v-for="(src,key) in urls"
        :key="key"
      >
        <image-view :src="src" />
      </v-uni-swiper-item>
    </v-uni-swiper>
  </div>
</template>

<script>
import imageView from './image-view'

export default {
  name: 'SystemPreviewImage',
  components: {
    imageView
  },
  data () {
    const {
      urls,
      current
    } = this.$route.params
    return {
      urls: urls || [],
      current,
      index: 0
    }
  },
  created () {
    const index = typeof this.current === 'number' ? this.current : this.urls.indexOf(this.current)
    this.index = index < 0 ? 0 : index
  },
  mounted () {
    const MAX_MOVE = 20
    let x = 0
    let y = 0
    this.$el.addEventListener('mousedown', (event) => {
      this.preventDefault = false
      x = event.clientX
      y = event.clientY
    })
    this.$el.addEventListener('mouseup', (event) => {
      if (Math.abs(event.clientX - x) > MAX_MOVE || Math.abs(event.clientY - y) > MAX_MOVE) {
        this.preventDefault = true
      }
    })
  },
  methods: {
    _click () {
      if (!this.preventDefault) {
        getApp().$router.back()
      }
    }
  }
}
</script>
<style>
.uni-system-preview-image {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0,0,0,0.8);
}
.uni-system-preview-image-swiper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
