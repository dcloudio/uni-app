<template>
  <div class="uni-system-open-location">
    <div
      class="map-content"
      :class="{ 'fix-position': isPoimarkerSrc }"
    >
      <iframe
        ref="map"
        :src="src"
        allow="geolocation"
        sandbox="allow-scripts allow-same-origin allow-forms allow-top-navigation allow-modals allow-popups"
        frameborder="0"
        @load="_check"
      />
      <!-- 去这里 -->
      <div
        v-if="isPoimarkerSrc"
        class="actTonav"
        @click="_nav"
      />
    </div>
    <div
      class="nav-btn-back"
      @click="_back"
    >
      <i class="uni-btn-icon">&#xe601;</i>
    </div>
  </div>
</template>
<script>
const key = __uniConfig.qqMapKey
const referer = 'uniapp'
const poimarkerSrc = 'https://apis.map.qq.com/tools/poimarker'

export default {
  name: 'SystemOpenLocation',
  data () {
    const {
      latitude,
      longitude,
      scale = 18,
      name = '',
      address = ''
    } = this.$route.query
    return {
      latitude,
      longitude,
      scale,
      name,
      address,
      src: latitude && longitude ? `${poimarkerSrc}?type=0&marker=coord:${latitude},${longitude};title:${name};addr:${address};&key=${key}&referer=${referer}` : '',
      isPoimarkerSrc: true
    }
  },
  methods: {
    _back () {
      if (this.$refs.map.src.indexOf(poimarkerSrc) !== 0) {
        this.$refs.map.src = this.src
      } else {
        getApp().$router.back()
      }
      this._check()
    },
    _check () {
      if (this.$refs.map.src.indexOf(poimarkerSrc) === 0) {
        this.isPoimarkerSrc = true
      } else {
        this.isPoimarkerSrc = false
      }
    },
    _nav () {
      var url =
        `https://map.qq.com/nav/drive#routes/page?transport=2&epointy=${this.latitude}&epointx=${this.longitude}&eword=${encodeURIComponent(this.name || '目的地')}&referer=${referer}`
      this.$refs.map.src = url
    }
  }
}
</script>
<style scoped>
.uni-system-open-location {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f8f8f8;
}

.nav-btn-back {
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 44px;
  height: 44px;
  padding: 6px;
  line-height: 32px;
  font-size: 26px;
  color: white;
  text-align: center;
  cursor: pointer;
}

.nav-btn-back > .uni-btn-icon {
  display: block;
  width: 100%;
  height: 100%;
  line-height: inherit;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
}

.map-content {
  position: absolute;
  left: 0;
  top: 0px;
  width: 100%;
  bottom: 0;
  overflow: hidden;
}

.map-content.fix-position {
  top: -74px;
  bottom: -44px;
}

.map-content > iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.actTonav {
  position: absolute;
  right: 16px;
  bottom: 56px;
  width: 60px;
  height: 60px;
  border-radius: 60px;
}
</style>
