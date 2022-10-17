<template>
  <div
    v-if="visible"
    class="uni-system-preview-image"
    @click="_click"
  >
    <v-uni-swiper
      navigation="auto"
      :current.sync="index"
      :indicator-dots="false"
      :autoplay="false"
      class="uni-system-preview-image-swiper"
    >
      <v-uni-swiper-item
        v-for="(src, key) in urls"
        :key="key"
      >
        <image-view :src="src" />
      </v-uni-swiper-item>
    </v-uni-swiper>

    <div class="nav-btn-back">
      <i class="uni-btn-icon">&#xe650;</i>
    </div>
  </div>
</template>

<script>
import imageView from './image-view'

export default {
  name: 'PreviewImage',
  components: {
    imageView
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    urls: {
      type: Array,
      default: () => []
    },
    current: {
      type: [String, Number],
      default: 0
    }
  },
  data () {
    return {
      index: 0
    }
  },
  watch: {
    visible (val) {
      if (val) {
        const index =
          typeof this.current === 'number'
            ? this.current
            : this.urls.indexOf(this.current)
        this.index = index < 0 ? 0 : index
      }
    }
  },
  mounted () {
    const MAX_MOVE = 20
    let x = 0
    let y = 0
    this.$el.addEventListener('mousedown', event => {
      this.preventDefault = false
      x = event.clientX
      y = event.clientY
    })
    this.$el.addEventListener('mouseup', event => {
      if (
        Math.abs(event.clientX - x) > MAX_MOVE ||
        Math.abs(event.clientY - y) > MAX_MOVE
      ) {
        this.preventDefault = true
      }
    })
  },
  methods: {
    _click () {
      if (!this.preventDefault) {
        this.$emit('close')
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
  background: rgba(0, 0, 0, 0.8);
}
.uni-system-preview-image-swiper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.uni-system-preview-image .nav-btn-back {
  position: absolute;
  box-sizing: border-box;
  top: 0;
  right: 0;
  width: 44px;
  height: 44px;
  padding: 6px;
  line-height: 32px;
  font-size: 26px;
  color: white;
  text-align: center;
  cursor: pointer;
}
</style>
