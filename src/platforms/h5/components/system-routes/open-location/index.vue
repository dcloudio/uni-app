<template>
  <div class="uni-system-open-location">
    <system-header @back="_back">位置</system-header>
    <div class="map-content">
      <iframe
        ref="map"
        :src="src"
        allow="geolocation"
        sandbox="allow-scripts allow-same-origin allow-forms"
        frameborder="0"
        @load="_load" />
      <!-- 去这里 -->
      <div
        v-if="isPoimarkerSrc"
        class="actTonav"
        @click="_nav" />
    </div>
  </div>
</template>
<script>
import SystemHeader from '../system-header'

const key = __uniConfig.qqMapKey
const referer = 'uniapp'
const poimarkerSrc = 'https://apis.map.qq.com/tools/poimarker'

export default {
  name: 'SystemOpenLocation',
  components: {
    SystemHeader
  },
  data () {
    const {
      latitude,
      longitude,
      scale,
      name,
      address
    } = this.$route.params
    return {
      latitude,
      longitude,
      scale,
      name,
      address,
      src: '',
      isPoimarkerSrc: false
    }
  },
  mounted () {
    if (this.latitude && this.longitude) {
      this.src =
					`${poimarkerSrc}?type=0&marker=coord:${this.latitude},${this.longitude};title:${this.name};addr:${this.address};&key=${key}&referer=${referer}`
    }
  },
  methods: {
    _back () {
      if (this.$refs.map.src.indexOf(poimarkerSrc) !== 0) {
        this.$refs.map.src = this.src
      } else {
        getApp().$router.back()
      }
    },
    _load () {
      if (this.$refs.map.src.indexOf(poimarkerSrc) === 0) {
        this.isPoimarkerSrc = true
      } else {
        this.isPoimarkerSrc = false
      }
    },
    _nav () {
      var url =
					`https://apis.map.qq.com/uri/v1/routeplan?type=drive&to=${encodeURIComponent(this.name)}&tocoord=${this.latitude},${this.longitude}&referer=${referer}`
      this.$refs.map.src = url
    }
  }
}
</script>
<style>
	.uni-system-open-location {
		display: block;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: #f8f8f8;
	}

	.map-content {
		position: absolute;
		left: 0;
		top: 44px;
		width: 100%;
		bottom: 0;
		overflow: hidden;
	}

	.map-content>iframe {
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
